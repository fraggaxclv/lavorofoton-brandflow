import React, { useState } from "react";
import { Save, FileText, ChevronDown, Trash2, Pencil, FolderOpen, Loader2, X } from "lucide-react";
import { SimulacaoTCO } from "@/hooks/useSimulacoesTCO";

const C = {
  brand: "#003B73",
  accent: "#F28C28",
  green: "#0D7C5F",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

interface Props {
  simulacoes: SimulacaoTCO[];
  onSalvar: (nome: string) => void;
  onCarregar: (sim: SimulacaoTCO) => void;
  onExcluir: (id: string) => void;
  onRenomear: (id: string, nome: string) => void;
  onExportPdf: () => Promise<void>;
  exportingPdf: boolean;
}

export default function TCOActionBar({
  simulacoes, onSalvar, onCarregar, onExcluir, onRenomear, onExportPdf, exportingPdf,
}: Props) {
  const [showSalvar, setShowSalvar] = useState(false);
  const [showLista, setShowLista] = useState(false);
  const [nomeSim, setNomeSim] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNome, setEditingNome] = useState("");

  const handleSalvar = () => {
    if (!nomeSim.trim()) return;
    onSalvar(nomeSim.trim());
    setNomeSim("");
    setShowSalvar(false);
  };

  const handleRenomear = (id: string) => {
    if (!editingNome.trim()) return;
    onRenomear(id, editingNome.trim());
    setEditingId(null);
    setEditingNome("");
  };

  return (
    <div className="space-y-3">
      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Salvar */}
        <button
          onClick={() => setShowSalvar(!showSalvar)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md border-2 transition-all duration-200 hover:shadow-sm"
          style={{
            borderColor: C.brand,
            color: C.brand,
            background: showSalvar ? C.brand : C.white,
            ...(showSalvar ? { color: C.white } : {}),
          }}
        >
          <Save size={16} />
          Salvar Simulação
        </button>

        {/* Exportar PDF */}
        <button
          onClick={onExportPdf}
          disabled={exportingPdf}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md border-2 transition-all duration-200 hover:shadow-sm disabled:opacity-60"
          style={{
            borderColor: C.brand,
            color: C.brand,
            background: C.white,
          }}
        >
          {exportingPdf ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
          {exportingPdf ? "Gerando PDF..." : "Exportar PDF"}
        </button>

        {/* Lista de simulações */}
        {simulacoes.length > 0 && (
          <button
            onClick={() => setShowLista(!showLista)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md border transition-all duration-200"
            style={{ borderColor: C.border, color: C.textSecondary }}
          >
            <FolderOpen size={16} />
            Simulações salvas ({simulacoes.length})
            <ChevronDown size={14} className={`transition-transform ${showLista ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Save dialog */}
      {showSalvar && (
        <div className="p-4 rounded-lg border" style={{ borderColor: C.brand + "40", background: C.brand + "08" }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.brand }}>
            Nome da simulação
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={nomeSim}
              onChange={(e) => setNomeSim(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSalvar()}
              placeholder='Ex: "Cliente João - eView vs Diesel"'
              className="flex-1 text-sm px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
              style={{ borderColor: C.border, focusRingColor: C.brand } as any}
              autoFocus
            />
            <button
              onClick={handleSalvar}
              disabled={!nomeSim.trim()}
              className="text-sm font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-40"
              style={{ background: C.brand, color: C.white }}
            >
              Salvar
            </button>
            <button
              onClick={() => setShowSalvar(false)}
              className="p-2 rounded-md"
              style={{ color: C.textSecondary }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Saved simulations list */}
      {showLista && simulacoes.length > 0 && (
        <div className="rounded-lg border overflow-hidden" style={{ borderColor: C.border }}>
          <div className="px-4 py-2" style={{ background: "#F9FAFB" }}>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.textSecondary }}>
              Simulações salvas
            </p>
          </div>
          <div className="divide-y max-h-60 overflow-y-auto" style={{ borderColor: C.border }}>
            {simulacoes.map((sim) => (
              <div key={sim.id} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                {editingId === sim.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      value={editingNome}
                      onChange={(e) => setEditingNome(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleRenomear(sim.id)}
                      className="flex-1 text-sm px-2 py-1 border rounded"
                      style={{ borderColor: C.border }}
                      autoFocus
                    />
                    <button onClick={() => handleRenomear(sim.id)} className="text-xs font-semibold px-2 py-1 rounded" style={{ background: C.brand, color: C.white }}>OK</button>
                    <button onClick={() => setEditingId(null)} className="text-xs px-2" style={{ color: C.textSecondary }}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: C.textPrimary }}>{sim.nome}</p>
                      <p className="text-xs" style={{ color: C.textSecondary }}>
                        {new Date(sim.criadaEm).toLocaleDateString("pt-BR")} · {fmt(sim.resultados.economiaMensal)}/mês
                      </p>
                    </div>
                    <button
                      onClick={() => onCarregar(sim)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-md border transition-colors hover:bg-gray-100"
                      style={{ borderColor: C.brand, color: C.brand }}
                    >
                      Carregar
                    </button>
                    <button
                      onClick={() => { setEditingId(sim.id); setEditingNome(sim.nome); }}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      style={{ color: C.textSecondary }}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onExcluir(sim.id)}
                      className="p-1.5 rounded hover:bg-red-50 transition-colors text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
