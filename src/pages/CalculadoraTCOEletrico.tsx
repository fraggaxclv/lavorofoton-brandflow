import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";
import logoFotonLavoro from "@/assets/logo-foton-lavoro-transparente.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Brand tokens ──
const C = {
  brand: "#003B73",
  accent: "#F28C28",
  green: "#0D7C5F",
  greenBg: "#D1FAE5",
  greenText: "#065F46",
  red: "#C0392B",
  redBg: "#FEE2E2",
  redText: "#991B1B",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  cardBg: "#F9FAFB",
  white: "#FFFFFF",
  bg: "#FAFAFA",
};

// ── Helpers ──
const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmt2 = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtShort = (v: number) => {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}k`;
  return fmt(v);
};

// ── Profiles ──
const PROFILES: Record<string, { dieselKmL: number; elecKwhKm: number }> = {
  Urbano: { dieselKmL: 5.0, elecKwhKm: 0.55 },
  Misto: { dieselKmL: 6.0, elecKwhKm: 0.50 },
  "Rodoviário": { dieselKmL: 7.0, elecKwhKm: 0.45 },
};

// ── Centavos-style input for decimal fields ──
function CentavosInput({
  label, value, onChange, prefix, suffix, maxVal = 99.99,
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; maxVal?: number;
}) {
  const [freshFocus, setFreshFocus] = useState(false);
  const centsFromValue = Math.round(value * 100);
  const displayFormatted = value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleFocus = () => setFreshFocus(true);
  const handleBlur = () => setFreshFocus(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setFreshFocus(false);
      const newCents = Math.floor(centsFromValue / 10);
      onChange(newCents / 100);
      return;
    }
    if (!/^[0-9]$/.test(e.key)) return;
    e.preventDefault();
    const digit = parseInt(e.key, 10);
    // If first digit typed after focusing, start fresh from 0
    const baseCents = freshFocus ? 0 : centsFromValue;
    setFreshFocus(false);
    const newCents = baseCents * 10 + digit;
    const maxCents = Math.round(maxVal * 100);
    if (newCents > maxCents) return;
    onChange(newCents / 100);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] uppercase tracking-[1.2px] font-medium" style={{ color: C.textSecondary }}>
        {label}
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 bg-white" style={{ borderColor: C.border }}>
        {prefix && <span className="text-sm mr-1" style={{ color: C.textSecondary }}>{prefix}</span>}
        <input
          type="text"
          inputMode="numeric"
          value={displayFormatted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={() => {}}
          className="flex-1 outline-none text-sm bg-transparent font-medium"
          style={{ color: C.textPrimary }}
        />
        {suffix && <span className="text-sm ml-1" style={{ color: C.textSecondary }}>{suffix}</span>}
      </div>
    </div>
  );
}

// ── Integer input (for large values like price, km, months, qty) ──
function InputField({
  label, value, onChange, prefix, suffix, min, max,
}: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; suffix?: string; min?: number; max?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [rawText, setRawText] = useState("");

  const displayValue = value.toLocaleString("pt-BR");

  const handleFocus = () => {
    setEditing(true);
    setRawText(value.toString());
  };

  const handleBlur = () => {
    setEditing(false);
    const parsed = parseInt(rawText.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed >= 0) {
      const clamped = Math.max(min ?? 0, Math.min(max ?? Infinity, parsed));
      onChange(clamped);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawText(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] uppercase tracking-[1.2px] font-medium" style={{ color: C.textSecondary }}>
        {label}
      </label>
      <div className="flex items-center border rounded-md px-3 py-2 bg-white" style={{ borderColor: C.border }}>
        {prefix && <span className="text-sm mr-1" style={{ color: C.textSecondary }}>{prefix}</span>}
        <input
          type="text"
          inputMode="numeric"
          value={editing ? rawText : displayValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="flex-1 outline-none text-sm bg-transparent font-medium"
          style={{ color: C.textPrimary }}
        />
        {suffix && <span className="text-sm ml-1" style={{ color: C.textSecondary }}>{suffix}</span>}
      </div>
    </div>
  );
}

// ── Badge components ──
function EliminadoBadge() {
  return (
    <span
      className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
      style={{ background: C.redBg, color: C.redText }}
    >
      eliminado
    </span>
  );
}
function EconomiaBadge({ text }: { text: string }) {
  return (
    <span
      className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
      style={{ background: C.greenBg, color: C.greenText }}
    >
      {text}
    </span>
  );
}

// ── Custom Tooltip ──
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border rounded-lg shadow-sm px-4 py-3 text-sm" style={{ borderColor: C.border }}>
      <p className="font-semibold mb-1" style={{ color: C.textPrimary }}>Mês {label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {fmt(p.value)}
        </p>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════
export default function CalculadoraTCOEletrico() {
  // ── State: inputs ──
  const [precoEletrico, setPrecoEletrico] = useState(433000);
  const [precoDiesel, setPrecoDiesel] = useState(341000);
  const [kmMes, setKmMes] = useState(4000);
  const [frota, setFrota] = useState(1);
  const [meses, setMeses] = useState(60);
  const [precoDieselL, setPrecoDieselL] = useState(6.50);
  const [precoEnergia, setPrecoEnergia] = useState(0.85);
  const [precoArla, setPrecoArla] = useState(4.50);
  const [consumoDieselKmL, setConsumoDieselKmL] = useState(6.0);
  const [consumoEletricoKwhKm, setConsumoEletricoKwhKm] = useState(0.50);
  const [perfil, setPerfil] = useState<string>("Misto");
  const [perfilCustom, setPerfilCustom] = useState(false);
  const [showDetalhamento, setShowDetalhamento] = useState(false);

  // Track manual edits to consumption
  const consumoEditedRef = useRef(false);

  const handlePerfilChange = (p: string) => {
    setPerfil(p);
    setPerfilCustom(false);
    consumoEditedRef.current = false;
    setConsumoDieselKmL(PROFILES[p].dieselKmL);
    setConsumoEletricoKwhKm(PROFILES[p].elecKwhKm);
  };

  const handleConsumoDiesel = (v: number) => {
    setConsumoDieselKmL(v);
    setPerfilCustom(true);
  };
  const handleConsumoEletrico = (v: number) => {
    setConsumoEletricoKwhKm(v);
    setPerfilCustom(true);
  };

  // ── Calculations ──
  const calc = useMemo(() => {
    const kmTotal = kmMes * frota;

    // Diesel monthly
    const litrosDiesel = kmTotal / consumoDieselKmL;
    const custoCombustivel = litrosDiesel * precoDieselL;
    const litrosArla = litrosDiesel * 0.05;
    const custoArla = litrosArla * precoArla;

    // Diesel maintenance (amortized monthly)
    const amort = (intervaloKm: number, custoTroca: number) => (kmTotal / intervaloKm) * custoTroca;
    const mOleoMotor = amort(10000, 800);
    const mFiltroComb = amort(15000, 250);
    const mFiltroAr = amort(25000, 200);
    const mSCR = 50 * frota;
    const mCorreia = amort(60000, 1500);
    const mEmbreagem = amort(80000, 3500);
    const mCambio = amort(40000, 500);
    const mValvulas = amort(40000, 400);
    const mFreiosDiesel = 100 * frota;
    const mRevisaoDiesel = 150 * frota;
    const mArrefDiesel = 30 * frota;

    const manutDieselEliminados = mOleoMotor + mFiltroComb + mFiltroAr + mSCR + mCorreia + mEmbreagem + mCambio + mValvulas;
    const manutDieselComuns = mFreiosDiesel + mRevisaoDiesel + mArrefDiesel;
    const manutDieselTotal = manutDieselEliminados + manutDieselComuns;

    // Electric monthly
    const custoEnergia = kmTotal * consumoEletricoKwhKm * precoEnergia;
    const mFreiosElec = 50 * frota;
    const mRevisaoElec = 100 * frota;
    const mArrefElec = 40 * frota;
    const manutElecTotal = mFreiosElec + mRevisaoElec + mArrefElec;

    const totalMensalDiesel = custoCombustivel + custoArla + manutDieselTotal;
    const totalMensalElec = custoEnergia + manutElecTotal;
    const economiaMensal = totalMensalDiesel - totalMensalElec;

    // Accumulated costs for chart
    const chartData: { mes: number; diesel: number; eletrico: number }[] = [];
    let accDiesel = precoDiesel * frota;
    let accElec = precoEletrico * frota;
    let payback = -1;

    for (let m = 0; m <= meses; m++) {
      chartData.push({ mes: m, diesel: accDiesel, eletrico: accElec });
      if (payback < 0 && m > 0 && accDiesel >= accElec) payback = m;
      accDiesel += totalMensalDiesel;
      accElec += totalMensalElec;
    }

    const economiaLiquida = (economiaMensal * meses) - (precoEletrico - precoDiesel) * frota;

    // Maintenance detail rows
    const manutRows = [
      { item: "Óleo motor + filtro de óleo", diesel: mOleoMotor, elec: 0, eliminado: true, intervalo: "10.000 km" },
      { item: "Filtro de combustível", diesel: mFiltroComb, elec: 0, eliminado: true, intervalo: "15.000 km" },
      { item: "Filtro de ar", diesel: mFiltroAr, elec: 0, eliminado: true, intervalo: "25.000 km" },
      { item: "Sistema SCR / ARLA", diesel: mSCR, elec: 0, eliminado: true, intervalo: "Fixo" },
      { item: "Correia / tensor", diesel: mCorreia, elec: 0, eliminado: true, intervalo: "60.000 km" },
      { item: "Kit embreagem", diesel: mEmbreagem, elec: 0, eliminado: true, intervalo: "80.000 km" },
      { item: "Câmbio (óleo + manutenção)", diesel: mCambio, elec: 0, eliminado: true, intervalo: "40.000 km" },
      { item: "Regulagem de válvulas", diesel: mValvulas, elec: 0, eliminado: true, intervalo: "40.000 km" },
      { item: "Freios (pastilhas/lonas)", diesel: mFreiosDiesel, elec: mFreiosElec, eliminado: false },
      { item: "Revisão / diagnóstico", diesel: mRevisaoDiesel, elec: mRevisaoElec, eliminado: false },
      { item: "Arrefecimento", diesel: mArrefDiesel, elec: mArrefElec, eliminado: false },
    ];

    // Bar chart data
    const barData = [
      { cat: "Combustível / Energia", diesel: custoCombustivel + custoArla, eletrico: custoEnergia },
      { cat: "ARLA 32", diesel: custoArla, eletrico: 0 },
      { cat: "Manutenção", diesel: manutDieselEliminados + mRevisaoDiesel, eletrico: mRevisaoElec },
      { cat: "Freios", diesel: mFreiosDiesel, eletrico: mFreiosElec },
    ];

    return {
      custoCombustivel, custoArla, custoEnergia,
      manutDieselTotal, manutElecTotal,
      totalMensalDiesel, totalMensalElec,
      economiaMensal, chartData, payback, economiaLiquida,
      manutRows, barData,
      energiaDieselTotal: custoCombustivel + custoArla,
      litrosDiesel,
    };
  }, [precoEletrico, precoDiesel, kmMes, frota, meses, precoDieselL, precoEnergia, precoArla, consumoDieselKmL, consumoEletricoKwhKm]);

  const economiaAnual = calc.economiaMensal * 12;
  const showFrota = frota > 1;

  return (
    <div className="min-h-screen" style={{ background: C.bg, fontFamily: "'Inter', 'IBM Plex Sans', system-ui, sans-serif" }}>
      <Navbar />
      {/* ── Header ── */}
      <header className="px-6 md:px-12 py-5 border-b" style={{ borderColor: C.brand, borderBottomWidth: 2 }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoFotonLavoro} alt="Lavoro Foton" className="h-10 md:h-12" />
            <div className="h-8 w-px" style={{ background: C.border }} />
            <div>
              <h1 className="text-xl md:text-2xl font-semibold" style={{ color: C.brand }}>
                Calculadora TCO
              </h1>
              <p className="text-xs md:text-sm mt-0.5" style={{ color: C.textSecondary }}>
                Custo Total de Propriedade · Elétrico vs Diesel
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-10">
        {/* ── Seção 2: Inputs ── */}
        <Section title="Parâmetros da Simulação">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
            {/* Bloco 1 */}
            <div className="sm:col-span-2 lg:col-span-4">
              <BlockLabel>Aquisição</BlockLabel>
            </div>
            <InputField label="Preço veículo elétrico" value={precoEletrico} onChange={setPrecoEletrico} prefix="R$" />
            <InputField label="Preço veículo diesel" value={precoDiesel} onChange={setPrecoDiesel} prefix="R$" />

            {/* Bloco 2 */}
            <div className="sm:col-span-2 lg:col-span-4 mt-4">
              <BlockLabel>Operação</BlockLabel>
            </div>
            <InputField label="Km rodados / mês" value={kmMes} onChange={setKmMes} suffix="km" min={100} />
            <InputField label="Veículos na frota" value={frota} onChange={setFrota} min={1} max={100} />
            <InputField label="Período de análise" value={meses} onChange={setMeses} suffix="meses" min={12} max={120} />

            {/* Perfil de operação */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-[1.2px] font-medium" style={{ color: C.textSecondary }}>
                Perfil de operação
              </label>
              <div className="flex border rounded-md overflow-hidden" style={{ borderColor: C.border }}>
                {Object.keys(PROFILES).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePerfilChange(p)}
                    className="flex-1 text-sm py-2 px-3 font-medium transition-colors duration-200"
                    style={{
                      background: !perfilCustom && perfil === p ? C.brand : "white",
                      color: !perfilCustom && perfil === p ? "white" : C.textSecondary,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              {perfilCustom && (
                <span className="text-[10px] mt-0.5" style={{ color: C.accent }}>Personalizado</span>
              )}
            </div>

            {/* Bloco 3 */}
            <div className="sm:col-span-2 lg:col-span-4 mt-4">
              <BlockLabel>Combustível & Energia</BlockLabel>
            </div>
            <CentavosInput label="Preço do diesel" value={precoDieselL} onChange={setPrecoDieselL} prefix="R$" suffix="/L" />
            <CentavosInput label="Preço da energia" value={precoEnergia} onChange={setPrecoEnergia} prefix="R$" suffix="/kWh" />
            <CentavosInput label="Preço do ARLA 32" value={precoArla} onChange={setPrecoArla} prefix="R$" suffix="/L" />

            {/* Bloco 4 */}
            <div className="sm:col-span-2 lg:col-span-4 mt-4">
              <BlockLabel>Consumo</BlockLabel>
            </div>
            <CentavosInput label="Consumo diesel" value={consumoDieselKmL} onChange={handleConsumoDiesel} suffix="km/L" />
            <CentavosInput label="Consumo elétrico" value={consumoEletricoKwhKm} onChange={handleConsumoEletrico} suffix="kWh/km" />
          </div>
        </Section>

        {/* ── Seção 3: KPIs ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            label="Economia mensal"
            value={fmt(calc.economiaMensal)}
            sub={showFrota ? `Total frota: ${fmt(calc.economiaMensal)}` : undefined}
            color={C.green}
          />
          <KPICard
            label="Economia anual"
            value={fmt(economiaAnual)}
            sub={showFrota ? `Total frota: ${fmt(economiaAnual)}` : undefined}
            color={C.green}
          />
          <KPICard
            label="Payback"
            value={calc.payback > 0 ? `~${calc.payback} meses` : `> ${meses} meses`}
            sub={calc.payback > 0 ? `≈ ${(calc.payback / 12).toFixed(1)} anos` : "Dentro do período analisado"}
            color={C.accent}
            highlight
          />
        </div>

        {/* ── Seção 4: Gráfico Acumulado ── */}
        <Section title="Custo Acumulado no Período">
          <div className="w-full h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calc.chartData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.green} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={C.green} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.red} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={C.red} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 12, fill: C.textSecondary }}
                  tickFormatter={(v) => v % 12 === 0 && v > 0 ? `${v / 12}a` : ""}
                  interval={0}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: C.textSecondary }}
                  tickFormatter={fmtShort}
                  width={70}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone" dataKey="eletrico" name="Elétrico Foton"
                  stroke={C.green} strokeWidth={2} fill="url(#fillGreen)"
                />
                <Area
                  type="monotone" dataKey="diesel" name="Diesel Convencional"
                  stroke={C.red} strokeWidth={2} fill="url(#fillRed)"
                />
                {calc.payback > 0 && (
                  <ReferenceDot
                    x={calc.payback}
                    y={calc.chartData[calc.payback]?.diesel}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-8 mt-3 text-sm" style={{ color: C.textSecondary }}>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: C.green }} />
              Elétrico Foton
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: C.red }} />
              Diesel Convencional
            </span>
          </div>
          {calc.payback > 0 && (
            <div className="text-center mt-2">
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded"
                style={{ background: C.accent + "20", color: C.accent }}
              >
                Payback no mês {calc.payback}
              </span>
            </div>
          )}
        </Section>

        {/* ── Seção 5: Tabela Combustível/Energia ── */}
        <Section title="Detalhamento Combustível / Energia (mensal)">
          <TableWrapper>
            <thead>
              <tr style={{ background: C.cardBg }}>
                <Th align="left">Item</Th>
                <Th>Diesel</Th>
                <Th>Elétrico</Th>
                <Th>Economia</Th>
              </tr>
            </thead>
            <tbody>
              <TRow
                item="Diesel"
                diesel={calc.custoCombustivel}
                elec="—"
                economia=""
              />
              <TRow
                item="ARLA 32"
                diesel={calc.custoArla}
                elecBadge={<EliminadoBadge />}
                economia={fmt(calc.custoArla)}
                economiaBadge
              />
              <TRow
                item="Energia elétrica"
                diesel="—"
                elec={calc.custoEnergia}
                economia=""
              />
              <tr className="font-semibold" style={{ borderTop: `2px solid ${C.border}` }}>
                <Td align="left">Subtotal energia</Td>
                <Td>{fmt(calc.energiaDieselTotal)}</Td>
                <Td>{fmt(calc.custoEnergia)}</Td>
                <Td>
                  <EconomiaBadge text={fmt(calc.energiaDieselTotal - calc.custoEnergia)} />
                </Td>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>

        {/* ── Seção 6: Tabela Manutenção ── */}
        <Section title="Detalhamento Manutenção (mensal amortizado)">
          <TableWrapper>
            <thead>
              <tr style={{ background: C.cardBg }}>
                <Th align="left">Item</Th>
                <Th>Diesel</Th>
                <Th>Elétrico</Th>
                <Th>Economia</Th>
              </tr>
            </thead>
            <tbody>
              {calc.manutRows.map((r) => (
                <tr key={r.item} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <Td align="left">
                    {r.item}
                    {r.intervalo && (
                      <span className="text-[10px] ml-1" style={{ color: C.textSecondary }}>
                        ({r.intervalo})
                      </span>
                    )}
                  </Td>
                  <Td>{fmt2(r.diesel)}</Td>
                  <Td>
                    {r.eliminado ? <EliminadoBadge /> : fmt2(r.elec)}
                  </Td>
                  <Td>
                    {r.eliminado ? (
                      <EconomiaBadge text={fmt2(r.diesel)} />
                    ) : r.diesel - r.elec > 0 ? (
                      <EconomiaBadge text={fmt2(r.diesel - r.elec)} />
                    ) : r.diesel - r.elec < 0 ? (
                      <span className="text-sm" style={{ color: C.red }}>+{fmt2(Math.abs(r.diesel - r.elec))}</span>
                    ) : "—"}
                  </Td>
                </tr>
              ))}
              <tr className="font-semibold" style={{ borderTop: `2px solid ${C.border}` }}>
                <Td align="left">Subtotal manutenção</Td>
                <Td>{fmt(calc.manutDieselTotal)}</Td>
                <Td>{fmt(calc.manutElecTotal)}</Td>
                <Td>
                  <EconomiaBadge text={fmt(calc.manutDieselTotal - calc.manutElecTotal)} />
                </Td>
              </tr>
            </tbody>
          </TableWrapper>
        </Section>

        {/* ── Seção 7: Tabela Consolidada ── */}
        <Section title="Resumo Consolidado">
          <TableWrapper>
            <thead>
              <tr style={{ background: C.cardBg }}>
                <Th align="left">Período</Th>
                <Th>Economia Combustível</Th>
                <Th>Economia Manutenção</Th>
                <Th>Economia Total</Th>
              </tr>
            </thead>
            <tbody>
              <TRow
                item="Mensal (por veículo)"
                diesel={calc.energiaDieselTotal - calc.custoEnergia}
                elec={calc.manutDieselTotal - calc.manutElecTotal}
                economiaVal={calc.economiaMensal}
                isConsolidado
              />
              <TRow
                item="Anual (por veículo)"
                diesel={(calc.energiaDieselTotal - calc.custoEnergia) * 12}
                elec={(calc.manutDieselTotal - calc.manutElecTotal) * 12}
                economiaVal={economiaAnual}
                isConsolidado
              />
              <TRow
                item={`${meses} meses (por veículo)`}
                diesel={(calc.energiaDieselTotal - calc.custoEnergia) * meses}
                elec={(calc.manutDieselTotal - calc.manutElecTotal) * meses}
                economiaVal={calc.economiaMensal * meses}
                isConsolidado
              />
              {showFrota && (
                <>
                  <tr style={{ borderTop: `2px solid ${C.border}` }}>
                    <Td align="left" className="font-semibold">Mensal (frota {frota}x)</Td>
                    <Td>{fmt(calc.energiaDieselTotal - calc.custoEnergia)}</Td>
                    <Td>{fmt(calc.manutDieselTotal - calc.manutElecTotal)}</Td>
                    <Td className="font-semibold">{fmt(calc.economiaMensal)}</Td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <Td align="left" className="font-semibold">{meses} meses (frota {frota}x)</Td>
                    <Td>{fmt((calc.energiaDieselTotal - calc.custoEnergia) * meses)}</Td>
                    <Td>{fmt((calc.manutDieselTotal - calc.manutElecTotal) * meses)}</Td>
                    <Td className="font-semibold">{fmt(calc.economiaMensal * meses)}</Td>
                  </tr>
                </>
              )}
            </tbody>
          </TableWrapper>

          {/* Economia líquida */}
          <div
            className="mt-6 p-6 rounded-lg border-2 text-center"
            style={{ borderColor: calc.economiaLiquida > 0 ? C.green : C.red, background: calc.economiaLiquida > 0 ? C.greenBg : C.redBg }}
          >
            <p className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: C.textSecondary }}>
              Economia líquida no período ({meses} meses){showFrota ? ` · Frota de ${frota} veículos` : ""}
            </p>
            <p className="text-3xl font-semibold" style={{ color: calc.economiaLiquida > 0 ? C.green : C.red }}>
              {fmt(calc.economiaLiquida)}
            </p>
            <p className="text-xs mt-1" style={{ color: C.textSecondary }}>
              Economia operacional ({fmt(calc.economiaMensal * meses)}) − Diferença de aquisição ({fmt((precoEletrico - precoDiesel) * frota)})
            </p>
          </div>
        </Section>

        {/* ── Seção 8: Bar Chart ── */}
        <div>
          <button
            onClick={() => setShowDetalhamento(!showDetalhamento)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border transition-colors duration-200"
            style={{ borderColor: C.border, color: C.brand }}
          >
            {showDetalhamento ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Detalhamento mensal por categoria
          </button>

          {showDetalhamento && (
            <div className="mt-4 p-6 border rounded-lg" style={{ borderColor: C.border, background: C.white }}>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calc.barData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="cat" tick={{ fontSize: 11, fill: C.textSecondary }} />
                    <YAxis tick={{ fontSize: 12, fill: C.textSecondary }} tickFormatter={fmtShort} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="diesel" name="Diesel" fill={C.red} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="eletrico" name="Elétrico" fill={C.green} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-8 mt-3 text-sm" style={{ color: C.textSecondary }}>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: C.green }} />
                  Elétrico
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ background: C.red }} />
                  Diesel
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Seção 9: Rodapé premissas ── */}
        <footer className="pt-8 pb-12 border-t" style={{ borderColor: C.border }}>
          <div className="space-y-1 text-xs" style={{ color: C.textSecondary, lineHeight: 1.7 }}>
            <p className="font-semibold">Premissas e Metodologia</p>
            <p>Valores de referência para simulação comercial. Resultados não constituem garantia de performance.</p>
            <p>Manutenção elétrica ~60-70% menor: sem motor combustão, ARLA 32, câmbio, embreagem, correia, filtros de óleo e combustível.</p>
            <p>Custos amortizados pela quilometragem mensal informada. Valores reais variam conforme operação e condições de uso.</p>
            <p>Garantias eAumark 9T: Veículo 3 anos / 100.000 km · Bateria 8 anos / 400.000 km (CATL LFP).</p>
            <div className="flex items-center gap-3 mt-4">
              <img src={logoFotonLavoro} alt="Lavoro Foton" className="h-8 brightness-0 opacity-40" />
              <span className="text-xs font-semibold" style={{ color: C.textSecondary }}>Contagem/MG</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════════════════════════════════
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1" style={{ background: C.border }} />
        <h2
          className="text-[13px] uppercase tracking-[1.5px] font-semibold whitespace-nowrap"
          style={{ color: C.brand }}
        >
          {title}
        </h2>
        <div className="h-px flex-1" style={{ background: C.border }} />
      </div>
      {children}
    </section>
  );
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[1.5px] font-semibold pb-1 border-b mb-2"
      style={{ color: C.brand, borderColor: C.brand + "30" }}>
      {children}
    </p>
  );
}

function KPICard({
  label, value, sub, color, highlight,
}: {
  label: string; value: string; sub?: string; color: string; highlight?: boolean;
}) {
  return (
    <div
      className="rounded-lg p-6 border"
      style={{
        background: C.cardBg,
        borderColor: highlight ? C.accent : C.border,
        borderWidth: highlight ? 2 : 1,
      }}
    >
      <p className="text-[11px] uppercase tracking-[1.2px] font-medium mb-2" style={{ color: C.textSecondary }}>
        {label}
      </p>
      <p className="text-2xl font-semibold" style={{ color: highlight ? C.accent : color }}>
        {value}
      </p>
      {sub && <p className="text-xs mt-1" style={{ color: C.textSecondary }}>{sub}</p>}
    </div>
  );
}

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto border rounded-lg" style={{ borderColor: C.border }}>
      <table className="w-full text-sm" style={{ color: C.textPrimary }}>
        {children}
      </table>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      className={`px-4 py-3 text-[11px] uppercase tracking-[1px] font-semibold ${align === "left" ? "text-left" : "text-right"}`}
      style={{ color: C.textSecondary }}
    >
      {children}
    </th>
  );
}

function Td({ children, align, className }: { children: React.ReactNode; align?: "left"; className?: string }) {
  return (
    <td className={`px-4 py-3 ${align === "left" ? "text-left" : "text-right"} ${className || ""}`}>
      {children}
    </td>
  );
}

function TRow({
  item, diesel, elec, economia, elecBadge, economiaBadge, economiaVal, isConsolidado,
}: {
  item: string; diesel?: number | string; elec?: number | string | React.ReactNode;
  economia?: string; elecBadge?: React.ReactNode; economiaBadge?: boolean;
  economiaVal?: number; isConsolidado?: boolean;
}) {
  return (
    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
      <Td align="left">{item}</Td>
      <Td>{typeof diesel === "number" ? (isConsolidado ? fmt(diesel) : fmt2(diesel)) : diesel}</Td>
      <Td>{elecBadge || (typeof elec === "number" ? (isConsolidado ? fmt(elec) : fmt2(elec)) : elec)}</Td>
      <Td>
        {economiaVal !== undefined ? (
          <span className="font-semibold" style={{ color: economiaVal > 0 ? C.green : C.red }}>
            {fmt(economiaVal)}
          </span>
        ) : economiaBadge && economia ? (
          <EconomiaBadge text={economia} />
        ) : (
          economia || ""
        )}
      </Td>
    </tr>
  );
}

// Placeholder for reference dot (Recharts doesn't have built-in annotation easily)
function ReferenceDot({ x, y }: { x: number; y: number }) {
  return null; // Payback badge is shown below the chart instead
}
