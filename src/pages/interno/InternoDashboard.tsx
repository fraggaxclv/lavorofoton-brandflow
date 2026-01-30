import { useState, memo, useCallback } from "react";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { useDashboard, useRankingVendedores, useVendedores } from "@/hooks/useDashboard";
import { useDashboardAnalytics, useRankingConsultores } from "@/hooks/useDashboardAnalytics";
import { useMetaMensal, getMetaVendedor } from "@/hooks/useMetaMensal";
import InternoLayout from "@/components/interno/InternoLayout";
import DashboardKPIs from "@/components/interno/DashboardKPIs";
import TrendChart from "@/components/interno/TrendChart";
import RankingConsultores from "@/components/interno/RankingConsultores";
import ExportButton from "@/components/interno/ExportButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { exportDashboardToCSV } from "@/lib/exportUtils";
import { 
  Briefcase, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  Settings,
  Users,
  Plus,
  UserPlus,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { formatCurrency, STATUS_LABELS, STATUS_COLORS, StatusNegociacao } from "@/types/interno";

export default function InternoDashboard() {
  const navigate = useNavigate();
  const { isAdmin, profile, user } = useInternoAuth();
  const dashboardQuery = useDashboard(isAdmin ? {} : { owner_user_id: user?.id });
  const analyticsQuery = useDashboardAnalytics(isAdmin ? {} : { owner_user_id: user?.id });
  const rankingQuery = useRankingVendedores();
  const rankingConsultoresQuery = useRankingConsultores();
  const vendedoresQuery = useVendedores();
  const { 
    valorMetaGeral, 
    upsertMetaGeral, 
    isUpdatingGeral, 
    isLoadingGeral,
    todasMetasIndividuais,
    upsertMetaIndividual,
    isUpdatingIndividual,
    valorMetaIndividual,
    isLoadingIndividual,
  } = useMetaMensal(user?.id);
  
  const [metaDialogOpen, setMetaDialogOpen] = useState(false);
  const [metaIndividualDialogOpen, setMetaIndividualDialogOpen] = useState(false);
  const [novoValorMeta, setNovoValorMeta] = useState("");
  const [selectedVendedorId, setSelectedVendedorId] = useState<string>("");
  const [novoValorMetaIndividual, setNovoValorMetaIndividual] = useState("");
  
  const metrics = dashboardQuery.data?.metrics;
  const kpis = analyticsQuery.data?.kpis;
  const tendencia = analyticsQuery.data?.tendencia;
  const ranking = rankingQuery.data;
  const rankingConsultores = rankingConsultoresQuery.data;
  const vendedores = vendedoresQuery.data || [];
  const isLoading = dashboardQuery.isLoading;

  const displayName = profile?.nome_exibicao || profile?.full_name || "Usuário";
  
  const faturadosMes = metrics?.faturadosMes || 0;
  const progressoMetaGeral = valorMetaGeral > 0 ? Math.min((faturadosMes / valorMetaGeral) * 100, 100) : 0;

  const handleSaveMetaGeral = async () => {
    const valor = parseInt(novoValorMeta, 10);
    if (isNaN(valor) || valor <= 0) {
      toast.error("Informe uma quantidade válida");
      return;
    }
    try {
      await upsertMetaGeral(valor);
      toast.success("Meta geral atualizada com sucesso!");
      setMetaDialogOpen(false);
      setNovoValorMeta("");
    } catch (error) {
      toast.error("Erro ao atualizar meta");
    }
  };

  const handleSaveMetaIndividual = async () => {
    if (!selectedVendedorId) {
      toast.error("Selecione um vendedor");
      return;
    }
    const valor = parseInt(novoValorMetaIndividual, 10);
    if (isNaN(valor) || valor <= 0) {
      toast.error("Informe uma quantidade válida");
      return;
    }
    try {
      await upsertMetaIndividual({ vendedorId: selectedVendedorId, valorMeta: valor });
      toast.success("Meta individual atualizada com sucesso!");
      setMetaIndividualDialogOpen(false);
      setSelectedVendedorId("");
      setNovoValorMetaIndividual("");
    } catch (error) {
      toast.error("Erro ao atualizar meta individual");
    }
  };

  const getVendedorMetaProgress = (vendedorId: string) => {
    const vendedorMeta = getMetaVendedor(todasMetasIndividuais || [], vendedorId);
    const vendedorData = ranking?.find(v => v.id === vendedorId);
    // Count faturados from ranking - we need to get actual count not value
    // For now, approximate using value and assume similar behavior
    return { meta: vendedorMeta, vendedorData };
  };

  // Negociações urgentes (sem atualização ou passos vencidos)
  const negociacoesUrgentes = [
    ...(dashboardQuery.data?.negociacoesPassosVencidos || []),
    ...(dashboardQuery.data?.negociacoesSemAtualizacao || [])
  ].slice(0, 5);

  // Exportar dashboard
  const handleExportDashboard = () => {
    if (kpis && tendencia && rankingConsultores) {
      exportDashboardToCSV({
        kpis,
        faturadosMes: analyticsQuery.data?.faturadosMesAtual || 0,
        tendencia,
        ranking: rankingConsultores,
      });
    }
  };

  return (
    <InternoLayout>
      <div className="space-y-5">
        {/* Header Compacto */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Olá, {displayName}!
            </h1>
            <p className="text-sm text-muted-foreground">
              {isAdmin ? "Visão geral do time" : "Continue suas vendas"}
            </p>
          </div>
          
          {/* Ações Rápidas - Destacadas */}
          <div className="flex gap-2">
            {isAdmin && (
              <ExportButton 
                onExport={handleExportDashboard} 
                label="Exportar"
                disabled={analyticsQuery.isLoading}
              />
            )}
            <Button 
              onClick={() => navigate("/interno/negociacoes")} 
              size="sm"
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova </span>Negociação
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/interno/clientes")}
              className="gap-1.5"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Novo </span>Cliente
            </Button>
          </div>
        </div>

        {/* KPIs Analytics - Novo */}
        <DashboardKPIs kpis={kpis} isLoading={analyticsQuery.isLoading} />

        {/* Navegação Rápida para Consultor */}
        {!isAdmin && (
          <div className="grid grid-cols-3 gap-2">
            <Link
              to="/interno/negociacoes"
              className="flex items-center justify-center gap-2 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-primary font-medium text-sm"
            >
              <Briefcase className="h-4 w-4" />
              <span>Negociações</span>
            </Link>
            <Link
              to="/interno/clientes"
              className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground font-medium text-sm"
            >
              <Users className="h-4 w-4" />
              <span>Clientes</span>
            </Link>
            <Link
              to="/interno/meu-perfil"
              className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-foreground font-medium text-sm"
            >
              <Target className="h-4 w-4" />
              <span>Meu Perfil</span>
            </Link>
          </div>
        )}

        {/* Métricas Compactas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard
            title="Abertas"
            value={metrics?.negociacoesAbertas}
            icon={Briefcase}
            isLoading={isLoading}
            onClick={() => navigate("/interno/negociacoes")}
          />
          <MetricCard
            title="Pipeline"
            value={metrics?.valorPipeline}
            format="currency"
            icon={DollarSign}
            isLoading={isLoading}
          />
          <MetricCard
            title="Faturado"
            value={metrics?.valorFaturadoMes}
            format="currency"
            icon={CheckCircle2}
            variant="success"
            isLoading={isLoading}
          />
          <MetricCard
            title="Pendências"
            value={(metrics?.proximosPassosVencidos || 0) + (metrics?.negociacoesSemAtualizacao || 0)}
            icon={AlertTriangle}
            variant="warning"
            isLoading={isLoading}
            onClick={() => navigate("/interno/negociacoes")}
          />
        </div>

        {/* Negociações que Precisam de Atenção - Para Consultor */}
        {!isAdmin && negociacoesUrgentes.length > 0 && (
          <Card className="border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base text-orange-700 dark:text-orange-400">
                <Clock className="h-4 w-4" />
                Precisam de Atenção
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {negociacoesUrgentes.map((neg) => (
                  <Link
                    key={neg.id}
                    to={`/interno/negociacoes?id=${neg.id}`}
                    className="flex items-center justify-between p-3 bg-card hover:bg-muted/80 rounded-lg transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {neg.cliente?.nome_fantasia || neg.cliente?.razao_social || 'Cliente'}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span 
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ 
                            backgroundColor: `${STATUS_COLORS[neg.status as StatusNegociacao]}20`,
                            color: STATUS_COLORS[neg.status as StatusNegociacao]
                          }}
                        >
                          {STATUS_LABELS[neg.status as StatusNegociacao]}
                        </span>
                        {neg.data_proximo_passo && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(neg.data_proximo_passo).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-orange-600 hover:text-orange-700 hover:bg-orange-100/50"
                onClick={() => navigate("/interno/negociacoes")}
              >
                Ver todas negociações
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Meta do Vendedor - Compacta e Motivacional */}
        {!isAdmin && (
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-4">
              {isLoadingIndividual ? (
                <Skeleton className="h-16 w-full" />
              ) : valorMetaIndividual > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span className="font-medium">Minha Meta</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{faturadosMes}</span>
                      <span className="text-muted-foreground">/{valorMetaIndividual}</span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min((faturadosMes / valorMetaIndividual) * 100, 100)} 
                    className="h-2" 
                  />
                  {faturadosMes >= valorMetaIndividual ? (
                    <p className="text-center text-sm font-medium text-green-600">
                      🎉 Meta atingida!
                    </p>
                  ) : (
                    <p className="text-center text-sm text-muted-foreground">
                      Faltam {valorMetaIndividual - faturadosMes} para bater a meta
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Meta não definida</span>
                  </div>
                  <span className="text-lg font-bold">{faturadosMes} faturados</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Meta do Time - Admin */}
        {isAdmin && (
          <Card className="border-primary/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="h-5 w-5 text-primary" />
                  Meta do Time
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setNovoValorMeta("");
                    setMetaDialogOpen(true);
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {isLoadingGeral ? (
                <Skeleton className="h-16 w-full" />
              ) : valorMetaGeral > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Faturados</p>
                      <p className="text-xl font-bold text-green-600">{faturadosMes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Meta</p>
                      <p className="text-xl font-bold text-primary">{valorMetaGeral}</p>
                    </div>
                  </div>
                  <Progress value={progressoMetaGeral} className="h-3" />
                  <p className="text-center text-sm text-muted-foreground">
                    {progressoMetaGeral.toFixed(0)}% concluído
                  </p>
                </div>
              ) : (
                <p className="text-center py-2 text-muted-foreground text-sm">
                  Clique no ícone para definir a meta
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Gráfico de Tendência e Ranking - Novo Layout */}
        {isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendChart data={tendencia} isLoading={analyticsQuery.isLoading} />
            <RankingConsultores ranking={rankingConsultores} isLoading={rankingConsultoresQuery.isLoading} />
          </div>
        )}

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
                  {(['lead_novo', 'proposta_enviada'] as StatusNegociacao[]).map((status) => (
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

        {/* Ranking de Vendedores com Metas (apenas admin) */}
        {isAdmin && ranking && ranking.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Metas Individuais
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedVendedorId("");
                    setNovoValorMetaIndividual("");
                    setMetaIndividualDialogOpen(true);
                  }}
                >
                  <Target className="h-4 w-4 mr-1" />
                  Definir Meta
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ranking.map((vendedor, index) => {
                  const metaIndividual = getMetaVendedor(todasMetasIndividuais || [], vendedor.id);
                  // We need actual count - for now use negociacoesAbertas as proxy
                  // In real scenario, we would count faturados per vendedor
                  return (
                    <div 
                      key={vendedor.id}
                      className="p-4 bg-muted rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
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
                      {metaIndividual > 0 && (
                        <div className="pt-2 border-t border-border/50">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Meta individual</span>
                            <span className="font-medium">{metaIndividual} unidades</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dialog para configurar meta geral */}
        <Dialog open={metaDialogOpen} onOpenChange={setMetaDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configurar Meta Geral do Time</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Quantidade de Veículos (Total do Time)</Label>
                <Input
                  type="number"
                  placeholder="Ex: 10"
                  value={novoValorMeta}
                  onChange={(e) => setNovoValorMeta(e.target.value)}
                  min={1}
                  autoFocus
                />
                <p className="text-sm text-muted-foreground">
                  Meta atual: {valorMetaGeral > 0 ? `${valorMetaGeral} unidades` : "Não definida"}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMetaDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveMetaGeral} disabled={isUpdatingGeral}>
                {isUpdatingGeral ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para configurar meta individual */}
        <Dialog open={metaIndividualDialogOpen} onOpenChange={setMetaIndividualDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configurar Meta Individual</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Vendedor</Label>
                <Select value={selectedVendedorId} onValueChange={setSelectedVendedorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendedores.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantidade de Veículos</Label>
                <Input
                  type="number"
                  placeholder="Ex: 5"
                  value={novoValorMetaIndividual}
                  onChange={(e) => setNovoValorMetaIndividual(e.target.value)}
                  min={1}
                />
                {selectedVendedorId && (
                  <p className="text-sm text-muted-foreground">
                    Meta atual: {getMetaVendedor(todasMetasIndividuais || [], selectedVendedorId) || "Não definida"}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMetaIndividualDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveMetaIndividual} disabled={isUpdatingIndividual}>
                {isUpdatingIndividual ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </InternoLayout>
  );
}

interface MetricCardProps {
  title: string;
  value?: number;
  icon: React.ElementType;
  format?: "number" | "currency";
  variant?: "default" | "warning" | "success";
  isLoading?: boolean;
  onClick?: () => void;
}

const MetricCard = memo(function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  format = "number", 
  variant = "default",
  isLoading,
  onClick
}: MetricCardProps) {
  const displayValue = format === "currency" 
    ? formatCurrency(value || 0) 
    : (value ?? 0).toString();

  const variantStyles = {
    default: {
      border: "",
      text: "",
      bg: "bg-primary/10",
      iconColor: "text-primary"
    },
    warning: {
      border: (value || 0) > 0 ? "border-orange-300 dark:border-orange-800" : "",
      text: (value || 0) > 0 ? "text-orange-600" : "",
      bg: (value || 0) > 0 ? "bg-orange-100 dark:bg-orange-900/30" : "bg-primary/10",
      iconColor: (value || 0) > 0 ? "text-orange-600" : "text-primary"
    },
    success: {
      border: "border-green-200 dark:border-green-900",
      text: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600"
    }
  };

  const styles = variantStyles[variant];
  
  const CardWrapper = onClick ? 'button' : 'div';

  return (
    <Card className={`${styles.border} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
      <CardWrapper 
        className="w-full text-left"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{title}</p>
              {isLoading ? (
                <Skeleton className="h-6 w-16 mt-1" />
              ) : (
                <p className={`text-lg font-bold truncate ${styles.text}`}>
                  {displayValue}
                </p>
              )}
            </div>
            <div className={`p-2 rounded-lg shrink-0 ${styles.bg}`}>
              <Icon className={`h-4 w-4 ${styles.iconColor}`} />
            </div>
          </div>
        </CardContent>
      </CardWrapper>
    </Card>
  );
});
