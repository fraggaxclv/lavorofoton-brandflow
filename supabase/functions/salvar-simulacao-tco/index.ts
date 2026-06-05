// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Lista compacta de domínios de e-mail descartáveis (subset comum, ~180 entradas)
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","10minutemail.com","tempmail.com","guerrillamail.com","yopmail.com",
  "throwaway.email","fakeinbox.com","mintemail.com","sharklasers.com","getairmail.com",
  "dispostable.com","mailcatch.com","mohmal.com","trashmail.com","mytemp.email","temp-mail.org",
  "tempmailo.com","emailondeck.com","getnada.com","nada.email","maildrop.cc","mailnesia.com",
  "spambox.us","spam4.me","spamgourmet.com","mvrht.net","trbvm.com","tmpmail.org","tmpmail.net",
  "anonymbox.com","mailtemp.info","jetable.org","mailcatch.org","cool.fr.nf","jourrapide.com",
  "armyspy.com","cuvox.de","dayrep.com","einrot.com","fleckens.hu","gustr.com","rhyta.com",
  "superrito.com","teleworm.us","mailbox.in.ua","tafmail.com","emltmp.com","mailpoof.com",
  "mailshell.com","mailtrash.net","mintemail.net","mywaste.email","spambog.com","spambog.de",
  "spambog.ru","tempemail.com","tempinbox.com","tempmail.de","tempmail.net","tempmailaddress.com",
  "tempmailer.com","tempmailer.de","tempymail.com","trashmail.de","trashmail.io","trashmail.me",
  "trashmail.net","trashmail.org","trashmail.ws","wegwerf-email.de","wegwerfadresse.de",
  "wegwerfemail.de","wegwerfmail.de","wegwerfmail.info","wegwerfmail.net","wegwerfmail.org",
  "discardmail.com","discardmail.de","spam.la","spamcero.com","spamdecoy.net","spamex.com",
  "spamfree24.com","spamfree24.de","spamfree24.eu","spamfree24.info","spamfree24.net",
  "spamfree24.org","spamhereplease.com","spamhole.com","spaminator.de","spamkill.info",
  "spaml.com","spaml.de","spammotel.com","spamoff.de","spamspot.com","spamthis.co.uk",
  "spamthisplease.com","supergreatmail.com","supermailer.jp","suremail.info","tagyourself.com",
  "tempalias.com","tempe-mail.com","tempemail.biz","tempemail.net","tempinbox.co.uk",
  "tempmail2.com","tempmaildemo.com","tempmailer.net","temporarily.de","temporarioemail.com.br",
  "temporaryemail.net","temporaryemail.us","temporaryforwarding.com","temporaryinbox.com",
  "temporarymailaddress.com","tempthe.net","thanksnospam.info","thankyou2010.com","thecloudindex.com",
  "thisisnotmyrealemail.com","throam.com","thrott.com","tilien.com","tittbit.in","tizi.com",
  "tmail.ws","tmailinator.com","toiea.com","topranklist.de","tradermail.info","trash-amil.com",
  "trash-mail.at","trash-mail.com","trash-mail.de","trash2009.com","trashdevil.com",
  "trashemail.de","trashinbox.com","trashymail.com","trbvn.com","trialmail.de","trillianpro.com",
  "twinmail.de","twoweirdtricks.com","tyldd.com","uggsrock.com","umail.net","upliftnow.com",
  "uplipht.com","uroid.com","us.af","venompen.com","veryrealemail.com","viditag.com",
  "viewcastmedia.com","viewcastmedia.net","viewcastmedia.org","vinbazar.com","vipmail.name",
  "vipmail.pw","vkcode.ru","vmailing.info","voidbay.com","vomoto.com","vpn.st","vsimcard.com",
  "vubby.com","walala.org","walkmail.net","webemail.me","webm4il.info","webuser.in","wee.my",
  "weg-werf-email.de","wegwerf-email-addressen.de","wegwerf-emails.de","wegwerfmail.com",
  "wetrainbayarea.com","wetrainbayarea.org","wh4f.org","whatiaas.com","whatpaas.com","whatsaas.com",
  "whopy.com","whyspam.me","wickmail.net","wilemail.com","willhackforfood.biz","willselfdestruct.com",
  "winemaven.info","wlist.ro","wmail.cf","wronghead.com","wuzup.net","wuzupmail.net","wwwnew.eu",
  "xagloo.com","xemaps.com","xents.com","xmaily.com","xoxy.net","yapped.net","yeah.net",
  "yep.it","yogamaven.com","yomail.info","yopmail.fr","yopmail.net","ypmail.webarnak.fr.eu.org",
  "yuurok.com","zehnminutenmail.de","zoaxe.com","zoemail.org","mvrht.com","cetpass.com",
  "guerrillamailblock.com","grr.la","pokemail.net","sharklasers.org","spam4.me","trbvn.com",
  "binkmail.com","bobmail.info","chammy.info","devnullmail.com","letthemeatspam.com",
  "mailin8r.com","mailinator2.com","notmailinator.com","reallymymail.com","sogetthis.com",
  "spamherelots.com","streetwisemail.com","suremail.info","thisisnotmyrealemail.com",
  "tradermail.info","veryrealemail.com","zippymail.info","mailimate.com","emailfake.com",
  "tempr.email","dropmail.me","fakemail.fr","mintmail.com","getairmail.de","mailto.plus",
  "linshiyouxiang.net","emlhub.com","privymail.de","minutemail.com","temp-mail.ru",
  "temp-mail.io","mailcuk.com","mail-temporaire.fr","throwawaymail.com","mvrht.net",
]);

const DDD_VALIDOS = new Set([
  11,12,13,14,15,16,17,18,19,
  21,22,24,27,28,
  31,32,33,34,35,37,38,
  41,42,43,44,45,46,47,48,49,
  51,53,54,55,
  61,62,63,64,65,66,67,68,69,
  71,73,74,75,77,79,
  81,82,83,84,85,86,87,88,89,
  91,92,93,94,95,96,97,98,99,
]);

function emailFmtOk(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function phoneOk(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 10 && d.length !== 11) return false;
  if (/^(\d)\1+$/.test(d)) return false; // todos iguais
  if (/0{6,}|1{6,}|9{6,}/.test(d)) return false;
  const seqs = ["01234","12345","23456","34567","45678","56789","98765","87654"];
  if (seqs.some((s) => d.includes(s))) return false;
  const ddd = parseInt(d.slice(0, 2), 10);
  if (!DDD_VALIDOS.has(ddd)) return false;
  // 11 dígitos: o terceiro deve ser 9 (celular)
  if (d.length === 11 && d[2] !== "9") return false;
  return true;
}

async function mxOk(domain: string): Promise<boolean> {
  try {
    const r = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { Accept: "application/dns-json" } },
    );
    if (!r.ok) return true; // não bloquear por falha de DNS
    const j: any = await r.json();
    if (Array.isArray(j?.Answer) && j.Answer.length > 0) return true;
    // fallback A record (ainda aceita)
    const r2 = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`,
      { headers: { Accept: "application/dns-json" } },
    );
    const j2: any = await r2.json();
    return Array.isArray(j2?.Answer) && j2.Answer.length > 0;
  } catch {
    return true;
  }
}

function genCode(modeloFoton?: string) {
  const slug = (modeloFoton || "TCO")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 5) || "TCO";
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let rand = "";
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < 5; i++) rand += alphabet[bytes[i] % alphabet.length];
  return `LVF-${slug}-${rand}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      nome, email, telefone, empresa,
      aceite_consultoria, aceite_privacidade,
      inputs_simulacao, resultados_simulacao,
      modelo_foton, modelo_concorrente,
    } = body ?? {};

    // Validações server-side
    if (!nome || typeof nome !== "string" || nome.trim().length < 2)
      return json({ error: "Nome inválido." }, 400);
    if (!email || !emailFmtOk(String(email)))
      return json({ error: "E-mail inválido." }, 400);
    if (!telefone || !phoneOk(String(telefone)))
      return json({ error: "Telefone inválido." }, 400);
    if (!aceite_privacidade)
      return json({ error: "É necessário aceitar a Política de Privacidade." }, 400);

    const emailNorm = String(email).trim().toLowerCase();
    const domain = emailNorm.split("@")[1];
    if (!domain) return json({ error: "E-mail inválido." }, 400);
    if (DISPOSABLE_DOMAINS.has(domain))
      return json({ error: "Use um e-mail corporativo válido." }, 400);
    if (!(await mxOk(domain)))
      return json({ error: "Domínio de e-mail não encontrado." }, 400);

    const supa = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") || null;
    const ua = req.headers.get("user-agent") || null;

    // Insert com retry em caso de colisão de código
    let code = genCode(modelo_foton);
    let inserted: any = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const { data, error } = await supa
        .from("simulacoes_tco")
        .insert({
          simulation_code: code,
          nome: String(nome).trim(),
          email: emailNorm,
          telefone: String(telefone).replace(/\D/g, ""),
          empresa: empresa ? String(empresa).trim() : null,
          aceite_consultoria: !!aceite_consultoria,
          aceite_privacidade: true,
          inputs_simulacao: inputs_simulacao ?? {},
          resultados_simulacao: resultados_simulacao ?? {},
          modelo_foton: modelo_foton ?? null,
          modelo_concorrente: modelo_concorrente ?? null,
          ip_address: ip,
          user_agent: ua,
        })
        .select("id, simulation_code, created_at")
        .single();
      if (!error) { inserted = data; break; }
      // 23505 = unique_violation
      if ((error as any).code !== "23505") {
        console.error("insert error", error);
        return json({ error: "Falha ao salvar simulação." }, 500);
      }
      code = genCode(modelo_foton);
    }
    if (!inserted) return json({ error: "Não foi possível gerar código único." }, 500);

    return json({
      id: inserted.id,
      simulation_code: inserted.simulation_code,
      created_at: inserted.created_at,
    }, 200);
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
