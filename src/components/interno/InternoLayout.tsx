import { useState, useCallback, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { Button } from "@/components/ui/button";
import Breadcrumb from "./Breadcrumb";
import ErrorBoundary from "./ErrorBoundary";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  User,
  ChevronLeft,
  UserCog,
  Home,
  TrendingDown,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InternoLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { 
    path: "/interno/dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    roles: ["admin", "vendedor"] as const
  },
  { 
    path: "/interno/negociacoes", 
    label: "Negociações", 
    icon: Briefcase,
    roles: ["admin", "vendedor"] as const
  },
  { 
    path: "/interno/clientes", 
    label: "Clientes", 
    icon: Users,
    roles: ["admin", "vendedor"] as const
  },
  { 
    path: "/interno/meu-perfil", 
    label: "Meu Perfil", 
    icon: User,
    roles: ["vendedor"] as const
  },
  { 
    path: "/interno/pedidos-publicos", 
    label: "Pedidos Site", 
    icon: Inbox,
    roles: ["admin"] as const
  },
  { 
    path: "/interno/relatorio-perdas", 
    label: "Rel. Perdas", 
    icon: TrendingDown,
    roles: ["admin"] as const
  },
  { 
    path: "/interno/consultores", 
    label: "Consultores", 
    icon: UserCog,
    roles: ["admin"] as const
  },
];

function InternoLayout({ children }: InternoLayoutProps) {
  const { profile, userRole, signOut } = useInternoAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = profile?.nome_exibicao || profile?.full_name || profile?.email || "Usuário";

  const filteredNavItems = navItems.filter(item => 
    userRole && (item.roles as readonly string[]).includes(userRole)
  );

  const isDashboard = location.pathname === "/interno/dashboard";

  const handleGoBack = useCallback(() => {
    // Try to go back, but if there's no history, go to dashboard
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/interno/dashboard");
    }
  }, [navigate]);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile Header - Otimizado para touch */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-[60] bg-card border-b border-border h-14 flex items-center justify-between px-3 safe-area-inset-top">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menu"
          className="h-11 w-11 min-w-[44px] min-h-[44px]"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/interno/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">FL</span>
          </div>
          <span className="font-semibold text-sm text-foreground">Foton Lavoro</span>
        </Link>
        <div className="w-11" />
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Maior área de toque para mobile */}
      <aside className={cn(
        "fixed top-0 left-0 z-[60] h-full w-72 sm:w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:w-64 safe-area-inset-left",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-border">
            <Link to="/interno/dashboard" className="flex items-center gap-2" onClick={closeSidebar}>
              <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">FL</span>
              </div>
              <span className="font-semibold text-foreground">Foton Lavoro</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden h-11 w-11 min-w-[44px] min-h-[44px]"
              onClick={closeSidebar}
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info - Toque maior */}
          <div className="p-3 border-b border-border">
            <Link
              to="/interno/meu-perfil"
              onClick={closeSidebar}
              className="flex items-center gap-3 hover:bg-muted/50 -m-1 p-3 rounded-lg transition-colors min-h-[56px]"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole === 'vendedor' ? 'Consultor' : userRole === 'admin' ? 'Administrador' : userRole}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </Link>
          </div>

          {/* Navigation - Itens maiores para touch */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto overscroll-contain">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-medium transition-colors min-h-[52px]",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted/80"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-5 w-5" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-border safe-area-inset-bottom">
            <Button
              variant="ghost"
              size="lg"
              className="w-full justify-start text-muted-foreground hover:text-destructive min-h-[52px]"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Breadcrumb - Oculto em mobile para economia de espaço */}
          <div className="hidden sm:block">
            <Breadcrumb />
          </div>
          
          {/* Back Button - Maior área de toque, só em páginas internas */}
          {!isDashboard && (
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="-ml-2 text-muted-foreground hover:text-foreground h-10 px-3 min-h-[44px]"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="hidden xs:inline">Voltar</span>
              </Button>
              
              {/* Quick access buttons - Maiores para touch */}
              <div className="flex gap-2">
                {location.pathname !== "/interno/negociacoes" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/interno/negociacoes")}
                    className="gap-1.5 h-10 px-3 min-h-[44px]"
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">Negociações</span>
                  </Button>
                )}
                {location.pathname !== "/interno/clientes" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/interno/clientes")}
                    className="gap-1.5 h-10 px-3 min-h-[44px]"
                  >
                    <Users className="h-4 w-4" />
                    <span className="hidden sm:inline">Clientes</span>
                  </Button>
                )}
              </div>
            </div>
          )}
          
          {/* Page Content with Error Boundary */}
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default memo(InternoLayout);
