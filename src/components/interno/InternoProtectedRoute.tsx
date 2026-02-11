import { Navigate, Link } from "react-router-dom";
import { useInternoAuth } from "@/contexts/InternoAuthContext";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/interno";

interface InternoProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function InternoProtectedRoute({ 
  children, 
  allowedRoles 
}: InternoProtectedRouteProps) {
  const { user, userRole, loading } = useInternoAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/interno/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center p-8 bg-card rounded-lg shadow-lg space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Acesso Negado</h1>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
          <Button asChild>
            <Link to="/interno/login" className="gap-2">
              <LogIn className="h-4 w-4" />
              Fazer Login
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
