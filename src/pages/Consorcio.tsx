import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  MessageSquare,
  CalendarCheck,
  Ticket,
  Key,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Truck,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5531997966042?text=" +
  encodeURIComponent("Quero simular o Consórcio Foton");

const LINHA_LEGAL =
  "Consórcio Foton administrado por Canopus Administradora de Consórcios S.A., CNPJ 68.318.773/0001-54, autorizada e fiscalizada pelo Banco Central do Brasil — Lei 11.795/08. Consórcio não tem juros; incidem taxa de administração (de 11% a 20% conforme o prazo), seguro de 0,043% a.m. e demais encargos previstos no regulamento do grupo. Contemplação exclusivamente por sorteio ou lance, sem garantia de data. Não comercializamos cotas contempladas. Valores de referência da tabela Canopus do grupo 8.400 (emissão 28/02/2026), com crédito e parcelas reajustados pelo IPCA/IBGE — a simulação vigente na data da adesão prevalece. Imagens ilustrativas.";

// Tabela de referência Canopus — grupo 8.400 (emissão 28/02/2026, reajuste IPCA)
const PLANO_LINEAR = [
  { credito: "R$ 240 mil", m126: "R$ 2.409,60", m96: "R$ 3.045,86", m66: "R$ 4.300,44", m36: "R$ 7.649,98" },
  { credito: "R$ 300 mil", m126: "R$ 3.012,00", m96: "R$ 3.807,33", m66: "R$ 5.375,55", m36: "R$ 9.562,47" },
  { credito: "R$ 360 mil", m126: "R$ 3.614,40", m96: "R$ 4.568,80", m66: "R$ 6.450,66", m36: "R$ 11.474,96" },
  { credito: "R$ 420 mil", m126: "R$ 4.216,80", m96: "R$ 5.330,26", m66: "R$ 7.525,77", m36: "R$ 13.387,46" },
  { credito: "R$ 480 mil", m126: "R$ 4.819,20", m96: "R$ 6.091,73", m66: "R$ 8.600,88", m36: "R$ 15.299,95" },
];

const PLANO_RENOVACAO = [
  { credito: "R$ 240 mil", m126: "R$ 1.457,04", m96: "R$ 1.795,70", m66: "R$ 2.482,44", m36: "R$ 4.316,62" },
  { credito: "R$ 300 mil", m126: "R$ 1.821,30", m96: "R$ 2.244,63", m66: "R$ 3.103,05", m36: "R$ 5.395,77" },
  { credito: "R$ 360 mil", m126: "R$ 2.185,56", m96: "R$ 2.693,56", m66: "R$ 3.723,66", m36: "R$ 6.474,92" },
  { credito: "R$ 420 mil", m126: "R$ 2.549,82", m96: "R$ 3.142,48", m66: "R$ 4.344,27", m36: "R$ 7.554,08" },
  { credito: "R$ 480 mil", m126: "R$ 2.914,08", m96: "R$ 3.591,41", m66: "R$ 4.964,88", m36: "R$ 8.633,23" },
];

const FAQ = [
  {
    q: "Consórcio é furada?",
    a: "Depende de quem te vende. Se alguém te prometeu contemplação com data marcada, é furada — e é golpe. A lei 11.795/08 é clara: contemplação é por sorteio ou lance, todo mês, em assembleia. Aqui a conversa é essa, preto no branco.",
  },
  {
    q: "“Sem juros” quer dizer de graça?",
    a: "Não. Consórcio não tem juros, mas tem taxa de administração — no grupo 8.400 ela vai de 11% (planos curtos) a 20% (126 meses), mais seguro de 0,043% a.m. Está no contrato e a gente te mostra antes de qualquer assinatura. Quem esconde isso de você não merece a sua assinatura.",
  },
  {
    q: "Quando eu recebo o caminhão?",
    a: "Quando for contemplado: todo mês tem assembleia com sorteio, e você pode acelerar ofertando lance (livre, fixo ou limitado). Existe ainda o lance embutido, que usa até 50% do próprio crédito — você dá o lance sem tirar dinheiro do bolso.",
  },
  {
    q: "Pra quem o consórcio faz sentido?",
    a: "Pra quem não tem entrada, pra quem o banco negou, pra quem quer trocar aluguel de caminhão por patrimônio e pro frotista disciplinado que renova frota sem pagar juros. Pra quem precisa do caminhão rodando amanhã, o caminho é outro — financiamento — e a gente também resolve.",
  },
  {
    q: "Quem administra o dinheiro?",
    a: "A Canopus Administradora de Consórcios S.A. (CNPJ 68.318.773/0001-54), autorizada e fiscalizada pelo Banco Central — administradora oficial do Consórcio Foton em todo o Brasil. A Lavoro é o canal oficial de venda e simulação em Minas Gerais. Você paga a administradora, não a loja.",
  },
];

const Consorcio = () => {
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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Contagem",
          addressRegion: "MG",
          addressCountry: "BR",
        },
      },
      areaServed: "Minas Gerais",
      description:
        "Consórcio Foton administrado por Canopus (autorizada BACEN): créditos de R$ 240 mil a R$ 480 mil, prazos de 36 a 126 meses, sem juros e sem entrada. Simulação pelo WhatsApp com a Lavoro Foton.",
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

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Consórcio Foton — Sem juros, sem entrada | Lavoro Foton"
        description="Todo caminhão começa por uma parte. Consórcio Foton administrado por Canopus (autorizada BACEN): créditos de R$ 240 a 480 mil, prazos de 36 a 126 meses, contemplação por sorteio ou lance todo mês. Simule no WhatsApp."
        path="/consorcio"
        ogImage="https://www.lavorofoton.com.br/og-consorcio.jpg"
        jsonLd={jsonLd}
      />

      <Navbar />

      {/* Hero — a frase-mãe da campanha */}
      <section className="mt-16 pt-24 pb-16 bg-gradient-to-br from-industrial-dark via-industrial-dark to-primary/20 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 border border-primary rounded-full" />
          <div className="absolute bottom-10 right-20 w-96 h-96 border border-primary rounded-full" />
        </div>
        <div className="container-lavoro relative z-10 text-center">
          <span className="inline-block bg-cyan-400 text-slate-900 font-bold text-xs tracking-widest uppercase px-4 py-1 rounded-full mb-6">
            Consórcio Foton · administrado por Canopus · autorizada BACEN
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight uppercase">
            Todo caminhão começa
            <span className="block text-cyan-400 mt-2">por uma parte.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ainda não dá pro Foton inteiro? Começa pela parte: sem juros, sem
            entrada, sem banco te dizendo não.{" "}
            <span className="text-primary-foreground font-semibold">
              Cada parcela é um pedaço seu.
            </span>
          </p>

          {/* Régua de meses — o caminhão que se completa */}
          <div className="max-w-2xl mx-auto mt-10 mb-8">
            <div className="flex items-center gap-1">
              {["MÊS 1", "MÊS 7", "MÊS 15", "MÊS 26", "MÊS 38", "🔑"].map(
                (m, i) => (
                  <div key={m} className="flex-1">
                    <div
                      className={`h-2 rounded-full ${
                        i < 3 ? "bg-cyan-400" : "bg-white/15"
                      }`}
                    />
                    <div
                      className={`mt-2 text-[10px] md:text-xs font-semibold tracking-wider ${
                        i < 3 ? "text-cyan-400" : "text-white/40"
                      }`}
                    >
                      {m}
                    </div>
                  </div>
                )
              )}
            </div>
            <p className="text-xs text-white/50 mt-3">
              Mês a mês o caminhão vai ficando inteiro — e todo mês tem sorteio
              e lance pra chave chegar antes.
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded hover:bg-primary-dark transition-all shadow-lg"
          >
            <MessageSquare className="w-5 h-5" />
            Simular no WhatsApp
          </a>
          <p className="text-sm text-white/50 mt-4">
            (31) 99796-6042 — a conversa já chega pronta: “Quero simular o
            Consórcio Foton”.
          </p>
        </div>
      </section>

      {/* O momento — programa nacional */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 md:p-10 rounded-2xl border-l-4 border-primary">
            <p className="text-lg md:text-xl leading-relaxed font-medium">
              O Consórcio Foton é o{" "}
              <span className="text-primary font-bold">
                programa nacional oficial da marca
              </span>
              , administrado pela Canopus — administradora com mais de 20 anos,
              fiscalizada pelo Banco Central, com{" "}
              <span className="font-bold">
                assembleias e contemplações todo mês
              </span>{" "}
              em grupos por todo o Brasil.{" "}
              <span className="text-primary font-bold">
                A Lavoro é onde ele acontece em Minas
              </span>
              : simulação honesta, conta na mesa e a entrega na nossa casa, em
              Contagem.
            </p>
          </div>
        </div>
      </section>

      {/* Como funciona — 4 passos */}
      <section className="py-16">
        <div className="container-lavoro">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Como funciona <span className="text-primary">(sem mistério)</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: MessageSquare,
                t: "1 · Simula",
                d: "Você chama no WhatsApp, a gente monta o plano no seu número: crédito, prazo e parcela que cabe no seu mês.",
              },
              {
                icon: CalendarCheck,
                t: "2 · Entra no grupo",
                d: "Adesão sem entrada no grupo 8.400 (3.000 participantes). Sua parcela começa a construir o seu caminhão.",
              },
              {
                icon: Ticket,
                t: "3 · Assembleia mensal",
                d: "Todo mês: 1 contemplação por sorteio + lances livre, fixo e limitado. O lance embutido usa até 50% do próprio crédito.",
              },
              {
                icon: Key,
                t: "4 · O dia da chave",
                d: "Contemplou, o crédito vira o seu Foton — zero km, escolhido aqui na Lavoro, com entrega técnica e pós-venda da casa.",
              },
            ].map((p) => (
              <div
                key={p.t}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <p.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{p.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A conta — aluguel não vira patrimônio */}
      <section className="py-16 bg-secondary">
        <div className="container-lavoro">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight">
                Aluguel não vira{" "}
                <span className="text-primary">patrimônio.</span>
                <span className="block mt-2">Parcela vira.</span>
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Todo mês você paga o caminhão… do dono do caminhão. Aluguel,
                agregado, frete de terceiro — no fim do ano, o que ficou{" "}
                <b className="text-foreground">seu</b>? Agora pega um valor
                parecido e põe num plano onde cada parcela é um pedaço do{" "}
                <b className="text-foreground">teu</b> Foton.
              </p>
              <p className="mt-4 font-semibold">
                A conta a gente faz juntos, com o seu número real.{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  Traz a tua planilha.
                </a>
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg uppercase">
                  Plano Renovação 50%
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Já tem caminhão e vai trocar? A parcela reduzida do Plano
                Renovação cabe no lugar do aluguel — a partir de{" "}
                <b className="text-foreground">R$ 1.457,04/mês</b> (crédito de
                R$ 240 mil em 126 meses, tabela de referência abaixo). Metade da
                parcela, o mesmo destino: patrimônio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Planos reais — grupo 8.400 */}
      <section className="py-16">
        <div className="container-lavoro">
          <h2 className="text-3xl md:text-4xl font-bold text-center uppercase">
            Planos do grupo <span className="text-primary">8.400</span>
          </h2>
          <p className="text-center text-muted-foreground mt-3 mb-10 max-w-2xl mx-auto text-sm">
            Valores de referência da tabela Canopus (emissão 28/02/2026).
            Crédito e parcelas reajustam pelo IPCA —{" "}
            <b>a simulação do mês vale mais que a tabela</b>: confirme no
            WhatsApp antes de fechar.
          </p>

          {[
            {
              titulo: "Plano Linear — crédito cheio",
              sub: "pra quem vai montar o primeiro caminhão",
              rows: PLANO_LINEAR,
            },
            {
              titulo: "Plano Renovação 50% — parcela reduzida",
              sub: "pra quem já tem caminhão e vai trocar",
              rows: PLANO_RENOVACAO,
            },
          ].map((plano) => (
            <div key={plano.titulo} className="max-w-4xl mx-auto mb-10">
              <div className="bg-industrial-dark text-primary-foreground rounded-t-2xl px-6 py-4 flex flex-wrap justify-between items-center gap-2">
                <h3 className="font-bold uppercase">{plano.titulo}</h3>
                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  {plano.sub}
                </span>
              </div>
              <div className="overflow-x-auto border border-border rounded-b-2xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary text-left">
                      <th className="px-4 py-3 font-bold">Crédito</th>
                      <th className="px-4 py-3 font-bold text-right">126 meses</th>
                      <th className="px-4 py-3 font-bold text-right">96 meses</th>
                      <th className="px-4 py-3 font-bold text-right">66 meses</th>
                      <th className="px-4 py-3 font-bold text-right">36 meses</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plano.rows.map((r) => (
                      <tr key={r.credito} className="border-t border-border">
                        <td className="px-4 py-3 font-bold text-primary">
                          {r.credito}
                        </td>
                        <td className="px-4 py-3 text-right">{r.m126}</td>
                        <td className="px-4 py-3 text-right">{r.m96}</td>
                        <td className="px-4 py-3 text-right">{r.m66}</td>
                        <td className="px-4 py-3 text-right">{r.m36}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded hover:bg-primary-dark transition-all shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Montar meu plano no WhatsApp
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              Simulação gratuita · resposta no horário comercial · dono a dono
            </p>
          </div>
        </div>
      </section>

      {/* Pra quem é / não é */}
      <section className="py-16 bg-secondary">
        <div className="container-lavoro max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Honestidade radical:{" "}
            <span className="text-primary">é pra você?</span>
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
                <li>
                  · Pra quem roda de alugado e quer trocar aluguel por
                  patrimônio.
                </li>
                <li>
                  · Pro frotista disciplinado que renova frota sem pagar juros.
                </li>
                <li>
                  · Pra quem planeja o primeiro VUC — o Aumark S315 se dirige
                  com CNH B.
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-destructive" />
                <h3 className="font-bold text-lg uppercase">
                  Consórcio NÃO serve
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  · Pra quem precisa do caminhão rodando amanhã — aí é
                  financiamento (a gente também resolve, em até 24h).
                </li>
                <li>
                  · Pra quem acredita em “contemplação garantida” — isso é
                  golpe, e quem te promete data tá te enganando.
                </li>
                <li>
                  · Pra quem não quer saber de taxa de administração — ela
                  existe, está no contrato e a gente mostra antes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ sincero */}
      <section className="py-16">
        <div className="container-lavoro max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Perguntas de verdade,{" "}
            <span className="text-primary">respostas de verdade</span>
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group bg-card border border-border rounded-2xl p-6 open:border-primary/50 open:shadow-lg transition-all"
              >
                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-br from-industrial-dark via-industrial-dark to-primary/20 text-primary-foreground">
        <div className="container-lavoro text-center">
          <Truck className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight">
            Todo caminhão começa por uma parte.
            <span className="block text-cyan-400 mt-2">
              Vem começar a sua.
            </span>
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded hover:bg-primary-dark transition-all shadow-lg mt-8"
          >
            <MessageSquare className="w-5 h-5" />
            (31) 99796-6042 — Simular agora
          </a>
          <p className="text-white/60 mt-6 text-sm">
            Um bom negócio na Lavoro. · BR-040, Contagem/MG
          </p>
        </div>
      </section>

      {/* Linha legal BACEN */}
      <section className="py-8 bg-background border-t border-border">
        <div className="container-lavoro max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {LINHA_LEGAL}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consorcio;
