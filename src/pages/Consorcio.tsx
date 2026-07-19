import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  MessageSquare,
  CalendarCheck,
  Ticket,
  Key,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Truck,
  FileText,
  Calculator,
} from "lucide-react";

const WHATSAPP_NUMBER = "5531997966042";

const LINHA_LEGAL =
  "Consórcio Foton administrado por Canopus Administradora de Consórcios S.A., CNPJ 68.318.773/0001-54, autorizada e fiscalizada pelo Banco Central do Brasil — Lei 11.795/08. Consórcio não tem juros; incidem taxa de administração (de 11% a 20% conforme o prazo), seguro de 0,043% a.m. e demais encargos previstos no regulamento do grupo. Contemplação exclusivamente por sorteio ou lance, sem garantia de data. Não comercializamos cotas contempladas. Valores de referência da tabela Canopus do grupo 8.400 (emissão 28/02/2026), com crédito e parcelas reajustados pelo IPCA/IBGE — a simulação vigente na data da adesão prevalece. Imagens ilustrativas.";

// Tabela de referência Canopus — grupo 8.400 (emissão 28/02/2026, reajuste IPCA)
const CREDITOS = [240000, 300000, 360000, 420000, 480000] as const;
const PRAZOS = [126, 96, 66, 36] as const;

const PARCELAS: Record<"linear" | "renovacao", Record<number, Record<number, number>>> = {
  linear: {
    240000: { 126: 2409.6, 96: 3045.86, 66: 4300.44, 36: 7649.98 },
    300000: { 126: 3012.0, 96: 3807.33, 66: 5375.55, 36: 9562.47 },
    360000: { 126: 3614.4, 96: 4568.8, 66: 6450.66, 36: 11474.96 },
    420000: { 126: 4216.8, 96: 5330.26, 66: 7525.77, 36: 13387.46 },
    480000: { 126: 4819.2, 96: 6091.73, 66: 8600.88, 36: 15299.95 },
  },
  renovacao: {
    240000: { 126: 1457.04, 96: 1795.7, 66: 2482.44, 36: 4316.62 },
    300000: { 126: 1821.3, 96: 2244.63, 66: 3103.05, 36: 5395.77 },
    360000: { 126: 2185.56, 96: 2693.56, 66: 3723.66, 36: 6474.92 },
    420000: { 126: 2549.82, 96: 3142.48, 66: 4344.27, 36: 7554.08 },
    480000: { 126: 2914.08, 96: 3591.41, 66: 4964.88, 36: 8633.23 },
  },
};

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const brlK = (v: number) => `R$ ${(v / 1000).toLocaleString("pt-BR")} mil`;

// Selo oficial do programa (tipográfico até o vetor oficial chegar —
// trocar por /assets/selo-consorcio-foton.svg quando vetorizado)
const SeloConsorcioFoton = ({ dark = false }: { dark?: boolean }) => (
  <div
    className={`inline-flex items-center gap-3 rounded-xl border px-4 py-2.5 ${
      dark ? "border-white/25 bg-white/5" : "border-border bg-card"
    }`}
  >
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
        dark ? "border-white" : "border-foreground"
      }`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M3 6h8l-2.2 4H5.2L3 6zm4 6h7l-2.2 4H9.2L7 12zm4 6h6l-2.2 4h-1.6L11 18z" transform="rotate(-12 12 12)" />
      </svg>
    </div>
    <div className="leading-tight text-left">
      <div className={`text-[10px] font-semibold tracking-[0.35em] uppercase ${dark ? "text-white/80" : "text-muted-foreground"}`}>
        Consórcio
      </div>
      <div className={`text-xl font-black uppercase tracking-wide -mt-0.5 ${dark ? "text-white" : "text-foreground"}`}>
        Foton
      </div>
      <div className={`mt-0.5 text-[10px] font-medium px-1.5 py-px rounded ${dark ? "bg-white/15 text-white/90" : "bg-secondary text-muted-foreground"}`}>
        Administrado pelo Consórcio Canopus
      </div>
    </div>
  </div>
);

const FAQ = [
  {
    q: "Consórcio é furada?",
    a: "Depende de quem te vende. Se alguém te prometeu contemplação com data marcada, é furada — e é golpe. A lei 11.795/08 é clara: contemplação é por sorteio ou lance, todo mês, em assembleia. Aqui a conversa é essa, preto no branco.",
  },
  {
    q: "“Sem juros” quer dizer de graça?",
    a: "Não. Consórcio não tem juros, mas tem taxa de administração — no grupo 8.400 ela vai de 11% (planos curtos) a 20% (126 meses), mais seguro de 0,043% a.m. Está no contrato e a gente te mostra antes de qualquer assinatura.",
  },
  {
    q: "Quando eu recebo o caminhão?",
    a: "Quando for contemplado: todo mês tem assembleia com sorteio, e você pode acelerar ofertando lance (livre, fixo ou limitado). Existe ainda o lance embutido, que usa até 50% do próprio crédito — você dá o lance sem tirar dinheiro do bolso.",
  },
  {
    q: "Minha empresa já lança a depreciação na contabilidade. Por que consórcio?",
    a: "Exatamente por isso. A depreciação que você deduz no imposto de renda é dinheiro que o caminhão perde — mas que ninguém guarda. A parcela do consórcio é a poupança dessa depreciação: quando o veículo completa o ciclo, a cota está pronta pra renovar a frota sem juros e sem descapitalizar.",
  },
  {
    q: "Pra quem o consórcio faz sentido?",
    a: "Pra quem não tem entrada, pra quem o banco negou, pra quem quer trocar aluguel de caminhão por patrimônio e pro frotista que renova frota com disciplina. Pra quem precisa do caminhão rodando amanhã, o caminho é financiamento — e a gente também resolve.",
  },
  {
    q: "Quem administra o dinheiro?",
    a: "A Canopus Administradora de Consórcios S.A. (CNPJ 68.318.773/0001-54), autorizada e fiscalizada pelo Banco Central — administradora oficial do Consórcio Foton em todo o Brasil. A Lavoro é o canal oficial de venda e simulação em Minas Gerais. Você paga a administradora, não a loja.",
  },
];

const Consorcio = () => {
  // ─── Preenchedor / proposta pronta ───
  const [objetivo, setObjetivo] = useState<"linear" | "renovacao">("linear");
  const [credito, setCredito] = useState<number>(300000);
  const [prazo, setPrazo] = useState<number>(96);
  const [nome, setNome] = useState("");

  const parcela = useMemo(() => PARCELAS[objetivo][credito][prazo], [objetivo, credito, prazo]);

  const propostaMsg = useMemo(() => {
    const plano = objetivo === "linear" ? "Plano Linear (crédito cheio)" : "Plano Renovação 50% (parcela reduzida)";
    return (
      `Quero fechar minha proposta do Consórcio Foton:\n` +
      `• ${plano}\n` +
      `• Crédito: ${brlK(credito)}\n` +
      `• Prazo: ${prazo} meses\n` +
      `• Parcela de referência: ${brl(parcela)}\n` +
      (nome.trim() ? `• Nome: ${nome.trim()}\n` : "") +
      `(Simulei no site da Lavoro — grupo 8.400)`
    );
  }, [objetivo, credito, prazo, parcela, nome]);

  const whatsappProposta = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(propostaMsg)}`;
  const whatsappSimples = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Quero simular o Consórcio Foton")}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Consórcio Foton — Lavoro",
      serviceType: "Consórcio de caminhões e picapes Foton",
      provider: {
        "@type": "AutoDealer",
        name: "Lavoro Foton",
        telephone: "+55-31-99796-6042",
        address: { "@type": "PostalAddress", addressLocality: "Contagem", addressRegion: "MG", addressCountry: "BR" },
      },
      areaServed: "Minas Gerais",
      description:
        "Consórcio Foton administrado por Canopus (autorizada BACEN): créditos de R$ 240 mil a R$ 480 mil, prazos de 36 a 126 meses, sem juros e sem entrada. Monte sua proposta online e receba pelo WhatsApp.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const selectBtn = (active: boolean) =>
    `rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all text-left ${
      active
        ? "border-primary bg-primary/10 text-foreground shadow-sm"
        : "border-border bg-card text-muted-foreground hover:border-primary/40"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Consórcio Foton — monte sua proposta online | Lavoro Foton"
        description="Consórcio Foton administrado por Canopus (autorizada BACEN). Monte sua proposta em 30 segundos: créditos de R$ 240 a 480 mil, prazos de 36 a 126 meses, sem juros e sem entrada. Grupo 8.400 — Lavoro Foton, Contagem MG."
        path="/consorcio"
        ogImage="https://www.lavorofoton.com.br/og-consorcio.jpg"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* ═══ 1. HERO ═══ */}
      <section className="mt-16 pt-20 pb-14 bg-gradient-to-br from-industrial-dark via-industrial-dark to-primary/20 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-primary rounded-full" />
          <div className="absolute bottom-10 right-20 w-96 h-96 border border-primary rounded-full" />
        </div>
        <div className="container-lavoro relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <SeloConsorcioFoton dark />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight uppercase">
            Todo caminhão começa
            <span className="block text-cyan-400 mt-2">por uma parte.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ainda não dá pro Foton inteiro? Começa pela parte: sem juros, sem
            entrada, sem banco te dizendo não.{" "}
            <span className="text-primary-foreground font-semibold">Cada parcela é um pedaço seu.</span>
          </p>

          {/* Régua de meses — o caminhão que se completa */}
          <div className="max-w-2xl mx-auto mt-10 mb-8">
            <div className="flex items-center gap-1">
              {["MÊS 1", "MÊS 7", "MÊS 15", "MÊS 26", "MÊS 38", "🔑"].map((m, i) => (
                <div key={m} className="flex-1">
                  <div className={`h-2 rounded-full ${i < 3 ? "bg-cyan-400" : "bg-white/15"}`} />
                  <div className={`mt-2 text-[10px] md:text-xs font-semibold tracking-wider ${i < 3 ? "text-cyan-400" : "text-white/40"}`}>
                    {m}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#proposta"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded hover:bg-primary-dark transition-all shadow-lg"
          >
            <Calculator className="w-5 h-5" />
            Montar minha proposta em 30 segundos
          </a>
          <p className="text-sm text-white/50 mt-4">
            Sem cadastro, sem espera — a proposta sai pronta aqui na tela.
          </p>
        </div>
      </section>

      {/* ═══ 2. O MOMENTO — programa nacional ═══ */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 md:p-10 rounded-2xl border-l-4 border-primary">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              O Consórcio Foton é o{" "}
              <span className="text-primary font-bold">programa nacional oficial da marca</span>, administrado pela
              Canopus — mais de 20 anos de mercado, fiscalizada pelo Banco Central, com{" "}
              <span className="font-bold">assembleias e contemplações todo mês</span> em grupos por todo o Brasil.{" "}
              <span className="text-primary font-bold">A Lavoro é onde ele acontece em Minas</span>: simulação honesta,
              conta na mesa e a entrega na nossa casa, em Contagem.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 3. A POUPANÇA DA DEPRECIAÇÃO (narrativa frotista) ═══ */}
      <section className="py-16 bg-secondary">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider mb-3">
                <TrendingDown className="w-4 h-4" />
                Pra quem já tem frota
              </div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">
                Sua contabilidade já lança a depreciação.
                <span className="block text-primary mt-2">Você guarda esse dinheiro?</span>
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Todo caminhão perde valor todo mês — é fato contábil: sua empresa{" "}
                <b className="text-foreground">lança a depreciação no balanço e deduz no imposto de renda</b>. Mas o
                dinheiro que o caminhão perde, ninguém guarda.
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                <b className="text-foreground">A parcela do consórcio é a poupança da depreciação:</b> quando o veículo
                completa o ciclo, a cota está madura pra trocar por um zero — sem juros, sem descapitalizar, sem
                depender de banco. A frota se renova sozinha.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="font-bold text-lg uppercase mb-4">A conta do frotista</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Caminhão novo hoje</span>
                  <span className="font-bold">perde valor já no 1º mês</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Depreciação no balanço</span>
                  <span className="font-bold">deduzida no IR ✓</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">O dinheiro da depreciação</span>
                  <span className="font-bold text-destructive">ninguém guarda ✗</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-muted-foreground">Com a cota do consórcio</span>
                  <span className="font-bold text-primary">vira o próximo caminhão ✓</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-5">
                E a renovação tem plano próprio: o <b>Renovação 50%</b>, com metade da parcela — feito pra quem já tem
                caminhão rodando.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. COMO FUNCIONA ═══ */}
      <section className="py-16">
        <div className="container-lavoro">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Como funciona <span className="text-primary">(sem mistério)</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Calculator, t: "1 · Monta a proposta", d: "Aqui embaixo, em 30 segundos: objetivo, crédito e prazo. A parcela aparece na hora, sem cadastro." },
              { icon: CalendarCheck, t: "2 · Entra no grupo", d: "Adesão sem entrada no grupo 8.400 (3.000 participantes). Sua parcela começa a construir o seu caminhão." },
              { icon: Ticket, t: "3 · Assembleia mensal", d: "Todo mês: contemplação por sorteio + lances livre, fixo e limitado. O lance embutido usa até 50% do próprio crédito." },
              { icon: Key, t: "4 · O dia da chave", d: "Contemplou, o crédito vira o seu Foton — zero km, escolhido aqui na Lavoro, com entrega técnica e pós-venda da casa." },
            ].map((p) => (
              <div key={p.t} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all">
                <p.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{p.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. O PREENCHEDOR — PROPOSTA PRONTA ═══ */}
      <section id="proposta" className="py-16 bg-gradient-to-br from-industrial-dark via-industrial-dark to-primary/20 text-primary-foreground">
        <div className="container-lavoro">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold uppercase">
              Monte sua proposta <span className="text-cyan-400">agora</span>
            </h2>
            <p className="text-white/60 mt-3 max-w-2xl mx-auto">
              Três escolhas e a proposta sai pronta — com os valores reais do grupo 8.400.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-3 space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-3">1 · Qual é o seu momento?</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button type="button" onClick={() => setObjetivo("linear")} className={selectBtn(objetivo === "linear")}>
                    <span className="block text-foreground font-bold">Montar o primeiro caminhão</span>
                    <span className="block text-xs mt-1 opacity-80">Plano Linear — crédito cheio</span>
                  </button>
                  <button type="button" onClick={() => setObjetivo("renovacao")} className={selectBtn(objetivo === "renovacao")}>
                    <span className="block text-foreground font-bold">Já tenho e vou trocar / renovar frota</span>
                    <span className="block text-xs mt-1 opacity-80">Plano Renovação 50% — metade da parcela</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-3">2 · Quanto de crédito?</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {CREDITOS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCredito(c)}
                      className={`rounded-lg border-2 px-2 py-2.5 text-sm font-bold transition-all ${
                        credito === c
                          ? "border-cyan-400 bg-cyan-400 text-slate-900"
                          : "border-white/20 bg-white/5 text-white/80 hover:border-cyan-400/50"
                      }`}
                    >
                      {c / 1000}k
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-3">3 · Em quantos meses?</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRAZOS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPrazo(p)}
                      className={`rounded-lg border-2 px-2 py-2.5 text-sm font-bold transition-all ${
                        prazo === p
                          ? "border-cyan-400 bg-cyan-400 text-slate-900"
                          : "border-white/20 bg-white/5 text-white/80 hover:border-cyan-400/50"
                      }`}
                    >
                      {p}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-2">
                  Seu nome <span className="text-white/40 normal-case font-normal">(opcional — sai na proposta)</span>
                </p>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  maxLength={60}
                  className="w-full rounded-lg border-2 border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Proposta pronta */}
            <div className="lg:col-span-2">
              <div className="bg-card text-foreground rounded-2xl overflow-hidden shadow-2xl lg:sticky lg:top-24">
                <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-wide">Sua proposta</span>
                </div>
                <div className="p-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plano</span>
                    <span className="font-bold text-right">{objetivo === "linear" ? "Linear (crédito cheio)" : "Renovação 50%"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crédito</span>
                    <span className="font-bold">{brlK(credito)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prazo</span>
                    <span className="font-bold">{prazo} meses</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-border pt-3">
                    <span className="text-muted-foreground">Parcela de referência</span>
                    <span className="font-black text-2xl text-primary">{brl(parcela)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed pt-1">
                    Grupo 8.400 · contemplação por sorteio ou lance todo mês · lance embutido de até 50% do crédito ·
                    taxa de administração de 11% a 20% conforme o prazo + seguro 0,043% a.m. · valores reajustam pelo
                    IPCA — <b>a simulação vigente na adesão prevalece</b>.
                  </div>
                  <a
                    href={whatsappProposta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-6 py-4 rounded-xl transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Enviar proposta no WhatsApp
                  </a>
                  <p className="text-[11px] text-center text-muted-foreground">
                    A proposta vai pronta na conversa — o time confirma o valor do mês e fecha com você.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6. ALUGUEL NÃO VIRA PATRIMÔNIO ═══ */}
      <section className="py-16">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">
                Aluguel não vira <span className="text-primary">patrimônio.</span>
                <span className="block mt-2">Parcela vira.</span>
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Todo mês você paga o caminhão… do dono do caminhão. Aluguel, agregado, frete de terceiro — no fim do
                ano, o que ficou <b className="text-foreground">seu</b>? Agora pega um valor parecido e põe num plano
                onde cada parcela é um pedaço do <b className="text-foreground">teu</b> Foton.
              </p>
              <p className="mt-4 font-semibold">
                A conta a gente faz juntos, com o seu número real.{" "}
                <a href={whatsappSimples} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                  Traz a tua planilha.
                </a>
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg uppercase">Começando agora?</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O primeiro VUC pode vir pelo plano Linear — e o <b className="text-foreground">Aumark S315 se dirige com
                CNH B</b>, sem precisar tirar habilitação de caminhão. Parcela desde{" "}
                <b className="text-foreground">{brl(PARCELAS.linear[240000][126])}</b> (crédito de R$ 240 mil em 126
                meses, tabela de referência).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. HONESTIDADE RADICAL ═══ */}
      <section className="py-16 bg-secondary">
        <div className="container-lavoro max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Honestidade radical: <span className="text-primary">é pra você?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-lg uppercase">Consórcio serve</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>· Pra quem não tem entrada — aqui não precisa.</li>
                <li>· Pra quem o banco negou — aqui quem aprova é você.</li>
                <li>· Pra quem roda de alugado e quer trocar aluguel por patrimônio.</li>
                <li>· Pro frotista que quer guardar a depreciação e renovar sem juros.</li>
                <li>· Pra quem planeja o primeiro VUC — o Aumark S315 se dirige com CNH B.</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-destructive" />
                <h3 className="font-bold text-lg uppercase">Consórcio NÃO serve</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>· Pra quem precisa do caminhão rodando amanhã — aí é financiamento (a gente também resolve, em até 24h).</li>
                <li>· Pra quem acredita em “contemplação garantida” — isso é golpe, e quem te promete data tá te enganando.</li>
                <li>· Pra quem não quer saber de taxa de administração — ela existe, está no contrato e a gente mostra antes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8. FAQ ═══ */}
      <section className="py-16">
        <div className="container-lavoro max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Perguntas de verdade, <span className="text-primary">respostas de verdade</span>
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-2xl p-6 open:border-primary/50 open:shadow-lg transition-all">
                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. CTA FINAL ═══ */}
      <section className="py-20 bg-gradient-to-br from-industrial-dark via-industrial-dark to-primary/20 text-primary-foreground">
        <div className="container-lavoro text-center">
          <div className="flex justify-center mb-8">
            <SeloConsorcioFoton dark />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
            Todo caminhão começa por uma parte.
            <span className="block text-cyan-400 mt-2">Vem começar a sua.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="#proposta"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded hover:bg-primary-dark transition-all shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              Montar minha proposta
            </a>
            <a
              href={whatsappSimples}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg font-bold px-8 py-4 rounded transition-all shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              (31) 99796-6042
            </a>
          </div>
          <p className="text-white/60 mt-6 text-sm">Um bom negócio na Lavoro. · BR-040, Contagem/MG</p>
        </div>
      </section>

      {/* ═══ LINHA LEGAL BACEN ═══ */}
      <section className="py-8 bg-background border-t border-border">
        <div className="container-lavoro max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">{LINHA_LEGAL}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consorcio;
