import { useState } from "react";
import { usePedidosPublicos, PedidoPublico } from "@/hooks/usePedidosPublicos";
import InternoLayout from "@/components/interno/InternoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inbox, Search, Import, Loader2, CheckCircle2, Clock, FileText } from "lucide-react";
import ExportButton from "@/components/interno/ExportButton";
import { formatCurrency } from "@/types/interno";

export default function InternoPedidosPublicos() {
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendentes' | 'importados'>('todos');
  const [tipoFilter, setTipoFilter] = useState<'todos' | 'pedido' | 'proposta'>('todos');
  const [searchTerm, setSearchTerm] = useState("");

  const { pedidos, isLoading, importar, isImporting } = usePedidosPublicos({
    status: statusFilter,
    tipo: tipoFilter,
  });

  const filteredPedidos = pedidos.filter(p => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.cliente_nome.toLowerCase().includes(term) ||
      p.cliente_cnpj.toLowerCase().includes(term) ||
      p.modelo_veiculo.toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    const csv = [
      ['Data', 'Cliente', 'CNPJ', 'Email', 'Telefone', 'Modelo', 'Tipo', 'Valor', 'Status'].join(','),
      ...filteredPedidos.map(p => [
        new Date(p.created_at).toLocaleDateString('pt-BR'),
        `"${p.cliente_nome}"`,
        p.cliente_cnpj,
        p.cliente_email,
        p.cliente_telefone,
        `"${p.modelo_veiculo}"`,
        p.tipo === 'pedido' ? 'Pedido' : 'Proposta',
        p.valor_total,
        p.importado ? 'Importado' : 'Pendente',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pedidos-publicos-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportar = async (pedido: PedidoPublico) => {
    await importar(pedido);
  };

  return (
    <InternoLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-foreground">Pedidos do Site</h1>
            <p className="text-sm text-muted-foreground">
              {filteredPedidos.length} registro{filteredPedidos.length !== 1 ? 's' : ''}
            </p>
          </div>
          <ExportButton
            onExport={handleExport}
            label="Exportar CSV"
            disabled={filteredPedidos.length === 0}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CNPJ, modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-full sm:w-36 h-9 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="importados">Importados</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tipoFilter} onValueChange={(v) => setTipoFilter(v as any)}>
            <SelectTrigger className="w-full sm:w-36 h-9 text-sm">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pedido">Pedidos</SelectItem>
              <SelectItem value="proposta">Propostas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-14 w-full" />)}
          </div>
        ) : filteredPedidos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Inbox className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="text-sm font-medium mb-1">Nenhum registro encontrado</h3>
              <p className="text-xs text-muted-foreground">
                {searchTerm ? "Tente ajustar sua busca" : "Nenhum pedido ou proposta recebido ainda"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Data</TableHead>
                      <TableHead className="text-xs">Cliente</TableHead>
                      <TableHead className="text-xs">CNPJ</TableHead>
                      <TableHead className="text-xs">Modelo</TableHead>
                      <TableHead className="text-xs">Valor</TableHead>
                      <TableHead className="text-xs">Tipo</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPedidos.map((pedido) => (
                      <TableRow key={`${pedido.tipo}-${pedido.id}`}>
                        <TableCell className="text-sm">
                          {new Date(pedido.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-sm font-medium max-w-[200px] truncate">
                          {pedido.cliente_nome}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{pedido.cliente_cnpj}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                          {pedido.modelo_veiculo}
                        </TableCell>
                        <TableCell className="text-sm">{formatCurrency(pedido.valor_total)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">
                            {pedido.tipo === 'pedido' ? 'Pedido' : 'Proposta'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {pedido.importado ? (
                            <Badge variant="secondary" className="text-[10px] gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Importado
                            </Badge>
                          ) : (
                            <Badge variant="default" className="text-[10px] gap-1 bg-destructive">
                              <Clock className="h-3 w-3" />
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!pedido.importado && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs gap-1"
                              onClick={() => handleImportar(pedido)}
                              disabled={isImporting}
                            >
                              {isImporting ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Import className="h-3 w-3" />
                              )}
                              Importar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-2">
              {filteredPedidos.map((pedido) => (
                <Card key={`${pedido.tipo}-${pedido.id}`} className="hover:bg-muted/30 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="p-2 rounded-md bg-primary/10 shrink-0 mt-0.5">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{pedido.cliente_nome}</p>
                          <p className="text-xs text-muted-foreground truncate">{pedido.modelo_veiculo}</p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="outline" className="text-[10px] px-1 py-0">
                              {pedido.tipo === 'pedido' ? 'Pedido' : 'Proposta'}
                            </Badge>
                            {pedido.importado ? (
                              <Badge variant="secondary" className="text-[10px] px-1 py-0 gap-0.5">
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                Importado
                              </Badge>
                            ) : (
                              <Badge variant="default" className="text-[10px] px-1 py-0 gap-0.5 bg-destructive">
                                <Clock className="h-2.5 w-2.5" />
                                Pendente
                              </Badge>
                            )}
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(pedido.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-xs font-medium mt-1">{formatCurrency(pedido.valor_total)}</p>
                        </div>
                      </div>
                      {!pedido.importado && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0 gap-1 text-xs h-8"
                          onClick={() => handleImportar(pedido)}
                          disabled={isImporting}
                        >
                          {isImporting ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Import className="h-3 w-3" />
                          )}
                          Importar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </InternoLayout>
  );
}
