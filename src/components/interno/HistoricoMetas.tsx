import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Minus, Calendar } from "lucide-react";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MesHistorico {
  mes: number;
  ano: number;
  label: string;
  faturados: number;
  meta: number;
  atingiu: boolean | null; // null = sem meta definida
}

interface HistoricoMetasProps {
  historico?: MesHistorico[];
  isLoading?: boolean;
}

export default function HistoricoMetas({ historico, isLoading }: HistoricoMetasProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!historico || historico.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Histórico de Metas
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="grid grid-cols-3 gap-2">
          {historico.map((item) => (
            <div
              key={`${item.ano}-${item.mes}`}
              className={`rounded-lg p-3 text-center border ${
                item.meta === 0
                  ? "bg-muted/50 border-border"
                  : item.atingiu
                  ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
                  : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground capitalize mb-1">
                {item.label}
              </p>
              <div className="flex items-center justify-center gap-1 mb-1">
                {item.meta === 0 ? (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                ) : item.atingiu ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-sm font-bold">
                {item.faturados}{item.meta > 0 ? `/${item.meta}` : ""}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {item.meta === 0 ? "Sem meta" : item.atingiu ? "Bateu!" : "Não bateu"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export type { MesHistorico };
