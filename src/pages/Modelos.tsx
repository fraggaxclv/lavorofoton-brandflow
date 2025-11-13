import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelCard from "@/components/ModelCard";
import fotonS315 from "@/assets/foton-s315.jpg";
import foton7t from "@/assets/foton-7t.jpg";
import fotonHeavy from "@/assets/foton-heavy.jpg";

const Modelos = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-industrial-dark text-primary-foreground">
        <div className="container-lavoro text-center">
          <h1 className="mb-4">Linha Completa Foton</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Do urbano ao pesado. Soluções para cada operação com a confiabilidade Foton.
          </p>
        </div>
      </section>

      {/* Lista de Modelos */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModelCard
              name="AUMARK S315"
              description="VUC. Pode ser dirigido com CNH B. Ideal para entregas urbanas."
              image={fotonS315}
              link="/modelos/aumark-s315"
            />
            <ModelCard
              name="AUMARK 715"
              description="Médio porte com excelente custo-benefício. Versatilidade comprovada."
              image={foton7t}
              link="/modelos/aumark-715"
            />
            <ModelCard
              name="AUMARK 916"
              description="Capacidade ampliada. Performance para distribuição regional."
              image={fotonHeavy}
              link="/modelos/aumark-916"
            />
            <ModelCard
              name="AUMARK 1217"
              description="Semipesado robusto. Força para grandes volumes."
              image={fotonHeavy}
              link="/modelos/aumark-1217"
            />
            <ModelCard
              name="AUMAN D 1722"
              description="Alta capacidade. Longas distâncias e cargas pesadas."
              image={fotonHeavy}
              link="/modelos/auman-d-1722"
            />
          </div>
        </div>
      </section>

      {/* Comparativo Rápido */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="text-center mb-12">Comparativo de Capacidades</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 font-bold">Modelo</th>
                  <th className="py-4 px-6 font-bold">Capacidade</th>
                  <th className="py-4 px-6 font-bold">CNH</th>
                  <th className="py-4 px-6 font-bold">Aplicação</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-semibold">AUMARK S315</td>
                  <td className="py-4 px-6">3,5 toneladas</td>
                  <td className="py-4 px-6">B</td>
                  <td className="py-4 px-6">Urbano</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-semibold">AUMARK 715</td>
                  <td className="py-4 px-6">7 toneladas</td>
                  <td className="py-4 px-6">C</td>
                  <td className="py-4 px-6">Urbano/Regional</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-semibold">AUMARK 916</td>
                  <td className="py-4 px-6">9 toneladas</td>
                  <td className="py-4 px-6">C</td>
                  <td className="py-4 px-6">Regional</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-semibold">AUMARK 1217</td>
                  <td className="py-4 px-6">12 toneladas</td>
                  <td className="py-4 px-6">D/E</td>
                  <td className="py-4 px-6">Pesado</td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-semibold">AUMAN D 1722</td>
                  <td className="py-4 px-6">17 toneladas</td>
                  <td className="py-4 px-6">D/E</td>
                  <td className="py-4 px-6">Pesado/Longas distâncias</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-lavoro text-center">
          <h2 className="mb-6">Não sabe qual modelo escolher?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Nossos consultores analisam sua operação e recomendam a solução ideal.
          </p>
          <a
            href="/contato"
            className="inline-block bg-background text-foreground px-8 py-4 rounded text-lg font-semibold hover:bg-secondary transition-all"
          >
            Falar com Especialista
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Modelos;
