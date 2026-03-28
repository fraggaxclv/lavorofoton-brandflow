import { useState, useEffect, useCallback } from "react";

export interface SimulacaoTCO {
  id: string;
  nome: string;
  criadaEm: string;
  inputs: {
    precoEletrico: number;
    precoDiesel: number;
    kmMes: number;
    frota: number;
    meses: number;
    precoDieselL: number;
    precoEnergia: number;
    precoArla: number;
    consumoDieselKmL: number;
    consumoEletricoKwhKm: number;
    perfil: string;
  };
  resultados: {
    economiaMensal: number;
    economiaAnual: number;
    payback: number;
    economiaLiquida: number;
  };
}

const STORAGE_KEY = "lavoro_simulacoes_tco";

function loadAll(): SimulacaoTCO[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(sims: SimulacaoTCO[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sims));
}

export function useSimulacoesTCO() {
  const [simulacoes, setSimulacoes] = useState<SimulacaoTCO[]>([]);

  useEffect(() => {
    setSimulacoes(loadAll());
  }, []);

  const salvar = useCallback((sim: Omit<SimulacaoTCO, "id" | "criadaEm">) => {
    const nova: SimulacaoTCO = {
      ...sim,
      id: crypto.randomUUID(),
      criadaEm: new Date().toISOString(),
    };
    const updated = [nova, ...loadAll()];
    saveAll(updated);
    setSimulacoes(updated);
    return nova;
  }, []);

  const excluir = useCallback((id: string) => {
    const updated = loadAll().filter((s) => s.id !== id);
    saveAll(updated);
    setSimulacoes(updated);
  }, []);

  const renomear = useCallback((id: string, novoNome: string) => {
    const all = loadAll();
    const idx = all.findIndex((s) => s.id === id);
    if (idx >= 0) {
      all[idx].nome = novoNome;
      saveAll(all);
      setSimulacoes([...all]);
    }
  }, []);

  return { simulacoes, salvar, excluir, renomear };
}
