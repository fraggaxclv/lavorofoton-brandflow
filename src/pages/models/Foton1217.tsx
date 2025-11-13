import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import fotonHeavy from "@/assets/foton-heavy.jpg";

const Foton1217 = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6">AUMARK 1217</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                Semipesado robusto. Força para grandes volumes e longas distâncias.
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
              <img src={fotonHeavy} alt="AUMARK 1217" className="w-full h-full object-cover" />
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
              <div className="text-3xl font-bold text-primary mb-2">12t</div>
              <div className="text-muted-foreground">Capacidade de Carga</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">CNH D/E</div>
              <div className="text-muted-foreground">Habilitação Necessária</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">210cv</div>
              <div className="text-muted-foreground">Potência</div>
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
                  <span className="text-muted-foreground">Transporte de cargas pesadas e volumosas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Rotas estaduais e interestaduais</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Operações de longa distância</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Transportadoras e frotas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Construção civil e indústria</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Vantagens do AUMARK 1217:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Alta capacidade de carga útil</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Motor potente para terrenos difíceis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Estrutura extremamente robusta</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Confiabilidade em longas jornadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Baixo custo por tonelada transportada</span>
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
              <h3 className="text-lg font-bold mb-3">Motor Pesado</h3>
              <p className="text-muted-foreground">
                Motor Cummins ISB 210cv com alto torque, ideal para cargas pesadas em qualquer terreno.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Transmissão Reforçada</h3>
              <p className="text-muted-foreground">
                Câmbio de 8 marchas preparado para máxima eficiência em subidas e descidas.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Cabine Sleeper</h3>
              <p className="text-muted-foreground">
                Cabine leito com ar-condicionado e suspensão pneumática para longas viagens.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Sistema de Freios</h3>
              <p className="text-muted-foreground">
                Freios a ar comprimido com ABS e EBD para frenagem segura com carga máxima.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Chassi Pesado</h3>
              <p className="text-muted-foreground">
                Estrutura dimensionada para aplicações severas e cargas extremas.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Telemetria</h3>
              <p className="text-muted-foreground">
                Sistema de monitoramento em tempo real para gestão eficiente da frota.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Força Bruta para Grandes Operações</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            O AUMARK 1217 é construído para quem não aceita limitações. Alta carga, longas distâncias.
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

export default Foton1217;
