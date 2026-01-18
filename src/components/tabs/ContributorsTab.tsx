import { useState } from 'react';
import { Users, GitBranch, ExternalLink, Twitter, Github, Star, GitFork, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { contributors, repositories, communityTimeline, communityStats } from '../../data/contributors';
import { PinButton, DataTable, Timeline, ScannerSection, MetricDisplay } from '../shared';
import type { Contributor, Repository } from '../../types';

function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div className="group p-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded hover:border-[var(--border-default)] transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--xrp-accent)]">
            {contributor.name[0]}
          </div>
          <div>
            <h4 className="text-sm font-medium text-[var(--text-primary)]">{contributor.name}</h4>
            <p className="text-xs text-[var(--text-muted)]">{contributor.handle}</p>
          </div>
        </div>
        <PinButton
          item={contributor.id}
          type="contributor"
          title={contributor.name}
          data={{ role: contributor.role, organization: contributor.organization }}
        />
      </div>
      
      <div className="mt-3">
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Role</span>
        <p className="text-xs text-[var(--text-secondary)]">{contributor.role}</p>
        {contributor.organization && (
          <span className="inline-block mt-1 text-[10px] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-[var(--text-muted)]">
            {contributor.organization}
          </span>
        )}
      </div>
      
      <div className="mt-3">
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Contributions</span>
        <ul className="mt-1 space-y-1">
          {contributor.contributions.slice(0, 3).map((contribution, i) => (
            <li key={i} className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[var(--xrp-accent)]" />
              {contribution}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex gap-2">
        {contributor.twitter && (
          <a
            href={contributor.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Twitter size={12} className="text-[#1DA1F2]" />
          </a>
        )}
        {contributor.github && (
          <a
            href={contributor.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Github size={12} className="text-[var(--text-secondary)]" />
          </a>
        )}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: Repository }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded hover:border-[var(--border-default)] transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <GitBranch size={14} className="text-[var(--text-muted)]" />
          <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--xrp-accent)]">
            {repo.fullName}
          </span>
          <ExternalLink size={10} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <PinButton
          item={repo.id}
          type="repo"
          title={repo.fullName}
          data={{ description: repo.description, stars: repo.stars }}
        />
      </div>
      
      <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2">{repo.description}</p>
      
      <div className="flex items-center gap-4 mt-3 text-[10px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <Star size={10} /> {repo.stars.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={10} /> {repo.forks.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Users size={10} /> {repo.contributors}
        </span>
        <span className="badge badge-neutral">{repo.license}</span>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="text-[10px] text-[var(--text-muted)]">{repo.language}</span>
        <span className="text-[10px] text-[var(--text-muted)]">·</span>
        <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
          <Calendar size={10} /> Updated {repo.lastCommit}
        </span>
      </div>
    </a>
  );
}

export function ContributorsTab() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  
  const repoColumns = [
    { key: 'fullName', header: 'Repository', sortable: true },
    { key: 'stars', header: 'Stars', sortable: true, render: (r: Record<string, unknown>) => (r.stars as number).toLocaleString() },
    { key: 'contributors', header: 'Contributors', sortable: true },
    { key: 'license', header: 'License', render: (r: Record<string, unknown>) => <span className="badge badge-neutral">{r.license as string}</span> },
    { key: 'language', header: 'Language' },
    { key: 'lastCommit', header: 'Last Update', sortable: true }
  ];
  
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Contributors & Community</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Key XRPL developers, community leaders, and ecosystem repositories
          </p>
        </div>
        
        {/* Stats Row */}
        <ScannerSection id="community-stats">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <MetricDisplay label="Total Contributors" value={communityStats.totalContributors} prefix="~" />
            </div>
            <div className="card p-4">
              <MetricDisplay 
                label="Active Addresses" 
                value={(communityStats.activeAddresses / 1000000).toFixed(1)} 
                suffix="M"
                change={-80}
                changeLabel="from peak"
              />
            </div>
            <div className="card p-4">
              <MetricDisplay label="XLS Proposals" value={communityStats.xlsProposals} />
            </div>
            <div className="card p-4">
              <MetricDisplay label="Active Validators" value={communityStats.validators} />
            </div>
          </div>
        </ScannerSection>
        
        {/* Key Contributors */}
        <ScannerSection id="contributors">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[var(--xrp-accent)]" />
                <span className="card-title">Key XRPL Contributors</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contributors.map((contributor) => (
                  <ContributorCard key={contributor.id} contributor={contributor} />
                ))}
              </div>
            </div>
          </div>
        </ScannerSection>
        
        {/* Repositories */}
        <ScannerSection id="repositories">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <GitBranch size={14} className="text-green-400" />
                <span className="card-title">Core Repositories</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setView('grid')}
                  className={clsx(
                    'px-2 py-1 text-[10px] rounded transition-colors',
                    view === 'grid' ? 'bg-[var(--xrp-glow)] text-[var(--xrp-accent)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
                  )}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView('table')}
                  className={clsx(
                    'px-2 py-1 text-[10px] rounded transition-colors',
                    view === 'table' ? 'bg-[var(--xrp-glow)] text-[var(--xrp-accent)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
                  )}
                >
                  Table
                </button>
              </div>
            </div>
            <div className="p-4">
              {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repositories.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </div>
              ) : (
                <DataTable
                  data={repositories as unknown as Record<string, unknown>[]}
                  columns={repoColumns}
                  keyField="id"
                  compact
                />
              )}
            </div>
          </div>
        </ScannerSection>
        
        {/* Timeline & Community */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScannerSection id="timeline" className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Ecosystem Timeline</span>
              </div>
              <div className="card-body">
                <Timeline events={communityTimeline} maxItems={8} />
              </div>
            </div>
          </ScannerSection>
          
          <ScannerSection id="community-resources">
            <div className="space-y-4">
              <div className="card p-4">
                <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Community Hubs</h4>
                <div className="space-y-2">
                  <a href="https://xrpl.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors">
                    <span className="text-xs text-[var(--text-primary)]">XRPL.org</span>
                    <ExternalLink size={10} className="text-[var(--text-muted)]" />
                  </a>
                  <a href="https://xrpl-commons.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors">
                    <span className="text-xs text-[var(--text-primary)]">XRPL Commons</span>
                    <ExternalLink size={10} className="text-[var(--text-muted)]" />
                  </a>
                  <a href="https://reddit.com/r/XRP" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors">
                    <span className="text-xs text-[var(--text-primary)]">r/XRP</span>
                    <ExternalLink size={10} className="text-[var(--text-muted)]" />
                  </a>
                  <a href="https://reddit.com/r/Ripple" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors">
                    <span className="text-xs text-[var(--text-primary)]">r/Ripple</span>
                    <ExternalLink size={10} className="text-[var(--text-muted)]" />
                  </a>
                </div>
              </div>
              
              <div className="card p-4">
                <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Events</h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  XRP Community Day, hackathons, and meetups are organized by XRPL Commons and community members worldwide.
                </p>
              </div>
            </div>
          </ScannerSection>
        </div>
      </div>
    </div>
  );
}
