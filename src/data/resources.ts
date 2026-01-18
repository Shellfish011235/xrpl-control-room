import type { Resource } from '../types';

export const resources: Resource[] = [
  // GitHub Resources
  {
    id: 'gh-rippled',
    type: 'github',
    title: 'XRPLF/rippled',
    url: 'https://github.com/XRPLF/rippled',
    description: 'Core peer-to-peer server that manages the XRP Ledger',
    category: 'Core Infrastructure',
    lastUpdated: '2026-01-13'
  },
  {
    id: 'gh-xrpl-js',
    type: 'github',
    title: 'XRPLF/xrpl.js',
    url: 'https://github.com/XRPLF/xrpl.js',
    description: 'JavaScript/TypeScript library for XRPL development',
    category: 'SDK',
    lastUpdated: '2026-01-16'
  },
  {
    id: 'gh-xrpl-py',
    type: 'github',
    title: 'XRPLF/xrpl-py',
    url: 'https://github.com/XRPLF/xrpl-py',
    description: 'Python library for XRP Ledger interaction',
    category: 'SDK',
    lastUpdated: '2026-01-15'
  },
  {
    id: 'gh-xrpl4j',
    type: 'github',
    title: 'XRPLF/xrpl4j',
    url: 'https://github.com/XRPLF/xrpl4j',
    description: 'Java SDK for enterprise XRPL applications',
    category: 'SDK',
    lastUpdated: '2026-01-10'
  },
  {
    id: 'gh-dev-portal',
    type: 'github',
    title: 'XRPLF/xrpl-dev-portal',
    url: 'https://github.com/XRPLF/xrpl-dev-portal',
    description: 'Official documentation and tutorials',
    category: 'Documentation',
    lastUpdated: '2026-01-17'
  },
  {
    id: 'gh-standards',
    type: 'github',
    title: 'XRPLF/XRPL-Standards',
    url: 'https://github.com/XRPLF/XRPL-Standards',
    description: 'Community standards proposals (XLS)',
    category: 'Governance',
    lastUpdated: '2026-01-14'
  },
  {
    id: 'gh-awesome',
    type: 'github',
    title: 'xrplf/awesome-xrpl',
    url: 'https://github.com/xrplf/awesome-xrpl',
    description: 'Curated list of XRPL resources and tools',
    category: 'Resources',
    lastUpdated: '2026-01-12'
  },
  {
    id: 'gh-hooks',
    type: 'github',
    title: 'XRPL-Labs/xrpld-hooks',
    url: 'https://github.com/XRPL-Labs/xrpld-hooks',
    description: 'Hooks smart contract implementation',
    category: 'Smart Contracts',
    lastUpdated: '2026-01-08'
  },
  {
    id: 'gh-evm-node',
    type: 'github',
    title: 'xrplevm/node',
    url: 'https://github.com/xrplevm/node',
    description: 'XRPL EVM Sidechain node implementation',
    category: 'EVM Sidechain',
    lastUpdated: '2026-01-16'
  },
  {
    id: 'gh-evm-governance',
    type: 'github',
    title: 'xrplevm/governance',
    url: 'https://github.com/xrplevm/governance',
    description: 'EVM Sidechain governance and proposals',
    category: 'EVM Sidechain',
    lastUpdated: '2026-01-14'
  },
  
  // Reddit Resources
  {
    id: 'reddit-xrp',
    type: 'reddit',
    title: 'r/XRP',
    url: 'https://reddit.com/r/XRP',
    description: 'Fan discussions, XRPL usage, market talk',
    category: 'Community'
  },
  {
    id: 'reddit-ripple',
    type: 'reddit',
    title: 'r/Ripple',
    url: 'https://reddit.com/r/Ripple',
    description: 'Payments focus, institutional news, Ripple company updates',
    category: 'Community'
  },
  {
    id: 'reddit-xrpl-dev',
    type: 'reddit',
    title: 'r/XRPLDev',
    url: 'https://reddit.com/r/XRPLDev',
    description: 'Developer discussions, technical help, project showcases',
    category: 'Development'
  },
  
  // YouTube Resources
  {
    id: 'yt-jtxrp',
    type: 'youtube',
    title: 'JTXRP',
    url: 'https://youtube.com/@JTXRP',
    description: 'Tutorials: wallets, DEX trading, technical setup guides',
    category: 'Tutorials'
  },
  {
    id: 'yt-digitalasset',
    type: 'youtube',
    title: 'Digital Asset Investor',
    url: 'https://youtube.com/@digitalassetinvestor',
    description: 'News analysis, regulatory updates, market commentary',
    category: 'News'
  },
  {
    id: 'yt-workingmoney',
    type: 'youtube',
    title: 'Working Money Channel',
    url: 'https://youtube.com/@WorkingMoneyChannel',
    description: 'Technical analysis, price discussion, market updates',
    category: 'Analysis'
  },
  {
    id: 'yt-xrpl-bootcamp',
    type: 'youtube',
    title: 'XRPL Developer Bootcamp',
    url: 'https://www.youtube.com/playlist?list=PLvZiQj7dQvULPl2NLmOQSI0PYX_1xmV_2',
    description: 'Official development tutorials and workshops',
    category: 'Development'
  },
  
  // Document Resources
  {
    id: 'doc-xrpl-org',
    type: 'document',
    title: 'XRPL.org Documentation',
    url: 'https://xrpl.org/docs.html',
    description: 'Official protocol documentation and references',
    category: 'Documentation'
  },
  {
    id: 'doc-ripple-insights',
    type: 'document',
    title: 'Ripple Insights',
    url: 'https://ripple.com/insights',
    description: 'Company blog with product updates and market analysis',
    category: 'News'
  },
  {
    id: 'doc-xrplevm',
    type: 'document',
    title: 'XRPL EVM Documentation',
    url: 'https://docs.xrplevm.org',
    description: 'EVM Sidechain developer documentation',
    category: 'EVM Sidechain'
  },
  
  // Tools
  {
    id: 'tool-xrpscan',
    type: 'tool',
    title: 'XRPScan',
    url: 'https://xrpscan.com',
    description: 'Block explorer and network analytics',
    category: 'Explorer'
  },
  {
    id: 'tool-bithomp',
    type: 'tool',
    title: 'Bithomp',
    url: 'https://bithomp.com',
    description: 'Explorer with rich account analytics',
    category: 'Explorer'
  },
  {
    id: 'tool-xaman',
    type: 'tool',
    title: 'Xaman Wallet',
    url: 'https://xaman.app',
    description: 'Primary mobile wallet for XRPL (formerly XUMM)',
    category: 'Wallet'
  },
  {
    id: 'tool-sologenic',
    type: 'tool',
    title: 'Sologenic DEX',
    url: 'https://sologenic.org',
    description: 'Decentralized exchange on XRPL',
    category: 'DEX'
  },
  {
    id: 'tool-xrpl-services',
    type: 'tool',
    title: 'XRPL Services',
    url: 'https://xrpl.services',
    description: 'Faucet, tools, and testnet utilities',
    category: 'Developer Tools'
  }
];

export const blackrockDocs = {
  title: 'BlackRock & Institutional Perspective',
  description: 'Overview of BlackRock\'s stance on crypto and DLT, including relevant reports and products.',
  items: [
    {
      title: 'iShares Blockchain and Tech ETF (IBLC)',
      type: 'Product',
      description: 'Exposure to blockchain technology companies. Does not directly hold XRP but provides DLT sector exposure.',
      url: 'https://www.ishares.com/us/products/blockchain-etf',
      xrpRelevance: 'Indirect - blockchain sector exposure'
    },
    {
      title: 'Digital Assets Research Reports',
      type: 'Research',
      description: 'BlackRock research on stablecoins positioning Ethereum as settlement standard, analysis of tokenization trends.',
      url: 'https://www.blackrock.com/corporate/insights',
      xrpRelevance: 'Indirect - discusses stablecoins and settlement'
    },
    {
      title: 'Tokenization Outlook',
      type: 'Report',
      description: 'Larry Fink has spoken positively about tokenization of assets. BlackRock views this as a major trend.',
      xrpRelevance: 'XRPL native tokenization capabilities align with this thesis'
    }
  ],
  speculation: {
    title: 'Unconfirmed Speculation',
    items: [
      'BlackRock XRP ETF filing - No confirmed evidence as of Jan 2026',
      'BlackRock XRP accumulation - Unsubstantiated claims circulating on social media',
      'Ripple-BlackRock partnership - No official announcement'
    ],
    disclaimer: 'These claims appear periodically on social media but lack official confirmation. Treat with appropriate skepticism.'
  }
};

export const guidedPathsResources = [
  {
    id: 'explore-reddit',
    title: 'Explore Reddit Communities',
    description: 'Navigate the XRPL Reddit ecosystem effectively',
    steps: [
      {
        id: 'step-1',
        title: 'Join r/XRP',
        description: 'Subscribe to the main community for general discussions',
        completed: false
      },
      {
        id: 'step-2',
        title: 'Join r/Ripple',
        description: 'Follow for payments-focused and institutional news',
        completed: false
      },
      {
        id: 'step-3',
        title: 'Join r/XRPLDev',
        description: 'Connect with developers and find technical discussions',
        completed: false
      },
      {
        id: 'step-4',
        title: 'Set Up Custom Feed',
        description: 'Create a multi-reddit for all XRPL communities',
        completed: false
      }
    ],
    category: 'resources' as const
  },
  {
    id: 'setup-dev-env',
    title: 'Set Up Development Environment',
    description: 'Get started building on XRPL',
    steps: [
      {
        id: 'step-1',
        title: 'Clone xrpl.js',
        description: 'Get the JavaScript SDK from GitHub',
        completed: false
      },
      {
        id: 'step-2',
        title: 'Get Testnet XRP',
        description: 'Use the faucet at xrpl.org/faucet',
        completed: false
      },
      {
        id: 'step-3',
        title: 'Run First Transaction',
        description: 'Send testnet XRP using the SDK',
        completed: false
      },
      {
        id: 'step-4',
        title: 'Explore Dev Portal',
        description: 'Review tutorials and code samples',
        completed: false
      }
    ],
    category: 'resources' as const
  }
];

export const resourceCategories = [
  { id: 'all', label: 'All Resources', count: resources.length },
  { id: 'github', label: 'GitHub', count: resources.filter(r => r.type === 'github').length },
  { id: 'reddit', label: 'Reddit', count: resources.filter(r => r.type === 'reddit').length },
  { id: 'youtube', label: 'YouTube', count: resources.filter(r => r.type === 'youtube').length },
  { id: 'document', label: 'Documentation', count: resources.filter(r => r.type === 'document').length },
  { id: 'tool', label: 'Tools', count: resources.filter(r => r.type === 'tool').length }
];
