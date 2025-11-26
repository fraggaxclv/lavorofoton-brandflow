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
  const produtosHTML = pedido.produtos.map(p => `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${p.produto}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.quantidade}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.anoModelo}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">R$ ${p.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">R$ ${p.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
    </tr>
  `).join('');

  const saldoFinanciado = pedido.valor_total_produtos - (pedido.entrada || 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #1e40af;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #1e40af;
          margin: 10px 0;
        }
        .info-section {
          margin: 20px 0;
        }
        .info-section h2 {
          background-color: #1e40af;
          color: white;
          padding: 10px;
          margin: 20px 0 10px 0;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 10px 0;
        }
        .info-item {
          padding: 5px;
        }
        .info-label {
          font-weight: bold;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        th {
          background-color: #1e40af;
          color: white;
          padding: 10px;
          text-align: left;
        }
        td {
          padding: 8px;
          border: 1px solid #ddd;
        }
        .total-box {
          background-color: #f0f9ff;
          border: 2px solid #1e40af;
          padding: 15px;
          margin: 20px 0;
          text-align: right;
        }
        .total-box .value {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
        }
        .signatures {
          margin-top: 60px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
        }
        .signature-line {
          border-top: 1px solid #333;
          padding-top: 5px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>PEDIDO DE FATURAMENTO</h1>
        <h3>LAVORO FOTON</h3>
        <p style="font-size: 18px; font-weight: bold;">Nº ${pedido.numero_pedido}</p>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Data:</span> ${new Date(pedido.data).toLocaleDateString('pt-BR')}
        </div>
        <div class="info-item">
          <span class="info-label">Local:</span> ${pedido.local || '-'}
        </div>
        <div class="info-item">
          <span class="info-label">Vendedor:</span> ${pedido.nome_vendedor}
        </div>
      </div>

      <div class="info-section">
        <h2>DADOS DO CLIENTE</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Nome/Razão Social:</span> ${pedido.nome_cliente}
          </div>
          <div class="info-item">
            <span class="info-label">CNPJ/CPF:</span> ${pedido.cnpj}
          </div>
          <div class="info-item">
            <span class="info-label">IE/RG:</span> ${pedido.ie_rg || '-'}
          </div>
          <div class="info-item">
            <span class="info-label">Telefone:</span> ${pedido.telefone_cliente || '-'}
          </div>
        </div>
        <div class="info-item" style="margin: 10px 0;">
          <span class="info-label">Endereço:</span> ${pedido.rua || ''} ${pedido.numero || ''}, ${pedido.bairro || ''} - ${pedido.cidade || ''} / ${pedido.estado || ''} - CEP: ${pedido.cep || '-'}
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Responsável pela Frota:</span> ${pedido.responsavel_frota || '-'}
          </div>
          <div class="info-item">
            <span class="info-label">E-mail do Responsável:</span> ${pedido.email_responsavel || '-'}
          </div>
        </div>
      </div>

      <div class="info-section">
        <h2>DESCRIÇÃO DOS PRODUTOS</h2>
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
          </tbody>
        </table>
        <div class="total-box">
          <div>VALOR TOTAL DOS PRODUTOS</div>
          <div class="value">R$ ${pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div class="info-section">
        <h2>CONDIÇÕES COMERCIAIS & FINANCEIRAS</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Tipo de Faturamento:</span> ${pedido.faturamento_tipo}
          </div>
          <div class="info-item">
            <span class="info-label">Instituição Financeira:</span> ${pedido.nome_instituicao || '-'}
          </div>
          <div class="info-item">
            <span class="info-label">Forma de Pagamento:</span> ${pedido.financiamento_forma}${pedido.financiamento_forma_outros ? ` (${pedido.financiamento_forma_outros})` : ''}
          </div>
        </div>
        <div class="info-grid" style="margin-top: 15px;">
          <div class="info-item">
            <span class="info-label">Valor Total do Financiamento:</span> R$ ${pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div class="info-item">
            <span class="info-label">Entrada:</span> R$ ${(pedido.entrada || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div class="info-item">
            <span class="info-label">Saldo Financiado:</span> R$ ${saldoFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      ${pedido.observacoes ? `
      <div class="info-section">
        <h2>OBSERVAÇÕES</h2>
        <div style="padding: 10px; background-color: #f9f9f9; border-left: 3px solid #1e40af;">
          ${pedido.observacoes}
        </div>
      </div>
      ` : ''}

      <div class="signatures">
        <div class="signature-line">
          <div>Assinatura do Cliente</div>
        </div>
        <div class="signature-line">
          <div>Assinatura do Vendedor</div>
        </div>
        <div class="signature-line">
          <div>Assinatura do Gerente</div>
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