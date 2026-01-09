import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TrendingDown, Zap, Battery, Package, Shield, Truck, Wrench, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import eaumarkFrontalImg from "@/assets/eaumark-9t-frontal.png";
import eaumarkLateralImg from "@/assets/eaumark-9t-lateral.png";
import eaumarkInteriorImg from "@/assets/eaumark-9t-interior.png";
import eaumarkChassisImg from "@/assets/eaumark-9t-chassis.webp";
const EAumark9T = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const whatsappNumber = "5531996970656";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre o e-Aumark 9T.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const galleryImages = [{
    src: eaumarkFrontalImg,
    title: "e-Aumark 9T - Vista Frontal",
    description: "Design moderno com grade distintiva e tecnologia elétrica"
  }, {
    src: eaumarkLateralImg,
    title: "e-Aumark 9T - Vista Lateral",
    description: "Design robusto e profissional com baú para operações exigentes"
  }, {
    src: eaumarkInteriorImg,
    title: "Interior Premium",
    description: "Cabine confortável com painel digital e acabamento moderno"
  }];
  const handlePrevious = () => {
    setSelectedImage(prev => prev !== null ? prev > 0 ? prev - 1 : galleryImages.length - 1 : null);
  };
  const handleNext = () => {
    setSelectedImage(prev => prev !== null ? prev < galleryImages.length - 1 ? prev + 1 : 0 : null);
  };
  return <div className="min-h-screen">
      <Navbar />

      {/* 🟥 SEÇÃO 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-industrial-dark via-industrial-dark/95 to-black text-white overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
        
        <div className="container-lavoro relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              {/* Badge superior */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full backdrop-blur-sm animate-fade-in">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-bold text-green-400 uppercase tracking-wide">
                  100% ELÉTRICO | TECNOLOGIA DE BATERIA ESTILO TESLA (CATL LFP)
                </span>
              </div>

              {/* Título e subtítulo */}
              <div>
                <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-green-100 to-green-400 bg-clip-text text-transparent leading-tight">
                  e-Aumark 9T
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  O caminhão elétrico mais versátil do Brasil: <strong className="text-white">5.550 kg de carga</strong>, <strong className="text-white">200 km de autonomia real</strong> e custo operacional até <strong className="text-green-400">80% menor</strong>. Perfeito para frotas urbanas e operações regionais.
                </p>
              </div>

              {/* Linha de specs rápidas */}
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
                  <p className="text-sm text-gray-400 mb-1">Bateria CATL LFP</p>
                  <p className="text-2xl font-bold">100,46 kWh</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Garantia</p>
                  <p className="text-2xl font-bold">6 anos / 300.000 km</p>
                </div>
              </div>

              {/* CTAs */}
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

            {/* Right: Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <img src={eaumarkFrontalImg} alt="e-Aumark 9T" className="relative z-10 w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SEÇÃO 2 — POR QUE O e-AUMARK 9T? */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Por que o e-Aumark 9T?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              O caminhão elétrico que une força profissional, economia extrema e tecnologia de ponta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 — Economia de até 80% */}
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
                  <span>Zero gastos com óleo, filtros, correias e injeção</span>
                </li>
              </ul>
            </div>

            {/* Card 2 — Potência real para trabalho */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Potência real para trabalho</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>150 kW de potência pico (~200 cv)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>560 N.m garantem força mesmo carregada</span>
                </li>
              </ul>
            </div>

            {/* Card 3 — Autonomia real de 200 km */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border border-purple-200 dark:border-purple-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Battery className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Autonomia real de 200 km</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Rota cheia sem ansiedade</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>Ideal para logística urbana e middle-mile</span>
                </li>
              </ul>
            </div>

            {/* Card 4 — Capacidade profissional 5.550 kg */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200 dark:border-orange-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Capacidade de 5.550 kg</h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="text-center font-semibold text-foreground">PBT: 8.500 kg</p>
                <p className="text-sm text-center">
                  Perfeito para qualquer implemento: baú, sider, refrigerado, socorro, tanque, cesto aéreo, gaiola de gás
                </p>
              </div>
            </div>

            {/* Card 5 — Segurança premium */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 border border-teal-200 dark:border-teal-800/30 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Segurança premium</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>ABS + EBD</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Arquitetura com bateria centralizada</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Menor centro de gravidade</span>
                </li>
              </ul>
            </div>

            {/* Card 6 — Bateria CATL LFP */}
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
                  <span>Garantia de 6 anos / 300.000 km</span>
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
            <h2 className="mb-4">Conheça o e-Aumark 9T</h2>
            <p className="text-xl text-muted-foreground">Design robusto e tecnologia de ponta</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {galleryImages.map((image, index) => <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => setSelectedImage(index)}>
                <img src={image.src} alt={image.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Dialog para visualização em tela cheia */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
          {selectedImage !== null && <div className="relative w-full h-full flex items-center justify-center">
              {/* Imagem */}
              <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].title} className="max-w-full max-h-full object-contain" />

              {/* Informações */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="text-gray-300">{galleryImages[selectedImage].description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>

              {/* Botões de navegação */}
              <button onClick={e => {
            e.stopPropagation();
            handlePrevious();
          }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button onClick={e => {
            e.stopPropagation();
            handleNext();
          }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Botão fechar */}
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>}
        </DialogContent>
      </Dialog>

      {/* 🟥 SEÇÃO 4 — ESPECIFICAÇÕES TÉCNICAS */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Especificações Técnicas</h2>
            <p className="text-xl text-muted-foreground">Tecnologia de ponta em cada detalhe</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Coluna 1 */}
            <div className="space-y-6 p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">MOTOR</h3>
                <p className="text-lg font-bold">Síncrono de Ímã Permanente</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">POTÊNCIA</h3>
                <p className="text-lg font-bold">75 kW (contínua) / 150 kW (pico)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">TORQUE</h3>
                <p className="text-lg font-bold">250 N.m (contínuo) / 560 N.m (pico)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">ENTRE-EIXOS</h3>
                <p className="text-lg font-bold">3.360 mm</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">BATERIA</h3>
                <p className="text-lg font-bold">100,46 kWh (CATL LFP)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">AUTONOMIA</h3>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">200 km (real)</p>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-6 p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  CAPACIDADE TÉCNICA TOTAL (PBT)
                </h3>
                <p className="text-lg font-bold">8.500 kg</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">CARGA ÚTIL</h3>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">5.550 kg</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">CONECTOR</h3>
                <p className="text-lg font-bold">CCS2 (AC/DC)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">VOLTAGEM</h3>
                <p className="text-lg font-bold">540V</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">GARANTIA</h3>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  6 anos / 300.000 km
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">PESO EM ORDEM DE MARCHA</h3>
                <p className="text-lg font-bold">2.950 kg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟥 SEÇÃO 5 — TEMPOS DE RECARGA */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Tempos de Recarga</h2>
            <p className="text-xl text-muted-foreground">
              Carregamento rápido para manter sua operação sempre ativa
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Carregador</th>
                    <th className="px-6 py-4 text-left font-bold">Tempo 0–100%</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-industrial-dark divide-y divide-border">
                  <tr className="hover:bg-industrial-light dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">AC – 7 kW</td>
                    <td className="px-6 py-4">14h</td>
                  </tr>
                  <tr className="hover:bg-industrial-light dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">AC – 11 kW</td>
                    <td className="px-6 py-4">9h</td>
                  </tr>
                  <tr className="hover:bg-industrial-light dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">DC – 30 kW</td>
                    <td className="px-6 py-4">3,3h</td>
                  </tr>
                  <tr className="hover:bg-industrial-light dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">DC – 60 kW</td>
                    <td className="px-6 py-4">1,7h</td>
                  </tr>
                  <tr className="hover:bg-industrial-light dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">DC – 90 kW</td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">
                      1,1h
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Box especial */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800/30">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔋</div>
                <p className="text-foreground">
                  <strong>Carregamento ultrarrápido</strong>, tecnologia de bateria semelhante à
                  Tesla (CATL LFP) — garantindo durabilidade, segurança e performance superior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟥 SEÇÃO 6 — COMPARATIVO: DIESEL vs ELÉTRICO */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Diesel vs Elétrico: A diferença é brutal</h2>
            <p className="text-xl text-muted-foreground">
              Veja quanto você economiza ao escolher o e-Aumark 9T
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card Diesel (vermelho) */}
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
                  <span>6–10 km/L</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>R$ 2.800 a R$ 5.000/mês em combustível</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Manutenção pesada (óleo, filtros, injeção)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Ruído e poluição</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Restrições urbanas</span>
                </li>
              </ul>
            </div>

            {/* Card e-Aumark 9T (primary/verde) */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-400 dark:border-green-600 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                  e-Aumark 9T
                </h3>
              </div>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>80% menos custo por km</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Economia mensal gigantesca</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Zero óleo, filtros, correias</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Zero ruído</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Acesso liberado em zonas restritas</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Box destaque */}
          <div className="mt-12 max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <p className="text-lg text-foreground">
                <strong>Em muitas operações, um e-Aumark 9T se paga apenas com a economia mensal
                de combustível + manutenção.</strong> O investimento inicial é rapidamente
                recuperado através da redução de custos operacionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SEÇÃO 7 — IDEAL PARA */}
      <section className="section-padding bg-industrial-light dark:bg-black">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Ideal para</h2>
            <p className="text-xl text-muted-foreground">
              Versatilidade para diversos segmentos e operações
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {["Logística urbana", "Middle-mile", "Transferências regionais", "Pharma", "E-commerce", "Food service", "Hortifruti", "Franquias", "Empresas ESG"].map((segment, index) => <div key={index} className="p-6 rounded-2xl bg-white dark:bg-industrial-dark border border-border hover:border-primary hover:shadow-lg transition-all duration-300 text-center">
                <p className="text-lg font-bold">{segment}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* 🟥 SEÇÃO 8 — POR QUE COMPRAR COM A LAVORO FOTON? */}
      <section className="section-padding bg-white dark:bg-industrial-dark">
        <div className="container-lavoro">
          <div className="text-center mb-16">
            <h2 className="mb-4">Por que comprar com a Lavoro Foton?</h2>
            <p className="text-xl text-muted-foreground">
              O parceiro certo para a sua transformação elétrica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Especialistas em veículos elétricos</h3>
              <p className="text-muted-foreground">
                Time treinado pela fábrica com engenharia dedicada para orientações técnicas
                completas.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Pós-venda de alto nível</h3>
              <p className="text-muted-foreground">
                Oficina completa, estoque de peças e atendimento rápido para manter sua operação
                funcionando.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-industrial-light dark:bg-white/5 border border-border hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tradição e confiança</h3>
              <p className="text-muted-foreground">
                40 anos de credibilidade. 
Experiência que faz a diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟩 SEÇÃO 9 — CTA FINAL */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="container-lavoro text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            O próximo passo da sua frota começa aqui
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Conheça o e-Aumark 9T e descubra como reduzir custos e aumentar eficiência com zero
            emissões
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

          {/* Depoimento */}
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-lg md:text-xl text-white/95 italic mb-4">
              "A Lavoro Foton é referência em Minas Gerais. Nosso compromisso é entregar
              eficiência, tecnologia e o melhor suporte para sua operação."
            </p>
            <p className="font-bold text-white">— Equipe Lavoro Foton</p>
            <p className="text-sm text-white/80 mt-2">40 anos de tradição</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default EAumark9T;