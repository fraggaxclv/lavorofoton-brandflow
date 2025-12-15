import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2, FileText, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import logoLinhaLavoro from "@/assets/logo-linha-lavoro.png";
const MODELOS_VEICULOS = ["Foton Aumark S315", "Foton Aumark 715", "Foton Aumark 916", "Foton Aumark 1217", "Foton eWonder", "Foton Auman D 1722", "Foton eAumark 9T", "Foton eAumark 12T", "Foton eToano", "Foton eView", "Tunland V7", "Tunland V9"];
const ESTADOS_BR = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
interface Produto {
  produto: string;
  quantidade: number;
  anoModelo: string;
  valorUnitario: number;
  valorTotal: number;
}
const PedidoFaturamento = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm();
  const [produtos, setProdutos] = useState<Produto[]>([{
    produto: "",
    quantidade: 1,
    anoModelo: "2025/2026",
    valorUnitario: 0,
    valorTotal: 0
  }]);
  const [loading, setLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [entradaValor, setEntradaValor] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const faturamentoTipo = watch("faturamento_tipo");
  const financiamentoForma = watch("financiamento_forma");
  const adicionarProduto = () => {
    setProdutos([...produtos, {
      produto: "",
      quantidade: 1,
      anoModelo: "2025/2026",
      valorUnitario: 0,
      valorTotal: 0
    }]);
  };
  const removerProduto = (index: number) => {
    if (produtos.length > 1) {
      setProdutos(produtos.filter((_, i) => i !== index));
    }
  };
  const atualizarProduto = (index: number, campo: keyof Produto, valor: any) => {
    const novosProdutos = [...produtos];
    novosProdutos[index] = {
      ...novosProdutos[index],
      [campo]: valor
    };

    // Recalcular valor total se quantidade ou valor unitário mudou
    if (campo === "quantidade" || campo === "valorUnitario") {
      novosProdutos[index].valorTotal = novosProdutos[index].quantidade * novosProdutos[index].valorUnitario;
    }
    setProdutos(novosProdutos);
  };
  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  };
  const handleValorChange = (index: number, campo: 'valorUnitario' | 'valorTotal', e: React.ChangeEvent<HTMLInputElement>) => {
    let valorString = e.target.value;

    // Remove tudo exceto números
    valorString = valorString.replace(/\D/g, '');

    // Converte para número dividindo por 100 (centavos)
    const valor = parseFloat(valorString) / 100 || 0;
    atualizarProduto(index, campo, valor);
  };
  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valorString = e.target.value;

    // Remove tudo exceto números
    valorString = valorString.replace(/\D/g, '');

    // Converte para número dividindo por 100 (centavos)
    const valor = parseFloat(valorString) / 100 || 0;
    setEntradaValor(valor);
    setValue("entrada", valor);
  };
  const calcularTotalProdutos = () => {
    return produtos.reduce((total, p) => total + p.valorTotal, 0);
  };
  const gerarNumeroPedido = () => {
    const now = new Date();
    const ano = now.getFullYear();
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    return `LAV-${ano}${mes}-${random}`;
  };

  const handlePreview = async () => {
    const data = watch();
    
    // Validações básicas
    if (produtos.some(p => !p.produto || p.quantidade <= 0 || p.valorUnitario <= 0)) {
      toast.error("Preencha todos os produtos corretamente para visualizar");
      return;
    }
    
    setPreviewLoading(true);
    try {
      const numeroPedido = "PREVIEW";
      const valorTotal = calcularTotalProdutos();
      const pedidoData = {
        numero_pedido: numeroPedido,
        local: data.local || null,
        data: data.data || new Date().toISOString().split('T')[0],
        nome_vendedor: data.nome_vendedor || "Vendedor",
        nome_cliente: data.nome_cliente || "Cliente",
        cnpj: data.cnpj || "00.000.000/0000-00",
        ie_rg: data.ie_rg || null,
        rua: data.rua || null,
        numero: data.numero || null,
        bairro: data.bairro || null,
        cep: data.cep || null,
        cidade: data.cidade || null,
        estado: data.estado || null,
        telefone_cliente: data.telefone_cliente || null,
        responsavel_frota: data.responsavel_frota || null,
        email_responsavel: data.email_responsavel || null,
        faturamento_tipo: data.faturamento_tipo || "Estoque",
        nome_instituicao: data.nome_instituicao || null,
        financiamento_forma: data.financiamento_forma || "À vista",
        financiamento_forma_outros: data.financiamento_forma_outros || null,
        valor_total_produtos: valorTotal,
        entrada: parseFloat(data.entrada || "0"),
        observacoes: data.observacoes || null,
        produtos: produtos as any
      };

      const { data: pdfData, error: pdfError } = await supabase.functions.invoke("gerar-pedido-pdf", {
        body: pedidoData
      });
      
      if (pdfError) throw pdfError;

      setPdfPreview(pdfData.pdfHTML);
      setIsPreviewMode(true);
      setShowPreview(true);
    } catch (error: any) {
      console.error("Erro ao gerar preview:", error);
      toast.error("Erro ao gerar preview: " + error.message);
    } finally {
      setPreviewLoading(false);
    }
  };
  const onSubmit = async (data: any) => {
    // Validações básicas
    if (produtos.some(p => !p.produto || p.quantidade <= 0 || p.valorUnitario <= 0)) {
      toast.error("Preencha todos os produtos corretamente");
      return;
    }
    if (!data.faturamento_tipo) {
      toast.error("Selecione o tipo de faturamento (Estoque ou FADIRETO)");
      return;
    }
    if (!data.financiamento_forma) {
      toast.error("Selecione a forma de financiamento");
      return;
    }
    setLoading(true);
    try {
      const numeroPedido = gerarNumeroPedido();
      const valorTotal = calcularTotalProdutos();
      const pedidoData = {
        numero_pedido: numeroPedido,
        local: data.local || null,
        data: data.data,
        nome_vendedor: data.nome_vendedor,
        nome_cliente: data.nome_cliente,
        cnpj: data.cnpj,
        ie_rg: data.ie_rg || null,
        rua: data.rua || null,
        numero: data.numero || null,
        bairro: data.bairro || null,
        cep: data.cep || null,
        cidade: data.cidade || null,
        estado: data.estado || null,
        telefone_cliente: data.telefone_cliente || null,
        responsavel_frota: data.responsavel_frota || null,
        email_responsavel: data.email_responsavel || null,
        faturamento_tipo: data.faturamento_tipo,
        nome_instituicao: data.nome_instituicao || null,
        financiamento_forma: data.financiamento_forma,
        financiamento_forma_outros: data.financiamento_forma_outros || null,
        valor_total_produtos: valorTotal,
        entrada: parseFloat(data.entrada || "0"),
        observacoes: data.observacoes || null,
        produtos: produtos as any
      };

      // Salvar no banco
      const {
        error: dbError
      } = await supabase.from("pedidos_faturamento").insert([pedidoData]);
      if (dbError) throw dbError;

      // Gerar PDF e enviar email
      const {
        data: pdfData,
        error: pdfError
      } = await supabase.functions.invoke("gerar-pedido-pdf", {
        body: pedidoData
      });
      if (pdfError) throw pdfError;

      // Mostrar preview do PDF
      setPdfPreview(pdfData.pdfHTML);
      setIsPreviewMode(false);
      setShowPreview(true);
      toast.success("Pedido criado com sucesso!");

      // Reset form
      reset();
      setProdutos([{
        produto: "",
        quantidade: 1,
        anoModelo: "2025/2026",
        valorUnitario: 0,
        valorTotal: 0
      }]);
    } catch (error: any) {
      console.error("Erro:", error);
      toast.error("Erro ao criar pedido: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const downloadPDF = () => {
    if (!pdfPreview) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.open();
    printWindow.document.write(pdfPreview);
    printWindow.document.close();

    let printed = false;
    const doPrint = () => {
      if (printed) return;
      printed = true;
      printWindow.focus();
      printWindow.print();
    };

    const waitForAssetsAndPrint = async () => {
      try {
        await (printWindow.document as any).fonts?.ready;
      } catch {
        // ignore
      }

      const images = Array.from(printWindow.document.images || []);
      await Promise.all(
        images.map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise<void>((resolve) => {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                })
        )
      );

      doPrint();
    };

    // Imprime após carregar + fallback (apenas 1x)
    printWindow.addEventListener("load", () => {
      void waitForAssetsAndPrint();
    }, { once: true });

    setTimeout(doPrint, 2000);
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <img src={logoLinhaLavoro} alt="Linha Lavoro Foton" className="h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-primary mb-2">Pedido de Faturamento</h1>
          <p className="text-muted-foreground">Lavoro Foton - Sistema Interno</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Cabeçalho do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle>Cabeçalho do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="local">Local</Label>
                <Input id="local" {...register("local")} placeholder="Ex: BH - Matriz" />
              </div>
              <div>
                <Label htmlFor="data">Data *</Label>
                <Input id="data" type="date" {...register("data", {
                required: true
              })} defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label htmlFor="nome_vendedor">Nome do Vendedor *</Label>
                <Input id="nome_vendedor" {...register("nome_vendedor", {
                required: true
              })} />
              </div>
            </CardContent>
          </Card>

          {/* Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Cliente</CardTitle>
              <CardDescription>Informações cadastrais do cliente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome_cliente">Nome/Razão Social *</Label>
                  <Input id="nome_cliente" {...register("nome_cliente", {
                  required: true
                })} />
                </div>
                <div>
                  <Label htmlFor="cnpj">CNPJ/CPF *</Label>
                  <Input id="cnpj" {...register("cnpj", {
                  required: true
                })} />
                </div>
                <div>
                  <Label htmlFor="ie_rg">IE / RG</Label>
                  <Input id="ie_rg" {...register("ie_rg")} />
                </div>
                <div>
                  <Label htmlFor="telefone_cliente">Telefone</Label>
                  <Input id="telefone_cliente" {...register("telefone_cliente")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input id="rua" {...register("rua")} />
                </div>
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input id="numero" {...register("numero")} />
                </div>
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" {...register("bairro")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" {...register("cep")} />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" {...register("cidade")} />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select onValueChange={value => setValue("estado", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {ESTADOS_BR.map(estado => <SelectItem key={estado} value={estado}>{estado}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="responsavel_frota">Responsável pela Frota</Label>
                  <p className="text-xs text-muted-foreground mb-1">Principalmente para CNPJ</p>
                  <Input id="responsavel_frota" {...register("responsavel_frota")} />
                </div>
                <div>
                  <Label htmlFor="email_responsavel">E-mail do Responsável</Label>
                  <p className="text-xs text-muted-foreground mb-1">&nbsp;</p>
                  <Input id="email_responsavel" type="email" {...register("email_responsavel")} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produtos */}
          <Card>
            <CardHeader>
              <CardTitle>Descrição dos Produtos</CardTitle>
              <CardDescription>Use este bloco para detalhar todos os caminhões envolvidos neste pedido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {produtos.map((produto, index) => <div key={index} className="p-4 border rounded-lg space-y-4 bg-secondary/30">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                      <Label>Produto *</Label>
                      <Select value={produto.produto} onValueChange={value => atualizarProduto(index, "produto", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {MODELOS_VEICULOS.map(modelo => <SelectItem key={modelo} value={modelo}>{modelo}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label>Quantidade *</Label>
                      <Input type="number" min="1" value={produto.quantidade} onChange={e => atualizarProduto(index, "quantidade", parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Ano/Modelo</Label>
                      <Input value={produto.anoModelo} onChange={e => atualizarProduto(index, "anoModelo", e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Valor Unit. (R$) *</Label>
                      <Input value={formatarMoeda(produto.valorUnitario)} onChange={e => handleValorChange(index, "valorUnitario", e)} placeholder="0,00" />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Valor Total (R$)</Label>
                      <Input value={formatarMoeda(produto.valorTotal)} onChange={e => handleValorChange(index, "valorTotal", e)} placeholder="0,00" />
                    </div>
                  </div>
                  {produtos.length > 1 && <Button type="button" variant="destructive" size="sm" onClick={() => removerProduto(index)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remover
                    </Button>}
                </div>)}
              
              <Button type="button" variant="outline" onClick={adicionarProduto} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>

              <div className="bg-primary/10 p-4 rounded-lg text-right">
                <p className="text-sm text-muted-foreground mb-1">Soma Total dos Produtos</p>
                <p className="text-3xl font-bold text-primary">
                  R$ {calcularTotalProdutos().toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Condições Comerciais */}
          <Card>
            <CardHeader>
              <CardTitle>Condições Comerciais e Financeiras</CardTitle>
              <CardDescription>Essas informações ajudam o financeiro a montar o faturamento correto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Faturamento *</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Input placeholder="Nome da Instituição Financeira" {...register("nome_instituicao")} />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Tipo de Faturamento *</Label>
                    <RadioGroup value={faturamentoTipo} onValueChange={value => setValue("faturamento_tipo", value)} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Estoque" id="estoque" />
                        <Label htmlFor="estoque" className="cursor-pointer">Estoque</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="FADIRETO" id="fadireto" />
                        <Label htmlFor="fadireto" className="cursor-pointer">FADIRETO</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div>
                <Label>Financiamento / Forma de Pagamento *</Label>
                <RadioGroup value={financiamentoForma} onValueChange={value => setValue("financiamento_forma", value)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="À vista" id="avista" />
                    <Label htmlFor="avista" className="cursor-pointer">À vista</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Consórcio" id="consorcio" />
                    <Label htmlFor="consorcio" className="cursor-pointer">Consórcio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CDC" id="cdc" />
                    <Label htmlFor="cdc" className="cursor-pointer">CDC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Outros" id="outros" />
                    <Label htmlFor="outros" className="cursor-pointer">Outros</Label>
                  </div>
                </RadioGroup>
                {financiamentoForma === "Outros" && <Input placeholder="Descrever" className="mt-2" {...register("financiamento_forma_outros")} />}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <Label>Valor Total dos Produtos (R$)</Label>
                  <Input type="text" value={`R$ ${calcularTotalProdutos().toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}`} disabled className="font-bold" />
                </div>
                <div>
                  <Label htmlFor="entrada">Entrada (R$)</Label>
                  <Input id="entrada" value={formatarMoeda(entradaValor)} onChange={handleEntradaChange} placeholder="0,00" />
                </div>
                <div>
                  <Label>Valor Financiado (R$)</Label>
                  <Input type="text" value={`R$ ${(calcularTotalProdutos() - entradaValor).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}`} disabled className="font-bold text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea {...register("observacoes")} placeholder="Digite aqui qualquer observação importante sobre este pedido..." rows={5} />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              className="flex-1" 
              onClick={handlePreview}
              disabled={previewLoading}
            >
              {previewLoading ? "Gerando Preview..." : <>
                <Eye className="w-5 h-5 mr-2" />
                Visualizar Pedido
              </>}
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={loading}>
              {loading ? "Gerando Pedido..." : <>
                <FileText className="w-5 h-5 mr-2" />
                Salvar e Gerar PDF
              </>}
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={(open) => {
        setShowPreview(open);
        if (!open) setIsPreviewMode(false);
      }}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Pré-visualização do Pedido</DialogTitle>
            <DialogDescription>
              {isPreviewMode 
                ? "Esta é uma pré-visualização. Para salvar o pedido, feche e clique em 'Salvar e Gerar PDF'."
                : "O pedido foi gerado e salvo com sucesso."
              }
            </DialogDescription>
          </DialogHeader>
          {pdfPreview && <div>
              <div className="border rounded-lg p-4 bg-white" dangerouslySetInnerHTML={{
            __html: pdfPreview
          }} />
              <Button onClick={downloadPDF} className="w-full mt-4">
                Baixar PDF
              </Button>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default PedidoFaturamento;