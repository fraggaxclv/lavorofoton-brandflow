// =====================================================
// TIPOS DO SISTEMA INTERNO - CRM/PIPELINE
// =====================================================

export type UserRole = 'admin' | 'vendedor' | 'financeiro';

export type StatusNegociacao = 
  | 'lead_novo'
  | 'proposta_enviada'
  | 'negociacao'
  | 'credito_analise'
  | 'aprovado'
  | 'faturado'
  | 'perdido';

export type TipoAtividade = 
  | 'ligacao'
  | 'whatsapp'
  | 'reuniao'
  | 'proposta'
  | 'documento'
  | 'email'
  | 'visita'
  | 'outro';

export type OrigemLead = 
  | 'site'
  | 'whatsapp'
  | 'indicacao'
  | 'trafego_pago'
  | 'telefone'
  | 'visita_loja'
  | 'evento'
  | 'outro';

export type TipoCliente = 'pj' | 'pf' | 'PJ' | 'PF';

export type TipoVenda = 'estoque' | 'fadireto';

export interface Cliente {
  id: string;
  tipo: TipoCliente;
  nome_fantasia?: string;
  razao_social: string;
  cpf_cnpj: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
  email?: string;
  responsavel?: string;
  observacoes?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  vendedor_responsavel?: string;
}

export interface Negociacao {
  id: string;
  numero_negociacao: string;
  cliente_id: string;
  owner_user_id: string;
  origem_lead: OrigemLead;
  tipo_venda: TipoVenda;
  produto_principal?: string;
  produtos: ProdutoNegociacao[];
  valor_estimado: number;
  status: StatusNegociacao;
  probabilidade: number;
  proximo_passo?: string;
  data_proximo_passo?: string;
  motivo_perda?: string;
  data_fechamento?: string;
  observacoes?: string;
  ultima_atualizacao: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  // Relacionamentos expandidos
  cliente?: Cliente;
  owner?: {
    id: string;
    email: string;
    full_name?: string;
    nome_exibicao?: string;
  };
}

export interface ProdutoNegociacao {
  nome: string;
  quantidade: number;
  valor_unitario?: number;
}

export interface Atividade {
  id: string;
  negociacao_id: string;
  tipo: TipoAtividade;
  titulo?: string;
  nota?: string;
  data_hora: string;
  created_at: string;
  created_by?: string;
  // Relacionamento expandido
  criador?: {
    email: string;
    full_name?: string;
    nome_exibicao?: string;
  };
}

// Labels para exibição
export const STATUS_LABELS: Record<StatusNegociacao, string> = {
  lead_novo: 'Lead Novo',
  proposta_enviada: 'Proposta Enviada',
  negociacao: 'Em Negociação',
  credito_analise: 'Crédito em Análise',
  aprovado: 'Aprovado',
  faturado: 'Faturado',
  perdido: 'Perdido',
};

export const STATUS_COLORS: Record<StatusNegociacao, string> = {
  lead_novo: '#6b7280',
  proposta_enviada: '#3b82f6',
  negociacao: '#eab308',
  credito_analise: '#f97316',
  aprovado: '#84cc16',
  faturado: '#16a34a',
  perdido: '#ef4444',
};

export const STATUS_PROBABILIDADE_PADRAO: Record<StatusNegociacao, number> = {
  lead_novo: 10,
  proposta_enviada: 30,
  negociacao: 50,
  credito_analise: 60,
  aprovado: 80,
  faturado: 100,
  perdido: 0,
};

export const TIPO_CLIENTE_LABELS: Record<string, string> = {
  pf: 'Pessoa Física',
  pj: 'Pessoa Jurídica',
  PF: 'Pessoa Física',
  PJ: 'Pessoa Jurídica',
};

export const ORIGEM_LEAD_LABELS: Record<OrigemLead, string> = {
  site: 'Site',
  whatsapp: 'WhatsApp',
  indicacao: 'Indicação',
  trafego_pago: 'Tráfego Pago',
  telefone: 'Telefone',
  visita_loja: 'Visita à Loja',
  evento: 'Evento',
  outro: 'Outro',
};

export const ORIGEM_LABELS = ORIGEM_LEAD_LABELS;

export const TIPO_VENDA_LABELS: Record<TipoVenda, string> = {
  estoque: 'Estoque',
  fadireto: 'Fábrica Direto',
};

export const TIPO_ATIVIDADE_LABELS: Record<TipoAtividade, string> = {
  ligacao: 'Ligação',
  whatsapp: 'WhatsApp',
  reuniao: 'Reunião',
  proposta: 'Proposta',
  documento: 'Documento',
  email: 'E-mail',
  visita: 'Visita',
  outro: 'Outro',
};

export const TIPO_ATIVIDADE_ICONS: Record<TipoAtividade, string> = {
  ligacao: '📞',
  whatsapp: '💬',
  reuniao: '🤝',
  proposta: '📄',
  documento: '📋',
  email: '✉️',
  visita: '🏢',
  outro: '📌',
};

export const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatCurrencyCompact(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Mi`;
  }
  if (Math.abs(value) >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })} mil`;
  }
  return formatCurrency(value);
}

// Métricas para Dashboard
export interface DashboardMetrics {
  totalNegociacoes: number;
  negociacoesAbertas: number;
  propostasEnviadas: number;
  creditoAnalise: number;
  aprovados: number;
  faturadosMes: number;
  valorPipeline: number;
  valorFaturadoMes: number;
  negociacoesSemAtualizacao: number;
  proximosPassosVencidos: number;
}

export interface RankingVendedor {
  id: string;
  nome: string;
  email: string;
  totalPipeline: number;
  totalFaturado: number;
  negociacoesAbertas: number;
}
