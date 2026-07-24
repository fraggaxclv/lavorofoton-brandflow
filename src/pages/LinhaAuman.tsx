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
  Scale,
  Gauge,
  Ruler,
  Truck,
  Package,
  Snowflake,
  Layers,
  Container,
  Wrench,
  ShieldCheck,
  Settings2,
  BedDouble,
  Wind,
} from "lucide-react";

// Fotos — acervo oficial Lavoro/Foton
import aumanHeroStudio from "@/assets/auman-d-chassi-34-studio.webp";
import auman2632Frontal from "@/assets/auman-d-2632-frontal.webp";
import auman2632Chassi6x2 from "@/assets/auman-d-2632-chassi-6x2.webp";
import aumanSemileitoInterior from "@/assets/auman-cabine-semileito-interior.webp";
import auman1722Frontal from "@/assets/auman-1722-frontal-45.jpg";
import auman1722Lateral from "@/assets/auman-1722-lateral.jpg";
import auman1722Traseira from "@/assets/auman-1722-traseira.jpg";
import aumanD1830Hero from "@/assets/auman-d-1830-hero.png";
import aumanD1830Lateral from "@/assets/auman-d-1830-lateral.png";
import aumanD2632SuspensaoAr from "@/assets/auman-d-2632-suspensao-ar.png";
import aumanD2632SemiLeito from "@/assets/auman-d-2632-cabine-semi-leito.png";
import aumanD2632Tanque from "@/assets/auman-d-2632-tanque-aluminio.png";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import garantia3AnosIcon from "@/assets/garantia-3anos-foton.png";
import aumanLogoLight from "@/assets/auman-logo-light.png";
import aumanLogoDark from "@/assets/auman-logo-dark.png";

const WHATSAPP = "5531997966042";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

interface ModeloAuman {
  id: string;
  nome: string;
  numero: string;
  tagline: string;
  descricao: string;
  foto: string;
  fotoAlt: string;
  rota: string;
  eixos: string;
  pbt: string;
  cargaUtil: string;
  potencia: string;
  torque: string;
  motor: string;
  plataforma: string;
  cambio: string;
  chassi: string;
  versoes: string;
  galeria: { src: string; alt: string }[];
  aplicacoes: string[];
  destaques: string[];
  waMsg: string;
}

const modelos: ModeloAuman[] = [
  {
    id: "d1722",
    nome: "Auman D 1722",
    numero: "1722",
    tagline: "O peso-médio que carrega como pesado.",
    descricao:
      "PBT de 16 toneladas com 11.375 kg de capacidade para carga + carroceria — margem rara no segmento. Cummins F4.5 de 820 Nm e itens de segurança que os concorrentes cobram à parte.",
    foto: auman1722Frontal,
    fotoAlt: "Foton Auman D 1722 — caminhão semipesado 16 toneladas",
    rota: "/modelos/auman-d-1722",
    eixos: "4x2",
    pbt: "16.000 kg",
    cargaUtil: "até 11.375 kg",
    potencia: "220 cv",
    torque: "820 Nm",
    motor: "Cummins F4.5",
    plataforma: "até 6,80 m",
    cambio: "ZF 6 marchas · manual",
    chassi: "Versão A (entre-eixos 4.200 mm, tanque 260 L) e Versão B (entre-eixos 5.150 mm, tanque 450 L)",
    versoes: "A e B — muda o entre-eixos e o tanque, o resto é completo de série",
    galeria: [
      { src: auman1722Lateral, alt: "Auman D 1722 — vista lateral" },
      { src: auman1722Traseira, alt: "Auman D 1722 — vista traseira" },
    ],
    aplicacoes: ["Distribuição pesada", "Frete regional", "Bebidas e atacado", "Grandes mudanças"],
    destaques: [
      "820 Nm de torque — sobe serra carregado sem drama",
      "Detecção de ponto cego (BSD) + TPMS de série",
      "Freio de ar de circuito duplo com ESC + freio-motor EAT",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Auman D 1722 (16 toneladas).",
  },
  {
    id: "d1830",
    nome: "Auman D 1830",
    numero: "1830",
    tagline: "Automatizado de série. Semileito de série.",
    descricao:
      "Cummins D6.7 de 6 cilindros com 1.100 Nm e câmbio ZF de 9 marchas AUTOMATIZADO com conversor de torque. O motorista dirige descansado — e a cabine com semileito deixa ele dormir no frete.",
    foto: aumanD1830Hero,
    fotoAlt: "Foton Auman D 1830 — caminhão semipesado com câmbio automatizado",
    rota: "/modelos/auman-d-1830",
    eixos: "4x2",
    pbt: "16.000 kg",
    cargaUtil: "10.360 kg",
    potencia: "282 cv",
    torque: "1.100 Nm",
    motor: "Cummins D6.7",
    plataforma: "6,67 m",
    cambio: "ZF 9 marchas · automatizada (conversor de torque)",
    chassi: "Entre-eixos 5.150 mm · tanque de alumínio 260 L ou 450 L",
    versoes: "Única e completa — semileito, AC automático, banco pneumático, painel LCD 7”",
    galeria: [
      { src: aumanSemileitoInterior, alt: "Cabine do Auman D — semileito de série" },
      { src: aumanD1830Lateral, alt: "Auman D 1830 — vista lateral do chassi" },
    ],
    aplicacoes: ["Rota regional e longa", "Distribuição pesada", "Frigorífico", "Graneleiro"],
    destaques: [
      "Câmbio ZF automatizado — adeus pedal de embreagem no trânsito",
      "Cabine com semileito de série — o motorista descansa de verdade",
      "1.100 Nm já a 1.100 rpm — força em rotação baixa, diesel poupado",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Auman D 1830 (automatizado).",
  },
  {
    id: "d2632",
    nome: "Auman D 2632",
    numero: "2632",
    tagline: "O 6x2 da suspensão a ar. Até 15,6 t por viagem.",
    descricao:
      "PBT técnico de 26 toneladas, 15.630 kg para carga + carroceria e plataforma de até 8,20 m na versão L. Suspensão traseira a ar com 3º eixo elevável de série — sem upgrade pago.",
    foto: auman2632Frontal,
    fotoAlt: "Foton Auman D 2632 — caminhão 6x2 26 toneladas",
    rota: "/modelos/auman-d-2632",
    eixos: "6x2",
    pbt: "23.000 kg",
    cargaUtil: "até 15.630 kg",
    potencia: "320 cv",
    torque: "1.200 Nm",
    motor: "Cummins D6.7",
    plataforma: "7,55 a 8,20 m",
    cambio: "ZF 9 marchas · automatizada (conversor de torque)",
    chassi: "2632 (entre-eixos 4.800+1.350 mm, plataforma 7,55 m) e 2632 L (5.450+1.350 mm, plataforma 8,20 m)",
    versoes: "2632 e 2632 L — semileito de série, farol de neblina, aviso de sobrecarga",
    galeria: [
      { src: auman2632Chassi6x2, alt: "Chassi 6x2 do Auman D 2632 — eixos traseiros" },
      { src: aumanD2632SuspensaoAr, alt: "Suspensão a ar do Auman D 2632" },
    ],
    aplicacoes: ["Grandes volumes", "Graneleiro", "Bebidas", "Basculante e construção"],
    destaques: [
      "Suspensão a ar 2+2+1 com 3º eixo elevável — de série",
      "15.630 kg de carga + carroceria e PBTC de 36 toneladas",
      "ZF automatizada com conversor de torque — arranque suave, sempre",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Auman D 2632 (6x2).",
  },
];

const perfis = [
  {
    id: "d1722",
    titulo: "“Distribuição pesada, praça e região”",
    resposta: "Auman D 1722 — 11,4 t de carga + carroceria",
  },
  {
    id: "d1830",
    titulo: "“Estrada o dia inteiro, motorista inteiro”",
    resposta: "Auman D 1830 — automatizado + semileito",
  },
  {
    id: "d2632",
    titulo: "“Quero o máximo por viagem”",
    resposta: "Auman D 2632 — 6x2, até 15,6 t e 8,20 m",
  },
];

interface LinhaComparativo {
  label: string;
  valores: [string, string, string];
  destaque?: boolean;
}

interface GrupoComparativo {
  titulo: string;
  linhas: LinhaComparativo[];
}

const comparativo: GrupoComparativo[] = [
  {
    titulo: "Vocação",
    linhas: [
      {
        label: "Aplicação típica",
        valores: ["Distribuição pesada · regional", "Rota regional e longa", "Máximo volume por viagem"],
      },
      { label: "Configuração de eixos", valores: ["4x2", "4x2", "6x2 · 3º eixo elevável"], destaque: true },
      { label: "CNH mínima", valores: ["C", "C", "C"] },
    ],
  },
  {
    titulo: "Capacidades",
    linhas: [
      { label: "PBT homologado", valores: ["16.000 kg", "16.000 kg", "23.000 kg"], destaque: true },
      {
        label: "Carga útil + carroceria",
        valores: ["até 11.375 kg", "10.360 kg", "até 15.630 kg"],
        destaque: true,
      },
      { label: "PBT técnico", valores: ["18.700 kg", "18.000 kg", "26.000 kg"] },
      { label: "PBTC / CMT", valores: ["—", "34.000 kg", "36.000 kg"] },
    ],
  },
  {
    titulo: "Trem de força",
    linhas: [
      { label: "Motor", valores: ["Cummins F4.5", "Cummins D6.7", "Cummins D6.7"], destaque: true },
      {
        label: "Cilindrada",
        valores: ["4.460 cm³ · 4 cil.", "6.690 cm³ · 6 cil.", "6.690 cm³ · 6 cil."],
      },
      { label: "Potência", valores: ["220 cv", "282 cv", "320 cv"], destaque: true },
      { label: "Torque", valores: ["820 Nm", "1.100 Nm", "1.200 Nm"], destaque: true },
      {
        label: "Câmbio ZF",
        valores: ["6 marchas · manual", "9 marchas · AUTOMATIZADA", "9 marchas · AUTOMATIZADA"],
        destaque: true,
      },
      { label: "Freio-motor", valores: ["EAT", "EAT", "EAT"] },
    ],
  },
  {
    titulo: "Chassi e medidas",
    linhas: [
      {
        label: "Entre-eixos",
        valores: ["4.200 / 5.150 mm", "5.150 mm", "4.800+1.350 / 5.450+1.350 mm"],
      },
      {
        label: "Plataforma p/ carroceria",
        valores: ["até 6,80 m", "6,67 m", "7,55 – 8,20 m"],
        destaque: true,
      },
      { label: "Comprimento total", valores: ["7,65 – 8,90 m", "8,90 m", "9,72 – 10,37 m"] },
      {
        label: "Suspensão traseira",
        valores: ["Feixes parabólicos 4+3", "Feixes parabólicos 4+3", "A AR 2+2+1 · eixo elevável"],
        destaque: true,
      },
      { label: "Tanque (alumínio)", valores: ["260 / 450 L", "260 / 450 L", "450 L"] },
      { label: "Pneus", valores: ["275/80 R22.5", "275/80 R22.5", "295/80 R22.5"] },
    ],
  },
  {
    titulo: "Cabine e segurança",
    linhas: [
      {
        label: "Cabine",
        valores: [
          "Basculamento eletrohidráulico",
          "Semileito de série · basc. elétrico",
          "Semileito de série · basc. elétrico",
        ],
      },
      {
        label: "Freios",
        valores: [
          "Ar · circuito duplo · ESC",
          "Ar S-Cam · ABS+EBD+ESC/TCS",
          "Ar S-Cam · ABS+EBD+ESC/TCS",
        ],
      },
      {
        label: "Itens de destaque",
        valores: [
          "BSD + TPMS + cruise de série",
          "Cruise · aviso de sobrecarga · LCD 7”",
          "Idem 1830 + farol de neblina",
        ],
      },
    ],
  },
];

const implementos = [
  { nome: "Baú / Sider", icone: Package, compat: [true, true, true] },
  { nome: "Frigorífico / isotérmico", icone: Snowflake, compat: [true, true, true] },
  { nome: "Graneleiro / carga seca", icone: Layers, compat: [true, true, true] },
  { nome: "Basculante / caçamba", icone: Truck, compat: [true, true, true] },
  { nome: "Tanque / pipa", icone: Container, compat: [true, true, true] },
  { nome: "Plataforma / guincho pesado", icone: Wrench, compat: [true, true, true] },
];

const LinhaAuman = () => {
  const [perfilAtivo, setPerfilAtivo] = useState<string | null>(null);

  const irParaModelo = (id: string) => {
    setPerfilAtivo(id);
    document.getElementById(`modelo-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Linha Auman D — 1722, 1830 e 2632 | Comparativo completo | Lavoro Foton"
        description="Os caminhões pesados Foton Auman D lado a lado: 16 a 23 toneladas de PBT, Cummins de até 1.200 Nm, câmbio ZF automatizado e semileito de série. Compare capacidades, configurações e implementos. Lavoro Foton, Contagem MG."
        path="/linha-auman"
        ogImage="https://www.lavorofoton.com.br/og/linha-auman.jpg"
        jsonLd={[
          ...modelos.map((m) =>
            buildProductSchema({
              name: `Foton ${m.nome}`,
              model: m.nome,
              category: "Caminhão semipesado/pesado",
              description: `${m.tagline} PBT ${m.pbt}, motor ${m.motor}, ${m.potencia} e ${m.torque}.`,
              properties: [
                ["PBT", m.pbt],
                ["Carga útil + carroceria", m.cargaUtil],
                ["Motor", m.motor],
                ["Eixos", m.eixos],
              ],
            })
          ),
          buildFaqSchema([
            {
              question: "Qual Auman D tem câmbio automatizado?",
              answer:
                "O Auman D 1830 e o Auman D 2632 saem de fábrica com transmissão ZF de 9 marchas automatizada com conversor de torque. O Auman D 1722 usa câmbio ZF manual de 6 marchas.",
            },
            {
              question: "Qual caminhão pesado da Foton carrega mais?",
              answer:
                "O Auman D 2632 (6x2) leva até 15.630 kg de carga + carroceria, com plataforma de até 8,20 m na versão L e suspensão a ar com 3º eixo elevável de série.",
            },
            {
              question: "O Auman D tem cabine leito?",
              answer:
                "O Auman D 1830 e o 2632 têm cabine com semileito de série — item que na concorrência costuma ser opcional pago.",
            },
            {
              question: "Qual CNH preciso para dirigir um Auman D?",
              answer: "CNH categoria C — os três modelos são caminhões rígidos de carga.",
            },
          ]),
          speakableSchema,
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="relative bg-industrial-dark text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(213 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(213 100% 50%) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container mx-auto px-4 py-14 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-3">
                <img src={aumanLogoLight} alt="Auman" className="h-7 md:h-9 w-auto" />
                <p className="text-primary-light font-semibold tracking-[0.25em] text-sm md:text-base uppercase">
                  Linha D · 1722 | 1830 | 2632
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
                O pesado certo é o que cabe no seu frete.
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 max-w-xl">
                De 16 a 23 toneladas de PBT: Cummins de até 1.200 Nm, câmbio ZF automatizado e
                semileito de série — pra rodar longe e voltar inteiro.
              </p>
              <p className="text-primary-light font-semibold text-lg">
                Foton por dentro. Lavoro por perto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={() => window.open(wa("Olá! Quero conhecer a linha Auman D (1722, 1830 e 2632)."), "_blank")}
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Falar com um consultor
                </Button>
                <Button
                  onClick={() => document.getElementById("comparativo")?.scrollIntoView({ behavior: "smooth" })}
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white text-lg px-8 py-6 h-auto bg-white/5 hover:bg-white/15"
                >
                  Comparar os 3 modelos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <img src={cumminsLogo} alt="Cummins" className="h-6 object-contain" /> Cummins 6 cilindros
                </span>
                <span className="flex items-center gap-2">
                  <img src={zfLogo} alt="ZF" className="h-6 object-contain" /> ZF automatizada
                </span>
                <span className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-primary-light" /> Semileito de série
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-[var(--shadow-premium)]">
                <img
                  src={aumanHeroStudio}
                  alt="Chassi Foton Auman D — vista 3/4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NAV RÁPIDA (sticky) */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide py-2">
            {modelos.map((m) => (
              <button
                key={m.id}
                onClick={() => irParaModelo(m.id)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {m.numero}
              </button>
            ))}
            <button
              onClick={() => document.getElementById("comparativo")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-dark))] transition-colors"
            >
              Comparativo
            </button>
            <button
              onClick={() => document.getElementById("configuracoes")?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-primary hover:text-primary transition-colors"
            >
              Configurações
            </button>
            <Link
              to="/linha-aumark"
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-primary hover:text-primary transition-colors"
            >
              Linha Aumark →
            </Link>
          </div>
        </div>
      </div>

      {/* SELETOR POR PERFIL */}
      <section className="py-14 md:py-20 bg-secondary/60">
        <div className="container mx-auto px-4">
          <img src={aumanLogoDark} alt="Auman" className="h-6 md:h-8 w-auto mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Qual Auman D é o <span className="text-primary">seu</span>?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Comece pelo frete. O caminhão vem em seguida.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {perfis.map((p) => (
              <button
                key={p.id}
                onClick={() => irParaModelo(p.id)}
                className={`text-left p-6 rounded-2xl border-2 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                  perfilAtivo === p.id ? "border-primary shadow-lg" : "border-border hover:border-primary/40"
                }`}
              >
                <p className="font-bold text-lg mb-3 leading-snug">{p.titulo}</p>
                <p className="text-sm text-primary font-semibold flex items-center gap-1.5">
                  {p.resposta}
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* OS 3 MODELOS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 space-y-16 md:space-y-24">
          {modelos.map((m, i) => (
            <article
              key={m.id}
              id={`modelo-${m.id}`}
              className={`scroll-mt-24 max-w-6xl mx-auto rounded-3xl border transition-all duration-500 overflow-hidden ${
                perfilAtivo === m.id ? "border-primary shadow-[var(--shadow-premium)]" : "border-border shadow-[var(--shadow-card)]"
              }`}
            >
              <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className="[direction:ltr] flex flex-col">
                  <div className="relative flex-1 aspect-[4/3] lg:aspect-auto lg:min-h-[380px]">
                    <img src={m.foto} alt={m.fotoAlt} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-industrial-dark/85 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                        {m.eixos}
                      </span>
                      {m.cambio.includes("automatizada") && (
                        <span className="bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                          ZF automatizada
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-0.5 bg-border">
                    {m.galeria.map((g) => (
                      <div key={g.alt} className="h-28 md:h-40 overflow-hidden">
                        <img src={g.src} alt={g.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 md:p-10 [direction:ltr] relative">
                  <span
                    aria-hidden
                    className="absolute -top-2 right-4 text-[6rem] md:text-[8rem] font-bold leading-none text-foreground/[0.04] select-none pointer-events-none"
                  >
                    {m.numero}
                  </span>
                  <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-1">Foton</p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2">{m.nome}</h3>
                  <p className="text-xl md:text-2xl font-semibold text-primary mb-4">{m.tagline}</p>
                  <p className="text-muted-foreground mb-6">{m.descricao}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-secondary rounded-xl p-3 text-center">
                      <Scale className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">PBT</p>
                      <p className="font-bold text-sm md:text-base">{m.pbt}</p>
                    </div>
                    <div className="bg-secondary rounded-xl p-3 text-center">
                      <Package className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Carga + carroceria</p>
                      <p className="font-bold text-sm md:text-base">{m.cargaUtil}</p>
                    </div>
                    <div className="bg-secondary rounded-xl p-3 text-center">
                      <Gauge className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">{m.potencia}</p>
                      <p className="font-bold text-sm md:text-base">{m.torque}</p>
                    </div>
                    <div className="bg-secondary rounded-xl p-3 text-center">
                      <Ruler className="h-5 w-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Plataforma</p>
                      <p className="font-bold text-sm md:text-base">{m.plataforma}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {m.destaques.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm md:text-base">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {m.aplicacoes.map((a) => (
                      <span key={a} className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => window.open(wa(m.waMsg), "_blank")}
                      className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
                      size="lg"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Consultar o {m.numero}
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to={m.rota}>
                        Página completa
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARATIVO COMPLETO */}
      <section id="comparativo" className="scroll-mt-14 py-16 md:py-24 bg-industrial-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Os três, <span className="text-primary-light">lado a lado</span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Dados das fichas técnicas oficiais Foton do Brasil.
          </p>

          <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[680px] text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-white/[0.06]">
                  <th className="sticky left-0 bg-industrial-dark md:bg-transparent text-left p-4 min-w-[180px]">
                    <img src={aumanLogoLight} alt="Linha Auman" className="h-5 md:h-6 w-auto" />
                  </th>
                  {modelos.map((m) => (
                    <th key={m.id} className="p-4 text-center min-w-[160px]">
                      <span className="block text-2xl md:text-3xl font-bold text-primary-light">{m.numero}</span>
                      <span className="block text-xs text-gray-400 font-normal mt-1">
                        {m.eixos} · PBT {m.pbt}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.map((grupo) => (
                  <Fragment key={grupo.titulo}>
                    <tr className="bg-primary/15">
                      <td colSpan={4} className="p-3 pl-4 font-bold uppercase tracking-widest text-xs text-primary-light">
                        {grupo.titulo}
                      </td>
                    </tr>
                    {grupo.linhas.map((linha) => (
                      <tr key={linha.label} className="border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                        <td className="sticky left-0 bg-industrial-dark p-4 text-gray-300 font-medium">{linha.label}</td>
                        {linha.valores.map((v, idx) => (
                          <td
                            key={idx}
                            className={`p-4 text-center ${linha.destaque ? "font-bold text-white" : "text-gray-300"}`}
                          >
                            {v === "—" ? <Minus className="h-4 w-4 mx-auto text-gray-600" /> : v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
                <tr className="border-t border-white/[0.06] bg-primary/10">
                  <td className="sticky left-0 bg-industrial-dark p-4 font-medium text-gray-300">Garantia</td>
                  <td colSpan={3} className="p-4 text-center font-bold text-primary-light">
                    <ShieldCheck className="inline h-5 w-5 mr-2 -mt-1" />3 anos — motor e câmbio sem limite de quilometragem*
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4 max-w-3xl mx-auto">
            *Auman D 1830 e 2632: o 1º ano cobre o veículo completo; motor e câmbio seguem cobertos até o 3º ano, sempre
            sem limite de km. Pesos e medidas podem variar com itens opcionais (tolerância ±3%, NBR ISO 1176).
          </p>
        </div>
      </section>

      {/* CONFIGURAÇÕES E IMPLEMENTOS */}
      <section id="configuracoes" className="scroll-mt-14 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            O que entra em <span className="text-primary">cada modelo</span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Os três aceitam os principais implementos rodoviários — o que muda é a escala: plataforma de 6,7 a 8,2 m e
            carga de 10,4 a 15,6 toneladas.
          </p>

          {/* Matriz de implementos */}
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border shadow-[var(--shadow-card)] mb-14">
            <table className="w-full min-w-[560px] border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left p-4 font-semibold min-w-[220px]">Implemento</th>
                  {modelos.map((m) => (
                    <th key={m.id} className="p-4 text-center font-bold text-primary">
                      {m.numero}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {implementos.map((imp) => (
                  <tr key={imp.nome} className="border-t border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-4 font-medium flex items-center gap-3">
                      <imp.icone className="h-5 w-5 text-primary shrink-0" />
                      {imp.nome}
                    </td>
                    {imp.compat.map((ok, idx) => (
                      <td key={idx} className="p-4 text-center">
                        {ok ? (
                          <Check className="h-5 w-5 mx-auto text-primary" />
                        ) : (
                          <Minus className="h-5 w-5 mx-auto text-muted-foreground/40" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards de configuração por modelo */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
            {modelos.map((m) => (
              <div key={m.id} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-4">
                  <Settings2 className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">{m.nome}</h3>
                </div>
                <dl className="space-y-3 text-sm md:text-base">
                  <div>
                    <dt className="font-semibold text-primary">Chassi</dt>
                    <dd className="text-muted-foreground">{m.chassi}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary">Câmbio</dt>
                    <dd className="text-muted-foreground">{m.cambio}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-primary">Versões</dt>
                    <dd className="text-muted-foreground">{m.versoes}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* Fotos de detalhes que vendem */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <figure className="rounded-2xl overflow-hidden border border-border">
              <div className="aspect-[4/3]">
                <img src={aumanD2632SuspensaoAr} alt="Suspensão a ar com 3º eixo elevável" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
                <Wind className="h-4 w-4 text-primary" /> Suspensão a ar 2+2+1 — 3º eixo que sobe vazio (2632)
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-border">
              <div className="aspect-[4/3]">
                <img src={aumanD2632SemiLeito} alt="Cabine com semileito de série" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
                <BedDouble className="h-4 w-4 text-primary" /> Semileito de série — motorista descansado rende mais
              </figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-border">
              <div className="aspect-[4/3]">
                <img src={aumanD2632Tanque} alt="Tanque de combustível em alumínio" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-muted-foreground">
                Tanque de alumínio até 450 L — mais autonomia, menos parada
              </figcaption>
            </figure>
          </div>
          <p className="text-center text-muted-foreground text-xs mt-6 max-w-3xl mx-auto">
            Matriz orientativa. O dimensionamento final do implemento é feito com nosso time comercial, conforme a
            operação e a legislação de pesos e dimensões.
          </p>
        </div>
      </section>

      {/* DNA DA LINHA */}
      <section className="py-16 md:py-24 bg-secondary/60">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Um só <span className="text-primary">DNA</span>, três tamanhos de frete
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <img src={cumminsLogo} alt="Cummins" className="h-12 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-lg mb-2">Cummins de série</h3>
              <p className="text-sm text-muted-foreground">
                F4.5 e D6.7 — o motor de 1 milhão de quilômetros, em toda a linha.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <img src={zfLogo} alt="ZF" className="h-12 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-lg mb-2">ZF automatizada</h3>
              <p className="text-sm text-muted-foreground">
                9 marchas com conversor de torque no 1830 e 2632 — de série.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <img src={garantia3AnosIcon} alt="Garantia 3 anos" className="h-12 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-lg mb-2">3 anos motor e câmbio</h3>
              <p className="text-sm text-muted-foreground">
                Sem limite de quilometragem. Rode o quanto o frete pedir.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-center gap-3 h-12 mb-4">
                <img src={boschLogo} alt="Bosch" className="h-8 object-contain" />
                <img src={danaLogo} alt="Dana" className="h-8 object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2">Componentes globais</h3>
              <p className="text-sm text-muted-foreground">
                Bosch e Dana por dentro: peça conhecida, oficina tranquila.
              </p>
            </div>
          </div>
          <p className="text-center mt-12 text-xl md:text-2xl font-bold">
            A marca pode ser nova pra você. <span className="text-primary">O que tem dentro, você confia há décadas.</span>
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative text-white overflow-hidden">
        <img src={auman2632Chassi6x2} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-industrial-dark/85" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <img src={aumanLogoLight} alt="Auman" className="h-8 md:h-10 w-auto mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold">Qual número puxa o seu frete: 1722, 1830 ou 2632?</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Conte a sua rota pra gente. A resposta vem com caminhão, implemento e conta feita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                onClick={() => window.open(wa("Olá! Quero ajuda para escolher o Auman D ideal para o meu frete."), "_blank")}
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-6 h-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Escolher meu Auman no WhatsApp
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
              Lavoro Foton — concessionária oficial Foton · Contagem/MG · Foton por dentro. Lavoro por perto.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LinhaAuman;
