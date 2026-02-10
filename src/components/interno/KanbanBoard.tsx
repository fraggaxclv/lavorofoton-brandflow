import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MotivoPerdaModal from "@/components/interno/MotivoPerdaModal";
import { 
  Negociacao, 
  StatusNegociacao,
  TipoVenda,
  STATUS_LABELS, 
  STATUS_COLORS,
  TIPO_VENDA_LABELS,
  formatCurrency 
} from "@/types/interno";
import { Calendar, DollarSign, GripVertical, Factory, Package, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface KanbanBoardProps {
  negociacoes: Negociacao[];
  onStatusChange: (negociacao: Negociacao, newStatus: StatusNegociacao, tipoVenda?: TipoVenda) => Promise<void>;
  onLossStatusChange: (negociacao: Negociacao, motivo: string) => Promise<void>;
  onCardClick: (negociacao: Negociacao) => void;
  isUpdating?: boolean;
}

const statusOrder: StatusNegociacao[] = [
  "lead_novo",
  "proposta_enviada", 
  "faturado",
  "perdido"
];

// Status columns to show in kanban - simplified view
const kanbanColumns: StatusNegociacao[] = [
  "lead_novo",
  "proposta_enviada", 
  "faturado",
  "perdido"
];

interface KanbanCardProps {
  negociacao: Negociacao;
  onClick: () => void;
  isDragging?: boolean;
}

function KanbanCard({ negociacao, onClick, isDragging }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ 
    id: negociacao.id,
    data: {
      type: "card",
      negociacao,
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-pointer hover:shadow-md transition-all bg-card active:scale-[0.98]",
        (isDragging || isSortableDragging) && "opacity-50 shadow-lg ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 sm:p-3">
        <div className="flex items-start gap-2">
          {/* Grip maior para mobile - área de toque mínima 44x44 */}
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 cursor-grab active:cursor-grabbing touch-none p-2 -m-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {negociacao.numero_negociacao}
              </span>
            </div>
            <p className="font-medium text-sm truncate leading-tight">
              {negociacao.cliente?.nome_fantasia || negociacao.cliente?.razao_social || "Cliente"}
            </p>
            {negociacao.produto_principal && (
              <p className="text-xs text-muted-foreground truncate">
                {negociacao.produto_principal}
              </p>
            )}
            {/* Mostra badge de tipo de venda apenas quando faturado e definido */}
            {negociacao.tipo_venda && negociacao.status === 'faturado' && (
              <div className="flex items-center gap-2">
                <Badge 
                  variant={negociacao.tipo_venda === 'fadireto' ? 'default' : 'secondary'} 
                  className={cn(
                    "text-[10px] px-1.5 py-0.5",
                    negociacao.tipo_venda === 'fadireto' && "bg-orange-500 hover:bg-orange-600 text-white"
                  )}
                >
                  {negociacao.tipo_venda === 'fadireto' ? (
                    <Factory className="h-2.5 w-2.5 mr-0.5" />
                  ) : (
                    <Package className="h-2.5 w-2.5 mr-0.5" />
                  )}
                  {TIPO_VENDA_LABELS[negociacao.tipo_venda]}
                </Badge>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1 font-medium">
                <DollarSign className="h-3.5 w-3.5" />
                {formatCurrency(negociacao.valor_estimado || 0)}
              </span>
              {negociacao.data_proximo_passo && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(negociacao.data_proximo_passo), "dd/MM", { locale: ptBR })}
                </span>
              )}
            </div>
            {/* Consultor responsável */}
            {negociacao.owner && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1 border-t border-border/50 mt-1">
                <User className="h-3.5 w-3.5" />
                <span className="truncate">
                  {negociacao.owner.nome_exibicao || negociacao.owner.full_name || negociacao.owner.email?.split('@')[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KanbanColumnProps {
  status: StatusNegociacao;
  negociacoes: Negociacao[];
  onCardClick: (negociacao: Negociacao) => void;
}

function KanbanColumn({ status, negociacoes, onCardClick }: KanbanColumnProps) {
  const totalValue = negociacoes.reduce((sum, n) => sum + (n.valor_estimado || 0), 0);

  return (
    <div className="flex flex-col min-w-[260px] sm:min-w-[280px] max-w-[320px] w-full bg-muted/30 rounded-lg flex-shrink-0">
      <CardHeader className="pb-2 px-3 pt-3 sticky top-0 bg-muted/30 backdrop-blur-sm z-10 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: STATUS_COLORS[status] }}
            />
            <CardTitle className="text-sm font-medium truncate">
              {STATUS_LABELS[status]}
            </CardTitle>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              {negociacoes.length}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          {formatCurrency(totalValue)}
        </p>
      </CardHeader>
      <div 
        className="flex-1 px-2 pb-2 space-y-2 min-h-[180px] sm:min-h-[200px] overflow-y-auto overscroll-contain"
        data-column={status}
      >
        <SortableContext
          items={negociacoes.map(n => n.id)}
          strategy={verticalListSortingStrategy}
        >
          {negociacoes.map(negociacao => (
            <KanbanCard
              key={negociacao.id}
              negociacao={negociacao}
              onClick={() => onCardClick(negociacao)}
            />
          ))}
        </SortableContext>
        {negociacoes.length === 0 && (
          <div className="h-20 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Arraste aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard({ 
  negociacoes, 
  onStatusChange,
  onLossStatusChange,
  onCardClick,
  isUpdating 
}: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<Negociacao | null>(null);
  const [lossDialogOpen, setLossDialogOpen] = useState(false);
  const [pendingLossNegociacao, setPendingLossNegociacao] = useState<Negociacao | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const getColumnNegociacoes = (status: StatusNegociacao) => {
    return negociacoes.filter(n => n.status === status);
  };

  const findColumn = (id: string): StatusNegociacao | null => {
    // Check if id is a column
    if (kanbanColumns.includes(id as StatusNegociacao)) {
      return id as StatusNegociacao;
    }
    
    // Find which column contains this card
    const negociacao = negociacoes.find(n => n.id === id);
    return negociacao?.status || null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const negociacao = negociacoes.find(n => n.id === active.id);
    if (negociacao) {
      setActiveCard(negociacao);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Visual feedback handled by dnd-kit
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the negociacao being dragged
    const activeNegociacao = negociacoes.find(n => n.id === activeId);
    if (!activeNegociacao) return;

    // Determine target column
    let targetStatus: StatusNegociacao | null = null;

    // Check if dropped on a column directly
    if (kanbanColumns.includes(overId as StatusNegociacao)) {
      targetStatus = overId as StatusNegociacao;
    } else {
      // Dropped on another card - find its column
      const overNegociacao = negociacoes.find(n => n.id === overId);
      if (overNegociacao) {
        targetStatus = overNegociacao.status;
      }
    }

    // If status changed, update it
    if (targetStatus && targetStatus !== activeNegociacao.status) {
      // If moving to "perdido", show loss reason dialog
      if (targetStatus === "perdido") {
        setPendingLossNegociacao(activeNegociacao);
        setLossDialogOpen(true);
      } else {
        await onStatusChange(activeNegociacao, targetStatus);
      }
    }
  };

  const handleConfirmLoss = async (motivo: string) => {
    if (!pendingLossNegociacao) return;
    await onLossStatusChange(pendingLossNegociacao, motivo);
    setPendingLossNegociacao(null);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Scroll horizontal otimizado para mobile - momentum scroll */}
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-3 px-3 sm:-mx-4 sm:px-4 snap-x snap-mandatory scroll-smooth overscroll-x-contain">
          {kanbanColumns.map(status => (
            <div key={status} className="snap-start">
              <KanbanColumn
                status={status}
                negociacoes={getColumnNegociacoes(status)}
                onCardClick={onCardClick}
              />
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeCard && (
            <div className="w-[280px]">
              <KanbanCard
                negociacao={activeCard}
                onClick={() => {}}
                isDragging
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Modal para motivo de perda */}
      <MotivoPerdaModal
        open={lossDialogOpen}
        onOpenChange={(open) => {
          setLossDialogOpen(open);
          if (!open) setPendingLossNegociacao(null);
        }}
        numeroNegociacao={pendingLossNegociacao?.numero_negociacao}
        onConfirm={handleConfirmLoss}
      />
    </>
  );
}
