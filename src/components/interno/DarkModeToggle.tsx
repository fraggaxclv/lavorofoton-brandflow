import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInternoDarkMode } from "@/hooks/useInternoDarkMode";

export default function DarkModeToggle() {
  const { isDark, toggle } = useInternoDarkMode();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="h-9 w-9"
      title={isDark ? "Modo claro" : "Modo escuro"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
