import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "info_empresa",
  title: "Informações da Lavoro Foton",
  description: "Retorna informações institucionais da Lavoro Foton: concessionária oficial Foton em Minas Gerais, canais de contato e links úteis (calculadora TCO, imprensa, modelos).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      nome: "Lavoro Foton",
      descricao: "Concessionária oficial Foton em Minas Gerais — caminhões diesel, elétricos e picapes Tunland.",
      whatsapp: "+55 31 99697-0656",
      site: "https://lavorofoton.com.br",
      links: {
        modelos: "https://lavorofoton.com.br/modelos",
        calculadora_tco: "https://lavorofoton.com.br/calculadora",
        comparativo_aumark: "https://lavorofoton.com.br/comparativo-aumark-1217",
        comparativo_ewonder: "https://lavorofoton.com.br/comparativo-ewonder",
        imprensa: "https://lavorofoton.com.br/imprensa",
        contato: "https://lavorofoton.com.br/contato",
      },
    };
    return {
      content: [{ type: "text", text: `Lavoro Foton — ${info.descricao}\nWhatsApp: ${info.whatsapp}\nSite: ${info.site}` }],
      structuredContent: info,
    };
  },
});
