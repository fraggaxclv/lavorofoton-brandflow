import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Negociacao } from "@/types/interno";

const CHECKIN_KEY_PREFIX = "vendedor_checkin_";

interface CheckinState {
  lastCheckinDate: string | null;
  streak: number;
  totalResolvidos: number;
}

export function useCheckinDiario(userId: string | undefined) {
  const [showCheckin, setShowCheckin] = useState(false);
  const [checkinState, setCheckinState] = useState<CheckinState>({
    lastCheckinDate: null,
    streak: 0,
    totalResolvidos: 0,
  });
  const [pendingNegociacoes, setPendingNegociacoes] = useState<Negociacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load checkin state from localStorage
  useEffect(() => {
    if (!userId) return;

    const storageKey = `${CHECKIN_KEY_PREFIX}${userId}`;
    const savedState = localStorage.getItem(storageKey);
    
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState) as CheckinState;
        setCheckinState(parsed);
      } catch {
        // Reset if corrupted
        localStorage.removeItem(storageKey);
      }
    }
  }, [userId]);

  // Check if user should see check-in today
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const checkPendingNegociacoes = async () => {
      setIsLoading(true);

      const today = new Date().toISOString().split('T')[0];
      const storageKey = `${CHECKIN_KEY_PREFIX}${userId}`;
      const savedState = localStorage.getItem(storageKey);
      
      let lastCheckin: string | null = null;
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState) as CheckinState;
          lastCheckin = parsed.lastCheckinDate;
        } catch {
          // Ignore
        }
      }

      // Already did check-in today
      if (lastCheckin === today) {
        setShowCheckin(false);
        setIsLoading(false);
        return;
      }

      // Fetch pending negotiations (proposta_enviada status)
      const { data, error } = await supabase
        .from("negociacoes")
        .select(`
          *,
          cliente:clientes(id, nome_razao, cidade, estado, telefone)
        `)
        .eq("owner_user_id", userId)
        .eq("status", "proposta_enviada")
        .order("ultima_atualizacao", { ascending: true });

      if (error) {
        console.error("Erro ao buscar negociações pendentes:", error);
        setIsLoading(false);
        return;
      }

      // Parse produtos and map to correct type
      const mappedData = (data || []).map(neg => {
        let produtos: Negociacao['produtos'] = [];
        try {
          if (typeof neg.produtos === 'string') {
            produtos = JSON.parse(neg.produtos);
          } else if (Array.isArray(neg.produtos)) {
            produtos = neg.produtos as unknown as Negociacao['produtos'];
          }
        } catch {
          produtos = [];
        }

        return {
          ...neg,
          produtos,
          origem_lead: neg.origem_lead as Negociacao['origem_lead'],
          status: neg.status as Negociacao['status'],
          tipo_venda: (neg.tipo_venda || 'estoque') as Negociacao['tipo_venda'],
        } as unknown as Negociacao;
      });

      setPendingNegociacoes(mappedData);
      setShowCheckin(mappedData.length > 0);
      setIsLoading(false);
    };

    checkPendingNegociacoes();
  }, [userId]);

  const completeCheckin = () => {
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];
    const storageKey = `${CHECKIN_KEY_PREFIX}${userId}`;
    
    // Calculate streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let newStreak = 1;
    if (checkinState.lastCheckinDate === yesterdayStr) {
      newStreak = checkinState.streak + 1;
    }

    const newState: CheckinState = {
      lastCheckinDate: today,
      streak: newStreak,
      totalResolvidos: checkinState.totalResolvidos,
    };

    localStorage.setItem(storageKey, JSON.stringify(newState));
    setCheckinState(newState);
    setShowCheckin(false);
  };

  const recordResolved = () => {
    if (!userId) return;

    const storageKey = `${CHECKIN_KEY_PREFIX}${userId}`;
    const newState: CheckinState = {
      ...checkinState,
      totalResolvidos: checkinState.totalResolvidos + 1,
    };

    localStorage.setItem(storageKey, JSON.stringify(newState));
    setCheckinState(newState);
  };

  const removeFromPending = (negociacaoId: string) => {
    setPendingNegociacoes(prev => prev.filter(n => n.id !== negociacaoId));
    recordResolved();
  };

  const skipCheckin = () => {
    setShowCheckin(false);
  };

  return {
    showCheckin,
    isLoading,
    pendingNegociacoes,
    checkinState,
    completeCheckin,
    removeFromPending,
    skipCheckin,
  };
}
