import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingDown, Zap, Battery, Package, Shield, Truck, Wrench, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import iblue6tImg from "@/assets/iblue-6t.jpg";

const IBlue6T = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const whatsappNumber = "5531996970656";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o iBlue 6T.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const galleryImages = [{
    src: iblue6tImg,
    title: "iBlue 6T - Vista Frontal",
    description: "Design moderno com tecnologia elétrica avançada"
  }];

  const handlePrevious = () => {
    setSelectedImage(prev => prev !== null ? prev > 0 ? prev - 1 : galleryImages.length - 1 : null);
  };

  const handleNext = () => {
    setSelectedImage(prev => prev !== null ? prev < galleryImages.length - 1 ? prev + 1 : 0 : null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 🟥 SEÇÃO 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-dark via-industrial-dark/95 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        
        <div className="container-lavoro relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full backdrop-blur-sm animate-fade-in">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-bold text-blue-400 uppercase tracking-wide">
                  100% ELÉTRICO | TECNOLOGIA DE BATERIA CATL LFP
                </span>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent leading-tight">
                  iBlue 6T
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  O caminhão elétrico leve e ágil: <strong className="text-white">3.575 kg de carga</strong>, <strong className="text-white">220 km de autonomia real</strong> e custo operacional até <strong className="text-blue-400">80% menor</strong>. Perfeito para entregas urbanas.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Potência</p>
                  <p className="text-2xl font-bold text-blue-400">64 kW → 115 kW</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Torque</p>
                  <p className="text-2xl font-bold text-blue-400">430 → 920 N.m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Bateria CATL LFP</p>
                  <p className="text-2xl font-bold">81,14 kWh</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Autonomia</p>
                  <p className="text-2xl font-bold">220 km</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="whatsapp" className="text-lg px-8">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Falar com Especialista
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 border-white/20 text-white">
                  <a href="/contato">Solicitar Proposta</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
              <img src={iblue6tImg} alt="iBlue 6T" className="relative z-10 w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SEÇÃO 2 — POR QUE O iBLUE 6T? */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Por que o iBlue 6T?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O caminhão elétrico compacto que une agilidade, economia e tecnologia de ponta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Economia de até 80%</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Reduz o custo por km drasticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Zero gastos com óleo, filtros, correias</span>
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Potência para o trabalho</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>115 kW de potência pico (~156 cv)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>920 N.m de torque máximo</span>
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Battery className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Autonomia real de 220 km</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Rota completa sem preocupação</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Ideal para logística urbana</span>
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Capacidade de 3.575 kg</h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="text-center font-semibold text-foreground">PBT: 6.000 kg</p>
                <p className="text-sm text-center">
                  Perfeito para entregas urbanas, baú, sider e aplicações diversas
                </p>
              </div>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border border-teal-200 dark:border-teal-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Segurança completa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>ABS + ESP + ESC + HSA</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Sensor de ré</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Piloto automático</span>
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border border-emerald-200 dark:border-emerald-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Battery className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Bateria CATL LFP</h3>
              <p className="text-sm text-center text-muted-foreground mb-3">
                (mesma química da Tesla)
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Zero risco térmico</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Vida útil estendida</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>81,14 kWh de capacidade</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SEÇÃO 3 — GALERIA DE FOTOS */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Conheça o iBlue 6T</h2>
            <p className="text-xl text-muted-foreground">Design compacto e tecnologia de ponta</p>
          </div>

          <div className="flex justify-center max-w-3xl mx-auto">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => setSelectedImage(index)}>
                <img src={image.src} alt={image.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
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
              <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].title} className="max-w-full max-h-full object-contain" />

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-300">{galleryImages[selectedImage].description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>

              <button onClick={(e) => { e.stopPropagation(); handlePrevious(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 🟥 SEÇÃO 4 — ESPECIFICAÇÕES TÉCNICAS */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Especificações Técnicas</h2>
            <p className="text-xl text-muted-foreground">Tecnologia de ponta em cada detalhe</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Coluna 1 */}
            <div className="space-y-6 p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">MOTOR</h3>
                <p className="text-lg font-bold">Síncrono de imã permanente, redução simples</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">POTÊNCIA</h3>
                <p className="text-lg font-bold">64 kW (contínua) / 115 kW (pico)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">TORQUE</h3>
                <p className="text-lg font-bold">430 N.m (contínuo) / 920 N.m (pico)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">ENTRE-EIXOS</h3>
                <p className="text-lg font-bold">3.360 mm</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">BATERIA</h3>
                <p className="text-lg font-bold">81,14 kWh (CATL LFP)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">AUTONOMIA</h3>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">220 km</p>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-6 p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">PBT</h3>
                <p className="text-lg font-bold">6.000 kg</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">PESO EM ORDEM DE MARCHA</h3>
                <p className="text-lg font-bold">2.425 kg</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">CARGA ÚTIL</h3>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">3.575 kg</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">TRAÇÃO</h3>
                <p className="text-lg font-bold">4x2</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">PNEUS</h3>
                <p className="text-lg font-bold">205/75 R16</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">CONECTOR</h3>
                <p className="text-lg font-bold">Plug-in CCS2 (AC/DC)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">VOLTAGEM</h3>
                <p className="text-lg font-bold">540V</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">BATERIA AUXILIAR</h3>
                <p className="text-lg font-bold">24V</p>
              </div>
            </div>
          </div>

          {/* Itens de série */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/30">
              <h3 className="text-xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
                Itens de Série
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Volante multifuncional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>ABS + ESP + ESC + HSA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Farol automático</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>MP3 (rádio + USB + Bluetooth)</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Sensor de ré</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Piloto Automático</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Vidro Elétrico</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟥 SEÇÃO 5 — COMPARATIVO: DIESEL vs ELÉTRICO */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Diesel vs Elétrico: A diferença é brutal</h2>
            <p className="text-xl text-muted-foreground">
              Veja quanto você economiza ao escolher o iBlue 6T
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card Diesel */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-2 border-red-300 dark:border-red-800/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">
                  Caminhão Diesel
                </h3>
              </div>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Alto custo por km com combustível</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Manutenção frequente (óleo, filtros)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Ruído e poluição</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Restrições em zonas urbanas</span>
                </li>
              </ul>
            </div>

            {/* Card iBlue 6T */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 border-blue-400 dark:border-blue-600 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  iBlue 6T
                </h3>
              </div>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong>80% menos custo por km</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Zero óleo, filtros, correias</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Zero ruído</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Acesso liberado em zonas restritas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SEÇÃO 6 — IDEAL PARA */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Ideal para</h2>
            <p className="text-xl text-muted-foreground">
              Versatilidade para diversos segmentos e operações
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {["Logística urbana", "Entregas last-mile", "E-commerce", "Food service", "Hortifruti", "Franquias", "Empresas ESG", "Distribuição leve", "Courier"].map((segment, index) => (
              <div key={index} className="p-6 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border hover:border-primary hover:shadow-lg transition-all duration-300 text-center">
                <p className="text-lg font-bold">{segment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟥 SEÇÃO 7 — POR QUE COMPRAR COM A LAVORO FOTON? */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Por que comprar com a Lavoro Foton?</h2>
            <p className="text-xl text-muted-foreground">
              O parceiro certo para a sua transformação elétrica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-industrial-dark border border-border hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Especialistas em veículos elétricos</h3>
              <p className="text-muted-foreground">
                Time treinado pela fábrica com engenharia dedicada para orientações técnicas completas.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white dark:bg-industrial-dark border border-border hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pós-venda de alto nível</h3>
              <p className="text-muted-foreground">
                Oficina completa, estoque de peças e atendimento rápido para manter sua operação funcionando.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white dark:bg-industrial-dark border border-border hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tradição e confiança</h3>
              <p className="text-muted-foreground">
                40 anos de credibilidade. Experiência que faz a diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟩 SEÇÃO 8 — CTA FINAL */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="container-lavoro text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            O próximo passo da sua frota começa aqui
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Conheça o iBlue 6T e descubra como reduzir custos e aumentar eficiência com zero emissões
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Button asChild size="lg" variant="whatsapp" className="text-lg px-8">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Falar com Especialista (WhatsApp)
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white text-primary hover:bg-white/90 border-white">
              <a href="/contato">Solicitar Proposta</a>
            </Button>
          </div>

          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-lg md:text-xl text-white/95 italic mb-4">
              "A Lavoro Foton é referência em Minas Gerais. Nosso compromisso é entregar eficiência, tecnologia e o melhor suporte para sua operação."
            </p>
            <p className="font-bold text-white">— Equipe Lavoro Foton</p>
            <p className="text-sm text-white/80 mt-2">40 anos de tradição</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IBlue6T;
