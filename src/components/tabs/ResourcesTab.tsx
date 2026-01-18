import { useState } from 'react';
import { Github, MessageSquare, Youtube, FileText, Wrench, ExternalLink, Search, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import { resources, blackrockDocs, guidedPathsResources, resourceCategories } from '../../data/resources';
import { PinButton, ScannerSection, GuidedPath } from '../shared';
import type { Resource, GuidedPath as GuidedPathType } from '../../types';

const typeIcons: Record<Resource['type'], React.ReactNode> = {
  github: <Github size={14} />,
  reddit: <MessageSquare size={14} />,
  youtube: <Youtube size={14} />,
  document: <FileText size={14} />,
  tool: <Wrench size={14} />
};

const typeColors: Record<Resource['type'], string> = {
  github: 'text-gray-400',
  reddit: 'text-orange-400',
  youtube: 'text-red-400',
  document: 'text-blue-400',
  tool: 'text-green-400'
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded hover:border-[var(--border-default)] transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={typeColors[resource.type]}>{typeIcons[resource.type]}</span>
          <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--xrp-accent)]">
            {resource.title}
          </span>
          <ExternalLink size={10} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div onClick={(e) => e.preventDefault()}>
          <PinButton
            item={resource.id}
            type="resource"
            title={resource.title}
            data={{ description: resource.description, type: resource.type }}
          />
        </div>
      </div>
      
      <p className="text-xs text-[var(--text-muted)] mt-2 line-clamp-2">{resource.description}</p>
      
      <div className="flex items-center gap-2 mt-3">
        <span className="badge badge-neutral">{resource.category}</span>
        {resource.lastUpdated && (
          <span className="text-[10px] text-[var(--text-muted)]">
            Updated {resource.lastUpdated}
          </span>
        )}
      </div>
    </a>
  );
}

export function ResourcesTab() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  
  const filteredResources = resources.filter(r => {
    const matchesFilter = filter === 'all' || r.type === filter;
    const matchesSearch = search === '' || 
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Resources</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            GitHub repositories, Reddit communities, YouTube channels, and documentation
          </p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded text-sm"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {resourceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={clsx(
                  'px-3 py-1.5 text-xs rounded border transition-colors flex items-center gap-2',
                  filter === cat.id 
                    ? 'bg-[var(--xrp-glow)] border-[var(--xrp-accent)] text-[var(--xrp-accent)]' 
                    : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-default)]'
                )}
              >
                {cat.id !== 'all' && <span className={typeColors[cat.id as Resource['type']]}>{typeIcons[cat.id as Resource['type']]}</span>}
                {cat.label}
                <span className="text-[10px] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Resources Grid */}
        <ScannerSection id="resources-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p>No resources found matching your criteria</p>
            </div>
          )}
        </ScannerSection>
        
        {/* BlackRock & Institutional */}
        <ScannerSection id="blackrock-docs">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-blue-400" />
                <span className="card-title">{blackrockDocs.title}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-[var(--text-secondary)] mb-4">{blackrockDocs.description}</p>
              
              <div className="space-y-3 mb-6">
                {blackrockDocs.items.map((item) => (
                  <div key={item.title} className="p-3 bg-[var(--bg-tertiary)] rounded border border-[var(--border-subtle)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-[var(--text-primary)]">{item.title}</span>
                          <span className="badge badge-neutral">{item.type}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)]">{item.description}</p>
                        <p className="text-[10px] text-[var(--xrp-accent)] mt-1">XRP Relevance: {item.xrpRelevance}</p>
                      </div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-[var(--bg-hover)] rounded"
                        >
                          <ExternalLink size={12} className="text-[var(--text-muted)]" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Speculation Warning */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-medium text-amber-500">{blackrockDocs.speculation.title}</h4>
                    <ul className="mt-2 space-y-1">
                      {blackrockDocs.speculation.items.map((item, i) => (
                        <li key={i} className="text-[11px] text-[var(--text-muted)]">• {item}</li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-[var(--text-muted)] mt-2 italic">{blackrockDocs.speculation.disclaimer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScannerSection>
        
        {/* Guided Paths */}
        <ScannerSection id="guided-paths">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {guidedPathsResources.map((path) => (
              <GuidedPath key={path.id} path={path as GuidedPathType} />
            ))}
          </div>
        </ScannerSection>
        
        {/* Quick Links */}
        <ScannerSection id="quick-links">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Quick Links</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a
                  href="https://xrpl.org/docs.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors text-center"
                >
                  <FileText size={20} className="mx-auto text-blue-400 mb-2" />
                  <span className="text-xs text-[var(--text-primary)]">XRPL Docs</span>
                </a>
                <a
                  href="https://xrpscan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors text-center"
                >
                  <Search size={20} className="mx-auto text-green-400 mb-2" />
                  <span className="text-xs text-[var(--text-primary)]">XRPScan</span>
                </a>
                <a
                  href="https://xaman.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors text-center"
                >
                  <Wrench size={20} className="mx-auto text-purple-400 mb-2" />
                  <span className="text-xs text-[var(--text-primary)]">Xaman Wallet</span>
                </a>
                <a
                  href="https://github.com/XRPLF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors text-center"
                >
                  <Github size={20} className="mx-auto text-gray-400 mb-2" />
                  <span className="text-xs text-[var(--text-primary)]">XRPLF GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </ScannerSection>
      </div>
    </div>
  );
}
