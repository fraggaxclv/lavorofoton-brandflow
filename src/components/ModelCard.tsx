import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ModelCardProps {
  name: string;
  description: string;
  image: string;
  link: string;
  comingSoon?: boolean;
}

const ModelCard = ({ name, description, image, link, comingSoon = false }: ModelCardProps) => {
  return (
    <Link to={link} className="group card-premium overflow-hidden relative">
      {comingSoon && (
        <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
          EM BREVE
        </div>
      )}
      <div className="aspect-video overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
          Ver detalhes <ArrowRight size={20} className="ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default ModelCard;
