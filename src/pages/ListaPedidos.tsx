import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Pedido {
  id: string;
  numero_pedido: string;
  data: string;
  nome_cliente: string;
  cidade: string;
  estado: string;
  nome_vendedor: string;
  valor_total_produtos: number;
}

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filteredPedidos, setFilteredPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState("");
  const [filtroVendedor, setFiltroVendedor] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");

  useEffect(() => {
    carregarPedidos();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [pedidos, filtroData, filtroVendedor, filtroCidade]);

  const carregarPedidos = async () => {
    try {
      const { data, error } = await supabase
        .from("pedidos_faturamento")
        .select("id, numero_pedido, data, nome_cliente, cidade, estado, nome_vendedor, valor_total_produtos")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setPedidos(data || []);
    } catch (error: any) {
      console.error("Erro ao carregar pedidos:", error);
      toast.error("Erro ao carregar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...pedidos];

    if (filtroData) {
      resultado = resultado.filter(p => p.data.includes(filtroData));
    }

    if (filtroVendedor) {
      resultado = resultado.filter(p => 
        p.nome_vendedor.toLowerCase().includes(filtroVendedor.toLowerCase())
      );
    }

    if (filtroCidade) {
      resultado = resultado.filter(p => 
        p.cidade?.toLowerCase().includes(filtroCidade.toLowerCase())
      );
    }

    setFilteredPedidos(resultado);
  };

  const exportarCSV = () => {
    const headers = ["Número do Pedido", "Data", "Cliente", "Cidade/Estado", "Vendedor", "Valor Total"];
    const rows = filteredPedidos.map(p => [
      p.numero_pedido,
      new Date(p.data).toLocaleDateString('pt-BR'),
      p.nome_cliente,
      `${p.cidade || ''} / ${p.estado || ''}`,
      p.nome_vendedor,
      `R$ ${p.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `pedidos_faturamento_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exportado com sucesso!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-lg">Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Pedidos de Faturamento</h1>
            <p className="text-muted-foreground">Gestão e acompanhamento de pedidos</p>
          </div>
          <Link to="/pedido-faturamento-lavoro">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Novo Pedido
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Refine sua busca de pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="filtro-data">Data</Label>
                <Input
                  id="filtro-data"
                  type="date"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="filtro-vendedor">Vendedor</Label>
                <Input
                  id="filtro-vendedor"
                  placeholder="Nome do vendedor"
                  value={filtroVendedor}
                  onChange={(e) => setFiltroVendedor(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="filtro-cidade">Cidade</Label>
                <Input
                  id="filtro-cidade"
                  placeholder="Nome da cidade"
                  value={filtroCidade}
                  onChange={(e) => setFiltroCidade(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={exportarCSV} className="w-full">
                  <FileDown className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número do Pedido</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Cidade/Estado</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead className="text-right">Valor Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPedidos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Nenhum pedido encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPedidos.map((pedido) => (
                      <TableRow key={pedido.id}>
                        <TableCell className="font-medium">{pedido.numero_pedido}</TableCell>
                        <TableCell>{new Date(pedido.data).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{pedido.nome_cliente}</TableCell>
                        <TableCell>{pedido.cidade || '-'} / {pedido.estado || '-'}</TableCell>
                        <TableCell>{pedido.nome_vendedor}</TableCell>
                        <TableCell className="text-right font-semibold">
                          R$ {pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-sm text-muted-foreground text-center">
          Total de pedidos: {filteredPedidos.length}
        </div>
      </div>
    </div>
  );
};

export default ListaPedidos;