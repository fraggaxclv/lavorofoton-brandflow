import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageSquare, Shield, Wrench, Award, Settings, Package, Truck, ShoppingCart, Store, TrendingUp, Phone, ChevronLeft, ChevronRight, X, FileText } from "lucide-react";
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
import motorCumminsFotonIcon from "@/assets/motor-cummins-foton-icon.png";
import garantiaFabricaFotonIcon from "@/assets/garantia-3anos-foton.png";
import tecnologiaGlobalIcon from "@/assets/tecnologia-global-icon.png";
import concessionariasIcon from "@/assets/70-concessionarias-icon.png";
import centroLogisticoIcon from "@/assets/centro-logistico-icon.png";
import fillRateIcon from "@/assets/fill-rate-icon.png";
import aprovacaoClientesIcon from "@/assets/aprovacao-clientes-icon.png";
import qualidadeIcon from "@/assets/qualidade-icon.png";

const Foton9T = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
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
      src: aumarkChassisAberto,
      alt: "Foton Aumark 916 - Chassi Aberto",
      caption: "Estrutura do chassi"
    },
    {
      src: aumarkChassisSuperior,
      alt: "Foton Aumark 916 - Chassi Superior",
      caption: "Chassi completo - Vista superior"
    },
    {
      src: aumarkMotorDetalhe,
      alt: "Motor Cummins do Foton Aumark 916",
      caption: "Motor Cummins F3.8 - Detalhe"
    },
    {
      src: aumarkLineupFabrica,
      alt: "Foton Aumark 916 - Lineup Fábrica",
      caption: "Linha de produção Foton"
    }
  ];

  const whatsappNumber = "553121167435";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o Foton Aumark 916.");

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

      {/* 1. HERO */}
      <section className="relative bg-industrial-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Foton Aumark 916
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                Potência e capacidade para rotas regionais exigentes.
                <br />
                <span className="text-primary font-semibold">
                  9 toneladas de PBT, motor Cummins F3.8 de 160cv, transmissão ZF 6 marchas, componentes globais e 3 anos de garantia.
                </span>
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
                  className="border-white text-white text-lg px-8 py-6 h-auto bg-blue-900 hover:bg-blue-800"
                >
                  Solicitar Proposta
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-video rounded-lg overflow-hidden">
                <img 
                  src={aumarkFrenteUrbano} 
                  alt="Foton Aumark 916" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRINCIPAIS MOTIVOS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-foreground">
            Principais motivos para escolher o <span className="text-primary">916</span>
          </h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {/* 1. 9 toneladas */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <Truck className="w-full h-full text-primary" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">9 toneladas de capacidade</p>
            </div>

            {/* 2. Motor Cummins */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={cumminsLogo} alt="Motor Cummins" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Motor Cummins F3.8 160cv</p>
            </div>

            {/* 3. Caixa ZF */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={zfLogo} alt="Caixa ZF" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Caixa ZF 6 marchas</p>
            </div>

            {/* 4. Componentes Bosch + Dana */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center gap-2">
                <img src={boschLogo} alt="Bosch" className="h-full w-auto object-contain" />
                <img src={danaLogo} alt="Dana" className="h-full w-auto object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Componentes Bosch + Dana</p>
            </div>

            {/* 5. Chassi reforçado */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={chassiReforcadoIcon} alt="Chassi Reforçado" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Chassi reforçado</p>
            </div>

            {/* 6. Tanque de alumínio */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={tanqueAluminioIcon} alt="Tanque de Alumínio" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Tanque de alumínio 160L</p>
            </div>

            {/* 7. Rodado duplo */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={rodadoDuploIcon} alt="Rodado Duplo" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Rodado duplo traseiro</p>
            </div>

            {/* 8. 3 anos de garantia */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={garantia3AnosIcon} alt="3 Anos de Garantia" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">3 anos de garantia de fábrica</p>
            </div>
          </div>

          {/* Imagens do produto */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
            <div 
              className="aspect-video rounded-2xl border border-border overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => openLightbox(0)}
            >
              <img 
                src={aumarkFrenteLinha} 
                alt="Foton Aumark 916 - Linha de Caminhões" 
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="aspect-video rounded-2xl border border-border overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => openLightbox(3)}
            >
              <img 
                src={aumarkInteriorCompleto} 
                alt="Foton Aumark 916 - Interior Completo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTAQUES TÉCNICOS */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
                <img src={cumminsLogo} alt="Cummins" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src={zfLogo} alt="ZF" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src={boschLogo} alt="Bosch" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src={danaLogo} alt="Dana" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conjunto mecânico global de alta performance</h3>
              <p className="text-muted-foreground">
                Motor Cummins F3.8 de 160cv e 500Nm de torque, transmissão ZF 6S558 com 6 marchas, componentes Bosch e Dana. Tecnologia mundial para operações exigentes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={durabilityIcon} alt="Durabilidade" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Durabilidade e robustez comprovadas</h3>
              <p className="text-muted-foreground">
                Chassi reforçado dimensionado para 9 toneladas, rodado duplo traseiro e estrutura preparada para alta quilometragem e cargas pesadas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="w-full h-full text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Capacidade e versatilidade ampliadas</h3>
              <p className="text-muted-foreground">
                9 toneladas de PBT com 6 toneladas de carga útil. Ideal para distribuição regional, transporte intermunicipal e cargas volumosas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={garantia3AnosIcon} alt="Garantia" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Garantia e pós-venda nacionais</h3>
              <p className="text-muted-foreground">
                3 anos de garantia de fábrica + rede de +70 concessionárias e centro logístico nacional prontos para te atender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMAGENS DO PRODUTO */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(1)}
              >
                <img 
                  src={aumarkFrenteUrbano} 
                  alt="Foton Aumark 916 - Vista Frontal Urbana" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Aumark 916 em ambiente urbano</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(4)}
              >
                <img 
                  src={aumarkPainelCentral} 
                  alt="Foton Aumark 916 - Painel Central" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Console central com multimídia MP5</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(8)}
              >
                <img 
                  src={aumarkMotorDetalhe} 
                  alt="Motor Cummins do Foton Aumark 916" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Motor Cummins F3.8 - 160cv</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(5)}
              >
                <img 
                  src={aumarkChassisLateral} 
                  alt="Foton Aumark 916 - Chassi Lateral" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Chassi robusto - Vista lateral</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(2)}
              >
                <img 
                  src={aumarkVolantePainel} 
                  alt="Foton Aumark 916 - Volante e Painel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Volante multifuncional</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(6)}
              >
                <img 
                  src={aumarkChassisAberto} 
                  alt="Foton Aumark 916 - Chassi Aberto" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Estrutura do chassi</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ESPECIFICAÇÕES TÉCNICAS DETALHADAS */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-foreground">
            Especificações Técnicas Completas
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Motor */}
              <AccordionItem value="motor" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Motor
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Fabricante/Modelo</span>
                      <span className="font-semibold">Cummins F3.8</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Nº de cilindros</span>
                      <span className="font-semibold">4</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Cilindrada</span>
                      <span className="font-semibold">3.760 cm³</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Potência Líq. Máx.</span>
                      <span className="font-semibold">160cv @ 2.600rpm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Torque Líq. Máx.</span>
                      <span className="font-semibold">500Nm (1.100 a 1.900rpm)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Sistema de injeção</span>
                      <span className="font-semibold">Common Rail</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Norma de emissões</span>
                      <span className="font-semibold">CONAMA P8</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Tecnologia de Emissões</span>
                      <span className="font-semibold">SCR+DOC+DPF</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Transmissão */}
              <AccordionItem value="transmissao" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary" />
                    Transmissão
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Fabricante/Modelo</span>
                      <span className="font-semibold">ZF 6S558</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Tipo/Acionamento</span>
                      <span className="font-semibold">Manual a cabos</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Nº de marchas</span>
                      <span className="font-semibold">6MT</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação I</span>
                      <span className="font-semibold">6.198</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação II</span>
                      <span className="font-semibold">3.267</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação III</span>
                      <span className="font-semibold">2.025</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação IV</span>
                      <span className="font-semibold">1.371</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação V</span>
                      <span className="font-semibold">1.0</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação VI</span>
                      <span className="font-semibold">0.78</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Relação Ré</span>
                      <span className="font-semibold">5.681</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Embreagem */}
              <AccordionItem value="embreagem" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Embreagem
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Fabricante/Tipo</span>
                      <span className="font-semibold">Tipo seco, mola de diafragma</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Diâmetro do disco</span>
                      <span className="font-semibold">Ø362mm</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Eixos */}
              <AccordionItem value="eixos" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    Eixos Dianteiro e Traseiro
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Eixo Dianteiro</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Modelo/Tipo</span>
                          <span className="font-semibold">Viga "I" Aço forjado</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Capacidade</span>
                          <span className="font-semibold">3,0 Ton</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Eixo Traseiro</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Capacidade</span>
                          <span className="font-semibold">6,0 Ton</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Relação de redução</span>
                          <span className="font-semibold">4.33</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Suspensão */}
              <AccordionItem value="suspensao" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Suspensão
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Molas parabólicas, amortecedores hidráulicos telescópicos de dupla ação. Barra estabilizadora.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-muted-foreground">Dianteiro</span>
                        <span className="font-semibold">3 lâminas</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-muted-foreground">Traseira</span>
                        <span className="font-semibold">4+2 lâminas</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Rodas e Pneus */}
              <AccordionItem value="rodas" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Rodas e Pneus
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Aro das rodas</span>
                      <span className="font-semibold">Aço</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Pneus</span>
                      <span className="font-semibold">215/75 R17,5</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Freios */}
              <AccordionItem value="freios" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    Freios
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Freio de serviço</span>
                      <span className="font-semibold">Ar, tambor com ABS+ASR+ESC</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Freio de estacionamento</span>
                      <span className="font-semibold">Câmara de molas acumuladoras</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Freio Motor</span>
                      <span className="font-semibold">EAT</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Sistema Elétrico e Volumes */}
              <AccordionItem value="eletrico" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Sistema Elétrico e Volumes
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Sistema Elétrico</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Tensão nominal</span>
                          <span className="font-semibold">24V</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Bateria</span>
                          <span className="font-semibold">2x 100Ah</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Volumes de abastecimento</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Combustível</span>
                          <span className="font-semibold">160L Alumínio</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-muted-foreground">Tanque de ARLA 32</span>
                          <span className="font-semibold">30L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Dimensões */}
              <AccordionItem value="dimensoes" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    Dimensões
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Comprimento total</span>
                      <span className="font-semibold">6.920mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Largura máxima dianteira</span>
                      <span className="font-semibold">2.136mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Largura máxima traseira</span>
                      <span className="font-semibold">2.045mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Altura</span>
                      <span className="font-semibold">2.280mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Distância entre eixos</span>
                      <span className="font-semibold">3.800mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Balanço dianteiro</span>
                      <span className="font-semibold">1.110mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Balanço traseiro</span>
                      <span className="font-semibold">1.490mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Distância do solo</span>
                      <span className="font-semibold">185mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Bitola dianteira</span>
                      <span className="font-semibold">1.750mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Bitola traseira</span>
                      <span className="font-semibold">1.615mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Comprimento plataforma de carga</span>
                      <span className="font-semibold">5.140mm</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Pesos */}
              <AccordionItem value="pesos" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary" />
                    Pesos e Capacidades
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">PBT - homologado</span>
                      <span className="font-semibold">9.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Peso em ordem de marcha</span>
                      <span className="font-semibold">2.979 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Capacidade máx. de carga útil</span>
                      <span className="font-semibold">6.021 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Capacidade técnica (Total)</span>
                      <span className="font-semibold">9.800 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Eixo dianteiro</span>
                      <span className="font-semibold">3.500 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">Eixo traseiro</span>
                      <span className="font-semibold">6.300 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">PBTC</span>
                      <span className="font-semibold">12.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">CMT - Cap. máx. de tração</span>
                      <span className="font-semibold">12.000 kg</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Obs.: os pesos podem sofrer alterações devido aos itens opcionais. Tolerância = ou - 3%. (Referência NBR ISO 1176)
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Itens de Série */}
              <AccordionItem value="itens" className="bg-white rounded-lg shadow-sm px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Itens de Série
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">ABS+ASR+ESC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Volante multifuncional</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">DRL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Controle de Cruzeiro - Função ACC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Sensor de marcha ré</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Campainha de marcha ré</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">MP3+Bluetooth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Janelas elétricas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Barra estabilizadora dianteira e traseira</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Defletor de ar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">AC eletrônico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Banco do condutor com amortecedor mecânico</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-muted-foreground">Opcional:</span>
                      <span className="text-sm">7 polegadas MP5 + câmera de ré + bluetooth</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* 6. POR QUE A FOTON LAVORO? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Por que escolher a <span className="text-primary">Foton Lavoro</span>?
          </h2>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img src={motorCumminsFotonIcon} alt="Motor Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tecnologia global</h3>
              <p className="text-muted-foreground">
                Componentes globais Cummins, ZF, Bosch e Dana. Performance e confiabilidade comprovadas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img src={garantiaFabricaFotonIcon} alt="Garantia de Fábrica" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">3 anos de garantia de fábrica</h3>
              <p className="text-muted-foreground">
                Tranquilidade e segurança para seu investimento com garantia estendida.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img src={concessionariasIcon} alt="Rede de Concessionárias" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">+70 concessionárias</h3>
              <p className="text-muted-foreground">
                Rede nacional pronta para atender suas necessidades de vendas, peças e serviços.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img src={centroLogisticoIcon} alt="Centro Logístico" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Centro logístico nacional</h3>
              <p className="text-muted-foreground">
                Peças sempre disponíveis para manter sua operação rodando sem paradas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img src={fillRateIcon} alt="Fill Rate" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fill rate superior</h3>
              <p className="text-muted-foreground">
                Alta disponibilidade de peças no estoque para atendimento rápido e eficiente.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img src={aprovacaoClientesIcon} alt="Aprovação de Clientes" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Alta aprovação dos clientes</h3>
              <p className="text-muted-foreground">
                Milhares de clientes satisfeitos em todo Brasil. Qualidade comprovada no dia a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section id="cta-final" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para elevar sua operação?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            O Foton Aumark 916 oferece 9 toneladas de capacidade com tecnologia global, componentes premium e 3 anos de garantia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsApp} 
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-7 h-auto"
            >
              <MessageSquare className="mr-2 h-6 w-6" />
              Falar com especialista no WhatsApp
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-primary-foreground text-lg px-10 py-7 h-auto bg-white/10 hover:bg-white hover:text-primary"
              onClick={() => window.location.href = '/contato'}
            >
              <Phone className="mr-2 h-6 w-6" />
              Solicitar contato de vendedor
            </Button>
          </div>
          
          <p className="text-sm mt-8 opacity-75">
            Atendimento personalizado • Propostas competitivas • Test-drive disponível
          </p>
        </div>
      </section>

      {/* Lightbox para Galeria */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black/95 border-none">
          <div className="relative aspect-video">
            <img 
              src={productImages[currentImageIndex].src}
              alt={productImages[currentImageIndex].alt}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {productImages[currentImageIndex].caption}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Foton9T;
