import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import fotonHeavy from "@/assets/foton-heavy.jpg";

const TunlandV9 = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6">TUNLAND V9</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                Picape robusta. Força e versatilidade para trabalho e lazer.
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
              <img src={fotonHeavy} alt="TUNLAND V9" className="w-full h-full object-cover" />
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
              <div className="text-3xl font-bold text-primary mb-2">1.000kg</div>
              <div className="text-muted-foreground">Capacidade de Carga</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">CNH B</div>
              <div className="text-muted-foreground">Habilitação Necessária</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">4x4</div>
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
                  <span className="text-muted-foreground">Empresas de construção e obras</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Agronegócio e fazendas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Serviços de campo e manutenção</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Uso misto trabalho e lazer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Terrenos acidentados e off-road</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Vantagens do TUNLAND V9:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Tração 4x4 para qualquer terreno</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Caçamba espaçosa e resistente</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Conforto de SUV com robustez de trabalho</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Tecnologia e conectividade embarcada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Custo-benefício incomparável</span>
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
              <h3 className="text-lg font-bold mb-3">Motor Turbo Diesel</h3>
              <p className="text-muted-foreground">
                Motor turbo diesel com alta eficiência, torque elevado e economia de combustível.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Sistema 4x4</h3>
              <p className="text-muted-foreground">
                Tração nas quatro rodas acionável para enfrentar qualquer tipo de terreno.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Cabine Dupla</h3>
              <p className="text-muted-foreground">
                Espaço para 5 ocupantes com conforto, ar-condicionado e acabamento premium.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Segurança Completa</h3>
              <p className="text-muted-foreground">
                ABS, airbags, controle de estabilidade e tração para máxima segurança.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Caçamba Reforçada</h3>
              <p className="text-muted-foreground">
                Caçamba em aço de alta resistência com proteção anticorrosiva.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Garantia Estendida</h3>
              <p className="text-muted-foreground">
                3 anos de garantia com assistência 24h em todo território nacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">A Picape que Une Trabalho e Lazer</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Descubra como a TUNLAND V9 pode transformar sua produtividade e versatilidade.
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

export default TunlandV9;
