import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { SimulacaoTCO } from "@/hooks/useSimulacoesTCO";

/* ── Premium Color Palette ── */
const C = {
  brand: "#003B73",
  brandDark: "#002147",
  accent: "#F28C28",
  accentLight: "#FFF3E6",
  green: "#0D7C5F",
  greenLight: "#E8F5F0",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  white: "#FFFFFF",
  bgSubtle: "#FAFBFC",
};

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9À-ú\s_-]/g, "").replace(/\s+/g, "_").substring(0, 60);
}

/* ── Branded header bar ── */
function drawHeader(pdf: jsPDF, logoBase64: string | null, pageW: number, margin: number, dataStr: string): number {
  let y = 0;

  // Top accent bar
  pdf.setFillColor(C.brand);
  pdf.rect(0, 0, pageW, 3, "F");
  pdf.setFillColor(C.accent);
  pdf.rect(0, 3, pageW, 1.2, "F");

  y = 10;

  // Logo
  if (logoBase64) {
    pdf.addImage(logoBase64, "PNG", margin, y, 38, 11);
  }

  // Right-aligned date badge
  const dateBoxW = 40;
  pdf.setFillColor(C.bgSubtle);
  pdf.roundedRect(pageW - margin - dateBoxW, y + 1, dateBoxW, 8, 1.5, 1.5, "F");
  pdf.setFontSize(7);
  pdf.setTextColor(C.textMuted);
  pdf.text(dataStr, pageW - margin - dateBoxW / 2, y + 6.2, { align: "center" });

  y += 15;

  // Title block
  pdf.setFontSize(15);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(C.brandDark);
  pdf.text("Análise TCO", margin, y);
  pdf.setFontSize(15);
  pdf.setTextColor(C.accent);
  pdf.text(" — Lavoro Foton", margin + pdf.getTextWidth("Análise TCO"), y);

  y += 4.5;
  pdf.setFontSize(7.5);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(C.textSecondary);
  pdf.text("Custo Total de Propriedade  ·  Elétrico vs Diesel", margin, y);

  y += 3;
  // Thin brand line
  pdf.setDrawColor(C.brand);
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, margin + 50, y);
  pdf.setDrawColor(C.accent);
  pdf.setLineWidth(0.3);
  pdf.line(margin + 50, y, margin + 70, y);

  y += 4;
  return y;
}

/* ── Client highlight box ── */
function drawClientBox(pdf: jsPDF, name: string, margin: number, y: number, contentW: number): number {
  const boxH = 14;
  // Left accent stripe
  pdf.setFillColor(C.brand);
  pdf.rect(margin, y, 2.5, boxH, "F");
  // Box background
  pdf.setFillColor("#EEF4FB");
  pdf.rect(margin + 2.5, y, contentW - 2.5, boxH, "F");
  // Subtle border
  pdf.setDrawColor("#D0DFF0");
  pdf.setLineWidth(0.2);
  pdf.rect(margin, y, contentW, boxH, "S");

  // "PREPARADO PARA" label
  pdf.setFontSize(5.5);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(C.textMuted);
  pdf.text("PREPARADO PARA", margin + 7, y + 4.5);

  // Client name
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(C.brandDark);
  pdf.text(name, margin + 7, y + 9.5);

  // Subtitle
  pdf.setFontSize(6.5);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(C.accent);
  pdf.text("Plano de redução de custos operacionais", margin + 7, y + 12.5);

  return y + boxH + 3;
}

/* ── KPI Cards ── */
function drawKPIs(
  pdf: jsPDF,
  kpis: { label: string; value: string; color: string; bgColor: string }[],
  margin: number,
  y: number,
  contentW: number
): number {
  const gap = 3;
  const kpiW = (contentW - gap * (kpis.length - 1)) / kpis.length;
  const kpiH = 18;

  kpis.forEach((kpi, i) => {
    const x = margin + i * (kpiW + gap);

    // Card bg
    pdf.setFillColor(kpi.bgColor);
    pdf.roundedRect(x, y, kpiW, kpiH, 2, 2, "F");

    // Top accent line
    pdf.setFillColor(kpi.color);
    pdf.rect(x + 4, y, kpiW - 8, 0.8, "F");

    // Label
    pdf.setFontSize(5.5);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(C.textMuted);
    pdf.text(kpi.label.toUpperCase(), x + kpiW / 2, y + 7, { align: "center" });

    // Value
    pdf.setFontSize(13);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(kpi.color);
    pdf.text(kpi.value, x + kpiW / 2, y + 14, { align: "center" });
    pdf.setFont("helvetica", "normal");
  });

  return y + kpiH + 4;
}

/* ── Section title with brand accent ── */
function drawSectionTitle(pdf: jsPDF, title: string, x: number, y: number, _w: number): number {
  pdf.setFillColor(C.brand);
  pdf.rect(x, y, 18, 0.6, "F");
  pdf.setFillColor(C.accent);
  pdf.rect(x + 18, y, 6, 0.6, "F");
  y += 4;
  pdf.setFontSize(7.5);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(C.brandDark);
  pdf.text(title.toUpperCase(), x, y);
  pdf.setFont("helvetica", "normal");
  y += 3.5;
  return y;
}

/* ── Data table rows ── */
function drawDataRows(
  pdf: jsPDF,
  rows: string[][],
  margin: number,
  y: number,
  pageW: number,
  contentW: number,
  options?: { highlightLast?: boolean; economiaLiquida?: number }
): number {
  const rowH = 5;
  rows.forEach((row, i) => {
    const isLast = options?.highlightLast && i === rows.length - 1;

    if (isLast) {
      const eco = options?.economiaLiquida ?? 0;
      pdf.setFillColor(eco > 0 ? "#D1FAE5" : "#FEE2E2");
      pdf.rect(margin, y - 3.2, contentW, rowH + 1.5, "F");
      // Left accent
      pdf.setFillColor(eco > 0 ? C.green : "#C0392B");
      pdf.rect(margin, y - 3.2, 1.5, rowH + 1.5, "F");
    } else if (i % 2 === 0) {
      pdf.setFillColor(C.bgSubtle);
      pdf.rect(margin, y - 3, contentW, rowH, "F");
    }

    const fontSize = isLast ? 8 : 7;
    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", isLast ? "bold" : "normal");
    pdf.setTextColor(isLast
      ? ((options?.economiaLiquida ?? 0) > 0 ? C.green : "#C0392B")
      : C.textPrimary
    );
    pdf.text(row[0], margin + (isLast ? 4 : 3), y);
    pdf.setFont("helvetica", "bold");
    pdf.text(row[1], pageW - margin - 3, y, { align: "right" });
    pdf.setFont("helvetica", "normal");
    y += isLast ? 6.5 : rowH;
  });
  return y;
}

/* ── Footer ── */
function drawFooter(pdf: jsPDF, logoBase64: string | null, pageW: number, margin: number) {
  const footerY = 280;

  // Bottom accent bars
  pdf.setFillColor(C.accent);
  pdf.rect(0, 294, pageW, 1.2, "F");
  pdf.setFillColor(C.brand);
  pdf.rect(0, 295.2, pageW, 2.8, "F");

  // Divider line
  pdf.setDrawColor(C.border);
  pdf.setLineWidth(0.2);
  pdf.line(margin, footerY, pageW - margin, footerY);

  // Footer text
  pdf.setFontSize(6);
  pdf.setTextColor(C.textMuted);
  pdf.text("CONFIDENCIAL", margin, footerY + 4);
  pdf.text(
    "Simulação gerada pela Calculadora Lavoro TCO  |  www.lavorofoton.com.br",
    pageW / 2, footerY + 4,
    { align: "center" }
  );

  // Mini logo
  if (logoBase64) {
    pdf.addImage(logoBase64, "PNG", pageW - margin - 20, footerY + 2, 20, 6);
  }

  // Page number
  pdf.setFontSize(6);
  pdf.setTextColor(C.textSecondary);
  pdf.text("1/1", pageW - margin, footerY + 10, { align: "right" });
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */
export async function exportTCOPdf({
  inputs,
  resultados,
  nomeSimulacao,
  logoUrl,
  chartElementId,
}: {
  inputs: SimulacaoTCO["inputs"];
  resultados: SimulacaoTCO["resultados"];
  nomeSimulacao?: string;
  logoUrl: string;
  chartElementId: string;
}) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 16;
  const contentW = pageW - margin * 2;
  const now = new Date();
  const dataStr = now.toLocaleDateString("pt-BR");

  // ── Load logo ──
  let logoBase64: string | null = null;
  try {
    const resp = await fetch(logoUrl);
    const blob = await resp.blob();
    logoBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    // skip logo
  }

  // ── HEADER ──
  let y = drawHeader(pdf, logoBase64, pageW, margin, dataStr);

  // ── CLIENT BOX ──
  if (nomeSimulacao) {
    y = drawClientBox(pdf, nomeSimulacao, margin, y, contentW);
  }

  // ── KPIs ──
  const kpis = [
    {
      label: "Economia Mensal",
      value: fmt(resultados.economiaMensal),
      color: C.green,
      bgColor: C.greenLight,
    },
    {
      label: "Economia Anual",
      value: fmt(resultados.economiaAnual),
      color: C.green,
      bgColor: C.greenLight,
    },
    {
      label: "Payback Estimado",
      value: resultados.payback > 0 ? `~${resultados.payback} meses` : `> ${inputs.meses} meses`,
      color: C.accent,
      bgColor: C.accentLight,
    },
  ];
  y = drawKPIs(pdf, kpis, margin, y, contentW);

  // ── INPUTS TABLE (2 columns) ──
  y = drawSectionTitle(pdf, "Parâmetros da Simulação", margin, y, contentW);

  const inputsLeft = [
    ["Veículo elétrico", fmt(inputs.precoEletrico)],
    ["Veículo diesel", fmt(inputs.precoDiesel)],
    ["Km / mês", `${inputs.kmMes.toLocaleString("pt-BR")} km`],
    ["Frota", `${inputs.frota} veíc.`],
    ["Período", `${inputs.meses} meses`],
    ["Perfil", inputs.perfil],
  ];
  const inputsRight = [
    ["Diesel", `R$ ${inputs.precoDieselL.toFixed(2).replace(".", ",")}/L`],
    ["Energia", `R$ ${inputs.precoEnergia.toFixed(2).replace(".", ",")}/kWh`],
    ["ARLA 32", `R$ ${inputs.precoArla.toFixed(2).replace(".", ",")}/L`],
    ["Cons. diesel", `${inputs.consumoDieselKmL.toFixed(2).replace(".", ",")} km/L`],
    ["Cons. elétrico", `${inputs.consumoEletricoKwhKm.toFixed(2).replace(".", ",")} kWh/km`],
  ];

  const colW = (contentW - 4) / 2;
  const maxRows = Math.max(inputsLeft.length, inputsRight.length);
  const rowH = 4.8;

  for (let i = 0; i < maxRows; i++) {
    if (i % 2 === 0) {
      pdf.setFillColor(C.bgSubtle);
      pdf.rect(margin, y - 2.8, contentW, rowH, "F");
    }
    pdf.setFontSize(6.5);
    // Left column
    if (inputsLeft[i]) {
      pdf.setTextColor(C.textSecondary);
      pdf.setFont("helvetica", "normal");
      pdf.text(inputsLeft[i][0], margin + 2, y);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(C.textPrimary);
      pdf.text(inputsLeft[i][1], margin + colW - 2, y, { align: "right" });
    }
    // Right column
    if (inputsRight[i]) {
      const rx = margin + colW + 4;
      pdf.setTextColor(C.textSecondary);
      pdf.setFont("helvetica", "normal");
      pdf.text(inputsRight[i][0], rx, y);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(C.textPrimary);
      pdf.text(inputsRight[i][1], margin + contentW - 2, y, { align: "right" });
    }
    pdf.setFont("helvetica", "normal");
    y += rowH;
  }
  y += 3;

  // ── CHART ──
  const chartEl = document.getElementById(chartElementId);
  if (chartEl) {
    y = drawSectionTitle(pdf, "Custo Acumulado no Período", margin, y, contentW);
    try {
      const canvas = await html2canvas(chartEl, { backgroundColor: "#ffffff", scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const ratio = canvas.width / canvas.height;
      const maxChartH = 268 - y - 40;
      const imgW = contentW;
      let imgH = imgW / ratio;
      if (imgH > maxChartH) imgH = maxChartH;

      // Subtle chart frame
      pdf.setDrawColor(C.border);
      pdf.setLineWidth(0.15);
      pdf.roundedRect(margin - 1, y - 1, imgW + 2, imgH + 2, 1.5, 1.5, "S");

      pdf.addImage(imgData, "PNG", margin, y, imgW, imgH);
      y += imgH + 4;
    } catch {
      // skip chart
    }
  }

  // ── RESUMO ECONÔMICO ──
  y = drawSectionTitle(pdf, "Resumo Econômico", margin, y, contentW);

  const resumoRows = [
    ["Economia mensal", fmt(resultados.economiaMensal)],
    ["Economia anual", fmt(resultados.economiaAnual)],
    [`Economia em ${inputs.meses} meses`, fmt(resultados.economiaMensal * inputs.meses)],
    ["Economia líquida no período", fmt(resultados.economiaLiquida)],
  ];

  y = drawDataRows(pdf, resumoRows, margin, y, pageW, contentW, {
    highlightLast: true,
    economiaLiquida: resultados.economiaLiquida,
  });

  // ── FOOTER ──
  drawFooter(pdf, logoBase64, pageW, margin);

  // ── Save ──
  const nomeArq = nomeSimulacao ? sanitizeFilename(nomeSimulacao) : "Simulacao";
  const dataArq = now.toISOString().slice(0, 10);
  pdf.save(`Simulacao_TCO_Lavoro_${nomeArq}_${dataArq}.pdf`);
}
