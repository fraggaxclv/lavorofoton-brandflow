import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, Trash2, Eye, Download, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { supabase } from "@/integrations/supabase/client";
import { veiculosCatalogo, getVeiculoByModelo, type Veiculo } from "@/data/veiculosCatalogo";

import logoLavoro from "@/assets/logo-foton-lavoro.png";

interface ProdutoProposta {
  id: string;
  modelo: string;
  cor: string;
  anoModelo: string;
  opcionais: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  veiculo?: Veiculo;
}

interface FormData {
  local: string;
  data: string;
  nomeConsultor: string;
  numeroProposta: string;
  nomeCliente: string;
  cnpjCpf: string;
  cidade: string;
  estado: string;
  email: string;
  telefone: string;
  pagamentoTipo: string;
  pagamentoOutros: string;
  financeira: string;
  observacoes: string;
}

const ESTADOS_BR = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

// Função para gerar 10 informações persuasivas baseadas no veículo
const gerarInformacoesPersuasivas = (veiculo: Veiculo): string[] => {
  const infoBase: Record<string, string[]> = {
    'diesel': [
      `Projetado para operações versáteis, entrega performance consistente em rotas urbanas e regionais.`,
      `Capacidade de carga de ${veiculo.capacidade} — dimensionado para maximizar produtividade por viagem.`,
      `${veiculo.caracteristicas.find(c => c.includes('Motor')) || 'Motorização premium'} — tecnologia validada globalmente.`,
      `Consumo otimizado para reduzir custo por quilômetro rodado em até 15% comparado à média do segmento.`,
      `Chassi e estrutura desenvolvidos para suportar operação intensiva — durabilidade comprovada.`,
      `Cabine ergonômica com ajustes personalizáveis — menor fadiga do operador, maior produtividade.`,
      `Rede de assistência técnica em todo Brasil — disponibilidade de peças superior a 95%.`,
      `Histórico de aprovação em financiamentos — veículo com alta aceitação bancária.`,
      `Valor de revenda consistente — ativos FOTON mantêm valorização competitiva.`,
      `TCO (Custo Total de Propriedade) até 20% inferior — economia real ao longo da vida útil.`
    ],
    'eletrico': [
      `Tecnologia 100% elétrica — zero emissões, zero restrições ambientais.`,
      `${veiculo.caracteristicas.find(c => c.includes('Autonomia')) || 'Autonomia estendida'} — suficiente para ciclos operacionais completos.`,
      `${veiculo.caracteristicas.find(c => c.includes('Motor')) || 'Motor elétrico de alta eficiência'} — torque instantâneo e resposta imediata.`,
      `Economia de até 80% em combustível — ROI acelerado e previsibilidade de custos.`,
      `${veiculo.caracteristicas.find(c => c.includes('Bateria')) || 'Bateria de última geração'} — tecnologia LFP de longa duração.`,
      `Operação silenciosa — ideal para entregas noturnas e áreas residenciais.`,
      `Manutenção simplificada — menos componentes móveis, menos paradas técnicas.`,
      `Garantia estendida de 5 anos para bateria — segurança total do investimento.`,
      `Acesso irrestrito a zonas de baixa emissão — preparado para regulamentações futuras.`,
      `Imagem corporativa sustentável — diferencial competitivo junto a clientes conscientes.`
    ],
    'picape': [
      `Versatilidade total — performa tanto no campo quanto na cidade.`,
      `${veiculo.caracteristicas.find(c => c.includes('Motor')) || 'Motorização diesel turbo'} — potência para qualquer terreno.`,
      `${veiculo.caracteristicas.find(c => c.includes('Tração')) || 'Sistema de tração avançado'} — segurança em qualquer condição.`,
      `${veiculo.caracteristicas.find(c => c.includes('Transmissão')) || 'Transmissão de ponta'} — dirigibilidade superior.`,
      `Interior premium com ${veiculo.caracteristicas.find(c => c.includes('Central')) || 'tecnologia embarcada'} — conforto executivo.`,
      `Robustez estrutural para operações intensivas — construída para durar.`,
      `Capacidade de reboque elevada — transporte versátil para sua operação.`,
      `Baixo custo de manutenção — peças acessíveis e rede de serviço ampla.`,
      `Alta aceitação em financiamentos — facilidade de aprovação de crédito.`,
      `Depreciação controlada — valor de revenda consistente no mercado.`
    ]
  };

  return infoBase[veiculo.categoria] || infoBase['diesel'];
};

export default function PropostaComercial() {
  const [produtos, setProdutos] = useState<ProdutoProposta[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfHtml, setPdfHtml] = useState("");
  const [numeroProposta, setNumeroProposta] = useState("");

  const { register, handleSubmit, watch, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      local: "Belo Horizonte",
      data: format(new Date(), "yyyy-MM-dd"),
      nomeConsultor: "",
      numeroProposta: "",
      nomeCliente: "",
      cnpjCpf: "",
      cidade: "",
      estado: "MG",
      email: "",
      telefone: "",
      pagamentoTipo: "avista",
      pagamentoOutros: "",
      financeira: "",
      observacoes: ""
    }
  });

  const pagamentoTipo = watch("pagamentoTipo");

  useEffect(() => {
    gerarNumeroProposta();
  }, []);

  const gerarNumeroProposta = async () => {
    try {
      const { data, error } = await supabase.rpc('gerar_numero_proposta');
      if (error) throw error;
      setNumeroProposta(data);
      setValue("numeroProposta", data);
    } catch (error) {
      const ano = new Date().getFullYear();
      const seq = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
      const numero = `LAV-${ano}-${seq}`;
      setNumeroProposta(numero);
      setValue("numeroProposta", numero);
    }
  };

  const adicionarProduto = () => {
    const novoProduto: ProdutoProposta = {
      id: crypto.randomUUID(),
      modelo: "",
      cor: "",
      anoModelo: "",
      opcionais: "",
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0
    };
    setProdutos([...produtos, novoProduto]);
  };

  const removerProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const atualizarProduto = (id: string, campo: keyof ProdutoProposta, valor: any) => {
    setProdutos(produtos.map(p => {
      if (p.id !== id) return p;
      
      const atualizado = { ...p, [campo]: valor };
      
      if (campo === 'modelo') {
        atualizado.veiculo = getVeiculoByModelo(valor);
      }
      
      if (campo === 'quantidade' || campo === 'valorUnitario') {
        atualizado.valorTotal = atualizado.quantidade * atualizado.valorUnitario;
      }
      
      return atualizado;
    }));
  };

  const calcularTotalProdutos = () => {
    return produtos.reduce((acc, p) => acc + p.valorTotal, 0);
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const parseMoeda = (valor: string) => {
    const numero = valor.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numero) || 0;
  };

  // Função para gerar tabela técnica do veículo
  const gerarTabelaTecnica = (veiculo: Veiculo): string => {
    const specs: { label: string; valor: string }[] = [];
    
    // Extrair informações das características
    veiculo.caracteristicas.forEach(c => {
      if (c.includes('Motor')) specs.push({ label: 'Motor', valor: c.replace('Motor ', '').replace('Motor elétrico ', '') });
      if (c.includes('Potência')) specs.push({ label: 'Potência', valor: c.replace('Potência: ', '') });
      if (c.includes('Torque')) specs.push({ label: 'Torque', valor: c.replace('Torque: ', '') });
      if (c.includes('Transmissão')) specs.push({ label: 'Transmissão', valor: c.replace('Transmissão ', '') });
      if (c.includes('Autonomia')) specs.push({ label: 'Autonomia', valor: c.replace('Autonomia de até ', '') });
      if (c.includes('Bateria')) specs.push({ label: 'Bateria', valor: c.replace('Bateria de lítio ', '').replace('Bateria ', '') });
      if (c.includes('Tração')) specs.push({ label: 'Tração', valor: c });
      if (c.includes('Freios')) specs.push({ label: 'Freios', valor: c });
    });

    // Adicionar dados fixos
    specs.push({ label: 'Capacidade', valor: veiculo.capacidade });
    specs.push({ label: 'CNH Exigida', valor: veiculo.cnh });
    
    // Garantia diferenciada por categoria
    let garantiaLabel = '';
    if (veiculo.categoria === 'eletrico') {
      garantiaLabel = '5 anos (bateria)';
    } else if (veiculo.categoria === 'picape') {
      garantiaLabel = '**10 anos ou 200.000 km';
    } else {
      garantiaLabel = '**3 anos ou 100.000 km';
    }
    specs.push({ label: 'Garantia de Fábrica', valor: garantiaLabel });

    const rows = specs.map(s => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #003366; width: 40%; font-size: 12px;">${s.label}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 12px;">${s.valor}</td>
      </tr>
    `).join('');

    return `
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        <thead>
          <tr style="background: #003366; color: white;">
            <th colspan="2" style="padding: 14px 16px; text-align: left; font-size: 14px; font-weight: 700;">ESPECIFICAÇÕES TÉCNICAS</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  };

  const gerarHtmlProposta = () => {
    const formData = getValues();
    const totalProdutos = calcularTotalProdutos();
    const dataFormatada = format(new Date(formData.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

    // Cada produto em 1 página inteira
    const produtosHtml = produtos.map((p, index) => {
      const infos = p.veiculo ? gerarInformacoesPersuasivas(p.veiculo) : [];
      const categoriaLabel = p.veiculo?.categoria === 'diesel' ? 'Linha Diesel' : 
                             p.veiculo?.categoria === 'eletrico' ? 'Linha Elétrica' : 'Linha Picapes';
      const tabelaTecnica = p.veiculo ? gerarTabelaTecnica(p.veiculo) : '';
      
      let garantiaLabel = '';
      if (p.veiculo?.categoria === 'eletrico') {
        garantiaLabel = '5 anos (bateria)';
      } else if (p.veiculo?.categoria === 'picape') {
        garantiaLabel = '**10 anos';
      } else {
        garantiaLabel = '**3 anos';
      }
      
      return `
        <div style="page-break-before: always; min-height: 100vh; padding: 32px 0;">
          <!-- Cabeçalho do Produto - 25% maior -->
          <div style="margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <span style="background: linear-gradient(135deg, #003366, #001a33); color: white; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${categoriaLabel}</span>
              <span style="background: #f0f9ff; color: #003366; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;">CNH ${p.veiculo?.cnh || '-'}</span>
              ${p.cor ? `<span style="background: #fef3c7; color: #92400e; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;">Cor: ${p.cor}</span>` : ''}
              ${p.anoModelo ? `<span style="background: #e0e7ff; color: #3730a3; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;">${p.anoModelo}</span>` : ''}
              <span style="background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;">Garantia: ${garantiaLabel}</span>
            </div>
            <h2 style="font-size: 30px; font-weight: 800; color: #1a1a2e; margin: 0 0 6px 0; letter-spacing: -0.5px;">${p.modelo}</h2>
            <p style="font-size: 15px; color: #6b7280; margin: 0;">Capacidade: ${p.veiculo?.capacidade || 'Consultar'}</p>
          </div>

          <!-- Imagem Principal - Mantendo tamanho atual -->
          <div style="margin-bottom: 20px;">
            ${p.veiculo ? `
              <img src="${p.veiculo.imagem}" alt="${p.modelo}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" />
            ` : '<div style="width: 100%; height: 180px; background: #f3f4f6; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 14px;">Imagem não disponível</div>'}
          </div>

          <!-- Grid: 10 Qualificações + Tabela Técnica + Valor -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- 10 Informações Relevantes -->
            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: #1a1a2e; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #003366; padding-bottom: 8px; display: inline-block;">Por que este veículo?</h3>
              <ul style="margin: 0; padding: 0; list-style: none;">
                ${infos.map((info, i) => `
                  <li style="display: flex; gap: 10px; margin-bottom: 8px; font-size: 12px; line-height: 1.6; color: #374151;">
                    <span style="flex-shrink: 0; width: 20px; height: 20px; background: linear-gradient(135deg, #003366, #001a33); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700;">${i + 1}</span>
                    <span>${info}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Coluna Direita: Tabela Técnica + Valor -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${tabelaTecnica}
              
              <!-- Valor deste produto - abaixo da tabela técnica -->
              <div style="background: #f8fafc; padding: 14px 20px; border-radius: 8px; border: 1px solid #003366; text-align: right;">
                <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Valor Unitário</div>
                <div style="font-size: 20px; font-weight: 800; color: #003366;">${formatarMoeda(p.valorUnitario)}</div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Qtd: ${p.quantidade} | Total: ${formatarMoeda(p.valorTotal)}</div>
              </div>
            </div>
          </div>

          ${p.opcionais ? `
          <!-- Opcionais -->
          <div style="margin-top: 20px; background: #fffbeb; padding: 16px 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <div style="font-size: 11px; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 600;">Opcionais Inclusos</div>
            <p style="font-size: 13px; color: #78350f; margin: 0; line-height: 1.6;">${p.opcionais}</p>
          </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Condições comerciais - Compacto
    const condicoesHtml = produtos.map(p => `
      <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e5e7eb; align-items: center;">
        <div>
          <div style="font-weight: 600; color: #1a1a2e; font-size: 12px;">${p.modelo}</div>
          <div style="font-size: 10px; color: #6b7280;">${p.veiculo?.capacidade || ''}</div>
        </div>
        <div style="text-align: center; color: #374151; font-size: 11px;">${p.quantidade} un.</div>
        <div style="text-align: right; color: #374151; font-size: 11px;">${formatarMoeda(p.valorUnitario)}</div>
        <div style="text-align: right; font-weight: 700; color: #1a1a2e; font-size: 11px;">${formatarMoeda(p.valorTotal)}</div>
      </div>
    `).join('');

    const formaPagamento = pagamentoTipo === 'avista' ? 'À Vista' :
                           pagamentoTipo === 'consorcio' ? 'Consórcio' :
                           pagamentoTipo === 'cdc' ? 'CDC - Crédito Direto ao Consumidor' :
                           pagamentoTipo === 'direto' ? 'Financiamento Direto' :
                           formData.pagamentoOutros || 'A definir';

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Proposta Comercial ${formData.numeroProposta}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, sans-serif; 
            color: #1a1a2e; 
            line-height: 1.6;
            padding: 40px 48px;
            max-width: 900px;
            margin: 0 auto;
            background: white;
          }
          @media print {
            body { padding: 24px; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <!-- ========== PÁGINA 1: CAPA EXECUTIVA PREMIUM ========== -->
        
        <!-- HEADER INSTITUCIONAL DISCRETO -->
        <div style="background: white; margin: -40px -48px 0 -48px; padding: 28px 48px 20px 48px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <img src="${logoLavoro}" alt="Foton Lavoro" style="height: 42px; margin-bottom: 8px;" />
              <div style="font-size: 11px; color: #64748b; line-height: 1.4;">
                Concessionária Oficial FOTON – Minas Gerais
              </div>
              <div style="font-size: 10px; color: #94a3b8; font-style: italic; margin-top: 2px;">
                "40 anos de confiança."
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Proposta Comercial</div>
              <div style="font-size: 12px; color: #64748b;">Código: <span style="font-weight: 600; color: #475569;">${formData.numeroProposta}</span></div>
              <div style="font-size: 11px; color: #94a3b8;">Data: ${dataFormatada}</div>
            </div>
          </div>
        </div>

        <!-- TÍTULO CENTRAL -->
        <div style="text-align: center; padding: 36px 32px 28px 32px; background: white;">
          <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.35; margin: 0 0 12px 0; letter-spacing: -0.3px;">
            Uma decisão pensada para eficiência,<br/>segurança e crescimento.
          </h1>
          <p style="font-size: 13px; color: #64748b; margin: 0; font-weight: 400;">
            Proposta de solução logística elaborada sob medida para sua operação.
          </p>
        </div>

        <!-- BLOCO DO CLIENTE -->
        <div style="text-align: center; padding: 28px 32px; background: white;">
          <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; font-weight: 500;">
            Elaborada exclusivamente para
          </div>
          <div style="font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
            ${formData.nomeCliente}
          </div>
          <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
            <span style="font-size: 12px; color: #64748b;">${formData.cidade} – ${formData.estado}</span>
            <span style="font-size: 12px; color: #64748b;">Consultor: <span style="font-weight: 600; color: #475569;">${formData.nomeConsultor}</span></span>
          </div>
        </div>

        <!-- TEXTO DE CONTEXTO -->
        <div style="padding: 24px 40px; background: white;">
          <div style="max-width: 620px; margin: 0 auto; text-align: center;">
            <p style="font-size: 12px; color: #475569; line-height: 1.8; margin: 0;">
              Esta proposta foi desenvolvida a partir da análise do perfil operacional de <strong style="color: #0f172a;">${formData.nomeCliente}</strong>, considerando suas necessidades logísticas atuais, capacidade de investimento e objetivos de expansão. A solução apresentada reflete uma configuração amplamente utilizada por empresas que buscam previsibilidade operacional, eficiência financeira e segurança na tomada de decisão.
            </p>
          </div>
        </div>

        <!-- BLOCO DE AUTORIDADE (FOTON + LAVORO) - VERTICAL -->
        <div style="padding: 24px 40px; background: white;">
          <!-- Card FOTON -->
          <div style="background: #f8fafc; padding: 16px 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #003366, #001a33); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="color: white; font-weight: 800; font-size: 14px;">F</span>
              </div>
              <div style="flex: 1;">
                <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">FOTON</h4>
                <p style="font-size: 11px; color: #64748b; line-height: 1.5; margin: 0;">
                  Uma das maiores fabricantes de veículos comerciais do mundo, presente em mais de 110 países. Reconhecida globalmente por confiabilidade, robustez e inovação industrial.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Card LAVORO -->
          <div style="background: #f8fafc; padding: 16px 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #dc2626, #991b1b); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <span style="color: white; font-weight: 800; font-size: 14px;">L</span>
              </div>
              <div style="flex: 1;">
                <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">LAVORO</h4>
                <p style="font-size: 11px; color: #64748b; line-height: 1.5; margin: 0;">
                  Concessionária oficial FOTON em Minas Gerais, com mais de 40 anos de atuação no setor de veículos comerciais, oferecendo atendimento consultivo, suporte completo e relacionamento de longo prazo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCO "SOLUÇÃO SELECIONADA" -->
        <div style="padding: 28px 40px 36px 40px; background: white;">
          <div style="text-align: center; margin-bottom: 16px;">
            <h3 style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; margin: 0;">
              Soluções selecionadas para sua operação
            </h3>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-bottom: 16px;">
            ${produtos.map(p => `
              <div style="background: linear-gradient(145deg, #0055a4, #003366); color: white; padding: 20px 32px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,51,102,0.35), 0 4px 12px rgba(0,85,164,0.25), inset 0 1px 0 rgba(255,255,255,0.15); min-width: 180px; text-align: center; border: 2px solid rgba(255,255,255,0.2); transform: translateY(0); transition: all 0.3s;">
                <div style="font-weight: 900; font-size: 18px; margin-bottom: 4px; text-shadow: 0 2px 4px rgba(0,0,0,0.2); letter-spacing: 0.5px;">${p.modelo}</div>
                <div style="font-size: 11px; opacity: 0.9; font-weight: 500;">${p.quantidade} unidade${p.quantidade > 1 ? 's' : ''}</div>
              </div>
            `).join('')}
          </div>
          
          <div style="text-align: center; max-width: 520px; margin: 0 auto;">
            <p style="font-size: 11px; color: #94a3b8; line-height: 1.6; margin: 0;">
              Configuração recomendada após análise do perfil operacional da empresa, considerando eficiência logística, rentabilidade e disponibilidade.
            </p>
          </div>
        </div>

        <!-- ========== PÁGINAS DE PRODUTOS (1 por produto) ========== -->
        ${produtosHtml}

        <!-- ========== PÁGINA FINAL: CONDIÇÕES E ASSINATURAS ========== -->
        <div style="page-break-before: always; padding-top: 32px;">
          
          <!-- Condições Comerciais -->
          <div style="margin-bottom: 48px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 3px solid #003366;">
              Condições Comerciais
            </h2>

            <!-- Tabela de Produtos Compacta -->
            <div style="margin-bottom: 20px;">
              <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 12px; padding: 10px 0; border-bottom: 2px solid #1a1a2e; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7280;">
                <div>Produto</div>
                <div style="text-align: center;">Qtd</div>
                <div style="text-align: right;">Unit.</div>
                <div style="text-align: right;">Total</div>
              </div>
              ${condicoesHtml}
            </div>

            <!-- Total e Forma de Pagamento - Compacto -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div style="background: #f8fafc; padding: 14px 16px; border-radius: 8px;">
                <div style="font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Forma de Pagamento</div>
                <div style="font-size: 14px; font-weight: 700; color: #1a1a2e;">${formaPagamento}</div>
                ${formData.financeira ? `<div style="font-size: 11px; color: #6b7280; margin-top: 4px;">Instituição: ${formData.financeira}</div>` : ''}
              </div>
              <div style="background: linear-gradient(135deg, #003366, #001a33); padding: 14px 16px; border-radius: 8px; color: white;">
                <div style="font-size: 9px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">Valor Total</div>
                <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.3px;">${formatarMoeda(totalProdutos)}</div>
              </div>
            </div>
          </div>

          ${formData.observacoes ? `
          <!-- Observações -->
          <div style="margin-bottom: 48px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 12px;">Observações</h3>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
              <p style="font-size: 13px; color: #374151; line-height: 1.7; white-space: pre-wrap; margin: 0;">${formData.observacoes}</p>
            </div>
          </div>
          ` : ''}

          <!-- Assinaturas -->
          <div style="margin-top: 64px;">
            <h3 style="font-size: 14px; font-weight: 700; color: #1a1a2e; margin-bottom: 32px; text-transform: uppercase; letter-spacing: 0.5px;">Aceite da Proposta</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px;">
              <div style="text-align: center;">
                <div style="border-bottom: 2px solid #1a1a2e; margin-bottom: 12px; height: 80px;"></div>
                <div style="font-size: 14px; font-weight: 700; color: #1a1a2e;">Cliente</div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${formData.nomeCliente}</div>
              </div>
              <div style="text-align: center;">
                <div style="border-bottom: 2px solid #1a1a2e; margin-bottom: 12px; height: 80px;"></div>
                <div style="font-size: 14px; font-weight: 700; color: #1a1a2e;">Consultor Lavoro</div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">${formData.nomeConsultor}</div>
              </div>
              <div style="text-align: center;">
                <div style="border-bottom: 2px solid #1a1a2e; margin-bottom: 12px; height: 80px;"></div>
                <div style="font-size: 14px; font-weight: 700; color: #1a1a2e;">Gerência</div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">Lavoro Foton</div>
              </div>
            </div>
          </div>

          <!-- Seção 5 - Previsão de Entrega do Veículo -->
          <div style="margin-top: 48px; background: #fff; border: 2px solid #1a1a2e;">
            <div style="background: #1a1a2e; padding: 10px 16px;">
              <h4 style="font-size: 12px; font-weight: 700; color: white; margin: 0; text-transform: uppercase;">5 - PREVISÃO DE ENTREGA DO VEÍCULO</h4>
            </div>
            <div style="padding: 16px;">
              <p style="font-size: 11px; color: #1a1a2e; margin: 0 0 8px 0; line-height: 1.6;">
                DE ACORDO COM A DISPONIBILIDADE DE ESTOQUE E FÁBRICA.<br/>
                O REPRESENTANTE DA ENTREGA TÉCNICA LAVORO ENTRARÁ EM CONTATO PARA AGENDAMENTO DA ENTREGA.
              </p>
            </div>
            <div style="border-top: 2px solid #1a1a2e; padding: 16px;">
              <p style="font-size: 11px; color: #1a1a2e; margin: 0 0 12px 0; font-weight: 700;">OBS.: PEDIDO SUJEITO À APROVAÇÃO DE CRÉDITO.</p>
              <p style="font-size: 10px; color: #374151; margin: 0 0 8px 0; line-height: 1.7; text-align: justify;">
                1. OS PREÇOS COTADOS SÃO OS VIGENTES NESTA OCASIÃO E ESTARÃO SUJEITOS À ALTERAÇÕES CASO O FABRICANTE MODIFIQUE SUAS NORMAS DE COMERCIALIZAÇÃO, NO QUE TANGE À PREÇOS, DESCONTOS OU PRAZOS DE PAGAMENTOS, E TAMBÉM A ALTERAÇÃO DE ALÍQUOTA DO ICMS/IPI CONFORME LEGISLAÇÃO ESTADUAL E FEDERAL.
              </p>
              <p style="font-size: 10px; color: #374151; margin: 0; line-height: 1.7; text-align: justify;">
                2. O PEDIDO DE VENDA NÃO TERÁ VALIDADE SE NÃO ESTIVER DEVIDAMENTE PREENCHIDO E ASSINADO, SEM RASURAS.
              </p>
            </div>
            <div style="border-top: 2px solid #1a1a2e; padding: 16px;">
              <p style="font-size: 11px; color: #1a1a2e; margin: 0 0 8px 0; font-weight: 700;">APRESENTAR CÓPIA DOS DOCUMENTOS:</p>
              <p style="font-size: 10px; color: #374151; margin: 0 0 6px 0; line-height: 1.6;">
                <strong>PESSOA FÍSICA:</strong> CÓPIA RG, CPF E COMPROVANTE DE ENDEREÇO ATUALIZADO.
              </p>
              <p style="font-size: 10px; color: #374151; margin: 0; line-height: 1.6;">
                <strong>PESSOA JURÍDICA:</strong> CONTRATO SOCIAL, ÚLTIMA ALTERAÇÃO, RG E CPF DO SÓCIO ADMINISTRADOR.
              </p>
            </div>
          </div>

          <!-- Rodapé Premium -->
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="font-size: 11px; color: #9ca3af; margin-bottom: 8px;">
              Proposta válida por 5 dias corridos a partir da data de emissão. Este documento não possui valor contratual.
            </p>
            <p style="font-size: 10px; color: #9ca3af;">
              Lavoro Foton • Concessionária Oficial FOTON em Minas Gerais • 40+ anos de tradição no mercado de veículos comerciais
            </p>
          </div>

          <!-- Letras Miúdas / Disclaimer -->
          <div style="margin-top: 40px; padding: 20px 24px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h4 style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Termos e Condições</h4>
            <p style="font-size: 9px; color: #94a3b8; line-height: 1.7; margin: 0; text-align: justify;">
              As informações técnicas, especificações e características dos veículos apresentados nesta proposta são de caráter informativo e estão sujeitas à confirmação de acordo com o manual do produto específico e documentação oficial do fabricante. Preços, condições de pagamento, prazos de entrega e disponibilidade de modelos estão sujeitos a alterações sem aviso prévio, de acordo com políticas de fábrica, variações cambiais, tributárias e de mercado. Imagens ilustrativas podem apresentar acessórios e equipamentos não inclusos no valor apresentado. A garantia de fábrica segue os termos e condições estabelecidos pelo fabricante, conforme certificado de garantia entregue no momento da aquisição. Esta proposta não constitui contrato de compra e venda, sendo apenas um documento comercial para fins de negociação. Para formalização da aquisição, será necessário instrumento contratual específico.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const visualizarProposta = () => {
    const formData = getValues();
    
    if (!formData.nomeCliente || !formData.nomeConsultor) {
      toast.error("Preencha os dados básicos e do cliente");
      return;
    }
    
    if (produtos.length === 0) {
      toast.error("Adicione pelo menos um produto à proposta");
      return;
    }

    if (produtos.some(p => !p.modelo)) {
      toast.error("Selecione o modelo de todos os produtos");
      return;
    }

    const html = gerarHtmlProposta();
    setPdfHtml(html);
    setShowPreview(true);
  };

  const exportarPDF = async () => {
    const html = gerarHtmlProposta();
    const formData = getValues();

    // Salvar no banco
    try {
      setLoading(true);
      const { error } = await supabase.from('propostas_comerciais').insert({
        numero_proposta: formData.numeroProposta,
        local: formData.local,
        data: formData.data,
        nome_vendedor: formData.nomeConsultor,
        nome_cliente: formData.nomeCliente,
        cnpj: formData.cnpjCpf,
        cidade: formData.cidade,
        estado: formData.estado,
        faturamento_tipo: 'estoque',
        pagamento_tipo: formData.pagamentoTipo,
        pagamento_outros: formData.pagamentoOutros,
        valor_total: calcularTotalProdutos(),
        produtos: produtos.map(p => ({
          modelo: p.modelo,
          quantidade: p.quantidade,
          valorUnitario: p.valorUnitario,
          valorTotal: p.valorTotal
        })),
        observacoes: formData.observacoes
      });

      if (error) throw error;

      // Abrir janela de impressão
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print();
        };
      }

      toast.success("Proposta salva e PDF gerado com sucesso!");
    } catch (error) {
      console.error('Erro ao salvar proposta:', error);
      toast.error("Erro ao salvar proposta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Proposta Comercial</h1>
              <p className="text-slate-400 text-sm">Lavoro Foton • Minas Gerais</p>
            </div>
          </div>
          <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
            Gere propostas comerciais profissionais e persuasivas. Cada proposta é uma decisão estratégica documentada.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Número da Proposta */}
        <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Número da Proposta</span>
            <p className="text-xl font-bold text-slate-900">{numeroProposta}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={visualizarProposta} variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Visualizar
            </Button>
            <Button onClick={exportarPDF} disabled={loading} className="gap-2 bg-red-600 hover:bg-red-700">
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Básicos */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                  Dados Básicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="local">Local</Label>
                    <Input id="local" {...register("local")} placeholder="Cidade" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Input id="data" type="date" {...register("data")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nomeConsultor">Consultor</Label>
                    <Input id="nomeConsultor" {...register("nomeConsultor")} placeholder="Nome do consultor" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados do Cliente */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                  Dados do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="nomeCliente">Nome / Razão Social</Label>
                    <Input id="nomeCliente" {...register("nomeCliente")} placeholder="Nome completo ou razão social" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpjCpf">CNPJ / CPF</Label>
                    <Input id="cnpjCpf" {...register("cnpjCpf")} placeholder="00.000.000/0000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" {...register("telefone")} placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="email@empresa.com" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" {...register("cidade")} placeholder="Cidade" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">UF</Label>
                      <Select value={watch("estado")} onValueChange={(v) => setValue("estado", v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ESTADOS_BR.map(uf => (
                            <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Produtos */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                    Produtos
                  </CardTitle>
                  <Button onClick={adicionarProduto} variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {produtos.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Nenhum produto adicionado</p>
                    <p className="text-xs mt-1">Clique em "Adicionar" para incluir um veículo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {produtos.map((produto, index) => (
                      <div key={produto.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Produto {index + 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removerProduto(produto.id)}
                            className="text-slate-400 hover:text-red-600 h-6 w-6 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-6 gap-3">
                          <div className="col-span-2 space-y-1">
                            <Label className="text-xs">Modelo</Label>
                            <Select
                              value={produto.modelo}
                              onValueChange={(v) => atualizarProduto(produto.id, 'modelo', v)}
                            >
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Selecione o modelo" />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="px-2 py-1.5 text-xs font-bold text-slate-500">
                                  ─ Linha Diesel ─
                                </div>
                                {veiculosCatalogo.filter(v => v.categoria === 'diesel').map(v => (
                                  <SelectItem key={v.id} value={v.modelo}>
                                    {v.modelo} ({v.capacidade})
                                  </SelectItem>
                                ))}
                                <div className="px-2 py-1.5 text-xs font-bold text-slate-500">
                                  ─ Linha Elétrica ─
                                </div>
                                {veiculosCatalogo.filter(v => v.categoria === 'eletrico').map(v => (
                                  <SelectItem key={v.id} value={v.modelo}>
                                    {v.modelo} ({v.capacidade})
                                  </SelectItem>
                                ))}
                                <div className="px-2 py-1.5 text-xs font-bold text-slate-500">
                                  ─ Picapes ─
                                </div>
                                {veiculosCatalogo.filter(v => v.categoria === 'picape').map(v => (
                                  <SelectItem key={v.id} value={v.modelo}>
                                    {v.modelo} ({v.capacidade})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Cor</Label>
                            <Input
                              placeholder="Ex: Branco"
                              value={produto.cor}
                              onChange={(e) => atualizarProduto(produto.id, 'cor', e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Ano/Modelo</Label>
                            <Input
                              placeholder="25/25"
                              value={produto.anoModelo}
                              onChange={(e) => atualizarProduto(produto.id, 'anoModelo', e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Qtd</Label>
                            <Input
                              type="number"
                              min="1"
                              value={produto.quantidade}
                              onChange={(e) => atualizarProduto(produto.id, 'quantidade', parseInt(e.target.value) || 1)}
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Valor Unit.</Label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={produto.valorUnitario || ''}
                              onChange={(e) => atualizarProduto(produto.id, 'valorUnitario', parseFloat(e.target.value) || 0)}
                              className="bg-white"
                            />
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <Label className="text-xs">Opcionais (opcional)</Label>
                          <Input
                            placeholder="Ex: Ar condicionado, Direção hidráulica, etc."
                            value={produto.opcionais}
                            onChange={(e) => atualizarProduto(produto.id, 'opcionais', e.target.value)}
                            className="bg-white"
                          />
                        </div>
                        {produto.veiculo && (
                          <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-3">
                            <img 
                              src={produto.veiculo.imagem} 
                              alt={produto.modelo}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="text-xs text-slate-500">
                              <p className="font-medium text-slate-700">{produto.veiculo.capacidade}</p>
                              <p>CNH: {produto.veiculo.cnh}</p>
                            </div>
                            {produto.valorTotal > 0 && (
                              <div className="ml-auto text-right">
                                <p className="text-xs text-slate-500">Total</p>
                                <p className="text-sm font-bold text-slate-900">{formatarMoeda(produto.valorTotal)}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {produtos.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Total Geral</p>
                      <p className="text-lg font-bold text-slate-900">{formatarMoeda(calcularTotalProdutos())}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Condições Comerciais */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
                  Condições
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Forma de Pagamento</Label>
                  <Select value={pagamentoTipo} onValueChange={(v) => setValue("pagamentoTipo", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avista">À Vista</SelectItem>
                      <SelectItem value="cdc">CDC</SelectItem>
                      <SelectItem value="consorcio">Consórcio</SelectItem>
                      <SelectItem value="direto">Financiamento Direto</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pagamentoTipo === 'outros' && (
                  <div className="space-y-2">
                    <Label htmlFor="pagamentoOutros">Especificar</Label>
                    <Input id="pagamentoOutros" {...register("pagamentoOutros")} placeholder="Descreva a forma de pagamento" />
                  </div>
                )}

                {(pagamentoTipo === 'cdc' || pagamentoTipo === 'direto') && (
                  <div className="space-y-2">
                    <Label htmlFor="financeira">Instituição Financeira</Label>
                    <Input id="financeira" {...register("financeira")} placeholder="Nome do banco/financeira" />
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    {...register("observacoes")}
                    placeholder="Informações adicionais, condições especiais..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            <Card className="shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Gerar Proposta</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={visualizarProposta} 
                    variant="secondary" 
                    className="w-full gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Visualizar Proposta
                  </Button>
                  <Button 
                    onClick={exportarPDF} 
                    disabled={loading}
                    className="w-full gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <Download className="h-4 w-4" />
                    {loading ? "Gerando..." : "Baixar PDF"}
                  </Button>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">
                  A proposta será salva automaticamente
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Preview */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-slate-50">
            <div className="flex items-center justify-between">
              <DialogTitle>Pré-visualização da Proposta</DialogTitle>
              <div className="flex gap-2">
                <Button onClick={exportarPDF} disabled={loading} size="sm" className="gap-2 bg-red-600 hover:bg-red-700">
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-slate-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
              <iframe
                srcDoc={pdfHtml}
                className="w-full h-[calc(90vh-120px)] border-0"
                title="Preview da Proposta"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
