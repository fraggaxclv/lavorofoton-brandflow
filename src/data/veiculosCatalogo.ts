// Catálogo de veículos FOTON com dados completos para propostas
import fotonS315 from "@/assets/foton-s315.jpg";
import aumarkEagleExt from "@/assets/aumark-eagle-eye-ext.jpg";
import foton1217 from "@/assets/foton-1217.jpg";
import foton1722 from "@/assets/foton-1722.jpg";
import tunlandV9 from "@/assets/tunland-v9.jpg";
import tunlandV7 from "@/assets/tunland-v7.jpg";
import ewonder from "@/assets/ewonder.jpg";
import etoano from "@/assets/etoano.jpg";
import eaumark6t from "@/assets/eaumark-6t-carroceria.jpg";
import eaumark12t from "@/assets/eaumark-12t.jpg";
import eaumark9t from "@/assets/eaumark-9t-card.webp";
import eview from "@/assets/eview.jpg";
import aumanD1830Hero from "@/assets/auman-d-1830-hero.png";

export interface Veiculo {
  id: string;
  modelo: string;
  categoria: 'diesel' | 'eletrico' | 'picape';
  imagem: string;
  capacidade: string;
  cnh: string;
  aplicacao: string;
  caracteristicas: string[];
  cores: string[];
  cargaUtilCarroceria?: string; // Carga útil + Carroceria (apenas para caminhões)
}

export const veiculosCatalogo: Veiculo[] = [
  // Linha Diesel
  {
    id: 'aumark-s315',
    modelo: 'AUMARK S315',
    categoria: 'diesel',
    imagem: fotonS315,
    capacidade: '3,5 toneladas',
    cnh: 'B',
    aplicacao: 'Urbano',
    caracteristicas: [
      'Motor Cummins ISF 2.8L Diesel',
      'Potência: 150 cv',
      'Torque: 360 Nm',
      'Transmissão manual de 6 marchas',
      'Direção hidráulica',
      'Ar-condicionado',
      'Garantia de 3 anos'
    ],
    cores: ['Branco', 'Prata', 'Vermelho']
  },
  {
    id: 'aumark-715',
    modelo: 'AUMARK 715',
    categoria: 'diesel',
    imagem: aumarkEagleExt,
    capacidade: '7 toneladas',
    cnh: 'C',
    aplicacao: 'Urbano/Regional',
    caracteristicas: [
      'NOVA cabine Eagle Eye — mesma do S315',
      'Motor Cummins F2.5 Diesel',
      'Potência: 150 cv',
      'Torque: 400 Nm',
      'Transmissão manual OU automatizada',
      'Freio a ar — raro no segmento',
      'Versões Standard e Plus (Plus: câmera 360, alerta de ponto cego, sensor de fadiga, central 10")',
      'Garantia de 3 anos km livre'
    ],
    cores: ['Branco', 'Prata', 'Azul'],
    cargaUtilCarroceria: '4.520 kg'
  },
  {
    id: 'aumark-916',
    modelo: 'AUMARK 916',
    categoria: 'diesel',
    imagem: aumarkEagleExt,
    capacidade: '9 toneladas',
    cnh: 'C',
    aplicacao: 'Regional',
    caracteristicas: [
      'NOVA cabine Eagle Eye — mesma do S315',
      'Motor Cummins F3.8 Diesel',
      'Potência: 160 cv',
      'Torque: 500 Nm',
      'Transmissão manual OU automatizada',
      'Tara baixa — carrega mais que a concorrência',
      'Versões Standard e Plus (Plus: câmera 360, alerta de ponto cego, sensor de fadiga, central 10")',
      'Garantia de 3 anos km livre'
    ],
    cores: ['Branco', 'Prata'],
    cargaUtilCarroceria: '6.021 kg'
  },
  {
    id: 'aumark-1217',
    modelo: 'AUMARK 1217',
    categoria: 'diesel',
    imagem: foton1217,
    capacidade: '12 toneladas',
    cnh: 'C',
    aplicacao: 'Pesado',
    caracteristicas: [
      'Motor Cummins ISF 3.8L Diesel',
      'Potência: 170 cv',
      'Torque: 600 Nm',
      'Transmissão manual de 6 marchas',
      'Freios a ar ABS',
      'Chassi reforçado',
      'Garantia de 3 anos'
    ],
    cores: ['Branco', 'Azul'],
    cargaUtilCarroceria: '8.326 kg'
  },
  {
    id: 'auman-d-1722',
    modelo: 'AUMAN D 1722',
    categoria: 'diesel',
    imagem: foton1722,
    capacidade: '16 toneladas',
    cnh: 'C',
    aplicacao: 'Pesado/Distribuição regional',
    caracteristicas: [
      'Motor Cummins F4.5 — 220 cv @ 2.300 rpm',
      'Torque máximo: 820 Nm @ 1.200-1.500 rpm',
      '4 cilindros / 4.460 cm³ — Common Rail',
      'Transmissão ZF 6S1000 manual — 6 marchas',
      'Freio de ar de circuito duplo com ESC + freio-motor EAT',
      'BSD (detecção de ponto cego) + TPMS de série',
      'Ar-condicionado automático + controle de cruzeiro',
      'Tanque de alumínio: 260 L (versão A) ou 450 L (versão B)',
      'PBT homologado 16.000 kg | capacidade técnica 18.700 kg',
      'CONAMA P8 (Euro 6) — SCR+DOC+DPF',
      'Garantia de 3 anos ou 100.000 km',
    ],
    cores: ['Branco', 'Azul', 'Vermelho'],
    cargaUtilCarroceria: '11.375 kg (A) / 11.360 kg (B)',
  },
  {
    id: 'auman-d-1830',
    modelo: 'AUMAN D 1830',
    categoria: 'diesel',
    imagem: aumanD1830Hero,
    capacidade: '18 toneladas',
    cnh: 'C',
    aplicacao: 'Pesado/Regional',
    caracteristicas: [
      'Motor Cummins D6.7 — 282 cv',
      'Torque máximo: 1.100 Nm @ 1.100-1.600 rpm',
      'Transmissão ZF 9AS1517TO AUTOMATIZADA — 9 marchas + ré',
      'Embreagem automatizada com conversor de torque',
      'Freios a ar tipo S Cam — ABS, EBD, ESC, TCS, HSA, EAT',
      'Cabine com semi leito de série',
      'Banco do motorista com amortecimento pneumático',
      'Ar condicionado automático + painel LCD 7"',
      'Suspensão traseira: feixe parabólico 4+3 com barra estabilizadora',
      'Tanque de combustível em alumínio: 260 L ou 450 L',
      'PBT 18.000 kg (técnico) | PBTC 34.000 kg',
      'EURO 6 — IBAMA Proconve homologado',
      'Garantia: 1 ano veículo completo + 3 anos motor e câmbio (sem limite de km)',
    ],
    cores: ['Branco', 'Azul', 'Vermelho'],
    cargaUtilCarroceria: '10.360 kg',
  },
  {
    id: 'auman-d-2632',
    modelo: 'AUMAN D 2632',
    // TODO: substituir por foto exclusiva do D 2632 quando disponível (ex: auman-d-2632-hero.png)
    imagem: aumanD1830Hero,
    categoria: 'diesel',
    capacidade: '26 toneladas',
    cnh: 'C',
    aplicacao: 'Pesado 6x2/Longas distâncias',
    caracteristicas: [
      'Motor Cummins D6.7 — 320 cv',
      'Torque máximo: 1.200 Nm @ 1.100-1.600 rpm',
      'Transmissão ZF 9AS1517TO AUTOMATIZADA — 9 marchas + ré',
      'Embreagem automatizada com conversor de torque',
      'Freios a ar tipo S Cam — ABS, EBD, ESC, TCS, HSA, EAT',
      'Ajuste automático da folga do freio',
      'Cabine com semi leito de série',
      'Banco do motorista com amortecimento pneumático',
      'Ar condicionado automático + painel LCD 7" + farol de neblina dianteiro',
      'Suspensão traseira pneumática (a ar) com 3º eixo elevável — bolsas 2+2+1',
      'Tanque de combustível em alumínio: 450 L',
      'PBT 26.000 kg (técnico) | PBTC 36.000 kg',
      'Versões disponíveis: padrão (entre-eixos 4.800 + 1.350 mm) e L (5.450 + 1.350 mm, plataforma 8.201 mm)',
      'EURO 6 — IBAMA Proconve homologado',
      'Garantia: 1 ano veículo completo + 3 anos motor e câmbio (sem limite de km)',
    ],
    cores: ['Branco', 'Azul', 'Vermelho'],
    cargaUtilCarroceria: '15.630 kg (padrão) / 15.560 kg (L)',
  },
  // Linha Elétrica
  {
    id: 'ewonder',
    modelo: 'eWONDER',
    categoria: 'eletrico',
    imagem: ewonder,
    capacidade: 'VUC Elétrico',
    cnh: 'B',
    aplicacao: 'Urbano - Zero Emissões',
    caracteristicas: [
      'Motor Síncrono Imã Permanente — eAxle',
      'Potência: 35 kW @ 75 kW (pico)',
      'Torque: 105-220 N.m',
      'Bateria CATL LFP 41,86 kWh',
      'Autonomia: 180 km',
      'PBT: 2.550 kg | Carga útil: 1.325 kg',
      'Conector CCS2 (AC/DC) | 335V',
      'Zero emissões · 73% economia',
      'Garantia de 5 anos bateria'
    ],
    cores: ['Branco', 'Verde']
  },
  {
    id: 'eaumark-6t',
    modelo: 'e-AUMARK 6T',
    categoria: 'eletrico',
    imagem: eaumark6t,
    capacidade: '6 toneladas',
    cnh: 'C',
    aplicacao: 'Urbano - Zero Emissões',
    caracteristicas: [
      'Motor síncrono de imã permanente, redução simples',
      'Potência: 64 kW @ 115 kW',
      'Torque: 430 N.m @ 920 N.m',
      'Bateria CATL LFP 81,14 kWh',
      'Autonomia: 220 km',
      'PBT: 6.000 kg | Carga útil: 3.575 kg',
      'Conector CCS2 (AC/DC) | 540V',
      'ABS + ESP + ESC + HSA',
      'Piloto automático e vidro elétrico'
    ],
    cores: ['Branco', 'Azul'],
    cargaUtilCarroceria: '3.575 kg'
  },
  {
    id: 'etoano',
    modelo: 'eTOANO',
    categoria: 'eletrico',
    imagem: etoano,
    capacidade: 'Médio Porte Elétrico',
    cnh: 'C',
    aplicacao: 'Urbano/Regional - Zero Emissões',
    caracteristicas: [
      'Motor elétrico de alta performance',
      'Autonomia de até 300 km',
      'Bateria de lítio de última geração',
      'Sistema de regeneração',
      'Cabine ergonômica',
      'Zero emissões',
      'Garantia de 5 anos bateria'
    ],
    cores: ['Branco', 'Cinza']
  },
  {
    id: 'eaumark-9t',
    modelo: 'eAumark 9T',
    categoria: 'eletrico',
    imagem: eaumark9t,
    capacidade: '9 toneladas',
    cnh: 'C',
    aplicacao: 'Urbano/Regional - Zero Emissões',
    caracteristicas: [
      'Motor Rear e-Axle',
      'Potência: 75 kW @ 150 kW',
      'Torque: 250 N.m @ 560 N.m',
      'Bateria CATL LFP 100,46 kWh',
      'Autonomia: 200 km',
      'PBT: 8.500 kg | Carga útil: 5.550 kg',
      'Conector CCS2 (AC - OBC 22kW / DC) | 540V',
      'ABS + ESC + EBS + EBD + HSA',
      'Câmera e sensor de ré, ePTO, TPMS'
    ],
    cores: ['Branco', 'Verde'],
    cargaUtilCarroceria: '5.550 kg'
  },
  {
    id: 'eaumark-12t',
    modelo: 'eAumark 12T',
    categoria: 'eletrico',
    imagem: eaumark12t,
    capacidade: '12 toneladas',
    cnh: 'C',
    aplicacao: 'Pesado - Zero Emissões',
    caracteristicas: [
      'Motor síncrono de imã permanente',
      'Potência: 135 kW @ 260 kW',
      'Torque: 1.430 N.m @ 2.800 N.m',
      'Bateria CATL LFP 162,28 kWh',
      'Autonomia: 220 km',
      'PBT: 11.500 kg | Carga útil: 7.150 kg',
      'Conector CCS2 (AC - max.22kW / DC - max.108kW) | 540V',
      'ABS + EBD + EPB + AEBS + ESP',
      'Aquecedor para retrovisor, farol de neblina'
    ],
    cores: ['Branco', 'Azul'],
    cargaUtilCarroceria: '7.150 kg'
  },
  {
    id: 'eview',
    modelo: 'eVIEW',
    categoria: 'eletrico',
    imagem: eview,
    capacidade: 'Pesado Elétrico',
    cnh: 'D/E',
    aplicacao: 'Pesado - Zero Emissões',
    caracteristicas: [
      'Motor elétrico de alta potência',
      'Autonomia de até 300 km',
      'Bateria de lítio de última geração',
      'Carregamento ultra-rápido',
      'Tecnologia de ponta',
      'Cabine executiva',
      'Garantia de 5 anos bateria'
    ],
    cores: ['Branco', 'Prata']
  },
  {
    id: 'ev-connect',
    modelo: 'eView Connect',
    categoria: 'eletrico',
    imagem: eview,
    capacidade: 'Van Elétrica',
    cnh: 'B',
    aplicacao: 'Urbano - Zero Emissões',
    caracteristicas: [
      'Motor Síncrono de Imã Permanente',
      'Potência: 170 cv (125 kW)',
      'Torque: 245 Nm',
      'Bateria LFP 50 kWh',
      'Autonomia: 245 km (WLTP) / 202 km (INMETRO)',
      'Volume de carga: 7,2 m³',
      'Conector CCS2 (AC/DC)',
      'Porta traseira com abertura de 270°',
      'Zero emissões'
    ],
    cores: ['Branco', 'Azul Claro']
  },
  // Linha Picapes
  {
    id: 'tunland-v9',
    modelo: 'TUNLAND V9',
    categoria: 'picape',
    imagem: tunlandV9,
    capacidade: 'Picape 4x4',
    cnh: 'B',
    aplicacao: 'Trabalho e Lazer',
    caracteristicas: [
      'Motor Diesel 2.0L Turbo',
      'Potência: 175 cv',
      'Tração 4x4 com reduzida',
      'Transmissão automática 8 marchas',
      'Central multimídia 12"',
      'Câmera 360°',
      'Garantia de 10 anos'
    ],
    cores: ['Branco', 'Preto', 'Prata', 'Cinza']
  },
  {
    id: 'tunland-v7',
    modelo: 'TUNLAND V7',
    categoria: 'picape',
    imagem: tunlandV7,
    capacidade: 'Picape 4x2',
    cnh: 'B',
    aplicacao: 'Trabalho e Mobilidade',
    caracteristicas: [
      'Motor Diesel 2.0L Turbo',
      'Potência: 175 cv',
      'Tração 4x2',
      'Transmissão manual 6 marchas',
      'Central multimídia 10"',
      'Câmera de ré',
      'Garantia de 10 anos'
    ],
    cores: ['Branco', 'Prata', 'Cinza']
  }
];

export const getVeiculoById = (id: string): Veiculo | undefined => {
  return veiculosCatalogo.find(v => v.id === id);
};

export const getVeiculoByModelo = (modelo: string): Veiculo | undefined => {
  return veiculosCatalogo.find(v => v.modelo === modelo);
};
