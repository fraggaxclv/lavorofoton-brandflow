import { useEffect, useState } from "react";
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

function initials(name?: string | null) {
  if (!name) return "LF";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const GRADIENTS = [
  "from-blue-700 via-blue-900 to-slate-900",
  "from-slate-800 via-slate-900 to-black",
  "from-indigo-700 via-blue-800 to-slate-900",
  "from-zinc-700 via-zinc-900 to-black",
  "from-blue-600 via-indigo-800 to-slate-900",
  "from-emerald-800 via-slate-800 to-slate-900",
];
function gradientFor(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

function FallbackArt({
  veiculo,
  isVideo,
}: {
  veiculo: string;
  isVideo: boolean;
}) {
  const grad = gradientFor(veiculo);
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${grad} flex items-center justify-center text-white`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold">
        {isVideo ? <Play className="w-3 h-3" /> : <Newspaper className="w-3 h-3" />}
        {isVideo ? "Vídeo" : "Notícia"}
      </div>
      <div className="relative z-10 text-center px-6">
        <div className="text-5xl font-black tracking-tight mb-2 drop-shadow">
          {initials(veiculo)}
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] opacity-80 font-medium line-clamp-1">
          {veiculo}
        </div>
      </div>
    </div>
  );
}

function ClippingCard({ c }: { c: Clipping }) {
  const isVideo = c.tipo === "video";
  const veiculo = c.veiculo_nome || c.veiculo_dominio || "Imprensa";
  const [imgFailed, setImgFailed] = useState(false);
  const showFallback = !c.thumbnail_url || imgFailed;

  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-border">
        <div className="aspect-video relative overflow-hidden bg-muted">
          {!showFallback && (
            <img
              src={c.thumbnail_url!}
              alt={c.titulo}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgFailed(true)}
            />
          )}
          {showFallback && <FallbackArt veiculo={veiculo} isVideo={isVideo} />}
          {isVideo && !showFallback && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="bg-white/90 rounded-full p-3">
                <Play className="w-6 h-6 text-black fill-black" />
              </div>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <span className="font-semibold text-primary truncate uppercase tracking-wide">
              {veiculo}
            </span>
            <span className="text-muted-foreground whitespace-nowrap">
              {formatData(c.data_publicacao)}
            </span>
          </div>
          <h3 className="font-bold text-base leading-snug mb-2 line-clamp-3 group-hover:text-primary transition-colors">
            {c.titulo}
          </h3>
          {c.resumo && c.resumo.trim().toLowerCase() !== c.titulo.trim().toLowerCase() && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {c.resumo}
            </p>
          )}
          <div className="flex items-center gap-1 mt-auto pt-2 text-xs text-primary font-semibold">
            Ler matéria <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </Card>
    </a>
  );
}

export default function Imprensa() {
  const { data: rawClippings = [], isLoading } = useClippings("publicado");

  // Deduplica títulos quase iguais (ex.: mesma matéria republicada por veículos diferentes)
  const clippings = (() => {
    const seen = new Set<string>();
    const norm = (s: string) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);
    return rawClippings.filter((c) => {
      const k = norm(c.titulo);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  })();

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
