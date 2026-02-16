import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/hooks/useDashboard";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { toast } from "sonner";

export default function NotificacoesVencidas() {
  const navigate = useNavigate();
  const { user, isAdmin } = useInternoAuth();
  const dashboardQuery = useDashboard(isAdmin ? {} : { owner_user_id: user?.id });
  const notified = useRef(false);

  useEffect(() => {
    if (notified.current || !dashboardQuery.data) return;
    notified.current = true;

    const vencidos = dashboardQuery.data.negociacoesPassosVencidos?.length || 0;
    const semAtt = dashboardQuery.data.negociacoesSemAtualizacao?.length || 0;

    // Delay notifications to avoid conflicting with welcome modal on mobile
    const delay = 4000;

    if (vencidos > 0) {
      setTimeout(() => {
        toast.warning(`${vencidos} negociação(ões) com próximo passo vencido`, {
          description: "Clique para ver detalhes",
          duration: 5000,
          action: {
            label: "Ver",
            onClick: () => navigate("/interno/negociacoes"),
          },
        });
      }, delay);
    }

    if (semAtt > 0) {
      setTimeout(() => {
        toast.info(`${semAtt} negociação(ões) sem atualização há 7+ dias`, {
          description: "Mantenha seu pipeline atualizado",
          duration: 5000,
          action: {
            label: "Ver",
            onClick: () => navigate("/interno/negociacoes"),
          },
        });
      }, delay + 2000);
    }
  }, [dashboardQuery.data, navigate]);

  return null;
}
