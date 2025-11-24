import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  CheckCircle2, 
  MessageSquare, 
  Shield, 
  Wrench, 
  Award, 
  Package, 
  Truck, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  FileText,
  Sun,
  Sparkles,
  Eye,
  Volume2,
  Ruler,
  Armchair,
  Cpu,
  Mountain
} from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import tunlandV9Photo1 from "@/assets/tunland-v9-photo-1.png";
import tunlandV9Photo2 from "@/assets/tunland-v9-photo-2.png";
import tunlandV9Photo3 from "@/assets/tunland-v9-photo-3.png";
import tunlandV9Photo4 from "@/assets/tunland-v9-photo-4.png";
import tunlandV9Photo5 from "@/assets/tunland-v9-photo-5.png";
import tunlandV9Photo6 from "@/assets/tunland-v9-photo-6.png";
import tunlandV9Photo7 from "@/assets/tunland-v9-photo-7.png";
import tunlandV9Photo8 from "@/assets/tunland-v9-photo-8.png";
import tunlandV9Photo9 from "@/assets/tunland-v9-photo-9.png";
import tunlandV9Photo10 from "@/assets/tunland-v9-photo-10.png";
import iconConforto from "@/assets/icon-conforto.png";
import iconAcabamento from "@/assets/icon-acabamento.png";
import iconIsolamento from "@/assets/icon-isolamento.png";
import icon360 from "@/assets/icon-360.png";
import icon20Maior from "@/assets/icon-20-maior.png";
import iconBancosPremium from "@/assets/icon-bancos-premium.png";
import iconTecnologia from "@/assets/icon-tecnologia.png";
import iconRobustez from "@/assets/icon-robustez.png";
import icon10AnosGarantia from "@/assets/icon-10-anos-garantia.png";
import iconConfortoLuxo from "@/assets/icon-conforto-luxo.png";
import iconTecnologiaExtrema from "@/assets/icon-tecnologia-extrema.png";
import iconAcabamentoLuxo from "@/assets/icon-acabamento-luxo.png";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import garantia3AnosIcon from "@/assets/garantia-3anos-foton.png";
import garantiaFabricaFotonIcon from "@/assets/garantia-3anos-foton.png";
import tecnologiaGlobalIcon from "@/assets/tecnologia-global-icon.png";
import concessionariasIcon from "@/assets/70-concessionarias-icon.png";
import centroLogisticoIcon from "@/assets/centro-logistico-icon.png";
import fillRateIcon from "@/assets/fill-rate-icon.png";
import aprovacaoClientesIcon from "@/assets/aprovacao-clientes-icon.png";

const TunlandV9 = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    {
      src: tunlandV9Photo1,
      alt: "Foton Tunland V9 - Imagem 1",
      caption: "Tunland V9 - Design e Sofisticação"
    },
    {
      src: tunlandV9Photo2,
      alt: "Foton Tunland V9 - Imagem 2",
      caption: "Performance Premium"
    },
    {
      src: tunlandV9Photo3,
      alt: "Foton Tunland V9 - Imagem 3",
      caption: "Tecnologia de Ponta"
    },
    {
      src: tunlandV9Photo4,
      alt: "Foton Tunland V9 - Imagem 4",
      caption: "Interior Refinado"
    },
    {
      src: tunlandV9Photo5,
      alt: "Foton Tunland V9 - Imagem 5",
      caption: "Conforto e Elegância"
    },
    {
      src: tunlandV9Photo6,
      alt: "Foton Tunland V9 - Imagem 6",
      caption: "Detalhes Premium"
    },
    {
      src: tunlandV9Photo7,
      alt: "Foton Tunland V9 - Imagem 7",
      caption: "Engenharia Avançada"
    },
    {
      src: tunlandV9Photo8,
      alt: "Foton Tunland V9 - Imagem 8",
      caption: "Acabamento de Luxo"
    },
    {
      src: tunlandV9Photo9,
      alt: "Foton Tunland V9 - Imagem 9",
      caption: "Robustez e Potência"
    },
    {
      src: tunlandV9Photo10,
      alt: "Foton Tunland V9 - Imagem 10",
      caption: "Versatilidade Profissional"
    }
  ];

  const whatsappNumber = "553121164735";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre a Foton Tunland V9 Premium.");

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  const handleQuoteClick = () => {
    document.getElementById('cta-final')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. HERO ULTRA PREMIUM */}
      <section className="relative bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Foton Tunland V9
                </h1>
                <p className="text-2xl md:text-3xl text-gray-200 font-light">
                  A picape que redefine <span className="text-primary font-semibold">luxo</span>, <span className="text-primary font-semibold">conforto</span> e <span className="text-primary font-semibold">tecnologia</span> no Brasil.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">Teto solar panorâmico</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">Tecnologia 360° + assistências ADAS</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">Acabamento de luxo premium - robustez de caminhão</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-7 h-auto shadow-2xl">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Falar com um consultor
                </Button>
                <Button onClick={handleQuoteClick} size="lg" variant="outline" className="border-2 border-white text-white text-lg px-10 py-7 h-auto bg-blue-900/50 hover:bg-blue-800 backdrop-blur-sm shadow-xl">
                  Solicitar Proposta
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src={tunlandV9Photo1} alt="Foton Tunland V9 Premium" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESTAQUES DE LUXO (GRID PREMIUM) */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
            Por que a Tunland V9 é <span className="text-primary">diferente de tudo</span> no mercado?
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Cada detalhe foi pensado para oferecer uma experiência premium incomparável
          </p>
          
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* 1. Teto solar panorâmico */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={iconConforto} alt="Teto solar panorâmico" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Teto solar panorâmico</p>
            </div>

            {/* 2. Acabamento nível Mercedes-Benz */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={iconAcabamento} alt="Acabamento nível Mercedes-Benz" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Acabamento nível Mercedes-Benz</p>
            </div>

            {/* 3. Isolamento acústico superior */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={iconIsolamento} alt="Isolamento acústico superior" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Isolamento acústico superior</p>
            </div>

            {/* 4. 360° Vision + ADAS completo */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={icon360} alt="360° Vision + ADAS completo" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">360° Vision + ADAS completo</p>
            </div>

            {/* 5. Dimensões 20% maiores */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={icon20Maior} alt="Dimensões 20% maiores" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Dimensões 20% maiores</p>
            </div>

            {/* 6. Bancos premium */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={iconBancosPremium} alt="Bancos premium" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Bancos premium / ergonomia de luxo</p>
            </div>

            {/* 7. Tecnologia embarcada extrema */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={iconTecnologia} alt="Tecnologia embarcada extrema" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Tecnologia embarcada extrema</p>
            </div>

            {/* 8. Robustez Foton */}
            <div className="group bg-white border-2 border-border rounded-2xl p-6 md:p-8 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center">
                <img src={iconRobustez} alt="Robustez Foton" className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-base md:text-lg text-foreground">Robustez Foton</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL EXPERIENCE (IMPACTO VISUAL) */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Experiência <span className="text-primary">Visual Premium</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Cada ângulo revela sofisticação e atenção aos detalhes
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            <div className="space-y-4 group cursor-pointer" onClick={() => openLightbox(2)}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:opacity-80 border-2 border-transparent hover:border-primary/30">
                <img src={tunlandV9Photo3} alt="Tunland V9 Design Premium" className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-semibold text-lg">Design Premium</p>
            </div>

            <div className="space-y-4 group cursor-pointer" onClick={() => openLightbox(3)}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:opacity-80 border-2 border-transparent hover:border-primary/30">
                <img src={tunlandV9Photo4} alt="Tunland V9 Interior Panorâmico" className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-semibold text-lg">Interior Panorâmico</p>
            </div>

            <div className="space-y-4 group cursor-pointer" onClick={() => openLightbox(9)}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:opacity-80 border-2 border-transparent hover:border-primary/30">
                <img src={tunlandV9Photo10} alt="Tunland V9 Versatilidade" className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-semibold text-lg">Versatilidade Profissional</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LUXO, CONFORTO E TECNOLOGIA */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-primary">Luxo</span>, Conforto e <span className="text-primary">Tecnologia</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <img src={iconConfortoLuxo} alt="Conforto Superior" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Conforto Superior</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cabine 20% maior que os concorrentes, bancos premium com revestimento sofisticado, ergonomia de luxo e espaço interno generoso para toda a família.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <img src={iconTecnologiaExtrema} alt="Tecnologia Extrema" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Tecnologia Extrema</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sistema de visão 360°, ADAS completo com frenagem autônoma, alertas de colisão, assistente de permanência em faixa e multimídia de última geração.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <img src={icon10AnosGarantia} alt="10 Anos de Garantia" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4">10 Anos de Garantia*</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cobertura estendida de 10 anos* que demonstra a confiança da Foton na qualidade e durabilidade da Tunland V9. Dirija com tranquilidade e segurança.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <img src={iconAcabamentoLuxo} alt="Acabamento Premium" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Acabamento Premium</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Plásticos soft-touch, elementos metálicos escovados, costuras aparentes, painel digital TFT e acabamentos que remetem às marcas premium alemãs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MECÂNICA PREMIUM (O DNA FOTON) */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            A Tunland V9 tem a mesma <span className="text-primary">robustez</span> dos caminhões Foton
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Componentes de padrão mundial garantem durabilidade incomparável
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30">
              <div className="w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                <img src={cumminsLogo} alt="Motor AuCan Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Motor AuCan com tecnologia Cummins</h3>
              <p className="text-muted-foreground text-sm text-center">Potência, torque e confiabilidade global</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30">
              <div className="w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                <img src={zfLogo} alt="Caixa ZF" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Caixa ZF</h3>
              <p className="text-muted-foreground text-sm text-center">Precisão alemã nas trocas de marcha</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30">
              <div className="w-20 h-20 flex items-center justify-center gap-2 mb-6 mx-auto">
                <img src={boschLogo} alt="Bosch" className="h-full w-auto object-contain" />
                <img src={danaLogo} alt="Dana" className="h-full w-auto object-contain" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Componentes Bosch + Dana</h3>
              <p className="text-muted-foreground text-sm text-center">Eletrônica e transmissão de padrão mundial</p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30">
              <div className="w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                <Mountain className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Plataforma robusta</h3>
              <p className="text-muted-foreground text-sm text-center">Preparada para trabalho pesado e off-road</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-2xl border-2 border-border overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shadow-lg" onClick={() => openLightbox(0)}>
              <img src={tunlandV9Photo1} alt="Potência e Performance" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-2xl border-2 border-border overflow-hidden cursor-pointer hover:opacity-80 transition-opacity shadow-lg" onClick={() => openLightbox(2)}>
              <img src={tunlandV9Photo3} alt="Design e Robustez" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUPER GALERIA (DESTAQUE VISUAL ABSOLUTO) */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Galeria <span className="text-primary">Premium</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Explore cada detalhe da picape mais sofisticada do Brasil
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className="group aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/40 hover:scale-105"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. POR QUE ESCOLHER A FOTON + LAVORO */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que escolher a <span className="text-primary-light">Foton Lavoro</span>?
          </h2>
          
          <p className="text-lg md:text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Tecnologia global, montagem nacional e o melhor custo-benefício do mercado brasileiro.
          </p>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {/* 1. Garantia de fábrica */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={garantiaFabricaFotonIcon} alt="Garantia de Fábrica 3 Anos" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">Garantia de fábrica (3 anos)</h3>
              <p className="text-base text-gray-600 text-center">Picapes projetadas para rodar sem sustos.</p>
            </div>

            {/* 2. Motores Cummins */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={cumminsLogo} alt="Motor Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">Motores Cummins</h3>
              <p className="text-base text-gray-600 text-center">Confiabilidade global, manutenção simples e economia real.</p>
            </div>

            {/* 3. Caixa ZF */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={zfLogo} alt="Caixa ZF" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">Caixa de transmissão ZF</h3>
              <p className="text-base text-gray-600 text-center">Precisão alemã, trocas suaves e durabilidade comprovada.</p>
            </div>

            {/* 4. Componentes Bosch e Dana */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center gap-2 mx-auto">
                <img src={boschLogo} alt="Bosch" className="w-1/2 h-full object-contain" />
                <img src={danaLogo} alt="Dana" className="w-1/2 h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">Componentes Bosch e Dana</h3>
              <p className="text-base text-gray-600 text-center">Eletrônica, freios e transmissão de padrão mundial.</p>
            </div>

            {/* 5. Tecnologia Europa-China */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={tecnologiaGlobalIcon} alt="Tecnologia Global" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">Tecnologia Europa–China</h3>
              <p className="text-base text-gray-600 text-center">Engenharia internacional com montagem no Brasil.</p>
            </div>

            {/* 6. +70 concessionárias */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={concessionariasIcon} alt="+70 Concessionárias" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">+70 concessionárias no País</h3>
              <p className="text-base text-gray-600 text-center">Rede completa, sempre perto de você.</p>
            </div>

            {/* 7. Centro logístico */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={centroLogisticoIcon} alt="Centro Logístico Integrado" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">Centro logístico integrado</h3>
              <p className="text-base text-gray-600 text-center">Distribuição rápida e abastecimento nacional.</p>
            </div>

            {/* 8. Fill rate + estoque */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={fillRateIcon} alt="88% Fill Rate" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">88% de fill rate + R$ 90 milhões em peças</h3>
              <p className="text-base text-gray-600 text-center">Peça na hora certa, operação sem paradas.</p>
            </div>

            {/* 9. Aprovação dos clientes */}
            <div className="group bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:bg-gray-50 hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center mx-auto">
                <img src={aprovacaoClientesIcon} alt="87% Aprovação dos Clientes" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-center text-industrial-dark">87% de aprovação dos clientes</h3>
              <p className="text-base text-gray-600 text-center">Quem compra, recomenda.</p>
            </div>
          </div>

          <div className="text-center mt-16 space-y-3">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Mais tecnologia, mais robustez, mais caminhonete — por menos dinheiro.
            </p>
            <p className="text-xl md:text-2xl text-primary-light font-semibold">
              Foton Lavoro: a escolha inteligente.
            </p>
          </div>
        </div>
      </section>

      {/* 8. FICHA TÉCNICA COMPLETA (Accordion Premium) */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ficha Técnica Completa
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Todas as especificações técnicas da Foton Tunland V9 Premium
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {/* Motor */}
              <AccordionItem value="motor" className="bg-white border-2 border-border rounded-2xl px-8 shadow-lg hover:shadow-2xl transition-shadow">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
                  Motor e Desempenho
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-8 space-y-3">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Fabricante/Modelo:</span>
                      <span className="font-bold">Aucan 4F20 2.0 Turbo Diesel</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Sistema híbrido:</span>
                      <span className="font-bold">Bosch 48V</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Potência Máxima:</span>
                      <span className="font-bold">175 cv @ 3.600 rpm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Torque Máximo:</span>
                      <span className="font-bold">445 Nm @ 1.500-2.600 rpm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Combustível:</span>
                      <span className="font-bold">Diesel S10</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Tanque:</span>
                      <span className="font-bold">76 litros</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Transmissão */}
              <AccordionItem value="transmissao" className="bg-white border-2 border-border rounded-2xl px-8 shadow-lg hover:shadow-2xl transition-shadow">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
                  Transmissão e Tração
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-8 space-y-3">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Fabricante/Modelo:</span>
                      <span className="font-bold">ZF 8HP50</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Tipo:</span>
                      <span className="font-bold">Automática 8 velocidades</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Paddle Shift:</span>
                      <span className="font-bold">Aletas de troca de marcha no volante</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Tração:</span>
                      <span className="font-bold">4x4</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Diferencial:</span>
                      <span className="font-bold">Diferencial traseiro blocante</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Suspensão Dianteira:</span>
                      <span className="font-bold text-xs">Independente formato Wishbone</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Suspensão Traseira:</span>
                      <span className="font-bold">Independente</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Dimensões */}
              <AccordionItem value="dimensoes" className="bg-white border-2 border-border rounded-2xl px-8 shadow-lg hover:shadow-2xl transition-shadow">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
                  Dimensões e Capacidades
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-8 space-y-3">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Comprimento total:</span>
                      <span className="font-bold">5.617 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Largura sem espelhos:</span>
                      <span className="font-bold">2.090 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Altura:</span>
                      <span className="font-bold">1.955 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Entre-eixos:</span>
                      <span className="font-bold">3.355 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Dimensões da caçamba:</span>
                      <span className="font-bold text-xs">1.577 x 1.650 x 530 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Volume da caçamba:</span>
                      <span className="font-bold">1.379 litros</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Capacidade de carga:</span>
                      <span className="font-bold">1.000 kg</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Peso em ordem de marcha:</span>
                      <span className="font-bold">2.335 kg</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Capacidade de imersão:</span>
                      <span className="font-bold">700 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Vão livre do solo:</span>
                      <span className="font-bold">240 mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Ângulo de ataque:</span>
                      <span className="font-bold">28°</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">Ângulo de saída:</span>
                      <span className="font-bold">26°</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm font-semibold text-primary">
                      ⭐ Dimensões até 20% maiores que concorrentes diretos
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Segurança e Tecnologia */}
              <AccordionItem value="seguranca" className="bg-white border-2 border-border rounded-2xl px-8 shadow-lg hover:shadow-2xl transition-shadow">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
                  Segurança e Tecnologia ADAS
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-8 space-y-4">
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Alarme Perimétrico</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Freio a disco nas 4 rodas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>ESC / TC (Controle eletrônico de estabilidade e tração)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>6 Air bags: frontais, laterais e cortinas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>FCW - Alerta de colisão com aviso no painel</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>AEB - Assistente Autônomo de frenagem com detecção de pedestres</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>HSA - Assistente de partida em rampas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>LKW - Alerta de permanência em faixa</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>LKC - Auxiliar de centralização em faixa</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Frenagem pós-colisão</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Sistema de reconhecimento de placas de velocidade</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Trava da tampa da caçamba elétrica com chave</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>BLIS - Detector de ponto cego</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>RTCA - Detector de tráfego cruzado</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>DOW - Alerta de segurança para abertura de Porta</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>DMS - Detector de fadiga</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Câmera Panorâmica 360°</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Sensores de estacionamento traseiros e dianteiros</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Conforto e Acabamento */}
              <AccordionItem value="conforto" className="bg-white border-2 border-border rounded-2xl px-8 shadow-lg hover:shadow-2xl transition-shadow">
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-6">
                  Conforto, Acabamento e Tecnologia Embarcada
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-8 space-y-4">
                  <h4 className="font-bold text-base mb-3">Sistema Multimídia:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm mb-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Central multimídia tela touch screen HD 14.6"</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>6 alto-falantes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Conexão de celular via Bluetooth</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Apple Car Play sem fio</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Conectividade via aplicativo Carbit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Comandos de áudio no volante</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Entradas USB</span>
                    </div>
                  </div>

                  <h4 className="font-bold text-base mb-3 mt-6">Tecnologia Avançada:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Direção elétrica</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Start & Stop</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Freio de mão eletrônico</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>TPMS - Sensor de monitoramento pressão dos pneus</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>6 modos de condução: Normal, Eco, Lama, Neve, Sport, Areia</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Cambio eletrônico mode Joystick</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Controle automático em descidas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Limpadores para-brisas com sensor de chuva</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Câmera de ré</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Função Chassis Transparente</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Piloto automático</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Limitador de velocidade</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>ACC Stop & Go - Piloto automático adaptativo</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>TJA - Assistente de movimentação automática no trânsito</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm font-semibold text-primary">
                      ⭐ Garantia de 10 anos*
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA */}
            <div className="text-center mt-16 p-10 bg-primary/5 rounded-2xl border-2 border-primary/20">
              <p className="text-xl mb-6 text-foreground">
                Quer saber mais detalhes ou agendar um test-drive premium?
              </p>
              <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-6 h-auto shadow-xl">
                <MessageSquare className="mr-2 h-6 w-6" />
                Falar com especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL ULTRA PREMIUM */}
      <section id="cta-final" className="py-20 md:py-28 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              A Tunland V9 é a nova <span className="text-primary-light">referência</span> entre as picapes premium do Brasil.
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 font-light">
              Veja pessoalmente. Converse com um consultor. Descubra o próximo nível.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-xl px-12 py-8 h-auto shadow-2xl">
                <MessageSquare className="mr-3 h-6 w-6" />
                Falar com consultor pelo WhatsApp
              </Button>
              <Button onClick={handleWhatsApp} size="lg" variant="outline" className="border-2 border-white text-white text-xl px-12 py-8 h-auto bg-blue-900/50 hover:bg-blue-800 backdrop-blur-sm shadow-xl">
                <Phone className="mr-3 h-6 w-6" />
                Solicitar proposta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full p-2 bg-white/10 hover:bg-white/20 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-8 w-8 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Navigation Buttons */}
            <button 
              onClick={prevImage} 
              className="absolute left-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm" 
              aria-label="Previous image"
            >
              <ChevronLeft className="h-10 w-10 text-white" />
            </button>
            
            <button 
              onClick={nextImage} 
              className="absolute right-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm" 
              aria-label="Next image"
            >
              <ChevronRight className="h-10 w-10 text-white" />
            </button>

            {/* Image */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img 
                src={productImages[currentImageIndex].src} 
                alt={productImages[currentImageIndex].alt} 
                className="max-w-full max-h-[calc(90vh-120px)] object-contain rounded-lg" 
              />
              <div className="text-center space-y-2">
                <p className="text-white text-xl font-semibold">{productImages[currentImageIndex].caption}</p>
                <p className="text-white/60 text-base">
                  {currentImageIndex + 1} / {productImages.length}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TunlandV9;
