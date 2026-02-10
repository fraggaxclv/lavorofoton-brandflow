import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-foton-lavoro-transparente.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, signOut } = useAuth();

  return <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container-lavoro">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Foton Lavoro" className="h-12 md:h-14" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/quem-somos" className="text-foreground hover:text-primary transition-colors font-medium">
              Conheça a LAVORO
            </Link>
            <Link to="/sobre-foton" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre a FOTON
            </Link>
            <Link to="/modelos" className="text-foreground hover:text-primary transition-colors font-medium">
              Modelos
            </Link>
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
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link to="/" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/quem-somos" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Conheça a LAVORO
            </Link>
            <Link to="/sobre-foton" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Sobre a Foton
            </Link>
            <Link to="/modelos" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Modelos
            </Link>
            <Link to="/servicos" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Serviços
            </Link>
            {isAdmin && (
              <Link to="/admin/pedidos-faturamento" className="block text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Pedidos
              </Link>
            )}
            <Link to="/contato" className="block bg-primary text-primary-foreground px-6 py-2 rounded font-semibold text-center" onClick={() => setIsOpen(false)}>
              Contato
            </Link>
            {isAdmin && (
              <Button 
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }} 
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            )}
          </div>}
      </div>
    </nav>;
};
export default Navbar;