import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import heroTruckMobile from "@/assets/hero-lavoro-bh.png";
import heroTruckDesktop from "@/assets/hero-lavoro-desktop.png";
import { Search, CreditCard, Handshake, Settings, Package, Building2 } from "lucide-react";
import iconeFotonGlobal from "@/assets/icone-foton-global.png";
import icone12Milhoes from "@/assets/icone-12milhoes.png";
import iconeCumminsZf from "@/assets/icone-cummins-zf.png";
import iconeDaimlerBenz from "@/assets/icone-daimler-benz.png";
import icone200Porcento from "@/assets/icone-200-porcento.png";
import logoCoopmetro from "@/assets/logo-coopmetro.png";
import logoRoodacoop from "@/assets/logo-roodacoop.png";
import logoZeroCarbon from "@/assets/logo-zero-carbon.png";
import logoTransflau from "@/assets/logo-transflau.png";

/* ─── BLOCO 1 — Banner de urgência (componente isolado) ─── */
const BannerUrgencia = () => (
  <div className="w-full bg-[hsl(38,80%,25%)] text-white text-center text-xs md:text-sm py-2 px-4 z-[60] relative">
    ⚠️ Taxa 0% com condições especiais via Santander — válida por tempo limitado. Consulte disponibilidade.
  </div>
);

/* ─── Model Card V2 ─── */
interface ModelCardV2Props {
  name: string;
  description: string;
  tags?: string[];
  link: string;
  secondaryLink?: { label: string; to: string };
  badge?: string;
}

const ModelCardV2 = ({ name, description, tags, link, secondaryLink, badge }: ModelCardV2Props) => (
  <div className="bg-card border border-border rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-primary/40">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-lg font-bold text-foreground">{name}</h4>
        {badge && (
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider bg-muted text-muted-foreground">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-medium border-primary/30 text-primary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
    <div className="flex flex-col gap-1">
      <Link
        to={link}
        className="inline-block text-center bg-primary text-primary-foreground px-5 py-2.5 rounded text-sm font-semibold hover:bg-[hsl(var(--primary-dark))] transition-all"
      >
        Ver detalhes
      </Link>
      {secondaryLink && (
        <Link to={secondaryLink.to} className="text-xs text-muted-foreground hover:text-primary transition-colors text-center mt-1">
          {secondaryLink.label}
        </Link>
      )}
    </div>
  </div>
);

const HomeV2 = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── BLOCO 1 — HERO ─── */}
      <section className="relative h-[85vh] md:h-screen flex flex-col mt-16 overflow-hidden">
        <BannerUrgencia />
        {/* Background images */}
        <img
          src={heroTruckMobile}
          alt="Foton Lavoro - Concessionária em Belo Horizonte"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[35%_center] md:hidden"
        />
        <img
          src={heroTruckDesktop}
          alt="Foton Lavoro - Concessionária em Belo Horizonte"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        />
        <div className="absolute inset-0 bg-black/70 md:bg-gradient-to-r md:from-black md:via-black/90 md:to-black/50" />

        {/* Hero content */}
        <div className="flex-1 flex items-end relative z-10">
          <div className="container-lavoro pb-12 md:pb-20 px-6 md:px-4 w-full">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white mb-2 animate-fade-in">
              LAVORO
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-white/90 mb-0 leading-snug">
              Sua Concessionária
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white mb-1 animate-fade-in">
              FOTON
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90 mb-4">
              em Belo Horizonte e Minas Gerais.
            </p>
            <p className="text-sm md:text-base text-white/70 mb-8 max-w-xl">
              Motor Cummins. Caixa ZF. Presente em 110 países. Aqui do seu lado, em Minas Gerais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Link to="/modelos" className="btn-primary-large text-center shadow-2xl">
                Ver Modelos
              </Link>
              <a
                href="https://wa.me/5531996970656?text=Olá, vim pelo site e quero saber mais sobre os veículos Foton."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded text-lg font-semibold border-2 border-white/60 hover:bg-white hover:text-foreground transition-all text-center shadow-2xl"
              >
                Falar com Consultor
              </a>
            </div>
            <Link to="/sobre-foton" className="text-sm text-white/60 hover:text-white transition-colors">
              Conheça a Foton, a maior fabricante de caminhões que você ainda não conhecia →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BLOCO 2 — QUEM É A FOTON ─── */}
      <section className="py-16 md:py-24 bg-[hsl(213,50%,8%)] text-white">
        <div className="container-lavoro text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">A marca que está mudando o mercado de caminhões no Brasil</h2>
          <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            Você provavelmente nunca ouviu falar dela. Seus concorrentes já estão comprando.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: <img src={iconeFotonGlobal} alt="Foton Global" className="w-12 h-12 object-contain" />, text: "Presente em mais de 110 países" },
              { icon: <img src={icone12Milhoes} alt="12 milhões" className="w-12 h-12 object-contain" />, text: "Mais de 12 milhões de veículos produzidos até 2025" },
              { icon: <img src={iconeCumminsZf} alt="Cummins e ZF" className="w-12 h-12 object-contain" />, text: "Motor Cummins + Caixa ZF + Componentes Bosch e Dana" },
              { icon: <img src={iconeDaimlerBenz} alt="Daimler Benz" className="w-12 h-12 object-contain" />, text: "Joint Venture com a Mercedes-Benz (Daimler) para engenharia de veículos pesados" },
              { icon: <img src={icone200Porcento} alt="200%" className="w-12 h-12 object-contain" />, text: "Market share — crescimento de +200% em 2025" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col items-center gap-3 text-center hover:border-primary/40 transition-colors">
                {item.icon}
                <p className="text-sm text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
          <Link to="/sobre-foton" className="inline-block mt-8 text-sm text-primary hover:text-primary-foreground transition-colors">
            Entenda por que a Lavoro escolheu a Foton →
          </Link>
        </div>
      </section>

      {/* ─── BLOCO 3 — LINHA COMPLETA FOTON (Tabs) ─── */}
      <section className="section-padding bg-background">
        <div className="container-lavoro">
          <h2 className="text-center mb-2 text-foreground">Linha Completa Foton</h2>
          <p className="text-center text-muted-foreground mb-10 text-lg">Performance e confiabilidade para cada operação</p>

          <Tabs defaultValue="diesel" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="diesel" className="font-semibold">Diesel</TabsTrigger>
              <TabsTrigger value="eletrico" className="font-semibold">Elétrico</TabsTrigger>
              <TabsTrigger value="picapes" className="font-semibold">Picapes</TabsTrigger>
            </TabsList>

            {/* ABA DIESEL */}
            <TabsContent value="diesel">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <ModelCardV2 name="AUMARK S315" description="VUC urbano. Pode ser dirigido com CNH B — sem precisar tirar habilitação de caminhão." tags={["3,5T", "CNH B"]} link="/modelos/aumark-s315" />
                <ModelCardV2 name="AUMARK 715" description="Médio porte com excelente custo-benefício. Ideal para distribuição urbana e regional." tags={["7T", "CNH C"]} link="/modelos/aumark-715" />
                <ModelCardV2 name="AUMARK 916" description="O campeão do transporte refrigerado. Chassi dimensionado para baús térmicos." tags={["9T", "CNH C"]} link="/modelos/aumark-916" />
                <ModelCardV2 name="AUMARK 1217" description="O três-quartos mais carregado da categoria. Carrega até 1.000 kg a mais que o VW Delivery 11.180." tags={["12T", "CNH D/E"]} link="/modelos/aumark-1217" secondaryLink={{ label: "Ver comparativo vs VW, Mercedes e Iveco →", to: "/comparativo-aumark-1217" }} />
                <ModelCardV2 name="AUMAN D 1722" description="Semipesado de alta capacidade. Motor Cummins ISF 3.8 para longas distâncias e cargas pesadas." tags={["17T", "CNH D/E"]} link="/modelos/auman-d-1722" />
              </div>
            </TabsContent>

            {/* ABA ELÉTRICO */}
            <TabsContent value="eletrico">
              <div className="bg-[hsl(170,30%,10%)] rounded-xl p-6 md:p-8">
                <p className="text-center text-white/80 text-base md:text-lg mb-8">
                  Zero emissões. Economia de até 80% no custo operacional. O futuro chegou.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <ModelCardV2 name="eWONDER" description="VUC elétrico para entregas urbanas de última milha. Emissão zero." link="/modelos/ewonder" secondaryLink={{ label: "Ver comparativo vs Diesel →", to: "/comparativo-ewonder" }} />
                  <ModelCardV2 name="eTOANO" description="Médio porte elétrico. Alta capacidade com zero emissões." link="/modelos/etoano" badge="EM BREVE" />
                  <ModelCardV2 name="eAumark 9T" description="9 toneladas elétrico. Força e eficiência energética." link="/modelos/eaumark-9t" badge="EM BREVE" />
                  <ModelCardV2 name="eAumark 12T" description="12 toneladas elétrico. Alta capacidade com emissão zero." link="/modelos/eaumark-12t" badge="EM BREVE" />
                  <ModelCardV2 name="eVIEW" description="Pesado elétrico. Máxima capacidade com impacto ambiental zero." link="/modelos/eview" badge="EM BREVE" />
                </div>
              </div>
            </TabsContent>

            {/* ABA PICAPES */}
            <TabsContent value="picapes">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                <ModelCardV2 name="TUNLAND V9" description="Picape 4x4 robusta. Teto solar panorâmico, tecnologia ADAS 360°, acabamento de luxo com robustez de caminhão." link="/modelos/tunland-v9" />
                <ModelCardV2 name="TUNLAND V7" description="Picape 4x2 versátil. Equilíbrio perfeito entre trabalho, conforto e mobilidade urbana." link="/modelos/tunland-v7" />
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-10">
            <Link to="/modelos" className="btn-primary-large">Ver linha completa →</Link>
          </div>
        </div>
      </section>

      {/* ─── BLOCO 4 — COMPARATIVOS ─── */}
      <section className="py-16 md:py-24 bg-[hsl(213,60%,12%)] text-white">
        <div className="container-lavoro text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Está comparando antes de decidir?</h2>
          <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            Construímos comparativos técnicos com dados reais de operação. Sem achismo, sem argumento de vendedor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold mb-3 text-white">Aumark 1217 vs VW Delivery, Mercedes Accelo e Iveco Tector</h3>
              <p className="text-sm text-white/70 mb-5">
                O caminhão que carrega 1.000 kg a mais, faz 3 viagens a menos por mês e tem 3 anos de garantia sem limite de km.
              </p>
              <Link to="/comparativo-aumark-1217" className="inline-block border border-white/40 text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-white hover:text-foreground transition-all">
                Ver comparativo técnico →
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left hover:border-primary/40 transition-colors">
              <h3 className="text-xl font-bold mb-3 text-white">eWonder vs Kia Bongo e HR Hyundai</h3>
              <p className="text-sm text-white/70 mb-5">
                R$ 1.677 de economia por mês por veículo. Todo mês. Só trocando o combustível por energia elétrica.
              </p>
              <Link to="/comparativo-ewonder" className="inline-block border border-white/40 text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-white hover:text-foreground transition-all">
                Ver comparativo técnico →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BLOCO 5 — PROVA SOCIAL ─── */}
      <section className="section-padding bg-secondary">
        <div className="container-lavoro text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">Quem já escolheu a Foton em Minas Gerais</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12">
            Empresas reais. Operações reais. Resultado comprovado.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { name: "COOPMETRO", logo: logoCoopmetro, segment: "Cooperativa de transporte — mais de 30.000 associados", data: "Registrou economia de +20% em combustível vs VW Delivery 11.180" },
              { name: "Roodacoop", logo: logoRoodacoop, segment: "Cooperativa de Transporte", data: "Maior fornecedor Logística em MG Mercado Livre." },
              { name: "Zero Carbon — Grupo Lenarge", logo: logoZeroCarbon, segment: "Logística sustentável — Grupo Lafarge", data: "Empresa Lenarge com Logística com veículos Zero Emissão de Carbono." },
              { name: "TransFlau", logo: logoTransflau, segment: "Transporte de cargas", data: "Registro de mais de 25% de economia de combustível vs VW Delivery 11.180" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 text-left hover:shadow-md transition-shadow">
                <img src={item.logo} alt={item.name} className="h-10 object-contain mb-3" />
                <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{item.segment}</p>
                {item.data && <p className="text-xs text-primary font-medium">{item.data}</p>}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-muted-foreground max-w-xl mx-auto">
            "Estas empresas testaram, aprovaram e voltaram. O atendimento mineiro da Lavoro faz a diferença."
          </p>
        </div>
      </section>

      {/* ─── BLOCO 6 — SERVIÇOS ─── */}
      <section className="section-padding bg-background border-t-4 border-primary">
        <div className="container-lavoro text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-1 text-foreground">Não vendemos só caminhão.</h2>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Resolvemos sua operação.</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            40 anos construindo o melhor atendimento do setor automotivo em Minas Gerais.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: <Search className="w-6 h-6" />, title: "Consultoria Técnica", desc: "Analisamos sua rota, carga e operação. Indicamos o modelo certo — sem pressão de venda." },
              { icon: <CreditCard className="w-6 h-6" />, title: "Financiamento em 24h", desc: "Parceria com Santander. Aprovação rápida, taxas competitivas, sem surpresa no boleto." },
              { icon: <Handshake className="w-6 h-6" />, title: "Consórcio Sem Entrada", desc: "Parceria Canopus. Sem juros. Cresça sua frota sem apertar o caixa." },
              { icon: <Settings className="w-6 h-6" />, title: "Pós-venda Autorizado", desc: "Oficina Foton com técnicos certificados. 88% de fill rate em peças. Sua frota não para." },
              { icon: <Package className="w-6 h-6" />, title: "Frotas Corporativas", desc: "Condições especiais para compras em volume. Consultor dedicado. SLA prioritário." },
              { icon: <Building2 className="w-6 h-6" />, title: "Licitações Públicas", desc: "40 anos de experiência em processos licitatórios. Documentação completa. Prazo cumprido." },
            ].map((item, i) => (
              <Link key={i} to="/servicos" className="bg-card border border-border rounded-lg p-6 text-left hover:shadow-lg hover:border-primary/40 transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {item.icon}
                </div>
                <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/servicos" className="btn-primary-large">Conheça todos os serviços →</Link>
          </div>
        </div>
      </section>

      {/* ─── BLOCO 7 — MÉTRICAS ─── */}
      <section className="py-16 md:py-24 bg-[hsl(213,60%,6%)] text-white">
        <div className="container-lavoro">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "87 mil", label: "Veículos vendidos na história da Lavoro" },
              { value: "40 anos", label: "No mercado automotivo em Minas Gerais" },
              { value: "27", label: "Prêmios StarClass Mercedes-Benz — recorde nacional" },
              { value: "88%", label: "Fill rate em peças — sua frota não para" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{item.value}</div>
                <p className="text-xs md:text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOCO 8 — CTA FINAL ─── */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[hsl(213,60%,10%)] to-[hsl(213,80%,5%)]">
        <div className="container-lavoro text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Pronto para o próximo passo?</h2>
          <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Fale com nosso consultor. Sem pressão, sem enrolação. Só resultado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="https://wa.me/5531996970656?text=Olá, vim pelo site e quero saber mais sobre os veículos Foton."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(145,60%,40%)] text-white px-8 py-4 rounded text-lg font-semibold hover:bg-[hsl(145,60%,35%)] transition-all shadow-2xl text-center"
            >
              Falar no WhatsApp agora
            </a>
            <Link to="/contato" className="border-2 border-white/60 text-white px-8 py-4 rounded text-lg font-semibold hover:bg-white hover:text-foreground transition-all text-center">
              Solicitar Orçamento
            </Link>
          </div>
          <p className="text-xs text-white/40">
            ⚠️ Taxa 0% via Santander com condições especiais — válida por tempo limitado. Consulte disponibilidade.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeV2;
