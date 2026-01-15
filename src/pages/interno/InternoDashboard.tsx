import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { useDashboard, useRankingVendedores } from "@/hooks/useDashboard";
import InternoLayout from "@/components/interno/InternoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Briefcase, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { formatCurrency, STATUS_LABELS, STATUS_COLORS, StatusNegociacao } from "@/types/interno";

export default function InternoDashboard() {
  const { isAdmin, profile, user } = useInternoAuth();
  const dashboardQuery = useDashboard(isAdmin ? {} : { owner_user_id: user?.id });
  const rankingQuery = useRankingVendedores();
  
  const metrics = dashboardQuery.data?.metrics;
  const ranking = rankingQuery.data;
  const isLoading = dashboardQuery.isLoading;

  const displayName = profile?.nome_exibicao || profile?.full_name || "Usuário";

  return (
    <InternoLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Olá, {displayName}!
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? "Visão geral do time de vendas" : "Acompanhe suas negociações"}
          </p>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Negociações Abertas"
            value={metrics?.negociacoesAbertas}
            icon={Briefcase}
            isLoading={isLoading}
          />
          <MetricCard
            title="Pipeline"
            value={metrics?.valorPipeline}
            format="currency"
            icon={DollarSign}
            isLoading={isLoading}
          />
          <MetricCard
            title="Faturado (Mês)"
            value={metrics?.valorFaturadoMes}
            format="currency"
            icon={CheckCircle2}
            isLoading={isLoading}
          />
          <MetricCard
            title="Passos Vencidos"
            value={metrics?.proximosPassosVencidos}
            icon={AlertTriangle}
            variant="warning"
            isLoading={isLoading}
          />
        </div>

        {/* Conversão e Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resumo por Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Funil de Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {(['lead_novo', 'proposta_enviada', 'negociacao', 'credito_analise', 'aprovado'] as StatusNegociacao[]).map((status) => (
                    <div key={status} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: STATUS_COLORS[status] || '#888' }}
                        />
                        <span className="text-sm font-medium">
                          {STATUS_LABELS[status]}
                        </span>
                      </div>
                      <span className="text-lg font-bold">-</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Indicadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Indicadores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Faturados (Mês)</p>
                    <p className="text-xl font-bold text-green-600">
                      {isLoading ? <Skeleton className="h-7 w-16" /> : metrics?.faturadosMes || 0}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Propostas Enviadas</p>
                    <p className="text-xl font-bold text-purple-600">
                      {isLoading ? <Skeleton className="h-7 w-16" /> : metrics?.propostasEnviadas || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Sem Atualização (7+ dias)</p>
                    <p className="text-xl font-bold">
                      {isLoading ? <Skeleton className="h-7 w-16" /> : metrics?.negociacoesSemAtualizacao || 0}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking de Vendedores (apenas admin) */}
        {isAdmin && ranking && ranking.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Ranking de Vendedores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ranking.map((vendedor, index) => (
                  <div 
                    key={vendedor.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xl font-bold ${
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        index === 2 ? 'text-amber-600' : 'text-muted-foreground'
                      }`}>
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{vendedor.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {vendedor.negociacoesAbertas} negociações abertas
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatCurrency(vendedor.totalPipeline)}</p>
                      <p className="text-sm text-green-600">{formatCurrency(vendedor.totalFaturado)} faturado</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </InternoLayout>
  );
}

interface MetricCardProps {
  title: string;
  value?: number;
  icon: React.ElementType;
  format?: "number" | "currency";
  variant?: "default" | "warning";
  isLoading?: boolean;
}

function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  format = "number", 
  variant = "default",
  isLoading 
}: MetricCardProps) {
  const displayValue = format === "currency" 
    ? formatCurrency(value || 0) 
    : (value ?? 0).toString();

  return (
    <Card className={variant === "warning" && (value || 0) > 0 ? "border-yellow-500" : ""}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <p className={`text-2xl font-bold ${variant === "warning" && (value || 0) > 0 ? "text-yellow-600" : ""}`}>
                {displayValue}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${variant === "warning" && (value || 0) > 0 ? "bg-yellow-100" : "bg-primary/10"}`}>
            <Icon className={`h-6 w-6 ${variant === "warning" && (value || 0) > 0 ? "text-yellow-600" : "text-primary"}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
