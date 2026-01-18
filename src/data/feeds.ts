import type { Tweet, GitHubEvent } from '../types';

// Mock data for real-time feeds
// In production, these would come from actual APIs

export const mockTweets: Tweet[] = [
  {
    id: 'tw-1',
    author: 'Wietse Wind',
    handle: '@WietseWind',
    content: 'Hooks testnet update: new debugging tools available. Making smart contract development on XRPL more accessible than ever. Documentation updated. 🛠️',
    timestamp: '2026-01-18T09:30:00Z',
    likes: 892,
    retweets: 234
  },
  {
    id: 'tw-2',
    author: 'Ripple',
    handle: '@Ripple',
    content: 'RLUSD integration with major Asian exchange announced. Expanding stablecoin availability across key markets. Details: ripple.com/insights',
    timestamp: '2026-01-18T08:15:00Z',
    likes: 2341,
    retweets: 567
  },
  {
    id: 'tw-3',
    author: 'BankXRP',
    handle: '@BankXRP',
    content: 'XRP ETF weekly inflows: $35M added. Total AUM across all spot ETFs now exceeds $1.15B. Institutional demand remains strong.',
    timestamp: '2026-01-17T22:00:00Z',
    likes: 1567,
    retweets: 389
  },
  {
    id: 'tw-4',
    author: 'XRPL Foundation',
    handle: '@XRPLF',
    content: 'rippled 3.1.0-rc1 released for testing. Includes performance improvements and bug fixes. Validators encouraged to test on devnet.',
    timestamp: '2026-01-17T18:45:00Z',
    likes: 445,
    retweets: 112
  },
  {
    id: 'tw-5',
    author: 'WrathofKahneman',
    handle: '@WKahneman',
    content: 'XLS-97 proposal gaining traction. Community feedback period ends next week. Make your voice heard on the governance repo.',
    timestamp: '2026-01-17T15:20:00Z',
    likes: 334,
    retweets: 89
  },
  {
    id: 'tw-6',
    author: 'XRPL EVM',
    handle: '@xrplevm',
    content: 'New milestone: 20,000 unique addresses on the EVM Sidechain! Growing faster than projected. Thank you builders! 🚀',
    timestamp: '2026-01-17T12:00:00Z',
    likes: 1123,
    retweets: 278
  },
  {
    id: 'tw-7',
    author: 'Digital Asset Investor',
    handle: '@digitalassetbuy',
    content: 'Presidential Working Group meets this week. Expecting stablecoin framework recommendations. Could be significant for RLUSD.',
    timestamp: '2026-01-16T20:30:00Z',
    likes: 2890,
    retweets: 723
  },
  {
    id: 'tw-8',
    author: 'xrpmickle',
    handle: '@xrpmickle',
    content: 'Active addresses rebounding after December dip. Network activity up 15% week-over-week. Fundamentals remain strong.',
    timestamp: '2026-01-16T16:45:00Z',
    likes: 567,
    retweets: 134
  }
];

export const mockGitHubEvents: GitHubEvent[] = [
  {
    id: 'gh-1',
    type: 'release',
    repo: 'XRPLF/rippled',
    title: 'v3.1.0-rc1 - Release Candidate',
    author: 'ximinez',
    timestamp: '2026-01-17T14:30:00Z',
    url: 'https://github.com/XRPLF/rippled/releases/tag/3.1.0-rc1'
  },
  {
    id: 'gh-2',
    type: 'commit',
    repo: 'XRPLF/xrpl.js',
    title: 'fix: correct AMM trading fee calculation',
    author: 'mvadari',
    timestamp: '2026-01-17T11:20:00Z',
    url: 'https://github.com/XRPLF/xrpl.js/commit/abc123'
  },
  {
    id: 'gh-3',
    type: 'pr',
    repo: 'XRPLF/xrpl-dev-portal',
    title: 'docs: add EVM sidechain bridging tutorial',
    author: 'contributor123',
    timestamp: '2026-01-17T09:45:00Z',
    url: 'https://github.com/XRPLF/xrpl-dev-portal/pull/456'
  },
  {
    id: 'gh-4',
    type: 'issue',
    repo: 'XRPLF/XRPL-Standards',
    title: 'XLS-98: Proposal for enhanced escrow conditions',
    author: 'community_dev',
    timestamp: '2026-01-16T22:15:00Z',
    url: 'https://github.com/XRPLF/XRPL-Standards/issues/98'
  },
  {
    id: 'gh-5',
    type: 'commit',
    repo: 'xrplevm/node',
    title: 'perf: optimize block processing pipeline',
    author: 'evmdev',
    timestamp: '2026-01-16T18:30:00Z',
    url: 'https://github.com/xrplevm/node/commit/def456'
  },
  {
    id: 'gh-6',
    type: 'release',
    repo: 'XRPLF/xrpl-py',
    title: 'v2.8.0 - Async improvements',
    author: 'pythondev',
    timestamp: '2026-01-15T16:00:00Z',
    url: 'https://github.com/XRPLF/xrpl-py/releases/tag/2.8.0'
  },
  {
    id: 'gh-7',
    type: 'pr',
    repo: 'XRPL-Labs/xrpld-hooks',
    title: 'feat: add hook debugging endpoints',
    author: 'WietseWind',
    timestamp: '2026-01-15T10:20:00Z',
    url: 'https://github.com/XRPL-Labs/xrpld-hooks/pull/789'
  },
  {
    id: 'gh-8',
    type: 'commit',
    repo: 'XRPLF/rippled',
    title: 'test: improve consensus test coverage',
    author: 'bthomee',
    timestamp: '2026-01-14T20:45:00Z',
    url: 'https://github.com/XRPLF/rippled/commit/ghi789'
  }
];

export const feedConfig = {
  twitter: {
    refreshInterval: 60000, // 1 minute
    maxItems: 20,
    sources: [
      '@Ripple',
      '@XRPLF',
      '@WietseWind',
      '@BankXRP',
      '@xrplevm',
      '@WKahneman'
    ]
  },
  github: {
    refreshInterval: 300000, // 5 minutes
    maxItems: 20,
    repos: [
      'XRPLF/rippled',
      'XRPLF/xrpl.js',
      'XRPLF/xrpl-py',
      'XRPLF/xrpl-dev-portal',
      'XRPLF/XRPL-Standards',
      'xrplevm/node',
      'XRPL-Labs/xrpld-hooks'
    ]
  },
  regulatory: {
    refreshInterval: 900000, // 15 minutes
    sources: [
      'SEC',
      'CFTC',
      'OCC',
      'White House',
      'EU Commission',
      'UK FCA'
    ]
  }
};

// API integration stubs
// In production, implement these with actual API calls

export async function fetchTwitterFeed(): Promise<Tweet[]> {
  // Stub: Would use Twitter/X API v2
  // Requires Bearer Token authentication
  return mockTweets;
}

export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  // Stub: Would use GitHub Events API
  // GET /repos/{owner}/{repo}/events
  return mockGitHubEvents;
}

export async function fetchRegulatoryAlerts() {
  // Stub: Would scrape/API regulatory sources
  // or use a service like Compliance.ai
  return [];
}

// WebSocket simulation for real-time updates
export function createFeedSubscription(
  _onTwitterUpdate: (tweet: Tweet) => void,
  _onGitHubUpdate: (event: GitHubEvent) => void
) {
  // In production, this would establish WebSocket connections
  // to streaming APIs or use Server-Sent Events
  
  const cleanup = () => {
    // Cleanup subscriptions
  };
  
  return cleanup;
}
