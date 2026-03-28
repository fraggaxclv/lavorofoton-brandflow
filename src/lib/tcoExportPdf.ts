import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { SimulacaoTCO } from "@/hooks/useSimulacoesTCO";

const C = {
  brand: "#003B73",
  accent: "#F28C28",
  green: "#0D7C5F",
  textPrimary: "#1A1A2E",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 });

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9À-ú\s_-]/g, "").replace(/\s+/g, "_").substring(0, 60);
}

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
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = margin;
  const now = new Date();
  const dataStr = now.toLocaleDateString("pt-BR");

  // ── Load logo as base64 ──
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
  if (logoBase64) {
    pdf.addImage(logoBase64, "PNG", margin, y, 45, 14);
  }
  pdf.setFontSize(9);
  pdf.setTextColor(C.textSecondary);
  pdf.text(dataStr, pageW - margin, y + 5, { align: "right" });
  if (nomeSimulacao) {
    pdf.setFontSize(8);
    pdf.text(nomeSimulacao, pageW - margin, y + 10, { align: "right" });
  }
  y += 20;

  // Title
  pdf.setDrawColor(C.brand);
  pdf.setLineWidth(0.6);
  pdf.line(margin, y, pageW - margin, y);
  y += 6;
  pdf.setFontSize(16);
  pdf.setTextColor(C.brand);
  pdf.setFont("helvetica", "bold");
  pdf.text("Calculadora TCO — Lavoro Foton", margin, y);
  y += 4;
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(C.textSecondary);
  pdf.text("Custo Total de Propriedade · Elétrico vs Diesel", margin, y);
  y += 8;

  // ── SEÇÃO 1: KPIs ──
  const kpis = [
    { label: "Economia Mensal", value: fmt(resultados.economiaMensal), color: C.green },
    { label: "Economia Anual", value: fmt(resultados.economiaAnual), color: C.green },
    { label: "Payback", value: resultados.payback > 0 ? `~${resultados.payback} meses` : `> ${inputs.meses} meses`, color: C.accent },
  ];

  const kpiW = (contentW - 8) / 3;
  kpis.forEach((kpi, i) => {
    const x = margin + i * (kpiW + 4);
    pdf.setFillColor("#F0F9F5");
    pdf.roundedRect(x, y, kpiW, 22, 2, 2, "F");
    pdf.setFontSize(8);
    pdf.setTextColor(C.textSecondary);
    pdf.text(kpi.label.toUpperCase(), x + kpiW / 2, y + 7, { align: "center" });
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(kpi.color);
    pdf.text(kpi.value, x + kpiW / 2, y + 17, { align: "center" });
    pdf.setFont("helvetica", "normal");
  });
  y += 28;

  // ── SEÇÃO 2: Inputs ──
  y = drawSectionTitle(pdf, "Parâmetros da Simulação", margin, y, contentW);
  const inputRows = [
    ["Preço veículo elétrico", fmt(inputs.precoEletrico)],
    ["Preço veículo diesel", fmt(inputs.precoDiesel)],
    ["Km / mês", `${inputs.kmMes.toLocaleString("pt-BR")} km`],
    ["Veículos na frota", `${inputs.frota}`],
    ["Período de análise", `${inputs.meses} meses`],
    ["Perfil de operação", inputs.perfil],
    ["Preço diesel", `R$ ${inputs.precoDieselL.toFixed(2).replace(".", ",")}/L`],
    ["Preço energia", `R$ ${inputs.precoEnergia.toFixed(2).replace(".", ",")}/kWh`],
    ["Preço ARLA 32", `R$ ${inputs.precoArla.toFixed(2).replace(".", ",")}/L`],
    ["Consumo diesel", `${inputs.consumoDieselKmL.toFixed(2).replace(".", ",")} km/L`],
    ["Consumo elétrico", `${inputs.consumoEletricoKwhKm.toFixed(2).replace(".", ",")} kWh/km`],
  ];

  inputRows.forEach((row, i) => {
    if (i % 2 === 0) {
      pdf.setFillColor("#F9FAFB");
      pdf.rect(margin, y - 3.5, contentW, 7, "F");
    }
    pdf.setFontSize(9);
    pdf.setTextColor(C.textPrimary);
    pdf.text(row[0], margin + 3, y);
    pdf.setFont("helvetica", "bold");
    pdf.text(row[1], pageW - margin - 3, y, { align: "right" });
    pdf.setFont("helvetica", "normal");
    y += 7;
  });
  y += 4;

  // ── SEÇÃO 3: Chart capture ──
  const chartEl = document.getElementById(chartElementId);
  if (chartEl) {
    y = drawSectionTitle(pdf, "Custo Acumulado no Período", margin, y, contentW);
    try {
      const canvas = await html2canvas(chartEl, { backgroundColor: "#ffffff", scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const ratio = canvas.width / canvas.height;
      const imgW = contentW;
      const imgH = imgW / ratio;
      
      if (y + imgH > 280) {
        pdf.addPage();
        y = margin;
        y = drawSectionTitle(pdf, "Custo Acumulado no Período", margin, y, contentW);
      }
      pdf.addImage(imgData, "PNG", margin, y, imgW, imgH);
      y += imgH + 6;
    } catch {
      // skip chart
    }
  }

  // ── SEÇÃO 4-6: Resumo consolidado ──
  if (y > 230) {
    pdf.addPage();
    y = margin;
  }
  y = drawSectionTitle(pdf, "Resumo Econômico", margin, y, contentW);

  const resumoRows = [
    ["Economia mensal", fmt(resultados.economiaMensal)],
    ["Economia anual", fmt(resultados.economiaAnual)],
    [`Economia ${inputs.meses} meses`, fmt(resultados.economiaMensal * inputs.meses)],
    ["Economia líquida no período", fmt(resultados.economiaLiquida)],
  ];

  resumoRows.forEach((row, i) => {
    const isLast = i === resumoRows.length - 1;
    if (isLast) {
      pdf.setFillColor(resultados.economiaLiquida > 0 ? "#D1FAE5" : "#FEE2E2");
      pdf.rect(margin, y - 4, contentW, 9, "F");
    } else if (i % 2 === 0) {
      pdf.setFillColor("#F9FAFB");
      pdf.rect(margin, y - 3.5, contentW, 7, "F");
    }
    pdf.setFontSize(isLast ? 10 : 9);
    pdf.setFont("helvetica", isLast ? "bold" : "normal");
    pdf.setTextColor(isLast ? (resultados.economiaLiquida > 0 ? C.green : "#C0392B") : C.textPrimary);
    pdf.text(row[0], margin + 3, y);
    pdf.text(row[1], pageW - margin - 3, y, { align: "right" });
    pdf.setFont("helvetica", "normal");
    y += isLast ? 9 : 7;
  });

  // ── FOOTER ──
  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setDrawColor(C.border);
    pdf.setLineWidth(0.3);
    pdf.line(margin, 282, pageW - margin, 282);
    pdf.setFontSize(7);
    pdf.setTextColor(C.textSecondary);
    pdf.text(
      "Simulação gerada pela Calculadora Lavoro TCO | www.lavorofoton.com.br",
      pageW / 2, 287,
      { align: "center" }
    );
    if (logoBase64) {
      pdf.addImage(logoBase64, "PNG", pageW / 2 - 12, 289, 24, 7);
    }
  }

  // ── Save ──
  const nomeArq = nomeSimulacao ? sanitizeFilename(nomeSimulacao) : "Simulacao";
  const dataArq = now.toISOString().slice(0, 10);
  pdf.save(`Simulacao_TCO_Lavoro_${nomeArq}_${dataArq}.pdf`);
}

function drawSectionTitle(pdf: jsPDF, title: string, x: number, y: number, w: number): number {
  pdf.setDrawColor(C.border);
  pdf.setLineWidth(0.3);
  pdf.line(x, y, x + w, y);
  y += 5;
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(C.brand);
  pdf.text(title.toUpperCase(), x, y);
  pdf.setFont("helvetica", "normal");
  y += 6;
  return y;
}
