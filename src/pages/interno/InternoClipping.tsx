import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useClippings, Clipping } from "@/hooks/useClippings";
import InternoLayout from "@/components/interno/InternoLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Newspaper, ExternalLink, Check, X, Loader2, RefreshCw, Trash2, Plus, Play
} from "lucide-react";

function formatData(d: string | null) {
  if (!d) return "";
  try { return new Date(d).toLocaleDateString("pt-BR"); } catch { return ""; }
}

function ClippingReviewCard({ c, onUpdate }: { c: Clipping; onUpdate: (id: string, status: Clipping["status"]) => void }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="md:w-48 aspect-video bg-muted rounded overflow-hidden flex-shrink-0">
          {c.thumbnail_url ? (
            <img src={c.thumbnail_url} alt="" className="w-full h-full object-cover"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {c.tipo === "video" ? <Play className="w-8 h-8" /> : <Newspaper className="w-8 h-8" />}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Badge variant="outline" className="text-xs">{c.tipo}</Badge>
            {c.marca && <Badge variant="outline" className="text-xs">{c.marca}</Badge>}
            <span>{c.veiculo_nome || c.veiculo_dominio}</span>
            <span>· {formatData(c.data_publicacao)}</span>
          </div>
          <h3 className="font-semibold mb-1 line-clamp-2">{c.titulo}</h3>
          {c.resumo && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{c.resumo}</p>}
          <a href={c.url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-primary inline-flex items-center gap-1 hover:underline">
            Abrir <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex md:flex-col gap-2 md:w-32">
          {c.status !== "publicado" && (
            <Button size="sm" onClick={() => onUpdate(c.id, "publicado")} className="flex-1">
              <Check className="w-4 h-4 mr-1" /> Aprovar
            </Button>
          )}
          {c.status !== "rejeitado" && (
            <Button size="sm" variant="outline" onClick={() => onUpdate(c.id, "rejeitado")} className="flex-1">
              <X className="w-4 h-4 mr-1" /> Rejeitar
            </Button>
          )}
          {c.status !== "pendente" && (
            <Button size="sm" variant="ghost" onClick={() => onUpdate(c.id, "pendente")} className="flex-1">
              Reabrir
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function BlacklistManager() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [novo, setNovo] = useState("");
  const [escopo, setEscopo] = useState<"mg" | "nacional">("mg");

  const { data: termos = [], isLoading } = useQuery({
    queryKey: ["clipping-blacklist"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clipping_blacklist").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const add = useMutation({
    mutationFn: async () => {
      const termo = novo.trim();
      if (!termo) throw new Error("Termo vazio");
      const { error } = await supabase.from("clipping_blacklist")
        .insert({ termo, escopo_geografico: escopo, ativo: true });
      if (error) throw error;
    },
    onSuccess: () => {
      setNovo("");
      qc.invalidateQueries({ queryKey: ["clipping-blacklist"] });
      toast({ title: "Termo adicionado" });
    },
    onError: (e: any) => toast({ title: "Erro", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clipping_blacklist").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clipping-blacklist"] }),
  });

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Termos bloqueados (concorrentes)</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Notícias contendo estes termos serão descartadas automaticamente.
        Escopo "MG" só filtra quando a notícia também menciona Minas Gerais.
      </p>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Ex: Contauto"
          value={novo} onChange={(e) => setNovo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add.mutate()} />
        <select className="border rounded px-2 bg-background"
          value={escopo} onChange={(e) => setEscopo(e.target.value as any)}>
          <option value="mg">Minas Gerais</option>
          <option value="nacional">Nacional</option>
        </select>
        <Button onClick={() => add.mutate()} disabled={add.isPending}>
          <Plus className="w-4 h-4 mr-1" /> Adicionar
        </Button>
      </div>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <div className="space-y-2">
          {termos.map((t: any) => (
            <div key={t.id} className="flex items-center justify-between border rounded px-3 py-2">
              <div>
                <span className="font-medium">{t.termo}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {t.escopo_geografico === "mg" ? "MG" : "Nacional"}
                </Badge>
              </div>
              <Button size="sm" variant="ghost" onClick={() => remove.mutate(t.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default function InternoClipping() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const pendentes = useClippings("pendente");
  const publicados = useClippings("publicado");
  const rejeitados = useClippings("rejeitado");
  const [buscando, setBuscando] = useState(false);

  const atualizarStatus = async (id: string, status: Clipping["status"]) => {
    const { error } = await supabase
      .from("clippings_midia")
      .update({
        status,
        aprovado_em: status === "publicado" ? new Date().toISOString() : null,
      })
      .eq("id", id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    qc.invalidateQueries({ queryKey: ["clippings"] });
    toast({ title: status === "publicado" ? "Publicado" : status === "rejeitado" ? "Rejeitado" : "Reaberto" });
  };

  const buscarAgora = async () => {
    setBuscando(true);
    try {
      const { data, error } = await supabase.functions.invoke("buscar-clipping");
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["clippings"] });
      toast({
        title: "Busca concluída",
        description: `${data?.inserted ?? 0} novas notícias · ${data?.filtered ?? 0} filtradas · ${data?.duplicates ?? 0} duplicadas`,
      });
    } catch (e: any) {
      toast({ title: "Erro na busca", description: e.message, variant: "destructive" });
    } finally {
      setBuscando(false);
    }
  };

  return (
    <InternoLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold">Clipping de Mídia</h1>
            <p className="text-muted-foreground text-sm">
              Aprove notícias para publicar em /imprensa
            </p>
          </div>
          <Button onClick={buscarAgora} disabled={buscando}>
            {buscando ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Buscar agora
          </Button>
        </div>

        <Tabs defaultValue="pendentes">
          <TabsList>
            <TabsTrigger value="pendentes">Pendentes ({pendentes.data?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="publicados">Publicados ({publicados.data?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="rejeitados">Rejeitados ({rejeitados.data?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
          </TabsList>

          {(["pendentes", "publicados", "rejeitados"] as const).map((key) => {
            const q = key === "pendentes" ? pendentes : key === "publicados" ? publicados : rejeitados;
            return (
              <TabsContent key={key} value={key} className="space-y-3 mt-4">
                {q.isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {!q.isLoading && (q.data?.length ?? 0) === 0 && (
                  <p className="text-muted-foreground text-sm py-8 text-center">Nada por aqui.</p>
                )}
                {q.data?.map((c) => (
                  <ClippingReviewCard key={c.id} c={c} onUpdate={atualizarStatus} />
                ))}
              </TabsContent>
            );
          })}

          <TabsContent value="blacklist" className="mt-4">
            <BlacklistManager />
          </TabsContent>
        </Tabs>
      </div>
    </InternoLayout>
  );
}
