import { defineMcp } from "@lovable.dev/mcp-js";
import listarModelos from "./tools/listar-modelos";
import gerarLinkWhatsapp from "./tools/contato-whatsapp";
import infoEmpresa from "./tools/info-empresa";

export default defineMcp({
  name: "lavoro-foton-mcp",
  title: "Lavoro Foton MCP",
  version: "0.1.0",
  instructions:
    "Servidor MCP da Lavoro Foton (concessionária oficial Foton em MG). Use `listar_modelos` para consultar a linha de caminhões e picapes, `info_empresa` para dados institucionais e links úteis, e `gerar_link_whatsapp` para produzir um link direto de contato com o consultor.",
  tools: [listarModelos, infoEmpresa, gerarLinkWhatsapp],
});
