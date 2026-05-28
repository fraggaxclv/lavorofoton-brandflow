import { useMemo, useState } from "react";
import InternoLayout from "@/components/interno/InternoLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  Area, AreaChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowDownRight, ArrowUpRight, Download, Gauge, Globe, MousePointerClick,
  Search as SearchIcon, Smartphone, Sparkles, Target, TrendingUp, Users as UsersIcon,
  Zap, AlertTriangle, CheckCircle2, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RangeKey = "7d" | "30d" | "90d" | "custom";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "Últimos 7 dias" },
  { key: "30d", label: "Últimos 30 dias" },
  { key: "90d", label: "Últimos 90 dias" },
  { key: "custom", label: "Personalizado" },
];

// ============ MOCK DATA (base = últimos 30 dias) ============
const baseKpis = [
  { label: "Sessões", base: 24781, delta: { "7d": 8.1, "30d": 12.4, "90d": 18.2, custom: 10.5 }, icon: UsersIcon, hint: "vs período anterior" },
  { label: "Usuários", base: 18243, delta: { "7d": 5.4, "30d": 9.1, "90d": 14.6, custom: 7.8 }, icon: Globe, hint: "vs período anterior" },
  { label: "Conversões", base: 412, delta: { "7d": -1.2, "30d": -3.2, "90d": 4.7, custom: 0.5 }, icon: Target, hint: "leads WhatsApp + form" },
  { label: "Custo por Lead", base: 38.72, delta: { "7d": -4.1, "30d": -8.6, "90d": -12.3, custom: -6.0 }, icon: Sparkles, hint: "Meta Ads", currency: true },
] as const;

const baseChannelData = [
  { name: "Orgânico", base: 9820, color: "hsl(142 76% 45%)" },
  { name: "Pago", base: 7140, color: "hsl(38 92% 55%)" },
  { name: "Direto", base: 4220, color: "hsl(217 91% 60%)" },
  { name: "Social", base: 2310, color: "hsl(280 80% 65%)" },
  { name: "Referral", base: 1291, color: "hsl(0 0% 60%)" },
];

const baseLandingPages = [
  { url: "/", sessions: 8120, users: 6420, engRate: 62.1, conv: 142 },
  { url: "/calculadora", sessions: 4310, users: 3620, engRate: 71.4, conv: 96 },
  { url: "/modelos/aumark-1217", sessions: 2980, users: 2410, engRate: 58.8, conv: 41 },
  { url: "/comparativo-aumark-1217", sessions: 1820, users: 1510, engRate: 64.2, conv: 33 },
  { url: "/modelos/ewonder", sessions: 1410, users: 1190, engRate: 55.7, conv: 22 },
  { url: "/modelos/aumark-s315", sessions: 1190, users: 990, engRate: 60.1, conv: 18 },
];

const baseGscKpis = [
  { label: "Cliques", base: 6412, delta: { "7d": 9.4, "30d": 14.2, "90d": 22.1, custom: 12.0 }, format: "int" as const },
  { label: "Impressões", base: 184330, delta: { "7d": 15.2, "30d": 21.6, "90d": 28.4, custom: 18.0 }, format: "int" as const },
  { label: "CTR médio", base: 3.48, delta: { "7d": -0.6, "30d": -1.1, "90d": 0.8, custom: -0.3 }, format: "pct" as const },
  { label: "Posição média", base: 12.4, delta: { "7d": 1.1, "30d": 2.3, "90d": 3.4, custom: 1.5 }, format: "dec" as const, invert: true },
];

const baseGscQueries = [
  { query: "foton aumark 1217", clicks: 612, impressions: 8240, ctr: 7.4, position: 4.1 },
  { query: "foton lavoro", clicks: 488, impressions: 1320, ctr: 36.9, position: 1.2 },
  { query: "caminhão foton mg", clicks: 320, impressions: 5610, ctr: 5.7, position: 6.8 },
  { query: "ewonder elétrico", clicks: 244, impressions: 4120, ctr: 5.9, position: 9.2 },
  { query: "aumark s315 preço", clicks: 198, impressions: 6810, ctr: 2.9, position: 14.3 },
  { query: "tco caminhão", clicks: 161, impressions: 9410, ctr: 1.7, position: 22.6 },
];

const baseMetaCampaigns = [
  { name: "Aumark 1217 — MG", spend: 4820, impressions: 184230, clicks: 3240, ctr: 1.76, cpc: 1.49, leads: 84, cpl: 57.38 },
  { name: "eWonder — Frotas", spend: 3210, impressions: 121440, clicks: 2110, ctr: 1.74, cpc: 1.52, leads: 61, cpl: 52.62 },
  { name: "TCO Calculadora — Geral", spend: 2640, impressions: 98210, clicks: 1980, ctr: 2.02, cpc: 1.33, leads: 92, cpl: 28.70 },
  { name: "Remarketing — Modelos", spend: 1120, impressions: 64210, clicks: 1410, ctr: 2.20, cpc: 0.79, leads: 38, cpl: 29.47 },
];

// Scale factor (relative to base 30d window) per range
const RANGE_SCALE: Record<RangeKey, { factor: number; days: number; label: string }> = {
  "7d": { factor: 7 / 30, days: 7, label: "7 dias" },
  "30d": { factor: 1, days: 30, label: "30 dias" },
  "90d": { factor: 3, days: 90, label: "90 dias" },
  custom: { factor: 1.4, days: 45, label: "personalizado" },
};

function fmtInt(n: number) {
  return Math.round(n).toLocaleString("pt-BR");
}
function fmtCurrency(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


// ============ HELPERS ============
function Delta({ value, invert }: { value: number; invert?: boolean }) {
  const positive = invert ? value < 0 : value > 0;
  const Icon = value >= 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        positive ? "text-emerald-500" : "text-rose-500",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

function exportCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => {
        const v = String(r[h] ?? "");
        return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
      }).join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SectionHeader({
  eyebrow, title, description, action,
}: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 mb-1.5">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// ============ PAGE ============
export default function InternoTrafego() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [auditUrl, setAuditUrl] = useState("https://lavorofoton.com.br");
  const [auditing, setAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<null | {
    performance: number; seo: number; accessibility: number; bestPractices: number;
    lcp: number; inp: number; cls: number;
    fixes: { severity: "high" | "medium" | "low"; title: string; impact: string }[];
  }>(null);

  const totalChannel = useMemo(
    () => channelData.reduce((s, c) => s + c.value, 0),
    [],
  );

  function runAudit() {
    setAuditing(true);
    setAuditResult(null);
    setTimeout(() => {
      setAuditResult({
        performance: 78, seo: 94, accessibility: 88, bestPractices: 92,
        lcp: 2.4, inp: 180, cls: 0.07,
        fixes: [
          { severity: "high", title: "Reduzir tamanho do hero image (-1.2s LCP)", impact: "Performance +12 pts" },
          { severity: "high", title: "Adicionar dimensões explícitas em imagens", impact: "CLS -0.05" },
          { severity: "medium", title: "Diferir JavaScript não-crítico", impact: "INP -60ms" },
          { severity: "medium", title: "Pré-carregar fontes web (font-display: swap)", impact: "FCP -0.3s" },
          { severity: "low", title: "Comprimir imagens com formato WebP/AVIF", impact: "Peso -42%" },
        ],
      });
      setAuditing(false);
      toast.success("Auditoria concluída (mock)");
    }, 1200);
  }

  return (
    <InternoLayout>
      <div className="space-y-10 max-w-[1400px] mx-auto">
        {/* HERO HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary/80 font-medium mb-2">
              Lavoro Foton
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Central de Tráfego
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl">
              Inteligência consolidada de site, busca orgânica e mídia paga.
              Decisões claras, dados verificados, sem ruído.
            </p>
          </div>

          {/* Range picker */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 backdrop-blur p-1">
            {RANGES.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors",
                  range === r.key
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </header>

        {/* KPI CARDS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k) => (
              <Card
                key={k.label}
                className="relative overflow-hidden border-border/60 bg-card/60 backdrop-blur p-5 hover:border-border transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <k.icon className="h-4.5 w-4.5 text-foreground" />
                  </div>
                  <Delta value={k.delta} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
                <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                  {k.value}
                </p>
                <p className="text-[11px] text-muted-foreground/70 mt-2">{k.hint}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* TRAFFIC TREND + CHANNELS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-6 border-border/60 bg-card/60 backdrop-blur">
            <SectionHeader
              eyebrow="Google Analytics 4"
              title="Tráfego ao longo do tempo"
              description="Sessões e usuários únicos no período selecionado."
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <ReTooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="sessoes" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" name="Sessões" />
                  <Area type="monotone" dataKey="usuarios" stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} fill="url(#g2)" name="Usuários" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 border-border/60 bg-card/60 backdrop-blur">
            <SectionHeader
              eyebrow="Distribuição"
              title="Canais de aquisição"
            />
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {channelData.map((c) => <Cell key={c.name} fill={c.color} />)}
                  </Pie>
                  <ReTooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 mt-3">
              {channelData.map((c) => (
                <li key={c.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-foreground">{c.name}</span>
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {((c.value / totalChannel) * 100).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* LANDING PAGES */}
        <section>
          <SectionHeader
            eyebrow="GA4"
            title="Top landing pages"
            description="Páginas de entrada com maior volume e engajamento."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportCsv("landing-pages.csv", landingPages)}
                className="gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
            }
          />
          <Card className="border-border/60 bg-card/60 backdrop-blur overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Sessões</TableHead>
                  <TableHead className="text-right">Usuários</TableHead>
                  <TableHead className="text-right">Engaj.</TableHead>
                  <TableHead className="text-right">Conv.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {landingPages.map((p) => (
                  <TableRow key={p.url}>
                    <TableCell className="font-mono text-xs text-foreground">{p.url}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.sessions.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.users.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{p.engRate.toFixed(1)}%</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{p.conv}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* SEARCH CONSOLE */}
        <section>
          <SectionHeader
            eyebrow="Google Search Console"
            title="Performance na busca"
            description="Cliques, impressões e posicionamento orgânico."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {gscKpis.map((k) => (
              <Card key={k.label} className="p-5 border-border/60 bg-card/60 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <Delta value={k.delta} invert={k.invert} />
                </div>
                <p className="text-2xl font-semibold tracking-tight tabular-nums">{k.value}</p>
              </Card>
            ))}
          </div>

          <Card className="border-border/60 bg-card/60 backdrop-blur overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <SearchIcon className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium text-sm">Top queries</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => exportCsv("gsc-queries.csv", gscQueries)}
                className="gap-1.5 h-8"
              >
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Consulta</TableHead>
                  <TableHead className="text-right">Cliques</TableHead>
                  <TableHead className="text-right">Impr.</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Posição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gscQueries.map((q) => (
                  <TableRow key={q.query}>
                    <TableCell className="text-foreground">{q.query}</TableCell>
                    <TableCell className="text-right tabular-nums">{q.clicks}</TableCell>
                    <TableCell className="text-right tabular-nums">{q.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{q.ctr.toFixed(1)}%</TableCell>
                    <TableCell className="text-right tabular-nums">{q.position.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* META ADS */}
        <section>
          <SectionHeader
            eyebrow="Meta Ads"
            title="Performance de campanhas"
            description="Investimento, alcance e custo por lead por campanha ativa."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportCsv("meta-campaigns.csv", metaCampaigns)}
                className="gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> CSV
              </Button>
            }
          />
          <Card className="border-border/60 bg-card/60 backdrop-blur overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Campanha</TableHead>
                  <TableHead className="text-right">Investido</TableHead>
                  <TableHead className="text-right">Impr.</TableHead>
                  <TableHead className="text-right">Cliques</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">CPC</TableHead>
                  <TableHead className="text-right">Leads</TableHead>
                  <TableHead className="text-right">CPL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metaCampaigns.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                    <TableCell className="text-right tabular-nums">R$ {c.spend.toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.impressions.toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.clicks.toLocaleString("pt-BR")}</TableCell>
                    <TableCell className="text-right tabular-nums">{c.ctr.toFixed(2)}%</TableCell>
                    <TableCell className="text-right tabular-nums">R$ {c.cpc.toFixed(2)}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{c.leads}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">R$ {c.cpl.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* TECHNICAL AUDIT */}
        <section>
          <SectionHeader
            eyebrow="PageSpeed Insights"
            title="Auditoria técnica sob demanda"
            description="Diagnóstico instantâneo de performance, SEO e Core Web Vitals."
          />
          <Card className="p-6 border-border/60 bg-card/60 backdrop-blur">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                placeholder="https://exemplo.com.br/pagina"
                className="flex-1 h-11"
              />
              <Button onClick={runAudit} disabled={auditing} className="h-11 px-6 gap-2">
                <Zap className="h-4 w-4" />
                {auditing ? "Analisando..." : "Auditar URL"}
              </Button>
            </div>

            {auditing && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28 rounded-lg" />
                ))}
              </div>
            )}

            {!auditing && !auditResult && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                <Gauge className="h-10 w-10 mx-auto mb-3 opacity-40" />
                Informe uma URL e clique em <span className="text-foreground font-medium">Auditar</span>
                para receber um diagnóstico completo.
              </div>
            )}

            {auditResult && (
              <div className="space-y-6">
                {/* Scores */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Performance", value: auditResult.performance },
                    { label: "SEO", value: auditResult.seo },
                    { label: "Acessibilidade", value: auditResult.accessibility },
                    { label: "Boas práticas", value: auditResult.bestPractices },
                  ].map((s) => {
                    const color = s.value >= 90 ? "text-emerald-500" : s.value >= 50 ? "text-amber-500" : "text-rose-500";
                    return (
                      <div key={s.label} className="p-4 rounded-lg border border-border/60 bg-background/40">
                        <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
                        <p className={cn("text-4xl font-semibold tabular-nums", color)}>{s.value}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Core Web Vitals */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-border/60 bg-background/40">
                    <p className="text-[11px] text-muted-foreground mb-1">LCP</p>
                    <p className="text-2xl font-semibold tabular-nums">{auditResult.lcp}s</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">Largest Contentful Paint</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/60 bg-background/40">
                    <p className="text-[11px] text-muted-foreground mb-1">INP</p>
                    <p className="text-2xl font-semibold tabular-nums">{auditResult.inp}ms</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">Interaction to Next Paint</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border/60 bg-background/40">
                    <p className="text-[11px] text-muted-foreground mb-1">CLS</p>
                    <p className="text-2xl font-semibold tabular-nums">{auditResult.cls}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">Cumulative Layout Shift</p>
                  </div>
                </div>

                {/* Fixes */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    O que corrigir primeiro
                  </h4>
                  <ul className="space-y-2">
                    {auditResult.fixes.map((f) => {
                      const sevColor = f.severity === "high"
                        ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        : f.severity === "medium"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                      return (
                        <li key={f.title} className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-background/40">
                          <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider border", sevColor)}>
                            {f.severity === "high" ? "Alta" : f.severity === "medium" ? "Média" : "Baixa"}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{f.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{f.impact}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground/60 pt-4 pb-2">
          Dados mockados · Próximo passo: conectar GA4, Search Console, Meta Ads e PageSpeed.
        </p>
      </div>
    </InternoLayout>
  );
}
