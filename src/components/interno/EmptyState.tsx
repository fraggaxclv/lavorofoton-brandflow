import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon, Plus, Search } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  searchTerm?: string;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  searchTerm 
}: EmptyStateProps) {
  const ActionIcon = action?.icon || Plus;

  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          {searchTerm ? (
            <Search className="h-8 w-8 text-muted-foreground" />
          ) : (
            <Icon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
          {searchTerm 
            ? `Nenhum resultado encontrado para "${searchTerm}". Tente ajustar sua busca.`
            : description}
        </p>
        {action && !searchTerm && (
          <Button onClick={action.onClick} className="gap-2">
            <ActionIcon className="h-4 w-4" />
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
