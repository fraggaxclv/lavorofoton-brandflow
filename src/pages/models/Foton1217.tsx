import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare } from "lucide-react";
import foton1217 from "@/assets/foton-1217.jpg";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import durabilityIcon from "@/assets/durability-icon.png";
import garantia3AnosIcon from "@/assets/garantia-3anos-foton.png";
import motorCumminsFotonIcon from "@/assets/motor-cummins-foton-icon.png";
import garantiaFabricaFotonIcon from "@/assets/garantia-3anos-foton.png";
import tecnologiaGlobalIcon from "@/assets/tecnologia-global-icon.png";
import concessionariasIcon from "@/assets/70-concessionarias-icon.png";
import centroLogisticoIcon from "@/assets/centro-logistico-icon.png";
import fillRateIcon from "@/assets/fill-rate-icon.png";
import aprovacaoClientesIcon from "@/assets/aprovacao-clientes-icon.png";

const Foton1217 = () => {
  const whatsappNumber = "5531999998888";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o Foton 1217.");

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  const handleQuoteClick = () => {
    document.getElementById('cta-final')?.scrollIntoView({
      behavior: 'smooth'
    });
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
                Foton 1217 – O melhor três-quartos do mercado.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                Mais força, mais capacidade, mais tecnologia.<br />
                <span className="text-primary font-semibold">O caminhão que domina o segmento 3/4 com autoridade.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Falar no WhatsApp agora
                </Button>
                <Button onClick={handleQuoteClick} size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
                  Solicitar Proposta
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-video rounded-lg overflow-hidden">
                <img 
                  src={foton1217} 
                  alt="Foton 1217" 
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
          {/* Título */}
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 md:mb-20 text-foreground">
            Principais motivos para escolher o <span className="text-primary">Foton 1217</span>
          </h2>
          
          {/* Grid de Benefícios */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {/* 1. Carrega até 1 tonelada a mais */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">+1 tonelada de capacidade</p>
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

            {/* 5. Melhor custo-benefício */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Melhor custo-benefício</p>
            </div>

            {/* 6. Economia de combustível */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Economia de combustível</p>
            </div>

            {/* 7. Baixo custo de manutenção */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Baixo custo de manutenção</p>
            </div>

            {/* 8. 3 anos de garantia */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={garantia3AnosIcon} alt="3 Anos de Garantia" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">3 anos de garantia de fábrica</p>
            </div>
          </div>

          {/* Placeholders de Imagens */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mt-12">
            <div className="aspect-video rounded-2xl border border-border overflow-hidden">
              <img src={foton1217} alt="Foton 1217 - Vista Externa" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-2xl border border-border overflow-hidden">
              <img src={foton1217} alt="Foton 1217 - Cabine" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTAQUES TÉCNICOS - 4 CARDS */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-full h-full text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Carrega mais que a concorrência</h3>
              <p className="text-muted-foreground">
                Até 1 tonelada a mais de capacidade de carga. Mais carga por viagem, mais lucro no final do mês.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
                <img src={cumminsLogo} alt="Cummins" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src={zfLogo} alt="ZF" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src={boschLogo} alt="Bosch" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                <img src={danaLogo} alt="Dana" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conjunto mecânico global</h3>
              <p className="text-muted-foreground">
                Motor Cummins, transmissão ZF, componentes Bosch e Dana. Confiabilidade testada no mundo inteiro.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={durabilityIcon} alt="Construído para durar" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Força e durabilidade</h3>
              <p className="text-muted-foreground">
                Chassi reforçado, suspensão robusta e componentes de primeira linha para aguentar o trabalho pesado.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={garantia3AnosIcon} alt="3 Anos de Garantia" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Garantia real</h3>
              <p className="text-muted-foreground">
                3 anos de garantia de fábrica + rede de assistência completa em todo o Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMAGENS DO PRODUTO - 3 PLACEHOLDERS */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={foton1217} alt="Foton 1217 - Vista Exterior" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-center text-muted-foreground">Vista lateral do Foton 1217</p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={foton1217} alt="Foton 1217 - Cabine" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-center text-muted-foreground">Cabine e painel de instrumentos</p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={foton1217} alt="Motor Cummins do Foton 1217" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-center text-muted-foreground">Motor Cummins ISF</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POR QUE ESCOLHER A FOTON */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light">
        <div className="container mx-auto px-4">
          {/* Título */}
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que escolher a <span className="text-primary-light">Foton Lavoro</span>
          </h2>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Tecnologia global, montagem nacional e o melhor custo-benefício do mercado brasileiro.
          </p>

          {/* Grid de Cards */}
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
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Tecnologia Europa-China</h3>
              <p className="text-sm text-gray-600 text-center">Engenharia global com preço competitivo para o Brasil.</p>
            </div>

            {/* 6. Rede de concessionárias */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={concessionariasIcon} alt="70+ Concessionárias" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">70+ concessionárias</h3>
              <p className="text-sm text-gray-600 text-center">Rede nacional em expansão para atender você onde estiver.</p>
            </div>

            {/* 7. Centro logístico */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={centroLogisticoIcon} alt="Centro Logístico" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Centro logístico nacional</h3>
              <p className="text-sm text-gray-600 text-center">Distribuição rápida de peças para todo o Brasil.</p>
            </div>

            {/* 8. Fill rate alto */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={fillRateIcon} alt="Fill Rate Alto" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Fill rate alto</h3>
              <p className="text-sm text-gray-600 text-center">Alta disponibilidade de peças — seu caminhão rodando sempre.</p>
            </div>

            {/* 9. Aprovação de clientes */}
            <div className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:bg-gray-50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-6 flex items-center justify-center mx-auto">
                <img src={aprovacaoClientesIcon} alt="Aprovação de Clientes" className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-center text-industrial-dark">Aprovação de clientes</h3>
              <p className="text-sm text-gray-600 text-center">Satisfação comprovada de quem já escolheu a Foton.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. APLICAÇÕES IDEAIS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-foreground">
              Para quem o <span className="text-primary">Foton 1217</span> é ideal?
            </h2>
            <p className="text-lg md:text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              O três-quartos que resolve para quem precisa de mais capacidade, confiabilidade e economia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Distribuição urbana e regional</h3>
                    <p className="text-muted-foreground">Carga seca, refrigerada ou baú fechado</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">E-commerce e marketplaces</h3>
                    <p className="text-muted-foreground">Entregas volumosas e operação intensa</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Atacarejo, varejo e supermercados</h3>
                    <p className="text-muted-foreground">Transferência entre centros de distribuição</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Empresas de bebidas e alimentos</h3>
                    <p className="text-muted-foreground">Volume alto, peso controlado</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Mudanças e transportadoras</h3>
                    <p className="text-muted-foreground">Espaço generoso e boa capacidade de carga</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Transportadores autônomos</h3>
                    <p className="text-muted-foreground">Baixo custo operacional, alta produtividade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMPARATIVO INTELIGENTE */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Onde outros três-quartos chegam no limite,<br />
              <span className="text-primary">o 1217 começa a trabalhar.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12">
              O Foton 1217 lidera o segmento 3/4 com o melhor conjunto mecânico e a maior capacidade de carga da categoria.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border-2 border-primary/20">
                <h3 className="font-bold text-xl mb-4 text-foreground">✓ Com o Foton 1217</h3>
                <ul className="text-left space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Carrega até 1 tonelada a mais
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Motor Cummins + Câmbio ZF
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Menor custo operacional
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Menos viagens, mais lucro
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
                <h3 className="font-bold text-xl mb-4 text-muted-foreground">Concorrentes tradicionais</h3>
                <ul className="text-left space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Menor capacidade de carga
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Conjunto mecânico convencional
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Custo operacional superior
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    Mais viagens para mesma demanda
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section id="cta-final" className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para conhecer o melhor três-quartos do mercado?
            </h2>
            <p className="text-lg md:text-xl mb-10 text-primary-foreground/90">
              Fale com um consultor Lavoro agora e descubra por que o Foton 1217 é a escolha certa para o seu negócio.
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
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto"
                asChild
              >
                <a href="/contato">Solicitar Proposta Completa</a>
              </Button>
            </div>

            <p className="text-sm mt-6 text-primary-foreground/80">
              Atendimento personalizado. Condições especiais. Entrega ágil.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Foton1217;
