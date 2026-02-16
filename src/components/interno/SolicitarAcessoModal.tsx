import { useState } from "react";
import { useSolicitacoesAcesso } from "@/hooks/useSolicitacoesAcesso";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SolicitarAcessoModal({ open, onOpenChange }: Props) {
  const [cnpj, setCnpj] = useState("");
  const { solicitarAcesso } = useSolicitacoesAcesso();

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const handleSubmit = async () => {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    if (cnpjLimpo.length < 11) {
      toast.error("Informe um CPF/CNPJ válido");
      return;
    }

    try {
      await solicitarAcesso.mutateAsync({ cnpj: cnpjLimpo });
      toast.success("Solicitação enviada! Aguarde aprovação do admin.");
      setCnpj("");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao solicitar acesso");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Acesso a Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cnpj">CPF/CNPJ do Cliente</Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
                className="pl-9"
                autoFocus
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              O admin será notificado e poderá aprovar ou rejeitar sua solicitação.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={solicitarAcesso.isPending || cnpj.replace(/\D/g, "").length < 11}
          >
            {solicitarAcesso.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Solicitar Acesso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
