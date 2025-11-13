import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Eye, Award, Users } from "lucide-react";
import dealership from "@/assets/dealership.jpg";

const QuemSomos = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro text-center">
          <h1 className="mb-4">Quem Somos</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Especialistas em caminhões Foton em Minas Gerais. Construindo parcerias sólidas baseadas em confiança e performance.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Nossa História</h2>
              <p className="text-lg text-muted-foreground mb-4">
                A Lavoro Foton nasceu da visão de criar uma concessionária diferente: focada, especializada e comprometida com resultados reais para nossos clientes.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Escolhemos a Foton pela sua trajetória de inovação e pela qualidade comprovada de seus veículos comerciais. Nossa operação em Minas Gerais foi desenhada para oferecer mais que vendas — oferecemos consultoria estratégica.
              </p>
              <p className="text-lg text-muted-foreground">
                Cada caminhão vendido é resultado de análise técnica profunda e entendimento completo da operação do cliente. Acreditamos em relações de longo prazo.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-[var(--shadow-strong)]">
              <img
                src={dealership}
                alt="Concessionária Lavoro Foton"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Missão</h3>
              <p className="text-muted-foreground">
                Fornecer caminhões Foton de alta performance com consultoria técnica especializada, impulsionando o crescimento sustentável de nossos clientes.
              </p>
            </div>
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Visão</h3>
              <p className="text-muted-foreground">
                Ser referência em excelência no mercado de caminhões Foton em Minas Gerais, reconhecidos pela qualidade do atendimento e expertise técnica.
              </p>
            </div>
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Valores</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Excelência técnica</li>
                <li>• Transparência</li>
                <li>• Foco no resultado</li>
                <li>• Parcerias duradouras</li>
                <li>• Especialização</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="text-center mb-12">Nossos Diferenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Atendimento Consultivo</h3>
                <p className="text-muted-foreground">
                  Analisamos sua operação para indicar o modelo ideal. Não vendemos, recomendamos.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Especialização Foton</h3>
                <p className="text-muted-foreground">
                  Conhecimento profundo de cada modelo, cada especificação, cada aplicação.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Pós-Venda Completo</h3>
                <p className="text-muted-foreground">
                  Suporte técnico, peças originais e manutenção especializada sempre disponíveis.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Soluções Corporativas</h3>
                <p className="text-muted-foreground">
                  Atendimento diferenciado para frotas e licitações públicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Conheça Nossa Operação</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Visite nossa concessionária e converse com nossos especialistas. Transparência desde o primeiro contato.
          </p>
          <a
            href="/contato"
            className="inline-block bg-background text-foreground px-8 py-4 rounded text-lg font-semibold hover:bg-secondary transition-all"
          >
            Agendar Visita
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuemSomos;
