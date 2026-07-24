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
} from "lucide-react";

// Fotos — acervo oficial Lavoro/Foton
import heroChassiNovo from "@/assets/aumark-linha-chassi-novo.webp";
import aumarkBauLateral from "@/assets/aumark-bau-lateral.webp";
import aumarkCabineBasculada from "@/assets/aumark-cabine-basculada.webp";
import aumark1217Carroceria from "@/assets/aumark-1217-carroceria.webp";
import aumark1217Estrada from "@/assets/aumark-1217-estrada.webp";
import aumarkS315Hero from "@/assets/aumark-s315-hero.png";
import eagleEyeExt from "@/assets/aumark-eagle-eye-ext.jpg";
import eagleEyeCarroceria from "@/assets/aumark-eagle-eye-carroceria.jpg";
import foton1217 from "@/assets/foton-1217.jpg";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import garantia3AnosIcon from "@/assets/garantia-3anos-foton.png";
import aumarkLogoLight from "@/assets/aumark-logo-light.png";
import aumarkLogoDark from "@/assets/aumark-logo-dark.png";
import aumarkChassiLateralNovo from "@/assets/aumark-chassi-lateral-novo.webp";
import aumarkFrontalNovo from "@/assets/aumark-frontal-novo.webp";
import aumarkMotorVertical from "@/assets/aumark-motor-cummins-vertical.webp";
import aumarkMotorExposto from "@/assets/aumark-motor-cummins-exposto.webp";
import eagleEyeBasculante from "@/assets/aumark-eagle-eye-basculante.jpg";

const WHATSAPP = "5531997966042";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

interface ModeloAumark {
  id: string;
  nome: string;
  numero: string;
  tagline: string;
  descricao: string;
  foto: string;
  fotoAlt: string;
  rota: string;
  cnh: string;
  pbt: string;
  cargaUtil: string;
  potencia: string;
  torque: string;
  motor: string;
  plataforma: string;
  cambio: string;
  chassi: string;
  versoes: string;
  cabineNova: boolean;
  galeria: { src: string; alt: string }[];
  aplicacoes: string[];
  destaques: string[];
  waMsg: string;
}

const modelos: ModeloAumark[] = [
  {
    id: "s315",
    nome: "Aumark S315",
    numero: "315",
    tagline: "O caminhão da CNH B.",
    descricao:
      "Parece caminhão porque é caminhão — chassi, rodado duplo e motor Cummins. A diferença: com PBT de 3.500 kg, você dirige com a habilitação que já tem.",
    foto: aumarkFrontalNovo,
    fotoAlt: "Foton Aumark S315 — caminhão urbano com CNH B",
    galeria: [
      { src: aumarkMotorExposto, alt: "Motor Cummins do Aumark exposto no chassi" },
      { src: aumarkS315Hero, alt: "Aumark S315 em operação urbana" },
    ],
    rota: "/modelos/aumark-s315",
    cnh: "B",
    pbt: "3.500 kg",
    cargaUtil: "até 1.160 kg",
    potencia: "150 cv",
    torque: "400 Nm",
    motor: "Cummins F2.5",
    plataforma: "3,61 a 4,17 m",
    cambio: "ZF 5 marchas · manual ou automatizada*",
    chassi: "2 opções de entre-eixos: 315 (2.800 mm) e 315L (3.360 mm)",
    versoes: "Padrão e TOP (câmera 360°, detecção de ponto cego, monitor de fadiga, central 10,25”, EPB, TPMS)",
    cabineNova: true,
    aplicacoes: ["Last-mile e e-commerce", "Entregas urbanas", "Prestador de serviço PJ", "Pequeno e médio varejo"],
    destaques: [
      "Único da linha dirigível com CNH B",
      "Airbag duplo e freio a disco dianteiro de série",
      "Torque de 400 Nm — força de caminhão grande no trânsito da cidade",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Aumark S315 (CNH B).",
  },
  {
    id: "s715",
    nome: "Aumark S715",
    numero: "715",
    tagline: "Sete toneladas com jeito de cidade.",
    descricao:
      "O passo acima do VUC: 4.520 kg de carga + carroceria num caminhão ágil, com a mesma cabine nova do S315 e controle de cruzeiro de série.",
    foto: aumarkChassiLateralNovo,
    fotoAlt: "Foton Aumark S715 — chassi 7 toneladas cabine nova",
    galeria: [
      { src: heroChassiNovo, alt: "Aumark cabine nova — vista 3/4 do chassi" },
      { src: eagleEyeExt, alt: "Aumark S715 rodando na cidade" },
    ],
    rota: "/modelos/aumark-715",
    cnh: "C",
    pbt: "7.000 kg",
    cargaUtil: "4.520 kg",
    potencia: "150 cv",
    torque: "400 Nm",
    motor: "Cummins F2.5",
    plataforma: "4,20 m",
    cambio: "ZF 5 marchas · manual ou automatizada*",
    chassi: "Entre-eixos 3.360 mm",
    versoes: "Padrão e Plus (câmera 360°, alerta de ponto cego, sensor de fadiga, central 10”)",
    cabineNova: true,
    aplicacoes: ["Distribuição urbana e regional", "Atacado e bebidas", "Mudanças e logística", "Frotas de entrega"],
    destaques: [
      "Freio a ar — raridade no segmento de 7 t",
      "Controle de cruzeiro (ACC) de série",
      "Cabine nova: a mesma do S315, com interior atualizado",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Aumark S715 (7 toneladas).",
  },
  {
    id: "s916",
    nome: "Aumark S916",
    numero: "916",
    tagline: "A tara mais leve. A conta que fecha.",
    descricao:
      "Peso em ordem de marcha de 2.979 kg — tara baixa que vira carga paga: 6.021 kg de capacidade para carga + carroceria, com motor Cummins F3.8 e freio-motor EAT.",
    foto: eagleEyeCarroceria,
    fotoAlt: "Foton Aumark S916 — caminhão 9 toneladas com carroceria",
    galeria: [
      { src: aumarkMotorVertical, alt: "Motor Cummins F3.8 no chassi do Aumark" },
      { src: eagleEyeBasculante, alt: "Aumark S916 com implemento basculante" },
    ],
    rota: "/modelos/aumark-916",
    cnh: "C",
    pbt: "9.000 kg",
    cargaUtil: "6.021 kg",
    potencia: "160 cv",
    torque: "500 Nm",
    motor: "Cummins F3.8",
    plataforma: "5,14 m",
    cambio: "ZF 6 marchas · manual ou automatizada*",
    chassi: "Entre-eixos 3.800 mm",
    versoes: "Padrão e Plus (câmera 360°, alerta de ponto cego, sensor de fadiga, central 10”)",
    cabineNova: true,
    aplicacoes: ["Distribuição regional", "Frigorífico e cadeia fria", "Bebidas e atacado", "Basculante e construção"],
    destaques: [
      "Tara baixa — carrega mais do que a concorrência do segmento",
      "Freio-motor EAT para descidas com segurança",
      "Motor Cummins F3.8 com 500 Nm de torque",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Aumark S916 (9 toneladas).",
  },
  {
    id: "s1217",
    nome: "Aumark S1217",
    numero: "1217",
    tagline: "Mais carga por viagem. Menos viagens por dia.",
    descricao:
      "O topo da linha: até 8.326 kg de carga + carroceria e plataforma de até 6,15 m. Cummins F3.8 de 170 cv e 600 Nm para rota cheia, o dia inteiro.",
    foto: foton1217,
    fotoAlt: "Foton Aumark S1217 — caminhão 12 toneladas",
    galeria: [
      { src: aumark1217Carroceria, alt: "Aumark S1217 com carroceria aberta" },
      { src: aumark1217Estrada, alt: "Aumark S1217 na estrada" },
    ],
    rota: "/modelos/aumark-1217",
    cnh: "C",
    pbt: "11.500 kg",
    cargaUtil: "até 8.326 kg",
    potencia: "170 cv",
    torque: "600 Nm",
    motor: "Cummins F3.8",
    plataforma: "5,14 a 6,15 m",
    cambio: "ZF 6 marchas · manual",
    chassi: "2 opções de entre-eixos: B (3.800 mm) e A (4.500 mm, plataforma de 6,15 m)",
    versoes: "Versão única completa (central multimídia com câmera de ré opcional)",
    cabineNova: false,
    aplicacoes: ["Rotas de maior volume", "Basculante e mineração leve", "Bebidas e grandes atacados", "Transportadoras"],
    destaques: [
      "600 Nm de torque — o mais forte da linha",
      "Plataforma de até 6,15 m para carrocerias grandes",
      "Freio-motor EAT e freios a ar com ABS + ASR + ESC",
    ],
    waMsg: "Olá! Quero saber mais sobre o Foton Aumark S1217 (12 toneladas).",
  },
];

const perfis = [
  {
    id: "s315",
    titulo: "“Não tenho CNH de caminhão”",
    resposta: "Aumark S315 — dirige com CNH B",
  },
  {
    id: "s715",
    titulo: "“Entrego na cidade, o VUC ficou pequeno”",
    resposta: "Aumark S715 — 4,5 t de carga + carroceria",
  },
  {
    id: "s916",
    titulo: "“Distribuição regional, custo por kg importa”",
    resposta: "Aumark S916 — tara baixa, 6 t de capacidade",
  },
  {
    id: "s1217",
    titulo: "“Quero levar mais em cada viagem”",
    resposta: "Aumark S1217 — até 8,3 t e 6,15 m de plataforma",
  },
];

interface LinhaComparativo {
  label: string;
  valores: [string, string, string, string];
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
        valores: ["Urbano leve · last-mile", "Urbano / regional", "Distribuição regional", "Rotas de maior volume"],
      },
      { label: "CNH mínima", valores: ["B", "C", "C", "C"], destaque: true },
      {
        label: "Versões",
        valores: ["Padrão · TOP", "Padrão · Plus", "Padrão · Plus", "Única (chassi A ou B)"],
      },
    ],
  },
  {
    titulo: "Capacidades",
    linhas: [
      { label: "PBT homologado", valores: ["3.500 kg", "7.000 kg", "9.000 kg", "11.500 kg"], destaque: true },
      {
        label: "Carga útil + carroceria",
        valores: ["até 1.160 kg", "4.520 kg", "6.021 kg", "até 8.326 kg"],
        destaque: true,
      },
      { label: "PBT técnico", valores: ["4.800 kg", "7.500 kg", "9.800 kg", "12.000 kg"] },
      { label: "CMT (cap. máx. de tração)", valores: ["5.000 kg", "9.000 kg", "12.000 kg", "14.000 kg"] },
    ],
  },
  {
    titulo: "Trem de força",
    linhas: [
      { label: "Motor", valores: ["Cummins F2.5", "Cummins F2.5", "Cummins F3.8", "Cummins F3.8"], destaque: true },
      { label: "Cilindrada", valores: ["2.498 cm³ · 4 cil.", "2.498 cm³ · 4 cil.", "3.760 cm³ · 4 cil.", "3.760 cm³ · 4 cil."] },
      { label: "Potência", valores: ["150 cv", "150 cv", "160 cv", "170 cv"], destaque: true },
      { label: "Torque", valores: ["400 Nm", "400 Nm", "500 Nm", "600 Nm"], destaque: true },
      {
        label: "Câmbio ZF",
        valores: ["5 marchas · man. ou aut.*", "5 marchas · man. ou aut.*", "6 marchas · man. ou aut.*", "6 marchas · manual"],
      },
      { label: "Freio-motor", valores: ["—", "—", "EAT", "EAT"] },
    ],
  },
  {
    titulo: "Chassi e medidas",
    linhas: [
      { label: "Entre-eixos", valores: ["2.800 / 3.360 mm", "3.360 mm", "3.800 mm", "3.800 / 4.500 mm"] },
      {
        label: "Plataforma p/ carroceria",
        valores: ["3,61 – 4,17 m", "4,20 m", "5,14 m", "5,14 – 6,15 m"],
        destaque: true,
      },
      { label: "Comprimento total", valores: ["5,38 – 5,96 m", "5,96 m", "6,92 m", "6,89 – 8,00 m"] },
      { label: "Tanque (alumínio)", valores: ["80 / 120 L", "120 L", "160 L", "160 / 200 L"] },
      { label: "Pneus", valores: ["205/75 R16", "205/75 R17,5", "215/75 R17,5", "235/75 R17,5"] },
    ],
  },
  {
    titulo: "Segurança",
    linhas: [
      {
        label: "Freios",
        valores: [
          "A ar · disco diant. + tambor tras.",
          "A ar · tambor",
          "A ar · tambor + EAT",
          "A ar · tambor + EAT",
        ],
      },
      {
        label: "Controles eletrônicos",
        valores: ["ABS + ASR + ESC + HSA", "ABS + ASR + ESC", "ABS + ASR + ESC", "ABS + ASR + ESC"],
      },
      {
        label: "Itens de destaque",
        valores: [
          "Airbag duplo · faróis LED · painel 7”",
          "Cruise control · vidros elétricos",
          "Cruise control · vidros elétricos",
          "Cruise control · vidros elétricos",
        ],
      },
    ],
  },
];

const implementos = [
  { nome: "Baú carga seca", icone: Package, compat: [true, true, true, true] },
  { nome: "Baú refrigerado / isotérmico", icone: Snowflake, compat: [true, true, true, true] },
  { nome: "Carroceria aberta / grade baixa", icone: Layers, compat: [true, true, true, true] },
  { nome: "Sider (lona lateral)", icone: Container, compat: [true, true, true, true] },
  { nome: "Basculante / caçamba", icone: Truck, compat: [true, true, true, true] },
  { nome: "Plataforma / guincho", icone: Wrench, compat: [true, true, true, true] },
];

const LinhaAumark = () => {
  const [perfilAtivo, setPerfilAtivo] = useState<string | null>(null);

  const irParaModelo = (id: string) => {
    setPerfilAtivo(id);
    document.getElementById(`modelo-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Linha Aumark — 315, 715, 916 e 1217 | Comparativo completo | Lavoro Foton"
        description="Os 4 caminhões Foton Aumark lado a lado: do S315 com CNH B ao S1217 de 12 toneladas. Compare PBT, carga útil, motor Cummins, câmbio ZF, configurações e implementos. Lavoro Foton, Contagem MG."
        path="/linha-aumark"
        ogImage="https://www.lavorofoton.com.br/og/linha-aumark.jpg"
        jsonLd={[
          ...modelos.map((m) =>
            buildProductSchema({
              name: `Foton ${m.nome}`,
              model: m.nome,
              category: "Caminhão leve/semileve",
              description: `${m.tagline} PBT ${m.pbt}, motor ${m.motor}, ${m.potencia} e ${m.torque}.`,
              properties: [
                ["PBT", m.pbt],
                ["Carga útil + carroceria", m.cargaUtil],
                ["Motor", m.motor],
                ["CNH", m.cnh],
              ],
            })
          ),
          buildFaqSchema([
            {
              question: "Qual caminhão da linha Aumark pode ser dirigido com CNH B?",
              answer:
                "O Foton Aumark S315, com PBT de 3.500 kg — o limite da habilitação B. Os demais modelos (715, 916 e 1217) exigem CNH C.",
            },
            {
              question: "Qual Aumark carrega mais?",
              answer:
                "O Aumark S1217 leva até 8.326 kg de carga + carroceria, com plataforma de até 6,15 m. Na faixa de 9 toneladas, o S916 se destaca pela tara baixa: 6.021 kg de capacidade.",
            },
            {
              question: "A linha Aumark tem câmbio automatizado?",
              answer:
                "Sim. Os modelos S315, S715 e S916 aceitam transmissão ZF automatizada além da manual. Consulte disponibilidade com a Lavoro Foton.",
            },
            {
              question: "Quais implementos posso montar num Aumark?",
              answer:
                "Baú de carga seca, baú refrigerado, carroceria aberta, sider, basculante e plataforma, conforme o modelo. A Lavoro Foton dimensiona o implemento ideal para cada operação.",
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
                <img src={aumarkLogoLight} alt="Aumark" className="h-7 md:h-9 w-auto" />
                <p className="text-primary-light font-semibold tracking-[0.25em] text-sm md:text-base uppercase">
                  Linha completa · 315 | 715 | 916 | 1217
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.05]">
                O caminhão certo é o que cabe na sua operação.
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 max-w-xl">
                Da entrega de bairro com CNH B às 8 toneladas por viagem — quatro tamanhos, um só DNA:
                motor Cummins, câmbio ZF e 3 anos de garantia sem limite de km.
              </p>
              <p className="text-primary-light font-semibold text-lg">
                Foton por dentro. Lavoro por perto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  onClick={() => window.open(wa("Olá! Quero conhecer a linha Aumark (315, 715, 916 e 1217)."), "_blank")}
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
                  Comparar os 4 modelos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <img src={cumminsLogo} alt="Cummins" className="h-6 object-contain" /> Motor Cummins de série
                </span>
                <span className="flex items-center gap-2">
                  <img src={zfLogo} alt="ZF" className="h-6 object-contain" /> Câmbio ZF
                </span>
                <span className="flex items-center gap-2">
                  <img src={garantia3AnosIcon} alt="Garantia 3 anos" className="h-6 object-contain" /> 3 anos sem limite de km
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-[var(--shadow-premium)]">
                <img
                  src={heroChassiNovo}
                  alt="Chassi Foton Aumark — nova cabine"
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
              to="/linha-auman"
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-primary hover:text-primary transition-colors"
            >
              Linha Auman D →
            </Link>
          </div>
        </div>
      </div>

      {/* SELETOR POR PERFIL */}
      <section className="py-14 md:py-20 bg-secondary/60">
        <div className="container mx-auto px-4">
          <img src={aumarkLogoDark} alt="Aumark" className="h-6 md:h-8 w-auto mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3">
            Qual Aumark é o <span className="text-primary">seu</span>?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Comece pela sua operação. O caminhão vem em seguida.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
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

      {/* OS 4 MODELOS */}
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
                        CNH {m.cnh}
                      </span>
                      {m.cabineNova && (
                        <span className="bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                          Nova cabine
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
                    className="absolute -top-2 right-4 text-[7rem] md:text-[9rem] font-bold leading-none text-foreground/[0.04] select-none pointer-events-none"
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
            Os quatro, <span className="text-primary-light">lado a lado</span>
          </h2>
          <p className="text-center text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Dados das fichas técnicas oficiais Foton do Brasil.
          </p>

          <div className="max-w-6xl mx-auto overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[760px] text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-white/[0.06]">
                  <th className="sticky left-0 bg-industrial-dark md:bg-transparent text-left p-4 min-w-[180px]">
                    <img src={aumarkLogoLight} alt="Linha Aumark" className="h-5 md:h-6 w-auto" />
                  </th>
                  {modelos.map((m) => (
                    <th key={m.id} className="p-4 text-center min-w-[150px]">
                      <span className="block text-2xl md:text-3xl font-bold text-primary-light">{m.numero}</span>
                      <span className="block text-xs text-gray-400 font-normal mt-1">PBT {m.pbt}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativo.map((grupo) => (
                  <Fragment key={grupo.titulo}>
                    <tr className="bg-primary/15">
                      <td colSpan={5} className="p-3 pl-4 font-bold uppercase tracking-widest text-xs text-primary-light">
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
                  <td colSpan={4} className="p-4 text-center font-bold text-primary-light">
                    <ShieldCheck className="inline h-5 w-5 mr-2 -mt-1" />3 anos de garantia — sem limite de quilometragem
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4 max-w-3xl mx-auto">
            *Câmbio automatizado ZF e versões TOP/Plus: disponibilidade conforme lote de produção — confirme com nosso
            time. Pesos e medidas podem variar com itens opcionais (tolerância ±3%, NBR ISO 1176).
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
            Chassi, câmbio, versões e implementos: a linha Aumark se monta em volta da sua carga.
          </p>

          {/* Matriz de implementos */}
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-border shadow-[var(--shadow-card)] mb-14">
            <table className="w-full min-w-[640px] border-collapse text-sm md:text-base">
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
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
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

          {/* Fotos de aplicações reais */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <figure className="rounded-2xl overflow-hidden border border-border bg-industrial-dark">
              <div className="aspect-[4/3]">
                <img src={aumarkBauLateral} alt="Aumark com baú de carga seca" className="w-full h-full object-contain p-4" />
              </div>
              <figcaption className="p-4 text-sm text-center text-white/80">Baú de carga seca — o clássico da distribuição</figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-border">
              <div className="aspect-[4/3]">
                <img src={aumark1217Carroceria} alt="Aumark 1217 com carroceria aberta" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-muted-foreground">Carroceria aberta — versatilidade pra qualquer carga</figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-border">
              <div className="aspect-[4/3]">
                <img src={aumarkCabineBasculada} alt="Cabine basculante do Aumark" className="w-full h-full object-cover" />
              </div>
              <figcaption className="p-4 text-sm text-center text-muted-foreground">Cabine basculante — manutenção rápida, caminhão na rua</figcaption>
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
            Um só <span className="text-primary">DNA</span>, quatro tamanhos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <img src={cumminsLogo} alt="Cummins" className="h-12 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-lg mb-2">Motor Cummins de série</h3>
              <p className="text-sm text-muted-foreground">
                O motor de 1 milhão de quilômetros, em toda a linha — sem upgrade pago.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <img src={zfLogo} alt="ZF" className="h-12 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-lg mb-2">Câmbio ZF</h3>
              <p className="text-sm text-muted-foreground">
                Precisão alemã nas trocas — manual ou automatizado, conforme o modelo.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <img src={garantia3AnosIcon} alt="Garantia 3 anos" className="h-12 mx-auto mb-4 object-contain" />
              <h3 className="font-bold text-lg mb-2">3 anos sem limite de km</h3>
              <p className="text-sm text-muted-foreground">
                Rode o quanto a operação pedir. A garantia acompanha.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-center gap-3 h-12 mb-4">
                <img src={boschLogo} alt="Bosch" className="h-8 object-contain" />
                <img src={danaLogo} alt="Dana" className="h-8 object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2">Componentes globais</h3>
              <p className="text-sm text-muted-foreground">
                Bosch e Dana por dentro: peça conhecida, mecânico tranquilo.
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
        <img src={aumark1217Estrada} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-industrial-dark/80" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <img src={aumarkLogoLight} alt="Aumark" className="h-8 md:h-10 w-auto mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold">Qual número faz sentido pra você: 315, 715, 916 ou 1217?</h2>
            <p className="text-lg md:text-xl text-gray-300">
              Conte a sua operação pra gente. A resposta vem com caminhão, implemento e conta feita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                onClick={() => window.open(wa("Olá! Quero ajuda para escolher o Aumark ideal para a minha operação."), "_blank")}
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-6 h-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Escolher meu Aumark no WhatsApp
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

export default LinhaAumark;
