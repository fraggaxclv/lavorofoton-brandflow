import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { MessageCircle, Trophy, Wrench, DollarSign, Check, ChevronRight, Instagram, Linkedin, Phone, ExternalLink, Weight, Fuel, Shield, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SimuladorEficiencia from "@/components/SimuladorEficiencia";
import foton1217 from "@/assets/foton-1217.jpg";
import logoFotonLavoro from "@/assets/logo-foton-lavoro-transparente.png";
import cumminsLogo from "@/assets/cummins-logo-icon.png";

const WHATSAPP_URL = "https://wa.me/5531996970656?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20o%20Aumark%20S%201217.";

// Intersection Observer hook for scroll animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) {
      el.querySelectorAll(".reveal").forEach((child) => observer.observe(child));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

const comparisonData = [
  { spec: "Motor", foton: "Cummins F3.8", mb: "MB OM 924", vw: "Cummins F3.8", iveco: "FPT/NEF 4" },
  { spec: "Potência", foton: "170 cv", mb: "163 cv", vw: "175 cv", iveco: "190 cv" },
  { spec: "Torque", foton: "600 Nm", mb: "610 Nm", vw: "600 Nm", iveco: "610 Nm" },
  { spec: "Transmissão", foton: "Manual 6 marchas", mb: "Manual 6 marchas", vw: "Manual 6 marchas", iveco: "Manual 6 marchas" },
  { spec: "PBT Legal", foton: "11.500 kg", mb: "10.700 kg", vw: "10.800 kg", iveco: "10.600 kg" },
  { spec: "PBT Técnico", foton: "12.000 kg 🏆", mb: "10.700 kg", vw: "10.800 kg", iveco: "10.600 kg", highlight: true },
  { spec: "Carga útil", foton: "8.326 kg", mb: "7.260 kg", vw: "7.480 kg", iveco: "7.080 kg", highlight: true },
  { spec: "Tanque", foton: "Alumínio", mb: "Plástico", vw: "Plástico", iveco: "Plástico" },
  { spec: "Garantia", foton: "3 anos s/ limite km", mb: "2 anos", vw: "2 anos", iveco: "2 anos", highlight: true },
];

const sellingPoints = [
  "Motor Cummins: maior confiança e disponibilidade de peças no Brasil",
  "Maior PBT Técnico da categoria: 12.000 kg — transporta mais em menos viagens",
  "Carga útil superior: +1.000 kg vs VW Delivery 11.180 = mais frete por viagem",
  "Tanque de alumínio: mais resistente, durável e com estética superior",
  "3 anos de garantia sem limite de quilometragem",
  "Manutenção rápida: 80+ concessionárias Foton no Brasil + R$ 90M em estoque de peças",
  "Taxa zero via Santander com subsídio da fábrica Foton",
];

const ComparativoAumark1217 = () => {
  const containerRef = useScrollReveal();

  return (
    <>
      <Helmet>
        <title>Foton Aumark S 1217 | Comparativo vs VW, Mercedes e Iveco | Lavoro Foton MG</title>
        <meta name="description" content="Conheça o Foton Aumark S 1217, o caminhão médio com maior PBT da categoria, motor Cummins e mais de 20% de economia que os concorrentes. Lavoro Foton, Minas Gerais." />
      </Helmet>

      <div ref={containerRef} className="min-h-screen font-['Poppins',sans-serif] bg-[#0A1F3D] text-white">

        {/* ===== HERO ===== */}
        <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img src={foton1217} alt="Foton Aumark S 1217" className="w-full h-full object-cover object-center opacity-30 md:opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F3D] via-[#0A1F3D]/90 to-[#0A1F3D]/50" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-0">
            <div className="max-w-2xl">
              <div className="reveal opacity-0 translate-y-6 transition-all duration-700">
                <span className="inline-flex items-center gap-2 bg-[#F5A623]/20 text-[#F5A623] px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-[#F5A623]/30">
                  <Star size={14} className="fill-[#F5A623]" /> Melhor da Categoria
                </span>
              </div>
              <h1 className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-100 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                Foton Aumark S 1217
                <span className="block text-[#F5A623] text-2xl md:text-3xl mt-3 font-semibold">O Caminhão Médio que Muda o Jogo</span>
              </h1>
              <p className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-200 text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
                Maior carga útil da categoria. Motor Cummins. Mais de 20% de economia em combustível. Conheça o novo padrão do transporte urbano e rodoviário em Minas Gerais.
              </p>
              <div className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-300">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-lg px-8 py-6 rounded-xl font-semibold shadow-lg shadow-[#22C55E]/25 hover:shadow-xl hover:shadow-[#22C55E]/30 transition-all">
                    <MessageCircle size={22} />
                    Quero conhecer o Aumark S 1217
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronRight size={28} className="rotate-90 text-white/40" />
          </div>
        </section>

        {/* ===== SEÇÃO 2 — POR QUE O AUMARK S 1217? ===== */}
        <section className="py-20 md:py-28 bg-[#0D2647]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 text-3xl md:text-5xl font-bold text-center mb-16">
              Por que o <span className="text-[#F5A623]">Aumark S 1217</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Weight size={36} />, title: "Mais Carga por Viagem", desc: "PBT Técnico de 12.000 kg, o maior da categoria. Carrega até 1.000 kg a mais que o VW Delivery 11.180S." },
                { icon: <Wrench size={36} />, title: "Motor Cummins", desc: "O motor mais confiável e valorizado do mercado brasileiro, com maior rede de assistência e peças disponíveis." },
                { icon: <DollarSign size={36} />, title: "Mais de 20% Econômico", desc: "Menor custo por quilômetro rodado. Seus clientes já economizam mais de 20% em combustível vs concorrentes." },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`reveal opacity-0 translate-y-6 transition-all duration-700 bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#F5A623]/40 hover:bg-white/[0.08] transition-colors group`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl bg-[#F5A623]/15 text-[#F5A623] flex items-center justify-center mb-6 group-hover:bg-[#F5A623]/25 transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-white/70 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 3 — COMPARATIVO TÉCNICO ===== */}
        <section className="py-20 md:py-28 bg-[#0A1F3D]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 text-3xl md:text-5xl font-bold text-center mb-4">
              Comparativo <span className="text-[#F5A623]">Técnico</span>
            </h2>
            <p className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-100 text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Veja como o Aumark S 1217 se compara aos principais concorrentes da categoria.
            </p>
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-200 overflow-x-auto scrollbar-hide -mx-4 px-4">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-4 text-white/50 font-medium text-sm uppercase tracking-wider">Especificação</th>
                    <th className="py-4 px-4 text-center relative">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                        <span className="bg-[#F5A623] text-[#0A1F3D] text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                          ⭐ Melhor
                        </span>
                      </div>
                      <span className="font-bold text-[#F5A623] text-sm md:text-base">FOTON AUMARK S 1217</span>
                    </th>
                    <th className="py-4 px-4 text-center text-white/70 font-medium text-sm md:text-base">MB Accelo 1117</th>
                    <th className="py-4 px-4 text-center text-white/70 font-medium text-sm md:text-base">VW Delivery 11.180</th>
                    <th className="py-4 px-4 text-center text-white/70 font-medium text-sm md:text-base">Iveco Tector 11-190</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={`border-t border-white/10 ${row.highlight ? "bg-[#F5A623]/5" : ""}`}>
                      <td className="py-4 px-4 font-medium text-white/80 text-sm">{row.spec}</td>
                      <td className={`py-4 px-4 text-center font-bold border-l-2 border-r-2 border-[#F5A623]/40 ${row.highlight ? "text-[#F5A623]" : "text-white"}`}>
                        {row.foton}
                      </td>
                      <td className="py-4 px-4 text-center text-white/60 text-sm">{row.mb}</td>
                      <td className="py-4 px-4 text-center text-white/60 text-sm">{row.vw}</td>
                      <td className="py-4 px-4 text-center text-white/60 text-sm">{row.iveco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 4 — ARGUMENTOS DE VENDA ===== */}
        <section className="py-20 md:py-28 bg-[#0D2647]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 text-3xl md:text-4xl font-bold text-center mb-12">
              Por que os maiores frotistas de MG estão escolhendo a <span className="text-[#F5A623]">Foton</span>
            </h2>
            <ul className="space-y-5">
              {sellingPoints.map((point, i) => (
                <li
                  key={i}
                  className={`reveal opacity-0 translate-x-[-20px] transition-all duration-500 flex items-start gap-4`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#22C55E]/20 flex items-center justify-center mt-0.5">
                    <Check size={16} className="text-[#22C55E]" />
                  </div>
                  <span className="text-white/85 text-lg leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== SEÇÃO 5 — SIMULADOR DE EFICIÊNCIA ===== */}
        <SimuladorEficiencia />

        {/* ===== SEÇÃO 5 — PROVA SOCIAL ===== */}
        <section className="py-20 md:py-28 bg-[#0A1F3D]">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
              <div className="absolute -top-4 left-8">
                <span className="bg-[#22C55E] text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                  <Check size={14} /> Case Real Documentado
                </span>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-white/90 mt-4">
                "A COOPMETRO, com mais de 30.000 associados, adquiriu 4 unidades Foton Aumark 1217 e registrou economia de <span className="text-[#F5A623] font-bold">20%+</span> em combustível em comparação com o VW Delivery 11.180 — com capacidade de carga <span className="text-[#F5A623] font-bold">1.000 kg superior</span> por viagem."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-[#F5A623] rounded-full" />
                <span className="text-white/50 text-sm">Case verificado — Cooperativa COOPMETRO, MG</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 6 — CTA FINAL ===== */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#0D2647] to-[#0A1F3D]">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <h2 className="reveal opacity-0 translate-y-6 transition-all duration-700 text-3xl md:text-5xl font-bold mb-6">
              Pronto para reduzir custos e <span className="text-[#F5A623]">aumentar sua margem</span>?
            </h2>
            <p className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-100 text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Fale direto com a nossa equipe e simule sua economia com o Aumark S 1217.
            </p>
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700 delay-200 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-lg px-8 py-6 rounded-xl font-semibold shadow-lg shadow-[#22C55E]/25 w-full sm:w-auto">
                  <MessageCircle size={22} />
                  Falar no WhatsApp
                </Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl font-semibold w-full sm:w-auto transition-colors">
                  <ExternalLink size={20} />
                  Simular minha economia
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* ===== SEÇÃO 7 — RODAPÉ ===== */}
        <footer className="py-12 border-t border-white/10 bg-[#071528]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img src={logoFotonLavoro} alt="Lavoro Foton" className="h-10 md:h-12" />
                <div className="text-sm text-white/50">
                  <p>Concessionária Oficial Foton em Minas Gerais</p>
                  <p>Atendimento dono a dono</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <a href="https://www.instagram.com/lavorofoton/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F5A623] transition-colors">
                  <Instagram size={22} />
                </a>
                <a href="https://www.linkedin.com/company/lavorofoton/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#F5A623] transition-colors">
                  <Linkedin size={22} />
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#22C55E] transition-colors">
                  <MessageCircle size={22} />
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* ===== WHATSAPP FLUTUANTE ===== */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#22C55E] text-white rounded-full p-4 shadow-lg shadow-[#22C55E]/30 hover:bg-[#16A34A] hover:scale-110 transition-all animate-bounce-slow"
          aria-label="WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* CSS for scroll reveal animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        .reveal {
          opacity: 0;
          transform: translateY(24px);
        }
        .reveal.animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ComparativoAumark1217;
