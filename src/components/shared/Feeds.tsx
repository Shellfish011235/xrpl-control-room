import { useState } from 'react';
import { RefreshCw, Twitter, Github, Bell, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { mockTweets, mockGitHubEvents } from '../../data/feeds';
import type { Tweet, GitHubEvent } from '../../types';
import { regulatoryAlerts } from '../../data/regulations';

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// Twitter Feed Component
export function TwitterFeed({ maxItems = 5 }: { maxItems?: number }) {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets.slice(0, maxItems));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setTweets(mockTweets.slice(0, maxItems));
    setIsRefreshing(false);
  };
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Twitter size={14} className="text-[#1DA1F2]" />
          <span className="card-title">X/Twitter Feed</span>
          <span className="live-indicator">Live</span>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-1 hover:bg-[var(--bg-hover)] rounded transition-colors"
        >
          <RefreshCw size={12} className={clsx('text-[var(--text-muted)]', isRefreshing && 'animate-spin')} />
        </button>
      </div>
      
      <div className="divide-y divide-[var(--border-subtle)]">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="p-3 hover:bg-[var(--bg-hover)] transition-colors">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                {tweet.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[var(--text-primary)]">{tweet.author}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{tweet.handle}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">·</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{formatTimeAgo(tweet.timestamp)}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-3">
                  {tweet.content}
                </p>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-[var(--text-muted)]">
                  <span>♥ {tweet.likes.toLocaleString()}</span>
                  <span>↻ {tweet.retweets.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// GitHub Feed Component
export function GitHubFeed({ maxItems = 5 }: { maxItems?: number }) {
  const [events, setEvents] = useState<GitHubEvent[]>(mockGitHubEvents.slice(0, maxItems));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const eventIcons: Record<GitHubEvent['type'], string> = {
    commit: '●',
    release: '◆',
    issue: '○',
    pr: '◇'
  };
  
  const eventColors: Record<GitHubEvent['type'], string> = {
    commit: 'text-green-400',
    release: 'text-blue-400',
    issue: 'text-yellow-400',
    pr: 'text-purple-400'
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setEvents(mockGitHubEvents.slice(0, maxItems));
    setIsRefreshing(false);
  };
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Github size={14} />
          <span className="card-title">GitHub Activity</span>
          <span className="live-indicator">Live</span>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-1 hover:bg-[var(--bg-hover)] rounded transition-colors"
        >
          <RefreshCw size={12} className={clsx('text-[var(--text-muted)]', isRefreshing && 'animate-spin')} />
        </button>
      </div>
      
      <div className="divide-y divide-[var(--border-subtle)]">
        {events.map((event) => (
          <a
            key={event.id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 hover:bg-[var(--bg-hover)] transition-colors group"
          >
            <div className="flex items-start gap-2">
              <span className={clsx('text-sm mt-0.5', eventColors[event.type])}>
                {eventIcons[event.type]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded">
                    {event.repo}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{formatTimeAgo(event.timestamp)}</span>
                  <ExternalLink size={10} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-[var(--text-primary)] mt-1 line-clamp-1">
                  {event.title}
                </p>
                <span className="text-[10px] text-[var(--text-muted)]">by {event.author}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Regulatory Alerts Component
export function RegulatoryAlertsFeed({ maxItems = 3 }: { maxItems?: number }) {
  const alerts = regulatoryAlerts.slice(0, maxItems);
  
  const severityColors: Record<string, string> = {
    critical: 'border-l-red-500 bg-red-500/5',
    high: 'border-l-orange-500 bg-orange-500/5',
    medium: 'border-l-yellow-500 bg-yellow-500/5',
    low: 'border-l-blue-500 bg-blue-500/5'
  };
  
  const severityBadges: Record<string, string> = {
    critical: 'badge-negative',
    high: 'badge-warning',
    medium: 'badge-info',
    low: 'badge-neutral'
  };
  
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-amber-500" />
          <span className="card-title">Regulatory Alerts</span>
        </div>
      </div>
      
      <div className="p-2 space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={clsx(
              'p-3 rounded border-l-2 border border-[var(--border-subtle)]',
              severityColors[alert.severity]
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {alert.title}
              </span>
              <span className={clsx('badge shrink-0', severityBadges[alert.severity])}>
                {alert.severity}
              </span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-2">
              {alert.summary}
            </p>
            <span className="text-[9px] text-[var(--text-muted)] mt-2 block">
              {formatTimeAgo(alert.timestamp)}
            </span>
          </div>
        ))}
        
        {alerts.length === 0 && (
          <div className="text-center py-4 text-xs text-[var(--text-muted)]">
            No active alerts
          </div>
        )}
      </div>
    </div>
  );
}

// Combined feed sidebar
export function FeedSidebar() {
  return (
    <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-secondary)] overflow-y-auto">
      <div className="p-4 space-y-4">
        <RegulatoryAlertsFeed maxItems={2} />
        <TwitterFeed maxItems={4} />
        <GitHubFeed maxItems={4} />
      </div>
    </div>
  );
}
