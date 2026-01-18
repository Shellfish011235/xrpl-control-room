import type { Contributor, Repository, TimelineEvent } from '../types';

export const contributors: Contributor[] = [
  {
    id: 'msvadari',
    handle: '@msvadari',
    name: 'Mayukha Vadari',
    role: 'Software Engineer - XRPL Core',
    organization: 'Ripple',
    contributions: [
      'XRPL protocol improvements',
      'Core feature development',
      'AMM implementation work',
      'Developer tooling'
    ],
    twitter: 'https://twitter.com/msvadari',
    github: 'https://github.com/mvadari'
  },
  {
    id: 'wietswind',
    handle: '@WietseWind',
    name: 'Wietse Wind',
    role: 'Founder & Lead Developer',
    organization: 'XRPL Labs',
    contributions: [
      'Hooks smart contracts architect',
      'Xaman (XUMM) wallet creator',
      'XRP Tip Bot',
      'XRPL tooling ecosystem'
    ],
    twitter: 'https://twitter.com/WietseWind',
    github: 'https://github.com/WietseWind'
  },
  {
    id: 'warpaul',
    handle: '@warpaul',
    name: 'Warren Paul Anderson',
    role: 'OG Developer & Builder',
    organization: 'Exocore',
    contributions: [
      'Early Ripple engineering',
      'Exocore platform development',
      'XRPL infrastructure',
      'Community education'
    ],
    twitter: 'https://twitter.com/warpaul'
  },
  {
    id: 'wkahneman',
    handle: '@WKahneman',
    name: 'WrathofKahneman',
    role: 'Community Leader',
    contributions: [
      'Long-term community advocacy',
      'Governance discussions',
      'Amendment proposals support',
      'Educational content'
    ],
    twitter: 'https://twitter.com/WKahneman'
  },
  {
    id: 'bankxrp',
    handle: '@BankXRP',
    name: 'BankXRP',
    role: 'News & Archive Curator',
    contributions: [
      'XRPL news archival',
      'Historical documentation',
      'Community announcements',
      'Information dissemination'
    ],
    twitter: 'https://twitter.com/BankXRP'
  },
  {
    id: 'xrpmickle',
    handle: '@xrpmickle',
    name: 'XRP Mickle',
    role: 'Community Contributor',
    contributions: [
      'Community engagement',
      'Technical discussions',
      'Builder support'
    ],
    twitter: 'https://twitter.com/xrpmickle'
  },
  {
    id: 'sentosumosaba',
    handle: '@sentosumosaba',
    name: 'Sentosumosaba',
    role: 'Developer & Analyst',
    contributions: [
      'Technical analysis',
      'Development contributions',
      'Community building'
    ],
    twitter: 'https://twitter.com/sentosumosaba'
  },
  {
    id: 'johnnykrypto',
    handle: '@johnnykrypto00',
    name: 'Johnny Krypto',
    role: 'Content Creator',
    contributions: [
      'Educational content',
      'News coverage',
      'Community outreach'
    ],
    twitter: 'https://twitter.com/johnnykrypto00'
  },
  {
    id: 'ximinez',
    handle: '@ximinez',
    name: 'ximinez',
    role: 'Core Developer',
    organization: 'Ripple',
    contributions: [
      'rippled core development',
      'Release management',
      'Protocol improvements'
    ],
    github: 'https://github.com/ximinez'
  },
  {
    id: 'bthomee',
    handle: '@bthomee',
    name: 'B Thomee',
    role: 'Core Developer',
    organization: 'Ripple',
    contributions: [
      'rippled development',
      'Code review',
      'Feature implementation'
    ],
    github: 'https://github.com/bthomee'
  }
];

export const repositories: Repository[] = [
  {
    id: 'rippled',
    name: 'rippled',
    fullName: 'XRPLF/rippled',
    description: 'The core peer-to-peer server that manages the XRP Ledger. Implements consensus, transaction processing, and maintains validator operations.',
    url: 'https://github.com/XRPLF/rippled',
    stars: 4500,
    forks: 1400,
    contributors: 145,
    license: 'ISC',
    language: 'C++',
    lastCommit: '2026-01-13',
    topics: ['xrpl', 'blockchain', 'consensus', 'cryptocurrency']
  },
  {
    id: 'xrpl-dev-portal',
    name: 'xrpl-dev-portal',
    fullName: 'XRPLF/xrpl-dev-portal',
    description: 'Official documentation and developer resources for building on the XRP Ledger.',
    url: 'https://github.com/XRPLF/xrpl-dev-portal',
    stars: 520,
    forks: 890,
    contributors: 210,
    license: 'MIT',
    language: 'TypeScript',
    lastCommit: '2026-01-17',
    topics: ['documentation', 'xrpl', 'tutorials']
  },
  {
    id: 'xrpl-py',
    name: 'xrpl-py',
    fullName: 'XRPLF/xrpl-py',
    description: 'Python library for interacting with the XRP Ledger. Full-featured SDK with async support.',
    url: 'https://github.com/XRPLF/xrpl-py',
    stars: 280,
    forks: 130,
    contributors: 45,
    license: 'ISC',
    language: 'Python',
    lastCommit: '2026-01-15',
    topics: ['python', 'sdk', 'xrpl', 'library']
  },
  {
    id: 'xrpl-js',
    name: 'xrpl.js',
    fullName: 'XRPLF/xrpl.js',
    description: 'JavaScript/TypeScript library for XRPL. Most popular SDK for web and Node.js applications.',
    url: 'https://github.com/XRPLF/xrpl.js',
    stars: 1200,
    forks: 520,
    contributors: 98,
    license: 'ISC',
    language: 'TypeScript',
    lastCommit: '2026-01-16',
    topics: ['javascript', 'typescript', 'sdk', 'xrpl']
  },
  {
    id: 'xrpl4j',
    name: 'xrpl4j',
    fullName: 'XRPLF/xrpl4j',
    description: 'Java SDK for the XRP Ledger. Enterprise-grade library with full protocol support.',
    url: 'https://github.com/XRPLF/xrpl4j',
    stars: 95,
    forks: 65,
    contributors: 22,
    license: 'ISC',
    language: 'Java',
    lastCommit: '2026-01-10',
    topics: ['java', 'sdk', 'xrpl', 'enterprise']
  },
  {
    id: 'xrpl-standards',
    name: 'XRPL-Standards',
    fullName: 'XRPLF/XRPL-Standards',
    description: 'Community standards proposals (XLS) for XRPL features and improvements. Approaching 100 proposals.',
    url: 'https://github.com/XRPLF/XRPL-Standards',
    stars: 85,
    forks: 110,
    contributors: 78,
    license: 'CC0-1.0',
    language: 'Markdown',
    lastCommit: '2026-01-14',
    topics: ['standards', 'proposals', 'governance', 'xrpl']
  },
  {
    id: 'xrplevm-node',
    name: 'node',
    fullName: 'xrplevm/node',
    description: 'XRPL EVM Sidechain node implementation. Cosmos SDK-based with full EVM compatibility.',
    url: 'https://github.com/xrplevm/node',
    stars: 145,
    forks: 48,
    contributors: 18,
    license: 'Apache-2.0',
    language: 'Go',
    lastCommit: '2026-01-16',
    topics: ['evm', 'sidechain', 'cosmos', 'xrpl']
  },
  {
    id: 'awesome-xrpl',
    name: 'awesome-xrpl',
    fullName: 'xrplf/awesome-xrpl',
    description: 'Curated list of XRPL resources, tools, libraries, and applications.',
    url: 'https://github.com/xrplf/awesome-xrpl',
    stars: 220,
    forks: 85,
    contributors: 42,
    license: 'CC0-1.0',
    language: 'Markdown',
    lastCommit: '2026-01-12',
    topics: ['awesome-list', 'resources', 'xrpl']
  },
  {
    id: 'hooks',
    name: 'xrpld-hooks',
    fullName: 'XRPL-Labs/xrpld-hooks',
    description: 'Hooks amendment implementation - smart contract functionality for XRPL.',
    url: 'https://github.com/XRPL-Labs/xrpld-hooks',
    stars: 180,
    forks: 45,
    contributors: 12,
    license: 'ISC',
    language: 'C++',
    lastCommit: '2026-01-08',
    topics: ['hooks', 'smart-contracts', 'xrpl']
  }
];

export const communityTimeline: TimelineEvent[] = [
  {
    id: 'evm-mainnet-2025',
    date: '2025-06-30',
    title: 'XRPL EVM Sidechain Mainnet Launch',
    description: 'Full EVM compatibility brought to XRPL ecosystem with XRP as gas token.',
    category: 'technical',
    significance: 'major'
  },
  {
    id: 'rlusd-1b-2025',
    date: '2025-11-03',
    title: 'RLUSD Surpasses $1B Market Cap',
    description: 'Ripple\'s stablecoin reaches major milestone with 1278% YTD growth.',
    category: 'market',
    significance: 'major'
  },
  {
    id: 'genius-act-2025',
    date: '2025-07-18',
    title: 'GENIUS Act Becomes Law',
    description: 'Comprehensive stablecoin regulation establishes federal-state dual supervision.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'eo-14178-2025',
    date: '2025-01-23',
    title: 'Executive Order 14178 Signed',
    description: 'Trump EO promotes US crypto leadership, revokes Biden\'s EO 14067, bans CBDCs.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'xrp-etf-approval-2025',
    date: '2025-10-15',
    title: 'First Spot XRP ETFs Approved',
    description: 'SEC approves multiple spot XRP ETFs including Franklin, Grayscale, and Bitwise.',
    category: 'market',
    significance: 'major'
  },
  {
    id: 'hooks-testnet-2024',
    date: '2024-08-15',
    title: 'Hooks Amendment Testnet',
    description: 'Smart contract functionality enters public testing phase.',
    category: 'technical',
    significance: 'major'
  },
  {
    id: 'ripple-sec-ruling-2023',
    date: '2023-07-13',
    title: 'SEC vs Ripple Partial Ruling',
    description: 'Court rules XRP is not a security in secondary market sales.',
    category: 'regulatory',
    significance: 'major'
  },
  {
    id: 'xrpl-commons-2023',
    date: '2023-03-01',
    title: 'XRPL Commons Foundation',
    description: 'Non-profit organization launched to empower XRPL community projects.',
    category: 'community',
    significance: 'major'
  },
  {
    id: 'amm-live-2024',
    date: '2024-03-22',
    title: 'AMM Goes Live on Mainnet',
    description: 'Automated Market Maker functionality activated via amendment.',
    category: 'technical',
    significance: 'major'
  },
  {
    id: 'xls-approaching-100',
    date: '2026-01-10',
    title: 'XLS Proposals Near 100',
    description: 'XRPL Standards repository approaches 100 community proposals.',
    category: 'community',
    significance: 'minor'
  }
];

export const communityStats = {
  totalContributors: 500,
  activeAddresses: 1200000, // Down 80% from Dec 2025 peak
  peakAddresses: 6000000,
  githubStars: 7000,
  discordMembers: 45000,
  xlsProposals: 97,
  validators: 150,
  hackathonsHosted: 24
};
