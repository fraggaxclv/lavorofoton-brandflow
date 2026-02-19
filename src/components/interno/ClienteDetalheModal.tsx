import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Handshake, Edit, Users as UsersIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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

function ClienteDetalheContent({
  cliente,
  negociacoes,
  isLoading,
  onOpenChange,
  onNovaNegociacao,
  onEdit,
  onAssign,
  isAdmin,
}: {
  cliente: Cliente;
  negociacoes: any[] | undefined;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onNovaNegociacao?: (cliente: Cliente) => void;
  onEdit?: (cliente: Cliente) => void;
  onAssign?: (cliente: Cliente) => void;
  isAdmin?: boolean;
}) {
  const ativas = negociacoes?.filter(n => !["faturado", "perdido"].includes(n.status)) || [];
  const faturadas = negociacoes?.filter(n => n.status === "faturado") || [];
  const perdidas = negociacoes?.filter(n => n.status === "perdido") || [];
  const totalFaturado = faturadas.reduce((acc, n) => acc + (n.valor_estimado || 0), 0);
  const totalPipeline = ativas.reduce((acc, n) => acc + (n.valor_estimado || 0), 0);

  return (
    <div className="space-y-4">
      {/* Ações rápidas */}
      <div className="flex gap-2 flex-wrap">
        {onNovaNegociacao && (
          <Button size="sm" variant="outline" className="min-h-[44px] gap-1.5 flex-1" onClick={() => onNovaNegociacao(cliente)}>
            <Handshake className="h-4 w-4" />
            Negociar
          </Button>
        )}
        {onEdit && (
          <Button size="sm" variant="outline" className="min-h-[44px] gap-1.5 flex-1" onClick={() => { onOpenChange(false); onEdit(cliente); }}>
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        )}
        {isAdmin && onAssign && (
          <Button size="sm" variant="outline" className="min-h-[44px] gap-1.5 flex-1" onClick={() => { onOpenChange(false); onAssign(cliente); }}>
            <UsersIcon className="h-4 w-4" />
            Atribuir
          </Button>
        )}
      </div>

      {/* Info do cliente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
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
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30">
          <CardContent className="p-2.5 text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{ativas.length}</p>
            <p className="text-[10px] text-muted-foreground">Em Andamento</p>
            {totalPipeline > 0 && (
              <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                {formatCurrency(totalPipeline)}
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30">
          <CardContent className="p-2.5 text-center">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{faturadas.length}</p>
            <p className="text-[10px] text-muted-foreground">Faturadas</p>
            {totalFaturado > 0 && (
              <p className="text-[10px] font-medium text-green-600 dark:text-green-400 mt-0.5">
                {formatCurrency(totalFaturado)}
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30">
          <CardContent className="p-2.5 text-center">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{perdidas.length}</p>
            <p className="text-[10px] text-muted-foreground">Perdidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de negociações */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" />
          Histórico ({negociacoes?.length || 0})
        </h3>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : negociacoes && negociacoes.length > 0 ? (
          <div className="space-y-2 max-h-[250px] overflow-y-auto overscroll-contain pr-1">
            {negociacoes.map((neg) => {
              const StatusIcon = statusIcon[neg.status] || Clock;
              const statusColor = STATUS_COLORS[neg.status as StatusNegociacao] || "#888";
              return (
                <div
                  key={neg.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border bg-card"
                >
                  <div
                    className="p-1.5 rounded-md shrink-0 mt-0.5"
                    style={{ backgroundColor: `${statusColor}15` }}
                  >
                    <StatusIcon className="h-3.5 w-3.5" style={{ color: statusColor }} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {neg.numero_negociacao}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1 py-0"
                        style={{
                          backgroundColor: `${statusColor}15`,
                          color: statusColor,
                          borderColor: statusColor,
                        }}
                      >
                        {STATUS_LABELS[neg.status as StatusNegociacao] || neg.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <DollarSign className="h-3 w-3" />
                        {formatCurrency(neg.valor_estimado || 0)}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(neg.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    {neg.status === "perdido" && neg.motivo_perda && (
                      <div className="text-[10px] text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-1.5 py-0.5 rounded">
                        Motivo: {neg.motivo_perda}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Briefcase className="h-6 w-6 mx-auto mb-1.5 opacity-40" />
            <p className="text-xs">Nenhuma negociação registrada</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClienteDetalheModal({
  open,
  onOpenChange,
  cliente,
  onNovaNegociacao,
  onEdit,
  onAssign,
  isAdmin,
}: ClienteDetalheModalProps) {
  const isMobile = useIsMobile();
  const { data: negociacoes, isLoading } = useClienteNegociacoes(
    open ? cliente?.id : undefined
  );

  if (!cliente) return null;

  const title = cliente.nome_fantasia || cliente.razao_social;
  const TitleIcon = cliente.tipo?.toLowerCase() === "pj" ? Building2 : User;

  const contentProps = {
    cliente,
    negociacoes,
    isLoading,
    onOpenChange,
    onNovaNegociacao,
    onEdit,
    onAssign,
    isAdmin,
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="flex items-center gap-2 text-base">
              <TitleIcon className="h-4 w-4 text-primary" />
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto overscroll-contain">
            <ClienteDetalheContent {...contentProps} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TitleIcon className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <ClienteDetalheContent {...contentProps} />
      </DialogContent>
    </Dialog>
  );
}
