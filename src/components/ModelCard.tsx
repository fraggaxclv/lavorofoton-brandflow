import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ModelCardProps {
  name: string;
  description: string;
  image: string;
  link: string;
}

const ModelCard = ({ name, description, image, link }: ModelCardProps) => {
  return (
    <Link to={link} className="group card-premium overflow-hidden">
      <div className="aspect-video overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
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
