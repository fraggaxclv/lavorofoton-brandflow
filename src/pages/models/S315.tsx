import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Truck, 
  Zap, 
  Shield, 
  DollarSign, 
  Gauge, 
  Settings, 
  Award,
  Users,
  TrendingUp,
  CheckCircle2,
  Phone,
  MessageSquare,
  Package,
  Building2,
  ShoppingCart,
  Store
} from "lucide-react";
import heroImage from "@/assets/foton-s315.jpg";

const S315 = () => {
  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o AUMARK S315.");

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsApp();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - Above the fold */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-industrial-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AUMARK S315" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/60 to-transparent" />
        </div>
        
        <div className="container-lavoro relative z-10 text-center text-white">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary rounded-full mb-4">
              <span className="text-primary-light font-semibold text-sm tracking-wider">CNH B • VUC • QUERIDINHO DOS MOTORISTAS</span>
            </div>
            
            <h1 className="hero-text text-white leading-[0.9] mb-6">
              AUMARK S315
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              O caminhão que revoluciona sua operação.<br />
              <span className="text-white font-semibold">CNH B. Sem balança. Puro resultado.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                className="btn-primary-large text-xl px-12 py-6 h-auto"
              >
                <MessageSquare className="mr-2 h-6 w-6" />
                Falar no WhatsApp agora
              </Button>
              
              <Button 
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-industrial-dark text-xl px-12 py-6 h-auto transition-all duration-300"
              >
                Consultar preço
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Why S315 is the Favorite */}
      <section className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que o S315 é o <span className="text-gradient">queridinho da CNH B</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O caminhão que mais vende na categoria. E não é por acaso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">CNH B</h3>
              <p className="text-muted-foreground">
                Dirija com sua habilitação atual. Sem burocracia, sem cursos extras.
              </p>
            </div>

            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                <Gauge className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Não pesa na balança</h3>
              <p className="text-muted-foreground">
                VUC = Veículo Urbano de Carga. Passe direto. Mais agilidade, menos estresse.
              </p>
            </div>

            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Economia real</h3>
              <p className="text-muted-foreground">
                Consumo eficiente, manutenção previsível. Seu bolso agradece todo mês.
              </p>
            </div>

            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Robustez urbana</h3>
              <p className="text-muted-foreground">
                Motor Cummins, chassis reforçado. Feito para trabalhar pesado todo dia.
              </p>
            </div>

            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fácil de manobrar</h3>
              <p className="text-muted-foreground">
                Compacto na cidade, potente na estrada. A combinação perfeita.
              </p>
            </div>

            <div className="card-premium p-8 text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Ideal para crescer</h3>
              <p className="text-muted-foreground">
                Empreendedores, entregas, última milha. O caminhão que escala seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Differentiators */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Diferenciais <span className="text-gradient">que fazem a diferença</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Motor Cummins</h3>
                  <p className="text-sm text-muted-foreground">Líder mundial. Confiabilidade comprovada.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Baixo custo</h3>
                  <p className="text-sm text-muted-foreground">Manutenção previsível e acessível.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Tecnologia Bosch</h3>
                  <p className="text-sm text-muted-foreground">Injeção eletrônica de ponta.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Câmbio ZF</h3>
                  <p className="text-sm text-muted-foreground">Suavidade e durabilidade europeia.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Consumo eficiente</h3>
                  <p className="text-sm text-muted-foreground">Mais km rodados, menos combustível.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Conforto interno</h3>
                  <p className="text-sm text-muted-foreground">Cabine ergonômica para longas jornadas.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Garantia Foton</h3>
                  <p className="text-sm text-muted-foreground">Tranquilidade para você trabalhar.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Rede autorizada</h3>
                  <p className="text-sm text-muted-foreground">Assistência em todo Brasil.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ficha técnica <span className="text-gradient">resumida</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="card-premium p-8">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b">Motorização</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Motor</span>
                    <span className="font-semibold">Cummins ISF 3.8</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Potência</span>
                    <span className="font-semibold">150 cv</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Torque</span>
                    <span className="font-semibold">500 Nm</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Combustível</span>
                    <span className="font-semibold">Diesel S10</span>
                  </div>
                </div>
              </div>

              <div className="card-premium p-8">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b">Capacidades</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">PBT</span>
                    <span className="font-semibold">3.500 kg</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Capacidade de carga</span>
                    <span className="font-semibold">1.415 kg</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">CNH necessária</span>
                    <span className="font-semibold text-primary">B (comum)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Categoria</span>
                    <span className="font-semibold text-primary">VUC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-premium p-8">
              <h3 className="text-xl font-bold mb-6 pb-4 border-b">Dimensões</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">5,99m</div>
                  <div className="text-sm text-muted-foreground">Comprimento</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2,00m</div>
                  <div className="text-sm text-muted-foreground">Largura</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2,49m</div>
                  <div className="text-sm text-muted-foreground">Altura</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">3,36m</div>
                  <div className="text-sm text-muted-foreground">Entre-eixos</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-center text-muted-foreground">
                <span className="font-semibold text-foreground">Versões disponíveis:</span> Baú, Carga Seca, Refrigerado, Plataforma, Sider
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Comparison */}
      <section className="section-padding bg-industrial-dark text-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Por que escolher o <span className="text-primary-light">S315</span>
            </h2>
            <p className="text-xl text-gray-300">Comparação inteligente com a concorrência</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-gray-400 font-semibold mb-4">Concorrentes</div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-full">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Carga limitada</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Motor básico</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Manutenção cara</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Cabine apertada</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Revenda difícil</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:-mt-4">
                <div className="inline-block px-4 py-2 bg-primary rounded-full text-white font-bold mb-4">
                  AUMARK S315
                </div>
                <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-8 h-full shadow-[var(--shadow-premium)]">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold">1.415 kg de carga útil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold">Motor Cummins robusto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold">Custo previsível</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold">Conforto superior</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold">Ótima valorização</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-gray-400 font-semibold mb-4">Concorrentes</div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 h-full">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Menos tecnologia</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Sem câmbio ZF</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Rede menor</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Garantia limitada</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      <span>Preço inflacionado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-gray-300 mb-6">
                O S315 entrega mais. Em todos os sentidos.
              </p>
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                className="bg-white text-industrial-dark hover:bg-gray-100 px-8 py-6 h-auto text-lg"
              >
                Quero o melhor custo-benefício
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Para quem é o <span className="text-gradient">S315</span>
            </h2>
            <p className="text-xl text-muted-foreground">O caminhão certo para o momento certo do seu negócio</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pequenos empresários</h3>
              <p className="text-muted-foreground">
                Começando ou expandindo. O S315 cresce com você, sem precisar de CNH C.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">E-commerce</h3>
              <p className="text-muted-foreground">
                Entregas rápidas e volumosas. Capacidade para atender demanda crescente.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Distribuição urbana</h3>
              <p className="text-muted-foreground">
                Agilidade na cidade, sem parar em balança. Mais entregas por dia.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Evoluindo da van</h3>
              <p className="text-muted-foreground">
                Saindo da Fiorino, Saveiro, Sprinter. O próximo passo natural do seu crescimento.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Última milha</h3>
              <p className="text-muted-foreground">
                Logística final eficiente. Tamanho ideal para centros urbanos.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Padronização de frota</h3>
              <p className="text-muted-foreground">
                Empresas que buscam economia com performance. Um motorista, CNH B.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers/Testimonials */}
      <section className="section-padding bg-primary text-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Números que <span className="text-white/90">provam resultados</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-3">96%</div>
              <div className="text-xl text-white/80">Satisfação</div>
              <div className="text-sm text-white/60 mt-2">dos proprietários</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-3">30%</div>
              <div className="text-xl text-white/80">Economia</div>
              <div className="text-sm text-white/60 mt-2">vs concorrentes</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-3">+250%</div>
              <div className="text-xl text-white/80">Crescimento</div>
              <div className="text-sm text-white/60 mt-2">de vendas em 2024</div>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-3">8/10</div>
              <div className="text-xl text-white/80">Recomendam</div>
              <div className="text-sm text-white/60 mt-2">para outros motoristas</div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl font-light italic mb-6 leading-relaxed">
                "Migrei da CNH C para o S315 com CNH B. Economizo no motorista, não paro em balança, 
                e faço mais entregas por dia. Foi a melhor decisão para minha empresa."
              </p>
              <footer className="text-white/80">
                <strong>— Roberto Silva</strong>, Transportadora Silva & Cia
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contato" className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Fale com a <span className="text-gradient">Lavoro Foton</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Consulte disponibilidade, preços e condições especiais
              </p>
            </div>

            <div className="card-premium p-8 md:p-12">
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Nome completo
                    </label>
                    <Input 
                      id="name"
                      type="text" 
                      placeholder="Seu nome" 
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Telefone / WhatsApp
                    </label>
                    <Input 
                      id="phone"
                      type="tel" 
                      placeholder="(11) 99999-9999" 
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      E-mail
                    </label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="seu@email.com" 
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2">
                      Cidade
                    </label>
                    <Input 
                      id="city"
                      type="text" 
                      placeholder="Sua cidade" 
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Qual sua necessidade?
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Conte mais sobre sua operação e o que você precisa..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    type="submit"
                    size="lg"
                    className="flex-1 h-14 text-lg"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Falar agora no WhatsApp
                  </Button>

                  <Button 
                    type="button"
                    size="lg"
                    variant="outline"
                    className="flex-1 h-14 text-lg"
                    onClick={() => handleWhatsApp()}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Consultar disponibilidade
                  </Button>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  Resposta em até 2 horas durante horário comercial
                </p>
              </form>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Quer conhecer outros modelos?</p>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/modelos'}
              >
                Ver todos os modelos Foton
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default S315;
