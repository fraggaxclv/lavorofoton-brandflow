import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useClientes } from "@/hooks/useClientes";
import { useConsultores } from "@/hooks/useConsultores";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import InternoLayout from "@/components/interno/InternoLayout";
import ExportButton from "@/components/interno/ExportButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import TouchCard from "@/components/interno/TouchCard";
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
import { 
  Plus, 
  Search, 
  Building2, 
  User, 
  Phone, 
  Mail,
  MapPin,
  Edit,
  Loader2,
  UserCheck,
  Handshake,
  Users,
  FileUp,
  KeyRound,
  ChevronRight
} from "lucide-react";
import ImportClientesModal from "@/components/interno/ImportClientesModal";
import ClienteDetalheModal from "@/components/interno/ClienteDetalheModal";
import SolicitarAcessoModal from "@/components/interno/SolicitarAcessoModal";
import { Cliente, TIPO_CLIENTE_LABELS } from "@/types/interno";
import { exportClientesToCSV } from "@/lib/exportUtils";
import { exportClientesPDF } from "@/lib/pdfExport";
import { toast } from "sonner";

// Type for export function
type ClienteExportType = Parameters<typeof exportClientesToCSV>[0][0];

export default function InternoClientes() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAdmin } = useInternoAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [assigningCliente, setAssigningCliente] = useState<Cliente | null>(null);
  const [selectedConsultor, setSelectedConsultor] = useState<string>("");
  const [detalheOpen, setDetalheOpen] = useState(false);
  const [detalheCliente, setDetalheCliente] = useState<Cliente | null>(null);
  const [solicitarAcessoOpen, setSolicitarAcessoOpen] = useState(false);
  const { data: consultores = [] } = useConsultores();

  const { clientes, isLoading, createCliente, updateCliente, isCreating, isUpdating } = useClientes({ 
    search: searchTerm,
  });

  const filteredClientes = clientes.filter(cliente => {
    if (tipoFilter === "all") return true;
    return cliente.tipo?.toLowerCase() === tipoFilter;
  });

  const handleOpenCreate = () => {
    setEditingCliente(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setDialogOpen(true);
  };

  const handleOpenAssign = (cliente: Cliente) => {
    setAssigningCliente(cliente);
    setSelectedConsultor(cliente.vendedor_responsavel || "");
    setAssignDialogOpen(true);
  };

  const handleAssignConsultor = async () => {
    if (!assigningCliente) return;
    
    try {
      await updateCliente({ 
        id: assigningCliente.id, 
        vendedor_responsavel: selectedConsultor || undefined 
      });
      toast.success("Consultor atribuído com sucesso!");
      setAssignDialogOpen(false);
      setAssigningCliente(null);
    } catch (error) {
      toast.error("Erro ao atribuir consultor");
    }
  };

  const handleNewNegociacao = (cliente: Cliente) => {
    // Navigate to negociacoes page with cliente pre-selected
    navigate(`/interno/negociacoes?novo=true&cliente_id=${cliente.id}`);
  };

  const handleSubmit = async (formData: FormData) => {
    const vendedorResponsavel = formData.get("vendedor_responsavel") as string;
    const tipoRaw = formData.get("tipo") as string;
    const tipo = tipoRaw.toUpperCase() as "PF" | "PJ";
    const data = {
      nome_fantasia: formData.get("nome_fantasia") as string || undefined,
      razao_social: formData.get("razao_social") as string,
      tipo,
      cpf_cnpj: formData.get("cpf_cnpj") as string,
      endereco: formData.get("endereco") as string || undefined,
      numero: formData.get("numero") as string || undefined,
      complemento: formData.get("complemento") as string || undefined,
      bairro: formData.get("bairro") as string || undefined,
      cep: formData.get("cep") as string || undefined,
      cidade: formData.get("cidade") as string || undefined,
      estado: formData.get("estado") as string || undefined,
      telefone: formData.get("telefone") as string || undefined,
      email: formData.get("email") as string || undefined,
      responsavel: formData.get("responsavel") as string || undefined,
      observacoes: formData.get("observacoes") as string || undefined,
      vendedor_responsavel: vendedorResponsavel && vendedorResponsavel !== "none" ? vendedorResponsavel : undefined,
    };

    try {
      if (editingCliente) {
        await updateCliente({ id: editingCliente.id, ...data });
        toast.success("Cliente atualizado com sucesso!");
      } else {
        await createCliente({ ...data });
        toast.success("Cliente criado com sucesso!");
      }
      setDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao salvar cliente");
    }
  };

  return (
    <InternoLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Clientes</h1>
            <p className="text-sm text-muted-foreground">
              {filteredClientes.length} cliente{filteredClientes.length !== 1 ? 's' : ''} encontrado{filteredClientes.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {!isAdmin && (
              <Button size="sm" variant="outline" onClick={() => setSolicitarAcessoOpen(true)}>
                <KeyRound className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Solicitar</span> Acesso
              </Button>
            )}
            <ExportButton 
              onExport={() => exportClientesToCSV(filteredClientes as ClienteExportType[])} 
              onExportPDF={() => exportClientesPDF(filteredClientes as ClienteExportType[])}
              label="Exportar"
              disabled={filteredClientes.length === 0}
            />
            <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}>
              <FileUp className="h-4 w-4 mr-1" />
              Importar
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingCliente ? "Editar Cliente" : "Novo Cliente"}
                  </DialogTitle>
                </DialogHeader>
                <ClienteForm 
                  cliente={editingCliente} 
                  onSubmit={handleSubmit}
                  isLoading={isCreating || isUpdating}
                  consultores={consultores}
                  isAdmin={isAdmin}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CNPJ, cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-full sm:w-36 h-9 text-sm">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pf">Pessoa Física</SelectItem>
              <SelectItem value="pj">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Clientes */}
        {isLoading ? (
          <div className="grid gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : filteredClientes.length > 0 ? (
          <div className="grid gap-2">
            {filteredClientes.map(cliente => (
              <TouchCard 
                key={cliente.id} 
                className="hover:bg-muted/30 transition-colors"
                onCardClick={() => { setDetalheCliente(cliente); setDetalheOpen(true); }}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      {cliente.tipo?.toLowerCase() === "pj" ? (
                        <Building2 className="h-4 w-4 text-primary" />
                      ) : (
                        <User className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-medium truncate">
                          {cliente.nome_fantasia || cliente.razao_social}
                        </h3>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {TIPO_CLIENTE_LABELS[cliente.tipo]}
                        </Badge>
                        {cliente.vendedor_responsavel && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                            <UserCheck className="h-2.5 w-2.5 mr-0.5" />
                            {consultores.find(v => v.id === cliente.vendedor_responsavel)?.nome_exibicao || 
                             consultores.find(v => v.id === cliente.vendedor_responsavel)?.full_name || 
                             "Consultor"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                        {cliente.cpf_cnpj && (
                          <span>{cliente.tipo?.toLowerCase() === "pj" ? "CNPJ" : "CPF"}: {cliente.cpf_cnpj}</span>
                        )}
                        {cliente.telefone && (
                          <span className="flex items-center gap-0.5">
                            <Phone className="h-2.5 w-2.5" />
                            {cliente.telefone}
                          </span>
                        )}
                        {(cliente.cidade || cliente.estado) && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="h-2.5 w-2.5" />
                            {[cliente.cidade, cliente.estado].filter(Boolean).join(" - ")}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </div>
                </CardContent>
              </TouchCard>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <User className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-sm font-medium mb-1">Nenhum cliente encontrado</h3>
              <p className="text-xs text-muted-foreground mb-3">
                {searchTerm ? "Tente ajustar sua busca" : "Comece adicionando seu primeiro cliente"}
              </p>
              {!searchTerm && (
                <Button size="sm" onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Cliente
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dialog: Atribuir Consultor */}
        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-base">Atribuir Consultor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Cliente: <span className="font-medium text-foreground">{assigningCliente?.nome_fantasia || assigningCliente?.razao_social}</span>
                </p>
                <Label htmlFor="assign-consultor" className="text-sm">Consultor Responsável</Label>
                <Select value={selectedConsultor} onValueChange={setSelectedConsultor}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Selecione um consultor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum (remover atribuição)</SelectItem>
                    {consultores.filter(c => c.ativo !== false).map(v => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.nome_exibicao || v.full_name || v.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setAssignDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleAssignConsultor} disabled={isUpdating}>
                  {isUpdating && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                  Confirmar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Import Modal */}
        <ImportClientesModal
          open={importOpen}
          onOpenChange={setImportOpen}
          onComplete={() => queryClient.invalidateQueries({ queryKey: ["clientes"] })}
        />
        {/* Detalhe do Cliente */}
        <ClienteDetalheModal
          open={detalheOpen}
          onOpenChange={setDetalheOpen}
          cliente={detalheCliente}
          onNovaNegociacao={handleNewNegociacao}
          onEdit={handleOpenEdit}
          onAssign={handleOpenAssign}
          isAdmin={isAdmin}
        />
        {/* Solicitar Acesso Modal - Vendedor */}
        <SolicitarAcessoModal
          open={solicitarAcessoOpen}
          onOpenChange={setSolicitarAcessoOpen}
        />
      </div>
    </InternoLayout>
  );
}

interface ClienteFormProps {
  cliente: Cliente | null;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  consultores: { id: string; email: string; full_name?: string; nome_exibicao?: string; ativo?: boolean }[];
  isAdmin: boolean;
}

function ClienteForm({ cliente, onSubmit, isLoading, consultores, isAdmin }: ClienteFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="nome_fantasia" className="text-xs">Nome Fantasia</Label>
          <Input
            id="nome_fantasia"
            name="nome_fantasia"
            defaultValue={cliente?.nome_fantasia || ""}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="razao_social" className="text-xs">Razão Social *</Label>
          <Input
            id="razao_social"
            name="razao_social"
            defaultValue={cliente?.razao_social}
            required
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="tipo" className="text-xs">Tipo *</Label>
          <Select name="tipo" defaultValue={cliente?.tipo || "pj"}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pf">Pessoa Física</SelectItem>
              <SelectItem value="pj">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cpf_cnpj" className="text-xs">CPF/CNPJ *</Label>
          <Input
            id="cpf_cnpj"
            name="cpf_cnpj"
            defaultValue={cliente?.cpf_cnpj || ""}
            required
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="telefone" className="text-xs">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            defaultValue={cliente?.telefone || ""}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-xs">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={cliente?.email || ""}
            className="h-8 text-sm"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="endereco" className="text-xs">Endereço</Label>
          <Input
            id="endereco"
            name="endereco"
            placeholder="Rua, Avenida..."
            defaultValue={cliente?.endereco || ""}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="numero" className="text-xs">Número</Label>
          <Input
            id="numero"
            name="numero"
            defaultValue={cliente?.numero || ""}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="cep" className="text-xs">CEP</Label>
          <Input
            id="cep"
            name="cep"
            placeholder="00000-000"
            maxLength={9}
            defaultValue={cliente?.cep || ""}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="cidade" className="text-xs">Cidade</Label>
          <Input
            id="cidade"
            name="cidade"
            defaultValue={cliente?.cidade || ""}
            className="h-8 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="estado" className="text-xs">Estado</Label>
          <Input
            id="estado"
            name="estado"
            maxLength={2}
            placeholder="MG"
            defaultValue={cliente?.estado || ""}
            className="h-8 text-sm"
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="responsavel" className="text-xs">Responsável</Label>
          <Input
            id="responsavel"
            name="responsavel"
            defaultValue={cliente?.responsavel || ""}
            className="h-8 text-sm"
          />
        </div>

        {isAdmin && (
          <div className="col-span-2">
            <Label htmlFor="vendedor_responsavel" className="text-xs flex items-center gap-1">
              <UserCheck className="h-3 w-3" />
              Consultor Responsável
            </Label>
            <Select name="vendedor_responsavel" defaultValue={cliente?.vendedor_responsavel || "none"}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Selecione um consultor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum</SelectItem>
                {consultores.filter(c => c.ativo !== false).map(v => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.nome_exibicao || v.full_name || v.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="col-span-2">
          <Label htmlFor="observacoes" className="text-xs">Observações</Label>
          <Textarea
            id="observacoes"
            name="observacoes"
            rows={2}
            defaultValue={cliente?.observacoes || ""}
            className="text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
          {cliente ? "Salvar" : "Criar Cliente"}
        </Button>
      </div>
    </form>
  );
}