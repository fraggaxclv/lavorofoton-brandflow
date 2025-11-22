import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  FileText,
  Mountain
} from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import tunlandV7Photo1 from "@/assets/tunland-v7-photo-1.jpeg";
import tunlandV7Photo2 from "@/assets/tunland-v7-photo-2.jpeg";
import tunlandV7Photo3 from "@/assets/tunland-v7-photo-3.jpeg";
import tunlandV7Photo4 from "@/assets/tunland-v7-photo-4.jpeg";
import tunlandV7Photo5 from "@/assets/tunland-v7-photo-5.jpeg";
import tunlandV7Photo6 from "@/assets/tunland-v7-photo-6.jpeg";
import tunlandV7Photo7 from "@/assets/tunland-v7-photo-7.jpeg";
import tunlandV7Photo8 from "@/assets/tunland-v7-photo-8.jpeg";
import tunlandV7Photo9 from "@/assets/tunland-v7-photo-9.png";
import tunlandV7Photo10 from "@/assets/tunland-v7-photo-10.jpeg";
import iconAcabamento from "@/assets/icon-acabamento.png";
import iconIsolamento from "@/assets/icon-isolamento.png";
import icon360 from "@/assets/icon-360.png";
import icon20Maior from "@/assets/icon-20-maior.png";
import iconBancosPremium from "@/assets/icon-bancos-premium.png";
import iconTecnologia from "@/assets/icon-tecnologia.png";
import iconRobustez from "@/assets/icon-robustez.png";
import icon10AnosGarantia from "@/assets/icon-10-anos-garantia.png";
import iconConfortoLuxo from "@/assets/icon-conforto-luxo.png";
import iconTecnologiaExtrema from "@/assets/icon-tecnologia-extrema.png";
import iconAcabamentoLuxo from "@/assets/icon-acabamento-luxo.png";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import garantiaFabricaFotonIcon from "@/assets/garantia-3anos-foton.png";
import tecnologiaGlobalIcon from "@/assets/tecnologia-global-icon.png";
import concessionariasIcon from "@/assets/70-concessionarias-icon.png";
import centroLogisticoIcon from "@/assets/centro-logistico-icon.png";
import fillRateIcon from "@/assets/fill-rate-icon.png";
import aprovacaoClientesIcon from "@/assets/aprovacao-clientes-icon.png";

const TunlandV7 = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [
    { src: tunlandV7Photo1, alt: "Foton Tunland V7 - Imagem 1", caption: "Tunland V7 - Robustez e Confiabilidade" },
    { src: tunlandV7Photo2, alt: "Foton Tunland V7 - Imagem 2", caption: "Interior Confortável" },
    { src: tunlandV7Photo3, alt: "Foton Tunland V7 - Imagem 3", caption: "Design Robusto" },
    { src: tunlandV7Photo4, alt: "Foton Tunland V7 - Imagem 4", caption: "Vista Lateral" },
    { src: tunlandV7Photo5, alt: "Foton Tunland V7 - Imagem 5", caption: "Detalhes Externos" },
    { src: tunlandV7Photo6, alt: "Foton Tunland V7 - Imagem 6", caption: "Preparada para o Trabalho" },
    { src: tunlandV7Photo7, alt: "Foton Tunland V7 - Imagem 7", caption: "Acabamento Refinado" },
    { src: tunlandV7Photo8, alt: "Foton Tunland V7 - Imagem 8", caption: "Potência e Durabilidade" },
    { src: tunlandV7Photo9, alt: "Foton Tunland V7 - Imagem 9", caption: "Especificações Técnicas" },
    { src: tunlandV7Photo10, alt: "Foton Tunland V7 - Imagem 10", caption: "Versatilidade Profissional" }
  ];

  const whatsappNumber = "5531211647335";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre a Foton Tunland V7.");

  const handleWhatsApp = () => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  const handleQuoteClick = () => document.getElementById('cta-final')?.scrollIntoView({ behavior: 'smooth' });
  const openLightbox = (index: number) => { setCurrentImageIndex(index); setLightboxOpen(true); };
  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % productImages.length);
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + productImages.length) % productImages.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">Foton Tunland V7</h1>
                <p className="text-2xl md:text-3xl text-gray-200 font-light">
                  A picape que une <span className="text-primary font-semibold">conforto</span>, <span className="text-primary font-semibold">tecnologia</span> e <span className="text-primary font-semibold">robustez</span> para o trabalho pesado.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" /><span className="text-lg">Suspensão de feixes de molas - ideal para trabalho duro</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" /><span className="text-lg">Tecnologia 360° + assistências ADAS</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" /><span className="text-lg">Acabamento premium - robustez de caminhão</span></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-7 h-auto shadow-2xl"><MessageSquare className="mr-2 h-6 w-6" />Falar com um consultor</Button>
                <Button onClick={handleQuoteClick} size="lg" variant="outline" className="border-2 border-white text-white text-lg px-10 py-7 h-auto bg-blue-900/50 hover:bg-blue-800 backdrop-blur-sm shadow-xl">Solicitar Proposta</Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <img src={tunlandV7Photo1} alt="Foton Tunland V7" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: DESTAQUES */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Destaques da Tunland V7</h2>
            <p className="text-gray-600 text-lg mt-4">Conheça os principais diferenciais que fazem da Tunland V7 a escolha ideal para o seu trabalho.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* DESTAQUE 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-blue-50 rounded-full mb-4">
                <img src={iconTecnologia} alt="Tecnologia" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Tecnologia Avançada</h3>
              <p className="text-gray-500">Equipada com recursos de última geração para maior segurança e conforto.</p>
            </div>

            {/* DESTAQUE 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-green-50 rounded-full mb-4">
                <img src={iconRobustez} alt="Robustez" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Robustez Imbatível</h3>
              <p className="text-gray-500">Construída para enfrentar qualquer desafio, garantindo durabilidade e confiabilidade.</p>
            </div>

            {/* DESTAQUE 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-50 rounded-full mb-4">
                <img src={iconAcabamento} alt="Acabamento Premium" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Acabamento Premium</h3>
              <p className="text-gray-500">Interior refinado que proporciona conforto e bem-estar em cada jornada.</p>
            </div>

            {/* DESTAQUE 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-yellow-50 rounded-full mb-4">
                <img src={icon10AnosGarantia} alt="Garantia de 10 Anos" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Garantia de 3 Anos</h3>
              <p className="text-gray-500">Tenha mais tranquilidade com a nossa garantia de fábrica de 3 anos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: GALERIA DE IMAGENS */}
      <section className="py-12 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Galeria de Imagens</h2>
            <p className="text-gray-600 text-lg mt-4">Explore a Tunland V7 em detalhes e descubra tudo o que ela tem para oferecer.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {productImages.map((image, index) => (
              <div key={index} className="cursor-pointer" onClick={() => openLightbox(index)}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-md hover:opacity-90 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>

          {/* LIGHTBOX */}
          <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
            <DialogContent className="bg-black/80 text-white max-w-4xl mx-auto rounded-lg p-6 relative">
              <DialogClose className="absolute top-4 right-4 rounded-full p-1 bg-gray-700 hover:bg-gray-600">
                <X className="w-6 h-6" />
              </DialogClose>
              <img src={productImages[currentImageIndex].src} alt={productImages[currentImageIndex].alt} className="w-full max-h-[70vh] object-contain rounded-md" />
              <p className="text-center mt-4">{productImages[currentImageIndex].caption}</p>
              <div className="flex justify-between mt-4">
                <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={prevImage}><ChevronLeft className="w-5 h-5 mr-2" />Anterior</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={nextImage}>Próxima<ChevronRight className="w-5 h-5 ml-2" /></Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* SECTION: TECNOLOGIA E SEGURANÇA */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tecnologia e Segurança</h2>
              <p className="text-gray-600 text-lg mb-8">A Tunland V7 oferece o que há de mais moderno em tecnologia e segurança para garantir a sua tranquilidade e eficiência no trabalho.</p>
              <ul className="list-none space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Sistema de assistência ao condutor (ADAS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Câmera 360° para manobras seguras</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Central multimídia com tela touchscreen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Controles de estabilidade e tração</span>
                </li>
              </ul>
            </div>
            <div>
              <img src={tunlandV7Photo5} alt="Tecnologia e Segurança" className="w-full rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CONFORTO E ACABAMENTO */}
      <section className="py-12 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src={tunlandV7Photo7} alt="Conforto e Acabamento" className="w-full rounded-2xl shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Conforto e Acabamento</h2>
              <p className="text-gray-600 text-lg mb-8">Desfrute de um interior projetado para o seu conforto, com materiais de alta qualidade e acabamento impecável.</p>
              <ul className="list-none space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Bancos revestidos em couro premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Ar-condicionado automático digital</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Amplo espaço interno para passageiros e carga</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Sistema de som de alta fidelidade</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ROBUSTEZ E DESEMPENHO */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Robustez e Desempenho</h2>
              <p className="text-gray-600 text-lg mb-8">A Tunland V7 é equipada com um motor potente e suspensão reforçada, garantindo o desempenho necessário para o trabalho pesado.</p>
              <ul className="list-none space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Motor Cummins 2.8L Turbo Diesel</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Transmissão manual de 6 marchas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Suspensão de feixe de molas para maior capacidade de carga</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg text-gray-700">Tração 4x4 com reduzida</span>
                </li>
              </ul>
            </div>
            <div>
              <img src={tunlandV7Photo6} alt="Robustez e Desempenho" className="w-full rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ESPECIFICAÇÕES TÉCNICAS */}
      <section className="py-12 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Especificações Técnicas</h2>
            <p className="text-gray-600 text-lg mt-4">Confira as especificações técnicas da Tunland V7 e descubra todos os detalhes que fazem dela a picape ideal para você.</p>
          </div>
          <img src={tunlandV7Photo9} alt="Especificações Técnicas" className="w-full rounded-2xl shadow-lg" />
        </div>
      </section>

      {/* CTA - FINAL */}
      <section id="cta-final" className="py-12 md:py-24 bg-gradient-to-r from-industrial-dark to-industrial-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Gostou da Tunland V7?</h2>
          <p className="text-lg mb-8">Entre em contato conosco e solicite uma proposta personalizada.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleWhatsApp} size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg px-10 py-7 h-auto shadow-2xl"><MessageSquare className="mr-2 h-6 w-6" />Falar com um consultor</Button>
            <Button onClick={handleQuoteClick} size="lg" variant="outline" className="border-2 border-white text-white text-lg px-10 py-7 h-auto bg-blue-900/50 hover:bg-blue-800 backdrop-blur-sm shadow-xl">Solicitar Proposta</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TunlandV7;
