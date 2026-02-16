import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Handshake, Edit, Users as UsersIcon } from "lucide-react";
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  Cliente,
  TIPO_CLIENTE_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  StatusNegociacao,
  ORIGEM_LABELS,
  OrigemLead,
  formatCurrency,
} from "@/types/interno";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ClienteDetalheModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cliente: Cliente | null;
  onNovaNegociacao?: (cliente: Cliente) => void;
  onEdit?: (cliente: Cliente) => void;
  onAssign?: (cliente: Cliente) => void;
  isAdmin?: boolean;
}

function useClienteNegociacoes(clienteId: string | undefined) {
  return useQuery({
    queryKey: ["cliente-negociacoes", clienteId],
    queryFn: async () => {
      if (!clienteId) return [];
      const { data, error } = await supabase
        .from("negociacoes")
        .select(`
          *,
          owner:profiles!negociacoes_owner_user_id_profiles_fkey(id, email, full_name, nome_exibicao)
        `)
        .eq("cliente_id", clienteId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!clienteId,
  });
}

const statusIcon: Record<string, typeof CheckCircle2> = {
  faturado: CheckCircle2,
  perdido: AlertTriangle,
  lead_novo: Clock,
  proposta_enviada: FileText,
};

export default function ClienteDetalheModal({
  open,
  onOpenChange,
  cliente,
  onNovaNegociacao,
  onEdit,
  onAssign,
  isAdmin,
}: ClienteDetalheModalProps) {
  const { data: negociacoes, isLoading } = useClienteNegociacoes(
    open ? cliente?.id : undefined
  );

  if (!cliente) return null;

  const ativas = negociacoes?.filter(n => !["faturado", "perdido"].includes(n.status)) || [];
  const faturadas = negociacoes?.filter(n => n.status === "faturado") || [];
  const perdidas = negociacoes?.filter(n => n.status === "perdido") || [];

  const totalFaturado = faturadas.reduce((acc, n) => acc + (n.valor_estimado || 0), 0);
  const totalPipeline = ativas.reduce((acc, n) => acc + (n.valor_estimado || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {cliente.tipo?.toLowerCase() === "pj" ? (
              <Building2 className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-primary" />
            )}
            {cliente.nome_fantasia || cliente.razao_social}
          </DialogTitle>
        </DialogHeader>

        {/* Ações rápidas */}
        <div className="flex gap-2 flex-wrap">
          {onNovaNegociacao && (
            <Button size="sm" variant="outline" className="min-h-[44px] gap-1.5" onClick={() => onNovaNegociacao(cliente)}>
              <Handshake className="h-4 w-4" />
              Nova Negociação
            </Button>
          )}
          {onEdit && (
            <Button size="sm" variant="outline" className="min-h-[44px] gap-1.5" onClick={() => { onOpenChange(false); onEdit(cliente); }}>
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          )}
          {isAdmin && onAssign && (
            <Button size="sm" variant="outline" className="min-h-[44px] gap-1.5" onClick={() => { onOpenChange(false); onAssign(cliente); }}>
              <UsersIcon className="h-4 w-4" />
              Atribuir
            </Button>
          )}
        </div>

        {/* Info do cliente */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Badge variant="outline" className="text-[10px]">
              {TIPO_CLIENTE_LABELS[cliente.tipo]}
            </Badge>
            <span>{cliente.cpf_cnpj}</span>
          </div>
          {cliente.telefone && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              {cliente.telefone}
            </div>
          )}
          {cliente.email && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {cliente.email}
            </div>
          )}
          {(cliente.cidade || cliente.estado) && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {[cliente.cidade, cliente.estado].filter(Boolean).join(" - ")}
            </div>
          )}
        </div>

        <Separator />

        {/* Resumo */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{ativas.length}</p>
              <p className="text-[11px] text-muted-foreground">Em Andamento</p>
              {totalPipeline > 0 && (
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                  {formatCurrency(totalPipeline)}
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{faturadas.length}</p>
              <p className="text-[11px] text-muted-foreground">Faturadas</p>
              {totalFaturado > 0 && (
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-0.5">
                  {formatCurrency(totalFaturado)}
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{perdidas.length}</p>
              <p className="text-[11px] text-muted-foreground">Perdidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de negociações */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              Histórico de Negociações ({negociacoes?.length || 0})
            </h3>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : negociacoes && negociacoes.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {negociacoes.map((neg) => {
                const StatusIcon = statusIcon[neg.status] || Clock;
                const statusColor = STATUS_COLORS[neg.status as StatusNegociacao] || "#888";
                return (
                  <div
                    key={neg.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <div
                      className="p-2 rounded-md shrink-0 mt-0.5"
                      style={{ backgroundColor: `${statusColor}15` }}
                    >
                      <StatusIcon className="h-4 w-4" style={{ color: statusColor }} />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs text-muted-foreground">
                          {neg.numero_negociacao}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px]"
                          style={{
                            backgroundColor: `${statusColor}15`,
                            color: statusColor,
                            borderColor: statusColor,
                          }}
                        >
                          {STATUS_LABELS[neg.status as StatusNegociacao] || neg.status}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {ORIGEM_LABELS[neg.origem_lead as OrigemLead] || neg.origem_lead}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                        {neg.produto_principal && (
                          <span>{neg.produto_principal}</span>
                        )}
                        <span className="flex items-center gap-0.5">
                          <DollarSign className="h-3 w-3" />
                          {formatCurrency(neg.valor_estimado || 0)}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(neg.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      {/* Consultor responsável */}
                      <div className="text-[11px] text-muted-foreground">
                        Consultor: <span className="font-medium text-foreground">
                          {neg.owner?.nome_exibicao || neg.owner?.full_name || neg.owner?.email || "—"}
                        </span>
                      </div>
                      {/* Motivo de perda */}
                      {neg.status === "perdido" && neg.motivo_perda && (
                        <div className="text-[11px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded">
                          <span className="font-medium">Motivo:</span> {neg.motivo_perda}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Nenhuma negociação registrada para este cliente</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
