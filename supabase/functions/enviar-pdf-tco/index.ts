// deno-lint-ignore-file no-explicit-any
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { email, nome, simulation_code, pdf_base64, filename } = await req.json();

    if (!email || !pdf_base64 || !simulation_code) {
      return json({ error: "Parâmetros obrigatórios ausentes." }, 400);
    }

    const RESEND = Deno.env.get("RESEND_API_KEY");
    if (!RESEND) return json({ error: "Serviço de e-mail não configurado." }, 500);

    const from = "Lavoro Foton <noreply@lavorofoton.com.br>";
    const subject = `Sua análise comparativa de TCO — ${simulation_code}`;
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <h2 style="color:#003B73">Olá${nome ? `, ${String(nome).split(" ")[0]}` : ""} 👋</h2>
        <p>Segue em anexo a sua análise comparativa de TCO gerada na Calculadora Lavoro Foton.</p>
        <p><strong>ID da análise:</strong> ${simulation_code}<br/>
        <strong>Verificação:</strong> https://www.lavorofoton.com.br/verificar/${simulation_code}</p>
        <p>Quer aprofundar a análise para a sua frota? Fale com um consultor:
          <a href="https://wa.me/5531996970656">WhatsApp Lavoro Foton</a>.
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
        <p style="font-size:11px;color:#6b7280">
          Lavoro Foton — Concessionária oficial Foton em Belo Horizonte/MG.<br/>
          Você está recebendo este e-mail porque solicitou a análise no site.
        </p>
      </div>
    `;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from, to: [email], subject, html,
        attachments: [{
          filename: filename || `Analise_TCO_${simulation_code}.pdf`,
          content: pdf_base64,
        }],
      }),
    });

    if (!r.ok) {
      const t = await r.text();
      console.error("Resend error", r.status, t);
      return json({ error: "Falha ao enviar e-mail." }, 502);
    }

    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ error: "Erro interno." }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
