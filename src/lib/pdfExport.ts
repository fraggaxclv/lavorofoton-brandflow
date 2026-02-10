import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCurrency, STATUS_LABELS, StatusNegociacao, ORIGEM_LABELS, OrigemLead } from "@/types/interno";

// Logo base64 will be loaded dynamically
let logoBase64Cache: string | null = null;

async function getLogoBase64(): Promise<string> {
  if (logoBase64Cache) return logoBase64Cache;
  
  try {
    const response = await fetch("/logo-foton-lavoro.png");
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        logoBase64Cache = reader.result as string;
        resolve(logoBase64Cache);
      };
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

function generatePDFHTML(title: string, content: string, dateStr: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @media print { @page { margin: 15mm; size: A4; } }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 11px; line-height: 1.4; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1e40af; padding-bottom: 12px; margin-bottom: 20px; }
    .header-logo img { height: 45px; }
    .header-info { text-align: right; }
    .header-info h1 { font-size: 16px; color: #1e40af; margin-bottom: 2px; }
    .header-info p { font-size: 10px; color: #666; }
    .section { margin-bottom: 16px; }
    .section-title { font-size: 13px; font-weight: 700; color: #1e40af; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; font-size: 10px; }
    th { background-color: #1e40af; color: white; padding: 6px 8px; text-align: left; font-weight: 600; }
    td { padding: 5px 8px; border-bottom: 1px solid #e5e5e5; }
    tr:nth-child(even) { background-color: #f8fafc; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
    .kpi-card { border: 1px solid #e5e5e5; border-radius: 6px; padding: 10px; text-align: center; }
    .kpi-card .value { font-size: 18px; font-weight: 700; color: #1e40af; }
    .kpi-card .label { font-size: 9px; color: #666; text-transform: uppercase; margin-top: 2px; }
    .footer { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 8px; text-align: center; font-size: 9px; color: #999; }
    .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600; }
  </style>
</head>
<body>
  ${content}
  <div class="footer">
    Foton Lavoro — Relatório gerado em ${dateStr} — Documento interno e confidencial
  </div>
</body>
</html>`;
}

function printHTML(html: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

// ===== EXPORTAR NEGOCIAÇÕES =====
interface NegociacaoPDF {
  numero_negociacao: string;
  cliente?: { nome_fantasia?: string; razao_social?: string };
  status: string;
  origem_lead: string;
  produto_principal?: string;
  valor_estimado: number;
  created_at: string;
  owner?: { nome_exibicao?: string; full_name?: string; email?: string };
}

export async function exportNegociacoesPDF(negociacoes: NegociacaoPDF[]) {
  const logo = await getLogoBase64();
  const dateStr = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  const totalValor = negociacoes.reduce((acc, n) => acc + (n.valor_estimado || 0), 0);
  
  const rows = negociacoes.map(n => `
    <tr>
      <td>${n.numero_negociacao}</td>
      <td>${n.cliente?.nome_fantasia || n.cliente?.razao_social || "—"}</td>
      <td><span class="badge" style="background:#e0e7ff;color:#1e40af;">${STATUS_LABELS[n.status as StatusNegociacao] || n.status}</span></td>
      <td>${ORIGEM_LABELS[n.origem_lead as OrigemLead] || n.origem_lead}</td>
      <td>${n.produto_principal || "—"}</td>
      <td style="text-align:right">${formatCurrency(n.valor_estimado || 0)}</td>
      <td>${n.owner?.nome_exibicao || n.owner?.full_name || "—"}</td>
    </tr>
  `).join("");

  const content = `
    <div class="header">
      <div class="header-logo">${logo ? `<img src="${logo}" alt="Foton Lavoro" />` : "<strong>FOTON LAVORO</strong>"}</div>
      <div class="header-info">
        <h1>Relatório de Negociações</h1>
        <p>${dateStr}</p>
      </div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="value">${negociacoes.length}</div><div class="label">Total</div></div>
      <div class="kpi-card"><div class="value">${formatCurrency(totalValor)}</div><div class="label">Valor Total</div></div>
      <div class="kpi-card"><div class="value">${negociacoes.filter(n => n.status === "faturado").length}</div><div class="label">Faturados</div></div>
      <div class="kpi-card"><div class="value">${negociacoes.filter(n => n.status === "perdido").length}</div><div class="label">Perdidos</div></div>
    </div>
    <div class="section">
      <div class="section-title">Listagem Completa</div>
      <table>
        <thead><tr><th>Nº</th><th>Cliente</th><th>Status</th><th>Origem</th><th>Produto</th><th style="text-align:right">Valor</th><th>Consultor</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  const html = generatePDFHTML("Relatório de Negociações", content, dateStr);
  printHTML(html);
}

// ===== EXPORTAR CLIENTES =====
interface ClientePDF {
  nome_fantasia?: string;
  razao_social: string;
  tipo: string;
  cpf_cnpj: string;
  telefone?: string;
  email?: string;
  cidade?: string;
  estado?: string;
  created_at: string;
}

export async function exportClientesPDF(clientes: ClientePDF[]) {
  const logo = await getLogoBase64();
  const dateStr = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  const pj = clientes.filter(c => c.tipo?.toLowerCase() === "pj").length;
  const pf = clientes.length - pj;

  const rows = clientes.map(c => `
    <tr>
      <td>${c.nome_fantasia || c.razao_social}</td>
      <td>${c.cpf_cnpj}</td>
      <td>${c.tipo?.toUpperCase() === "PJ" ? "PJ" : "PF"}</td>
      <td>${c.telefone || "—"}</td>
      <td>${c.email || "—"}</td>
      <td>${[c.cidade, c.estado].filter(Boolean).join(" - ") || "—"}</td>
    </tr>
  `).join("");

  const content = `
    <div class="header">
      <div class="header-logo">${logo ? `<img src="${logo}" alt="Foton Lavoro" />` : "<strong>FOTON LAVORO</strong>"}</div>
      <div class="header-info">
        <h1>Relatório de Clientes</h1>
        <p>${dateStr}</p>
      </div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="value">${clientes.length}</div><div class="label">Total</div></div>
      <div class="kpi-card"><div class="value">${pj}</div><div class="label">Pessoa Jurídica</div></div>
      <div class="kpi-card"><div class="value">${pf}</div><div class="label">Pessoa Física</div></div>
      <div class="kpi-card"><div class="value">—</div><div class="label">—</div></div>
    </div>
    <div class="section">
      <div class="section-title">Listagem Completa</div>
      <table>
        <thead><tr><th>Nome</th><th>CPF/CNPJ</th><th>Tipo</th><th>Telefone</th><th>Email</th><th>Localização</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  const html = generatePDFHTML("Relatório de Clientes", content, dateStr);
  printHTML(html);
}

// ===== EXPORTAR DASHBOARD =====
interface DashboardPDFData {
  kpis: { negociacoesAtivas: number; valorPipeline: number; taxaConversao: number; ticketMedio: number };
  faturadosMes: number;
  ranking: { nome: string; faturados: number; valorFaturado: number; pipeline: number }[];
}

export async function exportDashboardPDF(data: DashboardPDFData) {
  const logo = await getLogoBase64();
  const dateStr = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  const mesAtual = format(new Date(), "MMMM yyyy", { locale: ptBR });

  const rankingRows = data.ranking.map((r, i) => `
    <tr>
      <td style="font-weight:bold">#${i + 1}</td>
      <td>${r.nome}</td>
      <td style="text-align:center">${r.faturados}</td>
      <td style="text-align:right">${formatCurrency(r.valorFaturado)}</td>
      <td style="text-align:right">${formatCurrency(r.pipeline)}</td>
    </tr>
  `).join("");

  const content = `
    <div class="header">
      <div class="header-logo">${logo ? `<img src="${logo}" alt="Foton Lavoro" />` : "<strong>FOTON LAVORO</strong>"}</div>
      <div class="header-info">
        <h1>Dashboard — ${mesAtual}</h1>
        <p>${dateStr}</p>
      </div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="value">${data.kpis.negociacoesAtivas}</div><div class="label">Negociações Ativas</div></div>
      <div class="kpi-card"><div class="value">${formatCurrency(data.kpis.valorPipeline)}</div><div class="label">Pipeline</div></div>
      <div class="kpi-card"><div class="value">${data.kpis.taxaConversao.toFixed(1)}%</div><div class="label">Conversão</div></div>
      <div class="kpi-card"><div class="value">${formatCurrency(data.kpis.ticketMedio)}</div><div class="label">Ticket Médio</div></div>
    </div>
    <div class="section">
      <div class="section-title">Ranking de Consultores</div>
      <table>
        <thead><tr><th>#</th><th>Consultor</th><th style="text-align:center">Faturados</th><th style="text-align:right">Valor Faturado</th><th style="text-align:right">Pipeline</th></tr></thead>
        <tbody>${rankingRows}</tbody>
      </table>
    </div>`;

  const html = generatePDFHTML("Dashboard", content, dateStr);
  printHTML(html);
}

// ===== EXPORTAR PERDAS =====
interface PerdaPDF {
  numero: string;
  cliente: string;
  motivo: string;
  valor: number;
  consultor: string;
  data: string;
  produto: string;
}

export async function exportPerdasPDF(perdas: PerdaPDF[]) {
  const logo = await getLogoBase64();
  const dateStr = format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  const totalValor = perdas.reduce((acc, p) => acc + p.valor, 0);

  const rows = perdas.map(p => `
    <tr>
      <td>${p.numero}</td>
      <td>${p.cliente}</td>
      <td>${p.motivo}</td>
      <td>${p.produto || "—"}</td>
      <td style="text-align:right">${formatCurrency(p.valor)}</td>
      <td>${p.consultor}</td>
      <td>${format(new Date(p.data), "dd/MM/yy")}</td>
    </tr>
  `).join("");

  const content = `
    <div class="header">
      <div class="header-logo">${logo ? `<img src="${logo}" alt="Foton Lavoro" />` : "<strong>FOTON LAVORO</strong>"}</div>
      <div class="header-info">
        <h1>Relatório de Perdas</h1>
        <p>${dateStr}</p>
      </div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="value">${perdas.length}</div><div class="label">Total Perdas</div></div>
      <div class="kpi-card"><div class="value">${formatCurrency(totalValor)}</div><div class="label">Valor Perdido</div></div>
      <div class="kpi-card"><div class="value">—</div><div class="label">—</div></div>
      <div class="kpi-card"><div class="value">—</div><div class="label">—</div></div>
    </div>
    <div class="section">
      <div class="section-title">Detalhamento</div>
      <table>
        <thead><tr><th>Nº</th><th>Cliente</th><th>Motivo</th><th>Produto</th><th style="text-align:right">Valor</th><th>Consultor</th><th>Data</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  const html = generatePDFHTML("Relatório de Perdas", content, dateStr);
  printHTML(html);
}
