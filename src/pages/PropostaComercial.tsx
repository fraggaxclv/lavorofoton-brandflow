import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, Trash2, Eye, Download, FileText, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { supabase } from "@/integrations/supabase/client";
import { veiculosCatalogo, getVeiculoByModelo, type Veiculo } from "@/data/veiculosCatalogo";

import logoLavoro from "@/assets/logo-foton-lavoro.png";

interface ProdutoProposta {
  id: string;
  modelo: string;
  quantidade: number;
  cor: string;
  anoModelo: string;
  valorUnitario: number;
  valorTotal: number;
  chassi: string;
  veiculo?: Veiculo;
}

interface FormData {
  local: string;
  data: string;
  nomeVendedor: string;
  numeroProposta: string;
  nomeCliente: string;
  cnpj: string;
  cidade: string;
  estado: string;
  faturamentoTipo: string;
  pagamentoTipo: string;
  pagamentoOutros: string;
  valorEntrada: string;
  valorFrete: string;
  prazoEntrega: string;
  tributacao: string;
  observacoes: string;
}

const ESTADOS_BR = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function PropostaComercial() {
  const [produtos, setProdutos] = useState<ProdutoProposta[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfHtml, setPdfHtml] = useState("");
  const [numeroProposta, setNumeroProposta] = useState("");

  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm<FormData>({
    defaultValues: {
      local: "Belo Horizonte",
      data: format(new Date(), "yyyy-MM-dd"),
      nomeVendedor: "",
      numeroProposta: "",
      nomeCliente: "",
      cnpj: "",
      cidade: "",
      estado: "MG",
      faturamentoTipo: "estoque",
      pagamentoTipo: "avista",
      pagamentoOutros: "",
      valorEntrada: "",
      valorFrete: "",
      prazoEntrega: "",
      tributacao: "",
      observacoes: ""
    }
  });

  const faturamentoTipo = watch("faturamentoTipo");
  const pagamentoTipo = watch("pagamentoTipo");

  // Gerar número da proposta ao carregar
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
      // Fallback local se a função RPC falhar
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
      quantidade: 1,
      cor: "",
      anoModelo: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
      valorUnitario: 0,
      valorTotal: 0,
      chassi: ""
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
      
      // Se mudou o modelo, atualizar veiculo
      if (campo === 'modelo') {
        atualizado.veiculo = getVeiculoByModelo(valor);
        atualizado.cor = atualizado.veiculo?.cores[0] || '';
      }
      
      // Recalcular valor total
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

  const handleValorChange = (id: string, valor: string) => {
    const numero = parseMoeda(valor);
    atualizarProduto(id, 'valorUnitario', numero);
  };

  const gerarHtmlProposta = () => {
    const formData = getValues();
    const totalProdutos = calcularTotalProdutos();
    const valorEntrada = parseMoeda(formData.valorEntrada);
    const valorFrete = parseMoeda(formData.valorFrete);
    const valorFinanciado = totalProdutos - valorEntrada + valorFrete;

    const produtosHtml = produtos.map(p => `
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 16px; page-break-inside: avoid;">
        <div style="display: flex; gap: 24px;">
          ${p.veiculo ? `
            <div style="flex-shrink: 0;">
              <img src="${p.veiculo.imagem}" alt="${p.modelo}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px;" />
            </div>
          ` : ''}
          <div style="flex: 1;">
            <h3 style="font-size: 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 12px;">${p.modelo}</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 14px; margin-bottom: 12px;">
              <div><strong>Quantidade:</strong> ${p.quantidade}</div>
              <div><strong>Cor:</strong> ${p.cor}</div>
              <div><strong>Ano/Modelo:</strong> ${p.anoModelo}</div>
              <div><strong>Chassi:</strong> ${p.chassi || 'A definir'}</div>
              <div><strong>Valor Unitário:</strong> ${formatarMoeda(p.valorUnitario)}</div>
              <div><strong>Valor Total:</strong> ${formatarMoeda(p.valorTotal)}</div>
            </div>
            ${p.veiculo ? `
              <div style="background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px;">
                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #374151;">Características Principais:</h4>
                <ul style="font-size: 13px; color: #4b5563; margin: 0; padding-left: 20px;">
                  ${p.veiculo.caracteristicas.slice(0, 5).map(c => `<li style="margin-bottom: 4px;">${c}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Proposta Comercial ${formData.numeroProposta}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', sans-serif; 
            color: #1a1a2e; 
            line-height: 1.6;
            padding: 40px;
            max-width: 900px;
            margin: 0 auto;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <!-- Cabeçalho -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 3px solid #c41e3a;">
          <img src="${logoLavoro}" alt="Lavoro Foton" style="height: 60px;" />
          <div style="text-align: right;">
            <div style="font-size: 24px; font-weight: 700; color: #c41e3a;">PROPOSTA COMERCIAL</div>
            <div style="font-size: 16px; font-weight: 600; color: #374151;">${formData.numeroProposta}</div>
          </div>
        </div>

        <!-- Informações da Proposta -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; background: #f8fafc; padding: 20px; border-radius: 8px;">
          <div>
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Local</div>
            <div style="font-size: 15px; font-weight: 500;">${formData.local}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Data</div>
            <div style="font-size: 15px; font-weight: 500;">${format(new Date(formData.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Vendedor</div>
            <div style="font-size: 15px; font-weight: 500;">${formData.nomeVendedor}</div>
          </div>
        </div>

        <!-- Dados do Cliente -->
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1a1a2e; border-left: 4px solid #c41e3a; padding-left: 12px;">DADOS DO CLIENTE</h2>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <div style="grid-column: span 2;">
              <div style="font-size: 12px; color: #6b7280;">Razão Social / Nome</div>
              <div style="font-size: 15px; font-weight: 600;">${formData.nomeCliente}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6b7280;">CNPJ / CPF</div>
              <div style="font-size: 15px; font-weight: 500;">${formData.cnpj}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6b7280;">Cidade / Estado</div>
              <div style="font-size: 15px; font-weight: 500;">${formData.cidade} - ${formData.estado}</div>
            </div>
          </div>
        </div>

        <!-- Produtos -->
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1a1a2e; border-left: 4px solid #c41e3a; padding-left: 12px;">PRODUTOS</h2>
          ${produtosHtml}
          <div style="background: #c41e3a; color: white; padding: 16px 24px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 600;">VALOR TOTAL DOS PRODUTOS</span>
            <span style="font-size: 24px; font-weight: 700;">${formatarMoeda(totalProdutos)}</span>
          </div>
        </div>

        <!-- Condições Comerciais -->
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1a1a2e; border-left: 4px solid #c41e3a; padding-left: 12px;">CONDIÇÕES COMERCIAIS</h2>
          <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div>
                <div style="font-size: 12px; color: #6b7280;">Tipo de Faturamento</div>
                <div style="font-size: 15px; font-weight: 500;">${faturamentoTipo === 'estoque' ? 'Estoque' : 'FADIRETO'}</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #6b7280;">Forma de Pagamento</div>
                <div style="font-size: 15px; font-weight: 500;">${
                  pagamentoTipo === 'avista' ? 'À Vista' :
                  pagamentoTipo === 'consorcio' ? 'Consórcio' :
                  pagamentoTipo === 'cdc' ? 'CDC' :
                  formData.pagamentoOutros || 'Outros'
                }</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #6b7280;">Valor de Entrada</div>
                <div style="font-size: 15px; font-weight: 500;">${formatarMoeda(valorEntrada)}</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #6b7280;">Valor do Frete</div>
                <div style="font-size: 15px; font-weight: 500;">${formatarMoeda(valorFrete)}</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #6b7280;">Prazo de Entrega</div>
                <div style="font-size: 15px; font-weight: 500;">${formData.prazoEntrega ? `${formData.prazoEntrega} dias` : 'A combinar'}</div>
              </div>
              <div>
                <div style="font-size: 12px; color: #6b7280;">Tributação</div>
                <div style="font-size: 15px; font-weight: 500;">${formData.tributacao || 'A definir'}</div>
              </div>
            </div>
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 14px; color: #6b7280;">Valor a Financiar</span>
                <span style="font-size: 20px; font-weight: 700; color: #c41e3a;">${formatarMoeda(valorFinanciado)}</span>
              </div>
            </div>
          </div>
        </div>

        ${formData.observacoes ? `
        <!-- Observações -->
        <div style="margin-bottom: 32px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1a1a2e; border-left: 4px solid #c41e3a; padding-left: 12px;">OBSERVAÇÕES</h2>
          <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <p style="font-size: 14px; color: #374151; white-space: pre-wrap;">${formData.observacoes}</p>
          </div>
        </div>
        ` : ''}

        <!-- Assinaturas -->
        <div style="margin-top: 48px; page-break-inside: avoid;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 32px; color: #1a1a2e; border-left: 4px solid #c41e3a; padding-left: 12px;">ASSINATURAS</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
            <div style="text-align: center;">
              <div style="border-bottom: 2px solid #1a1a2e; margin-bottom: 8px; height: 60px;"></div>
              <div style="font-size: 14px; font-weight: 600;">Cliente</div>
            </div>
            <div style="text-align: center;">
              <div style="border-bottom: 2px solid #1a1a2e; margin-bottom: 8px; height: 60px;"></div>
              <div style="font-size: 14px; font-weight: 600;">Vendedor</div>
              <div style="font-size: 12px; color: #6b7280;">${formData.nomeVendedor}</div>
            </div>
            <div style="text-align: center;">
              <div style="border-bottom: 2px solid #1a1a2e; margin-bottom: 8px; height: 60px;"></div>
              <div style="font-size: 14px; font-weight: 600;">Gerente</div>
            </div>
          </div>
        </div>

        <!-- Rodapé -->
        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Lavoro Foton - Concessionária Oficial FOTON em Minas Gerais</p>
          <p>Este documento é uma proposta comercial e não possui valor contratual.</p>
          <p>Validade: 7 dias a partir da data de emissão.</p>
        </div>
      </body>
      </html>
    `;
  };

  const visualizarProposta = () => {
    if (produtos.length === 0) {
      toast.error("Adicione pelo menos um produto à proposta");
      return;
    }
    const html = gerarHtmlProposta();
    setPdfHtml(html);
    setShowPreview(true);
  };

  const exportarPDF = () => {
    const html = gerarHtmlProposta();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const salvarProposta = async () => {
    const formData = getValues();
    
    if (!formData.nomeCliente || !formData.cnpj || produtos.length === 0) {
      toast.error("Preencha os dados obrigatórios e adicione produtos");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('propostas_comerciais').insert({
        numero_proposta: formData.numeroProposta,
        local: formData.local,
        data: formData.data,
        nome_vendedor: formData.nomeVendedor,
        nome_cliente: formData.nomeCliente,
        cnpj: formData.cnpj,
        cidade: formData.cidade,
        estado: formData.estado,
        produtos: produtos.map(p => ({
          modelo: p.modelo,
          quantidade: p.quantidade,
          cor: p.cor,
          anoModelo: p.anoModelo,
          valorUnitario: p.valorUnitario,
          valorTotal: p.valorTotal,
          chassi: p.chassi
        })),
        faturamento_tipo: formData.faturamentoTipo,
        pagamento_tipo: formData.pagamentoTipo,
        pagamento_outros: formData.pagamentoOutros,
        valor_total: calcularTotalProdutos(),
        valor_entrada: parseMoeda(formData.valorEntrada),
        valor_frete: parseMoeda(formData.valorFrete),
        prazo_entrega: formData.prazoEntrega ? parseInt(formData.prazoEntrega) : null,
        tributacao: formData.tributacao,
        observacoes: formData.observacoes
      });

      if (error) throw error;
      toast.success("Proposta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar proposta:", error);
      toast.error("Erro ao salvar proposta");
    } finally {
      setLoading(false);
    }
  };

  const novaProposta = () => {
    reset();
    setProdutos([]);
    gerarNumeroProposta();
    toast.success("Formulário limpo para nova proposta");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-industrial-dark text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoLavoro} alt="Lavoro Foton" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold">Gerador de Propostas Comerciais</h1>
              <p className="text-sm text-white/70">Sistema interno de vendas</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/70">Proposta Nº</div>
            <div className="text-xl font-bold text-primary">{numeroProposta}</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Resumo Institucional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg text-industrial-dark mb-2">Sobre a FOTON</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A FOTON é uma das maiores fabricantes de veículos comerciais do mundo, presente em mais de 110 países. 
                Com tecnologia de ponta e parcerias globais com Cummins, ZF e Bosch, oferece caminhões e picapes 
                com a melhor relação custo-benefício do mercado, garantia de 3 anos e peças com alta disponibilidade.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-50 to-white border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg text-industrial-dark mb-2">Sobre a Lavoro</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A Lavoro é a concessionária oficial FOTON em Minas Gerais, com mais de 40 anos de tradição 
                no mercado de veículos comerciais. Oferecemos atendimento consultivo, pós-venda especializado, 
                estoque próprio e as melhores condições de financiamento para sua frota.
              </p>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit(salvarProposta)} className="space-y-8">
          
          {/* Seção 1: Cabeçalho da Proposta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-industrial-dark">
                <FileText className="h-5 w-5" />
                Informações da Proposta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="numeroProposta">Número da Proposta</Label>
                  <Input 
                    id="numeroProposta" 
                    {...register("numeroProposta")} 
                    readOnly 
                    className="bg-slate-100 font-mono font-bold"
                  />
                </div>
                <div>
                  <Label htmlFor="local">Local</Label>
                  <Input id="local" {...register("local")} placeholder="Cidade" />
                </div>
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input id="data" type="date" {...register("data")} />
                </div>
                <div>
                  <Label htmlFor="nomeVendedor">Nome do Vendedor</Label>
                  <Input id="nomeVendedor" {...register("nomeVendedor")} placeholder="Nome completo" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção 2: Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-industrial-dark">Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="nomeCliente">Nome / Razão Social *</Label>
                  <Input id="nomeCliente" {...register("nomeCliente")} placeholder="Nome completo ou razão social" />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ / CPF *</Label>
                  <Input id="cnpj" {...register("cnpj")} placeholder="00.000.000/0000-00" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" {...register("cidade")} placeholder="Cidade" />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Select value={watch("estado")} onValueChange={(v) => setValue("estado", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
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

          {/* Seção 3: Produtos */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-industrial-dark">Produtos da Proposta</CardTitle>
              <Button type="button" onClick={adicionarProduto} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" /> Adicionar Produto
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {produtos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum produto adicionado</p>
                  <p className="text-sm">Clique em "Adicionar Produto" para começar</p>
                </div>
              ) : (
                produtos.map((produto, index) => (
                  <div key={produto.id} className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-lg">Produto {index + 1}</h4>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removerProduto(produto.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label>Modelo do Veículo *</Label>
                        <Select 
                          value={produto.modelo} 
                          onValueChange={(v) => atualizarProduto(produto.id, 'modelo', v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o modelo" />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-[300px]">
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Linha Diesel</div>
                            {veiculosCatalogo.filter(v => v.categoria === 'diesel').map(v => (
                              <SelectItem key={v.id} value={v.modelo}>{v.modelo}</SelectItem>
                            ))}
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Linha Elétrica</div>
                            {veiculosCatalogo.filter(v => v.categoria === 'eletrico').map(v => (
                              <SelectItem key={v.id} value={v.modelo}>{v.modelo}</SelectItem>
                            ))}
                            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Picapes</div>
                            {veiculosCatalogo.filter(v => v.categoria === 'picape').map(v => (
                              <SelectItem key={v.id} value={v.modelo}>{v.modelo}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantidade</Label>
                        <Input 
                          type="number" 
                          min="1" 
                          value={produto.quantidade}
                          onChange={(e) => atualizarProduto(produto.id, 'quantidade', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div>
                        <Label>Cor</Label>
                        <Select 
                          value={produto.cor} 
                          onValueChange={(v) => atualizarProduto(produto.id, 'cor', v)}
                          disabled={!produto.veiculo}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a cor" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {produto.veiculo?.cores.map(cor => (
                              <SelectItem key={cor} value={cor}>{cor}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label>Ano/Modelo</Label>
                        <Input 
                          value={produto.anoModelo}
                          onChange={(e) => atualizarProduto(produto.id, 'anoModelo', e.target.value)}
                          placeholder="2025/2026"
                        />
                      </div>
                      <div>
                        <Label>Valor Unitário (R$)</Label>
                        <Input 
                          type="text"
                          value={formatarMoeda(produto.valorUnitario).replace('R$', '').trim()}
                          onChange={(e) => handleValorChange(produto.id, e.target.value)}
                          placeholder="0,00"
                        />
                      </div>
                      <div>
                        <Label>Valor Total</Label>
                        <Input 
                          value={formatarMoeda(produto.valorTotal)}
                          readOnly
                          className="bg-slate-100 font-semibold"
                        />
                      </div>
                      <div>
                        <Label>Chassi</Label>
                        <Input 
                          value={produto.chassi}
                          onChange={(e) => atualizarProduto(produto.id, 'chassi', e.target.value)}
                          placeholder="A definir"
                        />
                      </div>
                    </div>

                    {/* Imagem e características do veículo */}
                    {produto.veiculo && (
                      <div className="flex gap-6 mt-4 pt-4 border-t">
                        <img 
                          src={produto.veiculo.imagem} 
                          alt={produto.modelo}
                          className="w-48 h-36 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold mb-2">{produto.veiculo.modelo}</h5>
                          <div className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium">Capacidade:</span> {produto.veiculo.capacidade} | 
                            <span className="font-medium ml-2">CNH:</span> {produto.veiculo.cnh} | 
                            <span className="font-medium ml-2">Aplicação:</span> {produto.veiculo.aplicacao}
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-sm">
                            {produto.veiculo.caracteristicas.slice(0, 4).map((c, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              {produtos.length > 0 && (
                <div className="bg-primary text-primary-foreground p-4 rounded-lg flex justify-between items-center">
                  <span className="font-semibold">VALOR TOTAL DOS PRODUTOS</span>
                  <span className="text-2xl font-bold">{formatarMoeda(calcularTotalProdutos())}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seção 4: Condições Comerciais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-industrial-dark">Condições Comerciais e Financeiras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Tipo de Faturamento</Label>
                  <RadioGroup 
                    value={faturamentoTipo} 
                    onValueChange={(v) => setValue("faturamentoTipo", v)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="estoque" id="estoque" />
                      <Label htmlFor="estoque" className="cursor-pointer">Estoque</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fadireto" id="fadireto" />
                      <Label htmlFor="fadireto" className="cursor-pointer">FADIRETO</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Forma de Pagamento</Label>
                  <RadioGroup 
                    value={pagamentoTipo} 
                    onValueChange={(v) => setValue("pagamentoTipo", v)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="avista" id="avista" />
                      <Label htmlFor="avista" className="cursor-pointer">À Vista</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="consorcio" id="consorcio" />
                      <Label htmlFor="consorcio" className="cursor-pointer">Consórcio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cdc" id="cdc" />
                      <Label htmlFor="cdc" className="cursor-pointer">CDC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outros" id="outros" />
                      <Label htmlFor="outros" className="cursor-pointer">Outros</Label>
                    </div>
                  </RadioGroup>
                  {pagamentoTipo === 'outros' && (
                    <Input 
                      {...register("pagamentoOutros")} 
                      placeholder="Especifique a forma de pagamento"
                      className="mt-2"
                    />
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label>Valor Total a Financiar</Label>
                  <Input 
                    value={formatarMoeda(calcularTotalProdutos())}
                    readOnly
                    className="bg-slate-100 font-semibold"
                  />
                </div>
                <div>
                  <Label htmlFor="valorEntrada">Valor de Entrada (R$)</Label>
                  <Input 
                    id="valorEntrada" 
                    {...register("valorEntrada")} 
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <Label htmlFor="valorFrete">Valor do Frete (R$)</Label>
                  <Input 
                    id="valorFrete" 
                    {...register("valorFrete")} 
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <Label htmlFor="prazoEntrega">Prazo de Entrega (dias)</Label>
                  <Input 
                    id="prazoEntrega" 
                    type="number"
                    {...register("prazoEntrega")} 
                    placeholder="Ex: 30"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tributacao">Tributação</Label>
                <Input 
                  id="tributacao" 
                  {...register("tributacao")} 
                  placeholder="Ex: ICMS 12%, IPI isento"
                />
              </div>
            </CardContent>
          </Card>

          {/* Seção 5: Observações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-industrial-dark">Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                {...register("observacoes")} 
                placeholder="Informações adicionais, condições especiais, notas sobre a negociação..."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Seção 7: Ações */}
          <Card className="bg-industrial-dark text-white">
            <CardContent className="py-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  type="button" 
                  onClick={visualizarProposta}
                  variant="outline"
                  className="gap-2 bg-white text-industrial-dark hover:bg-slate-100"
                >
                  <Eye className="h-4 w-4" /> Visualizar Proposta
                </Button>
                <Button 
                  type="button" 
                  onClick={exportarPDF}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" /> Exportar PDF
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  variant="secondary"
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" /> {loading ? "Salvando..." : "Salvar Proposta"}
                </Button>
                <Button 
                  type="button" 
                  onClick={novaProposta}
                  variant="ghost"
                  className="gap-2 text-white hover:bg-white/10"
                >
                  <RefreshCw className="h-4 w-4" /> Nova Proposta
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>

      {/* Modal de Preview */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Pré-visualização da Proposta</DialogTitle>
          </DialogHeader>
          <div 
            className="border rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: pdfHtml }}
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fechar
            </Button>
            <Button onClick={exportarPDF} className="gap-2">
              <Download className="h-4 w-4" /> Exportar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
