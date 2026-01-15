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
import { 
  Negociacao, 
  StatusNegociacao, 
  STATUS_LABELS, 
  STATUS_COLORS,
  formatCurrency 
} from "@/types/interno";
import { Calendar, DollarSign, GripVertical } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface KanbanBoardProps {
  negociacoes: Negociacao[];
  onStatusChange: (negociacao: Negociacao, newStatus: StatusNegociacao) => Promise<void>;
  onCardClick: (negociacao: Negociacao) => void;
  isUpdating?: boolean;
}

const statusOrder: StatusNegociacao[] = [
  "lead_novo",
  "proposta_enviada", 
  "negociacao",
  "credito_analise",
  "aprovado",
  "faturado",
  "perdido"
];

// Status columns to show in kanban (excluding closed statuses for cleaner view)
const kanbanColumns: StatusNegociacao[] = [
  "lead_novo",
  "proposta_enviada", 
  "negociacao",
  "credito_analise",
  "aprovado",
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
        "cursor-pointer hover:shadow-md transition-all bg-card",
        (isDragging || isSortableDragging) && "opacity-50 shadow-lg ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <button
            {...attributes}
            {...listeners}
            className="mt-1 cursor-grab active:cursor-grabbing touch-none"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {negociacao.numero_negociacao}
              </span>
            </div>
            <p className="font-medium text-sm truncate">
              {negociacao.cliente?.nome_razao || "Cliente"}
            </p>
            {negociacao.produto_principal && (
              <p className="text-xs text-muted-foreground truncate">
                {negociacao.produto_principal}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {formatCurrency(negociacao.valor_estimado || 0)}
              </span>
              {negociacao.data_proximo_passo && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(negociacao.data_proximo_passo), "dd/MM", { locale: ptBR })}
                </span>
              )}
            </div>
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
    <div className="flex flex-col min-w-[280px] max-w-[320px] w-full bg-muted/30 rounded-lg">
      <CardHeader className="pb-2 px-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[status] }}
            />
            <CardTitle className="text-sm font-medium">
              {STATUS_LABELS[status]}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {negociacoes.length}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {formatCurrency(totalValue)}
        </p>
      </CardHeader>
      <div 
        className="flex-1 px-2 pb-2 space-y-2 min-h-[200px] overflow-y-auto"
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
  onCardClick,
  isUpdating 
}: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<Negociacao | null>(null);

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
      await onStatusChange(activeNegociacao, targetStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {kanbanColumns.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            negociacoes={getColumnNegociacoes(status)}
            onCardClick={onCardClick}
          />
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
  );
}
