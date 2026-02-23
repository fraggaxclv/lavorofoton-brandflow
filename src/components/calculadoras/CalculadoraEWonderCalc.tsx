import { useState, useMemo } from "react";
import { MessageCircle, Fuel, Wrench, Calculator, Route, Zap, Info, Calendar, Instagram, Linkedin, ArrowLeft, BatteryCharging } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoFotonLavoro from "@/assets/logo-foton-lavoro-transparente.png";

const WHATSAPP_BASE = "https://wa.me/5531996970656?text=";

const veiculosDiesel = [
  { nome: "Kia Bongo K2500", consumo: 9.8 },
  { nome: "Hyundai HR", consumo: 8.5 },
  { nome: "Outro VUC Diesel", consumo: 8.5 },
];

const CONSUMO_ELETRICO_KWH_KM = 0.2326;

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatBRL2(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function InputField({ 
  label, icon: Icon, value, onChange, hint, prefix, step, tooltip
}: { 
  label: string; icon: React.ElementType; value: number; onChange: (v: number) => void; hint: string; prefix?: string; step?: string; tooltip?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <Icon size={16} className="text-[#F5A623]" />
        {label}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="text-white/40 hover:text-[#F5A623] transition-colors">
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
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

function ResultBlock({ 
  title, borderColor, children 
}: { 
  title: string; borderColor: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0A1F3D] border-l-4 rounded-xl p-5 md:p-6" style={{ borderLeftColor: borderColor }}>
      <h4 className="text-white font-bold text-base mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function CalculadoraEWonderCalc() {
  const [veiculoIdx, setVeiculoIdx] = useState(0);
  const [kmDia, setKmDia] = useState(120);
  const [diasMes, setDiasMes] = useState(22);
  const [precoDiesel, setPrecoDiesel] = useState(6.30);
  const [tarifaEletrica, setTarifaEletrica] = useState(0.85);
  const [custoManutencao, setCustoManutencao] = useState(800);

  const calc = useMemo(() => {
    const consumoDiesel = veiculosDiesel[veiculoIdx].consumo;
    const kmMes = (kmDia || 1) * (diasMes || 1);

    const custoCombustivelKm = (precoDiesel || 1) / consumoDiesel;
    const custoEnergiaKm = CONSUMO_ELETRICO_KWH_KM * (tarifaEletrica || 0);

    const manutencaoKmDiesel = (custoManutencao || 0) / kmMes;
    const manutencaoKmEletrico = manutencaoKmDiesel * 0.14;

    const custoTotalKmDiesel = custoCombustivelKm + manutencaoKmDiesel;
    const custoTotalKmEwonder = custoEnergiaKm + manutencaoKmEletrico;

    const custoMensalDiesel = custoTotalKmDiesel * kmMes;
    const custoMensalEwonder = custoTotalKmEwonder * kmMes;

    const custoCombMensal = custoCombustivelKm * kmMes;
    const custoEnergiaMensal = custoEnergiaKm * kmMes;

    const manutMensalDiesel = custoManutencao || 0;
    const manutMensalEwonder = manutencaoKmEletrico * kmMes;

    const economiaMensal = custoMensalDiesel - custoMensalEwonder;
    const economiaAnual = economiaMensal * 12;
    const economia3Anos = economiaAnual * 3;
    const percentualEconomia = custoMensalDiesel > 0 ? (economiaMensal / custoMensalDiesel) * 100 : 0;

    return {
      consumoDiesel, kmMes,
      custoCombustivelKm, custoEnergiaKm,
      custoTotalKmDiesel, custoTotalKmEwonder,
      custoMensalDiesel, custoMensalEwonder,
      custoCombMensal, custoEnergiaMensal,
      manutMensalDiesel, manutMensalEwonder,
      economiaMensal, economiaAnual, economia3Anos, percentualEconomia,
    };
  }, [veiculoIdx, kmDia, diasMes, precoDiesel, tarifaEletrica, custoManutencao]);

  const whatsappMsg = encodeURIComponent(
    `Olá! Fiz a simulação na calculadora do eWonder da Lavoro Foton e vi que posso economizar ${formatBRL(calc.economiaAnual)} por ano trocando meu ${veiculosDiesel[veiculoIdx].nome} para o Foton eWonder. Podem me ajudar com mais detalhes?`
  );

  return (
    <>
      {/* ===== CALCULADORA ===== */}
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
                <div className="space-y-1.5">
                  <label className="text-white/80 text-sm font-medium flex items-center gap-2">
                    <Fuel size={16} className="text-[#F5A623]" />
                    Veículo atual
                  </label>
                  <select
                    value={veiculoIdx}
                    onChange={(e) => setVeiculoIdx(Number(e.target.value))}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#F5A623]/60 focus:ring-1 focus:ring-[#F5A623]/30 transition-all appearance-none"
                  >
                    {veiculosDiesel.map((v, i) => (
                      <option key={i} value={i} className="bg-[#0D2647] text-white">
                        {v.nome} ({v.consumo} km/L)
                      </option>
                    ))}
                  </select>
                  <p className="text-white/40 text-xs">Consumo selecionado: {veiculosDiesel[veiculoIdx].consumo} km/L</p>
                </div>

                <InputField label="Km rodados por dia" icon={Route} value={kmDia} onChange={setKmDia} hint="Média diária da sua operação" />
                <InputField label="Dias úteis por mês" icon={Calendar} value={diasMes} onChange={setDiasMes} hint="Dias que o veículo opera" />
                <InputField label="Preço do diesel (R$/litro)" icon={Fuel} value={precoDiesel} onChange={setPrecoDiesel} hint="Preço médio que você abastece" prefix="R$" step="0.01" />
                <InputField
                  label="Tarifa de energia elétrica (R$/kWh)"
                  icon={Zap}
                  value={tarifaEletrica}
                  onChange={setTarifaEletrica}
                  hint="Tarifa da sua distribuidora"
                  prefix="R$"
                  step="0.01"
                  tooltip="Use a tarifa da sua distribuidora. Média MG: R$ 0,85/kWh"
                />
                <InputField
                  label="Custo mensal com manutenção do veículo atual (R$)"
                  icon={Wrench}
                  value={custoManutencao}
                  onChange={setCustoManutencao}
                  hint="Média dos últimos 6 meses"
                  prefix="R$"
                  tooltip="Média do setor para VUCs diesel com 3+ anos de uso. Ajuste conforme sua realidade."
                />
              </div>
            </div>

            {/* COLUNA DIREITA — RESULTADOS */}
            <div className="space-y-5">
              {/* Resultado principal */}
              <div className="bg-gradient-to-br from-[#0A1F3D] to-[#0D3D2A] border-2 border-[#22C55E] rounded-2xl p-6 md:p-8">
                <h4 className="text-white font-bold text-lg mb-5">
                  ⚡ Sua economia com o Foton eWonder:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-5">
                    <p className="text-white/60 text-sm mb-1">Economia mensal</p>
                    <p className="text-[#22C55E] font-bold text-2xl md:text-3xl">{formatBRL(calc.economiaMensal)}</p>
                  </div>
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-5">
                    <p className="text-white/60 text-sm mb-1">Economia anual</p>
                    <p className="text-[#22C55E] font-bold text-2xl md:text-3xl">{formatBRL(calc.economiaAnual)}</p>
                  </div>
                  <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-xl p-5">
                    <p className="text-white/60 text-sm mb-1">Em 3 anos</p>
                    <p className="text-[#F5A623] font-bold text-2xl md:text-3xl">{formatBRL(calc.economia3Anos)}</p>
                  </div>
                </div>
              </div>

              {/* Card 1 — Combustível vs Energia */}
              <ResultBlock title="⛽ → ⚡ Economia em combustível/energia" borderColor="#22C55E">
                <p className="text-white/70 text-sm mb-1">
                  Custo diesel atual: <span className="text-white font-medium">{formatBRL(calc.custoCombMensal)}/mês</span>
                  <span className="text-white/40 ml-1">({formatBRL2(calc.custoCombustivelKm)}/km)</span>
                </p>
                <p className="text-white/70 text-sm mb-1">
                  Custo energia eWonder: <span className="text-[#22C55E] font-medium">{formatBRL(calc.custoEnergiaMensal)}/mês</span>
                  <span className="text-white/40 ml-1">({formatBRL2(calc.custoEnergiaKm)}/km)</span>
                </p>
                <p className="text-[#22C55E] font-bold text-lg mt-3">
                  💰 Economia: {formatBRL(calc.custoCombMensal - calc.custoEnergiaMensal)}/mês
                </p>
                <p className="text-white/40 text-xs italic mt-2">
                  Consumo {veiculosDiesel[veiculoIdx].nome}: {veiculosDiesel[veiculoIdx].consumo} km/L {veiculoIdx === 0 ? "(fonte: Cobli)" : veiculoIdx === 1 ? "(média operação urbana com carga)" : "(valor conservador padrão)"}. Consumo elétrico eWonder: 0,2326 kWh/km (ficha técnica Foton Brasil).
                </p>
              </ResultBlock>

              {/* Card 2 — Manutenção */}
              <ResultBlock title="🔧 Economia em manutenção" borderColor="#F97316">
                <p className="text-white/70 text-sm mb-1">
                  Manutenção diesel atual: <span className="text-white font-medium">{formatBRL(calc.manutMensalDiesel)}/mês</span>
                </p>
                <p className="text-white/70 text-sm mb-1">
                  Manutenção eWonder: <span className="text-[#22C55E] font-medium">{formatBRL(Math.round(calc.manutMensalEwonder))}/mês</span>
                </p>
                <p className="text-[#22C55E] font-bold text-lg mt-3">
                  💰 Economia: {formatBRL(Math.round(calc.manutMensalDiesel - calc.manutMensalEwonder))}/mês
                </p>
                <p className="text-white/40 text-xs italic mt-2">
                  Veículos elétricos têm custo de manutenção até 86% menor — sem troca de óleo, freios regenerativos e menos peças móveis. Garantia de bateria CATL-LFP de 6 a 8 anos.
                </p>
              </ResultBlock>

              {/* Card 3 — Percentual */}
              <ResultBlock title="📊 Percentual de economia operacional" borderColor="#60A5FA">
                <div className="flex items-center gap-4">
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl px-6 py-4">
                    <p className="text-[#22C55E] font-bold text-3xl">{calc.percentualEconomia.toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">
                      de redução no custo operacional total
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      Custo total diesel: {formatBRL2(calc.custoTotalKmDiesel)}/km → eWonder: {formatBRL2(calc.custoTotalKmEwonder)}/km
                    </p>
                  </div>
                </div>
              </ResultBlock>

              {/* CTA */}
              <div className="text-center py-6">
                <p className="text-white text-lg font-bold mb-1">
                  Sua economia projetada: <span className="text-[#22C55E]">{formatBRL(calc.economiaAnual)}/ano</span>
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
                  <Link to="/comparativo-ewonder" className="w-full sm:w-auto">
                    <button className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 text-base px-8 py-4 rounded-xl font-semibold w-full transition-colors">
                      <ArrowLeft size={18} />
                      Ver comparativo eWonder completo
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-16 md:py-24 bg-[#0D2647]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative bg-[#0A1F3D] border border-white/10 rounded-2xl p-6 pt-8">
              <div className="absolute -top-3 left-5">
                <span className="text-white text-xs font-bold px-3 py-1 rounded-full bg-[#22C55E]">
                  ✅ Case Real Documentado
                </span>
              </div>
              <span className="text-3xl block mb-3">🚛</span>
              <p className="text-white/80 text-sm leading-relaxed">
                A <strong>EVolution Mobility</strong> adquiriu 10 unidades do eWonder para a operação da <strong>Petlove</strong> após 21 dias de teste, validando economia operacional de <strong>R$ 1.677/mês por VUC</strong> em comparação com veículos diesel equivalentes.
              </p>
            </div>
            <div className="relative bg-[#0A1F3D] border border-white/10 rounded-2xl p-6 pt-8">
              <div className="absolute -top-3 left-5">
                <span className="text-white text-xs font-bold px-3 py-1 rounded-full bg-[#60A5FA]">
                  🔬 Piloto em Andamento
                </span>
              </div>
              <span className="text-3xl block mb-3">⚡</span>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong>ZERO CARBON (LENARGE)</strong> — Frotista gigante testando linha elétrica Foton como piloto de eficiência e narrativa ESG — próximo passo da mobilidade sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
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
              <a href={`${WHATSAPP_BASE}${encodeURIComponent("Olá! Gostaria de mais informações sobre o Foton eWonder.")}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#22C55E] transition-colors">
                <MessageCircle size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={`${WHATSAPP_BASE}${encodeURIComponent("Olá! Gostaria de mais informações sobre o Foton eWonder.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#22C55E] text-white rounded-full p-4 shadow-lg shadow-[#22C55E]/30 hover:bg-[#16A34A] hover:scale-110 transition-all"
        style={{ animation: "bounce-slow 3s ease-in-out infinite" }}
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
