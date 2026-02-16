import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus, DollarSign, Target, Percent, Briefcase } from "lucide-react";
import { formatCurrency, formatCurrencyCompact } from "@/types/interno";

interface KPICardProps {
  title: string;
  value: string | number;
  variacao?: number;
  icon: React.ComponentType<{ className?: string }>;
  isLoading?: boolean;
  format?: "number" | "currency" | "percent";
}

function KPICard({ title, value, variacao, icon: Icon, isLoading, format = "number" }: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;
    switch (format) {
      case "currency":
        return formatCurrency(val);
      case "percent":
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString("pt-BR");
    }
  };

  const renderVariacao = () => {
    if (variacao === undefined) return null;
    const isPositive = variacao > 0;
    const isNeutral = variacao === 0;

    return (
      <div className={`flex items-center gap-1 text-xs ${
        isNeutral ? "text-muted-foreground" : isPositive ? "text-green-600" : "text-red-600"
      }`}>
        {isNeutral ? (
          <Minus className="h-3 w-3" />
        ) : isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span>{isPositive ? "+" : ""}{variacao.toFixed(1)}%</span>
        <span className="text-muted-foreground">vs mês ant.</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-3 w-16" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide truncate mr-1">{title}</span>
          <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        <p className="text-lg sm:text-2xl font-bold text-foreground truncate" title={typeof value === "number" && format === "currency" ? formatCurrency(value) : undefined}>
          {format === "currency" && typeof value === "number" ? formatCurrencyCompact(value) : formatValue(value)}
        </p>
        {renderVariacao()}
      </CardContent>
    </Card>
  );
}

interface DashboardKPIsProps {
  kpis?: {
    negociacoesAtivas: number;
    valorPipeline: number;
    taxaConversao: number;
    ticketMedio: number;
    variacaoNegociacoes: number;
    variacaoPipeline: number;
    variacaoConversao: number;
    variacaoTicket: number;
  };
  isLoading?: boolean;
}

export default function DashboardKPIs({ kpis, isLoading }: DashboardKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <KPICard
        title="Negociações Ativas"
        value={kpis?.negociacoesAtivas || 0}
        variacao={kpis?.variacaoNegociacoes}
        icon={Briefcase}
        isLoading={isLoading}
      />
      <KPICard
        title="Valor em Pipeline"
        value={kpis?.valorPipeline || 0}
        variacao={kpis?.variacaoPipeline}
        icon={DollarSign}
        format="currency"
        isLoading={isLoading}
      />
      <KPICard
        title="Taxa de Conversão"
        value={kpis?.taxaConversao || 0}
        variacao={kpis?.variacaoConversao}
        icon={Percent}
        format="percent"
        isLoading={isLoading}
      />
      <KPICard
        title="Ticket Médio"
        value={kpis?.ticketMedio || 0}
        variacao={kpis?.variacaoTicket}
        icon={Target}
        format="currency"
        isLoading={isLoading}
      />
    </div>
  );
}
