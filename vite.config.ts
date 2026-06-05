import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Rotas públicas a pré-renderizar — entregam HTML completo para
// crawlers que não executam JavaScript (ChatGPT, Perplexity, LinkedIn,
// WhatsApp, scrapers de inteligência de mercado).
// CRM /interno e fluxos autenticados NÃO entram aqui.
const PRERENDER_ROUTES = [
  "/",
  "/quem-somos",
  "/sobre-foton",
  "/modelos",
  "/servicos",
  "/contato",
  "/imprensa",
  "/calculadora",
  "/calculadora-tco",
  "/calculadora-2",
  "/calculadora-roi",
  "/comparativo-aumark-1217",
  "/comparativo-ewonder",
  "/eletricos-beneficios",
  "/eletricos-beneficios-2",
  "/modelos/aumark-s315",
  "/modelos/aumark-715",
  "/modelos/aumark-916",
  "/modelos/aumark-1217",
  "/modelos/auman-d-1722",
  "/modelos/auman-d-1830",
  "/modelos/auman-d-2632",
  "/modelos/tunland-v9",
  "/modelos/tunland-v7",
  "/modelos/ewonder",
  "/modelos/etoano",
  "/modelos/eview",
  "/modelos/ev-connect",
  "/modelos/eaumark-9t",
  "/modelos/eaumark-12t",
  "/modelos/iblue-6t",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Pré-renderização estática só em produção
    mode === "production" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterTime: 1500,
          headless: true,
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
