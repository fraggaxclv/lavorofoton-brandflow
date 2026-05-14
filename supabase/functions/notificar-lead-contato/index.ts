import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface LeadPayload {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  mensagem?: string;
  origem?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as LeadPayload;
    if (!body?.nome || !body?.email || !body?.telefone) {
      return new Response(JSON.stringify({ error: 'Campos obrigatórios faltando' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const empresaLabel = body.empresa?.trim() || 'sem empresa';
    const subject = `Novo lead site Lavoro Foton — ${body.nome} — ${empresaLabel}`;

    const telefoneDigits = (body.telefone || '').replace(/\D/g, '');
    const waNumber = telefoneDigits.length >= 10
      ? (telefoneDigits.startsWith('55') ? telefoneDigits : `55${telefoneDigits}`)
      : null;
    const waLink = waNumber ? `https://wa.me/${waNumber}` : null;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:640px; margin:0 auto; color:#0A1F3D;">
        <h2 style="color:#0A1F3D; border-bottom: 2px solid #F5A623; padding-bottom:8px;">Novo lead pelo site</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:8px 4px; font-weight:bold; width:140px;">Nome:</td><td>${escapeHtml(body.nome)}</td></tr>
          <tr><td style="padding:8px 4px; font-weight:bold;">Email:</td><td><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td></tr>
          <tr><td style="padding:8px 4px; font-weight:bold;">Telefone:</td><td>${escapeHtml(body.telefone)}</td></tr>
          <tr><td style="padding:8px 4px; font-weight:bold;">Empresa:</td><td>${escapeHtml(body.empresa || '—')}</td></tr>
          <tr><td style="padding:8px 4px; font-weight:bold;">Origem:</td><td>${escapeHtml(body.origem || 'site_publico_contato')}</td></tr>
          <tr><td style="padding:8px 4px; font-weight:bold; vertical-align:top;">Mensagem:</td><td style="white-space:pre-wrap;">${escapeHtml(body.mensagem || '—')}</td></tr>
        </table>
        ${waLink ? `<p style="margin-top:24px;"><a href="${waLink}" style="display:inline-block; background:#25D366; color:#fff; padding:12px 20px; border-radius:6px; text-decoration:none; font-weight:bold;">Responder via WhatsApp</a></p>` : ''}
        <hr style="margin-top:24px; border:none; border-top:1px solid #ddd;" />
        <p style="font-size:12px; color:#666;">Lavoro Foton — Notificação automática</p>
      </div>
    `;

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Lavoro Foton <leads@lavorofoton.com.br>',
        to: ['contato@lavorofoton.com.br'],
        cc: ['matheus@lavorofoton.com.br'],
        subject,
        html,
        reply_to: body.email,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: 'Falha ao enviar email', details: data }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('notificar-lead-contato error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
