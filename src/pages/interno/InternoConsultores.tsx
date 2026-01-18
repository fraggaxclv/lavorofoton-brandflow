import { useState } from "react";
import { useConsultores, useCreateConsultor, useToggleConsultorAtivo, Consultor, CreateConsultorData } from "@/hooks/useConsultores";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import InternoLayout from "@/components/interno/InternoLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Search, 
  User,
  Mail,
  UserCog,
  Plus,
  Eye,
  EyeOff
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const consultorSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(50),
  sobrenome: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres").max(50),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  ativo: z.boolean().default(true),
});

type ConsultorFormData = z.infer<typeof consultorSchema>;

export default function InternoConsultores() {
  const { isAdmin } = useInternoAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { data: consultores = [], isLoading } = useConsultores();
  const createConsultor = useCreateConsultor();
  const toggleAtivo = useToggleConsultorAtivo();

  const form = useForm<ConsultorFormData>({
    resolver: zodResolver(consultorSchema),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
      ativo: true,
    }
  });

  const filteredConsultores = consultores.filter(consultor => {
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matches = (
        consultor.nome_exibicao?.toLowerCase().includes(searchLower) ||
        consultor.full_name?.toLowerCase().includes(searchLower) ||
        consultor.email.toLowerCase().includes(searchLower)
      );
      if (!matches) return false;
    }
    
    // Filter by active status
    if (!showInactive && consultor.ativo === false) {
      return false;
    }
    
    return true;
  });

  const handleSubmit = async (data: ConsultorFormData) => {
    await createConsultor.mutateAsync(data as CreateConsultorData);
    setDialogOpen(false);
    form.reset();
    setShowPassword(false);
  };

  const handleToggleAtivo = (consultor: Consultor) => {
    toggleAtivo.mutate({ id: consultor.id, ativo: !consultor.ativo });
  };

  if (!isAdmin) {
    return (
      <InternoLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Acesso restrito a administradores</p>
        </div>
      </InternoLayout>
    );
  }

  return (
    <InternoLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Consultores</h1>
            <p className="text-sm text-muted-foreground">
              {filteredConsultores.length} consultor{filteredConsultores.length !== 1 ? 'es' : ''} cadastrado{filteredConsultores.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Novo Consultor
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch 
              id="show-inactive" 
              checked={showInactive}
              onCheckedChange={setShowInactive}
            />
            <Label htmlFor="show-inactive" className="text-xs text-muted-foreground">
              Mostrar inativos
            </Label>
          </div>
        </div>

        {/* Consultors List */}
        {isLoading ? (
          <div className="grid gap-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : filteredConsultores.length > 0 ? (
          <div className="grid gap-2">
            {filteredConsultores.map(consultor => (
              <ConsultorCard 
                key={consultor.id} 
                consultor={consultor}
                onToggleAtivo={() => handleToggleAtivo(consultor)}
                isToggling={toggleAtivo.isPending}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <UserCog className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-sm font-medium mb-1">Nenhum consultor encontrado</h3>
              <p className="text-xs text-muted-foreground">
                {searchTerm ? "Tente ajustar sua busca" : "Clique em 'Novo Consultor' para adicionar"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Consultor Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Consultor</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="João" className="h-9 text-sm" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sobrenome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Sobrenome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Silva" className="h-9 text-sm" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Email (Login)</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="joao@lavorofoton.com.br" className="h-9 text-sm" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          {...field} 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Mínimo 6 caracteres" 
                          className="h-9 text-sm pr-10" 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-9 w-9"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ativo"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-xs !mt-0">Ativo</FormLabel>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={createConsultor.isPending}
                >
                  {createConsultor.isPending ? "Criando..." : "Criar Consultor"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </InternoLayout>
  );
}

interface ConsultorCardProps {
  consultor: Consultor;
  onToggleAtivo: () => void;
  isToggling: boolean;
}

function ConsultorCard({ consultor, onToggleAtivo, isToggling }: ConsultorCardProps) {
  const displayName = consultor.nome_exibicao || consultor.full_name || consultor.email;
  const isInactive = consultor.ativo === false;

  return (
    <Card className={`transition-colors ${isInactive ? 'opacity-60' : 'hover:bg-muted/30'}`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md shrink-0 ${isInactive ? 'bg-muted' : 'bg-primary/10'}`}>
            <User className={`h-4 w-4 ${isInactive ? 'text-muted-foreground' : 'text-primary'}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-medium truncate">{displayName}</h3>
              <Badge 
                variant={isInactive ? "outline" : "secondary"} 
                className="text-[10px] px-1.5 py-0"
              >
                {isInactive ? "Inativo" : "Consultor"}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-0.5">
                <Mail className="h-2.5 w-2.5" />
                {consultor.email}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={consultor.ativo !== false}
              onCheckedChange={onToggleAtivo}
              disabled={isToggling}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
