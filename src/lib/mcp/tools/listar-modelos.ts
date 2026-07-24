import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const MODELOS = [
  { slug: "aumark-s315", nome: "AUMARK S315", categoria: "diesel", capacidade: "3,5 t", cnh: "B" },
  { slug: "aumark-715", nome: "AUMARK 715", categoria: "diesel", capacidade: "7 t", cnh: "C" },
  { slug: "aumark-916", nome: "AUMARK 916", categoria: "diesel", capacidade: "9 t", cnh: "C" },
  { slug: "aumark-1217", nome: "AUMARK 1217", categoria: "diesel", capacidade: "12 t", cnh: "C" },
  { slug: "auman-d-1722", nome: "AUMAN D 1722", categoria: "diesel", capacidade: "16 t", cnh: "C" },
  { slug: "auman-d-1830", nome: "AUMAN D 1830", categoria: "diesel", capacidade: "18 t", cnh: "C" },
  { slug: "auman-d-2632", nome: "AUMAN D 2632", categoria: "diesel", capacidade: "26 t", cnh: "C" },
  { slug: "tunland-v9", nome: "TUNLAND V9", categoria: "picape", capacidade: "1 t", cnh: "B" },
  { slug: "tunland-v7", nome: "TUNLAND V7", categoria: "picape", capacidade: "1 t", cnh: "B" },
  { slug: "ewonder", nome: "eWONDER", categoria: "eletrico", capacidade: "1,2 t", cnh: "B" },
  { slug: "etoano", nome: "eTOANO", categoria: "eletrico", capacidade: "3,5 t", cnh: "B" },
  { slug: "eview", nome: "eVIEW", categoria: "eletrico", capacidade: "3,5 t", cnh: "B" },
  { slug: "ev-connect", nome: "eV CONNECT", categoria: "eletrico", capacidade: "1,5 t", cnh: "B" },
  { slug: "eaumark-9t", nome: "eAUMARK 9T", categoria: "eletrico", capacidade: "9 t", cnh: "C" },
  { slug: "eaumark-12t", nome: "eAUMARK 12T", categoria: "eletrico", capacidade: "12 t", cnh: "C" },
  { slug: "eaumark-6t", nome: "e-AUMARK 6T", categoria: "eletrico", capacidade: "6 t", cnh: "C" },
];

export default defineTool({
  name: "listar_modelos",
  title: "Listar modelos Foton",
  description: "Lista os modelos de caminhões e picapes Foton disponíveis na Lavoro Foton, opcionalmente filtrados por categoria (diesel, eletrico, picape).",
  inputSchema: {
    categoria: z.enum(["diesel", "eletrico", "picape"]).optional().describe("Filtro opcional por categoria."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ categoria }) => {
    const itens = categoria ? MODELOS.filter((m) => m.categoria === categoria) : MODELOS;
    const linhas = itens.map((m) => `- ${m.nome} (${m.categoria}, ${m.capacidade}, CNH ${m.cnh}) — https://lavorofoton.com.br/modelos/${m.slug}`);
    return {
      content: [{ type: "text", text: `${itens.length} modelo(s):\n${linhas.join("\n")}` }],
      structuredContent: { modelos: itens },
    };
  },
});
