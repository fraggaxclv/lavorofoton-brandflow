import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Shield, Heart, Gauge, Settings, Award, Users, TrendingUp, CheckCircle2, Phone, MessageSquare, Package, Building2, ShoppingCart, Store, UserCheck, Wrench, Eye, HandshakeIcon } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/foton-s315.jpg";
import cumminsLogo from "@/assets/cummins-logo.png";
import zfLogo from "@/assets/zf-logo.png";
const S315 = () => {
  const [businessType, setBusinessType] = useState("");
  const whatsappNumber = "5511999999999";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o AUMARK S315.");
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleWhatsApp();
  };
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. HERO - Acima da dobra */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-industrial-dark">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="AUMARK S315" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/60 to-transparent" />
        </div>
        
        <div className="container-lavoro relative z-10 text-center text-white py-20">
          <div className="max-w-5xl mx-auto space-y-8">            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 text-white">
              Aumark S315.<br />
              <span className="text-primary-light">O caminhão que cabe</span><br />
              na sua carteira B.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Entre no mundo dos caminhões sem mudar de categoria.<br />
              <span className="text-white font-semibold">Mais carga, mais respeito na rua, mais resultado no seu negócio.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button onClick={() => document.getElementById('contato')?.scrollIntoView({
              behavior: 'smooth'
            })} size="lg" className="btn-primary-large text-xl px-12 py-6 h-auto">
                Quero consultar o preço
              </Button>
              
              <Button onClick={handleWhatsApp} size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-industrial-dark text-xl px-12 py-6 h-auto transition-all duration-300">
                <MessageSquare className="mr-2 h-6 w-6" />
                Falar no WhatsApp agora
              </Button>
            </div>

            <p className="text-sm text-gray-400 pt-4">
              Atendimento rápido, direto com um consultor Lavoro Foton.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. POR QUE O S315 É O QUERIDINHO DA CARTEIRA B */}
      <section className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Por que todo mundo fala do <span className="text-gradient">Aumark S315?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12 text-center">
              Porque ele resolve um problema real: você quer crescer, carregar mais, profissionalizar o transporte da sua empresa – sem precisar tirar CNH C.
            </p>

            <p className="text-lg text-foreground leading-relaxed mb-12">
              O Aumark S315 é um VUC de verdade, pensado para as cidades e estradas: entra em vias restritas, é ágil, econômico e entrega a robustez de um caminhão com a praticidade de quem vem de utilitários menores.      
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Dirigido com CNH B</h3>
                  <p className="text-muted-foreground">Sem burocracia, sem cursos extras. Sua habilitação atual já resolve.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Veículo VUC</h3>
                  <p className="text-muted-foreground">Ideal para áreas de restrição. Passa onde outros não passam.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Plataforma perfeita</h3>
                  <p className="text-muted-foreground">Para última milha e entregas urbanas ou longas viagens.         </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Mais carga</h3>
                  <p className="text-muted-foreground">Mais que um utilitário leve. Capacidade de caminhão.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:col-span-2">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Posição de dirigir de caminhão</h3>
                  <p className="text-muted-foreground">Com conforto e visibilidade que fazem diferença no dia a dia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRINCIPAIS DIFERENCIAIS TÉCNICOS */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tecnologia de gente grande,<br />
              <span className="text-gradient">para quem está dando o próximo passo.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8">
              <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-6 p-4">
                <img src={cumminsLogo} alt="Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Motor confiável - CUMMINS    </h3>
              <p className="text-muted-foreground">
                Potência e torque sob medida para a cidade, com respostas rápidas e consumo inteligente.
              </p>
            </div>

            <div className="card-premium p-8">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 p-3">
                <img src={zfLogo} alt="ZF" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-3">Câmbio preciso - ZF    </h3>
              <p className="text-muted-foreground">
                Trocas suaves, menos fadiga no trânsito urbano e mais controle em subidas e manobras.
              </p>
            </div>

            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Projeto robusto</h3>
              <p className="text-muted-foreground">
                Chassi dimensionado para aguentar a rotina pesada de entregas, todos os dias.
              </p>
            </div>

            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conforto na cabine</h3>
              <p className="text-muted-foreground">
                Banco confortável, boa ergonomia, painel intuitivo e excelente visibilidade.
              </p>
            </div>

            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Segurança</h3>
              <p className="text-muted-foreground">
                Freios eficientes, construção robusta e mais presença na rua que um utilitário leve.
              </p>
            </div>

            <div className="card-premium p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Custo-benefício</h3>
              <p className="text-muted-foreground">
                Excelente relação entre preço, capacidade de carga e custo operacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FICHA TÉCNICA RESUMIDA */}
      <section className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ficha técnica <span className="text-gradient">resumida</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-premium p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Truck className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Categoria</h3>
                </div>
                <p className="text-lg mb-2 font-semibold text-primary">Caminhão leve VUC – CNH B</p>
                <p className="text-muted-foreground">
                  Perfeito para quem precisa de caminhão de verdade sem complicar a habilitação.
                </p>
              </div>

              <div className="card-premium p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Package className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Aplicações típicas</h3>
                </div>
                <p className="text-lg mb-2 font-semibold">Baú, carga seca, refrigerado</p>
                <p className="text-muted-foreground">
                  Versatilidade para diferentes tipos de operação e negócio.
                </p>
              </div>

              <div className="card-premium p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Uso ideal</h3>
                </div>
                <p className="text-lg mb-2 font-semibold">Entregas urbanas, e-commerce, distribuição, serviços</p>
                <p className="text-muted-foreground">
                  Feito para o dia a dia da cidade e das operações que crescem.
                </p>
              </div>

              <div className="card-premium p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Gauge className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Capacidade de carga</h3>
                </div>
                <p className="text-lg mb-2 font-semibold">Mais que utilitário, menos que caminhão médio</p>
                <p className="text-muted-foreground">
                  O equilíbrio perfeito para quem está evoluindo.
                </p>
              </div>

              <div className="card-premium p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Eye className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Cabine</h3>
                </div>
                <p className="text-lg mb-2 font-semibold">Simples, confortável, visibilidade excelente</p>
                <p className="text-muted-foreground">
                  Projetada para longas jornadas sem cansaço.
                </p>
              </div>

              <div className="card-premium p-8">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <Wrench className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Versões</h3>
                </div>
                <p className="text-lg mb-2 font-semibold">Chassi para diferentes implementos</p>
                <p className="text-muted-foreground">
                  Adapte ao seu tipo de carga e operação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARATIVO INTELIGENTE */}
      <section className="section-padding bg-primary text-white">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Upgrade natural de quem<br />
              <span className="text-white/90">cansou de utilitário leve.</span>
            </h2>
            
            <p className="text-xl mb-12 leading-relaxed text-white/90">
              Se você está no limite da Fiorino, da Strada, da HR ou da Bongo, o Aumark S315 é o passo lógico: 
              mais caminhão, mais respeito na rua e mais carga – sem complicar sua habilitação.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">De utilitário leve → caminhão de verdade</h3>
                </div>
                <p className="text-white/80">Presença, robustez e capacidade que fazem diferença.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">De "exausto todo dia" → posição confortável</h3>
                </div>
                <p className="text-white/80">Ergonomia de caminhão, não de carro de passeio adaptado.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">De "tô no limite de carga" → respiro para crescer</h3>
                </div>
                <p className="text-white/80">Mais volume, mais peso, mais entregas por viagem.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg">De visual de carro → presença de caminhão</h3>
                </div>
                <p className="text-white/80">Profissionalismo e credibilidade na frente do cliente.</p>
              </div>
            </div>

            <div className="mt-12">
              <Button onClick={handleWhatsApp} size="lg" className="bg-white text-primary hover:bg-gray-100 px-10 py-6 h-auto text-lg">
                Quero fazer esse upgrade
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARA QUEM É O AUMARK S315 */}
      <section className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Feito sob medida para <span className="text-gradient">quem está crescendo.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pequenos empresários</h3>
              <p className="text-muted-foreground">
                Donos de comércios, lojas, distribuidoras que querem profissionalizar o transporte.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">E-commerce e marketplace</h3>
              <p className="text-muted-foreground">
                Quem precisa de entrega diária, organizada e com mais volume.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Distribuição urbana</h3>
              <p className="text-muted-foreground">
                Bebidas, alimentos, embalagens, atacarejo, farmácias e mais.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Terceirizados de logística</h3>
              <p className="text-muted-foreground">
                Quem presta serviço para grandes redes e precisa de um veículo confiável.
              </p>
            </div>

            <div className="card-premium p-8 hover:scale-105 transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Autônomos que querem subir de nível</h3>
              <p className="text-muted-foreground">
                Gente que cansou de depender de frete de terceiros e quer ter seu próprio caminhão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROVA SOCIAL / CONFIANÇA */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Você não está experimentando.<br />
              <span className="text-gradient">Você está escolhendo uma tendência.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Cada mês mais motoristas e empresas de Minas migram para o Aumark S315 como solução de frota leve.
              O motivo é simples: <span className="text-foreground font-semibold">faz mais sentido na planilha e na rua.</span>
            </p>

            <div className="card-premium p-8 md:p-12 text-left">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <blockquote className="text-lg md:text-xl italic text-muted-foreground mb-4">
                    "Vendi meu carro e fui para o S315. Hoje faço mais viagens com mais carga e chego menos cansado."
                  </blockquote>
                  <p className="font-semibold text-foreground">— Cliente Lavoro Foton</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SEÇÃO LAVORO FOTON (CONFIANÇA) */}
      <section className="section-padding bg-industrial-dark text-white">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              Por que comprar seu S315<br />
              <span className="text-primary-light">com a Lavoro Foton?</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Concessionária focada em caminhões Foton</h3>
                    <p className="text-white/70">Especialistas que vivem e respiram a marca todos os dias.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Time especializado</h3>
                    <p className="text-white/70">Entendemos seu negócio antes de empurrar qualquer modelo.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Apoio na negociação</h3>
                    <p className="text-white/70">Financiamento e condições especiais pensadas para você.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Pós-venda estruturado</h3>
                    <p className="text-white/70">Relacionamento próximo para fazer o S315 trabalhar por você.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <p className="text-xl md:text-2xl leading-relaxed">
                Aqui não é só venda de caminhão.<br />
                <span className="text-primary-light font-semibold">É parceria para fazer o Aumark S315 trabalhar por você todos os dias.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SEÇÃO FINAL – CTA PESADO */}
      <section id="contato" className="section-padding bg-white">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pronto para dar o próximo passo<br />
                <span className="text-gradient">com a sua CNH B?</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Preencha o formulário ou chame a Lavoro Foton no WhatsApp.<br />
                Um consultor vai entender seu cenário e montar a melhor condição possível para você sair de Aumark S315.
              </p>
            </div>

            <div className="card-premium p-8 md:p-12">
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Nome *
                    </label>
                    <Input id="name" type="text" placeholder="Seu nome completo" required className="h-12" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                      Telefone (WhatsApp) *
                    </label>
                    <Input id="phone" type="tel" placeholder="(11) 99999-9999" required className="h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold mb-2">
                      Cidade / Estado *
                    </label>
                    <Input id="city" type="text" placeholder="Belo Horizonte - MG" required className="h-12" />
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-sm font-semibold mb-2">
                      Tipo de negócio *
                    </label>
                    <Select value={businessType} onValueChange={setBusinessType} required>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comercio">Comércio/Loja</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="distribuicao">Distribuição</SelectItem>
                        <SelectItem value="logistica">Logística/Transportadora</SelectItem>
                        <SelectItem value="autonomo">Autônomo</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Qual é a sua necessidade hoje?
                  </label>
                  <Textarea id="message" placeholder="Conte um pouco sobre sua operação e o que você está buscando..." rows={4} className="resize-none" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1 h-14 text-lg">
                    Quero uma proposta do S315
                  </Button>

                  <Button type="button" size="lg" variant="outline" className="flex-1 h-14 text-lg" onClick={handleWhatsApp}>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Falar com um consultor no WhatsApp
                  </Button>
                </div>

                <p className="text-sm text-center text-muted-foreground italic">
                  Sem spam, sem empurroterapia. Só caminhão e conversa séria.
                </p>
              </form>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Quer conhecer outros modelos Foton?</p>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/modelos'}>
                Ver toda a linha de caminhões
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default S315;