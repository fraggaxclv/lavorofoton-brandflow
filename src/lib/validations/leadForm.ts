import { z } from "zod";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function phoneIsValid(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 10 && d.length !== 11) return false;
  if (/^(\d)\1+$/.test(d)) return false;
  const seqs = ["01234","12345","23456","34567","45678","56789","98765","87654"];
  if (seqs.some((s) => d.includes(s))) return false;
  if (d.length === 11 && d[2] !== "9") return false;
  return true;
}

export const leadFormSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo").max(120),
  email: z.string().trim().toLowerCase()
    .max(180, "E-mail muito longo")
    .regex(EMAIL_RE, "E-mail inválido"),
  telefone: z.string().trim()
    .refine(phoneIsValid, "Telefone inválido (DDD + número, 10 ou 11 dígitos)"),
  empresa: z.string().trim().max(160).optional().or(z.literal("")),
  aceite_consultoria: z.boolean().optional().default(false),
  aceite_privacidade: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar a Política de Privacidade" }),
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
