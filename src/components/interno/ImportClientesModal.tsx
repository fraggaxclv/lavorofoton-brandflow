import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Fields available for mapping
const CLIENTE_FIELDS = [
  { key: "razao_social", label: "Razão Social", required: true },
  { key: "nome_fantasia", label: "Nome Fantasia", required: false },
  { key: "cpf_cnpj", label: "CPF/CNPJ", required: true },
  { key: "tipo", label: "Tipo (PF/PJ)", required: false },
  { key: "telefone", label: "Telefone", required: false },
  { key: "email", label: "Email", required: false },
  { key: "endereco", label: "Endereço", required: false },
  { key: "numero", label: "Número", required: false },
  { key: "complemento", label: "Complemento", required: false },
  { key: "bairro", label: "Bairro", required: false },
  { key: "cep", label: "CEP", required: false },
  { key: "cidade", label: "Cidade", required: false },
  { key: "estado", label: "Estado", required: false },
  { key: "responsavel", label: "Responsável", required: false },
  { key: "consultor_responsavel", label: "Consultor Responsável", required: false },
  { key: "observacoes", label: "Observações", required: false },
] as const;

// Auto-mapping heuristics
const AUTO_MAP: Record<string, string> = {
  "razao social": "razao_social",
  "razão social": "razao_social",
  "razao_social": "razao_social",
  "nome fantasia": "nome_fantasia",
  "nome_fantasia": "nome_fantasia",
  "fantasia": "nome_fantasia",
  "cpf/cnpj": "cpf_cnpj",
  "cpf_cnpj": "cpf_cnpj",
  "cpf": "cpf_cnpj",
  "cnpj": "cpf_cnpj",
  "tipo": "tipo",
  "tipo cliente": "tipo",
  "telefone": "telefone",
  "tel": "telefone",
  "celular": "telefone",
  "fone": "telefone",
  "whatsapp": "telefone",
  "email": "email",
  "e-mail": "email",
  "endereco": "endereco",
  "endereço": "endereco",
  "rua": "endereco",
  "logradouro": "endereco",
  "numero": "numero",
  "número": "numero",
  "nro": "numero",
  "num": "numero",
  "complemento": "complemento",
  "compl": "complemento",
  "bairro": "bairro",
  "cep": "cep",
  "cidade": "cidade",
  "municipio": "cidade",
  "município": "cidade",
  "estado": "estado",
  "uf": "estado",
  "responsavel": "responsavel",
  "responsável": "responsavel",
  "contato": "responsavel",
  "consultor": "consultor_responsavel",
  "consultor_responsavel": "consultor_responsavel",
  "vendedor": "consultor_responsavel",
  "observacoes": "observacoes",
  "observações": "observacoes",
  "obs": "observacoes",
};

type Step = "upload" | "mapping" | "preview" | "importing";

interface ImportClientesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  // Detect separator: ; or , or \t
  const firstLine = lines[0];
  const sepCounts = { ";": 0, ",": 0, "\t": 0 };
  for (const ch of firstLine) {
    if (ch in sepCounts) sepCounts[ch as keyof typeof sepCounts]++;
  }
  const separator = Object.entries(sepCounts).sort((a, b) => b[1] - a[1])[0][0];

  const parseLine = (line: string) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === separator && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);
  return { headers, rows };
}

function detectTipo(cpfCnpj: string): "PF" | "PJ" {
  const digits = cpfCnpj.replace(/\D/g, "");
  return digits.length <= 11 ? "PF" : "PJ";
}

export default function ImportClientesModal({
  open,
  onOpenChange,
  onComplete,
}: ImportClientesModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("upload");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<number, string>>({});
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: { row: number; message: string }[];
  } | null>(null);

  const reset = () => {
    setStep("upload");
    setCsvHeaders([]);
    setCsvRows([]);
    setMapping({});
    setImportProgress(0);
    setImportResults(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleClose = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { headers, rows } = parseCSV(text);
      if (headers.length === 0) {
        toast.error("Arquivo vazio ou formato inválido");
        return;
      }
      setCsvHeaders(headers);
      setCsvRows(rows);

      // Auto-map
      const autoMap: Record<number, string> = {};
      const usedFields = new Set<string>();
      headers.forEach((h, i) => {
        const normalized = h.toLowerCase().trim();
        const match = AUTO_MAP[normalized];
        if (match && !usedFields.has(match)) {
          autoMap[i] = match;
          usedFields.add(match);
        }
      });
      setMapping(autoMap);
      setStep("mapping");
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const setFieldMapping = (colIndex: number, fieldKey: string) => {
    setMapping((prev) => {
      const next = { ...prev };
      if (fieldKey === "ignore") {
        delete next[colIndex];
      } else {
        // Remove duplicate mapping
        for (const [k, v] of Object.entries(next)) {
          if (v === fieldKey) delete next[Number(k)];
        }
        next[colIndex] = fieldKey;
      }
      return next;
    });
  };

  const requiredMapped = CLIENTE_FIELDS.filter((f) => f.required).every((f) =>
    Object.values(mapping).includes(f.key)
  );

  const getMappedRows = () => {
    return csvRows.map((row) => {
      const obj: Record<string, string> = {};
      for (const [colIdx, fieldKey] of Object.entries(mapping)) {
        obj[fieldKey] = row[Number(colIdx)] || "";
      }
      // Auto-detect tipo from CPF/CNPJ if not mapped
      if (!obj.tipo && obj.cpf_cnpj) {
        obj.tipo = detectTipo(obj.cpf_cnpj);
      } else if (obj.tipo) {
        const t = obj.tipo.toUpperCase().trim();
        obj.tipo = t === "PF" || t.includes("FIS") ? "PF" : "PJ";
      }
      return obj;
    });
  };

  const handleImport = async () => {
    setStep("importing");
    const rows = getMappedRows();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    let success = 0;
    const errors: { row: number; message: string }[] = [];
    const BATCH = 20;

    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH).map((r) => ({
        razao_social: r.razao_social || "Sem Nome",
        nome_fantasia: r.nome_fantasia || null,
        cpf_cnpj: r.cpf_cnpj || "000.000.000-00",
        tipo: r.tipo || "PJ",
        telefone: r.telefone || null,
        email: r.email || null,
        endereco: r.endereco || null,
        numero: r.numero || null,
        complemento: r.complemento || null,
        bairro: r.bairro || null,
        cep: r.cep || null,
        cidade: r.cidade || null,
        estado: r.estado || null,
        responsavel: r.responsavel || null,
        consultor_responsavel: r.consultor_responsavel || null,
        observacoes: r.observacoes || null,
        created_by: user.id,
      }));

      const { data, error } = await supabase
        .from("clientes")
        .insert(batch)
        .select("id");

      if (error) {
        // Try one by one
        for (let j = 0; j < batch.length; j++) {
          const { error: singleErr } = await supabase
            .from("clientes")
            .insert(batch[j]);
          if (singleErr) {
            errors.push({ row: i + j + 2, message: singleErr.message });
          } else {
            success++;
          }
        }
      } else {
        success += data?.length || batch.length;
      }

      setImportProgress(Math.min(100, Math.round(((i + BATCH) / rows.length) * 100)));
    }

    setImportResults({ success, errors });
    setImportProgress(100);

    if (success > 0) {
      toast.success(`${success} cliente(s) importado(s) com sucesso!`);
      onComplete();
    }
  };

  const previewRows = getMappedRows ? getMappedRows().slice(0, 5) : [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Importar Clientes
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Badge variant={step === "upload" ? "default" : "secondary"} className="text-[10px]">1. Upload</Badge>
          <ArrowRight className="h-3 w-3" />
          <Badge variant={step === "mapping" ? "default" : "secondary"} className="text-[10px]">2. Mapeamento</Badge>
          <ArrowRight className="h-3 w-3" />
          <Badge variant={step === "preview" ? "default" : "secondary"} className="text-[10px]">3. Preview</Badge>
          <ArrowRight className="h-3 w-3" />
          <Badge variant={step === "importing" ? "default" : "secondary"} className="text-[10px]">4. Importar</Badge>
        </div>

        {/* Step 1: Upload */}
        {step === "upload" && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium mb-1">Arraste um arquivo CSV ou clique para selecionar</p>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: .csv (separado por vírgula, ponto-e-vírgula ou tab)
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.txt"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        )}

        {/* Step 2: Mapping */}
        {step === "mapping" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {csvRows.length} linha(s) encontrada(s). Mapeie as colunas:
              </p>
              {!requiredMapped && (
                <Badge variant="destructive" className="text-[10px]">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Campos obrigatórios faltando
                </Badge>
              )}
            </div>

            <ScrollArea className="max-h-[40vh]">
              <div className="space-y-2">
                {csvHeaders.map((header, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1/3 min-w-0">
                      <p className="text-xs font-medium truncate" title={header}>
                        {header}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        Ex: {csvRows[0]?.[idx] || "—"}
                      </p>
                    </div>
                    <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                    <Select
                      value={mapping[idx] || "ignore"}
                      onValueChange={(v) => setFieldMapping(idx, v)}
                    >
                      <SelectTrigger className="h-8 text-xs flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ignore">— Ignorar —</SelectItem>
                        {CLIENTE_FIELDS.map((f) => (
                          <SelectItem key={f.key} value={f.key}>
                            {f.label} {f.required ? "*" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={reset}>
                <ArrowLeft className="h-3 w-3 mr-1" />
                Voltar
              </Button>
              <Button size="sm" disabled={!requiredMapped} onClick={() => setStep("preview")}>
                Próximo
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === "preview" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Prévia das primeiras 5 linhas ({csvRows.length} total):
            </p>

            <ScrollArea className="max-h-[40vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs w-8">#</TableHead>
                    {CLIENTE_FIELDS.filter((f) =>
                      Object.values(mapping).includes(f.key)
                    ).map((f) => (
                      <TableHead key={f.key} className="text-xs whitespace-nowrap">
                        {f.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs text-muted-foreground">{i + 1}</TableCell>
                      {CLIENTE_FIELDS.filter((f) =>
                        Object.values(mapping).includes(f.key)
                      ).map((f) => (
                        <TableCell key={f.key} className="text-xs max-w-[150px] truncate">
                          {row[f.key] || "—"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>

            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => setStep("mapping")}>
                <ArrowLeft className="h-3 w-3 mr-1" />
                Voltar
              </Button>
              <Button size="sm" onClick={handleImport}>
                <Upload className="h-3 w-3 mr-1" />
                Importar {csvRows.length} cliente(s)
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Importing */}
        {step === "importing" && (
          <div className="space-y-4 py-4">
            {!importResults ? (
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
                <p className="text-sm font-medium">Importando clientes...</p>
                <Progress value={importProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">{importProgress}%</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium">Importação concluída!</p>
                </div>

                <div className="flex gap-4 justify-center text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{importResults.success}</p>
                    <p className="text-xs text-muted-foreground">Importados</p>
                  </div>
                  {importResults.errors.length > 0 && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-destructive">{importResults.errors.length}</p>
                      <p className="text-xs text-muted-foreground">Erros</p>
                    </div>
                  )}
                </div>

                {importResults.errors.length > 0 && (
                  <ScrollArea className="max-h-32">
                    <div className="space-y-1">
                      {importResults.errors.slice(0, 10).map((err, i) => (
                        <p key={i} className="text-xs text-destructive flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                          Linha {err.row}: {err.message}
                        </p>
                      ))}
                      {importResults.errors.length > 10 && (
                        <p className="text-xs text-muted-foreground">
                          ...e mais {importResults.errors.length - 10} erro(s)
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                )}

                <div className="flex justify-center pt-2">
                  <Button size="sm" onClick={() => handleClose(false)}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
