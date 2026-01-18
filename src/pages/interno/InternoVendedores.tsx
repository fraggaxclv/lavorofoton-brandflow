import { useState } from "react";
import { useVendedores, Vendedor } from "@/hooks/useVendedores";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import InternoLayout from "@/components/interno/InternoLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User,
  Mail,
  Phone,
  UserCog
} from "lucide-react";

export default function InternoVendedores() {
  const { isAdmin } = useInternoAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: vendedores = [], isLoading } = useVendedores();

  const filteredVendedores = vendedores.filter(vendedor => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      vendedor.nome_exibicao?.toLowerCase().includes(searchLower) ||
      vendedor.full_name?.toLowerCase().includes(searchLower) ||
      vendedor.email.toLowerCase().includes(searchLower)
    );
  });

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
            <h1 className="text-xl font-bold text-foreground">Vendedores</h1>
            <p className="text-sm text-muted-foreground">
              {filteredVendedores.length} vendedor{filteredVendedores.length !== 1 ? 'es' : ''} cadastrado{filteredVendedores.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
        </div>

        {/* Vendors List */}
        {isLoading ? (
          <div className="grid gap-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : filteredVendedores.length > 0 ? (
          <div className="grid gap-2">
            {filteredVendedores.map(vendedor => (
              <VendedorCard key={vendedor.id} vendedor={vendedor} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <UserCog className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-sm font-medium mb-1">Nenhum vendedor encontrado</h3>
              <p className="text-xs text-muted-foreground">
                {searchTerm ? "Tente ajustar sua busca" : "Não há vendedores cadastrados"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </InternoLayout>
  );
}

function VendedorCard({ vendedor }: { vendedor: Vendedor }) {
  const displayName = vendedor.nome_exibicao || vendedor.full_name || vendedor.email;

  return (
    <Card className="hover:bg-muted/30 transition-colors">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 shrink-0">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-medium truncate">{displayName}</h3>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Vendedor
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-0.5">
                <Mail className="h-2.5 w-2.5" />
                {vendedor.email}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}