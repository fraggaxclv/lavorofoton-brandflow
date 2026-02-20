import { useState, useMemo, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MessageCircle, ChevronDown, Truck, Home, TrendingUp, Users, Fuel, Wrench, Trophy, Battery, Zap, Leaf } from "lucide-react";

// ── Images ──
import ewonderHero from "@/assets/ewonder.jpg";
import ewonderSide from "@/assets/ewonder-cargo.png";
import ewonderDetail from "@/assets/ewonder-interior-front.jpg";

// ── Constants ──
const CUSTO_KM_BONGO = 0.8629;
const CUSTO_KM_EWONDER = 0.2277;
const DIAS_MES = 22;
const CUSTO_POR_SEGUNDO_BONGO = 0.0143;
const CUSTO_POR_SEGUNDO_EWONDER = 0.0038;

// ── Helpers ──
const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ── Hooks ──
function useCountUp(target: number, duration: number, start: boolean, decimals = 2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(+(target * p).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, decimals]);
  return value;
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useLiveCounter(ratePerSecond: number) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setVal(v => +(v + ratePerSecond * 0.1).toFixed(4));
    }, 100);
    return () => clearInterval(interval);
  }, [inView, ratePerSecond]);

  return { ref, val };
}

// ── Horizontal Bar Component ──
const ComparisonBar = ({ label, bongo, ewonder, diff, maxVal }: { label: string; bongo: string; ewonder: string; diff: string; maxVal: number }) => {
  const bongoNum = parseFloat(bongo.replace(/[R$.\s]/g, '').replace(',', '.'));
  const ewonderNum = parseFloat(ewonder.replace(/[R$.\s]/g, '').replace(',', '.'));
  const bongoPct = Math.min((bongoNum / maxVal) * 100, 100);
  const ewonderPct = Math.min((ewonderNum / maxVal) * 100, 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-white text-sm md:text-base">{label}</span>
        <span className="text-xs md:text-sm font-bold px-3 py-1 rounded-full bg-[#FFC540] text-[#002D6F]">
          💰 {diff} sobrando
        </span>
      </div>
      {/* Bongo bar */}
      <div className="relative h-10 rounded-lg bg-white/10 mb-2 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-[#EF4444] to-[#DC2626] flex items-center px-3 transition-all duration-700"
          style={{ width: `${Math.max(bongoPct, 25)}%` }}
        >
          <span className="text-white text-xs md:text-sm font-bold whitespace-nowrap">🔴 Bongo/HR — {bongo}</span>
        </div>
      </div>
      {/* E-Wonder bar */}
      <div className="relative h-10 rounded-lg bg-white/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-[#00C853] to-[#00E676] flex items-center px-3 transition-all duration-700"
          style={{ width: `${Math.max(ewonderPct, 15)}%` }}
        >
          <span className="text-white text-xs md:text-sm font-bold whitespace-nowrap">🟢 E-Wonder — {ewonder}</span>
        </div>
      </div>
    </div>
  );
};

// ── Component ──
const EWonderLanding = () => {
  const hero = useInView();
  const heroCount = useCountUp(103.54, 2000, hero.inView);

  const bongoCounter = useLiveCounter(CUSTO_POR_SEGUNDO_BONGO);
  const ewonderCounter = useLiveCounter(CUSTO_POR_SEGUNDO_EWONDER);

  const [kmDia, setKmDia] = useState(120);

  const sim = useMemo(() => {
    const diaBongo = kmDia * CUSTO_KM_BONGO;
    const diaEw = kmDia * CUSTO_KM_EWONDER;
    const mesBongo = diaBongo * DIAS_MES;
    const mesEw = diaEw * DIAS_MES;
    return {
      diaBongo, diaEw, ecoDay: diaBongo - diaEw,
      mesBongo, mesEw, ecoMonth: mesBongo - mesEw,
      anoBongo: mesBongo * 12, anoEw: mesEw * 12, ecoYear: (mesBongo - mesEw) * 12,
    };
  }, [kmDia]);

  return (
    <div className="min-h-screen bg-[#002D6F]">
      <Helmet>
        <title>Foton E-Wonder | 73% mais barato que Bongo e HR | Lavoro Foton MG</title>
        <meta name="description" content="Veja quanto custa rodar um Kia Bongo vs Foton E-Wonder. R$ 0,86/km vs R$ 0,23/km. 73% de economia operacional. Test drive grátis em BH." />
      </Helmet>
      <Navbar />

      {/* ══════ SEÇÃO 1 — HERO SPLIT ══════ */}
      <section ref={hero.ref} className="mt-16 min-h-[90vh] bg-[#002D6F]">
        {/* Mobile: image first */}
        <div className="md:hidden">
          <div className="bg-white p-4 border-b-4 border-[#002D6F]">
            <img src={ewonderHero} alt="Foton E-Wonder frontal" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center min-h-[80vh] gap-8 md:gap-12">
          {/* Left column — text */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left py-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm font-bold text-[#002D6F] bg-white shadow-md">
              ⚡ Foton E-Wonder — "Quanto mais trabalha, mais sobra."
            </div>

            <p className="text-lg text-white/70 mb-6 max-w-2xl">
              Você sabe quanto custa ligar o motor do seu VUC todo dia?
            </p>

            <div
              className="text-[56px] md:text-[80px] font-bold transition-all duration-300 text-[#FFC540]"
              style={{ textShadow: "0 0 40px rgba(255,197,64,0.3)" }}
            >
              {formatBRL(heroCount)}
            </div>

            <p className="text-xl text-white mt-4 max-w-2xl">
              é o que sai do bolso de quem tem um Kia Bongo/HR Hyundai rodando 120 km/dia. <strong>Todo. Dia. De. Trabalho.</strong>
            </p>

            <p className="text-[22px] mt-6 font-semibold text-[#00C853]">
              Com o Foton E-Wonder, esse número cai para R$ 27,33.
            </p>

            <ChevronDown className="w-7 h-7 text-[#FFC540] mt-10 animate-bounce" />
          </div>

          {/* Right column — image (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="bg-white rounded-2xl p-5 border-b-4 border-[#002D6F] shadow-2xl">
              <img src={ewonderHero} alt="Foton E-Wonder frontal com baú" className="w-full max-w-lg rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 2 — CONTADORES AO VIVO ══════ */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#002D6F] via-[#003B8E] to-[#002D6F]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#002D6F] text-center mb-12">
            <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-xl inline-block">Veja o dinheiro sumindo — em tempo real</span>
          </h2>

          <div ref={bongoCounter.ref} className="grid md:grid-cols-2 gap-6">
            {/* Bongo */}
            <div className="rounded-2xl p-8 text-center bg-white shadow-lg border-t-4 border-[#EF4444] relative overflow-hidden">
              <Truck className="absolute top-3 right-3 w-6 h-6 text-[#EF4444]/30" />
              <p className="text-sm font-bold mb-1 text-[#EF4444]">🔴 Kia Bongo / Hyundai HR</p>
              <p className="text-[#002D6F]/60 text-sm mb-4">Diesel — 120 km/dia</p>
              <div className="text-4xl md:text-5xl font-bold text-[#002D6F] mb-3 transition-all duration-100">
                {formatBRL(bongoCounter.val)}
              </div>
              <p className="text-[#002D6F]/60 text-sm mb-4">R$ 0,86 por km rodado</p>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white bg-[#EF4444]">
                R$ 2.278/mês saindo
              </span>
            </div>

            {/* E-Wonder */}
            <div ref={ewonderCounter.ref} className="rounded-2xl p-8 text-center bg-white shadow-lg border-t-4 border-[#00C853] relative overflow-hidden">
              <Zap className="absolute top-3 right-3 w-6 h-6 text-[#00C853]/30" />
              <p className="text-sm font-bold mb-1 text-[#00C853]">🟢 Foton E-Wonder</p>
              <p className="text-[#002D6F]/60 text-sm mb-4">Elétrico — 120 km/dia</p>
              <div className="text-4xl md:text-5xl font-bold text-[#002D6F] mb-3 transition-all duration-100">
                {formatBRL(ewonderCounter.val)}
              </div>
              <p className="text-[#002D6F]/60 text-sm mb-4">R$ 0,23 por km rodado</p>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white bg-[#00C853]">
                R$ 601/mês saindo
              </span>
            </div>
          </div>

          <div className="text-center mt-10">
            <span className="inline-block px-6 py-3 rounded-xl text-lg md:text-xl font-bold text-[#002D6F] bg-[#C1CCD6]">
              Diferença: R$ 9,53 por hora de operação. R$ 76 por dia. R$ 1.677 por mês.
            </span>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 3 — DRENO MENSAL (BARRAS) ══════ */}
      <section className="py-16 md:py-24 px-4 bg-[#001B45]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Todo mês, R$ 1.677 desaparecem no tanque e na oficina — ou ficam no seu bolso.
          </h2>

          <div className="rounded-2xl p-6 md:p-8 bg-[#002D6F]/80 backdrop-blur">
            <ComparisonBar label="Por km" bongo="R$ 0,86" ewonder="R$ 0,23" diff="R$ 0,63" maxVal={1} />
            <ComparisonBar label="Por dia" bongo="R$ 103,54" ewonder="R$ 27,33" diff="R$ 76,22" maxVal={120} />
            <ComparisonBar label="Por mês" bongo="R$ 2.278" ewonder="R$ 601" diff="R$ 1.677" maxVal={2500} />
            <ComparisonBar label="Por ano" bongo="R$ 27.335" ewonder="R$ 7.214" diff="R$ 20.121" maxVal={30000} />
          </div>

          <p className="text-white/50 text-xs mt-6 text-center max-w-3xl mx-auto italic">
            Baseado em 120 km/dia × 22 dias úteis. Kia Bongo K2500: 9,8 km/L (Cobli). Diesel: R$6,30/L. E-Wonder: 0,2326 kWh/km (ficha oficial Foton Brasil). Tarifa elétrica: R$0,85/kWh.
          </p>
        </div>
      </section>

      {/* ══════ SEÇÃO 4 — SIMULADOR INTERATIVO ══════ */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#002D6F] via-[#003B8E] to-[#002D6F]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Coloca seus números. Vê por você mesmo.
          </h2>
          <p className="text-white/60 text-center mb-10">Quantos km você roda por dia?</p>

          <div className="rounded-2xl bg-white border-2 border-[#002D6F] p-6 md:p-10 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              {/* E-Wonder image */}
              <div className="md:w-1/3">
                <img src={ewonderSide} alt="Foton E-Wonder lateral" className="w-full rounded-xl object-cover" />
              </div>

              {/* Slider */}
              <div className="md:w-2/3 w-full">
                <div className="flex justify-between text-[#002D6F]/50 text-sm mb-2">
                  <span>80 km</span>
                  <span>180 km</span>
                </div>
                <Slider
                  value={[kmDia]}
                  onValueChange={([v]) => setKmDia(v)}
                  min={80}
                  max={180}
                  step={5}
                  className="w-full [&_[role=slider]]:bg-[#FFC540] [&_[role=slider]]:border-[#FFB020] [&_[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-[#FFC540]"
                />
                <div className="text-center text-5xl font-bold mt-4 text-[#002D6F]">
                  {kmDia} km/dia
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#E4E9EE]">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-[#E4E9EE]">
                    <th className="p-4 text-left text-[#002D6F]">Período</th>
                    <th className="p-4 text-center text-[#EF4444] font-semibold">🔴 Bongo/HR</th>
                    <th className="p-4 text-center text-[#00C853] font-semibold">🟢 E-Wonder</th>
                    <th className="p-4 text-center text-[#002D6F] font-semibold">💰 Você economiza</th>
                  </tr>
                </thead>
                <tbody className="text-[#002D6F]">
                  <tr className="border-b border-[#E4E9EE]">
                    <td className="p-4 font-semibold">Por dia</td>
                    <td className="p-4 text-center bg-red-50">{formatBRL(sim.diaBongo)}</td>
                    <td className="p-4 text-center bg-green-50">{formatBRL(sim.diaEw)}</td>
                    <td className="p-4 text-center font-bold text-[#00C853] text-lg">{formatBRL(sim.ecoDay)}</td>
                  </tr>
                  <tr className="border-b border-[#E4E9EE]">
                    <td className="p-4 font-semibold">Por mês</td>
                    <td className="p-4 text-center bg-red-50">{formatBRL(sim.mesBongo)}</td>
                    <td className="p-4 text-center bg-green-50">{formatBRL(sim.mesEw)}</td>
                    <td className="p-4 text-center font-bold text-[#00C853] text-lg">{formatBRL(sim.ecoMonth)}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Por ano</td>
                    <td className="p-4 text-center bg-red-50">{formatBRL(sim.anoBongo)}</td>
                    <td className="p-4 text-center bg-green-50">{formatBRL(sim.anoEw)}</td>
                    <td className="p-4 text-center font-bold text-[#00C853] text-lg">{formatBRL(sim.ecoYear)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center px-6 py-4 rounded-xl font-bold text-white text-lg md:text-xl bg-[#00C853]">
              ✅ Rodando {kmDia}km/dia, você economiza {formatBRL(sim.ecoMonth)}/mês e {formatBRL(sim.ecoYear)}/ano com E-Wonder
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 5 — O QUE VOCÊ FAZ COM ESSE DINHEIRO? ══════ */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#002D6F] to-[#E4F4FF]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            R$ 1.677 por mês. Todo mês. O que você faria com isso?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Truck className="w-10 h-10 text-[#FFB020]" />, title: "Em 12 meses: R$ 20.121", text: "Entrada de um segundo E-Wonder. Seu próximo VUC sendo pago pelo atual." },
              { icon: <Home className="w-10 h-10 text-[#33C5F4]" />, title: "17 meses de aluguel", text: "A diferença operacional cobre R$1.200/mês de aluguel — sobra ainda R$477." },
              { icon: <TrendingUp className="w-10 h-10 text-[#00C853]" />, title: "R$ 110.000 em 5 anos", text: "Investindo os R$ 1.677/mês economizados, com rendimento de 10% ao ano." },
              { icon: <Users className="w-10 h-10 text-[#FFC540]" />, title: "Mais R$ 1.677 em casa", text: "Todo mês. Sem cortar nada. Sem trabalhar mais. Só trocando o combustível." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl p-8 bg-[#E4E9EE] hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="mb-4">{c.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#002D6F]">{c.title}</h3>
                <p className="text-[#002D6F]/80">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <div className="inline-block px-8 py-4 rounded-xl border-2 border-[#00C853] bg-white">
              <p className="text-xl md:text-2xl font-bold text-[#00C853]">
                O dinheiro que o Bongo queima todo mês pode ser a entrada do seu próximo VUC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 6 — POR QUE É TÃO MAIS BARATO? ══════ */}
      <section className="py-16 md:py-24 px-4 bg-[#003B8E]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            A matemática é simples. O motor elétrico não desperdiça energia.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Combustível */}
            <div className="rounded-2xl p-6 bg-white border border-[#C1CCD6] shadow-md">
              <Fuel className="w-8 h-8 mb-4 text-[#FFB020]" />
              <h3 className="text-xl font-bold text-[#002D6F] mb-4">Combustível</h3>
              <p className="mb-2 text-[#EF4444] font-medium">Diesel: R$ 0,64/km</p>
              <p className="mb-4 text-[#00C853] font-medium">Eletricidade: R$ 0,20/km</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-[#00C853]">
                69% mais barato
              </span>
            </div>

            {/* Manutenção */}
            <div className="rounded-2xl p-6 bg-white border border-[#C1CCD6] shadow-md">
              <Wrench className="w-8 h-8 mb-4 text-[#FFB020]" />
              <h3 className="text-xl font-bold text-[#002D6F] mb-4">Manutenção</h3>
              <p className="mb-1 text-sm text-[#EF4444]">Diesel: óleo + filtros + correia + embreagem + freios = R$ 0,22/km</p>
              <p className="mb-4 text-sm text-[#00C853]">Elétrico: sem óleo, freio regenerativo, sem correia = R$ 0,03/km</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white bg-[#00C853]">
                86% mais barato
              </span>
            </div>

            {/* Total */}
            <div className="rounded-2xl p-6 bg-[#33C5F4] border-2 border-[#33C5F4] shadow-lg">
              <Trophy className="w-8 h-8 mb-4 text-white" />
              <h3 className="text-xl font-bold text-white mb-4">Custo total por km</h3>
              <p className="text-lg mb-1 text-[#FFC540] font-bold">Bongo/HR: R$ 0,86/km</p>
              <p className="text-2xl font-bold mb-4 text-white">E-Wonder: R$ 0,23/km</p>
              <span className="inline-flex items-center justify-center w-20 h-20 rounded-full text-sm font-bold bg-[#FFC540] text-[#002D6F] mx-auto">
                73%
              </span>
            </div>
          </div>

          <p className="text-white/50 text-xs mt-8 text-center max-w-4xl mx-auto italic">
            Kia Bongo K2500: 9,8 km/L (Cobli.co). Diesel: R$6,30/L. E-Wonder: 0,2326 kWh/km (ficha técnica oficial Foton Brasil). Tarifa elétrica mista: R$0,85/kWh. Manutenção estimada por km baseada em médias de mercado.
          </p>
        </div>
      </section>

      {/* ══════ SEÇÃO 7 — FICHA TÉCNICA ══════ */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-12">
            <img src={ewonderDetail} alt="E-Wonder detalhe" className="w-16 h-16 rounded-full object-cover border-2 border-[#002D6F]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#002D6F]">
              Ficha Técnica E-Wonder
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specs */}
            <div className="rounded-2xl p-6 md:p-8 bg-[#E4E9EE]">
              <div className="space-y-3">
                {[
                  ["Motor", "Síncrono Imã Permanente — eAxle"],
                  ["Potência", "35 kW contínuo / 75 kW pico"],
                  ["Torque", "105 N.m / 220 N.m"],
                  ["Bateria", "41,86 kWh CATL–LFP (mesma da Tesla)"],
                  ["Autonomia", "180 km"],
                  ["PBT", "2.550 kg"],
                  ["Carga útil chassi", "1.325 kg"],
                  ["Baú disponível", "9 m³"],
                  ["Carga rápida CCS2", "~1 hora"],
                  ["Segurança", "ABS+BAS+ESC+HSA de série"],
                ].map(([k, v], i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-[#C1CCD6] text-sm md:text-base">
                    <span className="font-semibold text-[#C1CCD6]">{k}</span>
                    <span className="text-[#002D6F] font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diferenciais */}
            <div className="space-y-6">
              {[
                { icon: <Battery className="w-8 h-8" />, title: "Bateria CATL-LFP", text: "A mesma tecnologia da Tesla. Garantia de 6 a 8 anos." },
                { icon: <Zap className="w-8 h-8" />, title: "Carga rápida em 1 hora", text: "Carga lenta em 6 horas. Funciona em tomada industrial." },
                { icon: <Leaf className="w-8 h-8" />, title: "Zero emissões", text: "IPVA isento em Minas Gerais. Narrativa ESG para seus clientes." },
              ].map((d, i) => (
                <div key={i} className="rounded-2xl p-6 bg-[#E4F8FF] border border-[#33C5F4]/30">
                  <div className="flex items-start gap-4">
                    <div className="text-[#33C5F4]">{d.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-[#002D6F] mb-1">{d.title}</h3>
                      <p className="text-[#002D6F]/70">{d.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 8 — PROVA SOCIAL ══════ */}
      <section className="py-16 md:py-24 px-4 bg-[#002D6F]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl p-8 md:p-12 bg-white shadow-2xl">
            <blockquote className="text-lg md:text-2xl text-[#002D6F] italic mb-6 leading-relaxed">
              "A EVolution Mobility testou o E-Wonder por 21 dias. Depois comprou 10 unidades para atender a Petlove — maior petshop online do Brasil."
            </blockquote>

            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 bg-[#00C853] text-white">
              ✅ Case Real — Operação Ativa
            </span>

            <p className="text-[#002D6F]/70 text-lg">
              Eles não compraram um VUC elétrico. Compraram <strong className="text-[#002D6F]">R$ 1.677 de economia por mês — por VUC.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 9 — CTA FINAL ══════ */}
      <section className="py-20 md:py-32 px-4 text-center bg-[#001B45]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Seu concorrente já está calculando isso.
          </h2>
          <p className="text-lg text-white/70 mb-10">
            O test drive é gratuito. A economia começa no primeiro km.
          </p>
          <Button asChild size="lg" className="text-lg px-10 py-6 rounded-xl font-bold bg-[#00C853] hover:bg-[#00B048] text-black">
            <a
              href="https://wa.me/5531996970656?text=Ol%C3%A1!%20Quero%20agendar%20o%20test%20drive%20do%20Foton%20E-Wonder%20na%20Lavoro%20Foton."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Zap className="mr-2 h-5 w-5" />
              Agendar test drive do E-Wonder — é grátis
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EWonderLanding;
