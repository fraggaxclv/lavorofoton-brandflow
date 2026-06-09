import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Printer, Truck, Battery, Leaf, TrendingDown, Gauge, Award, Globe, Factory, Building2, Users, MapPin, Cog, Zap, FileText, Calendar, Check } from "lucide-react";

// ============================================================================
// LOCALIZA × FOTON — INSTITUTIONAL DECK (17 slides)
// Apple Keynote + Daimler IR + BMW M aesthetic
// ============================================================================

const COLORS = {
  navy: "#0B1F3A",
  gold: "#C9A961",
  snow: "#F8F9FA",
  graphite: "#3A3F4B",
  red: "#C8102E",
  border: "#E5E7EB",
  muted: "#6B7280",
};

// Signature mark: three thin gold lines converging
const ConvergeMark = ({ size = 120, opacity = 1, labeled = false }: { size?: number; opacity?: number; labeled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" style={{ opacity }}>
    <line x1="10" y1="40" x2="100" y2="100" stroke={COLORS.gold} strokeWidth={labeled ? 2.5 : 1.2} />
    <line x1="10" y1="160" x2="100" y2="100" stroke={COLORS.gold} strokeWidth={labeled ? 2.5 : 1.2} />
    <line x1="190" y1="100" x2="100" y2="100" stroke={COLORS.gold} strokeWidth={labeled ? 2.5 : 1.2} />
    <circle cx="100" cy="100" r={labeled ? 6 : 3} fill={COLORS.gold} />
    {labeled && (
      <>
        <text x="6" y="32" fill={COLORS.gold} fontSize="10" fontWeight="600" letterSpacing="2">DAIMLER</text>
        <text x="6" y="178" fill={COLORS.gold} fontSize="10" fontWeight="600" letterSpacing="2">CUMMINS</text>
        <text x="160" y="92" fill={COLORS.gold} fontSize="10" fontWeight="600" letterSpacing="2" textAnchor="end">ZF</text>
      </>
    )}
  </svg>
);

// ----- Slide chrome wrapper -----
const SlideShell = ({
  index,
  total,
  dark = false,
  children,
  noChrome = false,
}: {
  index: number;
  total: number;
  dark?: boolean;
  children: React.ReactNode;
  noChrome?: boolean;
}) => (
  <div
    className="w-full h-full relative overflow-hidden"
    style={{
      background: dark ? COLORS.navy : COLORS.snow,
      color: dark ? "#fff" : COLORS.navy,
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    }}
  >
    {!noChrome && (
      <>
        {/* progress bar top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: dark ? "rgba(255,255,255,0.1)" : COLORS.border }}>
          <div className="h-full transition-all" style={{ width: `${(index / total) * 100}%`, background: COLORS.gold }} />
        </div>
        {/* page number */}
        <div className="absolute top-6 right-10 text-[11px] tracking-[0.2em] font-medium" style={{ color: dark ? "rgba(255,255,255,0.55)" : COLORS.muted }}>
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        {/* footer left */}
        <div className="absolute bottom-6 left-10 text-[11px] tracking-[0.25em] font-semibold" style={{ color: dark ? "rgba(255,255,255,0.6)" : COLORS.graphite }}>
          FOTON <span style={{ color: COLORS.gold }}>×</span> LAVORO
        </div>
        {/* footer right mark */}
        <div className="absolute bottom-4 right-8 opacity-60">
          <ConvergeMark size={36} />
        </div>
      </>
    )}
    <div className="w-full h-full px-12 md:px-24 py-16 md:py-20 flex flex-col">{children}</div>
  </div>
);

const Kicker = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: dark ? COLORS.gold : COLORS.gold }}>
    {children}
  </div>
);

const H1 = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <h1 className="font-bold leading-[1.05] tracking-[-0.02em] text-[2.4rem] md:text-[3.2rem]" style={{ color: dark ? "#fff" : COLORS.navy }}>
    {children}
  </h1>
);

const Sub = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className="mt-3 text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: dark ? "rgba(255,255,255,0.7)" : COLORS.graphite }}>
    {children}
  </p>
);

// ============================================================================
// SLIDES
// ============================================================================

const Slide1 = () => (
  <SlideShell index={1} total={17} dark noChrome>
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <ConvergeMark size={720} />
    </div>
    <div className="absolute top-10 left-10 text-sm tracking-[0.35em] font-semibold text-white">
      FOTON <span style={{ color: COLORS.gold }}>×</span> LAVORO
    </div>
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.1)" }}>
      <div className="h-full" style={{ width: "5.88%", background: COLORS.gold }} />
    </div>
    <div className="relative z-10 mt-auto mb-auto">
      <div className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: COLORS.gold }}>Apresentação Institucional</div>
      <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-[-0.025em] leading-[0.95] text-white">Programa Institucional</h1>
      <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight" style={{ color: COLORS.gold }}>Foton × Localiza Caminhões</h2>
      <p className="mt-6 text-lg md:text-xl max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
        Go-to-Market para Frota Corporativa — MG · Sudeste · Centro-Oeste
      </p>
    </div>
    <div className="relative z-10 text-[11px] tracking-[0.25em] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
      VERSÃO 1.0 · JUNHO 2026 · CONFIDENCIAL
    </div>
  </SlideShell>
);

const Slide2 = () => {
  const vectors = [
    { icon: Leaf, title: "Eletrificação ESG-driven", text: "Grandes operadores brasileiros começaram a vincular metas de carbono à composição de frota terceirizada. Em 2026, ESG report da Localiza terá métrica obrigatória de zero-emission share." },
    { icon: TrendingDown, title: "Custo de capital pressionando ROIC", text: "Selic em patamar elevado torna o seminovo o gargalo da rentabilidade. Qualquer fornecedor que não tenha valor residual sustentável fica fora." },
    { icon: Gauge, title: "CONAMA P8 e redução de IPI", text: "Nova norma de emissões fechou a janela de algumas plataformas legadas. Reforma tributária reduziu IPI sobre veículos comerciais — o jogo de preço público mudou." },
  ];
  return (
    <SlideShell index={2} total={17}>
      <Kicker>Contexto de mercado</Kicker>
      <H1>O mercado de frota corporativa em 2026 não é o mesmo de 2022.</H1>
      <Sub>Três vetores estão reestruturando a base de demanda.</Sub>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
        {vectors.map((v, i) => (
          <div key={i} className="flex flex-col">
            <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ color: COLORS.gold }}>
              <v.icon size={28} strokeWidth={1.5} />
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3" style={{ color: COLORS.muted }}>0{i + 1}</div>
            <div className="text-lg font-bold leading-snug mb-3 uppercase tracking-tight" style={{ color: COLORS.navy }}>{v.title}</div>
            <div className="w-12 h-px mb-4" style={{ background: COLORS.gold }} />
            <p className="text-sm leading-relaxed" style={{ color: COLORS.graphite }}>{v.text}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const Slide3 = () => (
  <SlideShell index={3} total={17}>
    <Kicker>A bifurcação da demanda</Kicker>
    <H1>Por que isso muda o tipo de fornecedor que a Localiza precisa.</H1>
    <Sub>A demanda do cliente corporativo Localiza está bifurcando.</Sub>
    <div className="mt-10 flex-1 flex flex-col">
      <div className="self-center px-6 py-3 border" style={{ borderColor: COLORS.navy, color: COLORS.navy }}>
        <div className="text-[11px] uppercase tracking-[0.2em] font-semibold">Frota Corporativa Localiza</div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-10 mt-10 relative">
        <svg className="absolute inset-x-0 -top-6 mx-auto" width="60%" height="40" style={{ left: "20%" }}>
          <line x1="50%" y1="0" x2="15%" y2="40" stroke={COLORS.gold} strokeWidth="1" />
          <line x1="50%" y1="0" x2="85%" y2="40" stroke={COLORS.gold} strokeWidth="1" />
        </svg>
        <div className="border-t-2 pt-6" style={{ borderColor: COLORS.gold }}>
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: COLORS.muted }}>Caminho A</div>
          <div className="text-xl font-bold uppercase tracking-tight mb-4" style={{ color: COLORS.navy }}>Frota como ferramenta de produção</div>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.graphite }}>
            Cliente que usa o veículo como insumo direto: distribuição, prestação de serviço, logística terceirizada.
          </p>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.navy }}>Exigência</div>
          <p className="text-sm" style={{ color: COLORS.graphite }}>TCO baixo, capacidade de carga, disponibilidade.</p>
        </div>
        <div className="border-t-2 pt-6" style={{ borderColor: COLORS.gold }}>
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: COLORS.muted }}>Caminho B</div>
          <div className="text-xl font-bold uppercase tracking-tight mb-4" style={{ color: COLORS.navy }}>Frota como ferramenta de negócio</div>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.graphite }}>
            Cliente que usa o veículo como benefício, força de venda, supervisão de campo.
          </p>
          <div className="mt-4 text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.navy }}>Exigência</div>
          <p className="text-sm" style={{ color: COLORS.graphite }}>Imagem, conforto, ESG-ready, custo previsível.</p>
        </div>
      </div>
      <div className="mt-8 p-6 border-l-2" style={{ borderColor: COLORS.gold, background: "#fff" }}>
        <p className="text-base md:text-lg font-medium leading-snug" style={{ color: COLORS.navy }}>
          O fornecedor tradicional só atende uma das duas pontas. <span style={{ color: COLORS.gold }}>A Foton atende as duas</span> — porque tem o portfólio mais amplo do mercado brasileiro.
        </p>
      </div>
    </div>
  </SlideShell>
);

const Slide4 = () => (
  <SlideShell index={4} total={17} dark>
    <div className="absolute inset-0 flex items-center justify-center">
      <ConvergeMark size={620} labeled opacity={0.85} />
    </div>
    <div className="relative z-10 m-auto text-center max-w-4xl">
      <div className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-8" style={{ color: COLORS.gold }}>A Tese</div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-white">
        Foton não é uma marca chinesa.
      </h1>
      <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight" style={{ color: COLORS.gold }}>
        Foton é uma plataforma de engenharias globais.
      </h2>
      <p className="mt-10 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
        Esse não é um pitch comparativo. É uma redefinição de categoria.
      </p>
    </div>
  </SlideShell>
);

const Slide5 = () => {
  const kpis = [
    { n: "11M+", l: "Veículos cumulativos vendidos até 2025" },
    { n: "110", l: "Países com presença comercial" },
    { n: "5", l: "Bases de produção: China, Índia, Rússia, Brasil, Tailândia" },
    { n: "US$ 16,6B", l: "Brand value Foton (avaliação 2024)" },
  ];
  return (
    <SlideShell index={5} total={17}>
      <Kicker>Escala Foton</Kicker>
      <H1>Maior fabricante de veículos comerciais do mundo desde 2009.</H1>
      <Sub>Posição reconhecida há 17 anos consecutivos.</Sub>
      <div className="mt-12 grid grid-cols-2 gap-10 flex-1">
        {kpis.map((k, i) => (
          <div key={i} className="flex flex-col justify-center border-t pt-6" style={{ borderColor: COLORS.border }}>
            <div className="text-6xl md:text-7xl font-black tracking-tight leading-none" style={{ color: COLORS.gold }}>{k.n}</div>
            <div className="mt-4 text-sm md:text-base font-medium" style={{ color: COLORS.graphite }}>{k.l}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] mt-8" style={{ color: COLORS.muted }}>
        Fonte: Foton Motor Group Annual Report 2024 · Brand Finance Global Commercial Vehicles 2024
      </div>
    </SlideShell>
  );
};

const Slide6 = () => {
  const jvs = [
    { partner: "DAIMLER", jv: "Beijing Foton Daimler Automotive (BFDA)", year: "Desde 2012 · Participação 50/50", text: "A planta brasileira em Caxias do Sul produz o Auman D em parceria direta com a engenharia Mercedes-Benz.", fact: "BAIC, holding mãe da Foton, é acionista de 9,98% da Daimler AG." },
    { partner: "CUMMINS", jv: "Beijing Foton Cummins Engine (BFCEC)", year: "Desde 2008 · Participação 50/50", text: "308 mil motores produzidos por ano — uma das maiores plantas de motores Cummins do mundo.", fact: "Todos os Aumark e Auman vendidos no Brasil rodam com Cummins de fábrica." },
    { partner: "ZF", jv: "Foton ZF", year: "Desde 2017", text: "Transmissões alemãs ZF produzidas em escala industrial para a linha Foton.", fact: "Aumark S1217 vem com transmissão ZF 6S558 — mesma família dos pesados europeus." },
  ];
  return (
    <SlideShell index={6} total={17}>
      <Kicker>As três joint ventures</Kicker>
      <H1>As três joint ventures que destravam a engenharia.</H1>
      <Sub>Foton não compra tecnologia. Foton co-produz com Daimler, Cummins e ZF.</Sub>
      <div className="mt-10 grid grid-cols-3 gap-6 flex-1">
        {jvs.map((j, i) => (
          <div key={i} className="border-t-2 pt-5 flex flex-col" style={{ borderColor: COLORS.gold }}>
            <div className="text-2xl font-black tracking-tight mb-2" style={{ color: COLORS.navy }}>{j.partner}</div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: COLORS.graphite }}>{j.jv}</div>
            <div className="text-[11px] mb-4" style={{ color: COLORS.muted }}>{j.year}</div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: COLORS.graphite }}>{j.text}</p>
            <div className="mt-auto border-l-2 pl-3 py-1" style={{ borderColor: COLORS.gold }}>
              <p className="text-xs leading-snug font-medium" style={{ color: COLORS.navy }}>{j.fact}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const Slide7 = () => {
  const rows = [
    ["Tunland", "Picape combustão", "3,5T", "B", "Cummins diesel", "Frota corporativa, supervisão"],
    ["Wonder Combustão", "Picape gasolina", "3,5T", "B", "Gasolina", "Substituto HR Hyundai / Kia Bongo"],
    ["Aumark S315", "Caminhão leve", "3,5T", "B", "Cummins diesel", "Last-mile, prestador PJ — recordista"],
    ["Aumark 715", "Caminhão leve", "7T", "C", "Cummins F2.5", "Distribuição urbana e regional"],
    ["Aumark 916", "Caminhão leve", "9T", "C", "Cummins F3.8", "Campeão do refrigerado"],
    ["Aumark 1217", "Caminhão médio", "12T", "C", "Cummins F3.8 + ZF 6S558", "Peça-âncora — 8.326 kg de carga útil"],
    ["Auman D 1722", "Semipesado", "17T", "C/E", "Cummins ISF 3.8", "Distribuição pesada regional"],
    ["Auman D 1830", "Pesado", "18T", "C/E", "Cummins", "Logística regional pesada"],
    ["Auman D 2632", "Pesado 6x2", "26T", "E", "Cummins + ZF", "Logística multieixo"],
    ["eWonder", "Picape elétrica", "3,5T", "B", "Elétrico", "ESG-ready, R$ 1.677/mês economia"],
    ["eAumark 9T", "Caminhão elétrico", "9T", "C", "Elétrico", "Substituto Aumark 916"],
    ["eAumark 12T", "Caminhão elétrico", "12T", "C", "Elétrico", "Substituto Aumark 1217"],
    ["eToano Pro", "Van elétrica grande", "~5T", "C", "Elétrico", "Last-mile premium, e-commerce"],
    ["eView Grand", "Van elétrica média", "~3,5T", "B", "Elétrico", "Last-mile urbano denso"],
    ["eView Connect", "Van elétrica pequena", "<3T", "B", "Elétrico", "Last-mile micro"],
  ];
  return (
    <SlideShell index={7} total={17}>
      <Kicker>Portfólio completo</Kicker>
      <H1>Portfólio completo — único do mercado com cobertura CNH B até pesado 26T.</H1>
      <Sub>15 modelos. Combustão, elétricos, picapes, vans, leves, médios, pesados.</Sub>
      <div className="mt-6 flex-1 overflow-hidden">
        <table className="w-full text-[11px]">
          <thead>
            <tr style={{ color: COLORS.muted }} className="text-left uppercase tracking-wider">
              <th className="font-semibold pb-2 pr-3">Modelo</th>
              <th className="font-semibold pb-2 pr-3">Tipo</th>
              <th className="font-semibold pb-2 pr-3 text-right">PBT</th>
              <th className="font-semibold pb-2 pr-3 text-center">CNH</th>
              <th className="font-semibold pb-2 pr-3">Motor</th>
              <th className="font-semibold pb-2">Uso primário</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: COLORS.border, color: COLORS.graphite }}>
                <td className="py-1.5 pr-3 font-semibold" style={{ color: COLORS.navy }}>{r[0]}</td>
                <td className="py-1.5 pr-3">{r[1]}</td>
                <td className="py-1.5 pr-3 text-right tabular-nums">{r[2]}</td>
                <td className="py-1.5 pr-3 text-center">{r[3]}</td>
                <td className="py-1.5 pr-3">{r[4]}</td>
                <td className="py-1.5">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm font-semibold" style={{ color: COLORS.navy }}>
        Nenhum concorrente direto no Brasil oferece amplitude equivalente.
      </div>
    </SlideShell>
  );
};

const Slide8 = () => {
  const models = [
    { n: "eWonder", d: "Picape elétrica 3,5T" },
    { n: "eAumark 9T", d: "Caminhão médio elétrico" },
    { n: "eAumark 12T", d: "Caminhão médio elétrico" },
    { n: "eToano Pro", d: "Van elétrica grande" },
    { n: "eView", d: "Vans Grand & Connect" },
  ];
  return (
    <SlideShell index={8} total={17}>
      <Kicker>Linha elétrica</Kicker>
      <H1>O portfólio que a Localiza vai precisar nos próximos 24 meses.</H1>
      <Sub>Cinco produtos elétricos em operação no Brasil hoje. TCO comprovado por clientes mineiros.</Sub>
      <div className="mt-12 grid grid-cols-5 gap-4 flex-1">
        {models.map((m, i) => (
          <div key={i} className="border-t-2 pt-5 flex flex-col items-start" style={{ borderColor: COLORS.gold }}>
            <Battery size={24} strokeWidth={1.4} style={{ color: COLORS.gold }} />
            <div className="mt-4 text-lg font-bold tracking-tight" style={{ color: COLORS.navy }}>{m.n}</div>
            <div className="mt-1 text-xs" style={{ color: COLORS.muted }}>{m.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 flex items-center gap-6" style={{ background: COLORS.gold }}>
        <Zap size={32} strokeWidth={1.8} style={{ color: COLORS.navy }} />
        <p className="text-base md:text-lg font-semibold leading-snug" style={{ color: COLORS.navy }}>
          eWonder substitui Kia Bongo e Hyundai HR com <span className="font-black">R$ 1.677 de economia por mês por veículo</span>. Caso real Lavoro Foton.
        </p>
      </div>
    </SlideShell>
  );
};

const Slide9 = () => {
  const kpis = [
    { n: "100 mil+", l: "Veículos vendidos na história Lavoro" },
    { n: "40 anos", l: "Como concessionária Mercedes-Benz" },
    { n: "17", l: "Casas Mercedes-Benz operadas pela Lavoro no auge" },
    { n: "27", l: "Prêmios StarClass — recorde nacional" },
  ];
  return (
    <SlideShell index={9} total={17}>
      <Kicker>Lavoro</Kicker>
      <H1>Lavoro: 40 anos como Mercedes-Benz. 7 anos como Foton.</H1>
      <Sub>A história que sustenta o atendimento.</Sub>
      <div className="mt-10 grid grid-cols-4 gap-6">
        {kpis.map((k, i) => (
          <div key={i} className="border-t pt-4" style={{ borderColor: COLORS.border }}>
            <div className="text-4xl md:text-5xl font-black tracking-tight leading-none" style={{ color: COLORS.gold }}>{k.n}</div>
            <div className="mt-3 text-xs font-medium leading-snug" style={{ color: COLORS.graphite }}>{k.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 max-w-4xl border-l-2 pl-6" style={{ borderColor: COLORS.gold }}>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: COLORS.navy }}>
          Há 7 anos, a Lavoro tomou uma decisão estrutural: migrar de Mercedes-Benz para Foton. Não foi mudança de marca — foi visão estratégica. A mesma escola de atendimento que conquistou 27 StarClass agora opera a Foton. Esse DNA é o que a Localiza Caminhões precisa para colocar uma marca emergente com segurança em sua frota terceirizada.
        </p>
      </div>
    </SlideShell>
  );
};

const Slide10 = () => (
  <SlideShell index={10} total={17}>
    <Kicker>Dupla capilaridade</Kicker>
    <H1>Cobertura: Lavoro em MG + 90 concessionárias Foton no Brasil.</H1>
    <Sub>Atendimento próximo onde a frota Localiza opera, escala nacional onde ela cresce.</Sub>
    <div className="mt-10 grid grid-cols-2 gap-12 flex-1">
      <div className="border-t-2 pt-6" style={{ borderColor: COLORS.gold }}>
        <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: COLORS.muted }}>Lavoro em MG</div>
        <div className="flex items-start gap-4 mb-6">
          <MapPin size={28} style={{ color: COLORS.gold }} strokeWidth={1.5} />
          <div>
            <div className="text-sm font-semibold" style={{ color: COLORS.navy }}>BH / Contagem (sede)</div>
            <div className="text-sm" style={{ color: COLORS.graphite }}>8 rotas de interior em operação</div>
            <div className="text-sm" style={{ color: COLORS.graphite }}>BTS Confins 23.116 m² (entrega março/2027)</div>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.graphite }}>
          Cobertura geográfica das principais bases operacionais Localiza em MG, sem dependência de capital terceiro.
        </p>
      </div>
      <div className="border-t-2 pt-6" style={{ borderColor: COLORS.gold }}>
        <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: COLORS.muted }}>Rede Foton Brasil</div>
        <div className="text-6xl font-black tracking-tight" style={{ color: COLORS.gold }}>90</div>
        <div className="text-sm font-semibold mt-1 mb-5" style={{ color: COLORS.navy }}>concessionárias até dezembro 2026</div>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.graphite }}>
          Expansão de 66 para 91 dealers ativos em 2026. Cobertura nacional para suportar a operação Localiza em todos os estados onde ela atende.
        </p>
      </div>
    </div>
  </SlideShell>
);

const Slide11 = () => {
  const items = [
    { t: "Price list dedicada Localiza", d: "Tabela de preços contratual, válida 12 meses, com revisão semestral. Sem volatilidade de preço público para a Localiza." },
    { t: "Compromisso anti-canibalização", d: "Foton compromete-se contratualmente a não vender o mesmo modelo a clientes finais por preço inferior ao da Localiza nos canais B2B locais." },
    { t: "Entrega prioritária", d: "Localiza tem acesso prioritário a slots de produção. Pedido confirmado entrega em até 60 dias para diesel, 90 dias para elétrico." },
    { t: "Consultor dedicado Lavoro", d: "Profissional sênior Lavoro alocado exclusivamente à conta Localiza. SLA de retorno em 4 horas úteis." },
    { t: "Buy Back v2.0 estruturado", d: "Programa de recompra com piso garantido e fee zero — detalhado no próximo slide." },
  ];
  return (
    <SlideShell index={11} total={17}>
      <Kicker>Champion Package</Kicker>
      <H1>O que oferecemos para o "dia seguinte".</H1>
      <Sub>Resposta literal ao pedido do Bernardo na reunião de 26 de maio: "nos dar algo CAMPEÃO para começar, no dia seguinte a colocar Foton para nossos clientes como opção."</Sub>
      <div className="mt-8 grid grid-cols-1 gap-3 flex-1">
        {items.map((it, i) => (
          <div key={i} className="grid grid-cols-[60px_1fr] gap-6 border-t pt-3" style={{ borderColor: COLORS.border }}>
            <div className="text-2xl font-black tabular-nums" style={{ color: COLORS.gold }}>0{i + 1}</div>
            <div>
              <div className="text-sm md:text-base font-bold uppercase tracking-wide mb-1" style={{ color: COLORS.navy }}>{it.t}</div>
              <p className="text-sm leading-snug" style={{ color: COLORS.graphite }}>{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const Slide12 = () => {
  const rows = [
    ["Período", "24-36 meses fixo", "36 / 48 / 60 meses — Localiza escolhe"],
    ["Piso de recompra", "15% a.a. OU 70% FIPE — o MENOR", "65% FIPE OU tabela contratada — o MAIOR"],
    ["Fee de programa", "3%", "Zero (embutido na margem)"],
    ["Limite quilometragem", "70.000 km/ano", "100.000 km/ano"],
    ["Custo conservação", "Repassado integralmente à Localiza", "Recondicionamento até 5% por conta Foton"],
    ["Canal de escoamento", "Não definido", "Canal seminovos Foton-Lavoro dedicado"],
    ["Garantia powertrain", "Padrão 1 ano", "3 anos sem limite de km"],
    ["Laudo idoneidade", "Custo Localiza", "Custo Foton"],
  ];
  return (
    <SlideShell index={12} total={17}>
      <Kicker>Buy Back v2.0</Kicker>
      <H1>Arquitetura simétrica.</H1>
      <Sub>Aprendemos com a proposta anterior que travou no comitê de seminovos. Esta corrige a assimetria que impedia ROIC positivo para a Localiza.</Sub>
      <div className="mt-6 flex-1">
        <table className="w-full text-[12px]">
          <thead>
            <tr style={{ color: COLORS.muted }} className="text-left uppercase tracking-wider text-[10px]">
              <th className="font-semibold pb-2 pr-4">Parâmetro</th>
              <th className="font-semibold pb-2 pr-4">v1.0 (proposta anterior)</th>
              <th className="font-semibold pb-2" style={{ color: COLORS.gold }}>v2.0 (atual)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t" style={{ borderColor: COLORS.border }}>
                <td className="py-2 pr-4 font-semibold" style={{ color: COLORS.navy }}>{r[0]}</td>
                <td className="py-2 pr-4" style={{ color: COLORS.muted }}>{r[1]}</td>
                <td className="py-2 font-medium" style={{ color: COLORS.navy }}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 border-l-2" style={{ borderColor: COLORS.gold, background: "#fff" }}>
        <p className="text-sm leading-snug" style={{ color: COLORS.navy }}>
          A v1.0 morreu no comitê porque o piso menor entre dois pisos nunca produz ROIC positivo num cenário de seminovo pressionado. <span className="font-bold">A v2.0 inverte isso.</span> A Localiza protege o ativo, e a Foton ganha previsibilidade de canal.
        </p>
      </div>
    </SlideShell>
  );
};

const Slide13 = () => {
  const rows = [
    ["Carga útil", "8.326 kg", "7.310 kg", "~7.250 kg"],
    ["PBT", "11.500 kg", "11.180 kg", "11.000 kg"],
    ["Motor", "Cummins F3.8 170cv", "MAN D08 170cv", "OM 924 156cv"],
    ["Transmissão", "ZF 6S558", "Eaton FS-4205", "G85"],
    ["Garantia powertrain", "3 anos sem limite km", "2 anos / 200k km", "2 anos / 200k km"],
  ];
  return (
    <SlideShell index={13} total={17}>
      <Kicker>Aumark S1217 — Peça-âncora técnica</Kicker>
      <H1>O três-quartos com 1.016 kg a mais de carga útil que o líder de mercado.</H1>
      <div className="mt-6 flex-1 grid grid-cols-[1fr_1.5fr] gap-10 items-center">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 200 100" className="w-full max-w-[260px]">
            <rect x="20" y="35" width="80" height="35" fill="none" stroke={COLORS.navy} strokeWidth="1.5" />
            <rect x="100" y="25" width="70" height="45" fill="none" stroke={COLORS.gold} strokeWidth="2" />
            <circle cx="45" cy="78" r="9" fill="none" stroke={COLORS.navy} strokeWidth="1.5" />
            <circle cx="85" cy="78" r="9" fill="none" stroke={COLORS.navy} strokeWidth="1.5" />
            <circle cx="150" cy="78" r="9" fill="none" stroke={COLORS.navy} strokeWidth="1.5" />
          </svg>
          <div className="mt-4 text-center">
            <div className="text-xl font-black tracking-tight" style={{ color: COLORS.navy }}>Aumark S1217</div>
            <div className="text-[11px] uppercase tracking-wider" style={{ color: COLORS.muted }}>Cummins · ZF · 12T PBT</div>
          </div>
        </div>
        <div>
          <table className="w-full text-[12px]">
            <thead>
              <tr style={{ color: COLORS.muted }} className="text-left uppercase tracking-wider text-[10px]">
                <th className="pb-2 font-semibold">Ficha</th>
                <th className="pb-2 font-semibold" style={{ color: COLORS.gold }}>S1217</th>
                <th className="pb-2 font-semibold">VW Delivery 11.180</th>
                <th className="pb-2 font-semibold">MB Accelo 1117</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t" style={{ borderColor: COLORS.border }}>
                  <td className="py-1.5 pr-3 font-semibold" style={{ color: COLORS.navy }}>{r[0]}</td>
                  <td className="py-1.5 pr-3 font-bold" style={{ color: COLORS.navy }}>{r[1]}</td>
                  <td className="py-1.5 pr-3" style={{ color: COLORS.muted }}>{r[2]}</td>
                  <td className="py-1.5" style={{ color: COLORS.muted }}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4" style={{ background: COLORS.gold }}>
          <p className="text-sm font-bold leading-snug" style={{ color: COLORS.navy }}>
            + 1.016 kg de carga útil = 3 viagens a menos por mês na operação típica de distribuição.
          </p>
        </div>
        <div className="p-4 border" style={{ borderColor: COLORS.border, background: "#fff" }}>
          <p className="text-sm leading-snug" style={{ color: COLORS.graphite }}>
            COOPMETRO: <span className="font-bold" style={{ color: COLORS.navy }}>+20% economia</span> vs VW Delivery 11.180. TransFlau: <span className="font-bold" style={{ color: COLORS.navy }}>+25%</span>.
          </p>
        </div>
      </div>
    </SlideShell>
  );
};

const Slide14 = () => {
  const items = [
    { i: Users, t: "Trilha de treinamento técnico", d: "Programa de 3 módulos: produto, engenharia (Cummins/ZF/Daimler), comparativos por categoria. EAD + sessões presenciais mensais em Contagem." },
    { i: Truck, t: "Ride & Drive trimestral", d: "Eventos trimestrais de test drive para a equipe Localiza. Foton e Lavoro custeiam logística. Cada vendedor pilota pelo menos 4 modelos por evento." },
    { i: FileText, t: "Battlecards comparativos", d: "Material vivo de bolso — Foton vs concorrentes por categoria. Atualizado a cada lançamento. Versão impressa e digital." },
    { i: Factory, t: "Tech tour fábrica Caxias do Sul", d: "Visita anual de delegação Localiza à planta Foton em Caxias. Ver o caminhão sair da linha de produção é o que muda a convicção do vendedor." },
  ];
  return (
    <SlideShell index={14} total={17}>
      <Kicker>Capacitação</Kicker>
      <H1>Programa de capacitação da força de vendas Localiza.</H1>
      <Sub>O vendedor que não conhece o produto, não vende o produto. Aqui está como cobrimos esse gap.</Sub>
      <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 flex-1">
        {items.map((it, i) => (
          <div key={i} className="border-t-2 pt-4 flex gap-4" style={{ borderColor: COLORS.gold }}>
            <it.i size={28} strokeWidth={1.4} style={{ color: COLORS.gold }} />
            <div>
              <div className="text-[11px] font-semibold tracking-wider" style={{ color: COLORS.muted }}>0{i + 1}</div>
              <div className="text-base font-bold uppercase tracking-tight mb-2" style={{ color: COLORS.navy }}>{it.t}</div>
              <p className="text-sm leading-snug" style={{ color: COLORS.graphite }}>{it.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 border-l-2" style={{ borderColor: COLORS.gold, background: "#fff" }}>
        <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
          Frequência total: <span className="font-bold">12 pontos de contato por ano</span> com a equipe Localiza. Co-investimento Foton + Lavoro. Sem custo para a Localiza.
        </p>
      </div>
    </SlideShell>
  );
};

const Slide15 = () => {
  const items = [
    { t: "Co-authored technical reports", d: "Relatório técnico anual conjunto Foton-Lavoro-Localiza sobre TCO de frota comercial em MG. Material de referência setorial." },
    { t: "ESG report integration", d: "Foton + linha elétrica como componente do ESG Report Localiza. Métrica de zero-emission share viabilizada por Foton." },
    { t: "PR coordenado", d: "Cobertura de imprensa coordenada entre as três marcas. Cases publicados em mídia setorial (Estradão, Transporta Brasil, Frota & Cia)." },
    { t: "Eventos institucionais", d: "Foton presente em eventos Localiza relevantes (Investor Day, Customer Day, ESG Day). Co-branding em material institucional." },
  ];
  return (
    <SlideShell index={15} total={17}>
      <Kicker>Posicionamento Institucional</Kicker>
      <H1>Foton — "marca do presente-futuro" no segmento comercial.</H1>
      <Sub>O trabalho de marca que precisa rodar paralelamente para garantir a entrega comercial.</Sub>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="p-5 border" style={{ borderColor: COLORS.border, background: "#fff" }}>
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: COLORS.muted }}>Antes</div>
          <p className="text-sm leading-snug" style={{ color: COLORS.muted }}>
            Foton percebida como marca chinesa emergente. Vendedor Localiza fica defensivo. Cliente final pede 2 anos de mercado para considerar.
          </p>
        </div>
        <div className="p-5 border-l-2" style={{ borderColor: COLORS.gold, background: COLORS.navy, color: "#fff" }}>
          <div className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: COLORS.gold }}>Depois</div>
          <p className="text-sm leading-snug">
            Foton percebida como plataforma global Daimler-Cummins-ZF, presente no Brasil há mais de uma década, líder mundial em veículos comerciais. Vendedor Localiza vende com convicção. Cliente final assina.
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4 flex-1">
        {items.map((it, i) => (
          <div key={i} className="border-t pt-3" style={{ borderColor: COLORS.border }}>
            <div className="text-xl font-black tabular-nums mb-2" style={{ color: COLORS.gold }}>0{i + 1}</div>
            <div className="text-xs font-bold uppercase tracking-tight mb-2 leading-tight" style={{ color: COLORS.navy }}>{it.t}</div>
            <p className="text-[11px] leading-snug" style={{ color: COLORS.graphite }}>{it.d}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
};

const Slide16 = () => {
  const cols = [
    { tag: "H1 · 0 a 6 meses", t: "Produtos-âncora", items: ["Aumark S1217 (peça-âncora técnica)", "Aumark S315 (recordista, CNH B)", "eWonder (ESG-ready, R$ 1.677/mês economia)", "Wonder Combustão (substituto HR / Bongo)"] },
    { tag: "H2 · 6 a 18 meses", t: "Expansão de portfólio", items: ["Família Aumark completa (715, 916)", "Linha Auman (D1722, D1830, D2632)", "Vans elétricas (eToano Pro, eView Grand/Connect)", "Tunland (frota corporativa)"] },
    { tag: "H3 · 18 a 36 meses", t: "Eletrificação avançada + buy back ativo", items: ["eAumark 9T e 12T (médios elétricos)", "Primeira rodada de buy back v2.0", "Capacitação em regime de cruzeiro", "ESG report integrado em ciclo completo"] },
  ];
  return (
    <SlideShell index={16} total={17}>
      <Kicker>Roadmap</Kicker>
      <H1>Roadmap Foton-Localiza em três horizontes.</H1>
      <Sub>Quatro produtos-âncora no dia 1. Portfólio completo disponível desde o primeiro dia.</Sub>
      <div className="mt-10 relative flex-1">
        <div className="absolute left-0 right-0 top-3 h-px" style={{ background: COLORS.gold }} />
        <div className="grid grid-cols-3 gap-8">
          {cols.map((c, i) => (
            <div key={i} className="relative pt-10">
              <div className="absolute top-0 left-0 w-3 h-3 rounded-full" style={{ background: COLORS.gold }} />
              <div className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2" style={{ color: COLORS.muted }}>{c.tag}</div>
              <div className="text-base font-bold uppercase tracking-tight mb-4" style={{ color: COLORS.navy }}>{c.t}</div>
              <ul className="space-y-2">
                {c.items.map((x, j) => (
                  <li key={j} className="text-[12px] leading-snug pl-3 border-l" style={{ color: COLORS.graphite, borderColor: COLORS.border }}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 border-l-2" style={{ borderColor: COLORS.red, background: "#fff" }}>
        <p className="text-sm font-semibold" style={{ color: COLORS.navy }}>
          Importante: <span style={{ color: COLORS.red }}>todo o portfólio (15 modelos) está disponível desde o dia 1.</span> O roadmap define foco comercial, não restrição de oferta.
        </p>
      </div>
    </SlideShell>
  );
};

const Slide17 = () => {
  const items = [
    { t: "Termo institucional Foton × Localiza", d: "Documento de intenção, não vinculante, assinado pelas três partes (Foton, Lavoro, Localiza). Formaliza o programa e cria accountability." },
    { t: "Price list dedicada — validação", d: "Lavoro e Foton apresentam tabela contratual para validação do time Bernardo/Rafael até 30 dias." },
    { t: "Primeira ordem teste — S1217", d: "5 a 10 unidades do Aumark S1217 colocadas em teste em rota Localiza definida. Mensuração de TCO comparativo durante 6 meses." },
    { t: "Calendário de capacitação", d: "Definição do primeiro evento de Ride & Drive + primeira sessão de treinamento técnico em até 60 dias." },
    { t: "Revisão estratégica trimestral", d: "Comitê executivo Foton-Lavoro-Localiza com cadência trimestral. Primeiro ciclo agendado para Q4 2026." },
  ];
  return (
    <SlideShell index={17} total={17}>
      <Kicker>Próximos passos · 30 dias</Kicker>
      <H1>Cinco ações executáveis para sair do papel.</H1>
      <div className="mt-8 grid grid-cols-1 gap-3 flex-1">
        {items.map((it, i) => (
          <div key={i} className="flex gap-5 border-t pt-3" style={{ borderColor: COLORS.border }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: COLORS.gold }}>
              <Check size={16} strokeWidth={3} style={{ color: COLORS.navy }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold uppercase tracking-wide mb-1" style={{ color: COLORS.navy }}>
                <span className="mr-2 tabular-nums" style={{ color: COLORS.gold }}>0{i + 1}</span>
                {it.t}
              </div>
              <p className="text-sm leading-snug" style={{ color: COLORS.graphite }}>{it.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-[11px] italic" style={{ color: COLORS.muted }}>
        Esta proposta é o ponto de partida. A negociação dos termos detalhados será conduzida diretamente com as áreas técnicas Localiza, conforme cadência acordada.
      </div>
    </SlideShell>
  );
};

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17];

export default function LocalizaProp() {
  const [idx, setIdx] = useState(0);
  const [printMode, setPrintMode] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setIdx((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key.toLowerCase() === "f") { document.documentElement.requestFullscreen?.(); }
      else if (e.key.toLowerCase() === "p") { window.print(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [next, prev]);

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-black" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body { margin: 0; padding: 0; background: #fff; }
          .no-print { display: none !important; }
          .print-stack { display: block !important; height: auto !important; overflow: visible !important; }
          .print-slide { width: 100vw; height: 100vh; page-break-after: always; break-after: page; position: relative !important; transform: none !important; }
        }
        @media screen {
          .print-stack { display: none; }
        }
      `}</style>

      {/* SCREEN VIEW */}
      <div className="w-full h-full relative">
        {/* Aspect-locked stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative shadow-2xl"
            style={{
              width: "min(100vw, calc(100vh * 16 / 9))",
              height: "min(100vh, calc(100vw * 9 / 16))",
            }}
          >
            {slides.map((S, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(${(i - idx) * 100}%)`,
                  pointerEvents: i === idx ? "auto" : "none",
                }}
              >
                {/* Only render nearby slides for perf */}
                {Math.abs(i - idx) <= 1 ? <S /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Click zones */}
        <button aria-label="Anterior" onClick={prev} className="no-print absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-10 opacity-0" />
        <button aria-label="Próximo" onClick={next} className="no-print absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-10 opacity-0" />

        {/* Controls */}
        <div className="no-print absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-2 rounded-full text-white text-xs">
          <button onClick={prev} disabled={idx === 0} className="p-1 disabled:opacity-30 hover:text-amber-400"><ChevronLeft size={16} /></button>
          <div className="tabular-nums px-2 tracking-wider">{String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
          <button onClick={next} disabled={idx === total - 1} className="p-1 disabled:opacity-30 hover:text-amber-400"><ChevronRight size={16} /></button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button onClick={() => document.documentElement.requestFullscreen?.()} className="p-1 hover:text-amber-400" title="Fullscreen (F)"><Maximize2 size={14} /></button>
          <button onClick={() => window.print()} className="p-1 hover:text-amber-400" title="Print PDF (P)"><Printer size={14} /></button>
        </div>
      </div>

      {/* PRINT STACK */}
      <div className="print-stack">
        {slides.map((S, i) => (
          <div key={i} className="print-slide">
            <S />
          </div>
        ))}
      </div>
    </div>
  );
}
