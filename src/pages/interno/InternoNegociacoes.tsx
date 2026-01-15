import { useState } from "react";
import { useNegociacoes } from "@/hooks/useNegociacoes";
import { useClientes } from "@/hooks/useClientes";
import { useAtividades } from "@/hooks/useAtividades";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import InternoLayout from "@/components/interno/InternoLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
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
  Mail
} from "lucide-react";
import { 
  Negociacao, 
  StatusNegociacao,
  STATUS_LABELS, 
  STATUS_COLORS,
  ORIGEM_LABELS,
  TIPO_ATIVIDADE_LABELS,
  formatCurrency
} from "@/types/interno";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusOrder: StatusNegociacao[] = [
  "lead_novo",
  "proposta_enviada", 
  "negociacao",
  "credito_analise",
  "aprovado",
  "faturado",
  "perdido"
];

export default function InternoNegociacoes() {
  const { user, isAdmin } = useInternoAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedNegociacao, setSelectedNegociacao] = useState<Negociacao | null>(null);

  const { negociacoes, isLoading, createNegociacao, updateNegociacao, isCreating, isUpdating } = useNegociacoes({
    status: statusFilter !== "all" ? statusFilter as StatusNegociacao : undefined,
  });
  const { clientes } = useClientes({});

  const filteredNegociacoes = negociacoes.filter(neg => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      neg.numero_negociacao.toLowerCase().includes(search) ||
      neg.cliente?.nome_razao?.toLowerCase().includes(search)
    );
  });

  const handleOpenCreate = () => {
    setDialogOpen(true);
  };

  const handleOpenDetails = (negociacao: Negociacao) => {
    setSelectedNegociacao(negociacao);
    setDetailsOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    const data = {
      cliente_id: formData.get("cliente_id") as string,
      origem_lead: formData.get("origem_lead") as string,
      produto_principal: formData.get("produto_principal") as string || undefined,
      valor_estimado: parseFloat(formData.get("valor_estimado") as string) || 0,
      observacoes: formData.get("observacoes") as string || undefined,
      owner_user_id: user!.id,
    };

    try {
      await createNegociacao(data);
      toast.success("Negociação criada com sucesso!");
      setDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao criar negociação");
    }
  };

  const handleStatusChange = async (negociacao: Negociacao, newStatus: StatusNegociacao) => {
    try {
      await updateNegociacao({ 
        id: negociacao.id, 
        status: newStatus,
        data_fechamento: newStatus === "faturado" || newStatus === "perdido"
          ? new Date().toISOString().split("T")[0] 
          : undefined
      });
      toast.success("Status atualizado!");
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  };

  return (
    <InternoLayout>
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
                onSubmit={handleSubmit}
                isLoading={isCreating}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
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
        </div>

        {/* Pipeline Board */}
        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
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
                          {negociacao.cliente?.nome_razao || "Cliente não informado"}
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
            onUpdate={updateNegociacao}
            isUpdating={isUpdating}
          />
        )}
      </div>
    </InternoLayout>
  );
}

interface NovaNegociacaoFormProps {
  clientes: { id: string; nome_razao: string }[];
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

function NovaNegociacaoForm({ clientes, onSubmit, isLoading }: NovaNegociacaoFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="cliente_id">Cliente *</Label>
        <Select name="cliente_id" required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            {clientes.map(cliente => (
              <SelectItem key={cliente.id} value={cliente.id}>
                {cliente.nome_razao}
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

      <div>
        <Label htmlFor="produto_principal">Produto Principal</Label>
        <Input
          id="produto_principal"
          name="produto_principal"
          placeholder="Ex: Foton Aumark 916"
        />
      </div>

      <div>
        <Label htmlFor="valor_estimado">Valor Estimado (R$)</Label>
        <Input
          id="valor_estimado"
          name="valor_estimado"
          type="number"
          step="0.01"
          placeholder="0,00"
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
  onStatusChange: (negociacao: Negociacao, status: StatusNegociacao) => void;
  onUpdate: (data: { id: string; valor_estimado?: number; probabilidade?: number; produto_principal?: string; proximo_passo?: string; data_proximo_passo?: string; observacoes?: string }) => Promise<unknown>;
  isUpdating?: boolean;
}

function NegociacaoDetails({ negociacao, open, onOpenChange, onStatusChange, onUpdate, isUpdating }: NegociacaoDetailsProps) {
  const { user } = useInternoAuth();
  const { atividades, isLoading: atividadesLoading, createAtividade, isCreating: atividadeIsCreating } = useAtividades(negociacao.id);
  const [novaAtividade, setNovaAtividade] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    valor_estimado: negociacao.valor_estimado || 0,
    probabilidade: negociacao.probabilidade || 50,
    produto_principal: negociacao.produto_principal || "",
    proximo_passo: negociacao.proximo_passo || "",
    data_proximo_passo: negociacao.data_proximo_passo || "",
    observacoes: negociacao.observacoes || "",
  });

  const handleSaveChanges = async () => {
    try {
      await onUpdate({
        id: negociacao.id,
        valor_estimado: formValues.valor_estimado,
        probabilidade: formValues.probabilidade,
        produto_principal: formValues.produto_principal || undefined,
        proximo_passo: formValues.proximo_passo || undefined,
        data_proximo_passo: formValues.data_proximo_passo || undefined,
        observacoes: formValues.observacoes || undefined,
      });
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
            {!editMode ? (
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSaveChanges} disabled={isUpdating}>
                  {isUpdating && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                  Salvar
                </Button>
              </div>
            )}
          </DialogTitle>
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
                onValueChange={(value) => onStatusChange(negociacao, value as StatusNegociacao)}
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
                <p className="font-medium">{negociacao.cliente?.nome_razao}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Origem</Label>
                <p className="font-medium">{ORIGEM_LABELS[negociacao.origem_lead]}</p>
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
    </Dialog>
  );
}
