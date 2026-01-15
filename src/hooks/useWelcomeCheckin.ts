import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { StatusNegociacao } from "@/types/interno";

interface WelcomeStats {
  propostasEnviadas: number;
  valorPropostas: number;
  faturados: number;
  valorFaturados: number;
  perdidos: number;
  valorPerdidos: number;
}

interface WelcomeCheckinState {
  showWelcome: boolean;
  stats: WelcomeStats;
  isLoading: boolean;
}

const STORAGE_KEY_PREFIX = "lavoro_welcome_checkin_";

export function useWelcomeCheckin(userId: string | undefined) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [stats, setStats] = useState<WelcomeStats>({
    propostasEnviadas: 0,
    valorPropostas: 0,
    faturados: 0,
    valorFaturados: 0,
    perdidos: 0,
    valorPerdidos: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const checkAndLoadStats = async () => {
      setIsLoading(true);

      // Check if user already did welcome today
      const storageKey = `${STORAGE_KEY_PREFIX}${userId}`;
      const lastWelcome = localStorage.getItem(storageKey);
      const today = new Date().toISOString().split("T")[0];

      const shouldShowWelcome = lastWelcome !== today;

      // Fetch stats for current user
      try {
        const { data: negociacoes, error } = await supabase
          .from("negociacoes")
          .select("status, valor_estimado")
          .eq("owner_user_id", userId);

        if (error) throw error;

        const propostasEnviadas = negociacoes?.filter(
          (n) => n.status === "proposta_enviada"
        ) || [];
        const faturados = negociacoes?.filter(
          (n) => n.status === "faturado"
        ) || [];
        const perdidos = negociacoes?.filter(
          (n) => n.status === "perdido"
        ) || [];

        setStats({
          propostasEnviadas: propostasEnviadas.length,
          valorPropostas: propostasEnviadas.reduce(
            (acc, n) => acc + (n.valor_estimado || 0),
            0
          ),
          faturados: faturados.length,
          valorFaturados: faturados.reduce(
            (acc, n) => acc + (n.valor_estimado || 0),
            0
          ),
          perdidos: perdidos.length,
          valorPerdidos: perdidos.reduce(
            (acc, n) => acc + (n.valor_estimado || 0),
            0
          ),
        });

        setShowWelcome(shouldShowWelcome);
      } catch (error) {
        console.error("Error loading welcome stats:", error);
      }

      setIsLoading(false);
    };

    checkAndLoadStats();
  }, [userId]);

  const completeWelcome = () => {
    if (!userId) return;

    const storageKey = `${STORAGE_KEY_PREFIX}${userId}`;
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(storageKey, today);
    setShowWelcome(false);
  };

  return {
    showWelcome,
    stats,
    isLoading,
    completeWelcome,
  };
}
