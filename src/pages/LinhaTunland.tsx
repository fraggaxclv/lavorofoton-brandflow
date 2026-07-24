import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { buildProductSchema, buildFaqSchema, speakableSchema } from "@/lib/productSchema";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  ArrowRight,
  Check,
  Minus,
  Gauge,
  Zap,
  Cog,
  Mountain,
  ShieldCheck,
  Sun,
  Armchair,
  Sparkles,
  Car,
} from "lucide-react";

// Fotos — acervo oficial Lavoro/Foton
import tunlandHero from "@/assets/tunland-linha-hero.webp";
import tunlandV7Estudio from "@/assets/tunland-v7-estudio.webp";
import tunlandV9Estudio from "@/assets/tunland-v9-estudio.webp";
import tunlandCockpit from "@/assets/tunland-cockpit-146.webp";
import tunlandInterior from "@/assets/tunland-interior-premium.webp";
import tunlandBancoTraseiro from "@/assets/tunland-banco-traseiro.webp";
import tunlandLogoLight from "@/assets/tunland-logo-light.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";

const WHATSAPP = "5531997966042";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const CORES = [
  { nome: "Branca", hex: "#f2f3f5" },
  { nome: "Prata", hex: "#c8ccd0" },
  { nome: "Cinza", hex: "#4a4f55" },
  { nome: "Preta", hex: "#101216" },
  { nome: "Azul", hex: "#1e4f8f" },
  { nome: "Vermelho", hex: "#8f1c24" },
  { nome: "Verde", hex: "#1f4d40" },
];

interface LinhaComp {
  label: string;
  v7: string;
  v9: string;
  destaque?: boolean;
}

interface GrupoComp {
  titulo: string;
  linhas: LinhaComp[];
}

const comparativo: GrupoComp[] = [
  {
    titulo: "Performance — igual nas duas",
    linhas: [
      { label: "Motor", v7: "AuCan 4F20 2.0 turbodiesel", v9: "AuCan 4F20 2.0 turbodiesel" },
      { label: "Híbrido Bosch 48V", v7: "✓", v9: "✓", destaque: true },
      { label: "Potência / Torque", v7: "175 cv · 445 Nm", v9: "175 cv · 445 Nm", destaque: true },
      { label: "Câmbio", v7: "ZF 8HP50 · 8 marchas + paddle shift", v9: "ZF 8HP50 · 8 marchas + paddle shift" },
      { label: "Tração", v7: "4x4 + diferencial blocante", v9: "4x4 + diferencial blocante" },
      { label: "Modos de condução", v7: "6 (Eco a Areia)", v9: "6 (Eco a Areia)" },
    ],
  },
  {
    titulo: "Onde o V9 sobe de nível",
    linhas: [
      { label: "Suspensão traseira", v7: "Feixe de molas — vocação carga", v9: "INDEPENDENTE — conforto de SUV", destaque: true },
      { label: "Teto solar panorâmico", v7: "—", v9: "✓", destaque: true },
      { label: "Bancos dianteiros", v7: "Aquecimento", v9: "Aquecimento + resfriamento" },
      { label: "Memória do banco e retrovisores", v7: "—", v9: "✓" },
      { label: "ACC adaptativo Stop & Go + TJA", v7: "—", v9: "✓", destaque: true },
      { label: "Frenagem autônoma (AEB) c/ pedestres", v7: "—", v9: "✓" },
      { label: "Vidros one-touch anti-esmagamento", v7: "Só motorista", v9: "Nas 4 portas + fechamento na chave" },
      { label: "Bagageiro de teto", v7: "—", v9: "✓" },
      { label: "Capacidade de carga", v7: "1.050 kg", v9: "1.000 kg" },
    ],
  },
  {
    titulo: "De série nas duas",
    linhas: [
      { label: "Central multimídia", v7: "14,6” HD · CarPlay sem fio", v9: "14,6” HD · CarPlay sem fio", destaque: true },
      { label: "Painel digital", v7: "12,3” HD", v9: "12,3” HD" },
      { label: "Airbags", v7: "6 (frontais, laterais, cortina)", v9: "6 (frontais, laterais, cortina)" },
      { label: "Freios", v7: "Disco nas 4 rodas", v9: "Disco nas 4 rodas" },
      { label: "Câmera 360° + chassi transparente", v7: "✓", v9: "✓" },
      { label: "Ponto cego (BLIS) + tráfego cruzado (RTCA)", v7: "✓", v9: "✓" },
      { label: "Detector de fadiga (DMS)", v7: "✓", v9: "✓" },
      { label: "Bancos premium · banco elétrico 8 posições", v7: "✓", v9: "✓" },
      { label: "AC digital 2 zonas + saída traseira", v7: "✓", v9: "✓" },
      { label: "Carregador por indução · luz ambiente 256 cores", v7: "✓", v9: "✓" },
      { label: "Rodas de liga 18” · pneus All Terrain", v7: "✓", v9: "✓" },
    ],
  },
  {
    titulo: "Medidas",
    linhas: [
      { label: "Caçamba", v7: "1.379 L · 1.577×1.650×530 mm", v9: "1.379 L · 1.577×1.650×530 mm", destaque: true },
      { label: "Imersão / vão livre", v7: "700 mm / 240 mm", v9: "700 mm / 240 mm" },
      { label: "Ângulos ataque / saída", v7: "28° / 26°", v9: "28° / 26°" },
      { label: "Comprimento × largura", v7: "5,62 × 2,09 m", v9: "5,62 × 2,09 m" },
      { label: "Tanque", v7: "76 L", v9: "76 L" },
    ],
  },
];

const LinhaTunland = () => {
  const [versaoAtiva, setVersaoAtiva] = useState<"v7" | "v9" | null>(null);

  const irPara = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-industrial-dark text-white">
      <SEO
        title="Tunland V7 e V9 2026 — O luxo aprendeu a trabalhar | Lavoro Foton"
        description="Picape Foton Tunland 2026: 4x4 híbrido 48V, 445 Nm, câmbio ZF de 8 marchas, central 14,6”, 6 airbags e até 10 anos de garantia. Compare V7 e V9 na Lavoro Foton, Contagem MG."
        path="/linha-tunland"
        ogImage="https://www.lavorofoton.com.br/og/linha-tunland.jpg"
        jsonLd={[
          buildProductSchema({
            name: "Foton Tunland V7 2026",
            model: "Tunland V7",
            category: "Picape 4x4",
            description: "Picape 4x4 híbrida 48V, 175 cv, 445 Nm, ZF 8 marchas, 1.050 kg de carga.",
            properties: [
              ["Motor", "AuCan 4F20 2.0 TD + 48V"],
              ["Torque", "445 Nm"],
              ["Tração", "4x4 com diferencial blocante"],
              ["Garantia", "até 10 anos"],
            ],
          }),
          buildProductSchema({
            name: "Foton Tunland V9 2026",
            model: "Tunland V9",
            category: "Picape 4x4",
            description:
              "Picape 4x4 híbrida 48V com suspensão traseira independente, teto solar panorâmico e ACC Stop & Go.",
            properties: [
              ["Motor", "AuCan 4F20 2.0 TD + 48V"],
              ["Torque", "445 Nm"],
              ["Suspensão traseira", "Independente"],
              ["Garantia", "até 10 anos"],
            ],
          }),
          buildFaqSchema([
            {
              question: "A Tunland 2026 é fraca? 175 cv é pouco?",
              answer:
                "O número que trabalha é o torque: 445 Nm disponíveis já a 1.500 rpm, com resposta imediata do híbrido 48V e câmbio ZF de 8 marchas que mantém o motor sempre no giro certo. Na prática — arrancada, ultrapassagem e carga — a Tunland anda junto com picapes de mais potência de pico.",
            },
            {
              question: "Qual a diferença entre Tunland V7 e V9?",
              answer:
                "Mecânica igual (4x4, 48V, 445 Nm, ZF 8 marchas). O V9 adiciona suspensão traseira independente, teto solar panorâmico, bancos com resfriamento e memória, ACC adaptativo Stop & Go e frenagem autônoma AEB. O V7 prioriza carga: feixe de molas e 1.050 kg.",
            },
            {
              question: "Qual a garantia da Tunland?",
              answer:
                "Até 10 anos de garantia — sem limite de quilometragem nos primeiros 5 anos (após o 5º ano, válida até 200.000 km, conforme manual de garantia).",
            },
            {
              question: "Onde comprar a Foton Tunland em BH?",
              answer:
                "Na Lavoro Foton, concessionária oficial Foton em Contagem, região metropolitana de Belo Horizonte.",
            },
          ]),
          speakableSchema,
        ]}
      />
      <Navbar />

      {/* HERO cinematográfico */}
      <section className="relative overflow-hidden">
        <img
          src={tunlandHero}
          alt="Foton Tunland V7 e V9 2026"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/45 to-industrial-dark/25" />
        <div className="container mx-auto px-4 relative min-h-[82vh] flex flex-col justify-end pb-14 md:pb-20 pt-28">
          <div className="max-w-3xl space-y-5">
            <img src={tunlandLogoLight} alt="Tunland" className="h-8 md:h-12 w-auto" />
            <h1 className="text-4xl md:text-7xl font-bold leading-[1.02] tracking-tight">
              O luxo aprendeu <span className="text-primary-light">a trabalhar.</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-2xl">
              Tunland 2026, em duas assinaturas: <strong>V7</strong>, o trabalho bem-vestido —
              <strong> V9</strong>, o conforto de SUV com caçamba de 1.379 litros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                onClick={() => window.open(wa("Olá! Quero conhecer a Tunland 2026 (V7 e V9) e agendar um test-drive."), "_blank")}
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Agendar test-drive
              </Button>
              <Button
                onClick={() => irPara("versoes")}
                size="lg"
                variant="outline"
                className="border-white/40 text-white text-lg px-8 py-6 h-auto bg-white/5 hover:bg-white/15"
              >
                V7 ou V9?
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS QUE TRABALHAM */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-white/10">
            {[
              ["445 Nm", "@ 1.500 rpm"],
              ["48V", "híbrido Bosch"],
              ["ZF 8HP", "8 marchas"],
              ["4x4", "dif. blocante"],
              ["1.379 L", "de caçamba"],
              ["até 10 anos", "de garantia*"],
            ].map(([n, l]) => (
              <div key={n} className="py-6 md:py-8 text-center">
                <p className="text-xl md:text-3xl font-bold text-primary-light">{n}</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAV RÁPIDA */}
      <div className="sticky top-0 z-40 bg-industrial-dark/95 backdrop-blur border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide py-2">
            <button onClick={() => irPara("potencia")} className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-white/20 text-white hover:border-primary-light hover:text-primary-light transition-colors">
              A conta da potência
            </button>
            <button onClick={() => irPara("versoes")} className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-white/20 text-white hover:border-primary-light hover:text-primary-light transition-colors">
              V7 × V9
            </button>
            <button onClick={() => irPara("comparativo")} className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-light))] transition-colors">
              Comparativo
            </button>
            <button onClick={() => irPara("interior")} className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-white/20 text-white hover:border-primary-light hover:text-primary-light transition-colors">
              Interior
            </button>
            <Link to="/linha-aumark" className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-white/20 text-white hover:border-primary-light hover:text-primary-light transition-colors">
              Linha Aumark →
            </Link>
            <Link to="/linha-auman" className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-white/20 text-white hover:border-primary-light hover:text-primary-light transition-colors">
              Linha Auman D →
            </Link>
          </div>
        </div>
      </div>

      {/* A CONTA DA POTÊNCIA — objeção de frente */}
      <section id="potencia" className="scroll-mt-14 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-primary-light font-semibold tracking-[0.25em] uppercase text-sm mb-3">
              A conta da potência
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Cavalo se conta no papel.
              <br />
              <span className="text-primary-light">Torque se sente no pé.</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-3xl mx-auto">
              Potência máxima é um pico lá em cima do conta-giros, que você visita de vez em quando.
              O que puxa carga, arranca no semáforo e completa ultrapassagem é <strong>torque em
              rotação baixa</strong> — e é exatamente aí que a Tunland foi feita pra viver.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <Gauge className="h-8 w-8 text-primary-light mb-4" />
              <p className="text-3xl font-bold mb-1">445 Nm</p>
              <p className="text-sm text-gray-400 mb-3">de 1.500 a 2.600 rpm</p>
              <p className="text-gray-300 text-sm">
                O torque inteiro chega cedo e fica num platô largo — a faixa que você usa o dia
                inteiro, carregado ou não.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <Zap className="h-8 w-8 text-primary-light mb-4" />
              <p className="text-3xl font-bold mb-1">Híbrido 48V</p>
              <p className="text-sm text-gray-400 mb-3">sistema Bosch</p>
              <p className="text-gray-300 text-sm">
                Resposta elétrica instantânea no arranque, Start & Stop imperceptível e o turbo
                sempre acordado. O pé pede, o carro entrega — sem espera.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <Cog className="h-8 w-8 text-primary-light mb-4" />
              <p className="text-3xl font-bold mb-1">ZF 8HP50</p>
              <p className="text-sm text-gray-400 mb-3">8 marchas + paddle shift</p>
              <p className="text-gray-300 text-sm">
                A mesma família de câmbio dos sedãs premium europeus: 8 marchas curtas que mantêm o
                motor sempre no ponto certo do torque.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto bg-primary/10 border border-primary/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <Mountain className="h-10 w-10 text-primary-light shrink-0" />
            <p className="text-gray-200 text-base md:text-lg flex-1">
              E quando o asfalto acaba: <strong>4x4 com diferencial traseiro blocante</strong>, 6
              modos de condução, <strong>700 mm de imersão</strong>, 240 mm de vão livre e 28° de
              ataque. A conversa termina no test-drive — o 48V a gente não explica, a gente deixa
              você sentir.
            </p>
            <Button
              onClick={() => window.open(wa("Olá! Quero agendar um test-drive da Tunland 2026."), "_blank")}
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white shrink-0"
              size="lg"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Sentir no pé
            </Button>
          </div>
        </div>
      </section>

      {/* V7 × V9 */}
      <section id="versoes" className="scroll-mt-14 py-16 md:py-24 bg-black/30 border-y border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Duas assinaturas, <span className="text-primary-light">uma mecânica</span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            O powertrain é idêntico. A escolha é sobre como você vive a picape.
          </p>
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* V7 */}
            <article
              onMouseEnter={() => setVersaoAtiva("v7")}
              className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
                versaoAtiva === "v7" ? "border-primary-light shadow-[var(--shadow-premium)]" : "border-white/10"
              }`}
            >
              <div className="relative aspect-[16/10] bg-gradient-to-b from-white/10 to-transparent">
                <img src={tunlandV7Estudio} alt="Foton Tunland V7 2026" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-industrial-dark/85 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                  Vocação carga
                </span>
              </div>
              <div className="p-7 md:p-9">
                <h3 className="text-3xl font-bold mb-1">Tunland V7</h3>
                <p className="text-primary-light text-xl font-semibold mb-4">O trabalho, bem-vestido.</p>
                <ul className="space-y-2.5 text-sm md:text-base text-gray-300 mb-6">
                  <li className="flex gap-2"><Check className="h-5 w-5 text-primary-light shrink-0" /> Feixe de molas — feito pro batente diário com peso</li>
                  <li className="flex gap-2"><Check className="h-5 w-5 text-primary-light shrink-0" /> 1.050 kg de capacidade de carga</li>
                  <li className="flex gap-2"><Check className="h-5 w-5 text-primary-light shrink-0" /> Central 14,6” + painel 12,3” + câmera 360°</li>
                  <li className="flex gap-2"><Check className="h-5 w-5 text-primary-light shrink-0" /> Bancos premium elétricos com aquecimento</li>
                  <li className="flex gap-2"><Check className="h-5 w-5 text-primary-light shrink-0" /> 6 airbags, BLIS, freio a disco nas 4 rodas</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => window.open(wa("Olá! Tenho interesse na Tunland V7 2026."), "_blank")} className="bg-[#25D366] hover:bg-[#20BA5A] text-white">
                    <MessageSquare className="mr-2 h-4 w-4" /> Consultar o V7
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/15">
                    <Link to="/modelos/tunland-v7">Página completa <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </article>
            {/* V9 */}
            <article
              onMouseEnter={() => setVersaoAtiva("v9")}
              className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
                versaoAtiva === "v9" ? "border-primary-light shadow-[var(--shadow-premium)]" : "border-white/10"
              }`}
            >
              <div className="relative aspect-[16/10] bg-gradient-to-b from-white/10 to-transparent">
                <img src={tunlandV9Estudio} alt="Foton Tunland V9 2026" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                  Topo de linha
                </span>
              </div>
              <div className="p-7 md:p-9">
                <h3 className="text-3xl font-bold mb-1">Tunland V9</h3>
                <p className="text-primary-light text-xl font-semibold mb-4">O luxo completo.</p>
                <ul className="space-y-2.5 text-sm md:text-base text-gray-300 mb-6">
                  <li className="flex gap-2"><Sparkles className="h-5 w-5 text-primary-light shrink-0" /> Suspensão traseira INDEPENDENTE — roda como SUV</li>
                  <li className="flex gap-2"><Sun className="h-5 w-5 text-primary-light shrink-0" /> Teto solar panorâmico</li>
                  <li className="flex gap-2"><Armchair className="h-5 w-5 text-primary-light shrink-0" /> Bancos com resfriamento + memória (banco e retrovisores)</li>
                  <li className="flex gap-2"><Car className="h-5 w-5 text-primary-light shrink-0" /> ACC adaptativo Stop & Go + assistente de trânsito (TJA)</li>
                  <li className="flex gap-2"><ShieldCheck className="h-5 w-5 text-primary-light shrink-0" /> Frenagem autônoma AEB com detecção de pedestres</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => window.open(wa("Olá! Tenho interesse na Tunland V9 2026."), "_blank")} className="bg-[#25D366] hover:bg-[#20BA5A] text-white">
                    <MessageSquare className="mr-2 h-4 w-4" /> Consultar o V9
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/15">
                    <Link to="/modelos/tunland-v9">Página completa <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* COMPARATIVO V7 × V9 */}
      <section id="comparativo" className="scroll-mt-14 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            V7 × V9, <span className="text-primary-light">item por item</span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Ficha técnica oficial Foton do Brasil — Tunland 2026.
          </p>
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-white/[0.06]">
                  <th className="sticky left-0 bg-industrial-dark md:bg-transparent text-left p-4 min-w-[200px]">
                    <img src={tunlandLogoLight} alt="Tunland" className="h-5 md:h-6 w-auto" />
                  </th>
                  <th className="p-4 text-center min-w-[150px]">
                    <span className="block text-2xl md:text-3xl font-bold text-primary-light">V7</span>
                    <span className="block text-xs text-gray-400 font-normal mt-1">Vocação carga</span>
                  </th>
                  <th className="p-4 text-center min-w-[150px]">
                    <span className="block text-2xl md:text-3xl font-bold text-primary-light">V9</span>
                    <span className="block text-xs text-gray-400 font-normal mt-1">Topo de linha</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparativo.map((grupo) => (
                  <Fragment key={grupo.titulo}>
                    <tr className="bg-primary/15">
                      <td colSpan={3} className="p-3 pl-4 font-bold uppercase tracking-widest text-xs text-primary-light">
                        {grupo.titulo}
                      </td>
                    </tr>
                    {grupo.linhas.map((linha) => (
                      <tr key={linha.label} className="border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                        <td className="sticky left-0 bg-industrial-dark p-4 text-gray-300 font-medium">{linha.label}</td>
                        {[linha.v7, linha.v9].map((v, idx) => (
                          <td key={idx} className={`p-4 text-center ${linha.destaque ? "font-bold text-white" : "text-gray-300"}`}>
                            {v === "—" ? (
                              <Minus className="h-4 w-4 mx-auto text-gray-600" />
                            ) : v === "✓" ? (
                              <Check className="h-5 w-5 mx-auto text-primary-light" />
                            ) : (
                              v
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
                <tr className="border-t border-white/[0.06] bg-primary/10">
                  <td className="sticky left-0 bg-industrial-dark p-4 font-medium text-gray-300">Garantia</td>
                  <td colSpan={2} className="p-4 text-center font-bold text-primary-light">
                    <ShieldCheck className="inline h-5 w-5 mr-2 -mt-1" />
                    Até 10 anos — sem limite de km nos primeiros 5 anos*
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4 max-w-3xl mx-auto">
            *Do 6º ao 10º ano, garantia válida até 200.000 km; itens específicos têm prazos próprios — consulte o manual
            de garantia. Dados sujeitos a alteração pela fábrica.
          </p>
        </div>
      </section>

      {/* INTERIOR — o luxo em close */}
      <section id="interior" className="scroll-mt-14 py-16 md:py-24 bg-black/30 border-y border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Por dentro, <span className="text-primary-light">ninguém diz que é picape</span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Central de 14,6”, painel digital de 12,3”, luz ambiente com 256 cores e acabamento em
            três tons — Santorini, Terracota e Café.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <figure className="rounded-2xl overflow-hidden border border-white/10 md:col-span-2">
              <div className="aspect-[16/9]">
                <img src={tunlandCockpit} alt="Cockpit da Tunland 2026 — central 14,6 polegadas" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-gray-400">
                Cockpit digital: central HD de 14,6” com CarPlay sem fio + painel de 12,3”
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-[16/9] md:aspect-auto md:h-full">
                <img src={tunlandBancoTraseiro} alt="Bancos traseiros da Tunland 2026" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-gray-400">
                Segunda fileira com AC dedicado e descanso de braço
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-white/10 md:col-span-3">
              <div className="aspect-[21/9]">
                <img src={tunlandInterior} alt="Interior premium da Tunland 2026" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-gray-400">
                Bancos premium com ajuste elétrico de 8 posições, aquecimento (e resfriamento no V9)
              </figcaption>
            </figure>
          </div>

          {/* Cores */}
          <div className="mt-14 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-5">7 cores disponíveis</p>
            <div className="flex flex-wrap justify-center gap-4">
              {CORES.map((c) => (
                <div key={c.nome} className="flex flex-col items-center gap-2">
                  <span
                    className="h-10 w-10 rounded-full border-2 border-white/25 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs text-gray-400">{c.nome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARCEIROS + ASSINATURA */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-5 mb-8">
            <span className="bg-white rounded-xl px-6 py-3 inline-flex items-center">
              <img src={boschLogo} alt="Bosch" className="h-9 object-contain" />
            </span>
            <span className="bg-white rounded-xl px-6 py-3 inline-flex items-center">
              <img src={zfLogo} alt="ZF" className="h-9 object-contain" />
            </span>
          </div>
          <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto">
            Híbrido Bosch, câmbio ZF, até 10 anos de garantia.
            <span className="block text-primary-light mt-2">Foton por dentro. Lavoro por perto.</span>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden border-t border-white/10">
        <img src={tunlandV9Estudio} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-industrial-dark/85" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <img src={tunlandLogoLight} alt="Tunland" className="h-8 md:h-10 w-auto mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold">O test-drive responde o que o papel não conta.</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Vem sentir o 48V no pé — e decidir entre V7 e V9 do banco do motorista.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                onClick={() => window.open(wa("Olá! Quero agendar um test-drive da Tunland 2026."), "_blank")}
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-6 h-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Agendar meu test-drive
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white text-lg px-10 py-6 h-auto bg-white/5 hover:bg-white/15"
              >
                <a href="tel:+553121164735">Ligar: (31) 2116-4735</a>
              </Button>
            </div>
            <p className="text-sm text-gray-400 pt-4">
              Lavoro Foton — concessionária oficial Foton · Contagem/MG
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LinhaTunland;
