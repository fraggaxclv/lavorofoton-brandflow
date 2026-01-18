import { useState, useEffect } from "react";
import { useNegociacoes } from "@/hooks/useNegociacoes";
import { useClientes } from "@/hooks/useClientes";
import { useAtividades } from "@/hooks/useAtividades";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { useCheckinDiario } from "@/hooks/useCheckinDiario";
import { useWelcomeCheckin } from "@/hooks/useWelcomeCheckin";
import { useMetaMensal } from "@/hooks/useMetaMensal";
import { useConsultores } from "@/hooks/useConsultores";
import InternoLayout from "@/components/interno/InternoLayout";
import KanbanBoard from "@/components/interno/KanbanBoard";
import CheckinModal from "@/components/interno/CheckinModal";
import WelcomeCheckinModal from "@/components/interno/WelcomeCheckinModal";
import ProdutoSelector, { ProdutoNegociacao } from "@/components/interno/ProdutoSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Plus, 
  Search, 
  Briefcase,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
  Loader2,
  MessageSquare,
  Phone,
  Users,
  FileText,
  Mail,
  LayoutList,
  Kanban,
  Factory,
  Package,
  Trash2
} from "lucide-react";
import { 
  Negociacao, 
  StatusNegociacao,
  TipoVenda,
  STATUS_LABELS, 
  STATUS_COLORS,
  ORIGEM_LABELS,
  TIPO_ATIVIDADE_LABELS,
  TIPO_VENDA_LABELS,
  formatCurrency
} from "@/types/interno";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusOrder: StatusNegociacao[] = [
  "lead_novo",
  "proposta_enviada", 
  "faturado",
  "perdido"
];

export default function InternoNegociacoes() {
  const { user, isAdmin, isConsultor } = useInternoAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tipoVendaFilter, setTipoVendaFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedNegociacao, setSelectedNegociacao] = useState<Negociacao | null>(null);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  // Check-in diário gamificado
  const {
    showCheckin,
    pendingNegociacoes,
    checkinState,
    completeCheckin,
    removeFromPending,
    isLoading: isLoadingCheckin,
  } = useCheckinDiario(user?.id);

  // Welcome check-in com resumo
  const {
    showWelcome,
    stats: welcomeStats,
    isLoading: isLoadingWelcome,
    completeWelcome,
  } = useWelcomeCheckin(user?.id);

  // Meta mensal
  const { valorMetaGeral } = useMetaMensal(user?.id);

  // Mostrar welcome modal automaticamente para consultores
  useEffect(() => {
    if (showWelcome && isConsultor && !isLoadingWelcome) {
      setWelcomeOpen(true);
    }
  }, [showWelcome, isConsultor, isLoadingWelcome]);

  const { negociacoes, isLoading, createNegociacao, updateNegociacao, deleteNegociacao, isCreating, isUpdating, isDeleting } = useNegociacoes({
    status: statusFilter !== "all" ? statusFilter as StatusNegociacao : undefined,
  });
  const { clientes } = useClientes({});
  const { data: consultores = [] } = useConsultores();

  const filteredNegociacoes = negociacoes.filter(neg => {
    // Filtro por tipo de venda
    if (tipoVendaFilter !== "all" && neg.tipo_venda !== tipoVendaFilter) {
      return false;
    }
    // Filtro por busca
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      neg.numero_negociacao.toLowerCase().includes(search) ||
      neg.cliente?.nome_fantasia?.toLowerCase().includes(search) ||
      neg.cliente?.razao_social?.toLowerCase().includes(search)
    );
  });

  const handleOpenCreate = () => {
    setDialogOpen(true);
  };

  const handleOpenDetails = (negociacao: Negociacao) => {
    setSelectedNegociacao(negociacao);
    setDetailsOpen(true);
  };

  const handleSubmit = async (formData: FormData, produtos: ProdutoNegociacao[]) => {
    // Gera produto_principal a partir dos produtos selecionados
    const produtoPrincipal = produtos.length > 0 
      ? produtos.map(p => `${p.quantidade}x ${p.modelo}`).join(", ")
      : formData.get("produto_principal") as string || undefined;
    
    // Calcula valor estimado a partir dos produtos se houver valores
    const valorProdutos = produtos.reduce((acc, p) => acc + ((p.valor_unitario || 0) * p.quantidade), 0);
    const valorManual = parseFloat(formData.get("valor_estimado") as string) || 0;
    const valorFinal = valorProdutos > 0 ? valorProdutos : valorManual;

    // Get selected consultant or default to current user
    const consultorSelecionado = formData.get("consultor_responsavel") as string;
    const ownerUserId = consultorSelecionado && consultorSelecionado !== "current" 
      ? consultorSelecionado 
      : user!.id;

    const data = {
      cliente_id: formData.get("cliente_id") as string,
      origem_lead: formData.get("origem_lead") as string,
      produto_principal: produtoPrincipal,
      valor_estimado: valorFinal,
      observacoes: formData.get("observacoes") as string || undefined,
      owner_user_id: ownerUserId,
    };

    try {
      await createNegociacao(data);
      toast.success("Negociação criada com sucesso!");
      setDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao criar negociação");
    }
  };

  // Estado para modal de conclusão de venda (faturado)
  const [conclusaoVendaOpen, setConclusaoVendaOpen] = useState(false);
  const [negociacaoParaConcluir, setNegociacaoParaConcluir] = useState<Negociacao | null>(null);

  const handleStatusChange = async (negociacao: Negociacao, newStatus: StatusNegociacao, tipoVenda?: TipoVenda) => {
    // Se for faturar, abre o modal para selecionar tipo de venda
    if (newStatus === "faturado" && !tipoVenda) {
      setNegociacaoParaConcluir(negociacao);
      setConclusaoVendaOpen(true);
      return;
    }

    try {
      await updateNegociacao({ 
        id: negociacao.id, 
        status: newStatus,
        tipo_venda: tipoVenda,
        data_fechamento: newStatus === "faturado" || newStatus === "perdido"
          ? new Date().toISOString().split("T")[0] 
          : undefined
      });
      toast.success("Status atualizado!");
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

  const handleConcluirVenda = async (tipoVenda: TipoVenda) => {
    if (!negociacaoParaConcluir) return;
    
    try {
      await updateNegociacao({ 
        id: negociacaoParaConcluir.id, 
        status: "faturado",
        tipo_venda: tipoVenda,
        data_fechamento: new Date().toISOString().split("T")[0]
      });
      toast.success("Venda concluída com sucesso!");
      setConclusaoVendaOpen(false);
      setNegociacaoParaConcluir(null);
    } catch (error) {
      toast.error("Erro ao concluir venda");
    }
  };

  const handleLossStatusChange = async (negociacao: Negociacao, motivo: string) => {
    try {
      await updateNegociacao({ 
        id: negociacao.id, 
        status: "perdido",
        motivo_perda: motivo,
        data_fechamento: new Date().toISOString().split("T")[0]
      });
      toast.success("Negociação marcada como perdida");
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

  return (
    <InternoLayout>
      {/* Welcome Check-in Modal */}
      <WelcomeCheckinModal
        open={welcomeOpen}
        onClose={() => {
          setWelcomeOpen(false);
          completeWelcome();
        }}
        stats={welcomeStats}
        streak={checkinState.streak}
        onComplete={completeWelcome}
        onOpenCheckin={() => setCheckinOpen(true)}
        hasPendingNegociacoes={pendingNegociacoes.length > 0}
        valorMeta={valorMetaGeral}
      />

      {/* Check-in Modal Gamificado */}
      <CheckinModal
        open={checkinOpen}
        onClose={() => setCheckinOpen(false)}
        negociacoes={pendingNegociacoes}
        streak={checkinState.streak}
        totalResolvidos={checkinState.totalResolvidos}
        onComplete={completeCheckin}
        onRemoveNegociacao={removeFromPending}
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Negociações</h1>
            <p className="text-muted-foreground">Gerencie seu pipeline de vendas</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Negociação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Nova Negociação</DialogTitle>
              </DialogHeader>
              <NovaNegociacaoForm 
                clientes={clientes || []}
                consultores={consultores}
                isAdmin={isAdmin}
                currentUserId={user?.id || ""}
                onSubmit={handleSubmit}
                isLoading={isCreating}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros e Toggle de Visualização */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {viewMode === "list" && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {statusOrder.map(status => (
                  <SelectItem key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Filtro por tipo de venda */}
          <Select value={tipoVendaFilter} onValueChange={setTipoVendaFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Tipo de Venda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="estoque">
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Estoque
                </span>
              </SelectItem>
              <SelectItem value="fadireto">
                <span className="flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Fábrica Direto
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => value && setViewMode(value as "list" | "kanban")}
            className="border rounded-lg p-1"
          >
            <ToggleGroupItem value="list" aria-label="Visualização em lista" className="px-3">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Visualização Kanban" className="px-3">
              <Kanban className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Conteúdo */}
        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : viewMode === "kanban" ? (
          <KanbanBoard
            negociacoes={filteredNegociacoes}
            onStatusChange={handleStatusChange}
            onLossStatusChange={handleLossStatusChange}
            onCardClick={handleOpenDetails}
            isUpdating={isUpdating}
          />
        ) : filteredNegociacoes.length > 0 ? (
          <div className="space-y-3">
            {filteredNegociacoes.map(negociacao => (
              <Card 
                key={negociacao.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOpenDetails(negociacao)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${STATUS_COLORS[negociacao.status]}20` }}
                      >
                        <Briefcase 
                          className="h-6 w-6" 
                          style={{ color: STATUS_COLORS[negociacao.status] }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm text-muted-foreground">
                            {negociacao.numero_negociacao}
                          </span>
                          <Badge 
                            style={{ 
                              backgroundColor: `${STATUS_COLORS[negociacao.status]}20`,
                              color: STATUS_COLORS[negociacao.status],
                              borderColor: STATUS_COLORS[negociacao.status]
                            }}
                            variant="outline"
                          >
                            {STATUS_LABELS[negociacao.status]}
                          </Badge>
                        </div>
                        <h3 className="font-semibold">
                          {negociacao.cliente?.nome_fantasia || negociacao.cliente?.razao_social || "Cliente não informado"}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {negociacao.produto_principal && (
                            <span>{negociacao.produto_principal}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {formatCurrency(negociacao.valor_estimado || 0)}
                          </span>
                          {negociacao.data_proximo_passo && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(negociacao.data_proximo_passo), "dd/MM", { locale: ptBR })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma negociação encontrada</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente ajustar sua busca" : "Comece criando sua primeira negociação"}
              </p>
              {!searchTerm && (
                <Button onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Negociação
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dialog de Detalhes */}
        {selectedNegociacao && (
          <NegociacaoDetails 
            negociacao={selectedNegociacao}
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
            onStatusChange={handleStatusChange}
            onLossStatusChange={handleLossStatusChange}
            onUpdate={updateNegociacao}
            onDelete={async (id) => {
              await deleteNegociacao(id);
              setDetailsOpen(false);
              setSelectedNegociacao(null);
            }}
            consultores={consultores}
            isAdmin={isAdmin}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        )}

        {/* Modal de Conclusão de Venda - Tipo de Venda */}
        <Dialog open={conclusaoVendaOpen} onOpenChange={setConclusaoVendaOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Concluir Venda
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Parabéns pela venda! Selecione o tipo de faturamento:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                  onClick={() => handleConcluirVenda("estoque")}
                  disabled={isUpdating}
                >
                  <Package className="h-8 w-8" />
                  <span>Estoque</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5"
                  onClick={() => handleConcluirVenda("fadireto")}
                  disabled={isUpdating}
                >
                  <Factory className="h-8 w-8" />
                  <span>Fábrica Direto</span>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setConclusaoVendaOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </InternoLayout>
  );
}

interface NovaNegociacaoFormProps {
  clientes: { id: string; nome_fantasia?: string; razao_social: string }[];
  consultores: { id: string; nome_exibicao?: string; full_name?: string; email: string; ativo?: boolean }[];
  isAdmin: boolean;
  currentUserId: string;
  onSubmit: (formData: FormData, produtos: ProdutoNegociacao[]) => void;
  isLoading: boolean;
}

function NovaNegociacaoForm({ clientes, consultores, isAdmin, currentUserId, onSubmit, isLoading }: NovaNegociacaoFormProps) {
  const [produtos, setProdutos] = useState<ProdutoNegociacao[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData, produtos);
  };

  // Calcula valor total dos produtos para exibir
  const valorTotalProdutos = produtos.reduce(
    (acc, p) => acc + ((p.valor_unitario || 0) * p.quantidade), 
    0
  );

  // Filter active consultants only
  const activeConsultores = consultores.filter(c => c.ativo !== false);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Seletor de Consultor - apenas para admins */}
      {isAdmin && (
        <div>
          <Label htmlFor="consultor_responsavel">Consultor Responsável *</Label>
          <Select name="consultor_responsavel" defaultValue="current">
            <SelectTrigger>
              <SelectValue placeholder="Selecione o consultor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Eu mesmo</SelectItem>
              {activeConsultores
                .filter(c => c.id !== currentUserId)
                .map(consultor => (
                  <SelectItem key={consultor.id} value={consultor.id}>
                    {consultor.nome_exibicao || consultor.full_name || consultor.email}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="cliente_id">Cliente *</Label>
        <Select name="cliente_id" required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {clientes.map(cliente => (
              <SelectItem key={cliente.id} value={cliente.id}>
                {cliente.nome_fantasia || cliente.razao_social}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="origem_lead">Origem do Lead *</Label>
        <Select name="origem_lead" defaultValue="outro">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ORIGEM_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {/* Seletor de Produtos do Catálogo */}
      <ProdutoSelector produtos={produtos} onChange={setProdutos} />

      <div>
        <Label htmlFor="valor_estimado">
          Valor Estimado (R$)
          {valorTotalProdutos > 0 && (
            <span className="text-muted-foreground font-normal ml-2">
              (calculado dos produtos: R$ {valorTotalProdutos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
            </span>
          )}
        </Label>
        <Input
          id="valor_estimado"
          name="valor_estimado"
          type="number"
          step="0.01"
          placeholder={valorTotalProdutos > 0 ? valorTotalProdutos.toFixed(2) : "0,00"}
          disabled={valorTotalProdutos > 0}
          value={valorTotalProdutos > 0 ? valorTotalProdutos.toFixed(2) : undefined}
        />
      </div>

      <div>
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          name="observacoes"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Criar Negociação
        </Button>
      </div>
    </form>
  );
}

interface NegociacaoDetailsProps {
  negociacao: Negociacao;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (negociacao: Negociacao, status: StatusNegociacao, tipoVenda?: TipoVenda) => void;
  onLossStatusChange: (negociacao: Negociacao, motivo: string) => Promise<void>;
  onUpdate: (data: { id: string; valor_estimado?: number; probabilidade?: number; produto_principal?: string; proximo_passo?: string; data_proximo_passo?: string; observacoes?: string; owner_user_id?: string }) => Promise<unknown>;
  onDelete: (id: string) => Promise<void>;
  consultores: { id: string; nome_exibicao?: string; full_name?: string; email: string; ativo?: boolean }[];
  isAdmin: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

function NegociacaoDetails({ negociacao, open, onOpenChange, onStatusChange, onLossStatusChange, onUpdate, onDelete, consultores, isAdmin, isUpdating, isDeleting }: NegociacaoDetailsProps) {
  const { user } = useInternoAuth();
  const { atividades, isLoading: atividadesLoading, createAtividade, isCreating: atividadeIsCreating } = useAtividades(negociacao.id);
  const [novaAtividade, setNovaAtividade] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [lossDialogOpen, setLossDialogOpen] = useState(false);
  const [lossReason, setLossReason] = useState("");
  const [isSubmittingLoss, setIsSubmittingLoss] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    valor_estimado: negociacao.valor_estimado || 0,
    probabilidade: negociacao.probabilidade || 50,
    produto_principal: negociacao.produto_principal || "",
    proximo_passo: negociacao.proximo_passo || "",
    data_proximo_passo: negociacao.data_proximo_passo || "",
    observacoes: negociacao.observacoes || "",
    owner_user_id: negociacao.owner_user_id || "",
  });

  const handleDelete = async () => {
    try {
      await onDelete(negociacao.id);
      toast.success("Negociação excluída!");
    } catch (error) {
      toast.error("Erro ao excluir negociação");
    }
  };

  const handleStatusChangeInternal = (status: StatusNegociacao) => {
    if (status === "perdido") {
      setLossReason("");
      setLossDialogOpen(true);
    } else {
      onStatusChange(negociacao, status);
    }
  };

  const handleConfirmLoss = async () => {
    if (!lossReason.trim()) return;
    
    setIsSubmittingLoss(true);
    try {
      await onLossStatusChange(negociacao, lossReason.trim());
      setLossDialogOpen(false);
      setLossReason("");
    } finally {
      setIsSubmittingLoss(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updateData: { id: string; valor_estimado?: number; probabilidade?: number; produto_principal?: string; proximo_passo?: string; data_proximo_passo?: string; observacoes?: string; owner_user_id?: string } = {
        id: negociacao.id,
        valor_estimado: formValues.valor_estimado,
        probabilidade: formValues.probabilidade,
        produto_principal: formValues.produto_principal || undefined,
        proximo_passo: formValues.proximo_passo || undefined,
        data_proximo_passo: formValues.data_proximo_passo || undefined,
        observacoes: formValues.observacoes || undefined,
      };
      
      // Only include owner_user_id if it changed and user is admin
      if (isAdmin && formValues.owner_user_id && formValues.owner_user_id !== negociacao.owner_user_id) {
        updateData.owner_user_id = formValues.owner_user_id;
      }
      
      await onUpdate(updateData);
      toast.success("Negociação atualizada!");
      setEditMode(false);
    } catch (error) {
      toast.error("Erro ao atualizar negociação");
    }
  };

  const handleNovaAtividade = async (formData: FormData) => {
    try {
      await createAtividade({
        negociacao_id: negociacao.id,
        tipo: formData.get("tipo") as "ligacao" | "whatsapp" | "reuniao" | "proposta" | "documento" | "email" | "visita" | "outro",
        titulo: formData.get("titulo") as string,
        nota: formData.get("nota") as string || undefined,
      });
      toast.success("Atividade registrada!");
      setNovaAtividade(false);
    } catch (error) {
      toast.error("Erro ao registrar atividade");
    }
  };

  const iconMap: Record<string, React.ElementType> = {
    ligacao: Phone,
    whatsapp: MessageSquare,
    reuniao: Users,
    proposta: FileText,
    documento: FileText,
    email: Mail,
    visita: Users,
    outro: Clock,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-between">
            <span className="font-mono text-muted-foreground">
              {negociacao.numero_negociacao}
            </span>
            <div className="flex gap-2">
              {!editMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                    Editar
                  </Button>
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Negociação</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir a negociação <strong>{negociacao.numero_negociacao}</strong>?
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSaveChanges} disabled={isUpdating}>
                    {isUpdating && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                    Salvar
                  </Button>
                </>
              )}
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detalhes e ações da negociação {negociacao.numero_negociacao}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="detalhes" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
            <TabsTrigger value="atividades">Atividades</TabsTrigger>
          </TabsList>

          <TabsContent value="detalhes" className="space-y-4 mt-4">
            {/* Status */}
            <div>
              <Label>Status</Label>
              <Select 
                value={negociacao.status}
                onValueChange={(value) => handleStatusChangeInternal(value as StatusNegociacao)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOrder.map(status => (
                    <SelectItem key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Info Principal */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Cliente</Label>
                <p className="font-medium">{negociacao.cliente?.nome_fantasia || negociacao.cliente?.razao_social}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Origem</Label>
                <p className="font-medium">{ORIGEM_LABELS[negociacao.origem_lead]}</p>
              </div>
              
              {/* Consultor Responsável - Editável apenas para admins */}
              <div>
                <Label className="text-muted-foreground">Consultor Responsável</Label>
                {editMode && isAdmin ? (
                  <Select 
                    value={formValues.owner_user_id}
                    onValueChange={(value) => setFormValues(prev => ({ ...prev, owner_user_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultores.filter(c => c.ativo !== false).map(consultor => (
                        <SelectItem key={consultor.id} value={consultor.id}>
                          {consultor.nome_exibicao || consultor.full_name || consultor.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium">
                    {negociacao.owner?.nome_exibicao || negociacao.owner?.full_name || negociacao.owner?.email || "-"}
                  </p>
                )}
              </div>
              
              <div>
                <Label className="text-muted-foreground">Tipo de Venda</Label>
                {negociacao.tipo_venda ? (
                  <Badge variant={negociacao.tipo_venda === 'fadireto' ? 'default' : 'secondary'}>
                    {TIPO_VENDA_LABELS[negociacao.tipo_venda]}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Definido ao faturar
                  </Badge>
                )}
              </div>
              
              {/* Produto Principal - Editável */}
              <div>
                <Label className="text-muted-foreground">Produto Principal</Label>
                {editMode ? (
                  <Input 
                    value={formValues.produto_principal}
                    onChange={(e) => setFormValues(prev => ({ ...prev, produto_principal: e.target.value }))}
                    placeholder="Ex: Foton 7T"
                  />
                ) : (
                  <p className="font-medium">{negociacao.produto_principal || "-"}</p>
                )}
              </div>
              
              {/* Valor Estimado - Editável */}
              <div>
                <Label className="text-muted-foreground">Valor Estimado</Label>
                {editMode ? (
                  <Input 
                    type="number"
                    value={formValues.valor_estimado}
                    onChange={(e) => setFormValues(prev => ({ ...prev, valor_estimado: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                ) : (
                  <p className="font-medium">{formatCurrency(negociacao.valor_estimado || 0)}</p>
                )}
              </div>
              
              {/* Probabilidade - Editável */}
              <div>
                <Label className="text-muted-foreground">Probabilidade</Label>
                {editMode ? (
                  <Select 
                    value={String(formValues.probabilidade)}
                    onValueChange={(value) => setFormValues(prev => ({ ...prev, probabilidade: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(p => (
                        <SelectItem key={p} value={String(p)}>{p}%</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium">{negociacao.probabilidade || 50}%</p>
                )}
              </div>
              
              {/* Data Próximo Passo - Editável */}
              <div>
                <Label className="text-muted-foreground">Próximo Passo</Label>
                {editMode ? (
                  <Input 
                    type="date"
                    value={formValues.data_proximo_passo}
                    onChange={(e) => setFormValues(prev => ({ ...prev, data_proximo_passo: e.target.value }))}
                  />
                ) : (
                  <p className="font-medium">
                    {negociacao.data_proximo_passo 
                      ? format(new Date(negociacao.data_proximo_passo), "dd/MM/yyyy", { locale: ptBR })
                      : "-"
                    }
                  </p>
                )}
              </div>
            </div>

            {/* Descrição do Próximo Passo - Editável */}
            {(editMode || negociacao.proximo_passo) && (
              <div>
                <Label className="text-muted-foreground">Descrição do Próximo Passo</Label>
                {editMode ? (
                  <Input 
                    value={formValues.proximo_passo}
                    onChange={(e) => setFormValues(prev => ({ ...prev, proximo_passo: e.target.value }))}
                    placeholder="Ex: Ligar para confirmar interesse"
                  />
                ) : (
                  <p className="text-sm mt-1">{negociacao.proximo_passo}</p>
                )}
              </div>
            )}

            {/* Observações - Editável */}
            <div>
              <Label className="text-muted-foreground">Observações</Label>
              {editMode ? (
                <Textarea 
                  value={formValues.observacoes}
                  onChange={(e) => setFormValues(prev => ({ ...prev, observacoes: e.target.value }))}
                  placeholder="Anotações sobre a negociação..."
                  rows={3}
                />
              ) : (
                <p className="text-sm mt-1">{negociacao.observacoes || "-"}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="atividades" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Histórico de Atividades</h4>
              <Button size="sm" onClick={() => setNovaAtividade(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Nova
              </Button>
            </div>

            {novaAtividade && (
              <Card className="p-4">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleNovaAtividade(new FormData(e.currentTarget));
                }} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Tipo</Label>
                      <Select name="tipo" defaultValue="outro">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TIPO_ATIVIDADE_LABELS).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Título</Label>
                      <Input name="titulo" required />
                    </div>
                  </div>
                  <div>
                    <Label>Nota</Label>
                    <Textarea name="nota" rows={2} />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" disabled={atividadeIsCreating}>
                      {atividadeIsCreating && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                      Salvar
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setNovaAtividade(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {atividadesLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : atividades && atividades.length > 0 ? (
              <div className="space-y-3">
                {atividades.map(atividade => {
                  const IconComponent = iconMap[atividade.tipo] || Clock;
                  return (
                    <div key={atividade.id} className="flex gap-3 p-3 bg-muted rounded-lg">
                      <div className="p-2 rounded bg-primary/10">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{atividade.titulo}</span>
                          <Badge variant="outline" className="text-xs">
                            {TIPO_ATIVIDADE_LABELS[atividade.tipo]}
                          </Badge>
                        </div>
                        {atividade.nota && (
                          <p className="text-sm text-muted-foreground mt-1">{atividade.nota}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(atividade.data_hora), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma atividade registrada ainda
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>

      {/* Dialog para motivo de perda */}
      <Dialog open={lossDialogOpen} onOpenChange={(open) => !open && setLossDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motivo da Perda</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Para marcar a negociação como perdida, informe o motivo:
            </p>
            <div className="space-y-2">
              <Label htmlFor="loss-reason-details">Motivo *</Label>
              <Textarea
                id="loss-reason-details"
                value={lossReason}
                onChange={(e) => setLossReason(e.target.value)}
                placeholder="Ex: Cliente optou pela concorrência, preço acima do orçamento, desistiu da compra..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLossDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmLoss} 
              disabled={!lossReason.trim() || isSubmittingLoss}
              variant="destructive"
            >
              {isSubmittingLoss && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Confirmar Perda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
