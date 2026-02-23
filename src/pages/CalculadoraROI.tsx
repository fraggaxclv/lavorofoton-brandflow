import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Truck, Zap } from "lucide-react";
import CalculadoraAumark from "@/components/calculadoras/CalculadoraAumark";
import CalculadoraEWonderCalc from "@/components/calculadoras/CalculadoraEWonderCalc";

export default function CalculadoraROI() {
  const [tab, setTab] = useState<"aumark" | "ewonder">("aumark");

  return (
    <>
      <Helmet>
        <title>Calculadora ROI | Simule sua economia | Lavoro Foton MG</title>
        <meta name="description" content="Simule em tempo real quanto você economiza com os veículos Foton. Compare o Aumark S 1217 vs concorrentes ou o eWonder elétrico vs VUCs diesel." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1F3D] text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {/* Hero */}
        <section className="pt-16 pb-6 md:pt-20 md:pb-8 bg-[#0A1F3D]">
          <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
            <span className="inline-block bg-[#F5A623]/15 text-[#F5A623] text-sm font-bold px-5 py-2 rounded-full mb-6">
              🧮 Ferramenta Exclusiva Lavoro Foton
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Calculadora de <span className="text-[#F5A623]">ROI Foton</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Escolha o modelo e simule em tempo real quanto você economiza na sua operação.
            </p>

            {/* Tab selector */}
            <div className="inline-flex bg-[#0D2647] rounded-xl border border-white/10 p-1.5 gap-1">
              <button
                onClick={() => setTab("aumark")}
                className={`flex items-center gap-2 px-5 md:px-8 py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  tab === "aumark"
                    ? "bg-[#F5A623] text-[#0A1F3D] shadow-lg shadow-[#F5A623]/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Truck size={18} />
                Aumark S 1217 vs Concorrentes
              </button>
              <button
                onClick={() => setTab("ewonder")}
                className={`flex items-center gap-2 px-5 md:px-8 py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${
                  tab === "ewonder"
                    ? "bg-[#22C55E] text-white shadow-lg shadow-[#22C55E]/25"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Zap size={18} />
                eWonder vs VUC Diesel
              </button>
            </div>
          </div>
        </section>

        {/* Calculator content */}
        {tab === "aumark" ? <CalculadoraAumark /> : <CalculadoraEWonderCalc />}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
