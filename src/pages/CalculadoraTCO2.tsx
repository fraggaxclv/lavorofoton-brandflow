import React, { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, ReferenceLine
} from "recharts";
import {
  ChevronDown, ChevronUp, HelpCircle, Moon, FileText, Leaf, Battery,
  Zap, ShieldCheck, Clock, Truck, Wind, TrendingUp, Droplets, Wrench, Volume2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ════════════════════════════════════════════════════════
   BRAND TOKENS — Consulting-grade palette
   ════════════════════════════════════════════════════════ */
const C = {
  brand: "#003B73",
  brandLight: "#EFF6FF",
  accent: "#F28C28",
  green: "#0D7C5F",
  greenBg: "#D1FAE5",
  greenText: "#065F46",
  red: "#C0392B",
  redBg: "#FEE2E2",
  redText: "#991B1B",
  text1: "#1A1A2E",
  text2: "#6B7280",
  border: "#E5E7EB",
  cardBg: "#F9FAFB",
  white: "#FFFFFF",
  bg: "#FAFAFA",
};

/* ═══ Formatters ═══ */
const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmt2 = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtShort = (v: number) => {
  if (Math.abs(v) >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}mil`;
  return fmt(v);
};
const fmtPct = (v: number) => `${v.toFixed(1)}%`;

/* ═══ Profiles & Energy sources ═══ */
const PROFILES: Record<string, { dieselKmL: number; elecKwhKm: number }> = {
  Urbano: { dieselKmL: 5.0, elecKwhKm: 0.55 },
  Misto: { dieselKmL: 6.0, elecKwhKm: 0.50 },
  Rodoviário: { dieselKmL: 7.0, elecKwhKm: 0.45 },
};
const ENERGY_SOURCES: Record<string, number> = {
  "Rede (ponta)": 0.85,
  "Rede (fora ponta)": 0.50,
  "Solar própria": 0.30,
};

/* ════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════════════════ */

// ── Tooltip Icon ──
const Tip: React.FC<{ text: string }> = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block ml-1 cursor-help"
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}>
      <HelpCircle size={13} className="inline" style={{ color: C.text2 }} />
      {show && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-md border bg-white p-2 text-xs shadow-md"
          style={{ color: C.text1, borderColor: C.border }}>
          {text}
        </span>
      )}
    </span>
  );
};

// ── Label ──
const Lbl: React.FC<{ children: React.ReactNode; tip?: string }> = ({ children, tip }) => (
  <label className="block mb-1 text-[11px] font-medium uppercase tracking-[1.2px]" style={{ color: C.text2 }}>
    {children}{tip && <Tip text={tip} />}
  </label>
);

// ── Input ──
const Inp: React.FC<{
  value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; min?: number; max?: number; step?: number;
}> = ({ value, onChange, prefix, suffix, min, max, step = 1 }) => (
  <div className="flex items-center rounded-md border px-3 h-10" style={{ borderColor: C.border, background: C.white }}>
    {prefix && <span className="text-xs mr-1" style={{ color: C.text2 }}>{prefix}</span>}
    <input type="number" className="flex-1 bg-transparent outline-none text-sm w-full" style={{ color: C.text1 }}
      value={value} min={min} max={max} step={step}
      onChange={e => onChange(Number(e.target.value))} />
    {suffix && <span className="text-xs ml-1" style={{ color: C.text2 }}>{suffix}</span>}
  </div>
);

// ── Toggle Group ──
const Toggle: React.FC<{
  options: string[]; value: string; onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex rounded-md border overflow-hidden" style={{ borderColor: C.border }}>
    {options.map(o => (
      <button key={o} type="button"
        className="flex-1 px-3 py-2 text-xs font-medium transition-colors duration-200"
        style={{
          background: value === o ? C.brand : C.white,
          color: value === o ? "#fff" : C.text2,
          borderRight: o !== options[options.length - 1] ? `1px solid ${C.border}` : undefined,
        }}
        onClick={() => onChange(o)}>
        {o}
      </button>
    ))}
  </div>
);

// ── Section Divider ──
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-5 rounded-full" style={{ background: C.brand }} />
      <h2 className="text-[14px] font-semibold uppercase tracking-[1.2px]" style={{ color: C.brand }}>{title}</h2>
      <div className="flex-1 h-px" style={{ background: C.border }} />
    </div>
    {children}
  </section>
);

// ── KPI Card ──
const KPI: React.FC<{ label: string; value: string; color: string; sub?: string }> = ({ label, value, color, sub }) => (
  <div className="rounded-lg p-5 border" style={{ background: C.cardBg, borderColor: C.border }}>
    <p className="text-[11px] font-medium uppercase tracking-[1.2px] mb-2" style={{ color: C.text2 }}>{label}</p>
    <p className="text-[28px] font-semibold leading-tight" style={{ color }}>{value}</p>
    {sub && <p className="text-xs mt-1" style={{ color: C.text2 }}>{sub}</p>}
  </div>
);

// ── Eliminated Badge ──
const BadgeElim = () => (
  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium"
    style={{ background: C.redBg, color: C.redText }}>eliminado</span>
);

// ── Economy Badge ──
const BadgeEcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium"
    style={{ background: C.greenBg, color: C.greenText }}>{children}</span>
);

// ── Table Wrapper ──
const TW: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto rounded-lg border" style={{ borderColor: C.border }}>
    <table className="w-full text-sm" style={{ color: C.text1 }}>{children}</table>
  </div>
);
const Th: React.FC<{ children: React.ReactNode; align?: "left"|"right" }> = ({ children, align = "left" }) => (
  <th className={`px-4 py-3 font-medium text-[12px] uppercase tracking-[1px] ${align === "right" ? "text-right" : "text-left"}`}
    style={{ background: C.cardBg, color: C.text2, borderBottom: `1px solid ${C.border}` }}>{children}</th>
);
const Td: React.FC<{ children: React.ReactNode; align?: "left"|"right"; bold?: boolean }> = ({ children, align = "left", bold }) => (
  <td className={`px-4 py-3 ${align === "right" ? "text-right" : "text-left"} ${bold ? "font-semibold" : ""}`}
    style={{ borderBottom: `1px solid ${C.border}` }}>{children}</td>
);

// ── Custom Tooltip (chart) ──
const ChartTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border bg-white p-3 shadow-sm text-xs" style={{ borderColor: C.border }}>
      <p className="font-medium mb-1" style={{ color: C.text1 }}>Mês {label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {fmt(p.value)}</p>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   QUALITATIVE ITEMS
   ════════════════════════════════════════════════════════ */
const QUALITATIVE = [
  { icon: Volume2, title: "Operação noturna silenciosa", desc: "Entregas em zona residencial sem restrição de horário. Potencial de 30-50% mais entregas/dia." },
  { icon: FileText, title: "Contratos ESG premium", desc: "Embarcadores como Ambev, Amazon e Mercado Livre exigem frota limpa. Frete premium de 5-15%." },
  { icon: TrendingUp, title: "Financiamento verde", desc: "Linhas BNDES Finame e bancos privados com taxas 1-2 p.p. menores para veículos de baixa emissão." },
  { icon: Battery, title: "Frenagem regenerativa", desc: "Em topografia de morros como BH, recupera 15-25% da energia nas descidas. Otimizado para MG." },
  { icon: ShieldCheck, title: "Zero contaminação de carga", desc: "Sem vibração de motor, fuligem ou calor. Ideal para alimentos, farmacêuticos e eletrônicos." },
  { icon: Clock, title: "Tempo de abastecimento eliminado", desc: "Sem fila de posto, sem conferência de nota. Carrega no pátio à noite. 4-6h/mês devolvidas à operação." },
  { icon: Leaf, title: "Conformidade ambiental permanente", desc: "Zero emissão = zero multa ambiental, zero reprovação em inspeção, zero fumaça preta." },
  { icon: Truck, title: "Proteção contra depreciação regulatória", desc: "Zonas de baixa emissão avançam em capitais. Diesel é risco de stranded asset em 5 anos." },
  { icon: Droplets, title: "Gestão de combustível eliminada", desc: "Sem cartão, sem posto, sem auditoria de desvio, sem negociação de preço. Conta de luz na fatura." },
  { icon: Wind, title: "Saúde do motorista", desc: "Sem exposição a material particulado e vibração. Menos fadiga, menos afastamento, menor rotatividade." },
  { icon: Zap, title: "Antecipação regulatória", desc: "Zonas de restrição urbana em expansão. Quem compra elétrico hoje opera sem restrição amanhã." },
  { icon: TrendingUp, title: "Créditos de carbono", desc: "Brasil caminha para mecanismo de crédito de carbono no transporte. Elétrico posicionado para monetizar." },
];

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */
const CalculadoraTCO2: React.FC = () => {
  /* ── State: Aquisição ── */
  const [precoEletrico, setPrecoEletrico] = useState(433000);
  const [precoDiesel, setPrecoDiesel] = useState(341000);
  const [custoInfra, setCustoInfra] = useState(0);

  /* ── State: Operação ── */
  const [kmMes, setKmMes] = useState(4000);
  const [frota, setFrota] = useState(1);
  const [periodo, setPeriodo] = useState(60);
  const [perfil, setPerfil] = useState("Misto");
  const [perfilCustom, setPerfilCustom] = useState(false);
  const [fatDiario, setFatDiario] = useState(1200);

  /* ── State: Combustível ── */
  const [precoDieselL, setPrecoDieselL] = useState(6.50);
  const [precoArla, setPrecoArla] = useState(4.50);
  const [fonteEnergia, setFonteEnergia] = useState("Rede (ponta)");
  const [fonteCustom, setFonteCustom] = useState(false);
  const [tarifa, setTarifa] = useState(0.85);

  /* ── State: Consumo ── */
  const [consumoDiesel, setConsumoDiesel] = useState(6.0);
  const [consumoEletrico, setConsumoEletrico] = useState(0.50);

  /* ── State: Avançado ── */
  const [inflDiesel, setInflDiesel] = useState(5);
  const [inflElet, setInflElet] = useState(2);
  const [desvio, setDesvio] = useState(5);
  const [diasParadoDiesel, setDiasParadoDiesel] = useState(10);
  const [diasParadoEletrico, setDiasParadoEletrico] = useState(3);
  const [custoCapital, setCustoCapital] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  /* ── State: Expandable sections ── */
  const [showBarChart, setShowBarChart] = useState(false);

  /* ── Profile / Energy handlers ── */
  const handlePerfil = useCallback((p: string) => {
    setPerfil(p);
    setPerfilCustom(false);
    const prof = PROFILES[p];
    if (prof) {
      setConsumoDiesel(prof.dieselKmL);
      setConsumoEletrico(prof.elecKwhKm);
    }
  }, []);

  const handleFonte = useCallback((f: string) => {
    setFonteEnergia(f);
    setFonteCustom(false);
    const t = ENERGY_SOURCES[f];
    if (t !== undefined) setTarifa(t);
  }, []);

  const handleConsumoDieselManual = (v: number) => { setConsumoDiesel(v); setPerfilCustom(true); };
  const handleConsumoEletricoManual = (v: number) => { setConsumoEletrico(v); setPerfilCustom(true); };
  const handleTarifaManual = (v: number) => { setTarifa(v); setFonteCustom(true); };

  /* ════════════════════════════════════════════════════════
     CALCULATIONS
     ════════════════════════════════════════════════════════ */
  const calc = useMemo(() => {
    const anos = periodo / 12;
    const invDiesel = precoDiesel * frota;
    const invEletrico = precoEletrico * frota + custoInfra;
    const gap = invEletrico - invDiesel;

    // Monthly costs array
    const months: {
      m: number; dieselTotal: number; eletricoTotal: number;
      dieselAcum: number; eletricoAcum: number;
      econComb: number; econManut: number;
    }[] = [];

    // Maintenance diesel monthly (amortized)
    const maintDieselItems = [
      { name: "Óleo motor + filtro de óleo", interval: 10000, cost: 800 },
      { name: "Filtro de combustível", interval: 15000, cost: 250 },
      { name: "Filtro de ar", interval: 25000, cost: 200 },
      { name: "Sistema SCR / ARLA", interval: 0, cost: 50 }, // flat monthly
      { name: "Correia / tensor", interval: 60000, cost: 1500 },
      { name: "Kit embreagem", interval: 80000, cost: 3500 },
      { name: "Câmbio", interval: 40000, cost: 500 },
      { name: "Regulagem de válvulas", interval: 40000, cost: 400 },
    ];

    const maintDieselMonthly = maintDieselItems.reduce((sum, item) => {
      if (item.interval === 0) return sum + item.cost * frota;
      return sum + (kmMes / item.interval) * item.cost * frota;
    }, 0);

    // Maintenance items shared (reduced)
    const freiosDiesel = 100 * frota;
    const freiosEletrico = 50 * frota;
    const revisaoDiesel = 150 * frota;
    const revisaoEletrico = 100 * frota;
    const arrefDiesel = 30 * frota;
    const arrefEletrico = 40 * frota;

    const totalMaintDiesel = maintDieselMonthly + freiosDiesel + revisaoDiesel + arrefDiesel;
    const totalMaintEletrico = freiosEletrico + revisaoEletrico + arrefEletrico;

    let dieselAcum = invDiesel;
    let eletricoAcum = invEletrico;
    let paybackMonth = -1;

    const yearEcon: { comb: number; manut: number; downtime: number; total: number }[] = [];
    let yearComb = 0, yearManut = 0;

    for (let m = 1; m <= periodo; m++) {
      const yearIdx = Math.floor((m - 1) / 12);
      const fInflDiesel = Math.pow(1 + inflDiesel / 100, yearIdx);
      const fInflElet = Math.pow(1 + inflElet / 100, yearIdx);

      const pdAjust = precoDieselL * fInflDiesel;
      const litros = (kmMes * frota) / consumoDiesel;
      const custoComb = litros * pdAjust;
      const custoArlaM = litros * 0.05 * precoArla;
      const custoDesvio = custoComb * (desvio / 100);

      const tarifaAjust = tarifa * fInflElet;
      const custoEnergia = (kmMes * frota) * consumoEletrico * tarifaAjust;

      const totalDiesel = custoComb + custoArlaM + custoDesvio + totalMaintDiesel;
      const totalEletrico = custoEnergia + totalMaintEletrico;
      const econComb = (custoComb + custoArlaM + custoDesvio) - custoEnergia;
      const econManut = totalMaintDiesel - totalMaintEletrico;

      dieselAcum += totalDiesel;
      eletricoAcum += totalEletrico;

      if (paybackMonth < 0 && dieselAcum > eletricoAcum) paybackMonth = m;

      yearComb += econComb;
      yearManut += econManut;

      months.push({ m, dieselTotal: totalDiesel, eletricoTotal: totalEletrico, dieselAcum, eletricoAcum, econComb, econManut });

      if (m % 12 === 0 || m === periodo) {
        const downtimeAnual = (diasParadoDiesel - diasParadoEletrico) * fatDiario * frota;
        yearEcon.push({ comb: yearComb, manut: yearManut, downtime: downtimeAnual, total: yearComb + yearManut + downtimeAnual });
        yearComb = 0;
        yearManut = 0;
      }
    }

    const econMensal = months[0] ? months[0].dieselTotal - months[0].eletricoTotal : 0;
    const recRecuperadaAnual = (diasParadoDiesel - diasParadoEletrico) * fatDiario * frota;
    const econOperacional = months.reduce((s, m) => s + (m.dieselTotal - m.eletricoTotal), 0) + recRecuperadaAnual * anos;
    const custoOport = gap * (custoCapital / 100) * anos;
    const econLiquida = econOperacional - gap - custoOport;

    // Chart data (sample every month, label every 12)
    const chartData = months.map(m => ({
      mes: m.m,
      Diesel: Math.round(m.dieselAcum),
      Elétrico: Math.round(m.eletricoAcum),
    }));

    // Month 1 fuel detail
    const litrosM1 = (kmMes * frota) / consumoDiesel;
    const combDieselM1 = litrosM1 * precoDieselL;
    const arlaM1 = litrosM1 * 0.05 * precoArla;
    const desvioM1 = combDieselM1 * (desvio / 100);
    const energiaM1 = (kmMes * frota) * consumoEletrico * tarifa;

    // Maint detail arrays
    const maintDetailDiesel = maintDieselItems.map(item => ({
      name: item.name,
      diesel: item.interval === 0 ? item.cost * frota : (kmMes / item.interval) * item.cost * frota,
      eletrico: 0 as number | null,
      eliminated: true,
    }));
    maintDetailDiesel.push(
      { name: "Freios", diesel: freiosDiesel, eletrico: freiosEletrico, eliminated: false },
      { name: "Revisão / diagnóstico", diesel: revisaoDiesel, eletrico: revisaoEletrico, eliminated: false },
      { name: "Arrefecimento bateria", diesel: arrefDiesel, eletrico: arrefEletrico, eliminated: false },
    );

    // Bar chart data (month 1)
    const barData = [
      { cat: "Combustível", Diesel: Math.round(combDieselM1), Elétrico: Math.round(energiaM1) },
      { cat: "ARLA + Desvio", Diesel: Math.round(arlaM1 + desvioM1), Elétrico: 0 },
      { cat: "Manutenção", Diesel: Math.round(totalMaintDiesel), Elétrico: Math.round(totalMaintEletrico) },
      { cat: "Parada", Diesel: Math.round(diasParadoDiesel * fatDiario * frota / 12), Elétrico: Math.round(diasParadoEletrico * fatDiario * frota / 12) },
    ];

    return {
      gap, invDiesel, invEletrico, econMensal, paybackMonth, econLiquida,
      econOperacional, recRecuperadaAnual, custoOport,
      chartData, months, yearEcon, anos,
      combDieselM1, arlaM1, desvioM1, energiaM1,
      totalMaintDiesel, totalMaintEletrico, maintDetailDiesel,
      barData,
    };
  }, [precoEletrico, precoDiesel, custoInfra, kmMes, frota, periodo, consumoDiesel, consumoEletrico,
    precoDieselL, precoArla, tarifa, inflDiesel, inflElet, desvio,
    diasParadoDiesel, diasParadoEletrico, fatDiario, custoCapital]);

  /* ════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════ */
  return (
    <>
      <Helmet>
        <title>Calculadora TCO v2 | Lavoro Foton</title>
      </Helmet>
      <Navbar />

      <main className="pt-28 pb-16" style={{ background: C.bg, fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ═══ HEADER ═══ */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold" style={{ color: C.brand }}>Calculadora TCO</h1>
            <p className="text-sm mt-1" style={{ color: C.text2 }}>Custo Total de Propriedade · Elétrico vs Diesel</p>
            <div className="h-px mt-4" style={{ background: C.brand, opacity: 0.2 }} />
          </div>

          {/* ═══ INPUTS ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Painel 1 — Aquisição */}
            <div className="rounded-lg border p-5" style={{ borderColor: C.border, background: C.white }}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[1.2px] mb-4" style={{ color: C.brand }}>Aquisição</h3>
              <div className="space-y-3">
                <div><Lbl>Preço veículo elétrico</Lbl><Inp value={precoEletrico} onChange={setPrecoEletrico} prefix="R$" /></div>
                <div><Lbl>Preço veículo diesel</Lbl><Inp value={precoDiesel} onChange={setPrecoDiesel} prefix="R$" /></div>
                <div><Lbl tip="Custo do carregador + instalação elétrica, se necessário. Entra no investimento inicial do elétrico.">Custo infraestrutura de recarga</Lbl><Inp value={custoInfra} onChange={setCustoInfra} prefix="R$" /></div>
              </div>
            </div>

            {/* Painel 2 — Operação */}
            <div className="rounded-lg border p-5" style={{ borderColor: C.border, background: C.white }}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[1.2px] mb-4" style={{ color: C.brand }}>Operação</h3>
              <div className="space-y-3">
                <div><Lbl>Km rodado por mês</Lbl><Inp value={kmMes} onChange={setKmMes} suffix="km" min={500} /></div>
                <div><Lbl>Veículos na frota</Lbl><Inp value={frota} onChange={setFrota} min={1} max={100} /></div>
                <div><Lbl>Período de análise</Lbl><Inp value={periodo} onChange={setPeriodo} suffix="meses" min={12} max={120} /></div>
                <div>
                  <Lbl>Perfil de operação</Lbl>
                  <Toggle options={perfilCustom ? ["Urbano", "Misto", "Rodoviário", "Personalizado"] : ["Urbano", "Misto", "Rodoviário"]}
                    value={perfilCustom ? "Personalizado" : perfil} onChange={handlePerfil} />
                </div>
                <div><Lbl tip="Receita bruta média que o caminhão gera por dia rodando. Usado para calcular custo de parada.">Faturamento diário por caminhão</Lbl><Inp value={fatDiario} onChange={setFatDiario} prefix="R$" /></div>
              </div>
            </div>

            {/* Painel 3 — Combustível & Energia */}
            <div className="rounded-lg border p-5" style={{ borderColor: C.border, background: C.white }}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[1.2px] mb-4" style={{ color: C.brand }}>Combustível & Energia</h3>
              <div className="space-y-3">
                <div><Lbl>Preço do diesel</Lbl><Inp value={precoDieselL} onChange={setPrecoDieselL} prefix="R$" suffix="/L" step={0.10} /></div>
                <div><Lbl>Preço do ARLA 32</Lbl><Inp value={precoArla} onChange={setPrecoArla} prefix="R$" suffix="/L" step={0.10} /></div>
                <div>
                  <Lbl>Fonte de energia</Lbl>
                  <Toggle options={fonteCustom ? ["Rede (ponta)", "Rede (fora ponta)", "Solar própria", "Personalizado"] : ["Rede (ponta)", "Rede (fora ponta)", "Solar própria"]}
                    value={fonteCustom ? "Personalizado" : fonteEnergia} onChange={handleFonte} />
                </div>
                <div><Lbl>Tarifa de energia</Lbl><Inp value={tarifa} onChange={handleTarifaManual} prefix="R$" suffix="/kWh" step={0.05} /></div>
              </div>
            </div>

            {/* Painel 4 — Consumo */}
            <div className="rounded-lg border p-5" style={{ borderColor: C.border, background: C.white }}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[1.2px] mb-4" style={{ color: C.brand }}>Consumo</h3>
              <div className="space-y-3">
                <div><Lbl>Consumo do diesel</Lbl><Inp value={consumoDiesel} onChange={handleConsumoDieselManual} suffix="km/L" step={0.5} /></div>
                <div><Lbl>Consumo do elétrico</Lbl><Inp value={consumoEletrico} onChange={handleConsumoEletricoManual} suffix="kWh/km" step={0.05} /></div>
              </div>
            </div>
          </div>

          {/* Painel 5 — Avançado (colapsável) */}
          <div className="mb-10 rounded-lg border" style={{ borderColor: C.border, background: C.white }}>
            <button className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setShowAdvanced(!showAdvanced)}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[1.2px]" style={{ color: C.brand }}>
                Configurações avançadas
              </h3>
              {showAdvanced ? <ChevronUp size={16} style={{ color: C.text2 }} /> : <ChevronDown size={16} style={{ color: C.text2 }} />}
            </button>
            {showAdvanced && (
              <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t pt-4" style={{ borderColor: C.border }}>
                <div><Lbl tip="Média histórica ANP 2021-2026: ~5-6% a.a.">Inflação anual diesel</Lbl><Inp value={inflDiesel} onChange={setInflDiesel} suffix="%" step={0.5} /></div>
                <div><Lbl tip="Matriz brasileira 83% renovável, historicamente estável.">Inflação anual eletricidade</Lbl><Inp value={inflElet} onChange={setInflElet} suffix="%" step={0.5} /></div>
                <div><Lbl tip="Perda média por desvio, sifão, calibração de bomba. Frotistas reportam 3-8%. Elétrico: zero.">Desvio/perda combustível</Lbl><Inp value={desvio} onChange={setDesvio} suffix="%" /></div>
                <div><Lbl>Dias parado manut./ano — diesel</Lbl><Inp value={diasParadoDiesel} onChange={setDiasParadoDiesel} suffix="dias" /></div>
                <div><Lbl>Dias parado manut./ano — elétrico</Lbl><Inp value={diasParadoEletrico} onChange={setDiasParadoEletrico} suffix="dias" /></div>
                <div><Lbl tip="Custo de oportunidade do capital adicional investido no elétrico. Ex: 12% = CDI. Deixe 0 para ignorar.">Custo de capital anual</Lbl><Inp value={custoCapital} onChange={setCustoCapital} suffix="%" /></div>
              </div>
            )}
          </div>

          {/* ═══ KPIs ═══ */}
          <Section title="Resultado da simulação">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KPI label="Economia mensal" value={fmt(calc.econMensal)} color={C.green}
                sub={frota > 1 ? `Por veículo: ${fmt(calc.econMensal / frota)}` : undefined} />
              <KPI label="Economia anual" value={fmt(calc.econMensal * 12 + calc.recRecuperadaAnual)} color={C.brand} />
              <KPI label="Payback" value={calc.paybackMonth > 0 ? `~${calc.paybackMonth} meses` : `> ${periodo} meses`}
                color={calc.paybackMonth > 0 ? C.accent : C.text2} />
              <KPI label="Economia líquida no período"
                value={fmt(calc.econLiquida)} color={C.green}
                sub={frota > 1 ? `Total frota (${frota} veículos): ${fmt(calc.econLiquida)}` : undefined} />
            </div>
          </Section>

          {/* ═══ AREA CHART ═══ */}
          <Section title="Custo acumulado ao longo do tempo">
            <div className="rounded-lg border p-4 sm:p-6" style={{ borderColor: C.border, background: C.white }}>
              <ResponsiveContainer width="100%" height={360}>
                <AreaChart data={calc.chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradDiesel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.red} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={C.red} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="gradEletrico" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.green} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={C.green} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: C.text2 }}
                    tickFormatter={v => v % 12 === 0 ? `${v / 12}a` : ""} />
                  <YAxis tick={{ fontSize: 11, fill: C.text2 }}
                    tickFormatter={v => fmtShort(v as number)} width={70} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="Diesel" stroke={C.red} strokeWidth={2} fill="url(#gradDiesel)" name="Diesel Convencional" />
                  <Area type="monotone" dataKey="Elétrico" stroke={C.green} strokeWidth={2} fill="url(#gradEletrico)" name="Elétrico Foton" />
                  {calc.paybackMonth > 0 && (
                    <ReferenceLine x={calc.paybackMonth} stroke={C.accent} strokeDasharray="4 4" strokeWidth={1.5}
                      label={{ value: `Payback`, fill: C.accent, fontSize: 11, position: "top" }} />
                  )}
                  <Legend verticalAlign="bottom" height={36}
                    formatter={(value: string) => <span style={{ color: C.text1, fontSize: 12 }}>{value}</span>} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>

          {/* ═══ TABLE: Fuel Detail (Month 1) ═══ */}
          <Section title="Detalhamento — Combustível & Energia (mês 1)">
            <TW>
              <thead>
                <tr><Th>Item</Th><Th align="right">Diesel</Th><Th align="right">Elétrico</Th><Th align="right">Economia</Th></tr>
              </thead>
              <tbody>
                <tr><Td>Diesel</Td><Td align="right">{fmt2(calc.combDieselM1)}</Td><Td align="right">—</Td><Td align="right">{fmt2(calc.combDieselM1)}</Td></tr>
                <tr><Td>ARLA 32</Td><Td align="right">{fmt2(calc.arlaM1)}</Td><Td align="right"><BadgeElim /></Td><Td align="right">{fmt2(calc.arlaM1)}</Td></tr>
                <tr><Td>Desvio/perda combustível</Td><Td align="right">{fmt2(calc.desvioM1)}</Td><Td align="right"><BadgeElim /></Td><Td align="right">{fmt2(calc.desvioM1)}</Td></tr>
                <tr><Td>Energia elétrica</Td><Td align="right">—</Td><Td align="right">{fmt2(calc.energiaM1)}</Td><Td align="right">—</Td></tr>
                <tr style={{ background: C.cardBg }}>
                  <Td bold>Subtotal energia</Td>
                  <Td align="right" bold>{fmt2(calc.combDieselM1 + calc.arlaM1 + calc.desvioM1)}</Td>
                  <Td align="right" bold>{fmt2(calc.energiaM1)}</Td>
                  <Td align="right" bold>
                    <BadgeEcon>{fmt2(calc.combDieselM1 + calc.arlaM1 + calc.desvioM1 - calc.energiaM1)}</BadgeEcon>
                  </Td>
                </tr>
              </tbody>
            </TW>
          </Section>

          {/* ═══ TABLE: Maintenance Detail ═══ */}
          <Section title="Detalhamento — Manutenção (mensal amortizado)">
            <TW>
              <thead>
                <tr><Th>Item</Th><Th align="right">Diesel</Th><Th align="right">Elétrico</Th><Th align="right">Economia</Th></tr>
              </thead>
              <tbody>
                {calc.maintDetailDiesel.map((item, i) => (
                  <tr key={i}>
                    <Td>{item.name}</Td>
                    <Td align="right">{fmt2(item.diesel)}</Td>
                    <Td align="right">{item.eliminated ? <BadgeElim /> : fmt2(item.eletrico!)}</Td>
                    <Td align="right">{fmt2(item.eliminated ? item.diesel : item.diesel - item.eletrico!)}</Td>
                  </tr>
                ))}
                <tr style={{ background: C.cardBg }}>
                  <Td bold>Subtotal manutenção</Td>
                  <Td align="right" bold>{fmt2(calc.totalMaintDiesel)}</Td>
                  <Td align="right" bold>{fmt2(calc.totalMaintEletrico)}</Td>
                  <Td align="right" bold>
                    <BadgeEcon>{fmt2(calc.totalMaintDiesel - calc.totalMaintEletrico)}</BadgeEcon>
                  </Td>
                </tr>
              </tbody>
            </TW>
          </Section>

          {/* ═══ TABLE: Downtime ═══ */}
          <Section title="Custo de parada (downtime)">
            <TW>
              <thead>
                <tr><Th>Item</Th><Th align="right">Diesel</Th><Th align="right">Elétrico</Th><Th align="right">Diferença</Th></tr>
              </thead>
              <tbody>
                <tr>
                  <Td>Dias parados/ano</Td>
                  <Td align="right">{diasParadoDiesel} dias</Td>
                  <Td align="right">{diasParadoEletrico} dias</Td>
                  <Td align="right">{diasParadoDiesel - diasParadoEletrico} dias</Td>
                </tr>
                <tr>
                  <Td>Receita perdida/ano</Td>
                  <Td align="right">{fmt(diasParadoDiesel * fatDiario * frota)}</Td>
                  <Td align="right">{fmt(diasParadoEletrico * fatDiario * frota)}</Td>
                  <Td align="right"><BadgeEcon>{fmt(calc.recRecuperadaAnual)}</BadgeEcon></Td>
                </tr>
              </tbody>
            </TW>
          </Section>

          {/* ═══ TABLE: Consolidated ═══ */}
          <Section title="Tabela consolidada">
            <TW>
              <thead>
                <tr>
                  <Th>Período</Th><Th align="right">Econ. Combustível</Th><Th align="right">Econ. Manutenção</Th>
                  <Th align="right">Receita Recuperada</Th><Th align="right">Economia Total</Th>
                </tr>
              </thead>
              <tbody>
                {/* Month 1 per vehicle */}
                <tr>
                  <Td>Mensal (mês 1{frota > 1 ? ", por veículo" : ""})</Td>
                  <Td align="right">{fmt(calc.months[0]?.econComb / frota || 0)}</Td>
                  <Td align="right">{fmt(calc.months[0]?.econManut / frota || 0)}</Td>
                  <Td align="right">{fmt(calc.recRecuperadaAnual / 12 / frota)}</Td>
                  <Td align="right">{fmt((calc.months[0]?.econComb + calc.months[0]?.econManut) / frota + calc.recRecuperadaAnual / 12 / frota || 0)}</Td>
                </tr>
                {/* Year rows */}
                {calc.yearEcon.map((y, i) => (
                  <tr key={i}>
                    <Td>Ano {i + 1}</Td>
                    <Td align="right">{fmt(y.comb)}</Td>
                    <Td align="right">{fmt(y.manut)}</Td>
                    <Td align="right">{fmt(y.downtime)}</Td>
                    <Td align="right" bold>{fmt(y.total)}</Td>
                  </tr>
                ))}
                {/* Total */}
                <tr style={{ background: C.cardBg }}>
                  <Td bold>TOTAL no período</Td>
                  <Td align="right" bold>{fmt(calc.yearEcon.reduce((s, y) => s + y.comb, 0))}</Td>
                  <Td align="right" bold>{fmt(calc.yearEcon.reduce((s, y) => s + y.manut, 0))}</Td>
                  <Td align="right" bold>{fmt(calc.yearEcon.reduce((s, y) => s + y.downtime, 0))}</Td>
                  <Td align="right" bold>{fmt(calc.yearEcon.reduce((s, y) => s + y.total, 0))}</Td>
                </tr>
                {/* Economia líquida */}
                <tr>
                  <td colSpan={5} className="p-0">
                    <div className="rounded-b-lg px-4 py-4 flex items-center justify-between"
                      style={{ background: C.brandLight, borderTop: `2px solid ${C.brand}` }}>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[1.2px]" style={{ color: C.text2 }}>Economia líquida no período</p>
                        {frota > 1 && <p className="text-xs mt-0.5" style={{ color: C.text2 }}>Total frota ({frota} veículos)</p>}
                      </div>
                      <p className="text-2xl font-semibold" style={{ color: C.brand }}>{fmt(calc.econLiquida)}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </TW>
          </Section>

          {/* ═══ BAR CHART (expandable) ═══ */}
          <Section title="Detalhamento mensal por categoria">
            <button className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors"
              style={{ color: C.brand }} onClick={() => setShowBarChart(!showBarChart)}>
              {showBarChart ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showBarChart ? "Ocultar gráfico" : "Exibir gráfico comparativo"}
            </button>
            {showBarChart && (
              <div className="rounded-lg border p-4 sm:p-6" style={{ borderColor: C.border, background: C.white }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calc.barData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="cat" tick={{ fontSize: 11, fill: C.text2 }} />
                    <YAxis tick={{ fontSize: 11, fill: C.text2 }} tickFormatter={v => fmt(v as number)} width={80} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="Diesel" fill={C.red} radius={[4, 4, 0, 0]} name="Diesel" />
                    <Bar dataKey="Elétrico" fill={C.green} radius={[4, 4, 0, 0]} name="Elétrico" />
                    <Legend formatter={(value: string) => <span style={{ color: C.text1, fontSize: 12 }}>{value}</span>} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Section>

          {/* ═══ QUALITATIVE PANEL ═══ */}
          <section className="mb-10 rounded-lg p-6" style={{ background: C.cardBg, borderTop: `2px solid ${C.brand}` }}>
            <h2 className="text-base font-semibold mb-5" style={{ color: C.brand }}>Vantagens estratégicas do elétrico</h2>
            <p className="text-xs mb-6" style={{ color: C.text2 }}>O que o TCO não captura</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUALITATIVE.map((item, i) => (
                <div key={i} className="rounded-lg border bg-white p-4" style={{ borderColor: C.border }}>
                  <div className="flex items-start gap-3">
                    <item.icon size={18} style={{ color: C.brand, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: C.text1 }}>{item.title}</p>
                      <p className="text-[13px] mt-1 leading-relaxed" style={{ color: C.text2 }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ FOOTER / DISCLAIMER ═══ */}
          <section className="rounded-lg p-5 border-t" style={{ background: C.cardBg, borderColor: C.border }}>
            <div className="text-xs leading-[1.8] space-y-2" style={{ color: C.text2 }}>
              <p><strong>Nota:</strong> Este relatório é uma simulação baseada em valores de referência. Os custos reais podem variar conforme condições operacionais, região, perfil de carga e manutenção do veículo.</p>
              <p>Inflação diesel: projeção de {inflDiesel}% a.a. baseada na série histórica ANP 2021-2026. Inflação eletricidade: {inflElet}% a.a. considerando matriz brasileira 83% renovável.</p>
              <p>Desvio de combustível: estimativa de {desvio}% baseada em relatos de frotistas. Faixa de mercado: 3-8%.</p>
              <p>Manutenção elétrica ~70% inferior ao diesel: ausência de motor a combustão, ARLA 32, câmbio, embreagem, correia, filtros de óleo/combustível/ar, regulagem de válvulas, sistema SCR.</p>
              <p>Garantias eAumark 9T: Veículo 3 anos / 100.000 km · Bateria 8 anos / 400.000 km (CATL LFP)</p>
              <div className="h-px my-3" style={{ background: C.border }} />
              <p className="font-medium" style={{ color: C.brand }}>LAVORO FOTON · Contagem/MG</p>
              <a href="https://lavorofoton.com.br" target="_blank" rel="noopener noreferrer"
                className="text-xs underline" style={{ color: C.brand }}>lavorofoton.com.br</a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default CalculadoraTCO2;
