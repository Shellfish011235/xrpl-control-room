import type { Stablecoin, ETF, ETFInflow } from '../types';

export const stablecoins: Stablecoin[] = [
  {
    id: 'rlusd',
    symbol: 'RLUSD',
    name: 'Ripple USD',
    issuer: 'Ripple',
    marketCap: 1400000000, // $1.4B
    chains: ['XRPL', 'Ethereum'],
    peg: '1:1 USD',
    reserves: '100% backed by USD deposits, short-term US Treasuries',
    auditUrl: 'https://ripple.com/rlusd'
  },
  {
    id: 'usdt-xrpl',
    symbol: 'USDT',
    name: 'Tether (XRPL)',
    issuer: 'Tether',
    marketCap: 45000000, // XRPL portion
    chains: ['XRPL', 'Ethereum', 'Tron', 'Others'],
    peg: '1:1 USD',
    reserves: 'Cash, Treasuries, other assets'
  }
];

export const rlusdDetails = {
  launchDate: '2024-12-17',
  description: 'RLUSD is Ripple\'s USD-pegged stablecoin, designed for enterprise payments and DeFi applications. It operates on both XRPL and Ethereum networks.',
  marketCapHistory: [
    { date: '2024-12-17', value: 0 },
    { date: '2025-01-01', value: 50000000 },
    { date: '2025-03-31', value: 244200000 },
    { date: '2025-06-30', value: 500000000 },
    { date: '2025-09-30', value: 800000000 },
    { date: '2025-11-03', value: 1000000000 },
    { date: '2026-01-01', value: 1400000000 }
  ],
  chainDistribution: {
    ethereum: 80,
    xrpl: 20
  },
  useCases: [
    'Cross-border payments settlement',
    'DeFi collateral',
    'Trading pair liquidity',
    'Treasury management',
    'Remittances'
  ],
  integrations: [
    { name: 'LMAX', type: 'Exchange', investment: 150000000 },
    { name: 'Bitstamp', type: 'Exchange', investment: null },
    { name: 'Uphold', type: 'Exchange', investment: null },
    { name: 'MoonPay', type: 'On-ramp', investment: null }
  ],
  complianceNotes: 'RLUSD is designed to comply with the GENIUS Act requirements including reserve audits, transparency reports, and regulatory oversight.',
  xrpImpact: 'RLUSD provides liquidity for XRPL markets and can be used in AMM pools alongside XRP. While it may substitute XRP in some payment flows, it also brings new users and liquidity to the ecosystem.'
};

export const etfs: ETF[] = [
  {
    id: 'franklin-xrpz',
    ticker: 'XRPZ',
    name: 'Franklin XRP Trust',
    issuer: 'Franklin Templeton',
    approvalDate: '2025-10-15',
    aum: 450000000,
    dailyVolume: 12500000,
    expense: 0.19,
    price: 48.52,
    change24h: 2.3
  },
  {
    id: 'grayscale-gxrp',
    ticker: 'GXRP',
    name: 'Grayscale XRP Trust',
    issuer: 'Grayscale',
    approvalDate: '2025-10-15',
    aum: 380000000,
    dailyVolume: 9800000,
    expense: 0.25,
    price: 42.18,
    change24h: 2.1
  },
  {
    id: 'bitwise-xrp',
    ticker: 'BXRP',
    name: 'Bitwise XRP Fund',
    issuer: 'Bitwise',
    approvalDate: '2025-10-15',
    aum: 220000000,
    dailyVolume: 5400000,
    expense: 0.20,
    price: 38.75,
    change24h: 1.9
  },
  {
    id: 'roundhill-xrp',
    ticker: 'RXRP',
    name: 'Roundhill XRP ETF',
    issuer: 'Roundhill Investments',
    approvalDate: '2025-10-20',
    aum: 85000000,
    dailyVolume: 2100000,
    expense: 0.25,
    price: 25.30,
    change24h: 2.5
  }
];

export const etfInflows: ETFInflow[] = [
  { date: '2025-10-15', amount: 0, cumulative: 0 },
  { date: '2025-10-18', amount: 45000000, cumulative: 45000000 },
  { date: '2025-10-25', amount: 78000000, cumulative: 123000000 },
  { date: '2025-11-01', amount: 52000000, cumulative: 175000000 },
  { date: '2025-11-08', amount: 89000000, cumulative: 264000000 },
  { date: '2025-11-15', amount: 120000000, cumulative: 384000000 },
  { date: '2025-11-22', amount: 95000000, cumulative: 479000000 },
  { date: '2025-11-29', amount: 110000000, cumulative: 589000000 },
  { date: '2025-12-06', amount: 85000000, cumulative: 674000000 },
  { date: '2025-12-13', amount: 72000000, cumulative: 746000000 },
  { date: '2025-12-20', amount: 145000000, cumulative: 891000000 },
  { date: '2025-12-27', amount: 68000000, cumulative: 959000000 },
  { date: '2026-01-03', amount: 95000000, cumulative: 1054000000 },
  { date: '2026-01-06', amount: 19100000, cumulative: 1073100000 },
  { date: '2026-01-10', amount: 42000000, cumulative: 1115100000 },
  { date: '2026-01-17', amount: 35000000, cumulative: 1150100000 }
];

export const etfStats = {
  totalAum: 1135000000, // Sum of all ETFs
  totalDailyVolume: 29800000,
  avgExpenseRatio: 0.22,
  inflowsJan6: 19100000,
  priceTarget2028: 12.00,
  analystConsensus: 'Bullish',
  institutionalInterest: 'High - multiple pension funds and RIAs adding exposure'
};

export const priceProjections = [
  { source: 'Standard Chartered', target: 12.00, timeframe: '2028', confidence: 'Medium' },
  { source: 'Bloomberg Intelligence', target: 5.50, timeframe: '2026 EOY', confidence: 'Medium' },
  { source: 'JPMorgan (leaked)', target: 8.00, timeframe: '2027', confidence: 'Low' },
];

export const stablecoinComparison = [
  {
    metric: 'Market Cap',
    rlusd: '$1.4B',
    usdc: '$45B',
    usdt: '$140B',
    notes: 'RLUSD fastest growing in 2025'
  },
  {
    metric: 'Chains',
    rlusd: 'XRPL, Ethereum',
    usdc: '15+ chains',
    usdt: '20+ chains',
    notes: 'RLUSD focused on enterprise use cases'
  },
  {
    metric: 'Reserves',
    rlusd: '100% USD/Treasuries',
    usdc: '100% Cash/Treasuries',
    usdt: 'Mixed assets',
    notes: 'RLUSD designed for GENIUS Act compliance'
  },
  {
    metric: 'Audit Frequency',
    rlusd: 'Monthly',
    usdc: 'Monthly',
    usdt: 'Quarterly',
    notes: 'Transparency varies'
  },
  {
    metric: 'Enterprise Focus',
    rlusd: 'Primary',
    usdc: 'Secondary',
    usdt: 'Retail',
    notes: 'RLUSD targeting institutional adoption'
  }
];
