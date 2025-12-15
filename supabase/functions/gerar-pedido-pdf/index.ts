import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

// Função para formatar valores monetários corretamente em BRL
function formatarMoeda(valor: number): string {
  const valorFormatado = valor.toFixed(2);
  const [inteiro, decimal] = valorFormatado.split('.');
  const inteiroComMilhares = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${inteiroComMilhares},${decimal}`;
}

function gerarPDFHTML(pedido: PedidoData): string {
  const produtosHTML = pedido.produtos.map((p, index) => `
    <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : '#ffffff'};">
      <td style="padding: 6px; border-bottom: 1px solid #e9ecef;">${p.produto}</td>
      <td style="padding: 6px; text-align: center; border-bottom: 1px solid #e9ecef;">${p.quantidade}</td>
      <td style="padding: 6px; text-align: center; border-bottom: 1px solid #e9ecef;">${p.anoModelo}</td>
      <td style="padding: 6px; text-align: right; border-bottom: 1px solid #e9ecef;">R$ ${formatarMoeda(p.valorUnitario)}</td>
      <td style="padding: 6px; text-align: right; font-weight: 600; border-bottom: 1px solid #e9ecef;">R$ ${formatarMoeda(p.valorTotal)}</td>
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
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          box-sizing: border-box;
        }
        @page {
          margin: 8mm 12mm;
          size: A4;
        }
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
          }
          .container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Evita bugs de impressão com CSS Grid (páginas em branco) */
          .info-grid {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }
          .info-item {
            width: 50% !important;
          }
          .info-item[style*="grid-column: 1 / -1"] {
            width: 100% !important;
          }
          .signatures {
            display: flex !important;
            gap: 12px !important;
          }
          .signature-line {
            flex: 1 1 0 !important;
          }
        }
        html {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 0;
          margin: 0;
          color: #1a1a1a;
          line-height: 1.4;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0;
        }
        .header {
          text-align: center;
          margin-bottom: 10px;
          padding: 10px;
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          border-bottom: 2px solid #0f2557;
        }
        .logo {
          max-width: 200px;
          height: auto;
          margin: 0 auto 6px auto;
          display: block;
        }
        .header h1 {
          color: #ffffff;
          margin: 6px 0 4px 0;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .pedido-numero {
          background-color: #ef4444;
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          margin-top: 4px;
        }
        .info-section {
          margin: 8px 0;
        }
        .info-section h2 {
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          color: white;
          padding: 6px 10px;
          margin: 8px 0 6px 0;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin: 6px 0;
          background-color: #f8f9fa;
          padding: 8px;
          border-radius: 3px;
        }
        .info-item {
          padding: 2px;
        }
        .info-label {
          font-weight: 600;
          color: #0f2557;
          margin-bottom: 1px;
          font-size: 10px;
        }
        .info-value {
          color: #1a1a1a;
          font-size: 11px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 6px 0;
          background-color: white;
          border-radius: 3px;
          overflow: hidden;
        }
        th {
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          color: white;
          padding: 6px 6px;
          text-align: left;
          font-weight: 600;
          font-size: 10px;
        }
        td {
          padding: 6px;
          font-size: 10px;
        }
        .signatures {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
        .signature-line {
          border-top: 2px solid #0f2557;
          padding-top: 4px;
          text-align: center;
          font-weight: 600;
          color: #0f2557;
          font-size: 10px;
        }
        .footer {
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 9px;
        }
        .observacoes-box {
          background-color: #f1f5f9;
          border-left: 3px solid #1e40af;
          padding: 8px;
          border-radius: 3px;
          margin: 8px 0;
          font-size: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${supabaseUrl}/storage/v1/object/public/assets/logo-linha-lavoro.png" alt="Linha Lavoro Foton" class="logo" onerror="this.style.display='none';">
          <h1>PEDIDO DE FATURAMENTO</h1>
          <div class="pedido-numero">Nº ${pedido.numero_pedido}</div>
        </div>

        <div class="info-grid" style="margin-bottom: 10px;">
          <div class="info-item" style="grid-column: 1 / -1; text-align: center; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
            <div style="font-weight: 700; color: #0f2557; font-size: 14px; margin-bottom: 4px;">Lavoro Foton</div>
            <div style="color: #1a1a1a; font-size: 11px; margin-bottom: 2px;">Razão Social: <strong>Lavoro Veiculos e Pecas Ltda</strong></div>
            <div style="color: #1a1a1a; font-size: 11px;">CNPJ: <strong>38.455.415/0001-22</strong></div>
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
                <td colspan="4" style="padding: 8px 6px; text-align: right; font-weight: 700; border-bottom: none;">VALOR TOTAL:</td>
                <td style="padding: 8px 6px; text-align: right; font-weight: 700; color: #0f2557; font-size: 12px; border-bottom: none;">R$ ${formatarMoeda(pedido.valor_total_produtos)}</td>
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
              <div class="info-label">Valor Total:</div>
              <div class="info-value" style="font-weight: 700; color: #0f2557;">R$ ${formatarMoeda(pedido.valor_total_produtos)}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Entrada:</div>
              <div class="info-value" style="font-weight: 700; color: #16a34a;">R$ ${formatarMoeda(pedido.entrada || 0)}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Saldo Financiado:</div>
              <div class="info-value" style="font-weight: 700; color: #dc2626;">R$ ${formatarMoeda(saldoFinanciado)}</div>
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

        <!-- Seção - Termos e Condições -->
        <div style="margin-top: 10px; background: #fff; border: 1px solid #d1d5db; border-radius: 3px;">
          <div style="padding: 8px;">
            <p style="font-size: 8px; color: #1a1a1a; margin: 0 0 4px 0; line-height: 1.3; text-transform: uppercase;">
              DE ACORDO COM A DISPONIBILIDADE DE ESTOQUE E FÁBRICA. O REPRESENTANTE DA ENTREGA TÉCNICA LAVORO ENTRARÁ EM CONTATO PARA AGENDAMENTO DA ENTREGA.
            </p>
            
            <p style="font-size: 8px; color: #1a1a1a; margin: 6px 0 3px 0; font-weight: 700;">OBS.:</p>
            
            <p style="font-size: 7px; color: #374151; margin: 0 0 2px 0; line-height: 1.3; text-align: justify; padding-left: 8px;">
              <strong>1.</strong> OS PREÇOS COTADOS SÃO OS VIGENTES NESTA OCASIÃO E ESTARÃO SUJEITOS À ALTERAÇÕES CASO O FABRICANTE MODIFIQUE SUAS NORMAS DE COMERCIALIZAÇÃO, NO QUE TANGE À PREÇOS, DESCONTOS OU PRAZOS DE PAGAMENTOS, E TAMBÉM A ALTERAÇÃO DE ALÍQUOTA DO ICMS/IPI CONFORME LEGISLAÇÃO ESTADUAL E FEDERAL.
            </p>
            
            <p style="font-size: 7px; color: #374151; margin: 0 0 2px 0; line-height: 1.3; text-align: justify; padding-left: 8px;">
              <strong>2.</strong> O pedido de venda não terá validade se não estiver devidamente preenchido e assinado, sem rasurar.
            </p>
            
            <p style="font-size: 7px; color: #374151; margin: 0 0 2px 0; line-height: 1.3; text-align: justify; padding-left: 8px;">
              <strong>3.</strong> Em caso de desistência, o comprador não terá direito à restituição do valor do sinal. Respaldo legal nos artigos 417 e 418 do Código Civil, sendo denominado juridicamente como arras. Caso haja majoração de preço, o mesmo será repassado ao comprador.
            </p>
            
            <p style="font-size: 7px; color: #374151; margin: 0 0 4px 0; line-height: 1.3; text-align: justify; padding-left: 8px;">
              <strong>4.</strong> Caso parte do pagamento do veículo adquirido seja efetivado com outro veículo usado (troca com torna), o veículo usado não será, em nenhuma hipótese, restituído ao COMPRADOR, ainda que venha a ocorrer desistência, cancelamento da compra, resolução contratual, vício, arrependimento, devolução do veículo novo ou qualquer outra causa que impeça ou inviabilize a conclusão da venda. O COMPRADOR declara estar ciente de que o veículo usado será desde logo disposto, negociado ou revendido pelo CONCESSIONÁRIO.
            </p>
            
            <p style="font-size: 7px; color: #374151; margin: 0 0 2px 0; line-height: 1.3;">
              <strong>PESSOA FÍSICA:</strong> CÓPIA RG, CPF E COMPROVANTE DE ENDEREÇO ATUALIZADO.
            </p>
            <p style="font-size: 7px; color: #374151; margin: 0; line-height: 1.3;">
              <strong>PESSOA JURÍDICA:</strong> CONTRATO SOCIAL, ÚLTIMA ALTERAÇÃO, RG E CPF DO SÓCIO ADMINISTRADOR.
            </p>
          </div>
        </div>

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

    return new Response(
      JSON.stringify({ 
        success: true,
        pdfHTML
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