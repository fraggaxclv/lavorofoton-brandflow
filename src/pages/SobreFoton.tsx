import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, TrendingUp, Globe, Users, Zap, Shield } from "lucide-react";
import heroTruck from "@/assets/foton-lavoro-hero.png";
import fotonHeavy from "@/assets/foton-heavy.jpg";
import cumminsLogo from "@/assets/cummins-logo-full.png";
import boschLogo from "@/assets/bosch-logo-full.png";
import zfLogo from "@/assets/zf-logo-full.png";
import daimlerLogo from "@/assets/daimler-logo-full.png";
const SobreFoton = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const timelineData = [{
    year: "1996",
    title: "Início das Operações",
    description: "Fundação da Foton Motor, iniciando a jornada para se tornar líder global em veículos comerciais."
  }, {
    year: "2007",
    title: "Parceria Cummins",
    description: "Aliança estratégica para desenvolvimento de motores diesel de nova geração (linha ISF). Símbolo de eficiência, autonomia e robustez.",
    logo: cumminsLogo
  }, {
    year: "2012",
    title: "Joint Venture Daimler",
    description: "Parceria com Mercedes-Benz para desenvolvimento de veículos pesados. Referência mundial em engenharia, controle de qualidade e manufatura.",
    logo: daimlerLogo
  }, {
    year: "2017",
    title: "Parceria ZF",
    description: "Colaboração para transmissões de padrão europeu — precisão, suavidade e confiabilidade incomparáveis.",
    logo: zfLogo
  }, {
    year: "2025",
    title: "12 Milhões de Veículos",
    description: "Marca global alcançada com expansão acelerada na Ásia, Europa, América Latina e África."
  }];
  const fotonFacts = [{
    icon: <Globe className="w-8 h-8" />,
    text: "Uma das maiores fabricantes de veículos comerciais do planeta"
  }, {
    icon: <TrendingUp className="w-8 h-8" />,
    text: "Presente em mais de 110 países"
  }, {
    icon: <Shield className="w-8 h-8" />,
    text: "Mais de 12 milhões de veículos produzidos até 2025"
  }, {
    icon: <Zap className="w-8 h-8" />,
    text: "Líder global em tecnologia para caminhões leves, médios, pesados e elétricos"
  }];
  const brazilMetrics = [{
    label: "Estoque de Peças",
    value: "R$ 95Mi",
    description: "Investimento nacional"
  }, {
    label: "Fill Rate",
    value: "88%",
    description: "Meta de 95% em 2026"
  }, {
    label: "Colaboradores",
    value: "14→120",
    description: "Crescimento acelerado"
  }, {
    label: "Market Share",
    value: "4,0%",
    description: "Alcançado em outubro/2024"
  }, {
    label: "Crescimento",
    value: "+185%",
    description: "Vendas até out/2025"
  }, {
    label: "Concessionários",
    value: "+70",
    description: "Rede nacional em 2025"
  }, {
    label: "Meta 2026",
    value: "6.000",
    description: "Veículos vendidos"
  }];
  const escolhaLavoro = [{
    title: "Tecnologia Global",
    description: "Parcerias estratégicas com Cummins, Daimler e ZF garantem engenharia de padrão internacional.",
    icon: <Globe className="w-6 h-6" />
  }, {
    title: "Qualidade Superior",
    description: "Robustez real, consumo abaixo da média do mercado e confiabilidade comprovada.",
    icon: <Shield className="w-6 h-6" />
  }, {
    title: "Competitividade Estratégica",
    description: "Preços que criam vantagem real para cliente final e concessionário.",
    icon: <TrendingUp className="w-6 h-6" />
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroTruck} alt="Foton - Tecnologia Global" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/90 to-background/70" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Foton.
            <br />
            <span className="text-primary">Tecnologia global.</span>
            <br />
            Performance para o Brasil.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
            A Lavoro representa no Brasil uma das maiores fabricantes de veículos comerciais do mundo.
          </p>
          <Button size="lg" onClick={() => scrollToSection("quem-e-foton")} className="text-lg px-8 py-6">
            Conheça nossa história
          </Button>
        </div>
      </section>

      {/* Quem é a Foton */}
      <section id="quem-e-foton" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Quem é a <span className="text-primary">Foton</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {fotonFacts.map((fact, index) => <Card key={index} className="border-2 hover:border-primary transition-all duration-300">
                <CardContent className="p-8 flex items-start gap-4">
                  <div className="text-primary mt-1">{fact.icon}</div>
                  <p className="text-lg leading-relaxed">{fact.text}</p>
                </CardContent>
              </Card>)}
          </div>

          <p className="text-center text-lg text-muted-foreground mt-12 max-w-3xl mx-auto">
            Forte presença em parcerias com gigantes mundiais da engenharia, consolidando sua posição como referência em inovação e qualidade.
          </p>
        </div>
      </section>

      {/* Timeline de Inovação */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            A Linha do Tempo da <span className="text-primary">Inovação</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Três décadas construindo o futuro da mobilidade comercial
          </p>

          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-border" />

            <div className="space-y-12 md:space-y-0">
              {timelineData.map((item, index) => <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <Card className="border-2 hover:border-primary transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        {item.logo && <div className="mt-4 flex items-center">
                            <img src={item.logo} alt={item.title} className="h-8 object-contain" />
                          </div>}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-background z-10" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12" />
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Foton no Brasil */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            A Foton no <span className="text-primary">Brasil</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Estrutura nacional em expansão acelerada (2023–2025)
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 max-w-7xl mx-auto mb-12">
            {brazilMetrics.map((metric, index) => <Card key={index} className="border-2 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="font-semibold mb-1">{metric.label}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </CardContent>
              </Card>)}
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="border-2">
              <CardContent className="p-6 flex items-center gap-4">
                <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-lg">
                  <strong>Lançamento do Consórcio Foton</strong> em parceria com Canopus
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 flex items-center gap-4">
                <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-lg">
                  <strong>Parceria estratégica com Santander</strong> para financiamento competitivo
                </p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 flex items-center gap-4">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-lg">
                  <strong>Padronização nacional da rede</strong> prevista para final de 2026
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Por que a Lavoro escolheu a Foton */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Por que a Lavoro escolheu a <span className="text-primary">Foton</span>?
          </h2>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A Lavoro vem de 40 anos de história no mercado automotivo, representando +20 casas Mercedes-Benz/Toyota ao longo dos anos. Em 2020, a família vendeu sua participação e foi atrás de uma nova marca de futuro. <strong>40 anos de história no mercado automotivo</strong>, representando Mercedes-Benz no Grupo VDL. Em 2020, a família decidiu vender sua participação e buscar uma nova marca de futuro.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Foton reúne <strong>três pilares que nenhum outro fabricante oferecia ao mesmo tempo</strong>:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {escolhaLavoro.map((item, index) => <Card key={index} className="border-2 hover:border-primary transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>)}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed">
              A Lavoro acredita que o Brasil está entrando na <strong className="text-primary">década mais transformadora da mobilidade comercial</strong>. A Foton será protagonista neste movimento.
            </p>
          </div>
        </div>
      </section>

      {/* Testemunho da Lavoro */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-12">
                <div className="text-6xl text-primary mb-6">"</div>
                <p className="text-xl md:text-2xl leading-relaxed mb-8 font-light">
                  Representar a Foton é estar na interseção entre <strong>engenharia global</strong>, <strong>eficiência operacional</strong> e <strong>futuro da mobilidade</strong>.
                </p>
                <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                  Na Lavoro, acreditamos em produtos que entregam resultados: robustez real, consumo mais baixo que a concorrência, conforto e confiabilidade.
                </p>
                <p className="text-lg leading-relaxed font-semibold">
                  Nossa missão é simples: garantir que clientes no Brasil tenham acesso à melhor tecnologia do mundo com custos mais interessantes.
                </p>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="font-semibold">Lavoro Foton</p>
                  <p className="text-sm text-muted-foreground">40 anos construindo o futuro do transporte</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visão para os próximos 5 anos */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Visão para os próximos <span className="text-primary">5 anos</span>
          </h2>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2">
              <CardContent className="p-8">
                <Zap className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Eletromobilidade Comercial</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Segmento de curtas distâncias e aplicações urbanas como primeiro trator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>TCO (custo total de propriedade) como centro da disputa industrial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Foton com plataforma elétrica global já consolidada</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Expansão Nacional</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Crescimento da rede e padronização nacional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Consolidação da marca em MG e expansão no Sudeste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Participação crescente nos segmentos CNH-B (S315) e 3/4 (1217)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto border-2 border-primary/20">
            <CardContent className="p-8">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Parcerias B2B Estratégicas</h3>
              <p className="text-lg text-muted-foreground">
                Ampliação de parcerias com <strong>Locadoras</strong>, <strong>Cooperativas</strong>, <strong>Logística</strong> e <strong>Última Milha</strong> — segmentos que demandam alta performance, baixo TCO e suporte técnico diferenciado.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Descubra a <span className="text-primary">Foton</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Conheça nossos modelos e descubra por que a Foton é a marca que está redefinindo o futuro do transporte no Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/modelos">Ver Linha de Caminhões</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <a href="https://wa.me/5531999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Foton." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Fale com um Consultor
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default SobreFoton;