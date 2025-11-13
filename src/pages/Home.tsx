import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelCard from "@/components/ModelCard";
import { Link } from "react-router-dom";
import { CheckCircle, Users, TrendingUp, Award } from "lucide-react";
import heroTruck from "@/assets/banner-foton-lavoro.png";
import blackNovember from "@/assets/black-november-promo.png";
import fotonS315 from "@/assets/foton-s315.jpg";
import foton7t from "@/assets/foton-7t.jpg";
import fotonHeavy from "@/assets/foton-heavy.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroTruck})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="container-lavoro relative z-10 text-center text-primary-foreground">
          <h1 className="hero-text mb-6 animate-fade-in">
            FORÇA QUE <br />
            <span className="text-gradient">MOVE NEGÓCIOS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200">
            Caminhões Foton de alta performance para quem não aceita menos que excelência
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/modelos" className="btn-primary-large">
              Ver Modelos
            </Link>
            <Link
              to="/contato"
              className="bg-background/10 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded text-lg font-semibold border-2 border-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all"
            >
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Black November Promo */}
      <section className="section-padding bg-industrial-dark">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto">
            <img 
              src={blackNovember} 
              alt="Black November - Últimos Dias - Fale com a Lavoro!" 
              className="w-full rounded-lg shadow-2xl hover-scale"
            />
          </div>
        </div>
      </section>

      {/* Modelos em Destaque */}
      <section className="section-padding bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-4">Modelos Foton</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Performance e confiabilidade para cada necessidade
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ModelCard
              name="Foton S315"
              description="Veículo urbano de carga. Pode ser dirigido com CNH B."
              image={fotonS315}
              link="/modelos/s315"
            />
            <ModelCard
              name="Foton 7T"
              description="Médio porte. Ideal para distribuição urbana e regional."
              image={foton7t}
              link="/modelos/7t"
            />
            <ModelCard
              name="Foton 17T"
              description="Alta capacidade. Para operações pesadas e longas distâncias."
              image={fotonHeavy}
              link="/modelos/17t"
            />
          </div>
        </div>
      </section>

      {/* Por Que Lavoro */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="text-center mb-12">Por Que Lavoro Foton?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Especialização</h3>
              <p className="text-muted-foreground">
                Foco total em caminhões Foton. Conhecimento profundo da linha.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Atendimento</h3>
              <p className="text-muted-foreground">
                Consultoria dedicada. Entendemos sua operação.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resultados</h3>
              <p className="text-muted-foreground">
                Soluções que impactam diretamente seu resultado operacional.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Confiança</h3>
              <p className="text-muted-foreground">
                Operação sólida em Minas Gerais. Parceiro de longo prazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="section-padding bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">100+</div>
              <div className="text-lg text-muted-foreground">Caminhões Vendidos</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-lg text-muted-foreground">Empresas Atendidas</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">95%</div>
              <div className="text-lg text-muted-foreground">Satisfação</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">24h</div>
              <div className="text-lg text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Pronto para o próximo passo?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Fale com nossos consultores e descubra o caminhão Foton ideal para sua operação.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-background text-foreground px-8 py-4 rounded text-lg font-semibold hover:bg-secondary transition-all"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
