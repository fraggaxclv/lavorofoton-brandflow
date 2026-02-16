import { useState, useCallback, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { Button } from "@/components/ui/button";
import Breadcrumb from "./Breadcrumb";
import ErrorBoundary from "./ErrorBoundary";
import BuscaGlobal from "./BuscaGlobal";
import NotificacoesVencidas from "./NotificacoesVencidas";
import DarkModeToggle from "./DarkModeToggle";
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
  TrendingDown,
  Inbox,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InternoLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/interno/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "vendedor"] as const },
  { path: "/interno/negociacoes", label: "Negociações", icon: Briefcase, roles: ["admin", "vendedor"] as const },
  { path: "/interno/clientes", label: "Clientes", icon: Users, roles: ["admin", "vendedor"] as const },
  { path: "/interno/meu-perfil", label: "Meu Perfil", icon: User, roles: ["vendedor"] as const },
  { path: "/interno/pedidos-publicos", label: "Pedidos Site", icon: Inbox, roles: ["admin"] as const },
  { path: "/interno/relatorio-perdas", label: "Rel. Perdas", icon: TrendingDown, roles: ["admin"] as const },
  { path: "/interno/consultores", label: "Consultores", icon: UserCog, roles: ["admin"] as const },
];

function InternoLayout({ children }: InternoLayoutProps) {
  const { profile, userRole, signOut } = useInternoAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buscaOpen, setBuscaOpen] = useState(false);

  const displayName = profile?.nome_exibicao || profile?.full_name || profile?.email || "Usuário";

  const filteredNavItems = navItems.filter(item => 
    userRole && (item.roles as readonly string[]).includes(userRole)
  );

  const isDashboard = location.pathname === "/interno/dashboard";

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K → Busca Global
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setBuscaOpen(true);
        return;
      }

      // Alt shortcuts (only when not in input/textarea)
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      if (e.altKey) {
        switch (e.key) {
          case "d": e.preventDefault(); navigate("/interno/dashboard"); break;
          case "n": e.preventDefault(); navigate("/interno/negociacoes"); break;
          case "c": e.preventDefault(); navigate("/interno/clientes"); break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleGoBack = useCallback(() => {
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
      {/* Notificações de tarefas vencidas */}
      <NotificacoesVencidas />

      {/* Busca Global (Cmd+K) */}
      <BuscaGlobal open={buscaOpen} onOpenChange={setBuscaOpen} />

      {/* Mobile Header */}
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
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBuscaOpen(true)}
            className="h-11 w-11 min-w-[44px] min-h-[44px]"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
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
            <div className="flex items-center gap-1">
              <DarkModeToggle />
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
          </div>

          {/* Search Button */}
          <div className="p-3 pb-0">
            <button
              onClick={() => { setBuscaOpen(true); closeSidebar(); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-muted/50 text-muted-foreground text-sm hover:bg-muted transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Buscar...</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* User Info */}
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

          {/* Navigation */}
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

          {/* Keyboard Shortcuts Hint */}
          <div className="hidden lg:block px-4 pb-2">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              <kbd className="font-mono">Alt+D</kbd> Dashboard · <kbd className="font-mono">Alt+N</kbd> Negociações · <kbd className="font-mono">Alt+C</kbd> Clientes
            </p>
          </div>

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
          {/* Breadcrumb */}
          <div className="hidden sm:block">
            <Breadcrumb />
          </div>
          
          {/* Back Button */}
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
          
          {/* Page Content */}
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}

export default memo(InternoLayout);
