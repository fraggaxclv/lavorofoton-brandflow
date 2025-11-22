import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, MessageSquare, Shield, Wrench, Award, Settings, Package, Truck, ShoppingCart, Store, TrendingUp, Phone } from "lucide-react";
import cnhBIcon from "@/assets/cnh-b-icon.png";
import aumarkS315Hero from "@/assets/aumark-s315-hero.png";
import aumarkS315Exterior from "@/assets/aumark-s315-exterior.png";
import aumarkS315Interior from "@/assets/aumark-s315-interior.png";
import aumarkS315Product1 from "@/assets/aumark-s315-product-1.png";
import aumarkS315Product2 from "@/assets/aumark-s315-product-2.png";
import aumarkS315EngineDetails from "@/assets/aumark-s315-engine-details.png";
import cnhBTruckIcon from "@/assets/cnh-b-truck-icon.png";
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
const S315 = () => {
  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o Foton Aumark S315.");
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };
  const handleQuoteClick = () => {
    document.getElementById('cta-final')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. HERO */}
      <section className="relative bg-industrial-dark text-white overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Foton Lavoro Aumark S315 – O caminhão CNH B mais completo do Brasil.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                Parece caminhão. Dirige com CNH B.
Força, robustez e economia no tamanho perfeito para seu trabalho.    <br />
                <span className="text-primary font-semibold">Força, robustez e economia no tamanho perfeito para a cidade.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-8 py-6 h-auto">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Falar no WhatsApp agora
                </Button>
                <Button onClick={handleQuoteClick} size="lg" variant="outline" className="border-white text-white text-lg px-8 py-6 h-auto bg-blue-900 hover:bg-blue-800">
                  Solicitar Proposta
                </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-video rounded-lg overflow-hidden">
                <img src={aumarkS315Hero} alt="Foton Lavoro Aumark S315" className="w-full h-full object-cover" />
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
            Principais motivos para escolher o <span className="text-primary">S315</span>
          </h2>
          
          {/* Grid de Benefícios */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {/* 1. Dirija com CNH B */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={cnhBIcon} alt="CNH Categoria B" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Dirija com CNH B</p>
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

            {/* 5. Rodado duplo */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={rodadoDuploIcon} alt="Rodado Duplo" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Rodado duplo</p>
            </div>

            {/* 6. Chassi reforçado */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={chassiReforcadoIcon} alt="Chassi Reforçado" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Chassi reforçado</p>
            </div>

            {/* 7. Tanque de alumínio */}
            <div className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 flex items-center justify-center">
                <img src={tanqueAluminioIcon} alt="Tanque de Alumínio" className="w-full h-full object-contain" />
              </div>
              <p className="font-semibold text-sm md:text-base text-foreground">Tanque de alumínio</p>
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
              <img src={aumarkS315Exterior} alt="Foton Aumark S315 - Vista Externa" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-video rounded-2xl border border-border overflow-hidden">
              <img src={aumarkS315Interior} alt="Foton Aumark S315 - Vista Interna da Cabine" className="w-full h-full object-cover" />
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
                <img src={cnhBTruckIcon} alt="CNH B Caminhão" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">CNH B que é caminhão</h3>
              <p className="text-muted-foreground">
                Mais presença, mais robustez e mais carga que vans e utilitários.
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
                Motor Cummins, transmissão ZF, componentes Bosch e Dana.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={durabilityIcon} alt="Construído para durar" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Construído para durar</h3>
              <p className="text-muted-foreground">
                Chassi reforçado, rodado duplo e tanque de alumínio.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <img src={garantia3AnosIcon} alt="3 Anos de Garantia" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Garantia real</h3>
              <p className="text-muted-foreground">
                3 anos de garantia de fábrica + revisões com preço justo.
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
                <img src={aumarkS315Product1} alt="Foton Aumark S315 - Vista Exterior" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-center text-muted-foreground">Foto ilustrativa do S315 (exterior)</p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={aumarkS315Product2} alt="Foton Aumark S315 - Painel e Comandos" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-center text-muted-foreground">Foto ilustrativa do S315 (interior)</p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={aumarkS315EngineDetails} alt="Motor Cummins do Foton Aumark S315" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm text-center text-muted-foreground">Motor Cummins ISF 2.8</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. POR QUE ESCOLHER A FOTON */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light">
        <div className="container mx-auto px-4">
          {/* Título */}
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
            Por que escolher a <span className="text-primary-light">Foton Lavoro  </span>
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
              <p className="text-sm text-gray-600 text-center">Peça na hora certa, operação sem paradas. - Sua empresa 24hs girando.               </p>
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

          {/* Frase Final de Impacto */}
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
              <h3 className="font-semibold">Entregas urbanas</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Serviços last-mile</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Store className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Pequenos e médios negócios</h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Truck className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Rotas longas e curtas   </h3>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold">Varejo, e-commerce e distribui
dora            </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMPARATIVO INTELIGENTE */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mais que vans e utilitários
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              O S315 entrega mais carga, mais robustez e mais durabilidade do que vans e utilitários do mesmo segmento — <span className="font-bold">mantendo a CNH B.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section id="cta-final" className="py-16 md:py-20 bg-gradient-to-br from-industrial-dark to-industrial-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Pronto para dirigir o S315?
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Atendimento rápido. Sem enrolação. Sem burocracia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-6 h-auto">
                <MessageSquare className="mr-2 h-5 w-5" />
                Falar com consultor pelo WhatsApp
              </Button>
              <Button onClick={handleWhatsApp} size="lg" variant="outline" className="border-white text-white text-lg px-10 py-6 h-auto bg-blue-900 hover:bg-blue-800">
                <Phone className="mr-2 h-5 w-5" />
                Solicitar proposta
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default S315;