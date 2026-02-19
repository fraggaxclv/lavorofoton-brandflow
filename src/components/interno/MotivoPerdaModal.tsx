import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  CreditCard, 
  UserX, 
  DollarSign, 
  Clock, 
  Truck, 
  HelpCircle,
  Loader2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MotivoPerdaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  numeroNegociacao?: string;
  onConfirm: (motivoCompleto: string) => Promise<void>;
}

const MOTIVOS_PRINCIPAIS = [
  {
    id: "sem_credito",
    label: "Sem Crédito",
    icon: CreditCard,
    description: "Cliente não conseguiu aprovação de crédito",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
    bgActive: "bg-orange-100 dark:bg-orange-900/50 border-orange-400 dark:border-orange-600 ring-2 ring-orange-400/30",
  },
  {
    id: "desistencia",
    label: "Desistência",
    icon: UserX,
    description: "Cliente desistiu da compra",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    bgActive: "bg-red-100 dark:bg-red-900/50 border-red-400 dark:border-red-600 ring-2 ring-red-400/30",
  },
  {
    id: "preco",
    label: "Preço / Condição",
    icon: DollarSign,
    description: "Preço ou condições não atenderam",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
    bgActive: "bg-yellow-100 dark:bg-yellow-900/50 border-yellow-400 dark:border-yellow-600 ring-2 ring-yellow-400/30",
  },
  {
    id: "prazo",
    label: "Prazo de Entrega",
    icon: Clock,
    description: "Prazo não atendeu a necessidade",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    bgActive: "bg-blue-100 dark:bg-blue-900/50 border-blue-400 dark:border-blue-600 ring-2 ring-blue-400/30",
  },
  {
    id: "concorrencia",
    label: "Comprou na Concorrência",
    icon: Truck,
    description: "Cliente comprou de outro fornecedor",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
    bgActive: "bg-purple-100 dark:bg-purple-900/50 border-purple-400 dark:border-purple-600 ring-2 ring-purple-400/30",
  },
  {
    id: "outro",
    label: "Outro Motivo",
    icon: HelpCircle,
    description: "Motivo diferente dos listados",
    color: "text-muted-foreground",
    bg: "bg-muted/50 border-border",
    bgActive: "bg-muted border-foreground/30 ring-2 ring-foreground/10",
  },
];

const MOTIVOS_DESISTENCIA = [
  "Não precisa mais do veículo",
  "Adiou a compra para outro momento",
  "Problemas financeiros na empresa",
  "Mudança de planos operacionais",
  "Outro",
];

export default function MotivoPerdaModal({ open, onOpenChange, numeroNegociacao, onConfirm }: MotivoPerdaModalProps) {
  const [step, setStep] = useState(1);
  const [motivoPrincipal, setMotivoPrincipal] = useState("");
  const [motivoDesistencia, setMotivoDesistencia] = useState("");
  const [concorrenteMarca, setConcorrenteMarca] = useState("");
  const [concorrenteModelo, setConcorrenteModelo] = useState("");
  const [concorrenteLoja, setConcorrenteLoja] = useState("");
  const [detalhesAdicionais, setDetalhesAdicionais] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setStep(1);
    setMotivoPrincipal("");
    setMotivoDesistencia("");
    setConcorrenteMarca("");
    setConcorrenteModelo("");
    setConcorrenteLoja("");
    setDetalhesAdicionais("");
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const handleSelectMotivo = (id: string) => {
    setMotivoPrincipal(id);
    // For some motivos, go to step 2 for details
    if (id === "desistencia" || id === "concorrencia" || id === "outro") {
      setStep(2);
    } else {
      setStep(3); // Go directly to optional details
    }
  };

  const buildMotivoCompleto = (): string => {
    const motivo = MOTIVOS_PRINCIPAIS.find(m => m.id === motivoPrincipal);
    let texto = `[${motivo?.label || motivoPrincipal}]`;

    if (motivoPrincipal === "desistencia" && motivoDesistencia) {
      texto += ` - ${motivoDesistencia}`;
    }

    if (motivoPrincipal === "concorrencia") {
      const partes = [];
      if (concorrenteMarca) partes.push(`Marca: ${concorrenteMarca}`);
      if (concorrenteModelo) partes.push(`Modelo: ${concorrenteModelo}`);
      if (concorrenteLoja) partes.push(`Loja: ${concorrenteLoja}`);
      if (partes.length > 0) texto += ` - ${partes.join(" | ")}`;
    }

    if (detalhesAdicionais.trim()) {
      texto += ` | Obs: ${detalhesAdicionais.trim()}`;
    }

    return texto;
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(buildMotivoCompleto());
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    if (!motivoPrincipal) return false;
    if (motivoPrincipal === "outro" && !detalhesAdicionais.trim()) return false;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step > 1 && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStep(step - 1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            Registrar Perda
          </DialogTitle>
          <DialogDescription>
            {numeroNegociacao && (
              <span className="font-mono text-xs">{numeroNegociacao} • </span>
            )}
            {step === 1 && "Qual foi o principal motivo da perda?"}
            {step === 2 && motivoPrincipal === "desistencia" && "Por que o cliente desistiu?"}
            {step === 2 && motivoPrincipal === "concorrencia" && "Onde o cliente comprou?"}
            {step === 2 && motivoPrincipal === "outro" && "Descreva o motivo"}
            {step === 3 && "Quer adicionar alguma observação?"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Motivo principal */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {MOTIVOS_PRINCIPAIS.map((motivo) => {
              const Icon = motivo.icon;
              const isActive = motivoPrincipal === motivo.id;
              return (
                <button
                  key={motivo.id}
                  onClick={() => handleSelectMotivo(motivo.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isActive ? motivo.bgActive : motivo.bg
                  )}
                >
                  <Icon className={cn("h-7 w-7", motivo.color)} />
                  <span className="text-sm font-medium">{motivo.label}</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">{motivo.description}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Detalhes específicos */}
        {step === 2 && motivoPrincipal === "desistencia" && (
          <div className="space-y-3">
            {MOTIVOS_DESISTENCIA.map((motivo) => (
              <button
                key={motivo}
                onClick={() => {
                  setMotivoDesistencia(motivo);
                  setStep(3);
                }}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                  "hover:bg-accent",
                  motivoDesistencia === motivo ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                <span className="text-sm">{motivo}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {step === 2 && motivoPrincipal === "concorrencia" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="concorrente-marca">Marca do veículo comprado</Label>
              <Input
                id="concorrente-marca"
                value={concorrenteMarca}
                onChange={(e) => setConcorrenteMarca(e.target.value)}
                placeholder="Ex: Volkswagen, Mercedes, Iveco..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concorrente-modelo">Modelo (se souber)</Label>
              <Input
                id="concorrente-modelo"
                value={concorrenteModelo}
                onChange={(e) => setConcorrenteModelo(e.target.value)}
                placeholder="Ex: Delivery 11.180, Accelo 1016..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concorrente-loja">Concessionária / Loja</Label>
              <Input
                id="concorrente-loja"
                value={concorrenteLoja}
                onChange={(e) => setConcorrenteLoja(e.target.value)}
                placeholder="Ex: Nome da concessionária..."
              />
            </div>
            <Button onClick={() => setStep(3)} className="w-full">
              Continuar
            </Button>
          </div>
        )}

        {step === 2 && motivoPrincipal === "outro" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivo-outro">Descreva o motivo *</Label>
              <Textarea
                id="motivo-outro"
                value={detalhesAdicionais}
                onChange={(e) => setDetalhesAdicionais(e.target.value)}
                placeholder="Explique o que aconteceu..."
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={handleConfirm}
                disabled={!detalhesAdicionais.trim() || isSubmitting}
                variant="destructive"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Confirmar Perda
              </Button>
            </DialogFooter>
          </div>
        )}

        {/* Step 3: Observações adicionais (opcional) */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Resumo do motivo */}
            <div className="p-3 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground mb-1">Motivo selecionado:</p>
              <p className="text-sm font-medium">
                {MOTIVOS_PRINCIPAIS.find(m => m.id === motivoPrincipal)?.label}
                {motivoDesistencia && ` — ${motivoDesistencia}`}
                {concorrenteMarca && ` — ${concorrenteMarca}`}
                {concorrenteModelo && ` ${concorrenteModelo}`}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detalhes-extras">Observações adicionais (opcional)</Label>
              <Textarea
                id="detalhes-extras"
                value={detalhesAdicionais}
                onChange={(e) => setDetalhesAdicionais(e.target.value)}
                placeholder="Algo mais que queira registrar sobre essa negociação..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancelar</Button>
              <Button
                onClick={handleConfirm}
                disabled={!canSubmit() || isSubmitting}
                variant="destructive"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Confirmar Perda
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
