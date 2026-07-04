import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const WHATSAPP = "+5531996970656";

export default defineTool({
  name: "gerar_link_whatsapp",
  title: "Gerar link de contato WhatsApp",
  description: "Gera um link direto de WhatsApp para o consultor Lavoro Foton, com mensagem pré-preenchida sobre o interesse do cliente.",
  inputSchema: {
    mensagem: z.string().min(1).max(500).describe("Mensagem inicial que o cliente enviaria ao consultor."),
    modelo: z.string().optional().describe("Nome ou slug do modelo de interesse, se houver."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ mensagem, modelo }) => {
    const texto = modelo ? `${mensagem} (Modelo de interesse: ${modelo})` : mensagem;
    const url = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;
    return {
      content: [{ type: "text", text: `Link WhatsApp: ${url}` }],
      structuredContent: { url, telefone: WHATSAPP, mensagem: texto },
    };
  },
});
