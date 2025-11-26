import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Produto {
  produto: string;
  quantidade: number;
  anoModelo: string;
  valorUnitario: number;
  valorTotal: number;
}

interface PedidoData {
  numero_pedido: string;
  local: string;
  data: string;
  nome_vendedor: string;
  nome_cliente: string;
  cnpj: string;
  ie_rg?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  telefone_cliente?: string;
  responsavel_frota?: string;
  email_responsavel?: string;
  faturamento_tipo: string;
  nome_instituicao?: string;
  financiamento_forma: string;
  financiamento_forma_outros?: string;
  valor_total_produtos: number;
  entrada?: number;
  observacoes?: string;
  produtos: Produto[];
}

function gerarPDFHTML(pedido: PedidoData): string {
  const produtosHTML = pedido.produtos.map((p, index) => `
    <tr style="background-color: ${index % 2 === 0 ? '#f8f9fa' : '#ffffff'};">
      <td style="padding: 12px 8px; border-bottom: 1px solid #e9ecef;">${p.produto}</td>
      <td style="padding: 12px 8px; text-align: center; border-bottom: 1px solid #e9ecef;">${p.quantidade}</td>
      <td style="padding: 12px 8px; text-align: center; border-bottom: 1px solid #e9ecef;">${p.anoModelo}</td>
      <td style="padding: 12px 8px; text-align: right; border-bottom: 1px solid #e9ecef;">R$ ${p.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600; border-bottom: 1px solid #e9ecef;">R$ ${p.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
    </tr>
  `).join('');

  const saldoFinanciado = pedido.valor_total_produtos - (pedido.entrada || 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @page {
          margin: 20mm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 0;
          margin: 0;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px 20px;
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .logo {
          max-width: 350px;
          height: auto;
          margin-bottom: 20px;
        }
        .header h1 {
          color: #ffffff;
          margin: 15px 0 10px 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .pedido-numero {
          background-color: #ef4444;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          display: inline-block;
          font-size: 16px;
          font-weight: 600;
          margin-top: 10px;
        }
        .info-section {
          margin: 25px 0;
          page-break-inside: avoid;
        }
        .info-section h2 {
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          color: white;
          padding: 12px 15px;
          margin: 20px 0 15px 0;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin: 15px 0;
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
        }
        .info-item {
          padding: 8px;
        }
        .info-label {
          font-weight: 600;
          color: #0f2557;
          margin-bottom: 4px;
          font-size: 13px;
        }
        .info-value {
          color: #1a1a1a;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-radius: 6px;
          overflow: hidden;
        }
        th {
          background: linear-gradient(135deg, #0f2557 0%, #1e40af 100%);
          color: white;
          padding: 14px 10px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }
        td {
          padding: 12px 10px;
          font-size: 14px;
        }
        .total-box {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border-left: 4px solid #f59e0b;
          padding: 20px;
          margin: 25px 0;
          text-align: right;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .total-box .label {
          color: #92400e;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .total-box .value {
          font-size: 32px;
          font-weight: 700;
          color: #92400e;
        }
        .signatures {
          margin-top: 80px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          page-break-inside: avoid;
        }
        .signature-line {
          border-top: 2px solid #0f2557;
          padding-top: 8px;
          text-align: center;
          font-weight: 600;
          color: #0f2557;
          font-size: 13px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        .observacoes-box {
          background-color: #f1f5f9;
          border-left: 4px solid #1e40af;
          padding: 15px;
          border-radius: 4px;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="data:image/png;base64,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hGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACkhWAEAAKSEYAUAAJASghUAAEBKCFYAAAApIVgBAACkhGAFAACQEoIVAABASghWAAAAKSFYAQAApIRgBQAAkBKCFQAAQEoIVgAAACn5/wEACLdCbXhP7QAAAABJRU5ErkJggg==" alt="Foton Lavoro" class="logo">
          <h1>PEDIDO DE FATURAMENTO</h1>
          <div class="pedido-numero">Nº ${pedido.numero_pedido}</div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Data:</div>
            <div class="info-value">${new Date(pedido.data).toLocaleDateString('pt-BR')}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Local:</div>
            <div class="info-value">${pedido.local || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Vendedor:</div>
            <div class="info-value">${pedido.nome_vendedor}</div>
          </div>
        </div>

        <div class="info-section">
          <h2>📋 DADOS DO CLIENTE</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nome/Razão Social:</div>
              <div class="info-value">${pedido.nome_cliente}</div>
            </div>
            <div class="info-item">
              <div class="info-label">CNPJ/CPF:</div>
              <div class="info-value">${pedido.cnpj}</div>
            </div>
            <div class="info-item">
              <div class="info-label">IE/RG:</div>
              <div class="info-value">${pedido.ie_rg || '-'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Telefone:</div>
              <div class="info-value">${pedido.telefone_cliente || '-'}</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Endereço:</div>
              <div class="info-value">${pedido.rua || ''} ${pedido.numero || ''}, ${pedido.bairro || ''} - ${pedido.cidade || ''} / ${pedido.estado || ''} - CEP: ${pedido.cep || '-'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Responsável pela Frota:</div>
              <div class="info-value">${pedido.responsavel_frota || '-'}</div>
            </div>
            <div class="info-item">
              <div class="info-label">E-mail do Responsável:</div>
              <div class="info-value">${pedido.email_responsavel || '-'}</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2>🚛 DESCRIÇÃO DOS PRODUTOS</h2>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th style="text-align: center;">Qtd</th>
                <th style="text-align: center;">Ano/Modelo</th>
                <th style="text-align: right;">Valor Unit.</th>
                <th style="text-align: right;">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              ${produtosHTML}
              <tr style="background-color: #f8f9fa; border-top: 2px solid #0f2557;">
                <td colspan="4" style="padding: 12px 8px; text-align: right; font-weight: 700; border-bottom: none;">VALOR TOTAL DOS PRODUTOS:</td>
                <td style="padding: 12px 8px; text-align: right; font-weight: 700; color: #0f2557; font-size: 16px; border-bottom: none;">R$ ${pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="info-section">
          <h2>💰 CONDIÇÕES COMERCIAIS & FINANCEIRAS</h2>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Tipo de Faturamento:</div>
              <div class="info-value">${pedido.faturamento_tipo}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Instituição Financeira:</div>
              <div class="info-value">${pedido.nome_instituicao || '-'}</div>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Forma de Pagamento:</div>
              <div class="info-value">${pedido.financiamento_forma}${pedido.financiamento_forma_outros ? ` (${pedido.financiamento_forma_outros})` : ''}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Valor Total do Financiamento:</div>
              <div class="info-value" style="font-weight: 700; color: #0f2557;">R$ ${pedido.valor_total_produtos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Entrada:</div>
              <div class="info-value" style="font-weight: 700; color: #16a34a;">R$ ${(pedido.entrada || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Saldo Financiado:</div>
              <div class="info-value" style="font-weight: 700; color: #dc2626;">R$ ${saldoFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>

        ${pedido.observacoes ? `
        <div class="info-section">
          <h2>📝 OBSERVAÇÕES</h2>
          <div class="observacoes-box">
            ${pedido.observacoes}
          </div>
        </div>
        ` : ''}

        <div class="signatures">
          <div class="signature-line">
            Assinatura do Cliente
          </div>
          <div class="signature-line">
            Assinatura do Vendedor
          </div>
          <div class="signature-line">
            Assinatura do Gerente
          </div>
        </div>

        <div class="footer">
          <p><strong>FOTON LAVORO</strong></p>
          <p>Pedido gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const pedido: PedidoData = await req.json();

    console.log("Gerando PDF para pedido:", pedido.numero_pedido);

    const pdfHTML = gerarPDFHTML(pedido);

    // Enviar email com o HTML do pedido
    const emailResponse = await resend.emails.send({
      from: "Lavoro Foton <onboarding@resend.dev>",
      to: ["matheus@lavorofoton.com.br", "fernando@lavorofoton.com.br"],
      subject: `Novo Pedido de Faturamento - ${pedido.numero_pedido}`,
      html: pdfHTML,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        pdfHTML,
        emailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Erro ao gerar PDF:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);