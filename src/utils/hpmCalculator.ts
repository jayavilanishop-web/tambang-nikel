/**
 * NickelSmart AI - ESDM HPM (Harga Patokan Mineral) Nickel Price & Royalty Calculator
 * Compliant with Kepmen ESDM No 294.K/30/MEM/2020 & Perpres Royalty Regulation
 */

export interface HPMInput {
  hmaUSDPerDMT: number; // Harga Mineral Acuan (e.g. $16,450)
  niGradePercent: number; // e.g. 1.80%
  moisturePercent: number; // e.g. 30.0%
  correctionFactor?: number; // 0.20 for Saprolite, 0.17 for Limonite
  tonnageMT: number; // Volume MT
  usdToIdrRate?: number; // e.g. 16,250 IDR/USD
}

export interface HPMResult {
  hpmPriceUSDPerDMT: number;
  hpmPriceIDRPerMT: number;
  totalGrossValueUSD: number;
  totalGrossValueIDR: number;
  royaltyPnbpPercent: number; // e.g. 10% or 12%
  royaltyPnbpUSD: number;
  royaltyPnbpIDR: number;
  netRevenueUSD: number;
  netRevenueIDR: number;
  isSaprolite: boolean;
}

export function calculateHPM(input: HPMInput): HPMResult {
  const {
    hmaUSDPerDMT,
    niGradePercent,
    moisturePercent,
    tonnageMT,
    usdToIdrRate = 16250
  } = input;

  const isSaprolite = niGradePercent >= 1.5;
  const defaultCF = isSaprolite ? 0.20 : 0.17;
  const cf = input.correctionFactor || defaultCF;

  // Formula: HPM = HMA * %Ni * (1 - MC) * CF
  const niDecimal = niGradePercent / 100;
  const mcDecimal = moisturePercent / 100;

  const hpmPriceUSDPerDMT = hmaUSDPerDMT * niDecimal * (1 - mcDecimal) * cf;
  const hpmPriceIDRPerMT = hpmPriceUSDPerDMT * usdToIdrRate;

  const totalGrossValueUSD = hpmPriceUSDPerDMT * tonnageMT;
  const totalGrossValueIDR = totalGrossValueUSD * usdToIdrRate;

  // Royalty PNBP (Penerimaan Negara Bukan Pajak) for Indonesian Nickel Ore is typically 10% to 12%
  const royaltyPnbpPercent = isSaprolite ? 10.0 : 5.0; // Limonite lower royalty to encourage HPAL battery processing
  const royaltyPnbpUSD = (totalGrossValueUSD * royaltyPnbpPercent) / 100;
  const royaltyPnbpIDR = royaltyPnbpUSD * usdToIdrRate;

  const netRevenueUSD = totalGrossValueUSD - royaltyPnbpUSD;
  const netRevenueIDR = netRevenueUSD * usdToIdrRate;

  return {
    hpmPriceUSDPerDMT: Number(hpmPriceUSDPerDMT.toFixed(2)),
    hpmPriceIDRPerMT: Math.round(hpmPriceIDRPerMT),
    totalGrossValueUSD: Number(totalGrossValueUSD.toFixed(2)),
    totalGrossValueIDR: Math.round(totalGrossValueIDR),
    royaltyPnbpPercent,
    royaltyPnbpUSD: Number(royaltyPnbpUSD.toFixed(2)),
    royaltyPnbpIDR: Math.round(royaltyPnbpIDR),
    netRevenueUSD: Number(netRevenueUSD.toFixed(2)),
    netRevenueIDR: Math.round(netRevenueIDR),
    isSaprolite
  };
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
