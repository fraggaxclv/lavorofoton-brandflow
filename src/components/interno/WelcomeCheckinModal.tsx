import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { 
  UserPlus, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Trophy,
  DollarSign,
  FileText,
  XCircle,
  TrendingUp,
  Users
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/types/interno";
import { useClientes } from "@/hooks/useClientes";

interface WelcomeCheckinModalProps {
  open: boolean;
  onClose: () => void;
  stats: {
    propostasEnviadas: number;
    valorPropostas: number;
    faturados: number;
    valorFaturados: number;
    perdidos: number;
    valorPerdidos: number;
  };
  streak: number;
  onComplete: () => void;
  onOpenCheckin: () => void;
  hasPendingNegociacoes: boolean;
}

type Step = "welcome" | "new_client_question" | "new_client_form" | "summary";

const GREETING_MESSAGES = [
  "Bom dia, campeão! 💪",
  "E aí, craque das vendas! 🔥",
  "Hora de vender! 🚀",
  "Pronto pra faturar? 💰",
  "Mais um dia de conquistas! ⭐",
];

export default function WelcomeCheckinModal({
  open,
  onClose,
  stats,
  streak,
  onComplete,
  onOpenCheckin,
  hasPendingNegociacoes,
}: WelcomeCheckinModalProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [direction, setDirection] = useState(0);
  const [clienteForm, setClienteForm] = useState({
    nome: "",
    telefone: "",
    email: "",
  });
  const { createCliente, isCreating } = useClientes();

  const greeting = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)];

  useEffect(() => {
    if (open) {
      setStep("welcome");
      setClienteForm({ nome: "", telefone: "", email: "" });
    }
  }, [open]);

  const handleNext = () => {
    setDirection(1);
    if (step === "welcome") {
      setStep("new_client_question");
    } else if (step === "new_client_question") {
      setStep("summary");
    } else if (step === "new_client_form") {
      setStep("summary");
    } else if (step === "summary") {
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (step === "new_client_question") {
      setStep("welcome");
    } else if (step === "new_client_form") {
      setStep("new_client_question");
    } else if (step === "summary") {
      setStep("new_client_question");
    }
  };

  const handleNewClientYes = () => {
    setDirection(1);
    setStep("new_client_form");
  };

  const handleNewClientNo = () => {
    setDirection(1);
    setStep("summary");
  };

  const handleSaveClient = async () => {
    if (!clienteForm.nome.trim()) {
      toast.error("Informe pelo menos o nome do cliente");
      return;
    }

    try {
      await createCliente({
        tipo: "PF",
        nome_razao: clienteForm.nome,
        cpf_cnpj: "",
        telefone: clienteForm.telefone || undefined,
        email: clienteForm.email || undefined,
      });
      toast.success("Cliente cadastrado com sucesso! 🎉");
      setDirection(1);
      setStep("summary");
    } catch (error) {
      toast.error("Erro ao cadastrar cliente");
    }
  };

  const handleFinish = () => {
    onComplete();
    if (hasPendingNegociacoes) {
      onOpenCheckin();
    }
    onClose();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return (
          <motion.div
            key="welcome"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-center space-y-6 py-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl"
            >
              👋
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {greeting}
              </h2>
              <p className="text-muted-foreground">
                Vamos ver como estão suas vendas?
              </p>
            </div>

            {streak > 0 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-950 text-orange-600 px-4 py-2 rounded-full">
                  <Flame className="w-5 h-5" />
                  <span className="font-bold">{streak} dias seguidos</span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleNext} 
              size="lg" 
              className="w-full mt-4"
            >
              Começar
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        );

      case "new_client_question":
        return (
          <motion.div
            key="new_client_question"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="text-center space-y-6 py-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-5xl"
            >
              <UserPlus className="w-16 h-16 mx-auto text-primary" />
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Cliente Novo?
              </h2>
              <p className="text-muted-foreground">
                Tem algum cliente novo para cadastrar?
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <Button 
                onClick={handleNewClientNo} 
                variant="outline"
                size="lg" 
                className="flex-1 h-20 flex-col gap-2 border-2 hover:border-muted-foreground"
              >
                <X className="w-6 h-6" />
                <span>Não</span>
              </Button>
              <Button 
                onClick={handleNewClientYes} 
                size="lg" 
                className="flex-1 h-20 flex-col gap-2"
              >
                <Check className="w-6 h-6" />
                <span>Sim</span>
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrev}
              className="mt-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </motion.div>
        );

      case "new_client_form":
        return (
          <motion.div
            key="new_client_form"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-4 py-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Novo Cliente
              </h2>
              <p className="text-sm text-muted-foreground">
                Dados básicos (opcional)
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Nome do cliente"
                  value={clienteForm.nome}
                  onChange={(e) => setClienteForm({ ...clienteForm, nome: e.target.value })}
                  autoFocus
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(31) 99999-9999"
                  value={clienteForm.telefone}
                  onChange={(e) => setClienteForm({ ...clienteForm, telefone: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cliente@email.com"
                  value={clienteForm.email}
                  onChange={(e) => setClienteForm({ ...clienteForm, email: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                onClick={handlePrev}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
              <Button 
                onClick={handleSaveClient}
                disabled={isCreating}
                className="flex-1"
              >
                {isCreating ? "Salvando..." : "Salvar"}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => { setDirection(1); setStep("summary"); }}
              className="w-full text-muted-foreground"
            >
              Pular por agora
            </Button>
          </motion.div>
        );

      case "summary":
        return (
          <motion.div
            key="summary"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-4 py-2"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-foreground">
                Seu Resumo
              </h2>
              <p className="text-sm text-muted-foreground">
                Veja como estão suas negociações
              </p>
            </div>

            <div className="grid gap-3">
              {/* Propostas Enviadas */}
              <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Propostas Enviadas</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {stats.propostasEnviadas}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                        {formatCurrency(stats.valorPropostas)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Faturados */}
              <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Faturados</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {stats.faturados}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(stats.valorFaturados)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Perdidos */}
              <Card className="border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Perdidos</p>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                          {stats.perdidos}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                        {formatCurrency(stats.valorPerdidos)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {hasPendingNegociacoes && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg text-center"
              >
                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                  ⚡ Você tem propostas pendentes para atualizar!
                </p>
              </motion.div>
            )}

            <Button 
              onClick={handleFinish} 
              size="lg" 
              className="w-full mt-4"
            >
              {hasPendingNegociacoes ? "Ver Propostas Pendentes" : "Ir para Negociações"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrev}
              className="w-full"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          </motion.div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Check-in Diário</DialogTitle>
        </VisuallyHidden>
        
        <AnimatePresence mode="wait" custom={direction}>
          {renderStep()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
