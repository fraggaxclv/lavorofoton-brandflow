import { Link } from "react-router-dom";
import { Menu, X, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-foton-lavoro-transparente.png";

const modelosDiesel = [
  { label: "Aumark S315", to: "/modelos/aumark-s315" },
  { label: "Aumark 715", to: "/modelos/aumark-715" },
  { label: "Aumark 916", to: "/modelos/aumark-916" },
  { label: "Aumark 1217", to: "/modelos/aumark-1217" },
  { label: "Auman D 1722", to: "/modelos/auman-d-1722" },
];

const modelosEletricos = [
  { label: "eWonder", to: "/modelos/ewonder" },
  { label: "eToano", to: "/modelos/etoano" },
  { label: "eView", to: "/modelos/eview" },
  { label: "eAumark 9T", to: "/modelos/eaumark-9t" },
  { label: "eAumark 12T", to: "/modelos/eaumark-12t" },
  { label: "iBlue 6T", to: "/modelos/iblue-6t" },
];

const modelosPickups = [
  { label: "Tunland V9", to: "/modelos/tunland-v9" },
  { label: "Tunland V7", to: "/modelos/tunland-v7" },
];

const comparativos = [
  { label: "Aumark 1217 vs Concorrentes", to: "/comparativo-aumark-1217" },
  { label: "eWonder vs Diesel", to: "/comparativo-ewonder" },
  { label: "Calculadora ROI", to: "/calculadora-roi" },
];

// Desktop dropdown component
function DesktopDropdown({ 
  label, 
  children 
}: { 
  label: string; 
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const ref = useRef<HTMLDivElement>(null);

  const enter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const leave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <button className="flex items-center gap-1 transition-colors py-2">
        <span className="text-primary font-bold">{label}</span>
        <ChevronDown className={`h-4 w-4 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-1 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-border py-2 min-w-[220px] animate-in fade-in-0 zoom-in-95 duration-150">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function DropdownSection({ title, items, onClose }: { title: string; items: { label: string; to: string }[]; onClose?: () => void }) {
  return (
    <div>
      <p className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// Mobile accordion section
function MobileAccordion({
  label,
  children,
  onClose,
}: {
  label: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-foreground hover:text-primary transition-colors font-medium py-1"
      >
        <span className="text-primary font-bold">{label}</span>
        <ChevronDown className={`h-4 w-4 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pl-4 pt-1 pb-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MobileSubSection({ title, items, onClose }: { title: string; items: { label: string; to: string }[]; onClose: () => void }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-1 pb-0.5">{title}</p>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onClose}
          className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, signOut } = useAuth();
  const close = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container-lavoro">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Foton Lavoro" className="h-12 md:h-14" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-7">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/quem-somos" className="text-foreground hover:text-primary transition-colors font-medium">
              Conheça a LAVORO
            </Link>
            <Link to="/sobre-foton" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre a FOTON
            </Link>

            {/* Modelos Dropdown */}
            <DesktopDropdown label="Modelos">
              <Link
                to="/modelos"
                className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted transition-colors border-b border-border mb-1"
              >
                Ver todos os modelos →
              </Link>
              <DropdownSection title="Linha Diesel" items={modelosDiesel} />
              <div className="border-t border-border my-1" />
              <DropdownSection title="Linha Elétrica" items={modelosEletricos} />
              <div className="border-t border-border my-1" />
              <DropdownSection title="Picapes" items={modelosPickups} />
            </DesktopDropdown>

            {/* Comparativos Dropdown */}
            <DesktopDropdown label="Comparativos">
              {comparativos.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </DesktopDropdown>

            <Link to="/servicos" className="text-foreground hover:text-primary transition-colors font-medium">
              Serviços
            </Link>
            {isAdmin && (
              <Link to="/admin/pedidos-faturamento" className="text-foreground hover:text-primary transition-colors font-medium">
                Pedidos
              </Link>
            )}
            <Link to="/contato" className="bg-primary text-primary-foreground px-6 py-2 rounded font-semibold hover:bg-primary-dark transition-all">
              Contato
            </Link>
            {isAdmin && (
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t border-border max-h-[80vh] overflow-y-auto">
            <Link to="/" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={close}>
              Home
            </Link>
            <Link to="/quem-somos" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={close}>
              Conheça a LAVORO
            </Link>
            <Link to="/sobre-foton" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={close}>
              Sobre a Foton
            </Link>

            {/* Modelos Accordion */}
            <MobileAccordion label="Modelos" onClose={close}>
              <Link to="/modelos" onClick={close} className="block py-1.5 text-sm font-semibold text-primary">
                Ver todos os modelos →
              </Link>
              <MobileSubSection title="Linha Diesel" items={modelosDiesel} onClose={close} />
              <MobileSubSection title="Linha Elétrica" items={modelosEletricos} onClose={close} />
              <MobileSubSection title="Picapes" items={modelosPickups} onClose={close} />
            </MobileAccordion>

            {/* Comparativos Accordion */}
            <MobileAccordion label="Comparativos" onClose={close}>
              {comparativos.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className="block py-1.5 text-sm text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </MobileAccordion>

            <Link to="/servicos" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={close}>
              Serviços
            </Link>
            {isAdmin && (
              <Link to="/admin/pedidos-faturamento" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={close}>
                Pedidos
              </Link>
            )}
            <Link to="/contato" className="block bg-primary text-primary-foreground px-6 py-2 rounded font-semibold text-center" onClick={close}>
              Contato
            </Link>
            {isAdmin && (
              <Button
                onClick={() => { signOut(); close(); }}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
