import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, FileText, TestTube2, Battery, Zap, TrendingDown, Shield, Package } from "lucide-react";
import ewonderImg from "@/assets/ewonder.jpg";
import ewonderCharging from "@/assets/ewonder-charging.jpg";
import ewonderInteriorSeats from "@/assets/ewonder-interior-seats.jpg";
import ewonderInteriorFront from "@/assets/ewonder-interior-front.jpg";
import ewonderControls from "@/assets/ewonder-controls.jpg";
import ewonderCargo from "@/assets/ewonder-cargo.png";
const EWonder = () => {
  return <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ewonderImg} alt="Foton eWonder" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 container-lavoro text-white">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Zap className="w-5 h-5" />
            <span className="font-bold">100% ELÉTRICO</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in max-w-4xl" style={{
          animationDelay: "0.1s"
        }}>
            eWonder
          </h1>
          <p className="text-2xl md:text-4xl mb-4 max-w-3xl animate-fade-in font-bold" style={{
          animationDelay: "0.2s"
        }}>
            O VUC elétrico que entrega economia real desde o primeiro dia.
          </p>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>
            180 km de autonomia · 1.325 kg de carga · 80% menos custo/km
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <Button asChild size="lg" className="text-lg px-8">
              <a href="/contato">
                <FileText className="mr-2 h-5 w-5" />
                Solicitar Proposta
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
              <a href="https://wa.me/5531211647335" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5" />
                Falar com Especialista
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Por Que eWonder */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Por que o eWonder?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <TrendingDown className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Economia de 80%</h3>
              <p className="text-lg mb-2 font-semibold">R$ 1.500 a R$ 2.800 por mês</p>
              <p className="text-sm text-muted-foreground">Manutenção quase zero</p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Torque instantâneo</h3>
              <p className="text-lg mb-2 font-semibold">220 N.m de potência</p>
              <p className="text-sm text-muted-foreground">Viadutos e rampas sem esforço</p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Battery className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">180 km reais</h3>
              <p className="text-lg mb-2 font-semibold">Perfeito para 60-140 km/dia</p>
              <p className="text-sm text-muted-foreground">Last-mile ideal</p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Package className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Baú de 7 m³</h3>
              <p className="text-lg mb-2 font-semibold">2740 × 1540 × 1602 mm</p>
              <p className="text-sm text-muted-foreground">Volume otimizado</p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Segurança total</h3>
              <p className="text-lg mb-2 font-semibold">ABS + ESC + HSA + BAS</p>
              <p className="text-sm text-muted-foreground">Farol automático + sensor de ré</p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Battery className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Bateria CATL LFP</h3>
              <p className="text-lg mb-2 font-semibold">Tecnologia Tesla</p>
              <p className="text-sm text-muted-foreground">Zero risco térmico</p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Conheça o eWonder</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img src={ewonderCharging} alt="Carregamento rápido - 280km em 1 hora" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img src={ewonderCargo} alt="Baú de 7m³" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img src={ewonderInteriorFront} alt="Interior confortável" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img src={ewonderInteriorSeats} alt="Bancos ergonômicos" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Especificações */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Especificações</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Motor</span>
                <span className="text-muted-foreground">Síncrono Ímã Permanente</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Potência</span>
                <span className="text-muted-foreground">35 kW / 75 kW pico</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Torque</span>
                <span className="text-muted-foreground">105-220 N.m</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Bateria</span>
                <span className="text-muted-foreground font-bold">41,86 kWh CATL LFP</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Autonomia</span>
                <span className="text-primary font-bold">180 km</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">PBT</span>
                <span className="text-muted-foreground">2.550 kg</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Capacidade de Carga</span>
                <span className="text-primary font-bold">1.325 kg</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Entre Eixos</span>
                <span className="text-muted-foreground">3.080 mm</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Conector</span>
                <span className="text-muted-foreground">CCS2 (AC/DC)</span>
              </div>
              <div className="flex justify-between py-4 border-b border-border">
                <span className="font-semibold text-lg">Voltagem</span>
                <span className="text-muted-foreground">335 V</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diesel vs Elétrico */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Diesel vs Elétrico</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-premium p-8">
              <h3 className="text-2xl font-bold mb-6 text-muted-foreground">Diesel</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-xl">•</span>
                  <span>8-10 km/L urbano</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-xl">•</span>
                  <span>R$ 2.200 - R$ 3.500/mês</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-xl">•</span>
                  <span>Manutenção frequente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-xl">•</span>
                  <span>Óleo, filtros, correias</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8 bg-primary/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-primary">eWonder</h3>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span><strong>80% menos custo/km</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span><strong>R$ 1.500-2.800/mês de economia</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span>Manutenção mínima</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">✓</span>
                  <span>Sem óleo, filtros, correias</span>
                </li>
              </ul>
              <p className="mt-6 text-sm font-bold text-primary bg-primary/10 p-4 rounded-lg">
                💡 Um eWonder se paga em economia mensal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem é Ideal */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Ideal para</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {["Last-mile delivery", "E-commerce", "Food service", "Pharma", "Supermercados", "Hortifruti", "Franquias", "Logística urbana", "Empresas ESG"].map(item => <div key={item} className="card-premium p-6 text-center hover:border-primary hover:shadow-lg transition-all">
                <p className="font-semibold text-lg">{item}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Por que Lavoro Foton */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Por que comprar com a Lavoro Foton?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Atendimento especializado</h3>
              <p className="text-muted-foreground">Time técnico treinado pela Foton</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pós-venda completo</h3>
              <p className="text-muted-foreground">Estrutura e agilidade no atendimento</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">40 anos de tradição</h3>
              <p className="text-muted-foreground">Credibilidade de família</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-white">Seu próximo passo para economia e eficiência</h2>
            <p className="text-xl mb-10 text-white/90">
              Descubra como reduzir custos em até 80% na sua operação
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <a href="https://wa.me/5531211647335" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  Falar com Especialista
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <a href="/contato">
                  <TestTube2 className="mr-2 h-5 w-5" />
                  Agendar Teste
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <a href="/contato">
                  <FileText className="mr-2 h-5 w-5" />
                  Solicitar Proposta
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
    </div>;
};
export default EWonder;