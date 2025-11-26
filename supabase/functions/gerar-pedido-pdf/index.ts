import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Produto {
  produto: string;
  quantidade: number;
  anoModelo: string;
  valorUnitario: number;
  valorTotal: number;
}

interface PedidoData {
  numero_pedido: string;
  local: string;
  data: string;
  nome_vendedor: string;
  nome_cliente: string;
  cnpj: string;
  ie_rg?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  telefone_cliente?: string;
  responsavel_frota?: string;
  email_responsavel?: string;
  faturamento_tipo: string;
  nome_instituicao?: string;
  financiamento_forma: string;
  financiamento_forma_outros?: string;
  valor_total_produtos: number;
  entrada?: number;
  observacoes?: string;
  produtos: Produto[];
}

function gerarPDFHTML(pedido: PedidoData): string {
  const produtosHTML = pedido.produtos.map((p, index) => `
    <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : '#ffffff'};">
      <td style="padding: 12px 8px; border-bottom: 1px solid #e9ecef;">${p.produto}</td>
      <td style="padding: 12px 8px; text-align: center; border-bottom: 1px solid #e9ecef;">${p.quantidade}</td>
      <td style="padding: 12px 8px; text-align: center; border-bottom: 1px solid #e9ecef;">${p.anoModelo}</td>
      <td style="padding: 12px 8px; text-align: right; border-bottom: 1px solid #e9ecef;">R$ ${p.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600; border-bottom: 1px solid #e9ecef;">R$ ${p.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
    </tr>
  `).join('');

  const saldoFinanciado = pedido.valor_total_produtos - (pedido.entrada || 0);
  const supabaseUrl = Deno.env.get('SUPABASE_URL');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @page {
          margin: 20mm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 0;
          margin: 0;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          border-bottom: 3px solid #0f2557;
        }
        .logo {
          max-width: 280px;
          height: auto;
          margin: 0 auto 15px auto;
          display: block;
        }
        .header h1 {
          color: #ffffff;
          margin: 15px 0 10px 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .pedido-numero {
          background-color: #ef4444;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          display: inline-block;
          font-size: 16px;
          font-weight: 600;
          margin-top: 10px;
        }
        .info-section {
          margin: 25px 0;
          page-break-inside: avoid;
        }
        .info-section h2 {
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          color: white;
          padding: 12px 15px;
          margin: 20px 0 15px 0;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 15px 0;
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
        }
        .info-item {
          padding: 8px;
        }
        .info-label {
          font-weight: 600;
          color: #0f2557;
          margin-bottom: 4px;
          font-size: 13px;
        }
        .info-value {
          color: #1a1a1a;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          overflow: hidden;
        }
        th {
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          color: white;
          padding: 14px 10px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }
        td {
          padding: 12px 10px;
          font-size: 14px;
        }
        .total-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-left: 4px solid #f59e0b;
          padding: 20px;
          margin: 25px 0;
          text-align: right;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .total-box .label {
          color: #92400e;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .total-box .value {
          font-size: 32px;
          font-weight: 700;
          color: #92400e;
        }
        .signatures {
          margin-top: 80px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          page-break-inside: avoid;
        }
        .signature-line {
          border-top: 2px solid #0f2557;
          padding-top: 8px;
          text-align: center;
          font-weight: 600;
          color: #0f2557;
          font-size: 13px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        .observacoes-box {
          background-color: #f1f5f9;
          border-left: 4px solid #1e40af;
          padding: 15px;
          border-radius: 4px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${supabaseUrl}/storage/v1/object/public/assets/logo-linha-lavoro.png" alt="Linha Lavoro Foton" class="logo" onerror="this.src=''; this.style.display='none';">
          <h1>PEDIDO DE FATURAMENTO</h1>
          <div class="pedido-numero">Nº ${pedido.numero_pedido}</div>
        </div>

        <div class="info-grid" style="margin-bottom: 30px;">
          <div class="info-item" style="grid-column: 1 / -1; text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
            <img src="${supabaseUrl}/storage/v1/object/public/assets/logo-linha-lavoro.png" alt="Linha Lavoro Foton" style="max-width: 200px; height: auto; margin: 0 auto 15px auto; display: block;" onerror="this.style.display='none';">
            <div style="font-weight: 700; color: #0f2557; font-size: 18px; margin-bottom: 8px;">Lavoro Foton</div>
            <div style="color: #1a1a1a; font-size: 14px; margin-bottom: 4px;">Razão Social: <strong>Lavoro Veiculos e Pecas Ltda</strong></div>
            <div style="color: #1a1a1a; font-size: 14px;">CNPJ: <strong>38.455.415/0001-22</strong></div>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Data:</div>
            <div class="info-value">${new Date(pedido.data).toLocaleDateString('pt-BR')}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Local:</div>
            <div class="info-value">${pedido.local || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Vendedor:</div>
            <div class="info-value">${pedido.nome_vendedor}</div>
          </div>
        </div>

        <div class="info-section">
          <h2>📋 DADOS DO CLIENTE</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nome/Razão Social:</div>
              <div class="info-value">${pedido.nome_cliente}</div>
            </div>
            <div class="info-item">
              <div class="info-label">CNPJ/CPF:</div>
              <div class="info-value">${pedido.cnpj}</div>
            </div>
            <div class="info-item">
              <div class="info-label">IE/RG:</div>
              <div class="info-value">${pedido.ie_rg || '-'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Telefone:</div>
              <div class="info-value">${pedido.telefone_cliente || '-'}</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Endereço:</div>
              <div class="info-value">${pedido.rua || ''} ${pedido.numero || ''}, ${pedido.bairro || ''} - ${pedido.cidade || ''} / ${pedido.estado || ''} - CEP: ${pedido.cep || '-'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Responsável pela Frota:</div>
              <div class="info-value">${pedido.responsavel_frota || '-'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">E-mail do Responsável:</div>
              <div class="info-value">${pedido.email_responsavel || '-'}</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>🚛 DESCRIÇÃO DOS PRODUTOS</h2>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th style="text-align: center;">Qtd</th>
                <th style="text-align: center;">Ano/Modelo</th>
                <th style="text-align: right;">Valor Unit.</th>
                <th style="text-align: right;">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              ${produtosHTML}
              <tr style="background-color: #f8f9fa; border-top: 2px solid #0f2557;">
                <td colspan="4" style="padding: 12px 8px; text-align: right; font-weight: 700; border-bottom: none;">VALOR TOTAL DOS PRODUTOS:</td>
                <td style="padding: 12px 8px; text-align: right; font-weight: 700; color: #0f2557; font-size: 16px; border-bottom: none;">R$ ${pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="info-section">
          <h2>💰 CONDIÇÕES COMERCIAIS & FINANCEIRAS</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Tipo de Faturamento:</div>
              <div class="info-value">${pedido.faturamento_tipo}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Instituição Financeira:</div>
              <div class="info-value">${pedido.nome_instituicao || '-'}</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Forma de Pagamento:</div>
              <div class="info-value">${pedido.financiamento_forma}${pedido.financiamento_forma_outros ? ` (${pedido.financiamento_forma_outros})` : ''}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Valor Total dos Produtos:</div>
              <div class="info-value" style="font-weight: 700; color: #0f2557;">R$ ${pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Entrada:</div>
              <div class="info-value" style="font-weight: 700; color: #16a34a;">R$ ${(pedido.entrada || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Valor Financiado (Total - Entrada):</div>
              <div class="info-value" style="font-weight: 700; color: #dc2626;">R$ ${saldoFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        ${pedido.observacoes ? `
        <div class="info-section">
          <h2>📝 OBSERVAÇÕES</h2>
          <div class="observacoes-box">
            ${pedido.observacoes}
          </div>
        </div>
        ` : ''}

        <div class="signatures">
          <div class="signature-line">
            Assinatura do Cliente
          </div>
          <div class="signature-line">
            Assinatura do Vendedor
          </div>
          <div class="signature-line">
            Assinatura do Gerente
          </div>
        </div>

        <div class="footer">
          <p><strong>FOTON LAVORO</strong></p>
          <p>Pedido gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pedido: PedidoData = await req.json();

    console.log("Gerando PDF para pedido:", pedido.numero_pedido);

    const pdfHTML = gerarPDFHTML(pedido);

    // Enviar email com o HTML do pedido
    const emailResponse = await resend.emails.send({
      from: "Lavoro Foton <onboarding@resend.dev>",
      to: ["matheus@lavorofoton.com.br", "fernando@lavorofoton.com.br"],
      subject: `Novo Pedido de Faturamento - ${pedido.numero_pedido}`,
      html: pdfHTML,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        pdfHTML,
        emailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Erro ao gerar PDF:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);