import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, CheckCircle2, Phone, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import cumminsLogo from "@/assets/cummins-logo-icon.png";
import zfLogo from "@/assets/zf-logo-icon.png";
import boschLogo from "@/assets/bosch-logo-icon.png";
import danaLogo from "@/assets/dana-logo-icon.png";
import dealershipImage from "@/assets/dealership.jpg";
import timelineContexto from "@/assets/timeline-contexto-historico.png";
import timelineHistoria from "@/assets/timeline-historia-lavoro.png";
import casteloFragaMercedes from "@/assets/castelo-fraga-mercedes.png";
import lavoro40Years from "@/assets/lavoro-40-years.png";
import globalPartnershipIcon from "@/assets/global-partnership-icon.png";
import lavoroLogoIcon from "@/assets/lavoro-logo-icon.png";
import experienceIcon from "@/assets/experience-icon.png";
import globalEngineeringIcon from "@/assets/global-engineering-icon.png";
import localServiceIcon from "@/assets/local-service-icon.png";
import relacionamentoDiretoIcon from "@/assets/relacionamento-direto-icon.png";
import suportePosVendaIcon from "@/assets/suporte-pos-venda-icon.png";
import marketplaceHonestoIcon from "@/assets/marketplace-honesto-icon.png";
import atendimentoTecnicoIcon from "@/assets/atendimento-tecnico-icon.png";
import caminhõesRobustosIcon from "@/assets/caminhoes-robustos-icon.png";
import atendimentoMineiroIcon from "@/assets/atendimento-mineiro-icon.png";
import atendimentoProximoMineiroIcon from "@/assets/atendimento-proximo-mineiro-icon.png";
const QuemSomos = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const timelineImages = [{
    src: timelineContexto,
    alt: "Contexto histórico da indústria automotiva brasileira",
    title: "Contexto Histórico (Brasil)"
  }, {
    src: timelineHistoria,
    alt: "História da Lavoro desde 1974",
    title: "História Lavoro"
  }, {
    src: casteloFragaMercedes,
    alt: "Castelo Fraga em convenção Mercedes-Benz",
    title: "Castelo Fraga - Mercedes-Benz"
  }];
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/5531999999999", "_blank");
  };
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };
  return <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Quem é a Lavoro
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compromisso com a excelência, tradição no transporte e um novo capítulo com a Foton.
          </p>
        </div>
      </section>

      {/* Seção 1 - Nossa História */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Nossa História</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Timeline Card 1 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <img src={lavoro40Years} alt="Lavoro 40 Anos" className="w-20 h-20 object-contain mb-6 mx-auto" />
              <h3 className="text-2xl font-bold text-center mb-4 text-foreground">1984–2020</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                40 anos liderando operações Mercedes-Benz como CEO do Grupo VDL
              </p>
            </div>

            {/* Timeline Card 2 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <img src={globalPartnershipIcon} alt="Legado Global" className="w-20 h-20 object-contain mb-6 mx-auto" />
              <h3 className="text-2xl font-bold text-center mb-4 text-foreground">Legado</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                27 prêmios StarClass — recorde dentro da Mercedes-Benz Brasil
              </p>
            </div>

            {/* Timeline Card 3 */}
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <img src={lavoroLogoIcon} alt="Lavoro Foton" className="w-20 h-20 object-contain mb-6 mx-auto" />
              <h3 className="text-2xl font-bold text-center mb-4 text-foreground">2020</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                Fundação da Lavoro Foton — um novo capítulo
              </p>
            </div>
          </div>

          {/* Timeline Visual - Carrossel */}
          <div className="my-20">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {timelineImages.map((image, index) => <CarouselItem key={index}>
                    <div className="relative group">
                      <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-card">
                        <img src={image.src} alt={image.alt} className="w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]" onClick={() => openLightbox(index)} />
                      </div>
                      <button onClick={() => openLightbox(index)} className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background" aria-label="Expandir imagem">
                        <Maximize2 className="w-5 h-5 text-foreground" />
                      </button>
                    </div>
                    <p className="text-center mt-4 text-sm text-muted-foreground">{image.title}</p>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
            
            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-6">
              {timelineImages.map((_, index) => <div key={index} className="w-2 h-2 rounded-full bg-muted transition-colors" />)}
            </div>
          </div>

          {/* Lightbox Modal */}
          <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-transparent">
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={timelineImages[selectedImage].src} alt={timelineImages[selectedImage].alt} className="max-w-full max-h-[95vh] object-contain rounded-lg" />
              </div>
            </DialogContent>
          </Dialog>

          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              A <strong className="text-foreground font-semibold">Lavoro Foton</strong> foi fundada em 2020 por <strong className="text-foreground font-semibold">Orosimar Valentim Fraga — Castelo Fraga</strong>, 
              um dos nomes mais respeitados na história do transporte em Minas Gerais.
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Antes da Lavoro, Castelo dedicou mais de 40 anos ao setor automotivo, 
              liderando operações Mercedes-Benz como CEO do Grupo VDL (1984–2020).
            </p>
            
            <div className="bg-muted/30 rounded-2xl p-10 my-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground text-center">
                Sob sua liderança, o grupo alcançou:
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-foreground">R$ 1,5 bilhão/ano em faturamento</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-foreground">+ de 20 concessionárias Mercedes-Benz e Toyota operando simultaneamente</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-foreground">+ de 87 mil veículos vendidos</p>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-foreground">+ de 27 prêmios StarClass (recorde dentro da Mercedes-Benz Brasil)</p>
                </div>
              </div>
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Castelo encerrou sua passagem no grupo em 2020, iniciando ali um novo capítulo: <strong className="text-foreground font-semibold">a Lavoro Foton</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 2 - Por que a Foton? */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Por que a Foton?</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Após vender suas operações Mercedes-Benz, Castelo decidiu iniciar uma nova fase.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              A escolha pela Foton foi técnica, estratégica e alinhada ao futuro da indústria.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              O setor automotivo mundial entrou oficialmente na <strong className="text-foreground font-semibold">Era Chinesa</strong> — 
              e marcas como Foton e BYD hoje lideram eficiência, tecnologia e produção global.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-medium">
              Castelo viu na Foton:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Qualidade mecânica real</h3>
              <p className="text-muted-foreground">Engenharia robusta e confiável</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 p-2">
                <img src={cumminsLogo} alt="Cummins" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Motores Cummins</h3>
              <p className="text-muted-foreground">Potência e durabilidade</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 p-2">
                <img src={zfLogo} alt="ZF" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Caixas de transmissão ZF</h3>
              <p className="text-muted-foreground">Eficiência premium</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 p-2">
                <img src={boschLogo} alt="Bosch" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Componentes Bosch</h3>
              <p className="text-muted-foreground">Tecnologia de ponta</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 p-2">
                <img src={danaLogo} alt="Dana" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Componentes Dana</h3>
              <p className="text-muted-foreground">Alta performance</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Engenharia global</h3>
              <p className="text-muted-foreground">Montagem já no Brasil</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              A Foton representa a nova vanguarda da manufatura mundial — 
              E a <strong className="text-foreground font-semibold">Lavoro</strong> escolheu estar ao lado de quem está puxando o mercado para frente.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 3 - Nosso Compromisso */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Nosso Compromisso</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Na Lavoro Foton, seguimos um princípio simples:
            </p>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              entregar mais valor ao cliente, sempre.
            </p>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl font-semibold mb-8 text-foreground text-center">
              Acreditamos em:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <img src={relacionamentoDiretoIcon} alt="Relacionamento direto" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Relacionamento direto</h3>
                    <p className="text-muted-foreground">Humano e transparente</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <img src={atendimentoTecnicoIcon} alt="Atendimento técnico" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Atendimento técnico</h3>
                    <p className="text-muted-foreground">Baseado na engenharia e na boa prática</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <img src={suportePosVendaIcon} alt="Suporte pós-venda real" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Suporte pós-venda real</h3>
                    <p className="text-muted-foreground">Presente quando você precisar</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <img src={caminhõesRobustosIcon} alt="Caminhões robustos" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Caminhões robustos</h3>
                    <p className="text-muted-foreground">Eficientes e acessíveis</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <img src={atendimentoProximoMineiroIcon} alt="Atendimento próximo e mineiro" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Atendimento próximo e mineiro</h3>
                    <p className="text-muted-foreground">Confiança em primeiro lugar</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex items-start gap-4">
                  <img src={marketplaceHonestoIcon} alt="Marketplace honesto" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Um marketplace honesto</h3>
                    <p className="text-muted-foreground">Profissional e responsável</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              O foco é um só: <strong className="text-foreground font-semibold">resolver o dia a dia do transportador</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 4 - Nova Concessionária */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-5 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-semibold text-sm uppercase tracking-wide">Em breve</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Estamos de mudança para uma NOVA casa.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                As obras da nova concessionária Lavoro Foton já estão em fase de preparação 
                e serão iniciadas em breve.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                Será uma estrutura moderna, ampla e preparada para:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">Atendimento mais rápido</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">Oficina completa</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">Estoque de peças maior</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">Espaço premium para clientes</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">Estrutura para caminhões elétricos e energias renováveis</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">Áreas de demonstração, test-drive e pós-venda estratégico</p>
                </div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-8">
                Um passo importante para acompanhar o crescimento da Foton no Brasil 
                e entregar ainda mais qualidade ao mercado mineiro.
              </p>
            </div>

            <div className="relative">
              <img src={dealershipImage} alt="Nova concessionária Lavoro Foton" className="rounded-2xl shadow-2xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção 5 - Nosso Propósito */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">Nosso Propósito</h2>
            <p className="text-2xl md:text-3xl font-bold text-primary mb-12">
              Servir o transportador com inteligência, respeito e tecnologia.
            </p>
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 border-4 border-primary/20 shadow-lg">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-10 text-center">
              A <strong className="font-bold">Lavoro Foton</strong> nasceu para unir:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <img src={experienceIcon} alt="Experiência de décadas" className="w-20 h-20 object-contain mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">A experiência de décadas</h3>
              </div>
              <div className="text-center">
                <img src={globalEngineeringIcon} alt="Nova engenharia global" className="w-20 h-20 object-contain mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">A nova engenharia global</h3>
              </div>
              <div className="text-center">
                <img src={atendimentoMineiroIcon} alt="Atendimento próximo e mineiro" className="w-20 h-20 object-contain mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">O atendimento próximo e mineiro</h3>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              Criando uma concessionária que coloca o cliente no centro de tudo 
              e trabalha todos os dias para entregar resultado, não discurso.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 6 - CTA Final */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
            A Lavoro Foton é a continuação de uma história construída com seriedade.
          </h2>
          <Button size="lg" variant="secondary" onClick={handleWhatsAppContact} className="text-lg md:text-xl px-10 py-7 h-auto font-semibold">
            <Phone className="w-6 h-6 mr-3" />
            Fale conosco
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default QuemSomos;