import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  MessageSquare, 
  Users, 
  FileText, 
  Mail, 
  Building2, 
  Pin,
  Clock,
  File
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TipoAtividade, TIPO_ATIVIDADE_LABELS } from "@/types/interno";

const TIPO_ICONS: Record<TipoAtividade, React.ComponentType<{ className?: string }>> = {
  ligacao: Phone,
  whatsapp: MessageSquare,
  reuniao: Users,
  proposta: FileText,
  documento: File,
  email: Mail,
  visita: Building2,
  outro: Pin,
};

const TIPO_COLORS: Record<TipoAtividade, string> = {
  ligacao: "bg-blue-500/10 text-blue-600 border-blue-200",
  whatsapp: "bg-green-500/10 text-green-600 border-green-200",
  reuniao: "bg-purple-500/10 text-purple-600 border-purple-200",
  proposta: "bg-orange-500/10 text-orange-600 border-orange-200",
  documento: "bg-gray-500/10 text-gray-600 border-gray-200",
  email: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  visita: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  outro: "bg-slate-500/10 text-slate-600 border-slate-200",
};

interface Atividade {
  id: string;
  tipo: TipoAtividade;
  titulo?: string;
  nota?: string;
  data_hora: string;
  created_at: string;
  criador?: {
    email: string;
    full_name?: string;
    nome_exibicao?: string;
  };
}

interface AtividadeTimelineProps {
  atividades?: Atividade[];
  isLoading?: boolean;
  maxItems?: number;
  showHeader?: boolean;
  compact?: boolean;
}

export default function AtividadeTimeline({ 
  atividades, 
  isLoading, 
  maxItems = 10,
  showHeader = true,
  compact = false
}: AtividadeTimelineProps) {
  if (isLoading) {
    return (
      <Card>
        {showHeader && (
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-32" />
          </CardHeader>
        )}
        <CardContent className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const displayAtividades = atividades?.slice(0, maxItems) || [];

  return (
    <Card>
      {showHeader && (
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-primary" />
            Histórico de Atividades
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={showHeader ? "" : "pt-4"}>
        {displayAtividades.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma atividade registrada</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-4">
              {displayAtividades.map((atividade, index) => {
                const Icon = TIPO_ICONS[atividade.tipo] || Pin;
                const colorClass = TIPO_COLORS[atividade.tipo] || TIPO_COLORS.outro;
                const timeAgo = formatDistanceToNow(new Date(atividade.data_hora), { 
                  addSuffix: true, 
                  locale: ptBR 
                });

                return (
                  <div key={atividade.id} className="relative flex gap-3 pl-1">
                    {/* Icon */}
                    <div className={`
                      relative z-10 flex items-center justify-center w-8 h-8 rounded-full border
                      ${colorClass}
                    `}>
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Content */}
                    <div className={`flex-1 min-w-0 ${compact ? "pb-2" : "pb-4"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className={`text-xs ${colorClass}`}>
                              {TIPO_ATIVIDADE_LABELS[atividade.tipo]}
                            </Badge>
                            {atividade.titulo && (
                              <span className="text-sm font-medium truncate">
                                {atividade.titulo}
                              </span>
                            )}
                          </div>
                          {atividade.nota && !compact && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {atividade.nota}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                          {timeAgo}
                        </span>
                      </div>
                      {!compact && atividade.criador && (
                        <p className="text-xs text-muted-foreground mt-1">
                          por {atividade.criador.nome_exibicao || atividade.criador.full_name || atividade.criador.email}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
