import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, FileText, TestTube2, Battery, Zap, TrendingDown, Shield, Package, Users, Truck, Leaf } from "lucide-react";
import etoanoImg from "@/assets/etoano.jpg";

const EToano = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={etoanoImg}
            alt="Foton e-Toano Pro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 container-lavoro text-white">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Zap className="w-5 h-5" />
            <span className="font-bold text-sm">⚡ 100% ELÉTRICO | TECNOLOGIA DE BATERIA ESTILO TESLA (CATL LFP)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in max-w-4xl" style={{ animationDelay: "0.1s" }}>
            e-Toano Pro
          </h1>
          <p className="text-2xl md:text-4xl mb-4 max-w-3xl animate-fade-in font-bold" style={{ animationDelay: "0.2s" }}>
            A van elétrica mais completa do Brasil
          </p>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl text-gray-200 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            230 km reais · até 12,2 m³ de volume · custo por km até 80% menor
          </p>
          <p className="text-lg mb-8 max-w-2xl text-gray-300 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            130 kW de potência · 330 N.m de torque · 77 kWh CATL LFP · 8 anos/400.000 km de garantia
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
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

      {/* Por Que e-Toano Pro */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Por que o e-Toano Pro?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <TrendingDown className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Economia de até 80%</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Reduz o custo por km drasticamente</li>
                <li>• Zero gastos com óleo, filtros, correias e injeção</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Potência real para trabalho</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 130 kW (~174 cv)</li>
                <li>• 330 N.m garantem força mesmo carregada</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Battery className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Autonomia real de 230 km</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Rota cheia sem ansiedade</li>
                <li>• Ideal para logística urbana e middle-mile</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Package className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Até 12,2 m³ de volume</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 5990 × 2000 × 2760 mm — 12,2 m³</li>
                <li>• 5990 × 2000 × 2445 mm — 10,4 m³</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                Perfeito para cargas volumétricas: e-commerce, pharma, atacado, food service, hortifruti.
              </p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Segurança premium</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• ABS + EBD</li>
                <li>• AEBS</li>
                <li>• LDW</li>
                <li>• TPMS</li>
                <li>• Farol automático</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Battery className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Bateria CATL LFP</h3>
              <p className="text-sm text-muted-foreground mb-3">(mesma química da Tesla)</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Tecnologia usada na Tesla Shanghai</li>
                <li>• Zero risco térmico</li>
                <li>• Vida útil estendida</li>
                <li>• Garantia de 8 anos / 400.000 km</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Especificações Técnicas */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Especificações</h2>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Motor</span>
              <span className="text-muted-foreground">Síncrono de Ímã Permanente</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Capacidade Técnica Total</span>
              <span className="text-muted-foreground">4.750 kg</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Potência</span>
              <span className="text-muted-foreground">130 kW</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Carga útil</span>
              <span className="text-muted-foreground">1.670 kg</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Torque</span>
              <span className="text-muted-foreground">330 N.m</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Conector</span>
              <span className="text-muted-foreground">CCS2 (AC/DC)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Entre-eixos</span>
              <span className="text-muted-foreground">3.750 mm</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Voltagem</span>
              <span className="text-muted-foreground">540V</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Bateria</span>
              <span className="text-muted-foreground font-bold">77 kWh (CATL LFP)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Volume de carga</span>
              <span className="text-muted-foreground">12,2 m³ / 10,4 m³</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Autonomia</span>
              <span className="text-muted-foreground font-bold">230 km</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tempos de Recarga */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Tempos de Recarga</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="card-premium overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Carregador</th>
                    <th className="text-right p-4 font-semibold">Tempo 0–100%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">AC – 7 kW</td>
                    <td className="text-right p-4 text-muted-foreground">11h</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">AC – 11 kW</td>
                    <td className="text-right p-4 text-muted-foreground">7h</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">DC – 30 kW</td>
                    <td className="text-right p-4 text-muted-foreground">2,6h</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">DC – 60 kW</td>
                    <td className="text-right p-4 text-muted-foreground">1,3h</td>
                  </tr>
                  <tr className="hover:bg-accent/5">
                    <td className="p-4">DC – 90 kW</td>
                    <td className="text-right p-4 text-muted-foreground font-bold">1h</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-center">
                <Battery className="inline-block mr-2 h-5 w-5" />
                <span className="font-semibold">Carregamento ultrarrápido</span>, tecnologia de bateria semelhante à Tesla (CATL LFP).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diesel vs Elétrico */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Diesel vs Elétrico</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            <div className="card-premium p-8 border-2 border-destructive/20">
              <h3 className="text-2xl font-bold mb-6 text-destructive">Diesel</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• 6–10 km/L</li>
                <li>• R$ 2.800 a R$ 5.000/mês</li>
                <li>• Manutenção pesada</li>
                <li>• Ruído e poluição</li>
                <li>• Restrições urbanas</li>
              </ul>
            </div>

            <div className="card-premium p-8 border-2 border-primary">
              <h3 className="text-2xl font-bold mb-6 text-primary">e-Toano Pro</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• 80% menos custo por km</li>
                <li>• Economia mensal gigantesca</li>
                <li>• Zero óleo, filtros, correias</li>
                <li>• Zero ruído</li>
                <li>• Acesso liberado em zonas restritas</li>
                <li>• Bateria CATL LFP estilo Tesla</li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-6 bg-primary text-primary-foreground rounded-lg text-center">
            <p className="text-xl font-bold">
              💡 Em muitas operações, um e-Toano Pro se paga apenas com a economia mensal de combustível + manutenção.
            </p>
          </div>
        </div>
      </section>

      {/* Ideal Para */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Ideal para</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Logística urbana",
              "Middle-mile",
              "Transferências regionais",
              "Pharma",
              "E-commerce",
              "Food service",
              "Hortifruti",
              "Franquias",
              "Empresas ESG"
            ].map((segment, index) => (
              <div
                key={index}
                className="card-premium p-6 text-center hover:border-primary transition-all cursor-default"
              >
                <p className="font-semibold">{segment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Lavoro Foton */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Por que comprar com a Lavoro Foton?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-premium p-8 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Atendimento especializado</h3>
              <p className="text-muted-foreground">
                Time técnico treinado pela Foton China.
              </p>
            </div>

            <div className="card-premium p-8 text-center">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Pós-venda premium</h3>
              <p className="text-muted-foreground">
                Agilidade, estoque, profissionais experientes.
              </p>
            </div>

            <div className="card-premium p-8 text-center">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Tradição de 40 anos</h3>
              <p className="text-muted-foreground">
                A credibilidade da família Fraga e do legado Castelo Fraga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-6">O próximo passo da sua frota começa aqui.</h2>
            <p className="text-xl mb-8 opacity-90">
              Conheça o e-Toano Pro e descubra como reduzir custos e aumentar eficiência com zero emissões.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <a href="https://wa.me/5531211647335" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-5 w-5" />
                  Falar com Especialista
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
                <a href="/contato">
                  <TestTube2 className="mr-2 h-5 w-5" />
                  Agendar Teste
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
                <a href="/contato">
                  <FileText className="mr-2 h-5 w-5" />
                  Solicitar Proposta
                </a>
              </Button>
            </div>

            <div className="card-premium p-8 bg-background/10 backdrop-blur-sm border-white/20">
              <p className="text-lg italic mb-3">
                "A Lavoro Foton é referência em Minas Gerais. Nosso compromisso é entregar eficiência, tecnologia e o melhor suporte para sua operação."
              </p>
              <p className="font-semibold">— Lavoro Foton</p>
              <p className="text-sm opacity-75">40 anos de tradição</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EToano;
