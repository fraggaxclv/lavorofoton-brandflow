import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { usePedidosPublicos, PedidoPublico } from "@/hooks/usePedidosPublicos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox, ArrowRight, FileText, Import, Loader2 } from "lucide-react";

function PedidosPublicosCard() {
  const navigate = useNavigate();
  const { pendentes, countPendentes, isLoading, importar, isImporting } = usePedidosPublicos({ status: 'pendentes' });

  const ultimos5 = pendentes.slice(0, 5);

  const handleImportar = async (pedido: PedidoPublico) => {
    await importar(pedido);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Inbox className="h-5 w-5 text-primary" />
            Pedidos do Site
            {countPendentes > 0 && (
              <Badge variant="default" className="text-xs px-1.5 py-0">
                {countPendentes}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1"
            onClick={() => navigate("/interno/pedidos-publicos")}
          >
            Ver todos
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {ultimos5.length === 0 ? (
          <div className="text-center py-6">
            <Inbox className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum pedido pendente</p>
          </div>
        ) : (
          <div className="space-y-2">
            {ultimos5.map((pedido) => (
              <div
                key={pedido.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg gap-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-1.5 rounded bg-primary/10 shrink-0">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{pedido.cliente_nome}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground truncate">
                        {pedido.modelo_veiculo}
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {pedido.tipo === 'pedido' ? 'Pedido' : 'Proposta'}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(pedido.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 gap-1 text-xs h-8"
                  onClick={() => handleImportar(pedido)}
                  disabled={isImporting}
                >
                  {isImporting ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Import className="h-3 w-3" />
                  )}
                  Importar
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(PedidosPublicosCard);
