import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Zap, Leaf } from "lucide-react";
import fotonS315 from "@/assets/foton-s315.jpg";

const EWonder = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-green-400" />
                <span className="text-green-400 font-bold text-lg">100% ELÉTRICO</span>
              </div>
              <h1 className="mb-6">eWONDER</h1>
              <p className="text-2xl text-muted-foreground mb-8">
                VUC elétrico. Emissão zero para entregas urbanas sustentáveis.
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
              <img src={fotonS315} alt="eWONDER" className="w-full h-full object-cover" />
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
              <div className="text-3xl font-bold text-primary mb-2">3,5t</div>
              <div className="text-muted-foreground">Capacidade de Carga</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-primary mb-2">CNH B</div>
              <div className="text-muted-foreground">Habilitação Necessária</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-green-500 mb-2 flex items-center gap-2">
                <Zap size={28} />200km
              </div>
              <div className="text-muted-foreground">Autonomia</div>
            </div>
            <div className="card-premium p-6">
              <div className="text-3xl font-bold text-green-500 mb-2 flex items-center gap-2">
                <Leaf size={28} />Zero
              </div>
              <div className="text-muted-foreground">Emissões</div>
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
                  <span className="text-muted-foreground">E-commerce e last mile urbano</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Empresas com metas ESG</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Entregas em zonas de emissão controlada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Operações em centros urbanos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Frotas sustentáveis</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Vantagens do eWONDER:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Zero emissões de CO₂</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Custo operacional 70% menor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Silencioso e sem vibração</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Manutenção simplificada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Acesso a incentivos fiscais</span>
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
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Zap className="text-green-500" />
                Motor Elétrico
              </h3>
              <p className="text-muted-foreground">
                Motor elétrico de alta eficiência com torque instantâneo e resposta imediata.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Bateria Avançada</h3>
              <p className="text-muted-foreground">
                Bateria de lítio com 200km de autonomia e recarga rápida em 2 horas.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Sistema Regenerativo</h3>
              <p className="text-muted-foreground">
                Frenagem regenerativa que recupera energia e aumenta a autonomia.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Tecnologia Embarcada</h3>
              <p className="text-muted-foreground">
                Painel digital com monitoramento de carga, autonomia e consumo em tempo real.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Leaf className="text-green-500" />
                Sustentabilidade
              </h3>
              <p className="text-muted-foreground">
                Zero emissões locais, contribuindo para metas de redução de carbono.
              </p>
            </div>
            <div className="card-premium p-6">
              <h3 className="text-lg font-bold mb-3">Garantia Completa</h3>
              <p className="text-muted-foreground">
                3 anos de garantia total com 5 anos de garantia para bateria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">O Futuro das Entregas Urbanas</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Reduza custos, elimine emissões e fortaleça sua marca com o eWONDER.
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

export default EWonder;
