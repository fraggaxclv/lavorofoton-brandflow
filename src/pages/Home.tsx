import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelCard from "@/components/ModelCard";
import { Link } from "react-router-dom";
import heroTruckMobile from "@/assets/hero-lavoro-bh.png";
import heroTruckDesktop from "@/assets/hero-lavoro-desktop.png";
import cumminsLogo from "@/assets/cummins-logo-full.png";
import zfLogo from "@/assets/zf-logo-full.png";
import boschLogo from "@/assets/bosch-logo-full.png";
import danaLogo from "@/assets/dana-logo-full.png";
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
      <section className="relative h-[85vh] md:h-screen flex items-end justify-center overflow-hidden mt-16">
        {/* Mobile Hero */}
        <img 
          src={heroTruckMobile} 
          alt="Foton Lavoro - Concessionária em Belo Horizonte" 
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[35%_center] md:hidden"
        />
        {/* Desktop Hero */}
        <img 
          src={heroTruckDesktop} 
          alt="Foton Lavoro - Concessionária em Belo Horizonte" 
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="container-lavoro relative z-10 pb-16 md:pb-20 px-6 md:px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/modelos" className="btn-primary-large text-center shadow-2xl">
              Ver Modelos
            </Link>
            <Link to="/contato" className="bg-background/10 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded text-lg font-semibold border-2 border-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all text-center shadow-2xl">
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-12 text-foreground">Parceiros de Confiança Global</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
              <img 
                src={cumminsLogo} 
                alt="Cummins - Parceiro Foton Lavoro" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
              <img 
                src={zfLogo} 
                alt="ZF - Parceiro Foton Lavoro" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
              <img 
                src={boschLogo} 
                alt="Bosch - Parceiro Foton Lavoro" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
              <img 
                src={danaLogo} 
                alt="Dana - Parceiro Foton Lavoro" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
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
            <ModelCard name="Foton S315" description="Veículo urbano de carga. Pode ser dirigido com CNH B." image={fotonS315} link="/modelos/aumark-s315" />
            <ModelCard name="Foton 7T" description="Médio porte. Ideal para distribuição urbana e regional." image={foton7t} link="/modelos/aumark-715" />
            <ModelCard name="Foton 12T" description="Semipesado robusto. Força para grandes volumes e operações exigentes." image={fotonHeavy} link="/modelos/aumark-1217" />
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
                <img src={lavoro40Years} alt="40 anos Lavoro" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Especialização</h3>
              <p className="text-muted-foreground">
                Foco total em caminhões Foton. Conhecimento profundo da linha.
              </p>
            </div>
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={parceriaIcon} alt="Parceria" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Atendimento</h3>
              <p className="text-muted-foreground">
                Consultoria dedicada. Entendemos sua operação.
              </p>
            </div>
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={qualidadeIcon} alt="Qualidade" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Resultados</h3>
              <p className="text-muted-foreground">
                Soluções que impactam diretamente seu resultado operacional.
              </p>
            </div>
            <div className="text-center border-2 border-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={atendimentoMineiroIcon} alt="Atendimento Mineiro" loading="lazy" decoding="async" className="w-16 h-16 object-contain" />
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