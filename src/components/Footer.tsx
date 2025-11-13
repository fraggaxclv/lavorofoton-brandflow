import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-industrial-dark text-primary-foreground">
      <div className="container-lavoro py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              LAVORO <span className="text-primary">FOTON</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Concessionária oficial Foton em Minas Gerais. Força, confiança e performance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quem-somos" className="text-muted-foreground hover:text-primary transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/modelos" className="text-muted-foreground hover:text-primary transition-colors">
                  Modelos
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-muted-foreground hover:text-primary transition-colors">
                  Serviços
                </Link>
              </li>
            </ul>
          </div>

          {/* Modelos */}
          <div>
            <h4 className="font-semibold mb-4">Modelos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/modelos/s315" className="text-muted-foreground hover:text-primary transition-colors">
                  Foton S315
                </Link>
              </li>
              <li>
                <Link to="/modelos/7t" className="text-muted-foreground hover:text-primary transition-colors">
                  Foton 7T
                </Link>
              </li>
              <li>
                <Link to="/modelos/9t" className="text-muted-foreground hover:text-primary transition-colors">
                  Foton 9T
                </Link>
              </li>
              <li>
                <Link to="/modelos/1217" className="text-muted-foreground hover:text-primary transition-colors">
                  Foton 1217
                </Link>
              </li>
              <li>
                <Link to="/modelos/17t" className="text-muted-foreground hover:text-primary transition-colors">
                  Foton 17T
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-primary" />
                (31) 3333-4444
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-primary" />
                contato@lavorofoton.com.br
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                Minas Gerais, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lavoro Foton. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
