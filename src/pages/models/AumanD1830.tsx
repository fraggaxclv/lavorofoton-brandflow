import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  MessageSquare,
  Truck,
  BedDouble,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  Store,
  Moon,
  Users,
  Clock,
  Landmark,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import aumanD1830Hero from "@/assets/auman-d-1830-hero.png";
import aumanD1830Lateral from "@/assets/auman-d-1830-lateral.png";
import aumanD1830GradeFrontal from "@/assets/auman-d-1830-grade-frontal.png";
import cabineInterior from "@/assets/auman-d-cabine-interior.png";
import cabinePainel from "@/assets/auman-d-2632-cabine-painel.png";
import cabineSemiLeito from "@/assets/auman-d-2632-cabine-semi-leito.png";
import motorCummins from "@/assets/auman-d-2632-motor-cummins.png";
import tanqueAluminio from "@/assets/auman-d-2632-tanque-aluminio.png";

import cumminsLogo from "@/assets/cummins-logo-full.png";
import zfLogo from "@/assets/zf-logo-full.png";
import boschLogo from "@/assets/bosch-logo-full.png";
import danaLogo from "@/assets/dana-logo-full.png";
import garantia3AnosIcon from "@/assets/garantia-3anos-foton.png";
import chassiReforcadoIcon from "@/assets/chassi-reforcado-icon.png";
import tanqueAluminioIcon from "@/assets/tanque-aluminio-icon.png";

const AumanD1830 = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const whatsappNumber = "5531997966042";
  const whatsappMessage = "Olá! Vim pelo site e quero saber mais sobre o Foton Auman D 1830.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const productImages = [
    { src: aumanD1830Hero, alt: "Foton Auman D 1830 — Vista frontal", caption: "Foton Auman D 1830 — Vista frontal" },
    { src: aumanD1830Lateral, alt: "Foton Auman D 1830 — Lateral, chassi 4x2", caption: "Foton Auman D 1830 — Lateral, chassi 4x2" },
    { src: aumanD1830GradeFrontal, alt: "Identidade visual Auman D — Grade frontal", caption: "Identidade visual Auman D — Grade frontal" },
    { src: cabineInterior, alt: "Cabine — Bancos e ergonomia", caption: "Cabine — Bancos e ergonomia" },
    { src: cabineSemiLeito, alt: "Cabine — Espaço de descanso traseiro (semi leito)", caption: "Cabine — Espaço de descanso traseiro (semi leito)" },
  ];

  const openLightbox = (i: number) => { setCurrentImageIndex(i); setLightboxOpen(true); };
  const next = () => setCurrentImageIndex((p) => (p + 1) % productImages.length);
  const prev = () => setCurrentImageIndex((p) => (p - 1 + productImages.length) % productImages.length);
  const scrollCta = () => document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Foton Auman D 1830 — Toco 4x2, 18T, ZF Automatizado e Semi Leito de Série | Lavoro Foton MG</title>
        <meta name="description" content="Foton Auman D 1830: motor Cummins D6.7 com 282 cv, câmbio ZF automatizado de 9 marchas, cabine com semi leito de série e 3 anos de garantia em motor e câmbio sem limite de km. Comparativo com VW Constellation, Mercedes Atego, Iveco Tector e Volvo VM." />
        <meta property="og:title" content="Foton Auman D 1830 — 18T com ZF Automatizado e Semi Leito | Lavoro Foton" />
        <meta property="og:description" content="Motor Cummins. ZF automatizado 9 marchas. Semi leito de série. 3 anos sem limite km." />
        <meta property="og:image" content="https://www.lavorofoton.com.br/og-auman-d-1830.png" />
        <meta property="og:url" content="https://www.lavorofoton.com.br/modelos/auman-d-1830" />
        <link rel="canonical" href="https://www.lavorofoton.com.br/modelos/auman-d-1830" />
      </Helmet>

      <Navbar />

      {/* 1. HERO */}
      <section className="relative bg-industrial-dark text-white overflow-hidden mt-16">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">Foton Auman D 1830</h1>
              <p className="text-xl md:text-2xl text-gray-300">
                O 18 toneladas que chegou pra mudar a régua do semipesado brasileiro.
                <br />
                <span className="text-primary font-semibold">
                  Motor Cummins D6.7. Câmbio ZF automatizado 9 marchas. Cabine com semi leito de série. 3 anos de garantia sem limite de km. Sem opcional, sem upgrade pago.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto">
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Falar no WhatsApp agora
                  </a>
                </Button>
                <Button onClick={scrollCta} size="lg" variant="outline" className="border-white text-white text-lg px-8 py-6 h-auto bg-blue-900 hover:bg-blue-800">
                  Solicitar Proposta
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-video rounded-lg overflow-hidden">
                <img src={aumanD1830Hero} alt="Foton Auman D 1830 — Vista frontal" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRINCIPAIS MOTIVOS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-foreground">
            Principais motivos para escolher o <span className="text-primary">1830</span>
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Truck className="w-full h-full text-primary" />, label: "Câmbio ZF automatizado 9 marchas (série)" },
              { img: cumminsLogo, alt: "Cummins", label: "Motor Cummins D6.7 — 282 cv" },
              { img: zfLogo, alt: "ZF", label: "Conversor de torque automatizado" },
              { duo: [boschLogo, danaLogo], label: "Componentes Bosch + Dana" },
              { icon: <BedDouble className="w-full h-full text-primary" />, label: "Cabine com semi leito de série" },
              { img: chassiReforcadoIcon, alt: "PBT", label: "PBT 18t | PBTC 34t" },
              { img: tanqueAluminioIcon, alt: "Tanque alumínio", label: "Tanque alumínio 260L ou 450L" },
              { img: garantia3AnosIcon, alt: "Garantia 3 anos", label: "3 anos motor+câmbio sem limite km" },
              { icon: <ShieldCheck className="w-full h-full text-primary" />, label: "ABS + EBD + ESC + TCS + HSA de série" },
            ].map((c, i) => (
              <div key={i} className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center gap-2">
                  {c.icon}
                  {c.img && <img src={c.img} alt={c.alt} className="w-full h-full object-contain" />}
                  {c.duo && c.duo.map((src, idx) => <img key={idx} src={src} alt="" className="h-full w-auto object-contain" />)}
                </div>
                <p className="font-semibold text-sm md:text-base text-foreground">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DESTAQUES TÉCNICOS */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 h-14">
                <img src={cumminsLogo} alt="Cummins" className="h-10 md:h-12 object-contain" />
                <img src={zfLogo} alt="ZF" className="h-10 md:h-12 object-contain" />
                <img src={boschLogo} alt="Bosch" className="h-10 md:h-12 object-contain" />
                <img src={danaLogo} alt="Dana" className="h-10 md:h-12 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conjunto mecânico global</h3>
              <p className="text-muted-foreground">
                Motor Cummins D6.7 com 282 cv e 1.100 Nm. Transmissão ZF 9AS1517TO automatizada de 9 marchas. Componentes Bosch e Dana. Tecnologia mundial, montagem nacional.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="aspect-video rounded-md overflow-hidden mb-4 bg-muted">
                <img src={cabinePainel} alt="Painel com seletor automatizado" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-3">Câmbio automatizado num semipesado</h3>
              <p className="text-muted-foreground">
                Concorrentes diretos no segmento 17-19 toneladas (Constellation, Atego, Tector) entregam câmbio MANUAL de série. Auman D 1830 sai de fábrica com ZF automatizado de 9 marchas. Sem opcional pago. Motorista produz mais. Frota gasta menos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="aspect-video rounded-md overflow-hidden mb-4 bg-muted">
                <img src={cabineSemiLeito} alt="Cabine com semi leito" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cabine com semi leito de série</h3>
              <p className="text-muted-foreground">
                Espaço de descanso traseiro, banco a ar pneumático do motorista, ar condicionado automático. No segmento 18t da concorrência, leito é opcional pago ou exclusivo da linha topo. Aqui vem completo de fábrica — operação de rota longa, dois turnos, transporte interestadual sem upgrade.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="aspect-video rounded-md overflow-hidden mb-4 bg-muted">
                <img src={motorCummins} alt="Motor Cummins D6.7" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-3">Motor Cummins D6.7</h3>
              <p className="text-muted-foreground">
                100+ anos de Cummins, presente em 190 países. 6.690 cm³, 6 cilindros em linha, Common Rail. O motor de 1 milhão de quilômetros. Nenhum concorrente direto no segmento 17-19t do Brasil oferece Cummins de série em 2026.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm md:col-span-2">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img src={garantia3AnosIcon} alt="Garantia 3 anos" className="w-32 h-32 object-contain shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Garantia que ninguém oferece</h3>
                  <p className="text-muted-foreground">
                    3 anos em motor e câmbio SEM LIMITE de km. Volvo cobre até 200 mil km. Scania e Iveco 2 anos no trem-força. Mercedes e VW 1 ano. Único no segmento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARATIVO */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Comparativo direto com a concorrência</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Versões 2026 disponíveis em concessionárias autorizadas no Brasil. Dados de ficha técnica oficial das montadoras.
            </p>
          </div>

          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm text-sm">
              <thead>
                <tr className="bg-industrial-dark text-white">
                  <th className="py-3 px-4 text-left">Item</th>
                  <th className="py-3 px-4 text-left bg-primary/20 border-l-4 border-primary">Foton Auman D 1830</th>
                  <th className="py-3 px-4 text-left">VW Constellation 17.190</th>
                  <th className="py-3 px-4 text-left">Mercedes Atego 1719</th>
                  <th className="py-3 px-4 text-left">Iveco Tector 170E22</th>
                  <th className="py-3 px-4 text-left">Volvo VM 270</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Motor", "Cummins D6.7 — 282 cv", "MAN D08 — 186 cv", "OM 924 LA — 185 cv", "FPT NEF — ~217 cv", "D8K Volvo"],
                  ["Câmbio", "ZF automatizado 9 marchas (série)", "Eaton manual 6 marchas", "Manual ou PowerShift (opcional)", "Manual; ZF automatizado opcional", "Manual; I-Shift opcional"],
                  ["Cabine com semi leito", "De série", "Opcional / linha superior", "Opcional", "Depende da versão", "Opcional"],
                  ["Suspensão", "Feixe parabólico", "Parabólico", "Parabólico", "Parabólico", "Parabólico"],
                  ["Garantia motor+câmbio", "3 anos sem limite km", "1 ano", "1 ano", "2 anos", "1+2 anos com limite 200 mil km"],
                  ["PBT", "18 toneladas", "n/d 2026", "17,1 toneladas", "conforme lâmina", "n/d 2026"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-3 px-4 align-top ${j === 1 ? "bg-primary/5 border-l-4 border-primary font-semibold text-foreground" : "text-muted-foreground"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs italic text-muted-foreground mt-4">
            Dados extraídos das fichas técnicas oficiais das montadoras. Atualizado em 2026.
          </p>
        </div>
      </section>

      {/* 5. GALERIA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {productImages.map((img, i) => (
              <div key={i} className="space-y-2">
                <div
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-muted"
                  onClick={() => openLightbox(i)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs md:text-sm text-center text-muted-foreground">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. POR QUE FOTON LAVORO */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark via-blue-950 to-industrial-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">Por que escolher a Foton Lavoro</h2>

          <blockquote className="max-w-3xl mx-auto mb-14 border-l-4 border-primary pl-6 py-2">
            <p className="text-2xl md:text-3xl font-light italic leading-snug text-white">
              "Quem vendeu 100 mil Mercedes não muda de lado. Muda de era."
            </p>
            <footer className="mt-3 text-sm text-gray-300">— Castelo Fraga, fundador da Lavoro Foton</footer>
          </blockquote>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Garantia 3 anos sem limite de km",
              "Motores Cummins (D6.7 — confiabilidade global, +100 anos)",
              "Caixa ZF (precisão alemã desde 1915)",
              "Componentes Bosch e Dana (padrão mundial)",
              "Engenharia Foton × Daimler (joint venture pesados)",
              "+110 concessionárias Foton no Brasil (+293% vs 2023)",
              "Centro logístico Itajaí — 165 mil itens, R$ 55 mi/2025",
              "88% fill rate em peças",
              "Foton Assistance 24h — 0800 600 0066",
            ].map((label, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                <p className="font-medium">{label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14 max-w-3xl mx-auto space-y-3">
            <p className="text-xl md:text-2xl font-semibold">
              Mais tecnologia, mais robustez, mais caminhão — por menos dinheiro.
            </p>
            <p className="text-base md:text-lg text-gray-300">
              Lavoro Foton: a marca pode ser nova pra você. O que tem dentro, você confia há décadas.
            </p>
          </div>
        </div>
      </section>

      {/* 7. APLICAÇÕES */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Aplicações Ideais</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              { icon: Truck, label: "Distribuição regional pesada" },
              { icon: Store, label: "Atacarejo e varejo de grande volume" },
              { icon: Moon, label: "Rota longa com pernoite (semi leito de série)" },
              { icon: Users, label: "Logística cooperativa de transporte" },
              { icon: Clock, label: "Operação dois turnos" },
              { icon: Landmark, label: "Licitações públicas (municipal/estadual)" },
            ].map((a, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col items-center text-center hover:border-primary/40 transition-colors">
                <a.icon className="h-10 w-10 text-primary mb-3" />
                <p className="text-sm font-medium">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FICHA TÉCNICA */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Ficha Técnica Completa</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            <AccordionItem value="motor">
              <AccordionTrigger className="px-6 text-left font-semibold">Motor e Desempenho</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Fabricante/Modelo: Cummins D6.7</li>
                  <li>Potência líquida máxima: 282 cv</li>
                  <li>Torque máximo: 1.100 Nm @ 1.100-1.600 rpm</li>
                  <li>Configuração: Diesel, 6 cilindros em linha</li>
                  <li>Sistema de injeção: Eletrônica Common Rail</li>
                  <li>Cilindrada total: 6.690 cm³</li>
                  <li>Norma de emissões: EURO 6</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="trans">
              <AccordionTrigger className="px-6 text-left font-semibold">Transmissão e Trem de Força</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Câmbio: ZF 9AS1517TO automatizada</li>
                  <li>Marchas: 9 à frente + 1 ré</li>
                  <li>Acionamento: automatizado com conversor de torque (embreagem 430 mm)</li>
                  <li>Eixo traseiro: rígido com aço estampado, relação 4,875:1</li>
                  <li>Direção: hidráulica, esferas recirculantes</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pesos">
              <AccordionTrigger className="px-6 text-left font-semibold">Pesos e Capacidade de Carga</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Peso em ordem de marcha: 5.640 kg (3.347 dianteiro + 2.293 traseiro)</li>
                  <li>PBT legal: 16.000 kg | técnico: 18.000 kg</li>
                  <li>PBTC: 34.000 kg | Capacidade máxima de tração: 34.000 kg</li>
                  <li>Carga útil + carroceria: 10.360 kg</li>
                  <li>Limites por eixo (técnico): 6.000 kg dianteiro / 12.000 kg traseiro</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dim">
              <AccordionTrigger className="px-6 text-left font-semibold">Dimensões</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Comprimento total: 8.900 mm</li>
                  <li>Distância entre eixos: 5.150 mm</li>
                  <li>Largura máxima: 2.430 mm | Altura: 2.822 mm</li>
                  <li>Plataforma de carga: 6.670 mm</li>
                  <li>Balanço dianteiro: 1.320 mm | traseiro: 2.420 mm</li>
                  <li>Distância do solo: 260 mm</li>
                  <li>Ângulo de ataque: 19° | de saída: 12°</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="freios">
              <AccordionTrigger className="px-6 text-left font-semibold">Freios, Suspensão e Sistema Elétrico</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Freios a ar tipo "S" Cam, circuito duplo, dianteiros e traseiros a tambor</li>
                  <li>Freio-motor de escape automático (EAT)</li>
                  <li>Distribuição Eletrônica de Frenagem (EBD)</li>
                  <li>Sistema de Freios Antibloqueio (ABS)</li>
                  <li>Controle de Estabilidade e Tração (ESC + TCS)</li>
                  <li>Suspensão traseira: feixe de molas parabólicas 4+3 + amortecedores telescópicos + barra estabilizadora</li>
                  <li>Suspensão dianteira: feixe parabólico 3 lâminas + amortecedores + barra estabilizadora</li>
                  <li>Sistema elétrico 24V | 2x 135 Ah / 12V | alternador 100 A</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rodas">
              <AccordionTrigger className="px-6 text-left font-semibold">Rodas, Pneus e Abastecimento</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Rodas em aço, 22.5" x 8.25"</li>
                  <li>Pneus 275/80 R22.5</li>
                  <li>Tanque de combustível em alumínio: 260 L ou 450 L</li>
                  <li>Capacidade ARLA 32: 25 L</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cab">
              <AccordionTrigger className="px-6 text-left font-semibold">Cabine e Ergonomia</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Cabine com semi leito de série — espaço de descanso traseiro</li>
                  <li>Volante multifuncional</li>
                  <li>Painel de instrumentos LCD 7"</li>
                  <li>Banco do motorista com amortecimento pneumático (banco a ar)</li>
                  <li>Ar condicionado automático</li>
                  <li>Vidros elétricos</li>
                  <li>Acendimento automático de faróis (sensor crepuscular)</li>
                  <li>DRL em LED</li>
                  <li>Basculamento elétrico de cabine</li>
                  <li>MP3 + Bluetooth</li>
                  <li>Controle de cruzeiro</li>
                  <li>Assistente de partida em rampa (HSA)</li>
                  <li>Aviso de cinto de segurança</li>
                  <li>Aviso de sobrecarga</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="hab">
              <AccordionTrigger className="px-6 text-left font-semibold">Habilitação, Garantia e Versões</AccordionTrigger>
              <AccordionContent className="px-6">
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>CNH exigida: D ou E</li>
                  <li>Garantia veículo completo: 1 ano sem limite de km</li>
                  <li>Garantia motor e câmbio: 3 anos sem limite de km</li>
                  <li>Homologação IBAMA Proconve | Conama</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section id="cta-final" className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark via-blue-950 to-industrial-dark text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Pronto para dirigir o 1830?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Atendimento rápido. Sem enrolação. Sem burocracia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                Falar com consultor pelo WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white text-lg px-8 py-6 h-auto bg-blue-900 hover:bg-blue-800">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                Solicitar proposta personalizada
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl bg-black/95 border-0 p-0">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 z-50 text-white p-2 hover:bg-white/10 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white p-2 hover:bg-white/10 rounded-full">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white p-2 hover:bg-white/10 rounded-full">
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
            <img src={productImages[currentImageIndex].src} alt={productImages[currentImageIndex].alt} className="max-h-[75vh] w-auto object-contain" />
            <p className="text-white text-center mt-4">{productImages[currentImageIndex].caption}</p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AumanD1830;
