import { useState } from "react";
import { useSolicitacoesAcesso, SolicitacaoAcesso } from "@/hooks/useSolicitacoesAcesso";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { KeyRound, Check, X, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function SolicitacoesAcessoCard() {
  const { pendentes, isLoading, responderSolicitacao } = useSolicitacoesAcesso();
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState("");

  // Buscar nomes dos vendedores para exibir
  const vendedorIds = [...new Set(pendentes.map(s => s.vendedor_id))];
  const vendedorAtualIds = [...new Set(pendentes.filter(s => s.vendedor_atual_id).map(s => s.vendedor_atual_id!))];
  const allIds = [...new Set([...vendedorIds, ...vendedorAtualIds])];

  const profilesQuery = useQuery({
    queryKey: ["profiles-solicitacoes", allIds.join(",")],
    queryFn: async () => {
      if (allIds.length === 0) return [];
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, nome_exibicao, email")
        .in("id", allIds);
      return data || [];
    },
    enabled: allIds.length > 0,
  });

  const getNomeVendedor = (id: string) => {
    const p = profilesQuery.data?.find(p => p.id === id);
    return p?.nome_exibicao || p?.full_name || p?.email || "Desconhecido";
  };

  const handleAprovar = async (id: string) => {
    try {
      await responderSolicitacao.mutateAsync({ id, aprovado: true });
      toast.success("Solicitação aprovada! Cliente atribuído ao consultor.");
    } catch (error: any) {
      toast.error(error.message || "Erro ao aprovar");
    }
  };

  const handleRejeitar = async () => {
    if (!rejectId) return;
    try {
      await responderSolicitacao.mutateAsync({ 
        id: rejectId, 
        aprovado: false, 
        motivo_rejeicao: motivoRejeicao || "Rejeitado pelo admin" 
      });
      toast.success("Solicitação rejeitada.");
      setRejectId(null);
      setMotivoRejeicao("");
    } catch (error: any) {
      toast.error(error.message || "Erro ao rejeitar");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent><Skeleton className="h-20 w-full" /></CardContent>
      </Card>
    );
  }

  if (pendentes.length === 0) return null;

  return (
    <>
      <Card className="border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <KeyRound className="h-5 w-5 text-amber-600" />
            Solicitações de Acesso
            <Badge variant="destructive" className="ml-1 text-xs">
              {pendentes.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {pendentes.map((sol) => (
            <div
              key={sol.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-card rounded-lg border"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {sol.razao_social_encontrada || sol.cnpj_solicitado}
                </p>
                <p className="text-xs text-muted-foreground">
                  Solicitado por: <span className="font-medium">{getNomeVendedor(sol.vendedor_id)}</span>
                </p>
                {sol.vendedor_atual_id && (
                  <p className="text-xs text-amber-600 flex items-center gap-1 mt-0.5">
                    <AlertTriangle className="h-3 w-3" />
                    Atual: {getNomeVendedor(sol.vendedor_atual_id)}
                  </p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="min-h-[44px] min-w-[44px] text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => setRejectId(sol.id)}
                  disabled={responderSolicitacao.isPending}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  className="min-h-[44px] min-w-[44px] bg-green-600 hover:bg-green-700"
                  onClick={() => handleAprovar(sol.id)}
                  disabled={responderSolicitacao.isPending}
                >
                  {responderSolicitacao.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modal de rejeição */}
      <Dialog open={!!rejectId} onOpenChange={(open) => !open && setRejectId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rejeitar Solicitação</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="motivo">Motivo (opcional)</Label>
            <Textarea
              id="motivo"
              placeholder="Ex: Cliente já atribuído a outro consultor"
              value={motivoRejeicao}
              onChange={(e) => setMotivoRejeicao(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectId(null)}>Cancelar</Button>
            <Button 
              variant="destructive" 
              onClick={handleRejeitar}
              disabled={responderSolicitacao.isPending}
            >
              {responderSolicitacao.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Rejeitar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
