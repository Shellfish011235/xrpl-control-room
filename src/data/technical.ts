import type { NetworkStats, EVMToken } from '../types';

export const networkComparison = [
  {
    feature: 'Consensus',
    xrplMainnet: 'Federated Byzantine Agreement (UNL)',
    evmSidechain: 'CometBFT (Tendermint)',
    notes: 'Both achieve finality without mining'
  },
  {
    feature: 'Block Time',
    xrplMainnet: '3-5 seconds',
    evmSidechain: '3-5 seconds',
    notes: 'Comparable speed'
  },
  {
    feature: 'TPS',
    xrplMainnet: '1,500+',
    evmSidechain: '1,000+',
    notes: 'High throughput on both'
  },
  {
    feature: 'Transaction Fee',
    xrplMainnet: '~0.00001 XRP',
    evmSidechain: '<$0.01 (XRP gas)',
    notes: 'Extremely low cost'
  },
  {
    feature: 'Smart Contracts',
    xrplMainnet: 'Hooks (planned)',
    evmSidechain: 'Full EVM (Solidity)',
    notes: 'Different programming models'
  },
  {
    feature: 'Native Token',
    xrplMainnet: 'XRP',
    evmSidechain: 'XRP (bridged)',
    notes: 'XRP used for gas on sidechain'
  },
  {
    feature: 'DEX',
    xrplMainnet: 'Built-in orderbook + AMM',
    evmSidechain: 'Uniswap-style DEXes',
    notes: 'Native vs deployed'
  },
  {
    feature: 'NFTs',
    xrplMainnet: 'XLS-20 native NFTs',
    evmSidechain: 'ERC-721/1155',
    notes: 'Both fully supported'
  },
  {
    feature: 'Bridge',
    xrplMainnet: 'Sidechain bridge',
    evmSidechain: 'Axelar integration',
    notes: 'Cross-chain via Axelar'
  },
  {
    feature: 'Tooling',
    xrplMainnet: 'xrpl.js, xrpl-py, xrpl4j',
    evmSidechain: 'MetaMask, Hardhat, ethers.js',
    notes: 'Mature ecosystems'
  }
];

export const networkStats: NetworkStats[] = [
  {
    id: 'xrpl-mainnet',
    network: 'xrpl_mainnet',
    tps: 1500,
    avgFee: '0.00001 XRP',
    blockTime: '3-4 sec',
    validators: 150,
    totalAccounts: 5200000,
    totalTransactions: 2800000000,
    lastUpdated: '2026-01-18T10:00:00Z'
  },
  {
    id: 'evm-sidechain',
    network: 'evm_sidechain',
    tps: 1000,
    avgFee: '<$0.01',
    blockTime: '3-5 sec',
    validators: 21,
    totalAccounts: 17000,
    totalTransactions: 450000,
    lastUpdated: '2026-01-18T10:00:00Z'
  }
];

export const evmSidechainInfo = {
  launchDate: '2025-06-30',
  description: 'XRPL EVM Sidechain brings full Ethereum Virtual Machine compatibility to the XRP Ledger ecosystem, enabling Solidity smart contracts while using XRP as the native gas token.',
  keyFeatures: [
    {
      title: 'Full EVM Compatibility',
      description: 'Deploy Solidity contracts, use existing Ethereum tooling (MetaMask, Hardhat, Truffle)'
    },
    {
      title: 'XRP as Gas',
      description: 'Native XRP used for transaction fees, creating utility demand'
    },
    {
      title: 'Cosmos SDK Base',
      description: 'Built on Cosmos SDK with CometBFT consensus for high throughput'
    },
    {
      title: 'Axelar Bridge',
      description: 'Cross-chain interoperability via Axelar for asset transfers'
    },
    {
      title: 'QuickNode Support',
      description: 'Enterprise-grade RPC endpoints available via QuickNode'
    }
  ],
  metrics: {
    uniqueWallets: 17000,
    tokensDeployed: 160,
    tvl: 12500000,
    dailyTransactions: 15000
  }
};

export const evmTokens: EVMToken[] = [
  {
    symbol: 'WXRP',
    name: 'Wrapped XRP',
    address: '0x...',
    totalSupply: '5,000,000',
    holders: 8500
  },
  {
    symbol: 'RLUSD',
    name: 'Ripple USD',
    address: '0x...',
    totalSupply: '200,000,000',
    holders: 3200
  },
  {
    symbol: 'USDC',
    name: 'USD Coin (Bridged)',
    address: '0x...',
    totalSupply: '15,000,000',
    holders: 1800
  }
];

export const ilpInfo = {
  name: 'Interledger Protocol',
  tagline: 'An open protocol suite for sending payments across different ledgers',
  description: 'ILP is an open-source protocol developed by Ripple that enables interoperability between different payment networks and ledgers. It uses a packet-based architecture similar to the internet to route value across networks.',
  keyFeatures: [
    {
      title: 'Ledger Agnostic',
      description: 'Works across any ledger type: blockchain, traditional banking, mobile money'
    },
    {
      title: 'No Double Spending',
      description: 'Cryptographic escrow prevents double-spending without requiring trust'
    },
    {
      title: 'Fast Settlement',
      description: 'Sub-second settlement possible depending on underlying ledgers'
    },
    {
      title: 'No Central Authority',
      description: 'Decentralized network of connectors, no single point of control'
    },
    {
      title: 'CBDC Compatible',
      description: 'Potential to bridge CBDCs across jurisdictions'
    }
  ],
  useCases: [
    'Cross-border payments',
    'Micropayments and streaming payments',
    'CBDC interoperability',
    'Web monetization',
    'IoT payments'
  ],
  resources: [
    { title: 'Interledger.org', url: 'https://interledger.org' },
    { title: 'ILP Specification', url: 'https://interledger.org/rfcs/' },
    { title: 'Web Monetization', url: 'https://webmonetization.org' }
  ],
  redditDebates: [
    'ILP vs XRPL: Some argue ILP makes XRP unnecessary, others note XRP provides liquidity for ILP routes',
    'CBDC Bridge: Discussion on ILP as neutral infrastructure for connecting national CBDCs',
    'Adoption challenges: Technical complexity vs traditional correspondent banking'
  ]
};

export const technicalTimeline = [
  {
    date: '2012-06-01',
    title: 'XRPL Genesis',
    description: 'XRP Ledger launched with 100 billion XRP created'
  },
  {
    date: '2015-10-01',
    title: 'ILP Whitepaper',
    description: 'Interledger Protocol specification published'
  },
  {
    date: '2017-05-01',
    title: 'Escrow Feature',
    description: 'Time-based escrow added to mainnet'
  },
  {
    date: '2018-02-01',
    title: 'Payment Channels',
    description: 'Off-ledger payment channels for high throughput'
  },
  {
    date: '2021-09-01',
    title: 'Federated Sidechains',
    description: 'Sidechain architecture proposed and development begins'
  },
  {
    date: '2022-10-31',
    title: 'XLS-20 NFTs',
    description: 'Native NFT support goes live on mainnet'
  },
  {
    date: '2024-03-22',
    title: 'AMM Live',
    description: 'Automated Market Maker amendment activated'
  },
  {
    date: '2025-06-30',
    title: 'EVM Sidechain Mainnet',
    description: 'Full EVM compatibility launched with XRP as gas'
  }
];

export const guidedPathsData = [
  {
    id: 'setup-evm-monitoring',
    title: 'Set Up EVM Monitoring',
    description: 'Configure your development environment to monitor XRPL EVM Sidechain',
    steps: [
      {
        id: 'step-1',
        title: 'Install MetaMask',
        description: 'Add MetaMask browser extension and create/import wallet',
        completed: false
      },
      {
        id: 'step-2',
        title: 'Add XRPL EVM Network',
        description: 'Configure MetaMask with XRPL EVM RPC (https://rpc.xrplevm.org)',
        completed: false
      },
      {
        id: 'step-3',
        title: 'Get QuickNode Access',
        description: 'Sign up for QuickNode for reliable RPC endpoints',
        completed: false
      },
      {
        id: 'step-4',
        title: 'Monitor with Block Explorer',
        description: 'Bookmark the XRPL EVM block explorer for transaction tracking',
        completed: false
      }
    ],
    category: 'technical' as const
  },
  {
    id: 'bridge-assets',
    title: 'Bridge Assets via Axelar',
    description: 'Transfer assets between XRPL mainnet and EVM sidechain',
    steps: [
      {
        id: 'step-1',
        title: 'Connect Wallets',
        description: 'Connect both XRPL wallet (Xaman) and EVM wallet (MetaMask)',
        completed: false
      },
      {
        id: 'step-2',
        title: 'Access Bridge Interface',
        description: 'Navigate to the official Axelar bridge for XRPL EVM',
        completed: false
      },
      {
        id: 'step-3',
        title: 'Select Assets',
        description: 'Choose asset and amount to bridge',
        completed: false
      },
      {
        id: 'step-4',
        title: 'Confirm Transaction',
        description: 'Review fees and execute bridge transaction',
        completed: false
      }
    ],
    category: 'technical' as const
  }
];
