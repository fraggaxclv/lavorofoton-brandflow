import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { Button } from "@/components/ui/button";
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
  UserCog
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
    path: "/interno/clientes", 
    label: "Clientes", 
    icon: Users,
    roles: ["admin", "vendedor"] as const
  },
  { 
    path: "/interno/negociacoes", 
    label: "Negociações", 
    icon: Briefcase,
    roles: ["admin", "vendedor"] as const
  },
  { 
    path: "/interno/consultores", 
    label: "Consultores", 
    icon: UserCog,
    roles: ["admin"] as const
  },
];

export default function InternoLayout({ children }: InternoLayoutProps) {
  const { profile, userRole, signOut } = useInternoAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = profile?.nome_exibicao || profile?.full_name || profile?.email || "Usuário";

  const filteredNavItems = navItems.filter(item => 
    userRole && (item.roles as readonly string[]).includes(userRole)
  );

  const isDashboard = location.pathname === "/interno/dashboard";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center justify-between px-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <span className="font-semibold text-foreground">Sistema Interno</span>
        <div className="w-10" />
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link to="/interno/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FL</span>
              </div>
              <span className="font-semibold text-foreground">Foton Lavoro</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <Link
              to="/interno/meu-perfil"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 hover:bg-muted/50 -m-2 p-2 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole === 'vendedor' ? 'consultor' : userRole}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={signOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          {/* Back Button - only show when not on dashboard */}
          {!isDashboard && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
