import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, FileText, TestTube2, Battery, Zap, TrendingDown, Shield, Package, Users, Truck, Leaf, Monitor, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import eviewImg from "@/assets/eview.jpg";
import eviewInteriorCockpit from "@/assets/eview-interior-cockpit.png";
import eviewDimensions from "@/assets/eview-dimensions.png";
import eviewDimensions2 from "@/assets/eview-dimensions-2.png";
import eviewInteriorSeats from "@/assets/eview-interior-seats.png";
import eviewInteriorDashboard from "@/assets/eview-interior-dashboard.png";
const EView = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryImages = [{
    src: eviewInteriorCockpit,
    alt: "Interior premium do e-View Grand",
    title: "Cockpit Premium"
  }, {
    src: eviewDimensions,
    alt: "Dimensões do e-View Grand",
    title: "Dimensões do Veículo"
  }, {
    src: eviewDimensions2,
    alt: "Vista comparativa das dimensões",
    title: "Vista Comparativa"
  }, {
    src: eviewInteriorSeats,
    alt: "Interior e bancos do e-View Grand",
    title: "Interior e Bancos"
  }, {
    src: eviewInteriorDashboard,
    alt: "Painel completo do e-View Grand",
    title: "Painel Completo"
  }];
  const handlePrevious = () => {
    setSelectedImage(prev => prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setSelectedImage(prev => prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1);
  };
  return <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="mt-16 relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={eviewImg} alt="Foton e-View Grand" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative z-10 container-lavoro text-white">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Zap className="w-5 h-5" />
            <span className="font-bold text-sm">⚡ 100% ELÉTRICO | BATERIA CATL LFP (Tecnologia estilo Tesla)</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in max-w-4xl" style={{
          animationDelay: "0.1s"
        }}>
            e-View Grand
          </h1>
          <p className="text-2xl md:text-4xl mb-4 max-w-3xl animate-fade-in font-bold" style={{
          animationDelay: "0.2s"
        }}>
            A van elétrica ideal para entregas urbanas
          </p>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl text-gray-200 animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>
            Até 300 km de autonomia · 7 m³ de carga · cockpit premium · custos até 80% menores
          </p>
          <p className="text-lg mb-8 max-w-2xl text-gray-300 animate-fade-in" style={{
          animationDelay: "0.35s"
        }}>
            130 kW de potência · 330 N.m de torque · 54/77 kWh CATL LFP · 7 m³ de volume
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <Button asChild size="lg" variant="whatsapp" className="text-lg px-8">
              <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
              <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-5 w-5" />
                Solicitar Proposta
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Por Que e-View Grand */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-16 text-center">Por que o e-View Grand?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <TrendingDown className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Economia de até 80%</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Economia mensal real</li>
                <li>• Sem óleo, filtro, correia, injeção</li>
                <li>• Manutenção extremamente baixa</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Potência acima da categoria</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 130 kW (~174 cv)</li>
                <li>• 330 N.m</li>
                <li>• Desempenho superior a vans diesel compactas</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Battery className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Autonomia real de até 300 km</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bateria de 54 kWh ou 77 kWh</li>
                <li>• Autonomia de 230 km a 300 km</li>
                <li>• Perfeito para rotas urbanas de alta demanda</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Package className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">7 m³ de volume útil</h3>
              <p className="text-lg mb-2 font-semibold text-muted-foreground">Dimensões internas:</p>
              <p className="text-sm text-muted-foreground mb-3">3050 × 1750 × 1287 mm</p>
              <p className="text-sm text-muted-foreground">
                Ideal para cargas volumosas, food service, pharma, e-commerce.
              </p>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Monitor className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Cockpit premium</h3>
              <p className="text-sm text-muted-foreground mb-3">Inspirado em carros de luxo</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Central multimídia 12,3" opcional</li>
                <li>• Acabamento superior</li>
                <li>• Painel completo</li>
                <li>• Driving experience de carro de passeio</li>
              </ul>
            </div>

            <div className="card-premium p-8 hover:shadow-xl transition-all">
              <Battery className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3">Bateria CATL LFP</h3>
              <p className="text-sm text-muted-foreground mb-3">(mesma química da Tesla)</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Zero risco térmico</li>
                <li>• Vida útil longa (3.000–5.000 ciclos)</li>
                <li>• Maior fabricante de baterias do mundo</li>
                <li>• Garantia de 8 anos / 400.000 km</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Galeria de Fotos</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => <div key={index} className="card-premium overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(index)}>
                <div className="relative overflow-hidden aspect-video">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                      Clique para ampliar
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-center">{image.title}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Modal de Imagem */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImage !== null && <>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-50 text-white hover:bg-white/20" onClick={() => setSelectedImage(null)}>
                  <X className="h-6 w-6" />
                </Button>

                <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20" onClick={handlePrevious}>
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <div className="flex flex-col items-center justify-center w-full h-full p-8">
                  <img src={galleryImages[selectedImage].src} alt={galleryImages[selectedImage].alt} className="max-w-full max-h-[calc(100%-80px)] object-contain" />
                  <p className="text-white text-lg font-semibold mt-4">
                    {galleryImages[selectedImage].title}
                  </p>
                  <p className="text-white/70 text-sm">
                    {selectedImage + 1} / {galleryImages.length}
                  </p>
                </div>

                <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20" onClick={handleNext}>
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>}
          </div>
        </DialogContent>
      </Dialog>

      {/* Especificações Técnicas */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Especificações</h2>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Motor</span>
              <span className="text-muted-foreground">Síncrono de Ímã Permanente</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Capacidade Técnica Total</span>
              <span className="text-muted-foreground">3.495 kg</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Potência</span>
              <span className="text-muted-foreground">130 kW</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Carga útil</span>
              <span className="text-muted-foreground">1.300 kg</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Torque</span>
              <span className="text-muted-foreground">330 N.m</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Tração</span>
              <span className="text-muted-foreground">4×2</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Entre-eixos</span>
              <span className="text-muted-foreground">3.510 mm</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Pneus</span>
              <span className="text-muted-foreground">215/75R16C</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Bateria</span>
              <span className="text-muted-foreground font-bold">54 kWh / 77 kWh (CATL LFP)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Conector</span>
              <span className="text-muted-foreground">CCS2 (AC/DC)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Autonomia</span>
              <span className="text-muted-foreground font-bold">230 km / 300 km</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-3">
              <span className="font-semibold">Volume de carga</span>
              <span className="text-muted-foreground">7 m³</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tempos de Recarga */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Tempos de Recarga</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="card-premium overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Carregador</th>
                    <th className="text-right p-4 font-semibold">Tempo 0–100%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">AC – 7 kW</td>
                    <td className="text-right p-4 text-muted-foreground">7,8 h / 11 h</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">AC – 11 kW</td>
                    <td className="text-right p-4 text-muted-foreground">4,9 h / 7 h</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">DC – 30 kW</td>
                    <td className="text-right p-4 text-muted-foreground">1,8 h / 2,6 h</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-accent/5">
                    <td className="p-4">DC – 60 kW</td>
                    <td className="text-right p-4 text-muted-foreground">1 h / 1,3 h</td>
                  </tr>
                  <tr className="hover:bg-accent/5">
                    <td className="p-4">DC – 90 kW</td>
                    <td className="text-right p-4 text-muted-foreground font-bold">1 h</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-center">
                <Battery className="inline-block mr-2 h-5 w-5" />
                <span className="font-semibold">Recarregamento rápido</span> com bateria CATL LFP usada pela Tesla China.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diesel vs Elétrico */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Diesel vs Elétrico</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            <div className="card-premium p-8 border-2 border-destructive/20">
              <h3 className="text-2xl font-bold mb-6 text-destructive">Diesel</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• 7–11 km/L</li>
                <li>• R$ 2.200–3.800/mês</li>
                <li>• Manutenção alta</li>
                <li>• Óleo, correias, filtros</li>
                <li>• Ruído e emissões</li>
                <li>• Restrições ambientais</li>
              </ul>
            </div>

            <div className="card-premium p-8 border-2 border-primary">
              <h3 className="text-2xl font-bold mb-6 text-primary">e-View Grand</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• 80% menos custo por km</li>
                <li>• Economia que paga o veículo</li>
                <li>• Zero manutenção pesada</li>
                <li>• Zero ruído</li>
                <li>• Zero emissões</li>
                <li>• Acesso total em ambientes urbanos</li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto p-6 bg-primary text-primary-foreground rounded-lg text-center">
            <p className="text-xl font-bold">
              💡 Em trajetos urbanos, a e-View Grand se paga apenas com a economia de combustível + manutenção.
            </p>
          </div>
        </div>
      </section>

      {/* Ideal Para */}
      <section className="section-padding">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Ideal para</h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {["E-commerce", "Entregas urbanas", "Pharma / laboratório", "Food service", "Hortifruti", "Franquias", "Logística leve", "Serviços técnicos", "Empresas ESG"].map((segment, index) => <div key={index} className="card-premium p-6 text-center hover:border-primary transition-all cursor-default">
                <p className="font-semibold">{segment}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Por que Lavoro Foton */}
      <section className="section-padding bg-industrial-light">
        <div className="container-lavoro">
          <h2 className="mb-12 text-center">Por que comprar com a Lavoro Foton?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-premium p-8 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Atendimento especializado</h3>
              <p className="text-muted-foreground">
                Time treinado pela fábrica e experts em elétricos.
              </p>
            </div>

            <div className="card-premium p-8 text-center">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Pós-venda de alto nível</h3>
              <p className="text-muted-foreground">
                Estrutura completa, peças, técnicos certificados.
              </p>
            </div>

            <div className="card-premium p-8 text-center">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Credibilidade de 40 anos</h3>
              <p className="text-muted-foreground">
                Legado de família.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="mb-6">Transforme sua operação com mobilidade elétrica premium.</h2>
            <p className="text-xl mb-8 opacity-90">
              Descubra como reduzir custos, aumentar eficiência e elevar seu nível ESG.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button asChild size="lg" variant="whatsapp" className="text-lg px-8">
                <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
                <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer">
                  <TestTube2 className="mr-2 h-5 w-5" />
                  Agendar Teste
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white text-white">
                <a href="https://wa.me/553121164735" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-5 w-5" />
                  Solicitar Proposta
                </a>
              </Button>
            </div>

            <div className="card-premium p-8 bg-background/10 backdrop-blur-sm border-white/20">
              <p className="text-lg italic mb-3">
                "A Lavoro Foton combina tradição com inovação para entregar o melhor atendimento e suporte elétrico de Minas Gerais."
              </p>
              <p className="font-semibold">— Equipe Lavoro Foton</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default EView;