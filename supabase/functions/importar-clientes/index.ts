import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ClienteInput {
  nome_fantasia: string;
  razao_social?: string;
  cpf_cnpj?: string;
  tipo?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  responsavel?: string;
  observacoes?: string;
}

function parseCsvText(csvText: string): ClienteInput[] {
  const lines = csvText.trim().split("\n");
  const results: ClienteInput[] = [];
  
  for (const line of lines) {
    // Skip empty lines and header
    if (!line.trim() || line.startsWith("Nome Fantasia|") || line.startsWith("|Nome Fantasia|") || line.startsWith("|-")) continue;
    
    // Parse pipe-delimited line
    const parts = line.split("|").map(p => p.trim()).filter((_, i, arr) => i > 0 && i < arr.length); // remove first/last empty from |...|
    
    if (parts.length < 1 || !parts[0]) continue;
    
    results.push({
      nome_fantasia: parts[0] || "",
      razao_social: parts[1] || "",
      cpf_cnpj: parts[2] || "",
      endereco: parts[3] || "",
      numero: parts[4] || "",
      complemento: parts[5] || "",
      bairro: parts[6] || "",
      cep: parts[7] || "",
      cidade: parts[8] || "",
      estado: parts[9] || "",
      responsavel: parts[10] || "",
      email: (parts[11] || "").replace(/\\@/g, "@"),
      telefone: parts[12] || "",
    });
  }
  
  return results;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json();
    
    // Support both JSON array and raw CSV text
    let clientes: ClienteInput[];
    if (body.csv_text) {
      clientes = parseCsvText(body.csv_text);
    } else {
      clientes = body.clientes as ClienteInput[];
    }

    if (!clientes || !Array.isArray(clientes) || clientes.length === 0) {
      return new Response(JSON.stringify({ error: "No clients provided", parsed: 0 }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch ALL existing nome_fantasia for dedup
    const { data: existing, error: fetchErr } = await supabase
      .from("clientes")
      .select("nome_fantasia, cpf_cnpj");

    if (fetchErr) throw fetchErr;

    const existingNames = new Set(
      (existing || [])
        .filter((c: any) => c.nome_fantasia)
        .map((c: any) => c.nome_fantasia.toLowerCase().trim())
    );
    const existingCnpjs = new Set(
      (existing || [])
        .filter((c: any) => c.cpf_cnpj)
        .map((c: any) => c.cpf_cnpj.replace(/\D/g, ""))
    );

    // Filter duplicates
    const newClientes: any[] = [];
    const skipped: string[] = [];
    const seen = new Set<string>();

    for (const c of clientes) {
      const nameKey = (c.nome_fantasia || "").toLowerCase().trim();
      const cnpjDigits = (c.cpf_cnpj || "").replace(/\D/g, "");

      if (!nameKey) {
        skipped.push("(sem nome)");
        continue;
      }

      if (existingNames.has(nameKey)) {
        skipped.push(c.nome_fantasia);
        continue;
      }

      if (cnpjDigits.length >= 11 && existingCnpjs.has(cnpjDigits)) {
        skipped.push(`${c.nome_fantasia} (CNPJ duplicado)`);
        continue;
      }

      if (seen.has(nameKey)) {
        skipped.push(`${c.nome_fantasia} (duplicado no lote)`);
        continue;
      }
      seen.add(nameKey);
      
      // Also add to existing sets so next batches know about these
      existingNames.add(nameKey);
      if (cnpjDigits.length >= 11) existingCnpjs.add(cnpjDigits);

      let tipo = (c.tipo || "").toUpperCase().trim();
      if (!tipo || (tipo !== "PF" && tipo !== "PJ")) {
        tipo = cnpjDigits.length <= 11 ? "PF" : "PJ";
      }

      let estado = (c.estado || "").trim();
      if (estado.toLowerCase() === "minas gerais") estado = "MG";

      newClientes.push({
        nome_fantasia: c.nome_fantasia?.trim() || null,
        razao_social: c.razao_social?.trim() || c.nome_fantasia?.trim() || "Sem Nome",
        cpf_cnpj: c.cpf_cnpj?.trim() || "",
        tipo,
        telefone: c.telefone?.trim() || null,
        email: c.email?.trim() || null,
        endereco: c.endereco?.trim() || null,
        numero: c.numero?.trim() || null,
        complemento: c.complemento?.trim() || null,
        bairro: c.bairro?.trim() || null,
        cep: c.cep?.trim() || null,
        cidade: c.cidade?.trim() || null,
        estado: estado || null,
        responsavel: c.responsavel?.trim() || null,
        observacoes: c.observacoes?.trim() || null,
      });
    }

    // Insert in sub-batches of 50
    let inserted = 0;
    const errors: string[] = [];

    for (let i = 0; i < newClientes.length; i += 50) {
      const batch = newClientes.slice(i, i + 50);
      const { data, error } = await supabase
        .from("clientes")
        .insert(batch)
        .select("id");

      if (error) {
        for (const item of batch) {
          const { error: sErr } = await supabase.from("clientes").insert(item);
          if (sErr) {
            errors.push(`${item.nome_fantasia}: ${sErr.message}`);
          } else {
            inserted++;
          }
        }
      } else {
        inserted += data?.length || batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        inserted,
        skipped: skipped.length,
        skipped_names: skipped.slice(0, 30),
        errors: errors.length,
        error_details: errors.slice(0, 10),
        total_received: clientes.length,
        total_parsed: clientes.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
