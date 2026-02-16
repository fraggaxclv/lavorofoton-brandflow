import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  Users, Briefcase, LayoutDashboard, UserCog, 
  TrendingDown, Search, Inbox
} from "lucide-react";
import { STATUS_LABELS, StatusNegociacao, formatCurrency } from "@/types/interno";

interface SearchResult {
  id: string;
  type: "cliente" | "negociacao";
  title: string;
  subtitle: string;
  path: string;
}

interface BuscaGlobalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BuscaGlobal({ open, onOpenChange }: BuscaGlobalProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (term: string) => {
    if (term.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const [clientesRes, negociacoesRes] = await Promise.all([
        supabase
          .from("clientes")
          .select("id, razao_social, nome_fantasia, cpf_cnpj, cidade")
          .or(`razao_social.ilike.%${term}%,nome_fantasia.ilike.%${term}%,cpf_cnpj.ilike.%${term}%`)
          .limit(5),
        supabase
          .from("negociacoes")
          .select("id, numero_negociacao, status, valor_estimado, produto_principal, cliente:clientes(razao_social, nome_fantasia)")
          .or(`numero_negociacao.ilike.%${term}%,produto_principal.ilike.%${term}%`)
          .limit(5),
      ]);

      const clienteResults: SearchResult[] = (clientesRes.data || []).map(c => ({
        id: c.id,
        type: "cliente" as const,
        title: c.nome_fantasia || c.razao_social,
        subtitle: `${c.cpf_cnpj}${c.cidade ? ` · ${c.cidade}` : ""}`,
        path: `/interno/clientes?id=${c.id}`,
      }));

      const negResults: SearchResult[] = (negociacoesRes.data || []).map((n: any) => ({
        id: n.id,
        type: "negociacao" as const,
        title: `${n.numero_negociacao} - ${n.cliente?.nome_fantasia || n.cliente?.razao_social || ""}`,
        subtitle: `${STATUS_LABELS[n.status as StatusNegociacao] || n.status} · ${formatCurrency(n.valor_estimado || 0)}`,
        path: `/interno/negociacoes?id=${n.id}`,
      }));

      setResults([...clienteResults, ...negResults]);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search, doSearch]);

  const handleSelect = (path: string) => {
    onOpenChange(false);
    setSearch("");
    setResults([]);
    navigate(path);
  };

  const pages = [
    { label: "Dashboard", path: "/interno/dashboard", icon: LayoutDashboard },
    { label: "Negociações", path: "/interno/negociacoes", icon: Briefcase },
    { label: "Clientes", path: "/interno/clientes", icon: Users },
    { label: "Consultores", path: "/interno/consultores", icon: UserCog },
    { label: "Rel. Perdas", path: "/interno/relatorio-perdas", icon: TrendingDown },
    { label: "Pedidos Site", path: "/interno/pedidos-publicos", icon: Inbox },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false}>
      <CommandInput
        placeholder="Buscar clientes, negociações, páginas..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? "Buscando..." : "Nenhum resultado encontrado."}
        </CommandEmpty>

        {results.filter(r => r.type === "cliente").length > 0 && (
          <CommandGroup heading="Clientes">
            {results.filter(r => r.type === "cliente").map(r => (
              <CommandItem key={r.id} onSelect={() => handleSelect(r.path)}>
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {results.filter(r => r.type === "negociacao").length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Negociações">
              {results.filter(r => r.type === "negociacao").map(r => (
                <CommandItem key={r.id} onSelect={() => handleSelect(r.path)}>
                  <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {!search && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Páginas">
              {pages.map(p => (
                <CommandItem key={p.path} onSelect={() => handleSelect(p.path)}>
                  <p.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{p.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
