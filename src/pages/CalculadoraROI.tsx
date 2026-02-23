import { useState, useMemo, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { MessageCircle, Check, ChevronRight, Instagram, Linkedin, Fuel, User, Wrench, Trophy, ArrowLeft, Truck, Calculator, Package, Route, Gauge, DollarSign, Settings, CreditCard, Info, Scale } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoFotonLavoro from "@/assets/logo-foton-lavoro-transparente.png";

const WHATSAPP_BASE = "https://wa.me/5531996970656?text=";

const caminhoesConcorrentes = [
  { nome: "VW Delivery 11.180", cargaUtil: 7380 },
  { nome: "MB Accelo 1117", cargaUtil: 7082 },
  { nome: "Iveco Tector 11-190", cargaUtil: 7005 },
  { nome: "Outro caminhão", cargaUtil: 7200 },
];

const CARGA_UTIL_FOTON = 8326; // carga útil Foton Aumark S 1217

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Input field component
function InputField({ 
  label, icon: Icon, value, onChange, hint, prefix, step 
}: { 
  label: string; icon: React.ElementType; value: number; onChange: (v: number) => void; hint: string; prefix?: string; step?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <Icon size={16} className="text-[#F5A623]" />
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">{prefix}</span>
        )}
        <input
          type="number"
          min={0}
          step={step || "1"}
          value={value || ""}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange(isNaN(v) || v < 0 ? 0 : v);
          }}
          className={`w-full bg-white/[0.06] border border-white/15 rounded-xl py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5A623]/60 focus:ring-1 focus:ring-[#F5A623]/30 transition-all ${prefix ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
      <p className="text-white/40 text-xs">{hint}</p>
    </div>
  );
}

// Result block component
function ResultBlock({ 
  title, borderColor, children 
}: { 
  title: string; borderColor: string; children: React.ReactNode;
}) {
  return (
    <div className={`bg-[#0A1F3D] border-l-4 rounded-xl p-5 md:p-6`} style={{ borderLeftColor: borderColor }}>
      <h4 className="text-white font-bold text-base mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function CalculadoraROI() {
  // Inputs state
  const [caminhaoIdx, setCaminhaoIdx] = useState(0);
  const [cargaMensal, setCargaMensal] = useState(100000);
  const [distanciaViagem, setDistanciaViagem] = useState(200);
  const [consumoAtual, setConsumoAtual] = useState(8.5);
  const [precoDiesel, setPrecoDiesel] = useState(6.30);
  const [custoMotorista, setCustoMotorista] = useState(4500);
  const [custoManutencao, setCustoManutencao] = useState(2500);
  const [valorUsado, setValorUsado] = useState(80000);
  const [valorFoton, setValorFoton] = useState(275000);
  const [pesoImplemento, setPesoImplemento] = useState(1000);
  const [parcelaFinanciamento, setParcelaFinanciamento] = useState(0);

  const { ref: paybackRef, inView: paybackInView } = useInView(0.3);

  // Calculations
  const calc = useMemo(() => {
    const cargaConcorrenteBruta = caminhoesConcorrentes[caminhaoIdx].cargaUtil;
    const cargaUtilLiquidaFoton = Math.max(1, CARGA_UTIL_FOTON - (pesoImplemento || 0));
    const cargaUtilLiquidaConcorrente = Math.max(1, cargaConcorrenteBruta - (pesoImplemento || 0));

    const viagensConcorrente = Math.ceil((cargaMensal || 1) / cargaUtilLiquidaConcorrente);
    const viagensFoton = Math.ceil((cargaMensal || 1) / cargaUtilLiquidaFoton);
    const viagensEconomizadas = Math.max(0, viagensConcorrente - viagensFoton);

    // Nova lógica de consumo Foton
    let consumoFoton: number;
    const ca = consumoAtual || 1;
    if (ca <= 6.5) {
      consumoFoton = ca * 1.23;
    } else {
      consumoFoton = Math.max(ca * 1.20, 6.5);
    }

    const kmConcorrente = viagensConcorrente * (distanciaViagem || 1);
    const kmFoton = viagensFoton * (distanciaViagem || 1);
    const custoCombConcorrente = (kmConcorrente / (consumoAtual || 1)) * (precoDiesel || 1);
    const custoCombFoton = (kmFoton / consumoFoton) * (precoDiesel || 1);
    const economiaCombMensal = Math.max(0, custoCombConcorrente - custoCombFoton);
    const economiaCombAnual = economiaCombMensal * 12;

    const custoPorViagemMotorista = viagensConcorrente > 0 ? (custoMotorista || 0) / viagensConcorrente : 0;
    const economiaMotoristaMensal = viagensEconomizadas * custoPorViagemMotorista;
    const economiaMotoristaAnual = economiaMotoristaMensal * 12;

    const economiaManutMensal = (custoManutencao || 0) * 0.40;
    const economiaManutAnual = economiaManutMensal * 12;

    const totalMensal = economiaCombMensal + economiaMotoristaMensal + economiaManutMensal;
    const totalAnual = totalMensal * 12;

    const investimentoLiquido = Math.max(0, (valorFoton || 0) - (valorUsado || 0));
    const paybackMeses = totalMensal > 0 ? Math.ceil(investimentoLiquido / totalMensal) : 999;

    // Financiamento
    const parcela = parcelaFinanciamento || 0;
    const economiaLiquidaMensal = totalMensal - parcela;
    const economiaLiquidaAnual = economiaLiquidaMensal * 12;
    const paybackFinanciado = economiaLiquidaMensal > 0 ? Math.ceil(investimentoLiquido / economiaLiquidaMensal) : 999;

    return {
      viagensConcorrente, viagensFoton, viagensEconomizadas,
      cargaUtilLiquidaFoton, cargaUtilLiquidaConcorrente,
      consumoFoton,
      custoCombConcorrente, custoCombFoton, economiaCombMensal, economiaCombAnual,
      custoPorViagemMotorista, economiaMotoristaMensal, economiaMotoristaAnual,
      economiaManutMensal, economiaManutAnual,
      totalMensal, totalAnual,
      investimentoLiquido, paybackMeses,
      economiaLiquidaMensal, economiaLiquidaAnual, paybackFinanciado,
    };
  }, [caminhaoIdx, cargaMensal, distanciaViagem, consumoAtual, precoDiesel, custoMotorista, custoManutencao, valorUsado, valorFoton, pesoImplemento, parcelaFinanciamento]);

  const paybackCounter = useCountUp(paybackInView ? calc.paybackMeses : 0, 1200, paybackInView);

  const whatsappMsg = encodeURIComponent(
    `Olá! Fiz a simulação na calculadora da Lavoro Foton e vi que posso economizar ${formatBRL(calc.totalAnual)} por ano trocando para o Foton Aumark S 1217. Podem me ajudar com mais detalhes?`
  );

  return (
    <>
      <Helmet>
        <title>Calculadora ROI Foton Aumark S 1217 | Simule sua economia | Lavoro Foton MG</title>
        <meta name="description" content="Simule em tempo real quanto você economiza trocando para o Foton Aumark S 1217. Combustível, motorista e manutenção. Ferramenta exclusiva Lavoro Foton, Minas Gerais." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1F3D] text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>

        {/* ===== SEÇÃO 1 — HERO ===== */}
        <section className="pt-16 pb-10 md:pt-20 md:pb-14 bg-[#0A1F3D]">
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
            <span className="inline-block bg-[#F5A623]/15 text-[#F5A623] text-sm font-bold px-5 py-2 rounded-full mb-6">
              🧮 Ferramenta Exclusiva Lavoro Foton
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Descubra quanto o Aumark S 1217 <span className="text-[#F5A623]">economiza na sua operação</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
              Preencha os dados da sua frota e veja em tempo real quanto você economiza por mês e por ano trocando para o Foton Aumark S 1217.
            </p>
          </div>
        </section>

        {/* ===== SEÇÃO 2 — CALCULADORA ===== */}
        <section className="pb-20 md:pb-28 bg-[#0A1F3D]">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 lg:gap-8">

              {/* COLUNA ESQUERDA — INPUTS */}
              <div className="bg-[#0D2647] rounded-2xl p-6 md:p-8 border border-white/10 h-fit lg:sticky lg:top-6">
                <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <Calculator size={22} className="text-[#F5A623]" />
                  Dados da sua operação
                </h3>

                <div className="space-y-5">
                  {/* Dropdown caminhão */}
                  <div className="space-y-1.5">
                    <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                      <Truck size={16} className="text-[#F5A623]" />
                      Caminhão atual
                    </label>
                    <select
                      value={caminhaoIdx}
                      onChange={(e) => setCaminhaoIdx(Number(e.target.value))}
                      className="w-full bg-white/[0.06] border border-white/15 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#F5A623]/60 focus:ring-1 focus:ring-[#F5A623]/30 transition-all appearance-none"
                    >
                      {caminhoesConcorrentes.map((c, i) => (
                        <option key={i} value={i} className="bg-[#0D2647] text-white">
                          {c.nome} ({c.cargaUtil.toLocaleString("pt-BR")} kg)
                        </option>
                      ))}
                    </select>
                  </div>

                  <InputField label="Carga que transporta por mês (kg)" icon={Package} value={cargaMensal} onChange={setCargaMensal} hint="Ex: 100000" />
                  <InputField label="Distância média por viagem (km)" icon={Route} value={distanciaViagem} onChange={setDistanciaViagem} hint="Ida e volta incluídos" />
                  <InputField label="Consumo atual do seu caminhão (km/litro)" icon={Gauge} value={consumoAtual} onChange={setConsumoAtual} hint="Média real do seu caminhão" step="0.1" />
                  <InputField label="Peso do implemento (kg)" icon={Scale} value={pesoImplemento} onChange={setPesoImplemento} hint="Ex: baú, carroceria, grade. Descontado da carga útil." />
                  <InputField label="Preço do diesel (R$/litro)" icon={Fuel} value={precoDiesel} onChange={setPrecoDiesel} hint="Preço médio que você abastece" prefix="R$" step="0.01" />
                  <InputField label="Custo mensal com motorista (R$)" icon={User} value={custoMotorista} onChange={setCustoMotorista} hint="Salário + encargos do motorista" prefix="R$" />
                  <InputField label="Custo mensal com manutenção (R$)" icon={Wrench} value={custoManutencao} onChange={setCustoManutencao} hint="Média dos últimos 6 meses" prefix="R$" />
                  <InputField label="Valor estimado do seu caminhão usado (R$)" icon={CreditCard} value={valorUsado} onChange={setValorUsado} hint="Para calcular o investimento líquido" prefix="R$" />
                  <InputField label="Parcela mensal do financiamento (R$)" icon={DollarSign} value={parcelaFinanciamento} onChange={setParcelaFinanciamento} hint="Opcional — se financiar o Foton" prefix="R$" />
                </div>
              </div>

              {/* COLUNA DIREITA — RESULTADOS */}
              <div className="space-y-5">

                {/* R1 — Viagens */}
                <ResultBlock title="🚛 Viagens por mês" borderColor="#F5A623">
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-red-500/15 text-red-400 text-sm font-medium px-4 py-2 rounded-full">
                      Seu caminhão: {calc.viagensConcorrente} viagens
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-[#22C55E]/15 text-[#22C55E] text-sm font-medium px-4 py-2 rounded-full">
                      Foton Aumark S 1217: {calc.viagensFoton} viagens
                    </span>
                  </div>
                  <p className="text-[#22C55E] font-bold text-lg">
                    ✅ {calc.viagensEconomizadas} viagens a menos por mês
                  </p>
                </ResultBlock>

                {/* R2 — Combustível */}
                <ResultBlock title="⛽ Economia em combustível" borderColor="#22C55E">
                  <p className="text-white/70 text-sm mb-1">
                    Seu gasto atual: <span className="text-white font-medium">{formatBRL(calc.custoCombConcorrente)}/mês</span>
                  </p>
                  <p className="text-white/70 text-sm mb-1">
                    Com Foton ({calc.consumoFoton.toFixed(1)} km/l): <span className="text-[#22C55E] font-medium">{formatBRL(calc.custoCombFoton)}/mês</span>
                  </p>
                  <p className="text-[#22C55E] font-bold text-lg mb-2">
                    💰 Você economiza {formatBRL(calc.economiaCombMensal)}/mês | {formatBRL(calc.economiaCombAnual)}/ano
                  </p>
                  <p className="text-white/40 text-xs italic">
                    Estimativa baseada no case COOPMETRO — economia real pode variar conforme perfil de operação.
                  </p>
                </ResultBlock>

                {/* R3 — Motorista */}
                <ResultBlock title="👷 Economia com motorista" borderColor="#60A5FA">
                  <p className="text-white/70 text-sm mb-3">
                    {calc.viagensEconomizadas} viagens a menos × {formatBRL(calc.custoPorViagemMotorista)}/viagem
                  </p>
                  <p className="text-[#22C55E] font-bold text-lg">
                    💰 {formatBRL(calc.economiaMotoristaMensal)}/mês | {formatBRL(calc.economiaMotoristaAnual)}/ano
                  </p>
                </ResultBlock>

                {/* R4 — Manutenção */}
                <TooltipProvider>
                  <ResultBlock title="🔧 Economia em manutenção" borderColor="#F97316">
                    <div className="flex items-start gap-2 mb-3">
                      <p className="text-white/70 text-sm">
                        Com 3 anos de garantia sem limite de km, estimativa de redução de 40% nos custos de manutenção
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-white/40 hover:text-[#F5A623] transition-colors mt-0.5 shrink-0">
                            <Info size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Estimativa baseada na cobertura da garantia Foton 3 anos/km ilimitados — cobre motor, câmbio e componentes principais.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-[#22C55E] font-bold text-lg">
                      💰 {formatBRL(calc.economiaManutMensal)}/mês | {formatBRL(calc.economiaManutAnual)}/ano
                    </p>
                  </ResultBlock>
                </TooltipProvider>

                {/* R5 — Total + Payback */}
                <div ref={paybackRef} className="bg-gradient-to-br from-[#0A1F3D] to-[#0D3D2A] border-2 border-[#F5A623] rounded-2xl p-6 md:p-8">
                  <h4 className="text-white font-bold text-lg mb-5">
                    🏆 Sua economia total com o Foton Aumark S 1217:
                  </h4>

                  {/* Summary table */}
                  <div className="overflow-hidden rounded-xl border border-white/10 mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-white/[0.05]">
                          <th className="text-left py-3 px-4 text-white/60 font-medium">Item</th>
                          <th className="text-right py-3 px-4 text-white/60 font-medium">Mensal</th>
                          <th className="text-right py-3 px-4 text-white/60 font-medium">Anual</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-white/10">
                          <td className="py-3 px-4 text-white/80">Combustível</td>
                          <td className="py-3 px-4 text-right text-white/80">{formatBRL(calc.economiaCombMensal)}</td>
                          <td className="py-3 px-4 text-right text-white/80">{formatBRL(calc.economiaCombAnual)}</td>
                        </tr>
                        <tr className="border-t border-white/10">
                          <td className="py-3 px-4 text-white/80">Motorista</td>
                          <td className="py-3 px-4 text-right text-white/80">{formatBRL(calc.economiaMotoristaMensal)}</td>
                          <td className="py-3 px-4 text-right text-white/80">{formatBRL(calc.economiaMotoristaAnual)}</td>
                        </tr>
                        <tr className="border-t border-white/10">
                          <td className="py-3 px-4 text-white/80">Manutenção</td>
                          <td className="py-3 px-4 text-right text-white/80">{formatBRL(calc.economiaManutMensal)}</td>
                          <td className="py-3 px-4 text-right text-white/80">{formatBRL(calc.economiaManutAnual)}</td>
                        </tr>
                        <tr className="border-t-2 border-[#F5A623]/40 bg-[#22C55E]/10">
                          <td className="py-3 px-4 text-white font-bold">ECONOMIA BRUTA</td>
                          <td className="py-3 px-4 text-right text-[#22C55E] font-bold">{formatBRL(calc.totalMensal)}</td>
                          <td className="py-3 px-4 text-right text-[#22C55E] font-bold">{formatBRL(calc.totalAnual)}</td>
                        </tr>
                        {parcelaFinanciamento > 0 && (
                          <>
                            <tr className="border-t border-white/10">
                              <td className="py-3 px-4 text-red-400">(-) Parcela financiamento</td>
                              <td className="py-3 px-4 text-right text-red-400">{formatBRL(parcelaFinanciamento)}</td>
                              <td className="py-3 px-4 text-right text-red-400">{formatBRL(parcelaFinanciamento * 12)}</td>
                            </tr>
                            <tr className="border-t-2 border-[#F5A623]/40 bg-[#22C55E]/10">
                              <td className="py-3 px-4 text-white font-bold">ECONOMIA LÍQUIDA</td>
                              <td className="py-3 px-4 text-right font-bold" style={{ color: calc.economiaLiquidaMensal >= 0 ? '#22C55E' : '#EF4444' }}>{formatBRL(calc.economiaLiquidaMensal)}</td>
                              <td className="py-3 px-4 text-right font-bold" style={{ color: calc.economiaLiquidaAnual >= 0 ? '#22C55E' : '#EF4444' }}>{formatBRL(calc.economiaLiquidaAnual)}</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <hr className="border-[#F5A623]/40 mb-6" />

                  {/* Payback */}
                  <div className="text-center">
                    <p className="text-[#F5A623] font-bold transition-all duration-300" style={{ fontSize: "clamp(40px, 10vw, 56px)" }}>
                      {paybackCounter} meses
                    </p>
                    <p className="text-white text-lg font-medium mb-2">para o Foton pagar o investimento</p>
                    <p className="text-white/60 text-sm mb-4">
                      A partir do {calc.paybackMeses + 1}º mês, cada real economizado é lucro puro na sua operação.
                    </p>

                    {parcelaFinanciamento > 0 && (
                      <div className="bg-white/[0.05] border border-white/10 rounded-xl p-4 mb-4">
                        <p className="text-white/70 text-sm mb-1">Payback considerando financiamento:</p>
                        <p className="text-[#F5A623] font-bold text-2xl">
                          {calc.paybackFinanciado >= 999 ? "∞" : `${calc.paybackFinanciado} meses`}
                        </p>
                        {calc.economiaLiquidaMensal <= 0 && (
                          <p className="text-red-400 text-xs mt-1">⚠️ A parcela supera a economia — considere renegociar o financiamento.</p>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                      <span className="text-white/50 text-xs">Ajustar valor do Foton:</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">R$</span>
                        <input
                          type="number"
                          min={0}
                          value={valorFoton || ""}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            setValorFoton(isNaN(v) || v < 0 ? 0 : v);
                          }}
                          className="w-40 bg-white/[0.06] border border-white/15 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#F5A623]/60 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* R6 — CTA */}
                <div className="text-center py-6">
                  <p className="text-white text-lg font-bold mb-1">
                    Sua economia projetada: <span className="text-[#22C55E]">{formatBRL(calc.totalAnual)}/ano</span>
                  </p>
                  <p className="text-white/70 text-sm mb-6">
                    Quer confirmar esses números com um consultor Lavoro Foton?
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={`${WHATSAPP_BASE}${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-base px-8 py-5 rounded-xl font-semibold shadow-lg shadow-[#22C55E]/25 w-full">
                        <MessageCircle size={20} />
                        Enviar simulação pelo WhatsApp
                      </Button>
                    </a>
                    <Link to="/comparativo-aumark-1217" className="w-full sm:w-auto">
                      <button className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 text-base px-8 py-4 rounded-xl font-semibold w-full transition-colors">
                        <ArrowLeft size={18} />
                        Ver comparativo técnico completo
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 3 — PROVA SOCIAL ===== */}
        <section className="py-16 md:py-24 bg-[#0D2647]">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  badge: "✅ Case Real Documentado",
                  badgeColor: "#22C55E",
                  icon: "🏢",
                  text: "No fim de 2025, a COOPMETRO, com mais de 30.000 associados, adquiriu 4 unidades para fazer os primeiros testes com o Foton Aumark 1217 e registrou economia de +20% em combustível em comparação com o VW Delivery 11.180 e ainda com capacidade de carga 1.000 kg superior por viagem.",
                },
                {
                  badge: "📊 Simulação Validada",
                  badgeColor: "#F5A623",
                  icon: "📦",
                  text: "100.000 kg transportados em 14 viagens — vs 17 viagens dos concorrentes. 3 viagens a menos por ciclo.",
                },
                {
                  badge: "🔬 Piloto em Andamento",
                  badgeColor: "#60A5FA",
                  icon: "⚡",
                  text: "ZERO CARBON (LENARGE) — Frotista gigante testando linha elétrica Foton — próximo passo da eficiência",
                },
              ].map((card, i) => (
                <div key={i} className="relative bg-[#0A1F3D] border border-white/10 rounded-2xl p-6 pt-8">
                  <div className="absolute -top-3 left-5">
                    <span className="text-white text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: card.badgeColor }}>
                      {card.badge}
                    </span>
                  </div>
                  <span className="text-3xl block mb-3">{card.icon}</span>
                  <p className="text-white/80 text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 4 — RODAPÉ ===== */}
        <footer className="py-12 border-t border-white/10 bg-[#071528]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img src={logoFotonLavoro} alt="Lavoro Foton" className="h-10 md:h-12" />
                <div className="text-sm text-white/50">
                  <p>Concessionária Oficial Foton em Minas Gerais</p>
                  <p>Atendimento dono a dono</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <a href="https://www.instagram.com/lavorofoton/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F5A623] transition-colors">
                  <Instagram size={22} />
                </a>
                <a href="https://www.linkedin.com/company/lavorofoton/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F5A623] transition-colors">
                  <Linkedin size={22} />
                </a>
                <a href={`${WHATSAPP_BASE}${encodeURIComponent("Olá! Gostaria de mais informações sobre os veículos Foton.")}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#22C55E] transition-colors">
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp flutuante */}
        <a
          href={`${WHATSAPP_BASE}${encodeURIComponent("Olá! Gostaria de mais informações sobre os veículos Foton.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#22C55E] text-white rounded-full p-4 shadow-lg shadow-[#22C55E]/30 hover:bg-[#16A34A] hover:scale-110 transition-all"
          style={{ animation: "bounce-slow 3s ease-in-out infinite" }}
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
