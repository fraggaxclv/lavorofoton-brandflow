import { formatCurrency, STATUS_LABELS, ORIGEM_LABELS, StatusNegociacao, OrigemLead } from "@/types/interno";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função auxiliar para escapar valores CSV
function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Converter array de objetos para CSV
function arrayToCSV(data: Record<string, unknown>[], headers: { key: string; label: string }[]): string {
  const headerRow = headers.map(h => escapeCsvValue(h.label)).join(",");
  const rows = data.map(item => 
    headers.map(h => escapeCsvValue(item[h.key])).join(",")
  );
  return [headerRow, ...rows].join("\n");
}

// Baixar arquivo
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob(["\ufeff" + content], { type: mimeType }); // BOM para Excel
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Exportar negociações
interface NegociacaoExport {
  numero_negociacao: string;
  cliente?: { nome_fantasia?: string; razao_social?: string };
  status: string;
  origem_lead: string;
  produto_principal?: string;
  valor_estimado: number;
  data_proximo_passo?: string;
  data_fechamento?: string;
  created_at: string;
  owner?: { nome_exibicao?: string; full_name?: string; email?: string };
}

export function exportNegociacoesToCSV(negociacoes: NegociacaoExport[], filename?: string) {
  const data = negociacoes.map(n => ({
    numero: n.numero_negociacao,
    cliente: n.cliente?.nome_fantasia || n.cliente?.razao_social || "",
    status: STATUS_LABELS[n.status as StatusNegociacao] || n.status,
    origem: ORIGEM_LABELS[n.origem_lead as OrigemLead] || n.origem_lead,
    produto: n.produto_principal || "",
    valor: formatCurrency(n.valor_estimado || 0),
    proximo_passo: n.data_proximo_passo ? format(new Date(n.data_proximo_passo), "dd/MM/yyyy") : "",
    fechamento: n.data_fechamento ? format(new Date(n.data_fechamento), "dd/MM/yyyy") : "",
    criado_em: format(new Date(n.created_at), "dd/MM/yyyy"),
    consultor: n.owner?.nome_exibicao || n.owner?.full_name || n.owner?.email || "",
  }));

  const headers = [
    { key: "numero", label: "Número" },
    { key: "cliente", label: "Cliente" },
    { key: "status", label: "Status" },
    { key: "origem", label: "Origem" },
    { key: "produto", label: "Produto" },
    { key: "valor", label: "Valor" },
    { key: "proximo_passo", label: "Próximo Passo" },
    { key: "fechamento", label: "Fechamento" },
    { key: "criado_em", label: "Criado Em" },
    { key: "consultor", label: "Consultor" },
  ];

  const csv = arrayToCSV(data, headers);
  const dateStr = format(new Date(), "yyyy-MM-dd");
  downloadFile(csv, filename || `negociacoes_${dateStr}.csv`, "text/csv;charset=utf-8");
}

// Exportar clientes
interface ClienteExport {
  nome_fantasia?: string;
  razao_social: string;
  tipo: string;
  cpf_cnpj: string;
  telefone?: string;
  email?: string;
  cidade?: string;
  estado?: string;
  responsavel?: string;
  created_at: string;
}

export function exportClientesToCSV(clientes: ClienteExport[], filename?: string) {
  const data = clientes.map(c => ({
    nome_fantasia: c.nome_fantasia || "",
    razao_social: c.razao_social,
    tipo: c.tipo === "pj" || c.tipo === "PJ" ? "Pessoa Jurídica" : "Pessoa Física",
    cpf_cnpj: c.cpf_cnpj,
    telefone: c.telefone || "",
    email: c.email || "",
    cidade: c.cidade || "",
    estado: c.estado || "",
    responsavel: c.responsavel || "",
    criado_em: format(new Date(c.created_at), "dd/MM/yyyy"),
  }));

  const headers = [
    { key: "nome_fantasia", label: "Nome Fantasia" },
    { key: "razao_social", label: "Razão Social" },
    { key: "tipo", label: "Tipo" },
    { key: "cpf_cnpj", label: "CPF/CNPJ" },
    { key: "telefone", label: "Telefone" },
    { key: "email", label: "Email" },
    { key: "cidade", label: "Cidade" },
    { key: "estado", label: "Estado" },
    { key: "responsavel", label: "Responsável" },
    { key: "criado_em", label: "Criado Em" },
  ];

  const csv = arrayToCSV(data, headers);
  const dateStr = format(new Date(), "yyyy-MM-dd");
  downloadFile(csv, filename || `clientes_${dateStr}.csv`, "text/csv;charset=utf-8");
}

// Exportar ranking de consultores
interface ConsultorRankingExport {
  nome: string;
  email: string;
  faturados: number;
  valorFaturado: number;
  pipeline: number;
  meta?: number;
}

export function exportRankingToCSV(ranking: ConsultorRankingExport[], filename?: string) {
  const data = ranking.map((r, index) => ({
    posicao: index + 1,
    nome: r.nome,
    email: r.email,
    faturados: r.faturados,
    valor_faturado: formatCurrency(r.valorFaturado),
    pipeline: formatCurrency(r.pipeline),
    meta: r.meta ? r.meta : "Não definida",
    atingimento: r.meta ? `${((r.faturados / r.meta) * 100).toFixed(0)}%` : "-",
  }));

  const headers = [
    { key: "posicao", label: "Posição" },
    { key: "nome", label: "Consultor" },
    { key: "email", label: "Email" },
    { key: "faturados", label: "Faturados" },
    { key: "valor_faturado", label: "Valor Faturado" },
    { key: "pipeline", label: "Pipeline" },
    { key: "meta", label: "Meta" },
    { key: "atingimento", label: "Atingimento" },
  ];

  const csv = arrayToCSV(data, headers);
  const dateStr = format(new Date(), "yyyy-MM-dd");
  downloadFile(csv, filename || `ranking_consultores_${dateStr}.csv`, "text/csv;charset=utf-8");
}

// Exportar relatório do dashboard
interface DashboardReportData {
  kpis: {
    negociacoesAtivas: number;
    valorPipeline: number;
    taxaConversao: number;
    ticketMedio: number;
  };
  faturadosMes: number;
  tendencia: {
    mes: string;
    mesLabel: string;
    faturados: number;
    valorFaturado: number;
    novosLeads: number;
  }[];
  ranking: ConsultorRankingExport[];
}

export function exportDashboardToCSV(data: DashboardReportData, filename?: string) {
  const dateStr = format(new Date(), "yyyy-MM-dd");
  const mesAtual = format(new Date(), "MMMM yyyy", { locale: ptBR });

  // Criar conteúdo multi-seção
  let content = `RELATÓRIO DO DASHBOARD - ${mesAtual.toUpperCase()}\n\n`;
  
  content += "=== INDICADORES PRINCIPAIS ===\n";
  content += `Negociações Ativas,${data.kpis.negociacoesAtivas}\n`;
  content += `Valor em Pipeline,${formatCurrency(data.kpis.valorPipeline)}\n`;
  content += `Taxa de Conversão,${data.kpis.taxaConversao.toFixed(1)}%\n`;
  content += `Ticket Médio,${formatCurrency(data.kpis.ticketMedio)}\n`;
  content += `Faturados no Mês,${data.faturadosMes}\n\n`;

  content += "=== TENDÊNCIA MENSAL ===\n";
  content += "Mês,Faturados,Valor Faturado,Novos Leads\n";
  data.tendencia.forEach(t => {
    content += `${t.mesLabel},${t.faturados},${formatCurrency(t.valorFaturado)},${t.novosLeads}\n`;
  });
  content += "\n";

  content += "=== RANKING DE CONSULTORES ===\n";
  content += "Posição,Consultor,Faturados,Valor Faturado,Pipeline\n";
  data.ranking.forEach((r, i) => {
    content += `${i + 1},${r.nome},${r.faturados},${formatCurrency(r.valorFaturado)},${formatCurrency(r.pipeline)}\n`;
  });

  downloadFile(content, filename || `relatorio_dashboard_${dateStr}.csv`, "text/csv;charset=utf-8");
}
