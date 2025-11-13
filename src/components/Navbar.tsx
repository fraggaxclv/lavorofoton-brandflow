import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-foton-lavoro.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container-lavoro">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Foton Lavoro" className="h-8 md:h-10" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/quem-somos" className="text-foreground hover:text-primary transition-colors font-medium">
              Quem Somos
            </Link>
            <Link to="/modelos" className="text-foreground hover:text-primary transition-colors font-medium">
              Modelos
            </Link>
            <Link to="/servicos" className="text-foreground hover:text-primary transition-colors font-medium">
              Serviços
            </Link>
            <Link to="/contato" className="bg-primary text-primary-foreground px-6 py-2 rounded font-semibold hover:bg-primary-dark transition-all">
              Contato
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/quem-somos"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Quem Somos
            </Link>
            <Link
              to="/modelos"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Modelos
            </Link>
            <Link
              to="/servicos"
              className="block text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Serviços
            </Link>
            <Link
              to="/contato"
              className="block bg-primary text-primary-foreground px-6 py-2 rounded font-semibold text-center"
              onClick={() => setIsOpen(false)}
            >
              Contato
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
