import { useEffect, useRef, useState, useCallback } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL_SIMULACAO =
  "https://wa.me/5531996970656?text=Ol%C3%A1!%20Vi%20a%20simula%C3%A7%C3%A3o%20no%20site%20e%20quero%20calcular%20minha%20economia%20com%20o%20Foton%20Aumark%20S%201217.";

const modelos = [
  {
    nome: "Foton Aumark S 1217",
    cor: "green",
    eixos: "4.500 mm",
    carga: 8256,
    viagens: 14,
    best: true,
  },
  {
    nome: "MB Accelo 1117",
    cor: "red",
    eixos: "4.600 mm",
    carga: 7044,
    viagens: 17,
    best: false,
  },
  {
    nome: "VW Delivery 11.180",
    cor: "red",
    eixos: "4.600 mm",
    carga: 7330,
    viagens: 17,
    best: false,
  },
  {
    nome: "Iveco Tector 11-190",
    cor: "red",
    eixos: "4.455 mm",
    carga: 6930,
    viagens: 17,
    best: false,
  },
];

const detailedTableData = [
  {
    spec: "Entre-eixos",
    values: ["4.500 mm", "4.600 mm", "4.600 mm", "4.455 mm"],
  },
  {
    spec: "Carga + Carroceria",
    values: ["8.256 kg", "7.044 kg", "7.330 kg", "6.930 kg"],
    highlight: true,
  },
  {
    spec: "Peso carroceria",
    values: ["1.000 kg", "1.000 kg", "1.000 kg", "1.000 kg"],
  },
  {
    spec: "Carga simulada",
    values: ["100.000 kg", "100.000 kg", "100.000 kg", "100.000 kg"],
  },
  {
    spec: "Nº de viagens",
    values: ["🟢 14", "🔴 17", "🔴 17", "🔴 17"],
    highlight: true,
  },
];

const savingsCards = [
  {
    icon: "⛽",
    title: "Menos combustível",
    value: "R$ 9.487 economizados/ano",
    sub: "Foton faz 7.200 km/ano a menos + 20% de eficiência do motor Cummins",
  },
  {
    icon: "👷",
    title: "Menos horas de motorista",
    value: "R$ 9.000 economizados/ano",
    sub: "36 viagens evitadas × custo proporcional de R$ 250/viagem",
  },
  {
    icon: "🔧",
    title: "Menos desgaste mecânico",
    value: "R$ 1.800 economizados/ano",
    sub: "7.200 km a menos/ano × R$ 0,25/km (pneus, freios, embreagem)",
  },
];

const frotaImpacto = [
  { frota: "1 caminhão", economia: "R$ 20.287" },
  { frota: "5 caminhões", economia: "R$ 101.435" },
  { frota: "10 caminhões", economia: "R$ 202.871" },
  { frota: "20 caminhões", economia: "R$ 405.741" },
];

/* ── Hooks ── */

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

/* ── Truck Race ── */

function TruckRace({ inView }: { inView: boolean }) {
  return (
    <div className="space-y-8 md:space-y-6">
      {/* Foton row */}
      <div>
        <div className="mb-2">
          <span className="inline-block bg-[#22C55E]/20 text-[#22C55E] text-xs md:text-sm font-bold px-3 py-1 rounded-full">
            Foton Aumark S 1217
          </span>
          <span className="block text-white/50 text-xs mt-1 ml-1">8.326 kg/viagem</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl flex-shrink-0 transition-all"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 50}ms`,
                transitionDuration: "400ms",
              }}
            >
              🚛
            </span>
          ))}
          <span
            className="flex-shrink-0 ml-2 text-xs font-bold bg-[#22C55E] text-white px-3 py-1 rounded-full animate-pulse whitespace-nowrap"
            style={{
              opacity: inView ? 1 : 0,
              transitionDelay: "800ms",
              transitionDuration: "400ms",
            }}
          >
            ✅ 14 viagens — CONCLUÍDO
          </span>
        </div>
      </div>

      {/* Competitors row */}
      <div>
        <div className="mb-2">
          <span className="inline-block bg-red-500/20 text-red-400 text-xs md:text-sm font-bold px-3 py-1 rounded-full">
            VW / MB / Iveco
          </span>
          <span className="block text-white/50 text-xs mt-1 ml-1">~7.200 kg/viagem</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl flex-shrink-0 transition-all"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transitionDelay: `${i * 50}ms`,
                transitionDuration: "400ms",
                filter: "grayscale(0.8) brightness(0.7)",
              }}
            >
              🚛
            </span>
          ))}
          {/* 3 extra trips */}
          {[15, 16, 17].map((n, i) => (
            <span
              key={n}
              className="text-xl md:text-2xl flex-shrink-0 animate-pulse"
              style={{
                opacity: inView ? 1 : 0,
                transitionDelay: `${750 + i * 100}ms`,
                transitionDuration: "400ms",
                filter: "hue-rotate(300deg) saturate(3)",
              }}
            >
              🚛
            </span>
          ))}
          <span
            className="flex-shrink-0 ml-2 text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-full whitespace-nowrap"
            style={{
              opacity: inView ? 1 : 0,
              transitionDelay: "1100ms",
              transitionDuration: "400ms",
            }}
          >
            🔴 17 viagens — AINDA RODANDO...
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export default function SimuladorEficiencia() {
  const { ref: raceRef, inView: raceInView } = useInView(0.15);
  const { ref: impactRef, inView: impactInView } = useInView(0.3);
  const counter = useCountUp(20287, 2000, impactInView);
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <section className="py-20 md:py-28 bg-[#0A1F3D]">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* ── PARTE A: Título ── */}
        <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 text-3xl md:text-5xl font-bold text-center mb-4 text-white">
          Vamos ver <span className="text-[#F5A623]">na prática</span>?
        </h2>
        <p className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-100 text-center text-white/80 mb-8 max-w-2xl mx-auto">
          Qual dos modelos abaixo faz menos viagens para transportar a mesma quantidade de carga?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-2 rounded-full border border-white/15">
            📦 Carga simulada: <strong>100.000 kg</strong>
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-2 rounded-full border border-white/15">
            🏗️ Peso da carroceria: <strong>1.000 kg</strong>
          </span>
        </div>

        {/* ── PARTE B: Corrida de Entregas ── */}
        <div ref={raceRef} className="mb-10">
          <TruckRace inView={raceInView} />
          <p
            className="text-center text-lg md:text-[22px] font-bold text-[#F5A623] mt-8 leading-snug transition-all duration-700"
            style={{ opacity: raceInView ? 1 : 0, transform: raceInView ? "translateY(0)" : "translateY(16px)" }}
          >
            "Enquanto seu concorrente ainda está na 15ª viagem, você já terminou e está em casa."
          </p>
        </div>

        {/* ── PARTE C: Tabela Detalhada Colapsável ── */}
        <div className="mb-16">
          <button
            onClick={() => setTableOpen((v) => !v)}
            className="mx-auto flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors font-medium"
          >
            {tableOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {tableOpen ? "Ocultar dados técnicos" : "+ Ver dados técnicos detalhados"}
          </button>

          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: tableOpen ? "600px" : "0px", opacity: tableOpen ? 1 : 0 }}
          >
            <div className="overflow-x-auto scrollbar-hide mt-6 -mx-4 px-4">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left py-4 px-4 text-white/50 font-medium text-sm uppercase tracking-wider">
                      Especificação
                    </th>
                    <th className="py-4 px-4 text-center relative">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-[#F5A623] text-[#0A1F3D] text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                          🏆 Melhor da Categoria
                        </span>
                      </div>
                      <span className="font-bold text-[#F5A623] text-sm md:text-base">
                        Foton Aumark S 1217
                      </span>
                    </th>
                    <th className="py-4 px-4 text-center text-white/70 font-medium text-sm md:text-base">MB Accelo 1117</th>
                    <th className="py-4 px-4 text-center text-white/70 font-medium text-sm md:text-base">VW Delivery 11.180</th>
                    <th className="py-4 px-4 text-center text-white/70 font-medium text-sm md:text-base">Iveco Tector 11-190</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedTableData.map((row, i) => (
                    <tr key={i} className={`border-t border-white/10 ${row.highlight ? "bg-[#F5A623]/5" : ""}`}>
                      <td className="py-4 px-4 font-medium text-white/80 text-sm">{row.spec}</td>
                      {row.values.map((v, j) => (
                        <td
                          key={j}
                          className={`py-4 px-4 text-center text-sm ${
                            j === 0
                              ? "font-bold border-l-2 border-r-2 border-[#F5A623]/40 " + (row.highlight ? "text-[#F5A623]" : "text-white")
                              : "text-white/60"
                          }`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── PARTE D: Tradução Financeira ── */}
        <h3 className="reveal opacity-0 translate-y-6 transition-all duration-700 text-2xl md:text-3xl font-bold text-center text-white mb-8">
          O que essas 3 viagens a menos significam <span className="text-[#F5A623]">no seu bolso</span>?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {savingsCards.map((card, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-6 transition-all duration-700 bg-[#0D2647] border border-white/10 rounded-2xl p-6 text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="text-4xl mb-4 block">{card.icon}</span>
              <h4 className="text-white font-bold text-lg mb-2">{card.title}</h4>
              <p className="text-[#22C55E] font-bold text-2xl md:text-[28px] mb-2">{card.value}</p>
              <p className="text-white/50 text-[13px]">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* ── PARTE E: Impacto Anual ── */}
        <div ref={impactRef} className="max-w-[600px] mx-auto mb-10">
          <div className="bg-gradient-to-br from-[#0A1F3D] to-[#0D3D2A] border-2 border-[#F5A623] rounded-2xl p-8 md:p-10 text-center">
            <p className="text-white text-lg mb-4">
              Transportando 100.000 kg/mês, em 12 meses você economiza:
            </p>
            <p className="text-[#F5A623] font-bold leading-none" style={{ fontSize: "clamp(48px, 10vw, 72px)" }}>
              R$ {counter.toLocaleString("pt-BR")}
            </p>
            <p className="text-white text-xl font-medium mt-2 mb-6">reais economizados por caminhão por ano</p>
            <hr className="border-[#F5A623]/40 mb-6" />
            <p className="text-[#22C55E] font-bold text-2xl md:text-[32px] mb-3">
              R$ 1.690/mês de economia por caminhão
            </p>
            <p className="text-white/70 text-sm">
              Baseado em 200km/viagem, diesel R$6,30/L, 100.000 kg/mês transportados. Inclui economia de combustível, motorista e desgaste mecânico.
            </p>
          </div>
        </div>

        {/* ── Tabela de Impacto por Frota ── */}
        <div className="max-w-[600px] mx-auto mb-16">
          <h4 className="text-white text-lg font-bold text-center mb-4">Quanto maior sua frota, maior o impacto:</h4>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0D2647]">
                  <th className="text-left py-3 px-5 text-white/70 font-medium text-sm">Tamanho da frota</th>
                  <th className="text-right py-3 px-5 text-white/70 font-medium text-sm">Economia estimada/ano</th>
                </tr>
              </thead>
              <tbody>
                {frotaImpacto.map((row, i) => (
                  <tr key={i} className="border-t border-white/10 bg-[#0D2647]/60">
                    <td className="py-3 px-5 text-white/80 text-sm">{row.frota}</td>
                    <td className="py-3 px-5 text-right text-[#22C55E] font-bold text-sm">{row.economia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── PARTE F: CTA ── */}
        <div className="text-center">
          <p className="text-white text-lg mb-5">Quer calcular com os números da sua operação?</p>
          <a href={WHATSAPP_URL_SIMULACAO} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-lg px-8 py-5 rounded-xl font-semibold shadow-lg shadow-[#22C55E]/25">
              <MessageCircle size={20} />
              Simular minha economia agora
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
