import { useState, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Negociacao, formatCurrency, STATUS_LABELS } from "@/types/interno";
import { useNegociacoes } from "@/hooks/useNegociacoes";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Check, 
  Clock, 
  Flame, 
  Trophy, 
  Target,
  ChevronRight,
  Building2,
  MapPin,
  DollarSign,
  Package
} from "lucide-react";
import { toast } from "sonner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface CheckinModalProps {
  open: boolean;
  onClose: () => void;
  negociacoes: Negociacao[];
  streak: number;
  totalResolvidos: number;
  onComplete: () => void;
  onRemoveNegociacao: (id: string) => void;
}

type ActionType = "faturado" | "perdido" | "adiar" | null;

const MOTIVATIONAL_MESSAGES = [
  "💪 Você está arrasando!",
  "🔥 Em chamas hoje!",
  "🚀 Rumo ao sucesso!",
  "⭐ Vendedor nota 10!",
  "🎯 Foco total!",
  "💎 Negociador de elite!",
  "🏆 Campeão de vendas!",
];

const COMPLETION_MESSAGES = [
  "🎉 Parabéns! Você está em dia com suas negociações!",
  "🏆 Excelente! Todas as pendências foram resolvidas!",
  "⭐ Você é um vendedor exemplar!",
  "🔥 Streak mantido! Continue assim!",
];

export default function CheckinModal({
  open,
  onClose,
  negociacoes,
  streak,
  totalResolvidos,
  onComplete,
  onRemoveNegociacao,
}: CheckinModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [action, setAction] = useState<ActionType>(null);
  const [motivoPerda, setMotivoPerda] = useState("");
  const [showMotivoInput, setShowMotivoInput] = useState(false);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);
  const { updateNegociacao, isUpdating } = useNegociacoes();
  const constraintsRef = useRef(null);

  const currentNegociacao = negociacoes[currentIndex];
  const progress = negociacoes.length > 0 
    ? ((currentIndex) / negociacoes.length) * 100 
    : 100;
  const remaining = negociacoes.length - currentIndex;

  const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleAction = async (actionType: ActionType) => {
    if (!currentNegociacao) return;

    if (actionType === "perdido" && !showMotivoInput) {
      setShowMotivoInput(true);
      setAction("perdido");
      return;
    }

    try {
      if (actionType === "faturado") {
        await updateNegociacao({
          id: currentNegociacao.id,
          status: "faturado",
          data_fechamento: new Date().toISOString().split('T')[0],
        });
        toast.success("🎉 Negociação faturada!", {
          description: getRandomMessage(MOTIVATIONAL_MESSAGES),
        });
        onRemoveNegociacao(currentNegociacao.id);
      } else if (actionType === "perdido") {
        await updateNegociacao({
          id: currentNegociacao.id,
          status: "perdido",
          motivo_perda: motivoPerda || "Não informado",
          data_fechamento: new Date().toISOString().split('T')[0],
        });
        toast.info("Negociação marcada como perdida", {
          description: "Siga em frente, novas oportunidades virão!",
        });
        setMotivoPerda("");
        setShowMotivoInput(false);
        onRemoveNegociacao(currentNegociacao.id);
      } else if (actionType === "adiar") {
        // Just move to next without changing status
        toast.info("⏰ Adiado para depois");
      }

      // Move to next
      if (currentIndex < negociacoes.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // All done!
        onComplete();
        toast.success(getRandomMessage(COMPLETION_MESSAGES));
        onClose();
      }

      setAction(null);
      setDragDirection(null);
    } catch (error) {
      toast.error("Erro ao atualizar negociação");
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Swiped right = Faturado
      handleAction("faturado");
    } else if (info.offset.x < -threshold) {
      // Swiped left = Perdido
      handleAction("perdido");
    }
    
    setDragDirection(null);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setDragDirection("right");
    } else if (info.offset.x < -50) {
      setDragDirection("left");
    } else {
      setDragDirection(null);
    }
  };

  if (!open) return null;

  // Completion screen
  if (negociacoes.length === 0 || currentIndex >= negociacoes.length) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-green-800">
          <VisuallyHidden>
            <DialogTitle>Check-in Completo</DialogTitle>
          </VisuallyHidden>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8 space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            
            <div>
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                Tudo em dia!
              </h2>
              <p className="text-green-600 dark:text-green-400">
                Você está com todas as negociações atualizadas.
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-500">
                  <Flame className="w-5 h-5" />
                  <span className="text-2xl font-bold">{streak}</span>
                </div>
                <span className="text-sm text-muted-foreground">dias seguidos</span>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-purple-500">
                  <Trophy className="w-5 h-5" />
                  <span className="text-2xl font-bold">{totalResolvidos}</span>
                </div>
                <span className="text-sm text-muted-foreground">resolvidas</span>
              </div>
            </div>

            <Button onClick={onClose} className="w-full" size="lg">
              Continuar para Negociações
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-gradient-to-b from-background to-muted/50">
        <VisuallyHidden>
          <DialogTitle>Check-in Diário de Negociações</DialogTitle>
        </VisuallyHidden>
        {/* Header with stats */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="w-5 h-5" />
                <span className="font-bold">{streak}</span>
              </div>
              <div className="flex items-center gap-1 text-purple-500">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{totalResolvidos}</span>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Target className="w-3 h-3" />
              {remaining} pendente{remaining !== 1 ? 's' : ''}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {getRandomMessage(MOTIVATIONAL_MESSAGES)}
          </p>
        </div>

        {/* Card container */}
        <div 
          ref={constraintsRef}
          className="relative px-6 pb-4 h-[320px] overflow-hidden"
        >
          {/* Background indicators */}
          <AnimatePresence>
            {dragDirection === "right" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-green-500/20 flex items-center justify-start pl-8 z-0"
              >
                <div className="bg-green-500 rounded-full p-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            )}
            {dragDirection === "left" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-500/20 flex items-center justify-end pr-8 z-0"
              >
                <div className="bg-red-500 rounded-full p-4">
                  <X className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Draggable card */}
          <motion.div
            key={currentNegociacao.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: dragDirection === "right" ? 5 : dragDirection === "left" ? -5 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`relative bg-card border-2 rounded-xl p-4 shadow-lg cursor-grab active:cursor-grabbing z-10 h-full flex flex-col
              ${dragDirection === "right" ? "border-green-500" : ""}
              ${dragDirection === "left" ? "border-red-500" : "border-border"}
            `}
          >
            {/* Negociacao number */}
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="font-mono">
                {currentNegociacao.numero_negociacao}
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400">
                {STATUS_LABELS[currentNegociacao.status]}
              </Badge>
            </div>

            {/* Client info */}
            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg leading-tight">
                    {currentNegociacao.cliente?.nome_razao || "Cliente não informado"}
                  </p>
                </div>
              </div>

              {currentNegociacao.cliente?.cidade && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">
                    {currentNegociacao.cliente.cidade}
                    {currentNegociacao.cliente.estado && `, ${currentNegociacao.cliente.estado}`}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="font-semibold text-green-600">
                  {formatCurrency(currentNegociacao.valor_estimado || 0)}
                </span>
              </div>

              {currentNegociacao.produtos && currentNegociacao.produtos.length > 0 && (
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {currentNegociacao.produtos.slice(0, 2).map((p, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {p.quantidade}x {p.nome}
                      </Badge>
                    ))}
                    {currentNegociacao.produtos.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{currentNegociacao.produtos.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Swipe instructions */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-3 border-t">
              <span className="flex items-center gap-1">
                <X className="w-3 h-3 text-red-500" />
                Perdeu
              </span>
              <span className="text-center">← Arraste →</span>
              <span className="flex items-center gap-1">
                Faturou
                <Check className="w-3 h-3 text-green-500" />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Motivo perda input */}
        <AnimatePresence>
          {showMotivoInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-4 overflow-hidden"
            >
              <Textarea
                placeholder="Por que perdemos esta negociação?"
                value={motivoPerda}
                onChange={(e) => setMotivoPerda(e.target.value)}
                className="mb-2"
                rows={2}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowMotivoInput(false);
                    setMotivoPerda("");
                    setAction(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleAction("perdido")}
                  disabled={isUpdating}
                >
                  Confirmar Perda
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        {!showMotivoInput && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex-col h-auto py-3 border-red-200 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-950"
                onClick={() => handleAction("perdido")}
                disabled={isUpdating}
              >
                <X className="w-5 h-5 text-red-500 mb-1" />
                <span className="text-xs text-red-600 dark:text-red-400">Perdeu</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex-col h-auto py-3 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 dark:border-yellow-800 dark:hover:bg-yellow-950"
                onClick={() => handleAction("adiar")}
                disabled={isUpdating}
              >
                <Clock className="w-5 h-5 text-yellow-500 mb-1" />
                <span className="text-xs text-yellow-600 dark:text-yellow-400">Adiar</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex-col h-auto py-3 border-green-200 hover:bg-green-50 hover:border-green-300 dark:border-green-800 dark:hover:bg-green-950"
                onClick={() => handleAction("faturado")}
                disabled={isUpdating}
              >
                <Check className="w-5 h-5 text-green-500 mb-1" />
                <span className="text-xs text-green-600 dark:text-green-400">Faturou</span>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3 text-muted-foreground"
              onClick={onClose}
            >
              Fazer depois
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
