import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import SEO from "@/components/SEO";

interface VerifiedSim {
  simulation_code: string;
  nome_mascarado: string;
  modelo_foton: string | null;
  modelo_concorrente: string | null;
  created_at: string;
}

export default function VerificarSimulacao() {
  const { code } = useParams<{ code: string }>();
  const [loading, setLoading] = useState(true);
  const [sim, setSim] = useState<VerifiedSim | null>(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!code) { setLoading(false); return; }
      const { data, error } = await supabase.rpc("verificar_simulacao", { p_code: code });
      if (ignore) return;
      if (error) {
        console.error(error);
        setSim(null);
      } else {
        setSim((data as any[])?.[0] || null);
      }
      setLoading(false);
    })();
    return () => { ignore = true; };
  }, [code]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <SEO
        title={`Verificação de análise TCO ${code ?? ""} | Lavoro Foton`}
        description="Verifique a autenticidade de uma análise comparativa de TCO gerada pela Lavoro Foton."
        path={`/verificar/${code ?? ""}`}
      />
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg border p-8">
        {loading ? (
          <div className="flex flex-col items-center text-muted-foreground py-8">
            <Loader2 className="animate-spin h-6 w-6 mb-3" />
            Verificando análise...
          </div>
        ) : sim ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="text-emerald-600 h-7 w-7" />
              <h1 className="text-xl font-bold">Análise verificada</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Esta análise é autêntica e foi gerada pela Lavoro Foton.
            </p>
            <dl className="space-y-3 text-sm">
              <Row k="ID" v={sim.simulation_code} mono />
              <Row k="Emitida em" v={new Date(sim.created_at).toLocaleDateString("pt-BR")} />
              <Row k="Cliente" v={sim.nome_mascarado} />
              {sim.modelo_foton && <Row k="Modelo Foton" v={sim.modelo_foton} />}
              {sim.modelo_concorrente && <Row k="Comparado com" v={sim.modelo_concorrente} />}
            </dl>
            <Link
              to="/calculadora"
              className="mt-8 inline-flex items-center justify-center w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Faça sua própria análise
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-amber-600 h-7 w-7" />
              <h1 className="text-xl font-bold">Análise não encontrada</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Esta análise pode ter sido alterada ou ser falsa. Para uma análise oficial
              Lavoro Foton, acesse a nossa calculadora.
            </p>
            <Link
              to="/calculadora"
              className="inline-flex items-center justify-center w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Ir para lavorofoton.com.br/calculadora
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className={`font-medium text-right ${mono ? "font-mono" : ""}`}>{v}</dd>
    </div>
  );
}
