import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageSquare, Shield, Wrench, Award, Settings, Package, Truck, ShoppingCart, Store, TrendingUp, Phone, ChevronLeft, ChevronRight, X, FileText, Snowflake } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import foton916 from "@/assets/foton-916.jpg";
import aumarkFrenteLinha from "@/assets/aumark-frente-linha.jpg";
import aumarkVolantePainel from "@/assets/aumark-volante-painel.jpg";
import aumarkChassisLateral from "@/assets/aumark-chassis-lateral.webp";
import aumarkFrenteUrbano from "@/assets/aumark-frente-urbano.jpg";
import aumarkChassisAberto from "@/assets/aumark-chassis-aberto.jpg";
import aumarkLineupFabrica from "@/assets/aumark-lineup-fabrica.jpg";
import aumarkPainelCentral from "@/assets/aumark-painel-central.jpg";
import aumarkChassisSuperior from "@/assets/aumark-chassis-superior.jpg";
import aumarkMotorDetalhe from "@/assets/aumark-motor-detalhe.jpg";
import aumarkInteriorCompleto from "@/assets/aumark-interior-completo.jpg";
import durabilityIcon from "@/assets/durability-icon.png";
import rodadoDuploIcon from "@/assets/rodado-duplo-icon.png";
import chassiReforcadoIcon from "@/assets/chassi-reforcado-icon.png";
import garantia3AnosIcon from "@/assets/garantia-3anos-foton.png";
import tanqueAluminioIcon from "@/assets/tanque-aluminio-icon.png";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import garantiaFabricaFotonIcon from "@/assets/garantia-3anos-foton.png";
import tecnologiaGlobalIcon from "@/assets/tecnologia-global-icon.png";
import concessionariasIcon from "@/assets/70-concessionarias-icon.png";
import centroLogisticoIcon from "@/assets/centro-logistico-icon.png";
import fillRateIcon from "@/assets/fill-rate-icon.png";
import aprovacaoClientesIcon from "@/assets/aprovacao-clientes-icon.png";

const Foton9T = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    {
      src: foton916,
      alt: "Foton Aumark 916 - Vista Externa",
      caption: "Foton Aumark 916 - Especialista em Cadeia Fria"
    },
    {
      src: aumarkFrenteLinha,
      alt: "Foton Aumark 916 - Linha de Caminhões",
      caption: "Linha Aumark - Design frontal"
    },
    {
      src: aumarkFrenteUrbano,
      alt: "Foton Aumark 916 - Vista Frontal Urbana",
      caption: "Aumark 916 em ambiente urbano"
    },
    {
      src: aumarkVolantePainel,
      alt: "Foton Aumark 916 - Volante e Painel",
      caption: "Volante multifuncional e painel digital"
    },
    {
      src: aumarkInteriorCompleto,
      alt: "Foton Aumark 916 - Interior Completo",
      caption: "Interior completo da cabine"
    },
    {
      src: aumarkPainelCentral,
      alt: "Foton Aumark 916 - Painel Central",
      caption: "Console central com multimídia"
    },
    {
      src: aumarkChassisLateral,
      alt: "Foton Aumark 916 - Chassi Lateral",
      caption: "Chassi robusto - Vista lateral"
    },
    {
      src: aumarkMotorDetalhe,
      alt: "Motor Cummins do Foton Aumark 916",
      caption: "Motor Cummins F3.8 - 160 cv"
    }
  ];

  const whatsappNumber = "5531997966042";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o Foton Aumark 916 para transporte refrigerado.");

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

      {/* 1. HERO - ESPECIALISTA EM CADEIA FRIA */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkgy0di0yaDEyem0tMjItNnY0SDR2LTRoMTB6bTI0IDR2NEgyOHYtNGgxMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-4 py-2">
                <Snowflake className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-semibold text-sm">Especialista em Cadeia Fria</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Foton Aumark S 916
                <span className="block text-2xl md:text-3xl text-cyan-400 mt-2 font-medium">O campeão do transporte refrigerado</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                9 toneladas de PBT. Motor Cummins F3.8 de <span className="text-cyan-400 font-bold">160 cv</span>. 
                Transmissão ZF 6 marchas. Chassi dimensionado para baús térmicos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleWhatsApp} 
                  size="lg" 
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Falar no WhatsApp agora
                </Button>
                <Button 
                  onClick={handleQuoteClick} 
                  size="lg" 
                  variant="outline" 
                  className="border-cyan-400 text-cyan-400 text-lg px-8 py-6 h-auto bg-cyan-500/10 hover:bg-cyan-500/20"
                >
                  Solicitar Proposta
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-cyan-500/30">
                <img 
                  src={foton916} 
                  alt="Foton Aumark 916 - Especialista em Cadeia Fria" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIFERENCIAIS DO 916 - CARDS DESTACADOS */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Por que o <span className="text-cyan-600">916</span> é o campeão da cadeia fria?
          </h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Refrigeração */}
            <div className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-cyan-500/20 rounded-xl">
                <span className="text-3xl">❄️</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Especialista em Refrigeração</h3>
              <p className="text-muted-foreground text-sm">Chassi dimensionado especialmente para baús térmicos e isotérmicos</p>
            </div>

            {/* Card 2 - Potência */}
            <div className="group bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-2xl p-6 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-orange-500/20 rounded-xl">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">160 CV de Potência</h3>
              <p className="text-muted-foreground text-sm">Motor Cummins F3.8 com 500 Nm de torque para cargas pesadas</p>
            </div>

            {/* Card 3 - Transmissão */}
            <div className="group bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-purple-500/30 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-purple-500/20 rounded-xl">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">ZF 6 Marchas</h3>
              <p className="text-muted-foreground text-sm">Transmissão premium ZF 6S558 para máxima eficiência</p>
            </div>

            {/* Card 4 - Segurança */}
            <div className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 hover:border-green-400 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-green-500/20 rounded-xl">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">Segurança Total</h3>
              <p className="text-muted-foreground text-sm">ABS + ASR + ESC de série para proteção completa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APLICAÇÕES - CADEIA FRIA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0a1628] to-[#1a3a5c] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Ideal para <span className="text-cyan-400">transporte refrigerado</span>
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Chassis preparado para as exigências do transporte de produtos perecíveis
          </p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-4xl mb-2">🧊</span>
              <span className="text-sm font-medium">Congelados</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-4xl mb-2">🍖</span>
              <span className="text-sm font-medium">Frigoríficos</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-4xl mb-2">🥛</span>
              <span className="text-sm font-medium">Laticínios</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-4xl mb-2">💊</span>
              <span className="text-sm font-medium">Farmácias</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-4xl mb-2">🌽</span>
              <span className="text-sm font-medium">Agricultura</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-4xl mb-2">🐟</span>
              <span className="text-sm font-medium">Pescados</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIA DE IMAGENS */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Conheça o Aumark 916</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productImages.slice(0, 3).map((image, index) => (
              <div key={index} className="space-y-3">
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-border" 
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">{image.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POR QUE ESCOLHER A FOTON LAVORO */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que escolher a <span className="text-primary-light">Foton Lavoro</span>
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Tecnologia global, montagem nacional e o melhor custo-benefício do mercado brasileiro.
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={garantiaFabricaFotonIcon} alt="Garantia de Fábrica 3 Anos" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Garantia de fábrica (3 anos)</h3>
              <p className="text-sm text-gray-600 text-center">Caminhões projetados para rodar sem sustos.</p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={cumminsLogo} alt="Motor Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Motores Cummins</h3>
              <p className="text-sm text-gray-600 text-center">Referência global em durabilidade e performance.</p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={tecnologiaGlobalIcon} alt="Tecnologia Global" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Tecnologia global</h3>
              <p className="text-sm text-gray-600 text-center">Engenharia de classe mundial adaptada ao Brasil.</p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={concessionariasIcon} alt="+70 Concessionárias" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">+70 concessionárias</h3>
              <p className="text-sm text-gray-600 text-center">Rede de suporte em todo o Brasil.</p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={fillRateIcon} alt="Fill Rate" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">95% fill rate de peças</h3>
              <p className="text-sm text-gray-600 text-center">Seu caminhão não para por falta de peças.</p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={aprovacaoClientesIcon} alt="Aprovação dos Clientes" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Alta aprovação</h3>
              <p className="text-sm text-gray-600 text-center">Milhares de clientes satisfeitos em todo Brasil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FICHA TÉCNICA COMPLETA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 mb-4">
                <FileText className="w-8 h-8 text-cyan-600" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ficha Técnica Completa
              </h2>
              <p className="text-lg text-muted-foreground">
                Todas as especificações técnicas do Foton Aumark 916
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {/* Motor */}
              <AccordionItem value="motor" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">🔧 Motor e Desempenho</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Fabricante/Modelo:</span>
                      <span className="font-medium">Cummins F3.8</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Nº de cilindros:</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Cilindrada:</span>
                      <span className="font-medium">3.760 cm³</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Potência Máxima:</span>
                      <span className="font-medium text-cyan-600 font-bold">160 cv @ 2.600 rpm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Torque Máximo:</span>
                      <span className="font-medium text-cyan-600 font-bold">500 Nm @ 1.100-1.900 rpm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Sistema de Injeção:</span>
                      <span className="font-medium">Common Rail</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Combustível:</span>
                      <span className="font-medium">Diesel S10</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Norma de Emissões:</span>
                      <span className="font-medium">CONAMA P8 (EURO 6)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Tecnologia de Emissões:</span>
                      <span className="font-medium">SCR+DOC+DPF</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Diferenciais Técnicos */}
              <AccordionItem value="diferenciais" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">⭐ Diferenciais Técnicos</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Trem de força Cummins + ZF</span>
                      <span className="text-muted-foreground text-sm">Conjunto mecânico premium com eficiência comprovada</span>
                    </div>
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Homologação IBAMA/PROCONVE</span>
                      <span className="text-muted-foreground text-sm">Atende todas as normas ambientais brasileiras</span>
                    </div>
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Estrutura para cargas refrigeradas</span>
                      <span className="text-muted-foreground text-sm">Chassi dimensionado para baús térmicos e isotérmicos</span>
                    </div>
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Economia operacional</span>
                      <span className="text-muted-foreground text-sm">Estimativa de 12% a 15% de redução de custos vs convencionais*</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-4">*Dados estimados podem variar conforme condições de uso e operação</p>
                </AccordionContent>
              </AccordionItem>

              {/* Transmissão */}
              <AccordionItem value="transmissao" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">⚙️ Transmissão e Trem de Força</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Fabricante/Modelo:</span>
                      <span className="font-medium">ZF 6S558</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Tipo/Acionamento:</span>
                      <span className="font-medium">Manual a cabos - 6MT</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Relações:</span>
                      <span className="font-medium text-xs">I:6.198 II:3.267 III:2.025 IV:1.371 V:1.0 VI:0.78 Ré:5.681</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Embreagem:</span>
                      <span className="font-medium">Tipo seco, mola diafragma Ø362mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo Dianteiro:</span>
                      <span className="font-medium">Viga "I" Aço forjado - 3.0 ton</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo Traseiro:</span>
                      <span className="font-medium">6.0 ton - Relação 5.571</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Rodas e Pneus:</span>
                      <span className="font-medium">Aço - 215/75 R17.5</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Dimensões */}
              <AccordionItem value="dimensoes" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">📏 Dimensões e Capacidades</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Comprimento total:</span>
                      <span className="font-medium">6.885 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Largura máx. dianteira:</span>
                      <span className="font-medium">2.070 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Largura máx. traseira:</span>
                      <span className="font-medium">1.940 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Altura:</span>
                      <span className="font-medium">2.315 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Distância entre-eixos:</span>
                      <span className="font-medium">3.800 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Balanço dianteiro:</span>
                      <span className="font-medium">1.130 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Balanço traseiro:</span>
                      <span className="font-medium">1.955 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Distância ao solo:</span>
                      <span className="font-medium">188 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Bitola dianteira:</span>
                      <span className="font-medium">1.715 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Bitola traseira:</span>
                      <span className="font-medium">1.540 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Plataforma de carga:</span>
                      <span className="font-medium">5.140 mm</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Pesos */}
              <AccordionItem value="pesos" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">⚖️ Pesos e Capacidades de Carga</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">PBT (homologado):</span>
                      <span className="font-medium text-cyan-600 font-bold">9.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Peso em ordem de marcha:</span>
                      <span className="font-medium">2.820 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Capacidade carga útil + carroceria:</span>
                      <span className="font-medium">6.180 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Capacidade técnica total:</span>
                      <span className="font-medium">9.500 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo dianteiro:</span>
                      <span className="font-medium">3.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo traseiro:</span>
                      <span className="font-medium">6.500 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">PBTC (Combinado):</span>
                      <span className="font-medium">12.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">CMT (Cap. máx. tração):</span>
                      <span className="font-medium">12.000 kg</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Sistemas */}
              <AccordionItem value="sistemas" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">🛞 Suspensão, Freios e Sistema Elétrico</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Suspensão Dianteira:</span>
                      <span className="font-medium text-xs">Molas parabólicas, amortecedores hidráulicos, barra estabilizadora (3 lâminas)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Suspensão Traseira:</span>
                      <span className="font-medium text-xs">Molas parabólicas, amortecedores (4+2 lâminas)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Freio de Serviço:</span>
                      <span className="font-medium">Ar, tambor com ABS+ASR+ESC</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Freio de Estacionamento:</span>
                      <span className="font-medium">Câmara de molas acumuladoras</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Freio Motor:</span>
                      <span className="font-medium">EAT</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Sistema Elétrico:</span>
                      <span className="font-medium">24V</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Bateria:</span>
                      <span className="font-medium">2x 100 Ah</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Tanque combustível:</span>
                      <span className="font-medium">160L Alumínio</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Tanque ARLA 32:</span>
                      <span className="font-medium">30L</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CNH e Garantia */}
              <AccordionItem value="outros" className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">✅ Habilitação, Garantia e Itens de Série</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 pb-4 border-b border-border">
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">CNH necessária:</span>
                      <span className="font-medium text-primary font-semibold">Categoria C</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Garantia de fábrica:</span>
                      <span className="font-medium text-primary font-semibold">3 anos ou 100.000 km</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Itens de Série - Versão Padrão:</h4>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>ABS+ASR+ESC</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Air-bag frontal motorista e passageiro</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Ar condicionado</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Vidros e travas elétricas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Direção hidráulica</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Central multimídia 10.1"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Banco do motorista c/ ajuste altura</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sensor de fadiga</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Câmera de ré</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Rodado duplo traseiro</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section id="cta-final" className="py-16 md:py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <Snowflake className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para liderar sua operação de cadeia fria?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Fale agora com nossos especialistas e descubra as condições especiais para o Aumark 916.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsApp}
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Falar no WhatsApp
            </Button>
            <a 
              href="/contato" 
              className="inline-flex items-center justify-center bg-white text-cyan-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Ligar Agora
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl bg-black/95 border-none p-2">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors">
            <X className="h-6 w-6 text-white" />
          </DialogClose>
          
          <div className="relative">
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            
            <div className="flex flex-col items-center">
              <img 
                src={productImages[currentImageIndex]?.src} 
                alt={productImages[currentImageIndex]?.alt}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">
                {productImages[currentImageIndex]?.caption}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {currentImageIndex + 1} / {productImages.length}
              </p>
            </div>
            
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Foton9T;
