import logoFotonLavoro from "@/assets/logo-foton-lavoro-transparente.png";
import logoFotonIcon from "@/assets/foton-logo-icon-transparent.png";

const cards = [
  { destaque: "80%", frase: "menos custo operacional", detalhe: "Eletricidade vs. diesel. A conta fecha no primeiro mês." },
  { destaque: "90%", frase: "menos peças móveis", detalhe: "Motor elétrico: ~20 peças. Combustão: ~2.000. Menos quebra, menos oficina." },
  { destaque: "ZERO", frase: "emissão local", detalhe: "Operação silenciosa. Sem restrição de horário em zonas urbanas." },
  { destaque: "CATL", frase: "a mesma bateria da Tesla", detalhe: "Garantia de 6 a 8 anos. Tecnologia líder mundial." },
  { destaque: "100%", frase: "torque desde a partida", detalhe: "Força máxima do zero. Ideal para carga urbana com para-e-anda." },
];

export default function EletricosBeneficios() {
  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col items-center justify-between px-16 py-12 relative"
      style={{
        background: "linear-gradient(to right, #041954, #000000)",
      }}
    >
      {/* Logo topo direito */}
      <img
        src={logoFotonIcon}
        alt="Foton"
        className="absolute top-8 right-10 h-10 opacity-80"
      />

      {/* Título */}
      <div className="text-center flex-shrink-0">
        <h1 className="text-6xl font-bold text-white tracking-tight leading-none">
          Combustão vs. Elétrico
        </h1>
        <p className="text-xl mt-3 font-medium" style={{ color: "#10DCFF" }}>
          A matemática não mente.
        </p>
      </div>

      {/* Cards grid: 3 em cima, 2 centralizados embaixo */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-6xl">
        <div className="grid grid-cols-3 gap-6 w-full">
          {cards.slice(0, 3).map((c, i) => (
            <Card key={i} {...c} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
          {cards.slice(3).map((c, i) => (
            <Card key={i + 3} {...c} />
          ))}
        </div>
      </div>

      {/* Frase de fechamento */}
      <p className="text-lg text-white/90 text-center flex-shrink-0">
        Enquanto a concorrência planeja, a Foton já entrega.
      </p>

      {/* Logo inferior direito */}
      <img
        src={logoFotonLavoro}
        alt="Lavoro Foton"
        className="absolute bottom-8 right-10 h-8 opacity-80"
      />
    </div>
  );
}

function Card({ destaque, frase, detalhe }: { destaque: string; frase: string; detalhe: string }) {
  return (
    <div
      className="rounded-xl px-7 py-6"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(16,220,255,0.2)",
      }}
    >
      <p className="text-4xl font-bold leading-none" style={{ color: "#10DCFF" }}>
        {destaque}
      </p>
      <p className="text-white text-lg font-semibold mt-2">{frase}</p>
      <p className="text-sm mt-2 leading-relaxed" style={{ color: "#B4BCC0" }}>
        {detalhe}
      </p>
    </div>
  );
}
