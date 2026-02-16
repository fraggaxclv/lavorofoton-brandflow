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

    if (vencidos > 0) {
      toast.warning(`${vencidos} negociação(ões) com próximo passo vencido`, {
        description: "Clique para ver detalhes",
        duration: 8000,
        action: {
          label: "Ver",
          onClick: () => navigate("/interno/negociacoes"),
        },
      });
    }

    if (semAtt > 0) {
      setTimeout(() => {
        toast.info(`${semAtt} negociação(ões) sem atualização há 7+ dias`, {
          description: "Mantenha seu pipeline atualizado",
          duration: 6000,
          action: {
            label: "Ver",
            onClick: () => navigate("/interno/negociacoes"),
          },
        });
      }, 2000);
    }
  }, [dashboardQuery.data, navigate]);

  return null;
}
