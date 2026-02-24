import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  MessageCircle, FileText, TestTube2, Battery, Zap, TrendingDown,
  Shield, Package, ChevronLeft, ChevronRight, Check, Fuel, Wrench,
  Truck, Leaf
} from "lucide-react";
import ewonderImg from "@/assets/ewonder.jpg";
import ewonderCharging from "@/assets/ewonder-charging.jpg";
import ewonderInteriorSeats from "@/assets/ewonder-interior-seats.jpg";
import ewonderInteriorFront from "@/assets/ewonder-interior-front.jpg";
import ewonderControls from "@/assets/ewonder-controls.jpg";
import ewonderCargo from "@/assets/ewonder-cargo.png";

const WHATSAPP_NUMBER = "5531996970656";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de mais informações sobre o eWonder.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const galleryImages = [
  { src: ewonderCharging, title: "Carregamento", description: "Conector CCS2 — recarga rápida DC" },
  { src: ewonderCargo, title: "Baú de carga", description: "Volume otimizado para last-mile" },
  { src: ewonderInteriorFront, title: "Interior", description: "Cabine confortável e funcional" },
  { src: ewonderInteriorSeats, title: "Bancos", description: "Ergonômicos para longas jornadas" },
  { src: ewonderControls, title: "Painel", description: "Controles intuitivos" },
];

const EWonder = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (idx: number) => { setSelectedImage(idx); setLightboxOpen(true); };
  const handlePrev = () => setSelectedImage(i => (i - 1 + galleryImages.length) % galleryImages.length);
  const handleNext = () => setSelectedImage(i => (i + 1) % galleryImages.length);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="mt-16 relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ewonderImg} alt="Foton eWonder — VUC Elétrico" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 container-lavoro text-white">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Zap className="w-5 h-5" />
            <span className="font-bold">100% ELÉTRICO</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in max-w-4xl" style={{ animationDelay: "0.1s" }}>
            eWonder
          </h1>
          <p className="text-2xl md:text-4xl mb-4 max-w-3xl animate-fade-in font-bold" style={{ animationDelay: "0.2s" }}>
            O VUC elétrico que entrega economia real desde o primeiro dia.
          </p>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            180 km de autonomia · 1.325 kg de carga · 73% menos custo/km
          </p>

          {/* Specs rápidos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in max-w-3xl" style={{ animationDelay: "0.35s" }}>
            {[
              { label: "Autonomia", value: "180 km" },
              { label: "Carga útil", value: "1.325 kg" },
              { label: "Potência", value: "35/75 kW" },
              { label: "Bateria", value: "41,86 kWh" },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-gray-300">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button asChild size="lg" variant="whatsapp" className="text-lg px-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Solicitar Proposta
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── ECONOMIA: por que trocar? (argumentos do comparativo) ── */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
        <div className="container-lavoro">
          <h2 className="mb-4 text-center">Por que trocar o diesel pelo eWonder?</h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Comparado a um VUC diesel típico (Kia Bongo / Hyundai HR), o eWonder reduz <strong>73%</strong> do custo por km rodado.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card-premium p-8 text-center hover:shadow-xl transition-all">
              <Fuel className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Diesel: R$ 0,86/km</h3>
              <p className="text-muted-foreground mb-4">Bongo faz ~9,8 km/L a R$ 6,30/L + manutenção</p>
              <div className="h-1 bg-destructive/20 rounded-full mt-4">
                <div className="h-1 bg-destructive rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="card-premium p-8 text-center hover:shadow-xl transition-all border-primary/30 bg-primary/5">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-primary">eWonder: R$ 0,23/km</h3>
              <p className="text-muted-foreground mb-4">0,23 kWh/km a R$ 0,85/kWh + manutenção mínima</p>
              <div className="h-1 bg-primary/20 rounded-full mt-4">
                <div className="h-1 bg-primary rounded-full" style={{ width: "27%" }} />
              </div>
            </div>

            <div className="card-premium p-8 text-center hover:shadow-xl transition-all">
              <TrendingDown className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Economia mensal</h3>
              <p className="text-3xl font-bold text-primary mb-2">R$ 1.500 — R$ 2.800</p>
              <p className="text-sm text-muted-foreground">Para rotas de 80 a 180 km/dia</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline" className="text-lg">
              <a href="/comparativo-ewonder">
                📊 Ver Comparativo Completo (Diesel vs Elétrico)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── VANTAGENS ── */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Vantagens do eWonder</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: TrendingDown, title: "73% menos custo/km", desc: "R$ 0,23/km vs R$ 0,86/km do diesel", sub: "Economia comprovada" },
              { icon: Zap, title: "Torque instantâneo", desc: "105 a 220 N.m — Motor eAxle", sub: "Rampas e viadutos sem esforço" },
              { icon: Battery, title: "180 km de autonomia", desc: "Bateria CATL LFP 41,86 kWh", sub: "Ideal para 60-140 km/dia" },
              { icon: Package, title: "1.325 kg de carga", desc: "PBT 2.550 kg · CNH B", sub: "Volume otimizado para last-mile" },
              { icon: Shield, title: "Segurança de série", desc: "ABS + BAS + ESC + HSA", sub: "Farol automático + sensor de ré" },
              { icon: Wrench, title: "Manutenção quase zero", desc: "Sem óleo, filtros, correias", sub: "86% menos gastos em manutenção" },
            ].map(({ icon: Icon, title, desc, sub }) => (
              <div key={title} className="card-premium p-8 hover:shadow-xl transition-all">
                <Icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-lg mb-2 font-semibold">{desc}</p>
                <p className="text-sm text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA ── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Conheça o eWonder</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                onClick={() => openLightbox(idx)}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold">{img.title}</p>
                    <p className="text-white/80 text-sm">{img.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
          <div className="relative">
            <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].title} className="w-full h-auto max-h-[80vh] object-contain" />
            <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white font-bold text-lg">{galleryImages[selectedImage].title}</p>
              <p className="text-white/70 text-sm">{galleryImages[selectedImage].description}</p>
              <p className="text-white/50 text-xs mt-1">{selectedImage + 1} / {galleryImages.length}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── ESPECIFICAÇÕES TÉCNICAS ── */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Ficha Técnica</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-0">
              <h3 className="text-xl font-bold mb-4 text-primary">Motor e Desempenho</h3>
              {[
                ["Motor", "Síncrono de Imã Permanente — eAxle"],
                ["Potência", "35 kW @ 75 kW (pico)"],
                ["Torque", "105 N.m @ 220 N.m"],
                ["Tração", "4x2"],
                ["Bateria", "41,86 kWh — CATL LFP"],
                ["Autonomia", "180 km"],
                ["Voltagem", "335 V"],
                ["Bateria Auxiliar", "12 V"],
                ["Conector", "Plug-in CCS2 (AC/DC)"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-3 border-b border-border">
                  <span className="font-semibold">{label}</span>
                  <span className="text-muted-foreground text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-0">
              <h3 className="text-xl font-bold mb-4 text-primary">Dimensões e Capacidade</h3>
              {[
                ["PBT", "2.550 kg"],
                ["Peso em Ordem de Marcha", "1.225 kg"],
                ["Capacidade de Carga", "1.325 kg"],
                ["Entre Eixos", "3.080 mm"],
                ["Pneus", "175/75R14C"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-3 border-b border-border">
                  <span className="font-semibold">{label}</span>
                  <span className="text-muted-foreground text-right">{value}</span>
                </div>
              ))}

              <h3 className="text-xl font-bold mt-8 mb-4 text-primary">Itens de Série</h3>
              <ul className="space-y-2">
                {[
                  "Volante multifuncional",
                  "ABS + BAS + ESC + HSA",
                  "Farol automático",
                  "MP3 (rádio + USB)",
                  "Sensor de ré",
                  "Vidro elétrico",
                  "Aquecedor para retrovisor",
                  "Farol de neblina",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mt-8 mb-4 text-muted-foreground">Opcionais</h3>
              <ul className="space-y-2">
                {[
                  "MP5 (Tela de 7 polegadas)",
                  "Câmera de ré",
                  "Defletor",
                  "Sensor de pressão nos pneus",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIESEL vs ELÉTRICO ── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Diesel vs Elétrico — na prática</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-premium p-8">
              <h3 className="text-2xl font-bold mb-6 text-muted-foreground">VUC Diesel (Bongo / HR)</h3>
              <ul className="space-y-4 text-lg">
                {[
                  "R$ 0,86 por km rodado",
                  "~R$ 2.200 a R$ 3.500/mês em combustível",
                  "Manutenção frequente: óleo, filtros, correias",
                  "Emissão de CO₂ e poluentes",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-destructive font-bold text-xl mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-premium p-8 bg-primary/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary">Foton eWonder</h3>
              <ul className="space-y-4 text-lg">
                {[
                  { text: "R$ 0,23 por km rodado", bold: true },
                  { text: "Economia de R$ 1.500 a R$ 2.800/mês", bold: true },
                  { text: "Manutenção mínima — sem motor a combustão", bold: false },
                  { text: "Zero emissões — operação 100% limpa", bold: false },
                ].map(item => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl mt-0.5">✓</span>
                    <span className={item.bold ? "font-bold" : ""}>{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-bold text-primary bg-primary/10 p-4 rounded-lg">
                💡 Em 3 anos, a economia acumulada pode passar de R$ 60.000
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IDEAL PARA ── */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Ideal para</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Truck, label: "Last-mile delivery" },
              { icon: Package, label: "E-commerce" },
              { icon: Truck, label: "Food service" },
              { icon: Shield, label: "Pharma" },
              { icon: Truck, label: "Supermercados" },
              { icon: Leaf, label: "Hortifruti" },
              { icon: Truck, label: "Franquias" },
              { icon: Truck, label: "Logística urbana" },
              { icon: Leaf, label: "Empresas ESG" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="card-premium p-6 text-center hover:border-primary hover:shadow-lg transition-all flex flex-col items-center gap-3">
                <Icon className="w-8 h-8 text-primary" />
                <p className="font-semibold text-lg">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE LAVORO ── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Por que comprar com a Lavoro Foton?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: MessageCircle, title: "Atendimento especializado", desc: "Time técnico treinado pela Foton" },
              { icon: Shield, title: "Pós-venda completo", desc: "Estrutura e agilidade no atendimento" },
              { icon: Battery, title: "40 anos de tradição", desc: "Credibilidade da família Castelo Fraga" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-white">Seu próximo passo para economia e eficiência</h2>
            <p className="text-xl mb-10 text-white/90">
              Descubra como reduzir custos em até 73% na sua operação
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Button asChild size="lg" variant="whatsapp" className="text-lg px-8">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <TestTube2 className="mr-2 h-5 w-5" />
                  Agendar Teste
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
                <a href="/calculadora-roi" rel="noopener noreferrer">
                  📊 Simular Economia
                </a>
              </Button>
            </div>

            <div className="card-premium p-8 bg-white/10 backdrop-blur-sm border-white/20">
              <p className="text-xl italic mb-4 text-white">
                "A Lavoro Foton é referência em Minas Gerais. Nosso compromisso é entregar eficiência, tecnologia e o melhor suporte para a sua operação."
              </p>
              <p className="font-bold text-white">— Equipe Lavoro Foton</p>
              <p className="text-sm text-white/75 mt-2">40 anos de tradição Castelo Fraga</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EWonder;
