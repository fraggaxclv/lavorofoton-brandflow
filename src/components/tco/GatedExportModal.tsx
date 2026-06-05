import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Download, MessageCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { leadFormSchema, LeadFormValues } from "@/lib/validations/leadForm";

export interface GatedExportPayload {
  inputs_simulacao: any;
  resultados_simulacao: any;
  modelo_foton?: string;
  modelo_concorrente?: string;
}

export interface SavedSimulation {
  id: string;
  simulation_code: string;
  created_at: string;
  lead: { nome: string; email: string; telefone: string; empresa?: string };
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  payload: GatedExportPayload;
  /** Chamada após salvar com sucesso. Deve gerar o PDF e devolver o base64 (sem prefixo data:). */
  onGeneratePdf: (sim: SavedSimulation) => Promise<{ pdfBase64: string; filename: string } | null>;
}

const WHATSAPP = "5531996970656";

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10)
    return d.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_m, a, b, c) =>
      [a && `(${a}`, a && a.length === 2 ? ") " : "", b, c && `-${c}`].filter(Boolean).join(""),
    );
  return d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
}

export default function GatedExportModal({ open, onOpenChange, payload, onGeneratePdf }: Props) {
  const [values, setValues] = useState<Partial<LeadFormValues>>({
    nome: "", email: "", telefone: "", empresa: "",
    aceite_consultoria: false, aceite_privacidade: false as any,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<SavedSimulation | null>(null);
  const [emailing, setEmailing] = useState(false);

  useEffect(() => {
    if (!open) {
      // reset ao fechar
      setTimeout(() => {
        setValues({ nome: "", email: "", telefone: "", empresa: "", aceite_consultoria: false, aceite_privacidade: false as any });
        setErrors({});
        setDone(null);
        setSubmitting(false);
        setEmailing(false);
      }, 200);
    }
  }, [open]);

  const set = (k: keyof LeadFormValues, v: any) => setValues((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = leadFormSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.errors.forEach((er) => { errs[er.path[0] as string] = er.message; });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("salvar-simulacao-tco", {
        body: {
          ...parsed.data,
          telefone: parsed.data.telefone.replace(/\D/g, ""),
          empresa: parsed.data.empresa || null,
          ...payload,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) {
        const msg = (data as any).error as string;
        // mapear erros server-side em campos
        if (/e-?mail/i.test(msg)) setErrors({ email: msg });
        else if (/telefone/i.test(msg)) setErrors({ telefone: msg });
        else if (/privacidade/i.test(msg)) setErrors({ aceite_privacidade: msg });
        else toast.error(msg);
        return;
      }
      const sim: SavedSimulation = {
        id: (data as any).id,
        simulation_code: (data as any).simulation_code,
        created_at: (data as any).created_at,
        lead: {
          nome: parsed.data.nome,
          email: parsed.data.email,
          telefone: parsed.data.telefone,
          empresa: parsed.data.empresa || undefined,
        },
      };
      // Gera PDF + envia por e-mail (anexo)
      const res = await onGeneratePdf(sim);
      if (res?.pdfBase64) {
        setEmailing(true);
        try {
          await supabase.functions.invoke("enviar-pdf-tco", {
            body: {
              email: sim.lead.email,
              nome: sim.lead.nome,
              simulation_code: sim.simulation_code,
              pdf_base64: res.pdfBase64,
              filename: res.filename,
            },
          });
        } catch (err) {
          console.error("e-mail falhou", err);
        } finally {
          setEmailing(false);
        }
      }
      setDone(sim);
    } catch (err: any) {
      console.error(err);
      toast.error("Não foi possível salvar agora. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const waUrl = done
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Olá, acabei de fazer a simulação ID ${done.simulation_code} e gostaria de falar com um consultor`,
      )}`
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {!done ? (
          <>
            <DialogHeader className="pr-8">
              <DialogTitle>Receba sua análise comparativa completa</DialogTitle>
              <DialogDescription>
                Preencha os dados para gerar o PDF da sua simulação. Não enviamos spam.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="g-nome">Nome completo *</Label>
                <Input id="g-nome" value={values.nome || ""} onChange={(e) => set("nome", e.target.value)} autoFocus />
                {errors.nome && <p className="text-xs text-destructive mt-1">{errors.nome}</p>}
              </div>
              <div>
                <Label htmlFor="g-email">E-mail corporativo *</Label>
                <Input
                  id="g-email" type="email" inputMode="email" autoComplete="email"
                  value={values.email || ""} onChange={(e) => set("email", e.target.value)}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="g-tel">Telefone / WhatsApp *</Label>
                <Input
                  id="g-tel" type="tel" inputMode="tel" placeholder="(31) 99999-9999"
                  value={values.telefone || ""}
                  onChange={(e) => set("telefone", formatPhone(e.target.value))}
                />
                {errors.telefone && <p className="text-xs text-destructive mt-1">{errors.telefone}</p>}
              </div>
              <div>
                <Label htmlFor="g-empresa">Empresa <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                <Input id="g-empresa" value={values.empresa || ""} onChange={(e) => set("empresa", e.target.value)} />
              </div>

              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={!!values.aceite_consultoria}
                  onCheckedChange={(c) => set("aceite_consultoria", !!c)}
                />
                <span className="leading-snug">
                  Aceito receber consultoria gratuita da Lavoro Foton.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={!!values.aceite_privacidade}
                  onCheckedChange={(c) => set("aceite_privacidade", !!c)}
                />
                <span className="leading-snug">
                  Li e aceito a{" "}
                  <Link to="/privacidade" target="_blank" className="underline text-primary">
                    Política de Privacidade
                  </Link>{" "}
                  *
                </span>
              </label>
              {errors.aceite_privacidade && (
                <p className="text-xs text-destructive">{errors.aceite_privacidade}</p>
              )}

              <Button type="submit" disabled={submitting} className="w-full h-11 text-base">
                {submitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                {submitting ? "Gerando..." : "GERAR PDF AGORA"}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader className="pr-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" />
                <DialogTitle>Análise gerada com sucesso</DialogTitle>
              </div>
              <DialogDescription>
                ID da análise: <strong>{done.simulation_code}</strong>
                {emailing && <span className="block mt-1 text-xs">Enviando cópia para seu e-mail…</span>}
                {!emailing && (
                  <span className="block mt-1 text-xs">
                    Uma cópia foi enviada para <strong>{done.lead.email}</strong>.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-3">
              <Button
                className="w-full h-11"
                onClick={() => {
                  // o PDF já foi salvo via jsPDF.save no callback; este botão só fecha
                  onOpenChange(false);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                PDF baixado
              </Button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full h-11">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Receber por WhatsApp
                </Button>
              </a>
              <p className="text-[11px] text-muted-foreground text-center pt-1">
                Verificação:{" "}
                <a
                  className="underline"
                  href={`/verificar/${done.simulation_code}`}
                  target="_blank" rel="noopener noreferrer"
                >
                  lavorofoton.com.br/verificar/{done.simulation_code}
                </a>
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
