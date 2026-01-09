import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageSquare, Shield, Wrench, Award, Settings, Package, Truck, ShoppingCart, Store, TrendingUp, Phone, ChevronLeft, ChevronRight, X, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import cnhBIcon from "@/assets/cnh-b-icon.png";
import foton1217 from "@/assets/foton-1217.jpg";
import cnhBTruckIcon from "@/assets/cnh-b-truck-icon.png";
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

const Foton1217New = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    {
      src: aumarkFrenteLinha,
      alt: "Foton Aumark 1217 - Linha de Caminhões",
      caption: "Linha Aumark - Design frontal"
    },
    {
      src: aumarkFrenteUrbano,
      alt: "Foton Aumark 1217 - Vista Frontal Urbana",
      caption: "Aumark 1217 em ambiente urbano"
    },
    {
      src: aumarkVolantePainel,
      alt: "Foton Aumark 1217 - Volante e Painel",
      caption: "Volante multifuncional e painel digital"
    },
    {
      src: aumarkInteriorCompleto,
      alt: "Foton Aumark 1217 - Interior Completo",
      caption: "Interior completo da cabine"
    },
    {
      src: aumarkPainelCentral,
      alt: "Foton Aumark 1217 - Painel Central",
      caption: "Console central com multimídia"
    },
    {
      src: aumarkChassisLateral,
      alt: "Foton Aumark 1217 - Chassi Lateral",
      caption: "Chassi robusto - Vista lateral"
    },
    {
      src: aumarkChassisAberto,
      alt: "Foton Aumark 1217 - Chassi Aberto",
      caption: "Estrutura do chassi"
    },
    {
      src: aumarkChassisSuperior,
      alt: "Foton Aumark 1217 - Chassi Superior",
      caption: "Chassi completo - Vista superior"
    },
    {
      src: aumarkMotorDetalhe,
      alt: "Motor Cummins do Foton Aumark 1217",
      caption: "Motor Cummins ISF 3.8 - Detalhe"
    },
    {
      src: aumarkLineupFabrica,
      alt: "Foton Aumark 1217 - Lineup Fábrica",
      caption: "Linha de produção Foton"
    }
  ];

  const whatsappNumber = "5531996970656";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o Foton Aumark 1217.");

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
                Foton Aumark 1217
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                O três-quartos mais forte, mais tecnológico e mais eficiente do Brasil.
                <br />
                <span className="text-primary font-semibold">
                  Mais carga por viagem, motor Cummins, caixa ZF, componentes Bosch + Dana e 3 anos de garantia.
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
                  alt="Foton Aumark 1217" 
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
            Principais motivos para escolher o <span className="text-primary">1217</span>
          </h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {/* 1. Maior capacidade de carga */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <Truck className="w-full h-full text-primary" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Maior capacidade de carga (+1 tonelada)</p>
            </div>

            {/* 2. Motor Cummins */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={cumminsLogo} alt="Motor Cummins" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Motor Cummins</p>
            </div>

            {/* 3. Caixa ZF */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={zfLogo} alt="Caixa ZF" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Caixa ZF</p>
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
              <p className="font-semibold text-sm md:text-base text-foreground">Tanque de alumínio</p>
            </div>

            {/* 7. Rodado duplo */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={rodadoDuploIcon} alt="Rodado Duplo" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Rodado duplo</p>
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
                alt="Foton Aumark 1217 - Linha de Caminhões" 
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="aspect-video rounded-2xl border border-border overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
              onClick={() => openLightbox(3)}
            >
              <img 
                src={aumarkInteriorCompleto} 
                alt="Foton Aumark 1217 - Interior Completo" 
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
              <h3 className="text-xl font-bold mb-3">Conjunto mecânico global</h3>
              <p className="text-muted-foreground">
                Motor Cummins ISF 3.8, transmissão ZF, componentes Bosch e Dana. Tecnologia mundial na sua operação.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={durabilityIcon} alt="Durabilidade" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Durabilidade e robustez comprovadas</h3>
              <p className="text-muted-foreground">
                Chassi reforçado, rodado duplo e estrutura preparada para alta quilometragem.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="w-full h-full text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Capacidade superior de carga</h3>
              <p className="text-muted-foreground">
                Mais de 1 tonelada a mais que os concorrentes. Mais carga por viagem, mais produtividade.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={garantia3AnosIcon} alt="Garantia" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Garantia e pós-venda nacionais</h3>
              <p className="text-muted-foreground">
                3 anos de garantia de fábrica + rede de +70 concessionárias prontas para te atender.
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
                  alt="Foton Aumark 1217 - Vista Frontal Urbana" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Aumark 1217 em ambiente urbano</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(4)}
              >
                <img 
                  src={aumarkPainelCentral} 
                  alt="Foton Aumark 1217 - Painel Central" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Console central com multimídia</p>
            </div>

            <div className="space-y-3">
              <div 
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" 
                onClick={() => openLightbox(8)}
              >
                <img 
                  src={aumarkMotorDetalhe} 
                  alt="Motor Cummins do Foton Aumark 1217" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-center text-muted-foreground">Motor Cummins ISF 3.8 - Detalhe</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POR QUE ESCOLHER A FOTON */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que escolher a <span className="text-primary-light">Foton Lavoro</span>
          </h2>
          
          <p className="text-lg md:text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Tecnologia global, montagem nacional e o melhor custo-benefício do mercado brasileiro.
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {/* 1. Garantia de fábrica */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={garantiaFabricaFotonIcon} alt="Garantia de Fábrica 3 Anos" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Garantia de fábrica (3 anos)</h3>
              <p className="text-sm text-gray-600 text-center">Caminhões projetados para rodar sem sustos.</p>
            </div>

            {/* 2. Motores Cummins */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={cumminsLogo} alt="Motor Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Motores Cummins</h3>
              <p className="text-sm text-gray-600 text-center">Confiabilidade global, manutenção simples e economia real.</p>
            </div>

            {/* 3. Caixa ZF */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={zfLogo} alt="Caixa ZF" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Caixa de transmissão ZF</h3>
              <p className="text-sm text-gray-600 text-center">Precisão alemã, trocas suaves e durabilidade comprovada.</p>
            </div>

            {/* 4. Componentes Bosch e Dana */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center gap-2 mx-auto">
                <img src={boschLogo} alt="Bosch" className="w-1/2 h-full object-contain" />
                <img src={danaLogo} alt="Dana" className="w-1/2 h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Componentes Bosch e Dana</h3>
              <p className="text-sm text-gray-600 text-center">Eletrônica, freios e transmissão de padrão mundial.</p>
            </div>

            {/* 5. Tecnologia Europa-China */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={tecnologiaGlobalIcon} alt="Tecnologia Global" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Tecnologia Europa–China</h3>
              <p className="text-sm text-gray-600 text-center">Engenharia internacional com montagem no Brasil.</p>
            </div>

            {/* 6. +70 concessionárias */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={concessionariasIcon} alt="+70 Concessionárias" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">+70 concessionárias no País</h3>
              <p className="text-sm text-gray-600 text-center">Rede completa, sempre perto de você.</p>
            </div>

            {/* 7. Centro logístico */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={centroLogisticoIcon} alt="Centro Logístico Integrado" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Centro logístico integrado</h3>
              <p className="text-sm text-gray-600 text-center">Distribuição rápida e abastecimento nacional.</p>
            </div>

            {/* 8. Fill rate + estoque */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={fillRateIcon} alt="88% Fill Rate" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">88% de fill rate + R$ 90 milhões em peças</h3>
              <p className="text-sm text-gray-600 text-center">Peça na hora certa, operação sem paradas.</p>
            </div>

            {/* 9. Aprovação dos clientes */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={aprovacaoClientesIcon} alt="87% Aprovação dos Clientes" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">87% de aprovação dos clientes</h3>
              <p className="text-sm text-gray-600 text-center">Quem compra, recomenda.</p>
            </div>
          </div>

          <div className="text-center mt-12 space-y-2">
            <p className="text-xl md:text-2xl font-bold text-white">
              Mais tecnologia, mais robustez, mais caminhão — por menos dinheiro.
            </p>
            <p className="text-lg md:text-xl text-primary-light font-semibold">
              Foton Lavoro: a escolha inteligente.
            </p>
          </div>
        </div>
      </section>

      {/* 6. APLICAÇÕES IDEAIS */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Aplicações <span className="text-primary">Ideais</span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Package className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Distribuição urbana</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Store className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Atacarejo e varejo</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">E-commerce e last-mile</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Truck className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Entregas regionais</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Logística dedicada</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FICHA TÉCNICA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ficha Técnica Completa
              </h2>
              <p className="text-lg text-muted-foreground">
                Todas as especificações técnicas do Foton Aumark 1217
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
                      <span className="font-medium">Cummins ISF 3.8</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Cilindros/Cilindrada:</span>
                      <span className="font-medium">4/3.760 cm³</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Potência Máxima:</span>
                      <span className="font-medium">170 cv @ 2.600 rpm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Torque Máximo:</span>
                      <span className="font-medium">600 Nm @ 1.200-1.900 rpm</span>
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
                      <span className="font-medium">EURO 6 (P8)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Tecnologia:</span>
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
                      <span className="font-medium text-primary">Trem de força premium</span>
                      <span className="text-muted-foreground text-sm">Conjunto mecânico Cummins + ZF com eficiência comprovada</span>
                    </div>
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Engenharia global</span>
                      <span className="text-muted-foreground text-sm">Tecnologia de padrão internacional aplicada ao mercado brasileiro</span>
                    </div>
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Economia operacional</span>
                      <span className="text-muted-foreground text-sm">Estimativa de 12% a 15% de redução de custos vs conjuntos convencionais*</span>
                    </div>
                    <div className="flex flex-col py-2 border-b border-border/50">
                      <span className="font-medium text-primary">Durabilidade</span>
                      <span className="text-muted-foreground text-sm">Componentes dimensionados para alta quilometragem</span>
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
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="font-medium">Manual 6 marchas</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Relações de transmissão:</span>
                      <span className="font-medium text-xs">I:6.198 II:3.287 III:2.025 IV:1.371 V:1 VI:0.78 Ré:5.681</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Embreagem:</span>
                      <span className="font-medium">Tipo seco, mola diafragma Ø362mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo Dianteiro:</span>
                      <span className="font-medium">Viga "I" Aço forjado - 4.0 ton</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo Traseiro:</span>
                      <span className="font-medium">7.5 ton - Relação 4.778</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Rodas e Pneus:</span>
                      <span className="font-medium">Aço - 235/75 R17.5</span>
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
                      <span className="font-medium">7.995 / 6.885 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Largura máx. dianteira:</span>
                      <span className="font-medium">2.190 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Largura máx. traseira:</span>
                      <span className="font-medium">2.150 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Altura:</span>
                      <span className="font-medium">2.335 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Distância entre-eixos:</span>
                      <span className="font-medium">4.500 / 3.800 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Balanço dianteiro:</span>
                      <span className="font-medium">1.130 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Balanço traseiro:</span>
                      <span className="font-medium">2.325 / 1.955 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Distância ao solo:</span>
                      <span className="font-medium">190 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Bitola dianteira:</span>
                      <span className="font-medium">1.715 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Bitola traseira:</span>
                      <span className="font-medium">1.680 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Plataforma de carga:</span>
                      <span className="font-medium">6.150 / 5.140 mm</span>
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
                      <span className="font-medium">11.500 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Peso em ordem de marcha:</span>
                      <span className="font-medium">3.244 / 3.174 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Capacidade carga útil + carroceria:</span>
                      <span className="font-medium">8.256 / 8.326 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Capacidade técnica total:</span>
                      <span className="font-medium">12.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo dianteiro:</span>
                      <span className="font-medium">4.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Eixo traseiro:</span>
                      <span className="font-medium">8.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">PBTC (Combinado):</span>
                      <span className="font-medium">14.000 kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">CMT (Cap. máx. tração):</span>
                      <span className="font-medium">14.000 kg</span>
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
                      <span className="font-medium text-xs">Molas parabólicas, amortecedores hidráulicos telescópicos, barra estabilizadora (3 lâminas)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Suspensão Traseira:</span>
                      <span className="font-medium text-xs">Molas parabólicas, amortecedores (4+3 lâminas)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Freio de Serviço:</span>
                      <span className="font-medium">Ar, tambor dianteiro e traseiro com ABS+ASR+ESC</span>
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
                      <span className="font-medium">200-A / 160-B / 60 L Alumínio</span>
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
                        <span>Volante multifuncional</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>DRL (Luzes diurnas)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Controle de Cruzeiro - Função ACC</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sensor de marcha ré</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Campainha de marcha ré</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>MP3+Bluetooth</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Janelas elétricas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Barra estabilizadora dianteira e traseira</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Defletor de ar</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>AC eletrônico</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Banco do condutor com amortecedor mecânico</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>7 polegadas MP5 + câmera de ré + bluetooth (opcional)</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20">
              <p className="text-lg mb-4 text-foreground">
                Quer saber mais detalhes ou agendar um test-drive?
              </p>
              <Button 
                onClick={handleWhatsApp} 
                size="lg" 
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Falar com especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section id="cta-final" className="py-16 md:py-20 bg-gradient-to-br from-industrial-dark to-industrial-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Pronto para dirigir o 1217?
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Atendimento rápido. Sem enrolação. Sem burocracia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={handleWhatsApp} 
                size="lg" 
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-6 h-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Falar com consultor pelo WhatsApp
              </Button>
              <Button 
                onClick={handleWhatsApp} 
                size="lg" 
                variant="outline" 
                className="border-white text-white text-lg px-10 py-6 h-auto bg-blue-900 hover:bg-blue-800"
              >
                <Phone className="mr-2 h-5 w-5" />
                Solicitar proposta
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={prevImage} 
              className="absolute left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" 
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            
            <button 
              onClick={nextImage} 
              className="absolute right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" 
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <img 
                src={productImages[currentImageIndex].src} 
                alt={productImages[currentImageIndex].alt} 
                className="max-w-full max-h-[calc(90vh-100px)] object-contain"
              />
              <div className="text-center">
                <p className="text-white text-lg">{productImages[currentImageIndex].caption}</p>
                <p className="text-white/60 text-sm mt-1">
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

export default Foton1217New;
