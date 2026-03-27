import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, FileText, Battery, Zap, TrendingDown, Shield, Package, Users, Truck, Leaf, Monitor, ChevronLeft, ChevronRight, X, Volume2, Gauge, BatteryCharging, DoorOpen } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/eview-connect.jpg";
import frontImg from "@/assets/eview-connect-front.jpg";
import interiorImg from "@/assets/eview-connect-interior.jpg";
import lateralImg from "@/assets/eview-connect-lateral.jpg";
import spec1 from "@/assets/eview-connect-spec1.jpg";
import spec2 from "@/assets/eview-connect-spec2.jpg";
import spec3 from "@/assets/eview-connect-spec3.jpg";
import spec4 from "@/assets/eview-connect-spec4.jpg";

const whatsappNumber = "553196970656";
const whatsappMessage = encodeURIComponent("Olá! Gostaria de mais informações sobre a eView Connect.");

const EViewConnect = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: frontImg, alt: "eView Connect vista frontal", title: "Vista Frontal" },
    { src: interiorImg, alt: "Interior da eView Connect", title: "Design Interior" },
    { src: lateralImg, alt: "eView Connect vista lateral", title: "Vista Lateral" },
    { src: spec1, alt: "Chassi da eView Connect", title: "Chassi de Alta Capacidade" },
    { src: spec2, alt: "Suspensão da eView Connect", title: "Suspensão Traseira" },
    { src: spec3, alt: "Motor da eView Connect", title: "Motor Elétrico" },
    { src: spec4, alt: "Porta traseira da eView Connect", title: "Porta Traseira 270°" },
  ];

  const handlePrevious = () => {
    setSelectedImage(prev => prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setSelectedImage(prev => prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Foton eView Connect" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 container-lavoro text-white">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">100% ELÉTRICO</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-full border border-cyan-500/30">SEU ESCRITÓRIO SOBRE RODAS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              E-V <span className="text-cyan-400">Connect</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6">
              Disponibilidade total, zero complicação. A praticidade da recarga e a confiabilidade que mantém o seu negócio em movimento.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                <p className="text-2xl font-black text-cyan-400">7,2 m³</p>
                <p className="text-xs text-white/60">Volume de Carga</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                <p className="text-2xl font-black text-cyan-400">170 cv</p>
                <p className="text-xs text-white/60">Potência</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                <p className="text-2xl font-black text-cyan-400">245 Nm</p>
                <p className="text-xs text-white/60">Torque</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                <p className="text-2xl font-black text-cyan-400">245 km</p>
                <p className="text-xs text-white/60">Autonomia*</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" asChild>
                <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} /> Falar com Especialista
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2" asChild>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de solicitar uma proposta para a eView Connect.")}`} target="_blank" rel="noopener noreferrer">
                  <FileText size={20} /> Solicitar Proposta
                </a>
              </Button>
            </div>
            <p className="text-xs text-white/40 mt-4">*Autonomia de até 245 km no ciclo WLTP. 202 km no ciclo INMETRO.</p>
          </div>
        </div>
      </section>

      {/* Por que eView Connect */}
      <section className="section-padding bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-4">Por Que a eView Connect?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
            A van elétrica top de linha da Foton. Seu escritório sobre rodas com tecnologia de ponta e zero emissões.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <TrendingDown className="w-8 h-8 text-emerald-500" />, title: "Economia de até 80%", desc: "Custo operacional drasticamente menor que vans diesel. Energia elétrica é até 5x mais barata que diesel." },
              { icon: <Zap className="w-8 h-8 text-cyan-500" />, title: "170 cv de Potência", desc: "Motor elétrico com 170 cv e 245 Nm de torque. Desempenho instantâneo e praticidade superior na operação." },
              { icon: <Battery className="w-8 h-8 text-emerald-500" />, title: "Bateria de 50 kWh", desc: "Bateria de alta capacidade com autonomia de até 245 km (WLTP). Recarga prática e rápida." },
              { icon: <Package className="w-8 h-8 text-cyan-500" />, title: "7,2 m³ de Volume", desc: "Espaço de carga generoso para atender as demandas mais exigentes de transporte urbano." },
              { icon: <Shield className="w-8 h-8 text-emerald-500" />, title: "Segurança Completa", desc: "Chassi de alta capacidade, suspensão traseira com feixe de molas e porta traseira com abertura de 270°." },
              { icon: <Leaf className="w-8 h-8 text-cyan-500" />, title: "Zero Emissões", desc: "100% elétrica. Contribua para a sustentabilidade sem abrir mão de performance e produtividade." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Interior */}
      <section className="section-padding bg-[hsl(213,50%,8%)] text-white">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Design Interior e Conforto</h2>
              <p className="text-white/70 text-lg mb-8">
                Interior desenvolvido com design fluido, painel espaçoso e conectado, cuja arquitetura otimiza o uso inteligente e confortável. Seu escritório sobre rodas.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Monitor className="w-5 h-5" />, text: "Painel conectado e espaçoso" },
                  { icon: <Volume2 className="w-5 h-5" />, text: "Cabine silenciosa — zero vibração do motor elétrico" },
                  { icon: <Gauge className="w-5 h-5" />, text: "Design ergonômico para longas jornadas" },
                  { icon: <DoorOpen className="w-5 h-5" />, text: "Porta traseira com abertura de 270°" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="text-cyan-400">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img src={interiorImg} alt="Interior da eView Connect" className="w-full h-auto object-cover rounded-xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="section-padding bg-secondary/30">
        <div className="container-lavoro">
          <h2 className="text-center mb-4">Galeria de Fotos</h2>
          <p className="text-center text-muted-foreground mb-10">Conheça cada detalhe da eView Connect</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className="cursor-pointer group overflow-hidden rounded-xl" onClick={() => setSelectedImage(i)}>
                <img src={img.src} alt={img.alt} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <p className="text-center text-sm text-muted-foreground mt-2">{img.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 z-50 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          {selectedImage !== null && (
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <button onClick={handlePrevious} className="absolute left-4 z-50 text-white/80 hover:text-white bg-black/50 rounded-full p-2">
                <ChevronLeft size={24} />
              </button>
              <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} className="max-h-[80vh] object-contain mx-auto" />
              <button onClick={handleNext} className="absolute right-4 z-50 text-white/80 hover:text-white bg-black/50 rounded-full p-2">
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white font-semibold">{galleryImages[selectedImage].title}</p>
                <p className="text-white/50 text-sm">{selectedImage + 1} / {galleryImages.length}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Especificações Técnicas */}
      <section className="section-padding bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-10">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Tipo", value: "Van 100% Elétrica" },
              { label: "Motor", value: "Síncrono de imã permanente" },
              { label: "Potência", value: "170 cv (125 kW)" },
              { label: "Torque", value: "245 Nm" },
              { label: "Bateria", value: "LFP 50 kWh" },
              { label: "Autonomia (WLTP)", value: "245 km" },
              { label: "Autonomia (INMETRO)", value: "202 km" },
              { label: "Volume de Carga", value: "7,2 m³" },
              { label: "Conector", value: "CCS2 (AC/DC)" },
              { label: "Chassi", value: "Alta capacidade de carga" },
              { label: "Suspensão Traseira", value: "Feixe de molas" },
              { label: "Porta Traseira", value: "Abertura de 270°" },
              { label: "Combustível", value: "100% Elétrico" },
              { label: "CNH", value: "B" },
            ].map((spec, i) => (
              <div key={i} className="flex justify-between items-center py-3 px-4 border-b border-border">
                <span className="text-muted-foreground font-medium">{spec.label}</span>
                <span className="font-bold text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques Técnicos — Cards visuais */}
      <section className="section-padding bg-secondary/30">
        <div className="container-lavoro">
          <h2 className="text-center mb-10">Destaques Técnicos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: spec1, title: "Chassi Reforçado", desc: "Equipado com chassi de alta capacidade de carga." },
              { img: spec2, title: "Suspensão Robusta", desc: "Traseira com feixe de molas para máxima estabilidade." },
              { img: spec3, title: "Motor Eficiente", desc: "Conjunto moderno e eficiente para operação sustentável." },
              { img: spec4, title: "Acesso Total", desc: "Porta traseira com abertura de 270° para facilitar carga e descarga." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal Para */}
      <section className="section-padding bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-10">Ideal Para</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Package className="w-8 h-8" />, text: "Entregas Urbanas" },
              { icon: <Truck className="w-8 h-8" />, text: "Logística Last-Mile" },
              { icon: <Monitor className="w-8 h-8" />, text: "Serviços Técnicos" },
              { icon: <Users className="w-8 h-8" />, text: "Empresas de Serviços" },
              { icon: <Leaf className="w-8 h-8" />, text: "Frotas Sustentáveis" },
              { icon: <BatteryCharging className="w-8 h-8" />, text: "E-commerce" },
              { icon: <Shield className="w-8 h-8" />, text: "Food Service" },
              { icon: <Zap className="w-8 h-8" />, text: "Farmacêutico" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-xl text-center hover:border-primary/30 transition-all">
                <div className="text-primary">{item.icon}</div>
                <span className="font-semibold text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que comprar com a Lavoro Foton */}
      <section className="section-padding bg-[hsl(213,50%,8%)] text-white">
        <div className="container-lavoro">
          <h2 className="text-center mb-10">Por que comprar com a Lavoro Foton?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Especialistas em Elétricos", desc: "Equipe treinada e capacitada para orientar você na transição para a mobilidade elétrica. Consultoria completa de operação." },
              { title: "Pós-venda Autorizado", desc: "Assistência técnica autorizada com peças originais, garantia de fábrica e suporte técnico dedicado para sua frota." },
              { title: "40+ Anos de Tradição", desc: "A Lavoro é uma das concessionárias mais tradicionais de Minas Gerais, com mais de 4 décadas de experiência no mercado de veículos comerciais." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-cyan-400/30 transition-all">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta-final" className="section-padding bg-gradient-to-br from-cyan-600 to-emerald-600 text-white">
        <div className="container-lavoro text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">A van elétrica top de linha está na Lavoro</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            7,2 m³ de carga, 170 cv de potência, 245 km de autonomia. Seu escritório sobre rodas com zero emissão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 gap-2 font-bold" asChild>
              <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} /> Falar com Especialista
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" asChild>
              <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Gostaria de agendar um test drive da eView Connect.")}`} target="_blank" rel="noopener noreferrer">
                <Truck size={20} /> Agendar Test Drive
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EViewConnect;
