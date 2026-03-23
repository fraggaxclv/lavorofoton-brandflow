import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, BarChart, Bar, Legend, Cell
} from "recharts";
import { ChevronDown, ChevronUp, Zap, Fuel } from "lucide-react";

// ─── Vehicle Data ───────────────────────────────────────────────
const VEHICLES = {
  econnect: {
    name: "E-Connect",
    type: "electric" as const,
    icon: "⚡",
    category: "Van 100% Elétrica",
    price: 260000,
    kwhPerKm: 0.35,
    maintenancePerKm: 0.07,
    insuranceYear: 8500,
    tireLifeKm: 60000,
    tireCost: 2800,
    depreciation: [0.15, 0.10, 0.08, 0.07, 0.06],
    description: "Van 100% elétrica · Autonomia ~250km · Carga útil 1.000kg",
  },
  vanDiesel: {
    name: "Van Diesel Concorrente",
    type: "diesel" as const,
    icon: "⛽",
    category: "Van a Diesel",
    price: 230000,
    kmPerLiter: 7.5,
    arlaPerKm: 0.015,
    maintenancePerKm: 0.22,
    insuranceYear: 9200,
    tireLifeKm: 50000,
    tireCost: 2400,
    depreciation: [0.18, 0.12, 0.10, 0.08, 0.07],
    description: "Van concorrente a diesel · ~7.5 km/L · Carga útil similar",
  },
  ewonder: {
    name: "E-Wonder",
    type: "electric" as const,
    icon: "⚡",
    category: "Caminhão Leve Elétrico",
    price: 240000,
    kwhPerKm: 0.18,
    maintenancePerKm: 0.05,
    insuranceYear: 8000,
    tireLifeKm: 55000,
    tireCost: 1800,
    depreciation: [0.15, 0.10, 0.08, 0.07, 0.06],
    description: "Caminhão leve 100% elétrico · Autonomia ~200km · Last mile / urbano",
  },
  hrBongo: {
    name: "Hyundai HR / Kia Bongo",
    type: "diesel" as const,
    icon: "⛽",
    category: "Caminhão Leve Diesel",
    price: 190000,
    kmPerLiter: 9.0,
    arlaPerKm: 0.012,
    maintenancePerKm: 0.18,
    insuranceYear: 7500,
    tireLifeKm: 45000,
    tireCost: 1600,
    depreciation: [0.18, 0.12, 0.10, 0.08, 0.07],
    description: "Hyundai HR / Kia Bongo · ~9.0 km/L · Operação urbana equivalente",
  },
};

type Comparison = "econnect" | "ewonder";

const COMPARISONS: Record<Comparison, { electric: keyof typeof VEHICLES; diesel: keyof typeof VEHICLES; label: string }> = {
  econnect: { electric: "econnect", diesel: "vanDiesel", label: "E-Connect vs Van Diesel" },
  ewonder: { electric: "ewonder", diesel: "hrBongo", label: "E-Wonder vs HR/Bongo" },
};

// ─── Formatters ─────────────────────────────────────────────────
const fBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const fBRL2 = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const fCompact = (v: number) => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}mil`;
  return v.toFixed(0);
};

// ─── Main Component ─────────────────────────────────────────────
const CalculadoraTCO: React.FC = () => {
  const [profile, setProfile] = useState<"frotista" | "autonomo">("frotista");
  const [comparison, setComparison] = useState<Comparison>("ewonder");
  const [kmMonth, setKmMonth] = useState(4000);
  const [fleet, setFleet] = useState(5);
  const [months, setMonths] = useState(60);
  const [dieselPrice, setDieselPrice] = useState(6.30);
  const [electricityPrice, setElectricityPrice] = useState(0.85);
  const [showDetail, setShowDetail] = useState(false);

  const effectiveFleet = profile === "autonomo" ? 1 : fleet;
  const comp = COMPARISONS[comparison];
  const elecV = VEHICLES[comp.electric];
  const dieselV = VEHICLES[comp.diesel];

  // ─── TCO Calculation ───────────────────────────────────────────
  const { chartData, paybackMonth, totalElec, totalDiesel, costPerKmElec, costPerKmDiesel, monthlyBreakdown } = useMemo(() => {
    let accElec = elecV.price * effectiveFleet;
    let accDiesel = dieselV.price * effectiveFleet;
    const totalKmMonth = kmMonth * effectiveFleet;
    let payback = -1;
    const data: { month: number; label: string; electric: number; diesel: number }[] = [];

    for (let m = 1; m <= months; m++) {
      // Energy
      const energyElec = totalKmMonth * elecV.kwhPerKm * electricityPrice;
      const energyDiesel = totalKmMonth * ((1 / dieselV.kmPerLiter!) * dieselPrice + dieselV.arlaPerKm!);
      // Maintenance
      const maintElec = totalKmMonth * elecV.maintenancePerKm;
      const maintDiesel = totalKmMonth * dieselV.maintenancePerKm;
      // Insurance
      const insElec = (elecV.insuranceYear * effectiveFleet) / 12;
      const insDiesel = (dieselV.insuranceYear * effectiveFleet) / 12;
      // Tires
      const tiresElec = (totalKmMonth / elecV.tireLifeKm) * elecV.tireCost;
      const tiresDiesel = (totalKmMonth / dieselV.tireLifeKm) * dieselV.tireCost;

      accElec += energyElec + maintElec + insElec + tiresElec;
      accDiesel += energyDiesel + maintDiesel + insDiesel + tiresDiesel;

      if (payback === -1 && accDiesel > accElec) payback = m;

      const label = m % 12 === 0 ? `${m / 12}a` : "";
      data.push({ month: m, label, electric: Math.round(accElec), diesel: Math.round(accDiesel) });
    }

    const totalKm = kmMonth * months * effectiveFleet;
    const cpkE = totalKm > 0 ? accElec / totalKm : 0;
    const cpkD = totalKm > 0 ? accDiesel / totalKm : 0;

    // Monthly breakdown at month 12
    const energyElec12 = totalKmMonth * elecV.kwhPerKm * electricityPrice;
    const energyDiesel12 = totalKmMonth * ((1 / dieselV.kmPerLiter!) * dieselPrice + dieselV.arlaPerKm!);
    const maintElec12 = totalKmMonth * elecV.maintenancePerKm;
    const maintDiesel12 = totalKmMonth * dieselV.maintenancePerKm;
    const insElec12 = (elecV.insuranceYear * effectiveFleet) / 12;
    const insDiesel12 = (dieselV.insuranceYear * effectiveFleet) / 12;
    const tiresElec12 = (totalKmMonth / elecV.tireLifeKm) * elecV.tireCost;
    const tiresDiesel12 = (totalKmMonth / dieselV.tireLifeKm) * dieselV.tireCost;

    return {
      chartData: data,
      paybackMonth: payback,
      totalElec: Math.round(accElec),
      totalDiesel: Math.round(accDiesel),
      costPerKmElec: cpkE,
      costPerKmDiesel: cpkD,
      monthlyBreakdown: [
        { category: "Combustível / Energia", electric: energyElec12, diesel: energyDiesel12 },
        { category: "Manutenção", electric: maintElec12, diesel: maintDiesel12 },
        { category: "Seguro", electric: insElec12, diesel: insDiesel12 },
        { category: "Pneus", electric: tiresElec12, diesel: tiresDiesel12 },
      ],
    };
  }, [elecV, dieselV, kmMonth, effectiveFleet, months, dieselPrice, electricityPrice]);

  const savings = totalDiesel - totalElec;
  const savingsPercent = totalDiesel > 0 ? (savings / totalDiesel) * 100 : 0;
  const hasSavings = savings > 0;

  // ─── Custom Tooltip ────────────────────────────────────────────
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg px-4 py-3 text-sm shadow-xl border" style={{ background: "#0d1a2e", borderColor: "rgba(255,255,255,0.1)" }}>
        <p className="text-white/60 mb-1">Mês {label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
            {p.name}: {fBRL(p.value)}
          </p>
        ))}
      </div>
    );
  };

  // ─── Toggle Button ─────────────────────────────────────────────
  const Toggle = ({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (v: any) => void }) => (
    <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className="px-4 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap"
          style={{
            background: value === o.value ? "rgba(255,160,50,0.15)" : "transparent",
            color: value === o.value ? "#ffa032" : "rgba(255,255,255,0.5)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  // ─── Input Field ───────────────────────────────────────────────
  const Field = ({ label, value, onChange, min, max, step, prefix }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; prefix?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</label>
      <div className="flex items-center rounded-lg border px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
        {prefix && <span className="text-xs mr-1" style={{ color: "rgba(255,255,255,0.4)" }}>{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step || 1}
          className="w-full bg-transparent text-white text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );

  // ─── Vehicle Card ──────────────────────────────────────────────
  const VehicleCard = ({ v, type }: { v: typeof elecV; type: "electric" | "diesel" }) => {
    const borderColor = type === "electric" ? "rgba(78,203,138,0.3)" : "rgba(224,120,80,0.3)";
    const accentColor = type === "electric" ? "#4ecb8a" : "#e07850";
    return (
      <div className="rounded-xl p-5 flex-1 transition-all" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${borderColor}` }}>
        <div className="flex items-center gap-2 mb-2">
          {type === "electric" ? <Zap size={18} color={accentColor} /> : <Fuel size={18} color={accentColor} />}
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>{v.category}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{v.name}</h3>
        <p className="text-2xl font-extrabold mb-2" style={{ color: accentColor }}>{fBRL(v.price)}</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{v.description}</p>
      </div>
    );
  };

  // ─── KPI Card ──────────────────────────────────────────────────
  const KPI = ({ title, children, highlight }: { title: string; children: React.ReactNode; highlight?: boolean }) => (
    <div
      className="rounded-xl p-5 flex-1"
      style={{
        background: highlight && hasSavings ? "rgba(255,160,50,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${highlight && hasSavings ? "rgba(255,160,50,0.3)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>{title}</p>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen w-full" style={{ background: "linear-gradient(180deg, #060e1a 0%, #0a1628 50%, #0d1f3c 100%)" }}>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap size={28} color="#ffa032" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Calculadora TCO</h1>
          </div>
          <p className="text-xs sm:text-sm font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
            LAVORO FOTON · Elétrico vs Diesel · Custo Total de Propriedade
          </p>
        </header>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Toggle
            options={[
              { value: "frotista", label: "🏢 Frotista" },
              { value: "autonomo", label: "🚛 Autônomo" },
            ]}
            value={profile}
            onChange={setProfile}
          />
          <Toggle
            options={[
              { value: "econnect", label: "E-Connect vs Van Diesel" },
              { value: "ewonder", label: "E-Wonder vs HR/Bongo" },
            ]}
            value={comparison}
            onChange={setComparison}
          />
        </div>

        {/* Vehicle Cards */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <VehicleCard v={elecV} type="electric" />
          <VehicleCard v={dieselV} type="diesel" />
        </div>

        {/* Inputs */}
        <div className="rounded-xl p-5 mb-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Parâmetros da Simulação</p>
          <div className={`grid gap-4 ${profile === "frotista" ? "grid-cols-2 sm:grid-cols-5" : "grid-cols-2 sm:grid-cols-4"}`}>
            <Field label="Km / mês por veículo" value={kmMonth} onChange={setKmMonth} min={500} max={20000} step={500} />
            {profile === "frotista" && (
              <Field label="Quantidade de veículos" value={fleet} onChange={setFleet} min={1} max={100} />
            )}
            <Field label="Período (meses)" value={months} onChange={setMonths} min={12} max={120} step={12} />
            <Field label="Diesel (R$/L)" value={dieselPrice} onChange={setDieselPrice} min={3} max={12} step={0.1} prefix="R$" />
            <Field label="Eletricidade (R$/kWh)" value={electricityPrice} onChange={setElectricityPrice} min={0.3} max={3} step={0.05} prefix="R$" />
          </div>
        </div>

        {/* KPIs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <KPI title="Economia Total no Período" highlight>
            {hasSavings ? (
              <>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#ffa032" }}>{fBRL(savings)}</p>
                <p className="text-sm font-semibold" style={{ color: "#4ecb8a" }}>↓ {savingsPercent.toFixed(1)}% mais barato com elétrico</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-extrabold text-white/30">—</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Diesel mais econômico neste cenário. Ajuste os parâmetros.</p>
              </>
            )}
          </KPI>
          <KPI title="Payback do Investimento">
            {paybackMonth > 0 ? (
              <>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{paybackMonth} <span className="text-lg font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>meses</span></p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  ({(paybackMonth / 12).toFixed(1)} anos) para recuperar a diferença
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-extrabold text-white/50">&gt; {months} meses</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Payback não atingido no período</p>
              </>
            )}
          </KPI>
          <KPI title="Custo por Km">
            <div className="flex items-end gap-4">
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#4ecb8a" }}>Elétrico</p>
                <p className="text-xl font-extrabold text-white">{fBRL2(costPerKmElec)}</p>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#e07850" }}>Diesel</p>
                <p className="text-xl font-extrabold text-white">{fBRL2(costPerKmDiesel)}</p>
              </div>
            </div>
          </KPI>
        </div>

        {/* Area Chart */}
        <div className="rounded-xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-white">Custo Acumulado ao Longo do Tempo</p>
            {paybackMonth > 0 && (
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,160,50,0.15)", color: "#ffa032" }}>
                Payback: mês {paybackMonth}
              </span>
            )}
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradElec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ecb8a" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4ecb8a" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradDiesel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e07850" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#e07850" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} tickLine={false} axisLine={false}
                tickFormatter={(v) => v % 12 === 0 ? `${v / 12}a` : ""} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} tickLine={false} axisLine={false}
                tickFormatter={(v) => fCompact(v)} width={50} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="electric" name="Elétrico Foton" stroke="#4ecb8a" strokeWidth={2.5} fill="url(#gradElec)" />
              <Area type="monotone" dataKey="diesel" name="Diesel Convencional" stroke="#e07850" strokeWidth={2.5} fill="url(#gradDiesel)" />
              <Legend
                wrapperStyle={{ paddingTop: 12 }}
                formatter={(val: string) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{val}</span>}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Detail */}
        <div className="rounded-xl mb-8" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-white/60 hover:text-white/80 transition-colors"
          >
            <span>Detalhamento Mensal por Categoria</span>
            {showDetail ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {showDetail && (
            <div className="px-5 pb-5">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlyBreakdown} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="category" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} tickLine={false} axisLine={false}
                    tickFormatter={(v) => fBRL(v)} width={70} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="electric" name="Elétrico" radius={[4, 4, 0, 0]}>
                    {monthlyBreakdown.map((_, i) => <Cell key={i} fill="#4ecb8a" />)}
                  </Bar>
                  <Bar dataKey="diesel" name="Diesel" radius={[4, 4, 0, 0]}>
                    {monthlyBreakdown.map((_, i) => <Cell key={i} fill="#e07850" />)}
                  </Bar>
                  <Legend formatter={(val: string) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{val}</span>} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Footer / Premissas */}
        <footer className="text-center pb-8">
          <div className="rounded-xl p-5 mb-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>Premissas do Cálculo</p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Manutenção elétrica estimada em 60-70% menor que diesel (sem motor a combustão, ARLA 32, câmbio, embreagem, sistema de escape).
              Consumos de referência baseados em condições urbanas típicas. Depreciação estimada com base em dados de mercado.
              Seguro e pneus calculados proporcionalmente à quilometragem e frota. Valores sujeitos a variação conforme operação real.
            </p>
          </div>
          <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.2)" }}>
            LAVORO FOTON · Contagem/MG · lavoro.foton.com.br
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CalculadoraTCO;
