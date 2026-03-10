import logoFotonLavoro from "@/assets/logo-foton-lavoro-transparente.png";
import logoFotonIcon from "@/assets/foton-logo-icon-transparent.png";

const tcoRows = [
  { item: "Combustível / Energia", diesel: "R$ 0,55/km", eletrico: "R$ 0,08/km", economia: "–85%" },
  { item: "Manutenção preventiva", diesel: "R$ 1.800/mês", eletrico: "R$ 450/mês", economia: "–75%" },
  { item: "Manutenção corretiva", diesel: "R$ 2.200/mês", eletrico: "R$ 300/mês", economia: "–86%" },
  { item: "IPVA + Seguro", diesel: "R$ 12.000/ano", eletrico: "R$ 4.800/ano", economia: "–60%" },
  { item: "Depreciação (5 anos)", diesel: "–55%", eletrico: "–35%", economia: "+20pp" },
  { item: "Downtime oficina", diesel: "8 dias/ano", eletrico: "2 dias/ano", economia: "–75%" },
];

const barData = [
  { label: "Combustível", diesel: 66000, eletrico: 9600 },
  { label: "Manutenção", diesel: 48000, eletrico: 9000 },
  { label: "IPVA + Seguro", diesel: 12000, eletrico: 4800 },
  { label: "Depreciação", diesel: 44000, eletrico: 28000 },
];

const maxBar = 70000;

export default function EletricosBeneficios2() {
  const totalDiesel = barData.reduce((s, r) => s + r.diesel, 0);
  const totalEletrico = barData.reduce((s, r) => s + r.eletrico, 0);
  const economiaAnual = totalDiesel - totalEletrico;

  return (
    <div
      className="w-[1920px] h-[1080px] flex flex-col items-center justify-between px-20 py-12 relative overflow-hidden"
      style={{ background: "linear-gradient(to right, #041954, #000000)" }}
    >
      {/* Logo topo direito */}
      <img src={logoFotonIcon} alt="Foton" className="absolute top-10 right-12 h-10 opacity-80" />

      {/* Título */}
      <div className="text-center flex-shrink-0">
        <h1 className="text-[56px] font-bold text-white tracking-tight leading-none">
          TCO — Custo Total de Propriedade
        </h1>
        <p className="text-xl mt-2 font-medium" style={{ color: "#10DCFF" }}>
          Comparativo anual: Diesel vs. Elétrico Foton · Base 10.000 km/mês
        </p>
      </div>

      {/* Conteúdo principal: tabela + gráfico */}
      <div className="flex gap-10 w-full flex-1 mt-8 mb-6 min-h-0">
        {/* Tabela lado esquerdo */}
        <div className="flex-1 rounded-xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,220,255,0.15)" }}>
          {/* Header */}
          <div className="grid grid-cols-4 px-6 py-3" style={{ background: "rgba(16,220,255,0.08)", borderBottom: "1px solid rgba(16,220,255,0.2)" }}>
            <span className="text-sm font-semibold" style={{ color: "#10DCFF" }}>Item</span>
            <span className="text-sm font-semibold text-center" style={{ color: "#ff6b6b" }}>Diesel</span>
            <span className="text-sm font-semibold text-center" style={{ color: "#10DCFF" }}>Elétrico</span>
            <span className="text-sm font-semibold text-right" style={{ color: "#00C853" }}>Economia</span>
          </div>
          {/* Rows */}
          <div className="flex-1 flex flex-col justify-evenly px-6">
            {tcoRows.map((row, i) => (
              <div key={i} className="grid grid-cols-4 py-2" style={{ borderBottom: i < tcoRows.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <span className="text-[15px] text-white/80">{row.item}</span>
                <span className="text-[15px] text-center font-semibold" style={{ color: "#ff6b6b" }}>{row.diesel}</span>
                <span className="text-[15px] text-center font-semibold" style={{ color: "#10DCFF" }}>{row.eletrico}</span>
                <span className="text-[15px] text-right font-bold" style={{ color: "#00C853" }}>{row.economia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico lado direito */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Barras horizontais */}
          <div className="flex-1 rounded-xl px-8 py-6 flex flex-col justify-evenly" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,220,255,0.15)" }}>
            {barData.map((row, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="text-xs text-white/60 uppercase tracking-wider">{row.label}</span>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="h-5 rounded" style={{ width: `${(row.diesel / maxBar) * 100}%`, background: "linear-gradient(90deg, #ff6b6b, #ff4444)" }} />
                    <div className="h-5 rounded" style={{ width: `${(row.eletrico / maxBar) * 100}%`, background: "linear-gradient(90deg, #10DCFF, #0099cc)" }} />
                  </div>
                  <div className="w-24 text-right flex flex-col">
                    <span className="text-xs font-semibold" style={{ color: "#ff6b6b" }}>R$ {(row.diesel / 1000).toFixed(0)}k</span>
                    <span className="text-xs font-semibold" style={{ color: "#10DCFF" }}>R$ {(row.eletrico / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo total */}
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl px-6 py-4 text-center" style={{ background: "rgba(255,75,75,0.1)", border: "1px solid rgba(255,75,75,0.3)" }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: "#ff6b6b" }}>TCO Diesel / ano</p>
              <p className="text-3xl font-bold mt-1" style={{ color: "#ff6b6b" }}>
                R$ {(totalDiesel / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="flex-1 rounded-xl px-6 py-4 text-center" style={{ background: "rgba(16,220,255,0.08)", border: "1px solid rgba(16,220,255,0.3)" }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: "#10DCFF" }}>TCO Elétrico / ano</p>
              <p className="text-3xl font-bold mt-1" style={{ color: "#10DCFF" }}>
                R$ {(totalEletrico / 1000).toFixed(0)}k
              </p>
            </div>
            <div className="flex-1 rounded-xl px-6 py-4 text-center" style={{ background: "rgba(0,200,83,0.1)", border: "1px solid rgba(0,200,83,0.3)" }}>
              <p className="text-xs uppercase tracking-wider" style={{ color: "#00C853" }}>Economia / ano</p>
              <p className="text-3xl font-bold mt-1" style={{ color: "#00C853" }}>
                R$ {(economiaAnual / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frase de fechamento */}
      <p className="text-lg text-white/90 text-center flex-shrink-0">
        Em 3 anos, a economia paga o veículo. O elétrico não é futuro — é o presente.
      </p>

      {/* Logo inferior direito */}
      <img src={logoFotonLavoro} alt="Lavoro Foton" className="absolute bottom-10 right-12 h-8 opacity-80" />
    </div>
  );
}
