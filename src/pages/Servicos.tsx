import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  CreditCard, 
  Handshake, 
  Settings, 
  Package, 
  Building2, 
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare
} from "lucide-react";

const Servicos = () => {
  const servicos = [
    {
      icon: Wrench,
      emoji: "🔧",
      title: "CONSULTORIA QUE FUNCIONA",
      subtitle: "Escolha certa desde o início",
      description: "Não vendemos qualquer caminhão. Vendemos O caminhão certo para SUA operação. Analisamos rota, carga, quilometragem, motoristas. Daí indicamos o modelo que vai te dar lucro — não dor de cabeça.",
      features: [
        "Análise técnica da operação",
        "Test-drive com a carga real",
        "Cálculo de ROI e TCO transparente",
        "Zero pressão de venda, 100% consultoria"
      ]
    },
    {
      icon: CreditCard,
      emoji: "💳",
      title: "FINANCIAMENTO SEM ENROLAÇÃO",
      subtitle: "Crédito aprovado. Operação rodando.",
      description: "Trabalhamos com as melhores instituições financeiras do mercado. Sem burocracia, sem enganação, sem surpresas no boleto. Aprovamos crédito em até 24h e você sai rodando.",
      features: [
        "Análise express (24h)",
        "Taxas competitivas de verdade",
        "Parcerias com Santander e principais bancos",
        "Consultoria financeira transparente"
      ]
    },
    {
      icon: Handshake,
      emoji: "🤝",
      title: "CONSÓRCIO INTELIGENTE",
      subtitle: "Planeje sem apertar o caixa",
      description: "Parceria com Canopus. Sem juros, sem entrada, com flexibilidade. Ideal pra quem quer expandir a frota com planejamento e sem comprometer o capital de giro.",
      features: [
        "Sem entrada, sem juros",
        "Parcelas que cabem no orçamento",
        "Simulação online rápida",
        "Liberdade pra crescer no seu ritmo"
      ]
    },
    {
      icon: Settings,
      emoji: "🔩",
      title: "PÓS-VENDA QUE ATENDE",
      subtitle: "Seu caminhão parado é prejuízo nosso também",
      description: "Oficina autorizada Foton. Técnicos certificados. 88% de fill rate em peças (temos a peça quando você precisa). E atendimento que não te deixa na mão.",
      features: [
        "Oficina autorizada com técnicos Foton",
        "Atendimento agendado (sem fila)",
        "R$ 95Mi em estoque de peças nacional",
        "Garantia de fábrica: 3 anos sem limite de km"
      ]
    },
    {
      icon: Package,
      emoji: "📦",
      title: "PEÇAS ORIGINAIS NA HORA",
      subtitle: "88% das peças em estoque. Sempre.",
      description: "Centro logístico integrado com R$ 95 milhões em peças. Fill rate de 88% (meta: 95% em 2026). Sua frota não para. Seu faturamento não cai.",
      features: [
        "Peças genuínas Foton",
        "Pronta entrega em MG",
        "Preços competitivos",
        "Garantia de fábrica"
      ]
    },
    {
      icon: Building2,
      emoji: "🚚",
      title: "FROTAS CORPORATIVAS",
      subtitle: "Atendimento dedicado pra quem compra sério",
      description: "Sua empresa precisa de 5, 10, 20 caminhões? A gente senta, monta um plano, negocia condições especiais e cuida da sua frota como se fosse nossa.",
      features: [
        "Descontos progressivos em volume",
        "Gestão de frota integrada",
        "SLA prioritário",
        "Consultor dedicado"
      ]
    },
    {
      icon: FileCheck,
      emoji: "🏛️",
      title: "LICITAÇÕES PÚBLICAS",
      subtitle: "Experiente em processos licitatórios",
      description: "40 anos de mercado ensinam. Conhecemos todos os trâmites, entregamos documentação completa, cumprimos prazos. Sem improviso, só profissionalismo.",
      features: [
        "Documentação completa e organizada",
        "Prazos rigorosamente cumpridos",
        "Suporte técnico durante todo processo",
        "Garantias contratuais"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Impactante */}
      <section className="mt-16 pt-24 pb-20 bg-gradient-to-br from-industrial-dark via-industrial-dark to-primary/20 text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-primary rounded-full" />
          <div className="absolute bottom-10 right-20 w-96 h-96 border border-primary rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-primary rounded-full" />
        </div>
        
        <div className="container-lavoro text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Nós não vendemos só caminhões.
            <span className="block text-primary mt-2">Nós resolvemos operações.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            40 anos construindo relações que vão além da venda. Da escolha do modelo até a última revisão: 
            <span className="text-primary-foreground font-semibold"> a Lavoro está com você.</span>
          </p>
        </div>
      </section>

      {/* Introdução Poderosa */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 md:p-12 rounded-2xl border-l-4 border-primary">
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                Aqui não tem conversa fiada. Tem expertise de quem liderou{" "}
                <span className="text-primary font-bold">+20 casas Mercedes-Benz</span> e vendeu{" "}
                <span className="text-primary font-bold">87 mil veículos</span>. Tem atendimento mineiro: direto, honesto e sempre presente. 
                E tem resultado: <span className="font-bold">sua frota rodando, sua operação lucrando.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços com Narrativa Forte */}
      <section className="py-20">
        <div className="container-lavoro">
          <div className="space-y-12">
            {servicos.map((servico, index) => (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-start p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Icon & Title Side */}
                <div className="lg:w-1/3 flex-shrink-0">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{servico.emoji}</span>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <servico.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
                    {servico.title}
                  </h3>
                  <p className="text-lg text-primary font-semibold italic">
                    "{servico.subtitle}"
                  </p>
                </div>

                {/* Content Side */}
                <div className="lg:w-2/3">
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {servico.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servico.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Números Impactantes */}
      <section className="py-20 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">40</div>
              <div className="text-lg font-semibold">Anos de Mercado</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">87mil</div>
              <div className="text-lg font-semibold">Veículos Vendidos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">27</div>
              <div className="text-lg font-semibold">Prêmios StarClass</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">88%</div>
              <div className="text-lg font-semibold">Fill Rate Peças</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Direto */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary-dark relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container-lavoro text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-8 leading-tight">
            Pronto pra ter um parceiro de verdade?
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-6">
              Não somos só concessionária. Somos a equipe que esteve à frente de{" "}
              <span className="font-bold text-primary-foreground">87 mil veículos vendidos</span>,{" "}
              <span className="font-bold text-primary-foreground">27 prêmios StarClass</span>,{" "}
              <span className="font-bold text-primary-foreground">40 anos de história</span>. 
              E agora estamos com a Foton — trazendo o melhor da engenharia global com atendimento mineiro.
            </p>
            <p className="text-xl md:text-2xl font-bold text-primary-foreground">
              Sem blablablá. Sem enrolação. Só resultado.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5531997966042?text=Olá! Vim pelo site e gostaria de falar com um consultor."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6 h-auto font-bold shadow-2xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Falar com Consultor Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Link to="/contato">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 h-auto font-bold"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Solicitar Orçamento
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicos;
