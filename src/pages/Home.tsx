import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelCard from "@/components/ModelCard";
import { Link } from "react-router-dom";
import heroTruck from "@/assets/hero-lavoro-bh.png";
import promocionalParceiros from "@/assets/promocional-parceiros.png";
import fotonS315 from "@/assets/foton-s315.jpg";
import foton7t from "@/assets/foton-7t.jpg";
import fotonHeavy from "@/assets/foton-heavy.jpg";
import lavoro40Years from "@/assets/lavoro-40-years.png";
import parceriaIcon from "@/assets/parceria-icon.png";
import qualidadeIcon from "@/assets/qualidade-icon.png";
import atendimentoMineiroIcon from "@/assets/atendimento-mineiro-icon.png";
const Home = () => {
  return <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden mt-16">
        <img 
          src={heroTruck} 
          alt="Foton Lavoro" 
          className="absolute inset-0 w-full h-full object-cover object-[35%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        <div className="container-lavoro relative z-10 text-left md:text-center text-primary-foreground px-6 md:px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
            Caminhões Foton<br className="md:hidden" /> em Minas Gerais
          </h1>
          <p className="text-lg md:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto opacity-95 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Performance, qualidade e suporte técnico especializado para sua operação
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/modelos" className="btn-primary-large text-center">
              Ver Modelos
            </Link>
            <Link to="/contato" className="bg-background/10 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded text-lg font-semibold border-2 border-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all text-center">
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-8 text-foreground">Parceiros de Confiança Global</h2>
          <div className="max-w-5xl mx-auto rounded-2xl p-8 md:p-12 border-4 border-primary">
            <img 
              src={promocionalParceiros} 
              alt="Foton Lavoro - Parceiros: ZF, Cummins, Dana, Bosch" 
              className="w-full h-auto"
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
            <ModelCard name="Foton S315" description="Veículo urbano de carga. Pode ser dirigido com CNH B." image={fotonS315} link="/modelos/s315" />
            <ModelCard name="Foton 7T" description="Médio porte. Ideal para distribuição urbana e regional." image={foton7t} link="/modelos/7t" />
            <ModelCard name="Foton 17T" description="Alta capacidade. Para operações pesadas e longas distâncias." image={fotonHeavy} link="/modelos/17t" />
          </div>
        </div>
      </section>

      {/* Por Que Lavoro */}
      <section className="section-padding bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-12">Por Que Lavoro Foton?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={lavoro40Years} alt="40 anos Lavoro" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Especialização</h3>
              <p className="text-muted-foreground">
                Foco total em caminhões Foton. Conhecimento profundo da linha.
              </p>
            </div>
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={parceriaIcon} alt="Parceria" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Atendimento</h3>
              <p className="text-muted-foreground">
                Consultoria dedicada. Entendemos sua operação.
              </p>
            </div>
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={qualidadeIcon} alt="Qualidade" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resultados</h3>
              <p className="text-muted-foreground">
                Soluções que impactam diretamente seu resultado operacional.
              </p>
            </div>
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={atendimentoMineiroIcon} alt="Atendimento Mineiro" className="w-16 h-16 object-contain" />
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
              <div className="text-5xl font-bold text-primary mb-2">87%</div>
              <div className="text-lg text-muted-foreground">Satisfação</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
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
          <Link to="/contato" className="inline-block bg-background text-foreground px-8 py-4 rounded text-lg font-semibold hover:bg-secondary transition-all">
            Solicitar Orçamento
          </Link>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;