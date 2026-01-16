import { useState } from "react";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { useDashboard, useRankingVendedores, useVendedores } from "@/hooks/useDashboard";
import { useMetaMensal, getMetaVendedor } from "@/hooks/useMetaMensal";
import InternoLayout from "@/components/interno/InternoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Briefcase, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  Target,
  Settings,
  Users
} from "lucide-react";
import { formatCurrency, STATUS_LABELS, STATUS_COLORS, StatusNegociacao } from "@/types/interno";

export default function InternoDashboard() {
  const { isAdmin, profile, user } = useInternoAuth();
  const dashboardQuery = useDashboard(isAdmin ? {} : { owner_user_id: user?.id });
  const rankingQuery = useRankingVendedores();
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
  } = useMetaMensal(user?.id);
  
  const [metaDialogOpen, setMetaDialogOpen] = useState(false);
  const [metaIndividualDialogOpen, setMetaIndividualDialogOpen] = useState(false);
  const [novoValorMeta, setNovoValorMeta] = useState("");
  const [selectedVendedorId, setSelectedVendedorId] = useState<string>("");
  const [novoValorMetaIndividual, setNovoValorMetaIndividual] = useState("");
  
  const metrics = dashboardQuery.data?.metrics;
  const ranking = rankingQuery.data;
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

        {/* Card da Meta Mensal */}
        <Card className="border-2 border-primary/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Meta Mensal
              </CardTitle>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setNovoValorMeta("");
                    setMetaDialogOpen(true);
                  }}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingGeral ? (
              <Skeleton className="h-20 w-full" />
            ) : valorMetaGeral > 0 ? (
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Faturados</p>
                    <p className="text-2xl font-bold text-green-600">{faturadosMes} unidades</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Meta Geral</p>
                    <p className="text-2xl font-bold text-primary">{valorMetaGeral} unidades</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={progressoMetaGeral} className="h-4" />
                  <p className="text-center text-sm font-medium">
                    {progressoMetaGeral.toFixed(1)}% da meta
                  </p>
                </div>
                {faturadosMes >= valorMetaGeral && (
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
                    <p className="text-green-700 dark:text-green-400 font-bold">
                      🎉 Meta atingida! Parabéns!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                {isAdmin ? (
                  <p>Clique em "Configurar" para definir a meta mensal</p>
                ) : (
                  <p>Meta não definida para este mês</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

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
