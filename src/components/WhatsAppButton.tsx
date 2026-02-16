import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();
  
  // Não exibir no sistema interno
  if (location.pathname.startsWith("/interno")) return null;

  const whatsappNumber = "5531996970656";
  const message = "Olá! Gostaria de mais informações sobre os veículos Foton.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#20BA5A] transition-all hover:scale-110 animate-fade-in group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-industrial-dark text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco!
      </span>
    </a>
  );
};

export default WhatsAppButton;
