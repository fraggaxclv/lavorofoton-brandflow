import { useState } from "react";
import { useClientes } from "@/hooks/useClientes";
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
import { 
  Plus, 
  Search, 
  Building2, 
  User, 
  Phone, 
  Mail,
  MapPin,
  Edit,
  Loader2
} from "lucide-react";
import { Cliente, TIPO_CLIENTE_LABELS } from "@/types/interno";
import { toast } from "sonner";

export default function InternoClientes() {
  const { user } = useInternoAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  const { clientes, isLoading, createCliente, updateCliente, isCreating, isUpdating } = useClientes({ 
    search: searchTerm,
  });

  const handleOpenCreate = () => {
    setEditingCliente(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setDialogOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    const data = {
      nome_razao: formData.get("nome_razao") as string,
      tipo: formData.get("tipo") as "pf" | "pj",
      cpf_cnpj: formData.get("cpf_cnpj") as string || undefined,
      telefone: formData.get("telefone") as string || undefined,
      email: formData.get("email") as string || undefined,
      cidade: formData.get("cidade") as string || undefined,
      estado: formData.get("estado") as string || undefined,
      responsavel: formData.get("responsavel") as string || undefined,
      observacoes: formData.get("observacoes") as string || undefined,
    };

    try {
      if (editingCliente) {
        await updateCliente.mutateAsync({ id: editingCliente.id, ...data });
        toast.success("Cliente atualizado com sucesso!");
      } else {
        await createCliente.mutateAsync({ ...data, created_by: user!.id });
        toast.success("Cliente criado com sucesso!");
      }
      setDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao salvar cliente");
    }
  };

  return (
    <InternoLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground">Gerencie sua base de clientes</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-2" />
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
                isLoading={createCliente.isPending || updateCliente.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CNPJ, telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger className="w-full sm:w-40">
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
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : clientes && clientes.length > 0 ? (
          <div className="grid gap-4">
            {clientes.map(cliente => (
              <Card key={cliente.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        {cliente.tipo === "pj" ? (
                          <Building2 className="h-6 w-6 text-primary" />
                        ) : (
                          <User className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{cliente.nome_razao}</h3>
                          <Badge variant="outline">
                            {TIPO_CLIENTE_LABELS[cliente.tipo]}
                          </Badge>
                        </div>
                        {cliente.cpf_cnpj && (
                          <p className="text-sm text-muted-foreground">
                            {cliente.tipo === "pj" ? "CNPJ" : "CPF"}: {cliente.cpf_cnpj}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          {cliente.telefone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {cliente.telefone}
                            </span>
                          )}
                          {cliente.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {cliente.email}
                            </span>
                          )}
                          {(cliente.cidade || cliente.estado) && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {[cliente.cidade, cliente.estado].filter(Boolean).join(" - ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleOpenEdit(cliente)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum cliente encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Tente ajustar sua busca" : "Comece adicionando seu primeiro cliente"}
              </p>
              {!searchTerm && (
                <Button onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </InternoLayout>
  );
}

interface ClienteFormProps {
  cliente: Cliente | null;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

function ClienteForm({ cliente, onSubmit, isLoading }: ClienteFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="nome_razao">Nome / Razão Social *</Label>
          <Input
            id="nome_razao"
            name="nome_razao"
            defaultValue={cliente?.nome_razao}
            required
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo *</Label>
          <Select name="tipo" defaultValue={cliente?.tipo || "pj"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pf">Pessoa Física</SelectItem>
              <SelectItem value="pj">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cpf_cnpj">CPF/CNPJ</Label>
          <Input
            id="cpf_cnpj"
            name="cpf_cnpj"
            defaultValue={cliente?.cpf_cnpj || ""}
          />
        </div>

        <div>
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            defaultValue={cliente?.telefone || ""}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={cliente?.email || ""}
          />
        </div>

        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            name="cidade"
            defaultValue={cliente?.cidade || ""}
          />
        </div>

        <div>
          <Label htmlFor="estado">Estado</Label>
          <Input
            id="estado"
            name="estado"
            maxLength={2}
            defaultValue={cliente?.estado || ""}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="responsavel">Responsável</Label>
          <Input
            id="responsavel"
            name="responsavel"
            defaultValue={cliente?.responsavel || ""}
          />
        </div>

        <div className="col-span-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            name="observacoes"
            rows={3}
            defaultValue={cliente?.observacoes || ""}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {cliente ? "Salvar Alterações" : "Criar Cliente"}
        </Button>
      </div>
    </form>
  );
}
