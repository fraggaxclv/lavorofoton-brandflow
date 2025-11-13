import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, CreditCard, DollarSign, Wrench, Package, Building2, FileCheck } from "lucide-react";

const Servicos = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro text-center">
          <h1 className="mb-4">Serviços</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Além da venda. Suporte completo para maximizar o retorno do seu investimento.
          </p>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Venda */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Venda de Caminhões</h3>
              <p className="text-muted-foreground mb-4">
                Consultoria especializada para escolha do modelo ideal. Análise técnica completa da sua operação.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Linha completa Foton</li>
                <li>• Test drive disponível</li>
                <li>• Análise de ROI</li>
                <li>• Configurações personalizadas</li>
              </ul>
            </div>

            {/* Consórcio */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Consórcio</h3>
              <p className="text-muted-foreground mb-4">
                Planeje a aquisição do seu caminhão com taxas competitivas e flexibilidade.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Parcelas acessíveis</li>
                <li>• Sem entrada</li>
                <li>• Sem juros</li>
                <li>• Simulação online</li>
              </ul>
            </div>

            {/* Financiamento */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Financiamento</h3>
              <p className="text-muted-foreground mb-4">
                Crédito facilitado com as melhores taxas do mercado. Aprovação rápida.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Análise em até 24h</li>
                <li>• Múltiplas instituições</li>
                <li>• Taxas competitivas</li>
                <li>• Consultoria financeira</li>
              </ul>
            </div>

            {/* Pós-Venda */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Pós-Venda</h3>
              <p className="text-muted-foreground mb-4">
                Manutenção preventiva e corretiva com equipe especializada Foton.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Oficina autorizada</li>
                <li>• Técnicos certificados</li>
                <li>• Atendimento agendado</li>
                <li>• Garantia de fábrica</li>
              </ul>
            </div>

            {/* Peças */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Peças Originais</h3>
              <p className="text-muted-foreground mb-4">
                Estoque completo de peças originais Foton. Pronta entrega.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Peças genuínas</li>
                <li>• Entrega rápida</li>
                <li>• Garantia de fábrica</li>
                <li>• Preços competitivos</li>
              </ul>
            </div>

            {/* Frotas */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Frotas Corporativas</h3>
              <p className="text-muted-foreground mb-4">
                Soluções especiais para empresas. Atendimento dedicado e condições diferenciadas.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Descontos em volume</li>
                <li>• Gestão de frota</li>
                <li>• SLA prioritário</li>
                <li>• Consultoria dedicada</li>
              </ul>
            </div>

            {/* Licitações */}
            <div className="card-premium p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <FileCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-4">Licitações Públicas</h3>
              <p className="text-muted-foreground mb-4">
                Experiência comprovada em processos licitatórios. Suporte completo de documentação.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Documentação completa</li>
                <li>• Prazos atendidos</li>
                <li>• Suporte técnico</li>
                <li>• Garantias contratuais</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais do Serviço */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="text-center mb-12">Por Que Escolher Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-lg font-semibold mb-2">Suporte Técnico</div>
              <p className="text-muted-foreground">
                Canal direto para emergências. Resposta rápida quando você mais precisa.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-lg font-semibold mb-2">Peças Originais</div>
              <p className="text-muted-foreground">
                Garantia de qualidade e durabilidade. Sem compromissos com sua operação.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30min</div>
              <div className="text-lg font-semibold mb-2">Tempo Médio</div>
              <p className="text-muted-foreground">
                Agilidade no atendimento. Seu tempo é valioso, o nosso também.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Precisa de um Serviço Específico?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Fale com nossa equipe e descubra como podemos ajudar sua operação.
          </p>
          <a
            href="/contato"
            className="inline-block bg-background text-foreground px-8 py-4 rounded text-lg font-semibold hover:bg-secondary transition-all"
          >
            Solicitar Atendimento
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicos;
