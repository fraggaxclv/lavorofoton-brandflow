import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, RefreshCw, MessageCircle, Search, Calculator, FileText, Receipt } from "lucide-react";
import { toast } from "sonner";

type Periodo = "7" | "30" | "60" | "90" | "all";

function fmtDate(s?: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}
function fmtBRL(n?: number | null) {
  if (n == null) return "—";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
function wa(phone?: string | null, msg?: string) {
  const d = (phone || "").replace(/\D/g, "");
  if (!d) return null;
  const num = d.length === 11 || d.length === 10 ? `55${d}` : d;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg || "Olá! Aqui é da Lavoro Foton.")}`;
}
function toCsv(rows: any[], headers: { key: string; label: string }[], filename: string) {
  if (!rows.length) return toast.error("Sem dados para exportar");
  const esc = (v: any) => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n;]/.test(s) ? `"${s}"` : s;
  };
  const csv = [
    headers.map((h) => h.label).join(";"),
    ...rows.map((r) => headers.map((h) => esc(r[h.key])).join(";")),
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function startDateFor(p: Periodo) {
  if (p === "all") return null;
  const d = new Date();
  d.setDate(d.getDate() - parseInt(p, 10));
  return d.toISOString();
}

/* ---------------- SIMULAÇÕES TCO ---------------- */
function TabSimulacoes({ periodo }: { periodo: Periodo }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("simulacoes_tco")
      .select("id, simulation_code, nome, email, telefone, empresa, modelo_foton, modelo_concorrente, resultados_simulacao, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    const since = startDateFor(periodo);
    if (since) q = q.gte("created_at", since);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [periodo]);

  const filtered = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) =>
      [r.nome, r.email, r.telefone, r.empresa, r.modelo_foton, r.simulation_code]
        .some((v) => (v || "").toString().toLowerCase().includes(t))
    );
  }, [rows, busca]);

  const economiaDe = (r: any) => {
    const x = r.resultados_simulacao || {};
    return x.economiaAnual ?? x.economia_anual ?? x.economiaLiquida ?? x.economia_total ?? null;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar nome, e-mail, empresa, modelo..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => toCsv(
            filtered.map((r) => ({
              data: fmtDate(r.created_at), codigo: r.simulation_code, nome: r.nome, email: r.email,
              telefone: r.telefone, empresa: r.empresa || "", modelo: r.modelo_foton || "",
              concorrente: r.modelo_concorrente || "", economia_anual: economiaDe(r) ?? "",
            })),
            [
              { key: "data", label: "Data" }, { key: "codigo", label: "Código" },
              { key: "nome", label: "Nome" }, { key: "email", label: "E-mail" },
              { key: "telefone", label: "Telefone" }, { key: "empresa", label: "Empresa" },
              { key: "modelo", label: "Modelo Foton" }, { key: "concorrente", label: "Concorrente" },
              { key: "economia_anual", label: "Economia Anual (R$)" },
            ],
            `simulacoes-tco-${new Date().toISOString().slice(0,10)}.csv`
          )}>
            <Download className="h-4 w-4 mr-1" />CSV
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase">
              <tr>
                <th className="text-left p-3">Data</th>
                <th className="text-left p-3">Lead</th>
                <th className="text-left p-3">Empresa</th>
                <th className="text-left p-3">Contato</th>
                <th className="text-left p-3">Modelo</th>
                <th className="text-right p-3">Economia/ano</th>
                <th className="text-right p-3">Ação</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Carregando…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Nenhuma simulação no período</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-muted/30">
                  <td className="p-3 whitespace-nowrap">{fmtDate(r.created_at)}</td>
                  <td className="p-3">
                    <div className="font-medium">{r.nome}</div>
                    <div className="text-xs text-muted-foreground">{r.simulation_code}</div>
                  </td>
                  <td className="p-3">{r.empresa || "—"}</td>
                  <td className="p-3">
                    <div>{r.email}</div>
                    <div className="text-xs text-muted-foreground">{r.telefone}</div>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary">{r.modelo_foton || "—"}</Badge>
                    {r.modelo_concorrente && <div className="text-xs text-muted-foreground mt-1">vs {r.modelo_concorrente}</div>}
                  </td>
                  <td className="p-3 text-right font-semibold">{fmtBRL(economiaDe(r))}</td>
                  <td className="p-3 text-right">
                    {wa(r.telefone, `Olá ${r.nome?.split(" ")[0] || ""}, sou da Lavoro Foton e vi sua simulação ${r.simulation_code}.`) && (
                      <a href={wa(r.telefone, `Olá ${r.nome?.split(" ")[0] || ""}, sou da Lavoro Foton e vi sua simulação ${r.simulation_code}.`)!} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="outline"><MessageCircle className="h-4 w-4 mr-1" />WhatsApp</Button>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="text-xs text-muted-foreground">{filtered.length} registro(s)</p>
    </div>
  );
}

/* ---------------- PROPOSTAS ---------------- */
function TabPropostas({ periodo }: { periodo: Periodo }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [origem, setOrigem] = useState<"todas" | "site" | "interno">("todas");

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("propostas_comerciais")
      .select("id, numero_proposta, data, nome_vendedor, nome_cliente, cnpj, cidade, estado, valor_total, faturamento_tipo, importado, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    const since = startDateFor(periodo);
    if (since) q = q.gte("created_at", since);
    if (origem === "site") q = q.eq("importado", true);
    if (origem === "interno") q = q.or("importado.is.null,importado.eq.false");
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [periodo, origem]);

  const filtered = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) =>
      [r.nome_cliente, r.cnpj, r.numero_proposta, r.nome_vendedor, r.cidade]
        .some((v) => (v || "").toString().toLowerCase().includes(t))
    );
  }, [rows, busca]);

  const total = filtered.reduce((s, r) => s + Number(r.valor_total || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente, CNPJ, nº proposta..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <div className="flex gap-2 items-center">
          <Select value={origem} onValueChange={(v: any) => setOrigem(v)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas origens</SelectItem>
              <SelectItem value="interno">CRM interno</SelectItem>
              <SelectItem value="site">Vindas do site</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => toCsv(
            filtered.map((r) => ({
              data: fmtDate(r.created_at), numero: r.numero_proposta, cliente: r.nome_cliente,
              cnpj: r.cnpj, cidade: r.cidade, estado: r.estado, vendedor: r.nome_vendedor,
              faturamento: r.faturamento_tipo, valor: r.valor_total, origem: r.importado ? "Site" : "Interno",
            })),
            [
              { key: "data", label: "Data" }, { key: "numero", label: "Nº Proposta" },
              { key: "cliente", label: "Cliente" }, { key: "cnpj", label: "CNPJ" },
              { key: "cidade", label: "Cidade" }, { key: "estado", label: "UF" },
              { key: "vendedor", label: "Vendedor" }, { key: "faturamento", label: "Faturamento" },
              { key: "valor", label: "Valor (R$)" }, { key: "origem", label: "Origem" },
            ],
            `propostas-${new Date().toISOString().slice(0,10)}.csv`
          )}>
            <Download className="h-4 w-4 mr-1" />CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card className="p-4"><div className="text-xs text-muted-foreground">Propostas no período</div><div className="text-2xl font-bold mt-1">{filtered.length}</div></Card>
        <Card className="p-4"><div className="text-xs text-muted-foreground">Valor total</div><div className="text-2xl font-bold mt-1">{fmtBRL(total)}</div></Card>
        <Card className="p-4"><div className="text-xs text-muted-foreground">Ticket médio</div><div className="text-2xl font-bold mt-1">{fmtBRL(filtered.length ? total / filtered.length : 0)}</div></Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase">
              <tr>
                <th className="text-left p-3">Data</th>
                <th className="text-left p-3">Nº</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Cidade/UF</th>
                <th className="text-left p-3">Vendedor</th>
                <th className="text-left p-3">Origem</th>
                <th className="text-right p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Carregando…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Nenhuma proposta no período</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-muted/30">
                  <td className="p-3 whitespace-nowrap">{fmtDate(r.created_at)}</td>
                  <td className="p-3 font-mono text-xs">{r.numero_proposta}</td>
                  <td className="p-3">
                    <div className="font-medium">{r.nome_cliente}</div>
                    <div className="text-xs text-muted-foreground">{r.cnpj}</div>
                  </td>
                  <td className="p-3">{[r.cidade, r.estado].filter(Boolean).join("/") || "—"}</td>
                  <td className="p-3">{r.nome_vendedor || "—"}</td>
                  <td className="p-3">
                    <Badge variant={r.importado ? "default" : "secondary"}>{r.importado ? "Site" : "Interno"}</Badge>
                  </td>
                  <td className="p-3 text-right font-semibold">{fmtBRL(Number(r.valor_total || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- PEDIDOS DE FATURAMENTO ---------------- */
function TabPedidos({ periodo }: { periodo: Periodo }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("pedidos_faturamento")
      .select("id, numero_pedido, data, nome_vendedor, nome_cliente, cnpj, cidade, estado, telefone_cliente, email_responsavel, valor_total_produtos, faturamento_tipo, financiamento_forma, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    const since = startDateFor(periodo);
    if (since) q = q.gte("created_at", since);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [periodo]);

  const filtered = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) =>
      [r.nome_cliente, r.cnpj, r.numero_pedido, r.nome_vendedor, r.cidade, r.email_responsavel]
        .some((v) => (v || "").toString().toLowerCase().includes(t))
    );
  }, [rows, busca]);

  const total = filtered.reduce((s, r) => s + Number(r.valor_total_produtos || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar cliente, CNPJ, nº pedido..." value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={() => toCsv(
            filtered.map((r) => ({
              data: fmtDate(r.created_at), numero: r.numero_pedido, cliente: r.nome_cliente,
              cnpj: r.cnpj, cidade: r.cidade, estado: r.estado, vendedor: r.nome_vendedor,
              telefone: r.telefone_cliente, email: r.email_responsavel,
              faturamento: r.faturamento_tipo, financiamento: r.financiamento_forma,
              valor: r.valor_total_produtos,
            })),
            [
              { key: "data", label: "Data" }, { key: "numero", label: "Nº Pedido" },
              { key: "cliente", label: "Cliente" }, { key: "cnpj", label: "CNPJ" },
              { key: "cidade", label: "Cidade" }, { key: "estado", label: "UF" },
              { key: "vendedor", label: "Vendedor" }, { key: "telefone", label: "Telefone" },
              { key: "email", label: "E-mail" }, { key: "faturamento", label: "Faturamento" },
              { key: "financiamento", label: "Financiamento" }, { key: "valor", label: "Valor (R$)" },
            ],
            `pedidos-faturamento-${new Date().toISOString().slice(0,10)}.csv`
          )}>
            <Download className="h-4 w-4 mr-1" />CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card className="p-4"><div className="text-xs text-muted-foreground">Pedidos no período</div><div className="text-2xl font-bold mt-1">{filtered.length}</div></Card>
        <Card className="p-4"><div className="text-xs text-muted-foreground">Faturamento total</div><div className="text-2xl font-bold mt-1">{fmtBRL(total)}</div></Card>
        <Card className="p-4"><div className="text-xs text-muted-foreground">Ticket médio</div><div className="text-2xl font-bold mt-1">{fmtBRL(filtered.length ? total / filtered.length : 0)}</div></Card>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase">
              <tr>
                <th className="text-left p-3">Data</th>
                <th className="text-left p-3">Nº</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Cidade/UF</th>
                <th className="text-left p-3">Vendedor</th>
                <th className="text-left p-3">Financiamento</th>
                <th className="text-right p-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Carregando…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Nenhum pedido no período</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.id} className="border-t hover:bg-muted/30">
                  <td className="p-3 whitespace-nowrap">{fmtDate(r.created_at)}</td>
                  <td className="p-3 font-mono text-xs">{r.numero_pedido}</td>
                  <td className="p-3">
                    <div className="font-medium">{r.nome_cliente}</div>
                    <div className="text-xs text-muted-foreground">{r.cnpj}</div>
                  </td>
                  <td className="p-3">{[r.cidade, r.estado].filter(Boolean).join("/") || "—"}</td>
                  <td className="p-3">{r.nome_vendedor || "—"}</td>
                  <td className="p-3 text-xs">{r.financiamento_forma || "—"}</td>
                  <td className="p-3 text-right font-semibold">{fmtBRL(Number(r.valor_total_produtos || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function InternoRelatoriosLeads() {
  const [periodo, setPeriodo] = useState<Periodo>("30");
  const [tab, setTab] = useState("simulacoes");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Relatórios de Leads</h1>
          <p className="text-sm text-muted-foreground">Simulações TCO, propostas comerciais e pedidos de faturamento</p>
        </div>
        <Select value={periodo} onValueChange={(v: Periodo) => setPeriodo(v)}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Últimos 7 dias</SelectItem>
            <SelectItem value="30">Últimos 30 dias</SelectItem>
            <SelectItem value="60">Últimos 60 dias</SelectItem>
            <SelectItem value="90">Últimos 90 dias</SelectItem>
            <SelectItem value="all">Tudo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="simulacoes"><Calculator className="h-4 w-4 mr-1" />Calculadora TCO</TabsTrigger>
          <TabsTrigger value="propostas"><FileText className="h-4 w-4 mr-1" />Propostas</TabsTrigger>
          <TabsTrigger value="pedidos"><Receipt className="h-4 w-4 mr-1" />Pedidos Faturamento</TabsTrigger>
        </TabsList>
        <TabsContent value="simulacoes" className="mt-4"><TabSimulacoes periodo={periodo} /></TabsContent>
        <TabsContent value="propostas" className="mt-4"><TabPropostas periodo={periodo} /></TabsContent>
        <TabsContent value="pedidos" className="mt-4"><TabPedidos periodo={periodo} /></TabsContent>
      </Tabs>
    </div>
  );
}
