import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Download, User } from "lucide-react";
import { formatCurrency } from "@/types/interno";
import { exportRankingToCSV } from "@/lib/exportUtils";

interface ConsultorRanking {
  id: string;
  nome: string;
  email: string;
  faturados: number;
  valorFaturado: number;
  taxaConversao: number;
  pipeline: number;
  meta?: number;
}

interface RankingConsultoresProps {
  ranking?: ConsultorRanking[];
  isLoading?: boolean;
}

const positionIcons = [
  { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: Medal, color: "text-gray-400", bg: "bg-gray-400/10" },
  { icon: Award, color: "text-amber-600", bg: "bg-amber-600/10" },
];

export default function RankingConsultores({ ranking, isLoading }: RankingConsultoresProps) {
  const handleExport = () => {
    if (ranking) {
      exportRankingToCSV(ranking);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const maxValor = ranking && ranking.length > 0 
    ? Math.max(...ranking.map(r => r.valorFaturado)) 
    : 1;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Ranking de Consultores
          </CardTitle>
          {ranking && ranking.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!ranking || ranking.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhum dado disponível</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ranking.slice(0, 5).map((consultor, index) => {
              const position = positionIcons[index] || { icon: User, color: "text-muted-foreground", bg: "bg-muted" };
              const Icon = position.icon;
              const progressPercent = maxValor > 0 ? (consultor.valorFaturado / maxValor) * 100 : 0;
              const metaPercent = consultor.meta && consultor.meta > 0
                ? (consultor.faturados / consultor.meta) * 100
                : null;

              return (
                <div 
                  key={consultor.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {/* Posição */}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${position.bg}`}>
                    {index < 3 ? (
                      <Icon className={`h-4 w-4 ${position.color}`} />
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm truncate">{consultor.nome}</p>
                      <span className="text-sm font-bold text-primary">
                        {formatCurrency(consultor.valorFaturado)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{consultor.faturados} faturado{consultor.faturados !== 1 ? "s" : ""}</span>
                      {metaPercent !== null && (
                        <span className={metaPercent >= 100 ? "text-green-600 font-medium" : ""}>
                          {metaPercent.toFixed(0)}% da meta
                        </span>
                      )}
                    </div>
                    <Progress 
                      value={progressPercent} 
                      className="h-1.5 mt-2" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
