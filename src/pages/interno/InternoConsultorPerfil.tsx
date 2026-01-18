import { useParams, useNavigate } from "react-router-dom";
import { useConsultorProfile } from "@/hooks/useConsultorProfile";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import InternoLayout from "@/components/interno/InternoLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Calendar,
  Briefcase,
  DollarSign,
  Users,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock,
  Building2,
  Phone,
  MapPin,
  BarChart3,
} from "lucide-react";
import {
  formatCurrency,
  STATUS_LABELS,
  STATUS_COLORS,
  StatusNegociacao,
} from "@/types/interno";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function InternoConsultorPerfil() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, user } = useInternoAuth();

  // If no id, use current user's id (for consultants viewing their own profile)
  const consultorId = id || user?.id;

  const { profile, stats, historico, clientes, faturamentoMensal, isLoading } =
    useConsultorProfile(consultorId);

  // Only admins can view other profiles, consultants can only view their own
  const canView = isAdmin || consultorId === user?.id;

  if (!canView) {
    return (
      <InternoLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Acesso não autorizado</p>
        </div>
      </InternoLayout>
    );
  }

  if (isLoading) {
    return (
      <InternoLayout>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </InternoLayout>
    );
  }

  if (!profile) {
    return (
      <InternoLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Consultor não encontrado</p>
        </div>
      </InternoLayout>
    );
  }

  const displayName = profile.nome_exibicao || profile.full_name || profile.email;
  const memberSince = profile.created_at
    ? format(parseISO(profile.created_at), "MMMM 'de' yyyy", { locale: ptBR })
    : "";

  return (
    <InternoLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold">{displayName}</h1>
                  <Badge variant={profile.ativo !== false ? "default" : "secondary"}>
                    {profile.ativo !== false ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {profile.email}
                  </span>
                  {memberSince && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Membro desde {memberSince}
                    </span>
                  )}
                </div>
              </div>
              {isAdmin && id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/interno/consultores")}
                >
                  Ver Todos
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon={<Briefcase className="h-4 w-4" />}
            label="Negociações Abertas"
            value={stats?.negociacoesAbertas || 0}
            subValue={formatCurrency(stats?.valorPipeline || 0)}
            subLabel="em pipeline"
            color="blue"
          />
          <StatCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Faturados (Mês)"
            value={stats?.faturadosMes || 0}
            subValue={formatCurrency(stats?.valorFaturadoMes || 0)}
            subLabel="no mês"
            color="green"
          />
          <StatCard
            icon={<Users className="h-4 w-4" />}
            label="Clientes Atribuídos"
            value={stats?.clientesAtribuidos || 0}
            color="purple"
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Taxa de Conversão"
            value={`${(stats?.taxaConversao || 0).toFixed(1)}%`}
            subValue={formatCurrency(stats?.ticketMedio || 0)}
            subLabel="ticket médio"
            color="orange"
          />
        </div>

        {/* Totals Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{stats?.totalNegociacoes || 0}</p>
                <p className="text-xs text-muted-foreground">Total de Negociações</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.faturadosTotal || 0}
                </p>
                <p className="text-xs text-muted-foreground">Faturados (Total)</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats?.valorFaturadoTotal || 0)}
                </p>
                <p className="text-xs text-muted-foreground">Valor Total Faturado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for detailed info */}
        <Tabs defaultValue="faturamento" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faturamento" className="text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 mr-1 hidden sm:inline" />
              Faturamento
            </TabsTrigger>
            <TabsTrigger value="historico" className="text-xs sm:text-sm">
              <Clock className="h-4 w-4 mr-1 hidden sm:inline" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="clientes" className="text-xs sm:text-sm">
              <Users className="h-4 w-4 mr-1 hidden sm:inline" />
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* Faturamento Tab */}
          <TabsContent value="faturamento">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Faturamento Mensal (6 meses)</CardTitle>
              </CardHeader>
              <CardContent>
                {faturamentoMensal.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={faturamentoMensal}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="mesLabel" className="text-xs" />
                        <YAxis
                          tickFormatter={(value) =>
                            `R$ ${(value / 1000).toFixed(0)}k`
                          }
                          className="text-xs"
                        />
                        <Tooltip
                          formatter={(value: number) => [
                            formatCurrency(value),
                            "Valor",
                          ]}
                          labelFormatter={(label) => `Mês: ${label}`}
                        />
                        <Bar
                          dataKey="valor"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Sem dados de faturamento
                  </div>
                )}
                {faturamentoMensal.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t">
                    {faturamentoMensal.map((mes) => (
                      <div key={mes.mes} className="text-center">
                        <p className="text-xs text-muted-foreground">{mes.mesLabel}</p>
                        <p className="text-sm font-medium">{mes.quantidade} vendas</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Historico Tab */}
          <TabsContent value="historico">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Últimas Negociações ({historico.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {historico.length > 0 ? (
                  <div className="space-y-2">
                    {historico.map((neg) => (
                      <div
                        key={neg.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/interno/negociacoes?id=${neg.id}`)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">
                              {neg.numero_negociacao}
                            </span>
                            <Badge
                              variant="outline"
                              style={{
                                borderColor:
                                  STATUS_COLORS[neg.status as StatusNegociacao],
                                color: STATUS_COLORS[neg.status as StatusNegociacao],
                              }}
                              className="text-[10px]"
                            >
                              {STATUS_LABELS[neg.status as StatusNegociacao]}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium truncate mt-0.5">
                            {neg.cliente?.nome_fantasia || neg.cliente?.razao_social}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Criada em{" "}
                            {format(parseISO(neg.created_at), "dd/MM/yyyy")}
                            {neg.data_fechamento &&
                              ` • Fechada em ${format(
                                parseISO(neg.data_fechamento),
                                "dd/MM/yyyy"
                              )}`}
                          </p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="text-sm font-semibold">
                            {formatCurrency(neg.valor_estimado || 0)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    Nenhuma negociação encontrada
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clientes Tab */}
          <TabsContent value="clientes">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Clientes Atribuídos ({clientes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {clientes.length > 0 ? (
                  <div className="space-y-2">
                    {clientes.map((cliente) => (
                      <div
                        key={cliente.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() =>
                          navigate(`/interno/clientes?id=${cliente.id}`)
                        }
                      >
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">
                            {cliente.nome_fantasia || cliente.razao_social}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
                            {cliente.telefone && (
                              <span className="flex items-center gap-0.5">
                                <Phone className="h-2.5 w-2.5" />
                                {cliente.telefone}
                              </span>
                            )}
                            {(cliente.cidade || cliente.estado) && (
                              <span className="flex items-center gap-0.5">
                                <MapPin className="h-2.5 w-2.5" />
                                {[cliente.cidade, cliente.estado]
                                  .filter(Boolean)
                                  .join(" - ")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    Nenhum cliente atribuído
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InternoLayout>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  subLabel?: string;
  color?: "blue" | "green" | "purple" | "orange";
}

function StatCard({ icon, label, value, subValue, subLabel, color = "blue" }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600",
    green: "bg-green-500/10 text-green-600",
    purple: "bg-purple-500/10 text-purple-600",
    orange: "bg-orange-500/10 text-orange-600",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-md ${colorClasses[color]}`}>{icon}</div>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-medium text-foreground">{subValue}</span>{" "}
            {subLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
