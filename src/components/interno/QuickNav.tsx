import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  UserPlus,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickNavProps {
  className?: string;
  showNewButtons?: boolean;
  onNewNegociacao?: () => void;
  onNewCliente?: () => void;
}

export default function QuickNav({ 
  className, 
  showNewButtons = true,
  onNewNegociacao,
  onNewCliente
}: QuickNavProps) {
  const location = useLocation();
  
  const navItems = [
    { path: "/interno/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/interno/clientes", label: "Clientes", icon: Users },
    { path: "/interno/negociacoes", label: "Negociações", icon: Briefcase },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Quick navigation pills */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "h-7 px-2 text-xs gap-1",
                  isActive && "bg-background shadow-sm"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Action buttons */}
      {showNewButtons && (
        <div className="flex items-center gap-1 ml-auto">
          {location.pathname !== "/interno/negociacoes" && onNewNegociacao && (
            <Button 
              size="sm" 
              className="h-7 px-2 text-xs gap-1"
              onClick={onNewNegociacao}
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Negociação</span>
            </Button>
          )}
          {location.pathname !== "/interno/clientes" && onNewCliente && (
            <Button 
              variant="outline"
              size="sm" 
              className="h-7 px-2 text-xs gap-1"
              onClick={onNewCliente}
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cliente</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
