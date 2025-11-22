import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Leaf, TrendingDown, Battery, Truck, Shield, Building2, Users } from "lucide-react";
import ewonderImg from "@/assets/ewonder.jpg";

const EWonder = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 pt-20 pb-12 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container-lavoro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Zap className="w-5 h-5" />
                <span className="font-bold">100% ELÉTRICO</span>
              </div>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
                O VUC elétrico que entrega economia real desde o primeiro dia.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-50">
                Foton eWonder — Autonomia de 180 km, até 1.325 kg de carga e o menor custo por quilômetro do segmento. O elétrico ideal para last-mile no Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6">
                  <a href="/contato">Solicitar Proposta</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-700 text-lg px-8 py-6">
                  <a href="https://wa.me/5531211647335" target="_blank" rel="noopener noreferrer">
                    Falar com Especialista da Lavoro
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src={ewonderImg} alt="Foton eWonder" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Por que o eWonder é perfeito para o Brasil */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Por que o eWonder é o elétrico perfeito para o Brasil?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Economia */}
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Economia imediata no seu bolso</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Até 80% de redução no custo por km</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Economia mensal entre R$ 1.500 e R$ 2.800 por veículo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Manutenção quase zero</span>
                </li>
              </ul>
            </div>

            {/* 2. Performance */}
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Performance urbana impecável</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Torque instantâneo de até 220 N.m</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Subidas, rampas e viadutos sem esforço</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Direção suave, silenciosa e confortável</span>
                </li>
              </ul>
            </div>

            {/* 3. Autonomia */}
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Autonomia real de 180 km</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Perfeito para rotas urbanas entre 60 e 140 km/dia</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Ideal para last-mile, delivery, pharma, autosserviço, foodservice e e-commerce</span>
                </li>
              </ul>
            </div>

            {/* 4. Baú */}
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Baú de 7 m³ — otimizado para volume</h3>
              <p className="text-muted-foreground mb-2">
                Medidas internas:<br />
                <strong>2740 x 1540 x 1602 mm</strong>
              </p>
              <p className="text-muted-foreground">
                Perfeito para entregas volumétricas.
              </p>
            </div>

            {/* 5. Segurança */}
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">A segurança que sua operação exige</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>ABS + BAS + ESC + HSA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Farol automático</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Sensor de ré</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Farol de neblina</span>
                </li>
              </ul>
            </div>

            {/* 6. Bateria CATL */}
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Bateria CATL LFP – a mais segura do mundo</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Mesma química usada pela Tesla China</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Zero risco térmico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Vida útil maior e mais estável</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Especificações Técnicas */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Especificações Técnicas Completas</h2>
          
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-left font-bold">Categoria</th>
                    <th className="px-6 py-4 text-left font-bold">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Motor</td>
                    <td className="px-6 py-4 text-muted-foreground">Síncrono de Ímã Permanente – eAxle</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-6 py-4 font-semibold">Potência</td>
                    <td className="px-6 py-4 text-muted-foreground">35 kW (nominal) / 75 kW (pico)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Torque</td>
                    <td className="px-6 py-4 text-muted-foreground">105 N.m @ 220 N.m</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-6 py-4 font-semibold">Entre Eixos</td>
                    <td className="px-6 py-4 text-muted-foreground">3.080 mm</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Peso em Ordem de Marcha</td>
                    <td className="px-6 py-4 text-muted-foreground">1.225 kg</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-6 py-4 font-semibold">PBT</td>
                    <td className="px-6 py-4 text-muted-foreground">2.550 kg</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Capacidade de Carga Líquida</td>
                    <td className="px-6 py-4 text-muted-foreground font-bold text-green-600">1.325 kg</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-6 py-4 font-semibold">Tração</td>
                    <td className="px-6 py-4 text-muted-foreground">4x2</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Pneus</td>
                    <td className="px-6 py-4 text-muted-foreground">175/75R14C</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-6 py-4 font-semibold">Conector</td>
                    <td className="px-6 py-4 text-muted-foreground">CCS2 (AC/DC)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Voltagem de Operação</td>
                    <td className="px-6 py-4 text-muted-foreground">335 V</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-6 py-4 font-semibold">Bateria</td>
                    <td className="px-6 py-4 text-muted-foreground font-bold">41,86 kWh – CATL (LFP)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4 font-semibold">Autonomia</td>
                    <td className="px-6 py-4 text-muted-foreground font-bold text-green-600">180 km</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold">Bateria Auxiliar</td>
                    <td className="px-6 py-4 text-muted-foreground">12 V</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Itens de Série */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Itens de Série</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-premium p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                Série
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Volante multifuncional</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>ABS + BAS + ESC + HSA</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Farol automático</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>MP3 (rádio + USB)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Sensor de ré</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Vidro elétrico</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Aquecedor de retrovisor</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Farol de neblina</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="text-primary" />
                Opcionais
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Multimídia 7" (MP5)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Câmera de ré</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sensor de pressão dos pneus</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Defletor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Economia Diesel x Elétrico */}
      <section className="section-padding bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Economia Diesel x Elétrico</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-red-600">🚛 Diesel (cenário real)</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">Consumo médio urbano: 8 a 10 km/L</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">Custo mensal médio: R$ 2.200 – R$ 3.500</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-muted-foreground">Manutenção frequente</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">⚡ eWonder</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Custo por km: até 80% menor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Autonomia otimizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Sem óleo, filtros, correias, injetores ou sistema de escapamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Vida útil maior da motorização elétrica</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="card-premium p-8 text-center bg-gradient-to-r from-green-600 to-green-700 text-white">
            <p className="text-2xl font-bold">
              💰 Tradução prática: Um único eWonder economiza o equivalente à parcela dele próprio todos os meses.
            </p>
          </div>
        </div>
      </section>

      {/* Vantagens para Empresas */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Vantagens para Empresas e Frotas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">ESG real, mensurável e imediato</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Redução significativa de emissões</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Melhora a reputação da marca</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Ajuda em licitações, auditorias e contratos corporativos</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Operação mais silenciosa e eficiente</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Entregas noturnas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Zero vibração</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Conforto para o motorista</span>
                </li>
              </ul>
            </div>

            <div className="card-premium p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Acesso liberado em zonas urbanas restritas</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Zero rodízio</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Zero restrição ambiental</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Zero risco de multa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é ideal */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Para quem é ideal</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Empresas de entrega de última milha",
              "Logística urbana",
              "Distribuição farmacêutica",
              "Food service",
              "Hortifruti",
              "Supermercados e atacarejos",
              "E-commerce",
              "Franquias",
              "Micro e pequenas empresas que querem reduzir custo",
              "Empresas que querem EV para compor portfólio ESG"
            ].map((item, index) => (
              <div key={index} className="card-premium p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que comprar com a Lavoro */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Por que comprar o eWonder com a Lavoro Foton?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Atendimento consultivo especializado</h3>
            </div>
            <div className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Time técnico treinado pela Foton</h3>
            </div>
            <div className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Estrutura completa de pós-venda</h3>
            </div>
            <div className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Agilidade no atendimento</h3>
            </div>
            <div className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Suporte para operações de frota</h3>
            </div>
            <div className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Credibilidade da família Fraga (Castelo Fraga) no setor há 40 anos</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container-lavoro text-center">
          <h2 className="mb-6 text-white">Seu próximo passo rumo à economia, eficiência e sustentabilidade.</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-green-50">
            Conheça o eWonder na Lavoro Foton e descubra como reduzir custos em até 80% na sua operação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6">
              <a href="https://wa.me/5531211647335" target="_blank" rel="noopener noreferrer">
                Falar com Especialista
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-700 text-lg px-8 py-6">
              <a href="https://wa.me/5531211647335" target="_blank" rel="noopener noreferrer">
                Agendar Teste de Autonomia
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-700 text-lg px-8 py-6">
              <a href="/contato">
                Solicitar Proposta
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Garantia de Confiança */}
      <section className="section-padding">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center card-premium p-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <blockquote className="text-2xl font-medium mb-4 text-foreground">
              "A Lavoro Foton é referência em Minas Gerais. Nosso compromisso é entregar eficiência, tecnologia e o melhor suporte para a sua operação."
            </blockquote>
            <p className="text-muted-foreground font-semibold">— Equipe Lavoro Foton</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EWonder;
