import { useEffect } from "react";
import { useClippings, Clipping } from "@/hooks/useClippings";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Play, ExternalLink, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

function formatData(d: string | null) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function ClippingCard({ c }: { c: Clipping }) {
  const isVideo = c.tipo === "video";
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >

      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-border">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {c.thumbnail_url ? (
            <img
              src={c.thumbnail_url}
              alt={c.titulo}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {isVideo ? <Play className="w-12 h-12" /> : <Newspaper className="w-12 h-12" />}
            </div>
          )}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="bg-white/90 rounded-full p-3">
                <Play className="w-6 h-6 text-black fill-black" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs text-muted-foreground">
            <span className="font-medium truncate">{c.veiculo_nome || c.veiculo_dominio}</span>
            <span>{formatData(c.data_publicacao)}</span>
          </div>
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {c.titulo}
          </h3>
          {c.resumo && (
            <p className="text-sm text-muted-foreground line-clamp-3">{c.resumo}</p>
          )}
          <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
            Ler matéria <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </Card>
    </a>
  );
}

export default function Imprensa() {
  const { data: clippings = [], isLoading } = useClippings("publicado");

  useEffect(() => {
    document.title = "Imprensa - Lavoro Foton na Mídia";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "Acompanhe as notícias e cobertura da Lavoro Foton na mídia brasileira: caminhões Foton Aumark, Auman, Tunland e linha elétrica.";
    if (meta) meta.setAttribute("content", content);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Imprensa | Lavoro Foton — Clipping de mídia e cobertura de imprensa"
        description="Cobertura de imprensa da Lavoro Foton — Concessionária oficial Foton em Belo Horizonte e MG."
        path="/imprensa"
      />
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <header className="mb-10 max-w-3xl">
          <Badge variant="secondary" className="mb-3">Sala de imprensa</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Lavoro Foton na mídia</h1>
          <p className="text-muted-foreground text-lg">
            Reportagens, vídeos e notícias sobre a Foton e a Lavoro no Brasil.
          </p>
        </header>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && clippings.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Newspaper className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Em breve novas matérias por aqui.</p>
          </div>
        )}

        {!isLoading && clippings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clippings.map((c) => (
              <ClippingCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
