import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import InternoLayout from "@/components/interno/InternoLayout";
import ExportButton from "@/components/interno/ExportButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  AlertTriangle,
  CreditCard,
  UserX,
  DollarSign,
  Clock,
  Truck,
  HelpCircle,
  TrendingDown,
} from "lucide-react";
import { formatCurrency } from "@/types/interno";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { exportPerdasToCSV } from "@/lib/exportUtils";
import { exportPerdasPDF } from "@/lib/pdfExport";

const MOTIVO_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  "Sem Crédito": { label: "Sem Crédito", color: "#f97316", icon: CreditCard },
  "Desistência": { label: "Desistência", color: "#ef4444", icon: UserX },
  "Preço / Condição": { label: "Preço / Condição", color: "#eab308", icon: DollarSign },
  "Prazo de Entrega": { label: "Prazo de Entrega", color: "#3b82f6", icon: Clock },
  "Comprou na Concorrência": { label: "Concorrência", color: "#8b5cf6", icon: Truck },
  "Outro Motivo": { label: "Outro", color: "#6b7280", icon: HelpCircle },
};

function parseMotivo(motivoPerda: string | null) {
  if (!motivoPerda) return { categoria: "Não informado", detalhes: "", concorrente: "" };
  
  const match = motivoPerda.match(/^\[([^\]]+)\]/);
  const categoria = match ? match[1] : "Outro Motivo";
  
  let concorrente = "";
  const marcaMatch = motivoPerda.match(/Marca:\s*([^|]+)/);
  if (marcaMatch) concorrente = marcaMatch[1].trim();
  
  const detalhes = motivoPerda.replace(/^\[[^\]]+\]\s*-?\s*/, "").trim();
  
  return { categoria, detalhes, concorrente };
}

export default function InternoRelatorioPerdas() {
  const { isAdmin, user } = useInternoAuth();

  const { data: negociacoesPerdidas, isLoading } = useQuery({
    queryKey: ["negociacoes-perdidas", isAdmin, user?.id],
    queryFn: async () => {
      let query = supabase
        .from("negociacoes")
        .select(`
          *,
          cliente:clientes!negociacoes_cliente_id_fkey(nome_fantasia, razao_social),
          owner:profiles!negociacoes_owner_user_id_profiles_fkey(nome_exibicao, full_name, email)
        `)
        .eq("status", "perdido")
        .order("updated_at", { ascending: false });

      if (!isAdmin && user?.id) {
        query = query.eq("owner_user_id", user.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const analytics = useMemo(() => {
    if (!negociacoesPerdidas) return null;

    const porCategoria: Record<string, { count: number; valor: number }> = {};
    const porConcorrente: Record<string, number> = {};
    const porMes: Record<string, number> = {};
    const porConsultor: Record<string, { count: number; nome: string }> = {};

    negociacoesPerdidas.forEach((neg) => {
      const { categoria, concorrente } = parseMotivo(neg.motivo_perda);
      
      if (!porCategoria[categoria]) porCategoria[categoria] = { count: 0, valor: 0 };
      porCategoria[categoria].count++;
      porCategoria[categoria].valor += neg.valor_estimado || 0;

      if (concorrente) {
        porConcorrente[concorrente] = (porConcorrente[concorrente] || 0) + 1;
      }

      const mes = format(new Date(neg.updated_at), "yyyy-MM");
      porMes[mes] = (porMes[mes] || 0) + 1;

      const consultorNome = neg.owner?.nome_exibicao || neg.owner?.full_name || neg.owner?.email || "—";
      if (!porConsultor[neg.owner_user_id]) porConsultor[neg.owner_user_id] = { count: 0, nome: consultorNome };
      porConsultor[neg.owner_user_id].count++;
    });

    const pieData = Object.entries(porCategoria)
      .map(([name, data]) => ({
        name: MOTIVO_CONFIG[name]?.label || name,
        value: data.count,
        valor: data.valor,
        color: MOTIVO_CONFIG[name]?.color || "#6b7280",
      }))
      .sort((a, b) => b.value - a.value);

    const concorrenteData = Object.entries(porConcorrente)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const tendenciaData = Object.entries(porMes)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([mes, count]) => ({
        mes: format(new Date(mes + "-01"), "MMM/yy", { locale: ptBR }),
        perdas: count,
      }));

    const consultorData = Object.values(porConsultor)
      .sort((a, b) => b.count - a.count);

    const valorTotalPerdido = negociacoesPerdidas.reduce((acc, n) => acc + (n.valor_estimado || 0), 0);

    return { pieData, concorrenteData, tendenciaData, consultorData, valorTotalPerdido };
  }, [negociacoesPerdidas]);

  const perdasData = useMemo(() => {
    if (!negociacoesPerdidas) return [];
    return negociacoesPerdidas.map(n => ({
      numero: n.numero_negociacao,
      cliente: n.cliente?.nome_fantasia || n.cliente?.razao_social || "",
      motivo_perda: n.motivo_perda || "",
      valor: n.valor_estimado || 0,
      consultor: n.owner?.nome_exibicao || n.owner?.full_name || n.owner?.email || "",
      data: n.updated_at,
      produto: n.produto_principal || "",
      motivo: n.motivo_perda || "",
    }));
  }, [negociacoesPerdidas]);

  const handleExport = () => exportPerdasToCSV(perdasData);
  const handleExportPDF = () => exportPerdasPDF(perdasData);

  return (
    <InternoLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <TrendingDown className="h-6 w-6 text-destructive" />
              Relatório de Perdas
            </h1>
            <p className="text-sm text-muted-foreground">
              Análise dos motivos de perda e inteligência competitiva
            </p>
          </div>
          <ExportButton onExport={handleExport} onExportPDF={handleExportPDF} label="Exportar Perdas" disabled={isLoading} />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total de Perdas</p>
              {isLoading ? <Skeleton className="h-7 w-16 mt-1" /> : (
                <p className="text-2xl font-bold text-destructive">{negociacoesPerdidas?.length || 0}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Valor Perdido</p>
              {isLoading ? <Skeleton className="h-7 w-24 mt-1" /> : (
                <p className="text-lg font-bold text-destructive">{formatCurrency(analytics?.valorTotalPerdido || 0)}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Principal Motivo</p>
              {isLoading ? <Skeleton className="h-7 w-24 mt-1" /> : (
                <p className="text-sm font-bold mt-1">{analytics?.pieData[0]?.name || "—"}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Principal Concorrente</p>
              {isLoading ? <Skeleton className="h-7 w-24 mt-1" /> : (
                <p className="text-sm font-bold mt-1">{analytics?.concorrenteData[0]?.name || "—"}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Motivos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Motivos de Perda
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : analytics?.pieData && analytics.pieData.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={analytics.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {analytics.pieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [`${value} negociações`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 min-w-[140px]">
                    {analytics.pieData.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="truncate">{item.name}</span>
                        <span className="font-bold ml-auto">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">Nenhuma perda registrada</p>
              )}
            </CardContent>
          </Card>

          {/* Bar Chart - Concorrentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4 text-purple-600" />
                Concorrentes Mais Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : analytics?.concorrenteData && analytics.concorrenteData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={analytics.concorrenteData} layout="vertical">
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v: number) => [`${v} vendas`, "Perdas"]} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center py-8 text-muted-foreground">Nenhum concorrente identificado</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tendência mensal */}
        {analytics?.tendenciaData && analytics.tendenciaData.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                Tendência de Perdas (Últimos 6 meses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analytics.tendenciaData}>
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(v: number) => [`${v}`, "Perdas"]} />
                  <Bar dataKey="perdas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Tabela detalhada */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detalhamento das Perdas</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : negociacoesPerdidas && negociacoesPerdidas.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Negociação</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Consultor</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {negociacoesPerdidas.map((neg) => {
                      const { categoria } = parseMotivo(neg.motivo_perda);
                      const config = MOTIVO_CONFIG[categoria];
                      return (
                        <TableRow key={neg.id}>
                          <TableCell className="font-mono text-xs">{neg.numero_negociacao}</TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {neg.cliente?.nome_fantasia || neg.cliente?.razao_social || "—"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-[10px]"
                              style={{
                                backgroundColor: `${config?.color || "#6b7280"}15`,
                                color: config?.color || "#6b7280",
                                borderColor: config?.color || "#6b7280",
                              }}
                            >
                              {config?.label || categoria}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatCurrency(neg.valor_estimado || 0)}</TableCell>
                          <TableCell className="text-sm">
                            {neg.owner?.nome_exibicao || neg.owner?.full_name || "—"}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {format(new Date(neg.updated_at), "dd/MM/yy")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">Nenhuma negociação perdida</p>
            )}
          </CardContent>
        </Card>
      </div>
    </InternoLayout>
  );
}
