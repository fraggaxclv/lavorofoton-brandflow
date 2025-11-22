import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Award, TrendingUp, Users, Wrench, Target, CheckCircle2 } from "lucide-react";
const QuemSomos = () => {
  return <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-16 bg-gradient-to-br from-industrial-dark via-industrial-steel to-industrial-dark text-primary-foreground">
        <div className="container-lavoro text-center">
          <h1 className="mb-6">Quem Somos</h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Compromisso com a excelência, tradição no transporte e um novo capítulo com a Foton.
          </p>
        </div>
      </section>

      {/* Seção 1 - Nossa História */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="text-center mb-16">Nossa História</h2>
          
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Fundação */}
            <div className="relative pl-12 pb-12 border-l-4 border-primary">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="card-premium p-8">
                <h3 className="mb-4 text-primary">Fundação</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A Lavoro Foton foi fundada em 2020 por <strong className="text-foreground">Orosimar Valentim Fraga — "Castelo Fraga"</strong>,
                  um dos nomes mais respeitados do setor de transporte em Minas Gerais.
                </p>
              </div>
            </div>

            {/* Legado */}
            <div className="relative pl-12 pb-12 border-l-4 border-primary">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Award className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="card-premium p-8">
                <h3 className="mb-4 text-primary">Um legado de mais de 40 anos</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Antes da Lavoro, Castelo construiu uma trajetória sólida ao longo de <strong className="text-foreground">quatro décadas na Mercedes-Benz</strong>,
                  liderando operações comerciais, pós-venda e expansão de rede.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Foram <strong className="text-foreground">+ de 20 concessionárias Mercedes-Benz</strong> em <strong className="text-foreground">Minas Gerais, Paraná, Goiás e Mato Grosso</strong> — caminhões, vans e ônibus — administradas com excelência, sempre entregando <strong className="text-foreground">credibilidade, relacionamento e resultado</strong>. Com realizações de vendas de <strong className="text-foreground">R$1,5 bilhão/ano</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 - Por que a Foton? */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="max-w-5xl mx-auto">
            <h2 className="mb-6">Por que a Foton?</h2>
            <p className="text-xl text-primary mb-8">A escolha pela nova vanguarda da indústria</p>
            
            <div className="card-premium p-8 mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Após vender as operações Mercedes-Benz, Castelo decidiu iniciar um novo ciclo.
                A escolha pela Foton não foi casual: foi <strong className="text-foreground">estratégica, técnica e baseada em uma leitura clara do mercado mundial</strong>.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">Qualidade mecânica real</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">Motores Cummins</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">Caixas ZF</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">Componentes Bosch e Dana</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">Nova liderança chinesa na manufatura global</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground">Tecnologia competitiva, moderna e acessível</span>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Castelo viu na Foton a combinação perfeita entre <strong className="text-foreground">confiabilidade, modernidade e custo-benefício</strong> — 
                traços essenciais para o mercado brasileiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 - Nosso Compromisso */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6">Nosso Compromisso</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Na Lavoro Foton, trabalhamos com um princípio simples: <strong className="text-foreground">entregar mais valor ao cliente — sempre</strong>.
            </p>
            
            <div className="card-premium p-8 mb-8">
              <h3 className="mb-6">Acreditamos em:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Relacionamento direto e humano</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Transparência comercial</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Suporte pós-venda real</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Operações orientadas pela engenharia e pela boa prática</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Caminhões que resolvem o dia a dia do transportador</p>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-center text-muted-foreground leading-relaxed">
              Nada de glamour, nada de exagero. <br />
              <strong className="text-foreground">Apenas trabalho sério e resultado.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Seção 4 - Nova Concessionária */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="mb-6">Estamos construindo uma nova casa</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              As obras da nova concessionária Lavoro Foton já estão em fase de preparação e serão iniciadas em breve.
            </p>
            
            <div className="card-premium p-8 text-left mb-8">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Um projeto moderno, amplo, preparado para:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg text-foreground">Atendimento mais rápido</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg text-foreground">Oficina completa</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg text-foreground">Estoque de peças maior</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-lg text-foreground">Estrutura premium para clientes de MG</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Um passo importante para acompanhar o crescimento da rede Foton no Brasil e oferecer ainda mais qualidade ao setor.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 5 - Nosso Propósito */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="mb-6">Nosso Propósito</h2>
            <p className="text-2xl text-foreground font-semibold mb-8 leading-relaxed">
              Servir o transportador com inteligência, respeito e tecnologia.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A Lavoro Foton nasceu com a missão de unir <strong className="text-foreground">experiência de décadas</strong>, 
              <strong className="text-foreground"> nova engenharia global</strong> e <strong className="text-foreground">atendimento próximo e mineiro</strong>, 
              criando uma concessionária que coloca o cliente no centro de tudo.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 6 - CTA Final */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-8 max-w-4xl mx-auto leading-tight">
            A Lavoro Foton é a evolução natural de uma história construída com seriedade.
          </h2>
          <a href="/contato" className="inline-block bg-background text-foreground px-10 py-5 rounded-lg text-xl font-semibold hover:bg-secondary hover:scale-105 transition-all shadow-[var(--shadow-strong)]">
            Fale Conosco
          </a>
        </div>
      </section>

      <Footer />
    </div>;
};
export default QuemSomos;