import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import fotonHeavy from "@/assets/foton-heavy.jpg";

const TunlandV7 = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6">TUNLAND V7</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                Picape versátil. Equilíbrio perfeito entre trabalho e mobilidade urbana.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contato" className="btn-primary-large text-center">
                  Solicitar Orçamento
                </a>
                <a
                  href="https://wa.me/5531999998888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background/10 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded text-lg font-semibold border-2 border-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-[var(--shadow-strong)]">
              <img src={fotonHeavy} alt="TUNLAND V7" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Especificações */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">800kg</div>
              <div className="text-muted-foreground">Capacidade de Carga</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">CNH B</div>
              <div className="text-muted-foreground">Habilitação Necessária</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">4x2</div>
              <div className="text-muted-foreground">Tração</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">Diesel</div>
              <div className="text-muted-foreground">Combustível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é indicado */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-8">Para Quem é Indicado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ideal Para:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Pequenas empresas e empreendedores</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Entregas urbanas e serviços</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Uso profissional leve</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Famílias que precisam de versatilidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Operações urbanas e periurbanas</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Vantagens do TUNLAND V7:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Ótimo custo-benefício</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Economia de combustível</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Fácil manobra em ambiente urbano</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Conforto e praticidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Baixo custo de manutenção</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12">Diferenciais Técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Motor Econômico</h3>
              <p className="text-muted-foreground">
                Motor diesel eficiente com baixo consumo ideal para uso urbano e periurbano.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Design Moderno</h3>
              <p className="text-muted-foreground">
                Linhas contemporâneas que combinam estilo e funcionalidade.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Cabine Confortável</h3>
              <p className="text-muted-foreground">
                Interior bem equipado com ar-condicionado, direção hidráulica e sistema multimídia.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Segurança Ativa</h3>
              <p className="text-muted-foreground">
                Freios ABS, airbags duplos e estrutura reforçada para proteção total.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Caçamba Prática</h3>
              <p className="text-muted-foreground">
                Caçamba com bom espaço de carga e tampa de proteção opcional.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Garantia Completa</h3>
              <p className="text-muted-foreground">
                3 anos de garantia de fábrica com rede de assistência nacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Versatilidade com Economia</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            A TUNLAND V7 é a escolha inteligente para quem busca uma picape prática e eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contato"
              className="inline-block bg-background text-foreground px-8 py-4 rounded text-lg font-semibold hover:bg-secondary transition-all"
            >
              Solicitar Orçamento
            </a>
            <a
              href="/modelos"
              className="inline-flex items-center justify-center bg-background/10 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded text-lg font-semibold border-2 border-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all"
            >
              Ver Outros Modelos <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TunlandV7;
