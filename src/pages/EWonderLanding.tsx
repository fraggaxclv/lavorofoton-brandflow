import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MessageCircle, ChevronDown, Truck, Home, TrendingUp, Users, Fuel, Wrench, Trophy, Battery, Zap, Leaf } from "lucide-react";

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
  const startRef = useRef(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    startRef.current = true;
    const interval = setInterval(() => {
      setVal(v => +(v + ratePerSecond * 0.1).toFixed(4));
    }, 100);
    return () => clearInterval(interval);
  }, [inView, ratePerSecond]);

  return { ref, val };
}

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

  const ecoMensalDefault = 1677;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Foton E-Wonder | 73% mais barato que Bongo e HR | Lavoro Foton MG</title>
        <meta name="description" content="Veja quanto custa rodar um Kia Bongo vs Foton E-Wonder. R$ 0,86/km vs R$ 0,23/km. 73% de economia operacional. Test drive grátis em BH." />
      </Helmet>
      <Navbar />

      {/* ══════ SEÇÃO 1 — HERO ══════ */}
      <section ref={hero.ref} className="mt-16 min-h-[90vh] flex flex-col items-center justify-center text-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 text-sm font-bold text-white" style={{ background: "#F5A623" }}>
          ⚡ Foton E-Wonder — "Quanto mais trabalha, mais sobra."
        </div>

        <p className="text-lg text-white/60 mb-6 max-w-2xl">
          Você sabe quanto custa ligar o motor do seu VUC todo dia?
        </p>

        <div className="text-[64px] md:text-[96px] font-bold transition-all duration-300" style={{ color: "#EF4444" }}>
          {formatBRL(heroCount)}
        </div>

        <p className="text-xl text-white mt-4 max-w-2xl">
          é o que sai do bolso de quem tem um Kia Bongo/HR Hyundai rodando 120 km/dia. <strong>Todo. Dia. De. Trabalho.</strong>
        </p>

        <p className="text-lg mt-6 font-semibold" style={{ color: "#22C55E" }}>
          Com o Foton E-Wonder, esse número cai para R$ 27,33.
        </p>

        <ChevronDown className="w-8 h-8 text-white/40 mt-10 animate-bounce" />
      </section>

      {/* ══════ SEÇÃO 2 — CONTADORES AO VIVO ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A1F3D" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Veja o dinheiro sumindo — em tempo real
          </h2>

          <div ref={bongoCounter.ref} className="grid md:grid-cols-2 gap-6">
            {/* Bongo */}
            <div className="rounded-2xl p-8 text-center" style={{ background: "#0D2647", borderLeft: "4px solid #EF4444" }}>
              <p className="text-sm font-bold mb-1" style={{ color: "#EF4444" }}>🔴 Kia Bongo / Hyundai HR</p>
              <p className="text-white/60 text-sm mb-4">Diesel — 120 km/dia</p>
              <div className="text-4xl md:text-5xl font-bold text-white mb-3 transition-all duration-100">
                {formatBRL(bongoCounter.val)}
              </div>
              <p className="text-white/60 text-sm mb-4">R$ 0,86 por km rodado</p>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white" style={{ background: "#EF4444" }}>
                R$ 2.278/mês saindo
              </span>
            </div>

            {/* E-Wonder */}
            <div ref={ewonderCounter.ref} className="rounded-2xl p-8 text-center" style={{ background: "#0D2647", borderLeft: "4px solid #22C55E" }}>
              <p className="text-sm font-bold mb-1" style={{ color: "#22C55E" }}>🟢 Foton E-Wonder</p>
              <p className="text-white/60 text-sm mb-4">Elétrico — 120 km/dia</p>
              <div className="text-4xl md:text-5xl font-bold text-white mb-3 transition-all duration-100">
                {formatBRL(ewonderCounter.val)}
              </div>
              <p className="text-white/60 text-sm mb-4">R$ 0,23 por km rodado</p>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white" style={{ background: "#22C55E" }}>
                R$ 601/mês saindo
              </span>
            </div>
          </div>

          <p className="text-center mt-10 text-lg md:text-xl font-bold" style={{ color: "#F5A623" }}>
            Diferença: R$ 9,53 por hora de operação. R$ 76 por dia. R$ 1.677 por mês.
          </p>
        </div>
      </section>

      {/* ══════ SEÇÃO 3 — O DRENO MENSAL ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A0A0A" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Todo mês, R$ 1.677 desaparecem no tanque e na oficina — ou ficam no seu bolso.
          </h2>

          <div className="overflow-x-auto rounded-xl" style={{ background: "#0D2647" }}>
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-white/80 font-semibold">Período</th>
                  <th className="p-4 text-center font-semibold" style={{ color: "#EF4444" }}>🔴 Kia Bongo / HR</th>
                  <th className="p-4 text-center font-semibold" style={{ color: "#22C55E" }}>🟢 E-Wonder</th>
                  <th className="p-4 text-center font-semibold" style={{ color: "#F5A623" }}>💰 Diferença</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  ["Por km", "R$ 0,86", "R$ 0,23", "R$ 0,63"],
                  ["Por dia", "R$ 103,54", "R$ 27,33", "R$ 76,22"],
                  ["Por mês", "R$ 2.278", "R$ 601", "R$ 1.677"],
                  ["Por ano", "R$ 27.335", "R$ 7.214", "R$ 20.121"],
                ].map(([label, bongo, ew, diff], i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="p-4 font-semibold text-white/80">{label}</td>
                    <td className="p-4 text-center rounded-sm" style={{ background: "rgba(239,68,68,0.12)" }}>{bongo}</td>
                    <td className="p-4 text-center rounded-sm" style={{ background: "rgba(34,197,94,0.12)" }}>{ew}</td>
                    <td className="p-4 text-center font-bold rounded-sm" style={{ background: "rgba(245,166,35,0.12)", color: "#F5A623" }}>{diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-white/50 text-xs mt-6 text-center max-w-3xl mx-auto italic">
            Baseado em 120 km/dia × 22 dias úteis. Kia Bongo K2500: 9,8 km/L (Cobli). Diesel: R$6,30/L. E-Wonder: 0,2326 kWh/km (ficha oficial Foton Brasil). Tarifa elétrica: R$0,85/kWh.
          </p>
        </div>
      </section>

      {/* ══════ SEÇÃO 4 — SIMULADOR INTERATIVO ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A1F3D" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Coloca seus números. Vê por você mesmo.
          </h2>
          <p className="text-white/60 text-center mb-10">Quantos km você roda por dia?</p>

          <div className="max-w-xl mx-auto mb-4">
            <div className="flex justify-between text-white/50 text-sm mb-2">
              <span>80 km</span>
              <span>180 km</span>
            </div>
            <Slider
              value={[kmDia]}
              onValueChange={([v]) => setKmDia(v)}
              min={80}
              max={180}
              step={5}
              className="w-full"
            />
          </div>
          <div className="text-center text-5xl font-bold mb-10" style={{ color: "#F5A623" }}>
            {kmDia} km/dia
          </div>

          <div className="overflow-x-auto rounded-xl" style={{ background: "#0D2647" }}>
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-left text-white/80">Período</th>
                  <th className="p-4 text-center" style={{ color: "#EF4444" }}>🔴 Bongo/HR</th>
                  <th className="p-4 text-center" style={{ color: "#22C55E" }}>🟢 E-Wonder</th>
                  <th className="p-4 text-center" style={{ color: "#F5A623" }}>💰 Você economiza</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/5">
                  <td className="p-4 font-semibold text-white/80">Por dia</td>
                  <td className="p-4 text-center" style={{ background: "rgba(239,68,68,0.12)" }}>{formatBRL(sim.diaBongo)}</td>
                  <td className="p-4 text-center" style={{ background: "rgba(34,197,94,0.12)" }}>{formatBRL(sim.diaEw)}</td>
                  <td className="p-4 text-center font-bold" style={{ color: "#F5A623" }}>{formatBRL(sim.ecoDay)}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 font-semibold text-white/80">Por mês</td>
                  <td className="p-4 text-center" style={{ background: "rgba(239,68,68,0.12)" }}>{formatBRL(sim.mesBongo)}</td>
                  <td className="p-4 text-center" style={{ background: "rgba(34,197,94,0.12)" }}>{formatBRL(sim.mesEw)}</td>
                  <td className="p-4 text-center font-bold" style={{ color: "#F5A623" }}>{formatBRL(sim.ecoMonth)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white/80">Por ano</td>
                  <td className="p-4 text-center" style={{ background: "rgba(239,68,68,0.12)" }}>{formatBRL(sim.anoBongo)}</td>
                  <td className="p-4 text-center" style={{ background: "rgba(34,197,94,0.12)" }}>{formatBRL(sim.anoEw)}</td>
                  <td className="p-4 text-center font-bold" style={{ color: "#F5A623" }}>{formatBRL(sim.ecoYear)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center px-6 py-4 rounded-xl font-bold text-white text-lg md:text-xl" style={{ background: "#22C55E" }}>
            ✅ Rodando {kmDia}km/dia, você economiza {formatBRL(sim.ecoMonth)}/mês e {formatBRL(sim.ecoYear)}/ano com E-Wonder
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 5 — O QUE VOCÊ FAZ COM ESSE DINHEIRO? ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A0A0A" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            R$ 1.677 por mês. Todo mês. O que você faria com isso?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Truck className="w-10 h-10" />, title: "Em 12 meses: R$ 20.121", text: "Entrada de um segundo E-Wonder. Seu próximo VUC sendo pago pelo atual." },
              { icon: <Home className="w-10 h-10" />, title: "17 meses de aluguel", text: "A diferença operacional cobre R$1.200/mês de aluguel — sobra ainda R$477." },
              { icon: <TrendingUp className="w-10 h-10" />, title: "R$ 110.000 em 5 anos", text: "Investindo os R$ 1.677/mês economizados, com rendimento de 10% ao ano." },
              { icon: <Users className="w-10 h-10" />, title: "Mais R$ 1.677 em casa", text: "Todo mês. Sem cortar nada. Sem trabalhar mais. Só trocando o combustível." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ background: "#0D2647" }}>
                <div className="mb-4" style={{ color: "#F5A623" }}>{c.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#F5A623" }}>{c.title}</h3>
                <p className="text-white/80">{c.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-xl md:text-2xl font-bold" style={{ color: "#22C55E" }}>
            O dinheiro que o Bongo queima todo mês pode ser a entrada do seu próximo VUC.
          </p>
        </div>
      </section>

      {/* ══════ SEÇÃO 6 — POR QUE É TÃO MAIS BARATO? ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A1F3D" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            A matemática é simples. O motor elétrico não desperdiça energia.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Combustível */}
            <div className="rounded-2xl p-6" style={{ background: "#0D2647" }}>
              <Fuel className="w-8 h-8 mb-4" style={{ color: "#F5A623" }} />
              <h3 className="text-xl font-bold text-white mb-4">Combustível</h3>
              <p className="mb-2" style={{ color: "#EF4444" }}>Diesel: R$ 0,64/km</p>
              <p className="mb-4" style={{ color: "#22C55E" }}>Eletricidade: R$ 0,20/km</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white" style={{ background: "#22C55E" }}>
                69% mais barato
              </span>
            </div>

            {/* Manutenção */}
            <div className="rounded-2xl p-6" style={{ background: "#0D2647" }}>
              <Wrench className="w-8 h-8 mb-4" style={{ color: "#F5A623" }} />
              <h3 className="text-xl font-bold text-white mb-4">Manutenção</h3>
              <p className="mb-1 text-sm" style={{ color: "#EF4444" }}>Diesel: óleo + filtros + correia + embreagem + freios = R$ 0,22/km</p>
              <p className="mb-4 text-sm" style={{ color: "#22C55E" }}>Elétrico: sem óleo, freio regenerativo, sem correia = R$ 0,03/km</p>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-bold text-white" style={{ background: "#22C55E" }}>
                86% mais barato
              </span>
            </div>

            {/* Total */}
            <div className="rounded-2xl p-6 border-2" style={{ background: "rgba(245,166,35,0.08)", borderColor: "#F5A623" }}>
              <Trophy className="w-8 h-8 mb-4" style={{ color: "#F5A623" }} />
              <h3 className="text-xl font-bold text-white mb-4">Custo total por km</h3>
              <p className="text-lg mb-1" style={{ color: "#EF4444" }}>Bongo/HR: R$ 0,86/km</p>
              <p className="text-2xl font-bold mb-4" style={{ color: "#22C55E" }}>E-Wonder: R$ 0,23/km</p>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold" style={{ background: "#F5A623", color: "#0A0A0A" }}>
                73% de economia total
              </span>
            </div>
          </div>

          <p className="text-white/40 text-xs mt-8 text-center max-w-4xl mx-auto italic">
            Kia Bongo K2500: 9,8 km/L (Cobli.co). Diesel: R$6,30/L. E-Wonder: 0,2326 kWh/km (ficha técnica oficial Foton Brasil). Tarifa elétrica mista: R$0,85/kWh. Manutenção estimada por km baseada em médias de mercado.
          </p>
        </div>
      </section>

      {/* ══════ SEÇÃO 7 — FICHA TÉCNICA ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A0A0A" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            Ficha Técnica E-Wonder
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specs */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "#0D2647" }}>
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
                  <div key={i} className="flex justify-between py-3 border-b border-white/10 text-sm md:text-base">
                    <span className="font-semibold text-white/80">{k}</span>
                    <span className="text-white text-right">{v}</span>
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
                <div key={i} className="rounded-2xl p-6" style={{ background: "#0D2647" }}>
                  <div className="flex items-start gap-4">
                    <div style={{ color: "#22C55E" }}>{d.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{d.title}</h3>
                      <p className="text-white/70">{d.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 8 — PROVA SOCIAL ══════ */}
      <section className="py-16 md:py-24 px-4" style={{ background: "#0A1F3D" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl p-8 md:p-12" style={{ background: "#0D2647", borderLeft: "4px solid #F5A623" }}>
            <blockquote className="text-lg md:text-2xl text-white italic mb-6 leading-relaxed">
              "A EVolution Mobility testou o E-Wonder por 21 dias. Depois comprou 10 unidades para atender a Petlove — maior petshop online do Brasil."
            </blockquote>

            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: "#22C55E", color: "white" }}>
              ✅ Case Real — Operação Ativa
            </span>

            <p className="text-white/70 text-lg">
              Eles não compraram um VUC elétrico. Compraram <strong className="text-white">R$ 1.677 de economia por mês — por VUC.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ══════ SEÇÃO 9 — CTA FINAL ══════ */}
      <section className="py-20 md:py-32 px-4 text-center" style={{ background: "#0A0A0A" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Seu concorrente já está calculando isso.
          </h2>
          <p className="text-lg text-white/70 mb-10">
            O test drive é gratuito. A economia começa no primeiro km.
          </p>
          <Button asChild size="lg" className="text-lg px-10 py-6 rounded-xl font-bold" style={{ background: "#22C55E", color: "white" }}>
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
