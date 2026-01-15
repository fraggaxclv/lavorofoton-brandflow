import { useState } from "react";
import { veiculosCatalogo, Veiculo } from "@/data/veiculosCatalogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Truck, Zap, Car } from "lucide-react";

export interface ProdutoNegociacao {
  veiculo_id: string;
  modelo: string;
  quantidade: number;
  valor_unitario?: number;
}

interface ProdutoSelectorProps {
  produtos: ProdutoNegociacao[];
  onChange: (produtos: ProdutoNegociacao[]) => void;
}

const categoriaIcons = {
  diesel: Truck,
  eletrico: Zap,
  picape: Car,
};

const categoriaLabels = {
  diesel: "Linha Diesel",
  eletrico: "Linha Elétrica",
  picape: "Picapes",
};

export default function ProdutoSelector({ produtos, onChange }: ProdutoSelectorProps) {
  const [selectedVeiculo, setSelectedVeiculo] = useState<string>("");

  const veiculosDiesel = veiculosCatalogo.filter(v => v.categoria === "diesel");
  const veiculosEletricos = veiculosCatalogo.filter(v => v.categoria === "eletrico");
  const veiculosPickups = veiculosCatalogo.filter(v => v.categoria === "picape");

  const handleAddProduto = () => {
    if (!selectedVeiculo) return;
    
    const veiculo = veiculosCatalogo.find(v => v.id === selectedVeiculo);
    if (!veiculo) return;

    // Verifica se já existe
    const existing = produtos.find(p => p.veiculo_id === selectedVeiculo);
    if (existing) {
      // Incrementa quantidade
      onChange(produtos.map(p => 
        p.veiculo_id === selectedVeiculo 
          ? { ...p, quantidade: p.quantidade + 1 }
          : p
      ));
    } else {
      onChange([...produtos, {
        veiculo_id: veiculo.id,
        modelo: veiculo.modelo,
        quantidade: 1,
        valor_unitario: undefined
      }]);
    }
    setSelectedVeiculo("");
  };

  const handleRemoveProduto = (veiculoId: string) => {
    onChange(produtos.filter(p => p.veiculo_id !== veiculoId));
  };

  const handleQuantidadeChange = (veiculoId: string, quantidade: number) => {
    if (quantidade < 1) return;
    onChange(produtos.map(p => 
      p.veiculo_id === veiculoId ? { ...p, quantidade } : p
    ));
  };

  const handleValorChange = (veiculoId: string, valor: string) => {
    const valorNum = parseFloat(valor) || undefined;
    onChange(produtos.map(p => 
      p.veiculo_id === veiculoId ? { ...p, valor_unitario: valorNum } : p
    ));
  };

  const getCategoriaIcon = (veiculoId: string) => {
    const veiculo = veiculosCatalogo.find(v => v.id === veiculoId);
    if (!veiculo) return Truck;
    return categoriaIcons[veiculo.categoria];
  };

  const renderSelectGroup = (veiculos: Veiculo[], categoria: 'diesel' | 'eletrico' | 'picape') => {
    const Icon = categoriaIcons[categoria];
    return (
      <SelectGroup key={categoria}>
        <SelectLabel className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {categoriaLabels[categoria]}
        </SelectLabel>
        {veiculos.map(veiculo => (
          <SelectItem key={veiculo.id} value={veiculo.id}>
            <span className="flex items-center gap-2">
              {veiculo.modelo}
              <span className="text-muted-foreground text-xs">
                ({veiculo.capacidade})
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectGroup>
    );
  };

  return (
    <div className="space-y-4">
      <Label>Produtos da Negociação</Label>
      
      {/* Seleção de produto */}
      <div className="flex gap-2">
        <Select value={selectedVeiculo} onValueChange={setSelectedVeiculo}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Selecione um veículo..." />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {renderSelectGroup(veiculosDiesel, "diesel")}
            {renderSelectGroup(veiculosEletricos, "eletrico")}
            {renderSelectGroup(veiculosPickups, "picape")}
          </SelectContent>
        </Select>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleAddProduto}
          disabled={!selectedVeiculo}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Lista de produtos adicionados */}
      {produtos.length > 0 && (
        <div className="space-y-3 border rounded-lg p-3 bg-muted/30">
          {produtos.map((produto) => {
            const Icon = getCategoriaIcon(produto.veiculo_id);
            const veiculo = veiculosCatalogo.find(v => v.id === produto.veiculo_id);
            
            return (
              <div 
                key={produto.veiculo_id} 
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-background rounded-lg border"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{produto.modelo}</p>
                    {veiculo && (
                      <p className="text-xs text-muted-foreground">{veiculo.capacidade}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-1">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">Qtd:</Label>
                    <Input
                      type="number"
                      min={1}
                      value={produto.quantidade}
                      onChange={(e) => handleQuantidadeChange(produto.veiculo_id, parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Label className="text-xs text-muted-foreground whitespace-nowrap">R$:</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Valor unit."
                      value={produto.valor_unitario || ""}
                      onChange={(e) => handleValorChange(produto.veiculo_id, e.target.value)}
                      className="w-28 h-8"
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveProduto(produto.veiculo_id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
          
          {/* Resumo */}
          <div className="flex items-center justify-between pt-2 border-t text-sm">
            <span className="text-muted-foreground">
              {produtos.length} produto(s) | {produtos.reduce((acc, p) => acc + p.quantidade, 0)} unidade(s)
            </span>
            {produtos.some(p => p.valor_unitario) && (
              <Badge variant="secondary">
                Total: R$ {produtos
                  .filter(p => p.valor_unitario)
                  .reduce((acc, p) => acc + (p.valor_unitario! * p.quantidade), 0)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Badge>
            )}
          </div>
        </div>
      )}

      {produtos.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border rounded-lg border-dashed">
          Nenhum produto adicionado. Selecione veículos acima.
        </p>
      )}
    </div>
  );
}
