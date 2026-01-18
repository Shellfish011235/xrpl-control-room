import type { Regulation, RegulatoryAlert, TimelineEvent } from '../types';

export const regulations: Regulation[] = [
  {
    id: 'eo-14178',
    title: 'Executive Order 14178 - Strengthening American Leadership in Digital Financial Technology',
    jurisdiction: 'US',
    type: 'executive_order',
    status: 'active',
    date: '2025-01-23',
    summary: 'Promotes US crypto leadership, revokes EO 14067, prohibits federal CBDC development, establishes Presidential Working Group on Digital Asset Markets chaired by David Sacks.',
    impact: 'positive',
    impactDescription: 'Removes regulatory uncertainty, signals pro-crypto federal stance, opens path for institutional adoption.',
    source: 'White House',
    sourceUrl: 'https://www.whitehouse.gov/presidential-actions/2025/01/strengthening-american-leadership-in-digital-financial-technology/'
  },
  {
    id: 'genius-act',
    title: 'GENIUS Act - Guiding and Establishing National Innovation for U.S. Stablecoins',
    jurisdiction: 'US',
    type: 'legislation',
    status: 'active',
    date: '2025-07-18',
    summary: 'Comprehensive stablecoin regulation establishing reserve requirements, audit standards, transparency rules, and federal-state dual supervision framework.',
    impact: 'positive',
    impactDescription: 'Provides regulatory clarity for RLUSD and other stablecoins, establishes legitimate path for compliant issuers.',
    source: 'U.S. Congress',
    sourceUrl: 'https://en.wikipedia.org/wiki/GENIUS_Act'
  },
  {
    id: 'sec-ripple-ruling',
    title: 'SEC v. Ripple Labs - Summary Judgment',
    jurisdiction: 'US',
    type: 'ruling',
    status: 'active',
    date: '2023-07-13',
    summary: 'Court ruled XRP is not a security when sold on secondary markets to retail investors. Institutional sales found to be securities offerings.',
    impact: 'positive',
    impactDescription: 'XRP gains regulatory clarity for secondary market trading, enables exchange re-listings and institutional products.',
    source: 'U.S. District Court SDNY',
    sourceUrl: 'https://www.courtlistener.com/docket/17321063/sec-v-ripple-labs-inc/'
  },
  {
    id: 'eo-14067-revoked',
    title: 'Executive Order 14067 - Ensuring Responsible Development of Digital Assets (REVOKED)',
    jurisdiction: 'US',
    type: 'executive_order',
    status: 'revoked',
    date: '2022-03-09',
    summary: 'Biden-era EO directing agencies to study digital assets and CBDC development. Revoked by EO 14178.',
    impact: 'neutral',
    impactDescription: 'Revocation removes potential CBDC competition and associated regulatory burden.',
    source: 'White House (Historical)',
    sourceUrl: 'https://www.whitehouse.gov/briefing-room/presidential-actions/2022/03/09/executive-order-on-ensuring-responsible-development-of-digital-assets/'
  },
  {
    id: 'eu-mica',
    title: 'Markets in Crypto-Assets Regulation (MiCA)',
    jurisdiction: 'EU',
    type: 'legislation',
    status: 'active',
    date: '2024-12-30',
    summary: 'Comprehensive EU framework for crypto-assets including licensing requirements, consumer protection, and stablecoin rules. Full implementation Dec 2024.',
    impact: 'positive',
    impactDescription: 'Harmonized EU rules enable cross-border operations, provides clear compliance path for XRP-related services.',
    source: 'European Parliament',
    sourceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114'
  },
  {
    id: 'uk-fca-crypto',
    title: 'UK Financial Services and Markets Act - Crypto Provisions',
    jurisdiction: 'UK',
    type: 'legislation',
    status: 'active',
    date: '2023-06-29',
    summary: 'Brings crypto-assets under FCA regulatory perimeter. Ripple has engaged with UK authorities on payment system submissions.',
    impact: 'positive',
    impactDescription: 'Clear regulatory framework enables UK market expansion for XRPL-based services.',
    source: 'UK Parliament',
    sourceUrl: 'https://www.legislation.gov.uk/ukpga/2023/29'
  },
  {
    id: 'occ-crypto-custody',
    title: 'OCC Interpretive Letter - Banks May Hold Crypto',
    jurisdiction: 'US',
    type: 'guidance',
    status: 'active',
    date: '2020-07-22',
    summary: 'OCC confirms national banks may provide cryptocurrency custody services to customers.',
    impact: 'positive',
    impactDescription: 'Opens path for traditional banking integration with XRP, enables institutional custody solutions.',
    source: 'Office of the Comptroller of the Currency',
    sourceUrl: 'https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-98.html'
  },
  {
    id: 'bis-cbdc-report-2025',
    title: 'BIS Report: The Rise of CBDCs and DLT in Finance',
    jurisdiction: 'GLOBAL',
    type: 'framework',
    status: 'active',
    date: '2025-06-15',
    summary: '60%+ jurisdictions exploring CBDCs. Report highlights DLT benefits for immutable records, privacy enhancements, and cross-border efficiency.',
    impact: 'neutral',
    impactDescription: 'CBDC development could compete with XRP for cross-border payments, but validates DLT approach.',
    source: 'Bank for International Settlements',
    sourceUrl: 'https://www.bis.org/publ/arpdf/ar2025e.htm'
  },
  {
    id: 'wef-dlt-2025',
    title: 'WEF Report: DLT in Financial Services - Scaled Expectations',
    jurisdiction: 'GLOBAL',
    type: 'framework',
    status: 'active',
    date: '2025-01-10',
    summary: 'WEF scales back expectations for DLT-driven financial overhaul. Notes tokenization value may extend beyond DLT-specific implementations.',
    impact: 'neutral',
    impactDescription: 'Tempered expectations may reduce hype but also reduce unrealistic competition.',
    source: 'World Economic Forum',
    sourceUrl: 'https://www.weforum.org/publications/'
  },
  {
    id: 'doj-crypto-enforcement-2025',
    title: 'DOJ Disbands Cryptocurrency Enforcement Team',
    jurisdiction: 'US',
    type: 'guidance',
    status: 'active',
    date: '2025-04-10',
    summary: 'DOJ shifts away from "regulation by prosecution" toward enforcement against serious criminal misuse only.',
    impact: 'positive',
    impactDescription: 'Reduces regulatory risk for legitimate crypto businesses and developers.',
    source: 'Associated Press / DOJ',
    sourceUrl: 'https://apnews.com/article/cryptocurrency-doj-enforcement'
  }
];

export const regulatoryAlerts: RegulatoryAlert[] = [
  {
    id: 'alert-1',
    title: 'Working Group Report Due in 60 Days',
    severity: 'medium',
    timestamp: '2026-01-15T09:00:00Z',
    summary: 'Presidential Working Group on Digital Assets to submit recommendations for regulatory rescissions and modifications per EO 14178.',
    regulation: regulations.find(r => r.id === 'eo-14178')
  },
  {
    id: 'alert-2',
    title: 'MiCA Full Implementation Active',
    severity: 'low',
    timestamp: '2026-01-02T00:00:00Z',
    summary: 'EU MiCA regulation now fully in effect. All crypto service providers must comply with licensing requirements.',
    regulation: regulations.find(r => r.id === 'eu-mica')
  },
  {
    id: 'alert-3',
    title: 'XRP ETF Performance Review',
    severity: 'low',
    timestamp: '2026-01-10T14:30:00Z',
    summary: 'First quarter review of spot XRP ETF performance and inflow data expected from SEC.',
  }
];

export const regulatoryTimeline: TimelineEvent[] = [
  {
    id: 'reg-2020-occ',
    date: '2020-07-22',
    title: 'OCC: Banks May Hold Crypto',
    description: 'Foundational guidance enabling bank custody of digital assets.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2020-sec-action',
    date: '2020-12-22',
    title: 'SEC Files Suit Against Ripple',
    description: 'SEC alleges XRP is unregistered security, beginning 3-year legal battle.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2022-eo-14067',
    date: '2022-03-09',
    title: 'Biden Signs EO 14067',
    description: 'Executive order directing study of digital assets and CBDC potential.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2023-uk-fsma',
    date: '2023-06-29',
    title: 'UK FSMA Crypto Provisions',
    description: 'UK brings crypto under FCA regulatory scope.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2023-sec-ruling',
    date: '2023-07-13',
    title: 'XRP Not a Security Ruling',
    description: 'District court rules XRP is not a security in programmatic sales.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2024-mica-full',
    date: '2024-12-30',
    title: 'MiCA Full Implementation',
    description: 'EU comprehensive crypto regulation enters full force.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2025-eo-14178',
    date: '2025-01-23',
    title: 'EO 14178: Pro-Crypto Stance',
    description: 'Trump revokes Biden EO, bans federal CBDC, promotes US leadership.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2025-doj-shift',
    date: '2025-04-10',
    title: 'DOJ Disbands Crypto Team',
    description: 'End of regulation by prosecution approach.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2025-genius',
    date: '2025-07-18',
    title: 'GENIUS Act Passes',
    description: 'Comprehensive US stablecoin regulation becomes law.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'reg-2025-xrp-etf',
    date: '2025-10-15',
    title: 'Spot XRP ETFs Approved',
    description: 'SEC approves first spot XRP exchange-traded funds.',
    category: 'regulatory',
    significance: 'major'
  }
];

export const jurisdictionComparison = [
  {
    jurisdiction: 'United States',
    flag: '🇺🇸',
    overallStance: 'Favorable',
    xrpStatus: 'Not a security (secondary)',
    stablecoinRules: 'GENIUS Act (2025)',
    etfStatus: 'Approved',
    keyAgencies: 'SEC, CFTC, OCC, FinCEN',
    notes: 'Pro-crypto EO 14178, Working Group active'
  },
  {
    jurisdiction: 'European Union',
    flag: '🇪🇺',
    overallStance: 'Regulated',
    xrpStatus: 'Regulated asset',
    stablecoinRules: 'MiCA (2024)',
    etfStatus: 'ETNs available',
    keyAgencies: 'ESMA, National authorities',
    notes: 'Harmonized framework, Luxembourg hub'
  },
  {
    jurisdiction: 'United Kingdom',
    flag: '🇬🇧',
    overallStance: 'Developing',
    xrpStatus: 'Not specified',
    stablecoinRules: 'In development',
    etfStatus: 'Not approved',
    keyAgencies: 'FCA, Bank of England',
    notes: 'Ripple engaged on payment submissions'
  },
  {
    jurisdiction: 'Japan',
    flag: '🇯🇵',
    overallStance: 'Favorable',
    xrpStatus: 'Regulated crypto-asset',
    stablecoinRules: 'PSA regulated',
    etfStatus: 'Not approved',
    keyAgencies: 'JFSA',
    notes: 'SBI partnership, active market'
  },
  {
    jurisdiction: 'Singapore',
    flag: '🇸🇬',
    overallStance: 'Favorable',
    xrpStatus: 'Digital payment token',
    stablecoinRules: 'MAS regulated',
    etfStatus: 'Not approved',
    keyAgencies: 'MAS',
    notes: 'Ripple APAC headquarters'
  },
  {
    jurisdiction: 'UAE',
    flag: '🇦🇪',
    overallStance: 'Very Favorable',
    xrpStatus: 'Permitted',
    stablecoinRules: 'CBUAE framework',
    etfStatus: 'In development',
    keyAgencies: 'SCA, VARA, ADGM',
    notes: 'Dubai crypto hub status'
  }
];
