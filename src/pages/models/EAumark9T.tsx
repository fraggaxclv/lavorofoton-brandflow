import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingDown, Zap, Battery, Package, Shield, Truck, Box, LifeBuoy, Snowflake, Wrench, Droplet, Factory } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import eaumark9tImg from "@/assets/eaumark-9t.jpg";
import eaumarkLineupImg from "@/assets/eaumark-9t-lineup.jpg";
import eaumarkChassisImg from "@/assets/eaumark-9t-chassis.webp";
import eaumarkSpecsImg from "@/assets/eaumark-9t-specs-table.png";

const EAumark9T = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const whatsappNumber = "5531992677600";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o e-Aumark 9T.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const galleryImages = [
    { src: eaumarkLineupImg, title: "Família e-Aumark", description: "Linha completa de caminhões elétricos" },
    { src: eaumarkChassisImg, title: "Chassi e Bateria", description: "Arquitetura avançada com bateria centralizada" },
    { src: eaumark9tImg, title: "e-Aumark 9T", description: "Design moderno e funcional" },
  ];

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev !== null ? (prev > 0 ? prev - 1 : galleryImages.length - 1) : null));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev !== null ? (prev < galleryImages.length - 1 ? prev + 1 : 0) : null));
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-dark via-industrial-dark/95 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
        
        <div className="container-lavoro relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-bold text-green-400">100% ELÉTRICO | BATERIA CATL LFP (Tecnologia estilo Tesla)</span>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent leading-tight">
                  e-Aumark 9T
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  O caminhão elétrico perfeito para operações urbanas e interurbanas: 5.550 kg de carga, 100 kWh de bateria CATL LFP e autonomia real de 200 km. Silencioso, eficiente e pronto para qualquer implemento.
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Potência</p>
                  <p className="text-2xl font-bold text-green-400">75 kW → 150 kW</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Torque</p>
                  <p className="text-2xl font-bold text-green-400">250 → 560 N.m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">PBT</p>
                  <p className="text-2xl font-bold">8.5 T</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Bateria</p>
                  <p className="text-2xl font-bold">100,46 kWh</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  variant="whatsapp"
                  className="text-lg px-8"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Falar com Especialista
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <a href="/contato">
                    Solicitar Proposta
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <img 
                src={eaumark9tImg} 
                alt="e-Aumark 9T"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Por Que e-Aumark 9T */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Por que o e-Aumark 9T?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O caminhão elétrico que une força profissional, economia extrema e tecnologia de ponta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Economia operacional de até 80%</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Diesel eliminado da conta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Zero óleo, correias, filtros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Baixa manutenção de powertrain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Economia mensal muito expressiva</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Força e robustez para trabalho pesado</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>75 kW de potência contínua</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>150 kW de potência pico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>560 N.m de torque máximo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Performance equivalente ao diesel</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Battery className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Autonomia real de 200 km</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Ideal para entregas urbanas e regionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Bateria de 100,46 kWh CATL LFP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Perfeito para operações de rota fixa</span>
                </li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Capacidade profissional de 5.550 kg</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground mb-2">Especificações:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• PBT: 8.500 kg</li>
                    <li>• Peso em ordem de marcha: 2.950 kg</li>
                    <li>• Carga líquida: 5.550 kg</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-2">Perfeito para qualquer implemento:</p>
                  <p className="text-sm">Baú • Sider • Refrigerado • Socorro • Tanque • Cesto aéreo • Gaiola de gás</p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border border-teal-200 dark:border-teal-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Arquitetura com bateria centralizada</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Mais estabilidade e segurança</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Menor centro de gravidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Projeto avançado e otimizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">✓</span>
                  <span>Componentes protegidos</span>
                </li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border border-red-200 dark:border-red-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Battery className="w-7 h-7 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bateria CATL LFP (química Tesla)</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <span>LFP = zero risco térmico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <span>Vida útil: 3.000–5.000 ciclos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <span>Maior segurança da categoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <span>Garantia: 6 anos / 300.000 km</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Galeria de Fotos</h2>
            <p className="text-xl text-muted-foreground">Conheça cada detalhe do e-Aumark 9T</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dialog para visualização em tela cheia */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Imagem */}
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Informações */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">{galleryImages[selectedImage].title}</h3>
                <p className="text-gray-300">{galleryImages[selectedImage].description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>

              {/* Botões de navegação */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Botão fechar */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Especificações Técnicas */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Especificações Técnicas</h2>
            <p className="text-xl text-muted-foreground">Tecnologia de ponta em cada detalhe</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Coluna 1 */}
            <div className="space-y-6 p-8 rounded-2xl bg-white dark:bg-industrial-dark border border-border">
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Motor</p>
                <p className="text-xl font-bold">Rear e-Axle</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Potência</p>
                <p className="text-xl font-bold">75 kW / 150 kW (pico)</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Torque</p>
                <p className="text-xl font-bold">250 N.m / 560 N.m</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Entre Eixos</p>
                <p className="text-xl font-bold">3.360 mm / 3.800 mm</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Células da bateria</p>
                <p className="text-xl font-bold">CATL LFP</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Voltagem de operação</p>
                <p className="text-xl font-bold">540V</p>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-6 p-8 rounded-2xl bg-white dark:bg-industrial-dark border border-border">
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">PBT</p>
                <p className="text-xl font-bold">8.500 kg</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Carga líquida</p>
                <p className="text-xl font-bold">5.550 kg</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Peso em ordem de marcha</p>
                <p className="text-xl font-bold">2.950 kg</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Conector</p>
                <p className="text-xl font-bold">CCS2 (AC + DC)</p>
              </div>
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-1">Bateria de Propulsão</p>
                <p className="text-xl font-bold">100,46 kWh</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Autonomia</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">200 km</p>
              </div>
            </div>
          </div>

          {/* Tabela de Especificações Completa */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-industrial-light to-industrial-light/50 dark:from-black dark:to-industrial-dark/50 border border-border">
              <h3 className="text-2xl font-bold mb-6 text-center">Ficha Técnica Completa</h3>
              <img
                src={eaumarkSpecsImg}
                alt="Especificações Técnicas Detalhadas do e-Aumark 9T"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tempos de Recarga */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Tempos de Recarga</h2>
            <p className="text-xl text-muted-foreground">Recarregamento rápido para máxima produtividade</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="py-4 px-6 text-left font-bold">Carregador</th>
                    <th className="py-4 px-6 text-left font-bold">Potência</th>
                    <th className="py-4 px-6 text-left font-bold">0→100%</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-industrial-dark">
                  <tr className="border-b border-border">
                    <td className="py-4 px-6">AC</td>
                    <td className="py-4 px-6 font-semibold">7 kW</td>
                    <td className="py-4 px-6 font-semibold">14,3 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-6">AC</td>
                    <td className="py-4 px-6 font-semibold">11 kW</td>
                    <td className="py-4 px-6 font-semibold">9 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-6">AC</td>
                    <td className="py-4 px-6 font-semibold">22 kW</td>
                    <td className="py-4 px-6 font-semibold">4,5 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-6">DC</td>
                    <td className="py-4 px-6 font-semibold">30 kW</td>
                    <td className="py-4 px-6 font-semibold">3,4 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-6">DC</td>
                    <td className="py-4 px-6 font-semibold">60 kW</td>
                    <td className="py-4 px-6 font-semibold text-green-600 dark:text-green-400">1,7 h</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-6">DC</td>
                    <td className="py-4 px-6 font-semibold">90 kW</td>
                    <td className="py-4 px-6 font-semibold text-green-600 dark:text-green-400">1,1 h</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold">DC</td>
                    <td className="py-4 px-6 font-bold">120 kW</td>
                    <td className="py-4 px-6 font-bold text-green-600 dark:text-green-400">1 h</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30">
              <p className="text-center text-lg">
                <span className="text-2xl mr-2">🔋</span>
                <strong>Alta velocidade de recarga</strong> → ideal para rotas com janelas de parada planejadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo Diesel vs Elétrico */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Diesel vs Elétrico</h2>
            <p className="text-xl text-muted-foreground">A diferença que transforma o seu resultado</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Diesel */}
            <div className="p-8 rounded-2xl bg-white dark:bg-industrial-dark border-2 border-red-200 dark:border-red-800/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
                  <span className="text-2xl">⛽</span>
                </div>
                <h3 className="text-2xl font-bold">Diesel 9T</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Custo mensal 3–6 mil reais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Manutenção pesada constante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Poluição e ruído</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Alto risco mecânico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Restrições ambientais crescentes</span>
                </li>
              </ul>
            </div>

            {/* Elétrico */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-500 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold">e-Aumark 9T</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xl">✓</span>
                  <span className="font-semibold">80% menos custo por km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xl">✓</span>
                  <span className="font-semibold">Zero emissões</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xl">✓</span>
                  <span className="font-semibold">Torque imediato</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xl">✓</span>
                  <span className="font-semibold">Menos desgaste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 text-xl">✓</span>
                  <span className="font-semibold">Bateria CATL LFP estilo Tesla</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white max-w-3xl mx-auto text-center shadow-2xl">
            <p className="text-2xl font-bold">
              💡 Em operações urbanas, o e-Aumark 9T se paga só com a economia mensal.
            </p>
          </div>
        </div>
      </section>

      {/* Aplicações */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Aplicações</h2>
            <p className="text-xl text-muted-foreground">Versatilidade para qualquer operação</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-industrial-light dark:bg-black border border-border hover:shadow-lg transition-all">
              <Box className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Baú ou Sider</p>
                <p className="text-sm text-muted-foreground">Carga seca geral</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-industrial-light dark:bg-black border border-border hover:shadow-lg transition-all">
              <LifeBuoy className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Auto Socorro</p>
                <p className="text-sm text-muted-foreground">Plataforma reboque</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-industrial-light dark:bg-black border border-border hover:shadow-lg transition-all">
              <Snowflake className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Baú Refrigerado</p>
                <p className="text-sm text-muted-foreground">Alimentos e pharma</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-industrial-light dark:bg-black border border-border hover:shadow-lg transition-all">
              <Wrench className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Cesto Aéreo</p>
                <p className="text-sm text-muted-foreground">Serviços em altura</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-industrial-light dark:bg-black border border-border hover:shadow-lg transition-all">
              <Droplet className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Tanque d'água</p>
                <p className="text-sm text-muted-foreground">Abastecimento urbano</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 rounded-xl bg-industrial-light dark:bg-black border border-border hover:shadow-lg transition-all">
              <Factory className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">Gaiola de gás</p>
                <p className="text-sm text-muted-foreground">Transporte seguro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que Lavoro Foton */}
      <section className="section-padding bg-industrial-dark text-white">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Por que a Lavoro Foton?</h2>
            <p className="text-xl text-gray-300">O parceiro certo para a sua transformação elétrica</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Especialistas em veículos elétricos</h3>
              <p className="text-gray-300">
                Time treinado pela fábrica com engenharia dedicada para orientações técnicas completas.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pós-venda de alto nível</h3>
              <p className="text-gray-300">
                Oficina completa, estoque de peças e atendimento rápido para manter sua operação funcionando.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tradição e confiança</h3>
              <p className="text-gray-300">
                40 anos de credibilidade Castelo Fraga. Experiência que faz a diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        
        <div className="container-lavoro relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              O futuro da sua operação começa agora.
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-white/90">
              Descubra como reduzir custos, aumentar eficiência e modernizar sua frota com zero emissões.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                asChild 
                size="lg" 
                variant="whatsapp"
                className="text-lg px-8"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Falar com Especialista
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-8 bg-white text-green-600 hover:bg-white/90"
              >
                <a href="/contato">
                  Solicitar Proposta
                </a>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white text-white"
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  Agendar Teste
                </a>
              </Button>
            </div>

            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl mx-auto">
              <p className="text-lg italic mb-2">
                "A Lavoro Foton entrega tecnologia, suporte e a confiança de quem conhece caminhões há 40 anos."
              </p>
              <p className="text-sm text-white/80">— Equipe Lavoro Foton</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EAumark9T;