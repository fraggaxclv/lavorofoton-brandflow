import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeMap: Record<string, string> = {
  "/interno/dashboard": "Dashboard",
  "/interno/clientes": "Clientes",
  "/interno/negociacoes": "Negociações",
  "/interno/consultores": "Consultores",
  "/interno/meu-perfil": "Meu Perfil",
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [];
  
  // Always start with Dashboard
  items.push({ label: "Dashboard", path: "/interno/dashboard" });

  // Add current page if not dashboard
  if (location.pathname !== "/interno/dashboard") {
    const currentLabel = routeMap[location.pathname];
    if (currentLabel) {
      items.push({ label: currentLabel, path: location.pathname });
    } else if (pathParts.includes("consultor")) {
      items.push({ label: "Consultores", path: "/interno/consultores" });
      items.push({ label: "Perfil", path: location.pathname });
    }
  }

  if (items.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.path} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {isLast ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-foreground transition-colors"
              >
                {index === 0 ? (
                  <Home className="h-3.5 w-3.5" />
                ) : (
                  item.label
                )}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
