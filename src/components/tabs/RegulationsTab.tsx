import { useState } from 'react';
import { Scale, AlertTriangle, Globe, FileText, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { regulations, regulatoryAlerts, regulatoryTimeline, jurisdictionComparison } from '../../data/regulations';
import { PinButton, Timeline, ScannerSection, GuidedPath } from '../shared';
import type { Regulation, GuidedPath as GuidedPathType } from '../../types';

const statusIcons: Record<Regulation['status'], React.ReactNode> = {
  active: <CheckCircle size={12} className="text-green-400" />,
  pending: <Clock size={12} className="text-yellow-400" />,
  revoked: <XCircle size={12} className="text-red-400" />,
  proposed: <FileText size={12} className="text-blue-400" />
};

const impactBadges: Record<Regulation['impact'], string> = {
  positive: 'badge-positive',
  negative: 'badge-negative',
  neutral: 'badge-neutral'
};

const jurisdictionFlags: Record<string, string> = {
  US: '🇺🇸',
  EU: '🇪🇺',
  UK: '🇬🇧',
  GLOBAL: '🌍',
  ASIA: '🌏'
};

function RegulationCard({ regulation }: { regulation: Regulation }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="card">
      <div 
        className="p-4 cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">{jurisdictionFlags[regulation.jurisdiction]}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {statusIcons[regulation.status]}
                <span className={clsx('badge', impactBadges[regulation.impact])}>
                  {regulation.impact}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">{regulation.date}</span>
              </div>
              <h4 className="text-sm font-medium text-[var(--text-primary)]">{regulation.title}</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">{regulation.summary}</p>
            </div>
          </div>
          <PinButton
            item={regulation.id}
            type="regulation"
            title={regulation.title}
            data={{ summary: regulation.summary, impact: regulation.impact }}
          />
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-[var(--border-subtle)] mt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Impact on XRP/XRPL</span>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{regulation.impactDescription}</p>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Source</span>
              <a
                href={regulation.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[var(--xrp-accent)] hover:underline mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                {regulation.source}
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertCard({ alert }: { alert: typeof regulatoryAlerts[0] }) {
  const severityColors: Record<string, string> = {
    critical: 'border-l-red-500',
    high: 'border-l-orange-500',
    medium: 'border-l-yellow-500',
    low: 'border-l-blue-500'
  };
  
  return (
    <div className={clsx(
      'p-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded border-l-2',
      severityColors[alert.severity]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={12} className={clsx(
              alert.severity === 'critical' && 'text-red-400',
              alert.severity === 'high' && 'text-orange-400',
              alert.severity === 'medium' && 'text-yellow-400',
              alert.severity === 'low' && 'text-blue-400'
            )} />
            <span className="text-xs font-medium text-[var(--text-primary)]">{alert.title}</span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">{alert.summary}</p>
        </div>
        <PinButton
          item={alert.id}
          type="alert"
          title={alert.title}
          data={{ summary: alert.summary, severity: alert.severity }}
        />
      </div>
    </div>
  );
}

const complianceGuidedPath: GuidedPathType = {
  id: 'navigate-sec-rules',
  title: 'Navigate US SEC Rules',
  description: 'Understanding XRP regulatory status in the United States',
  steps: [
    {
      id: 'step-1',
      title: 'Review Torres Ruling',
      description: 'Understand the 2023 summary judgment on XRP\'s security status',
      completed: false
    },
    {
      id: 'step-2',
      title: 'Check EO 14178',
      description: 'Review Trump executive order on digital assets',
      completed: false
    },
    {
      id: 'step-3',
      title: 'Understand GENIUS Act',
      description: 'Learn stablecoin compliance requirements',
      completed: false
    },
    {
      id: 'step-4',
      title: 'Monitor Working Group',
      description: 'Track Presidential Working Group recommendations',
      completed: false
    }
  ],
  category: 'regulations'
};

export function RegulationsTab() {
  const [filter, setFilter] = useState<'all' | Regulation['jurisdiction']>('all');
  
  const filteredRegulations = filter === 'all' 
    ? regulations 
    : regulations.filter(r => r.jurisdiction === filter);
  
  const jurisdictions = ['all', 'US', 'EU', 'UK', 'GLOBAL'] as const;
  
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Regulations & Executive Orders</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Global regulatory landscape for XRP, XRPL, and digital assets
          </p>
        </div>
        
        {/* Alerts */}
        <ScannerSection id="regulatory-alerts">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle size={12} className="text-amber-500" />
              Active Alerts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regulatoryAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        </ScannerSection>
        
        {/* Jurisdiction Filter */}
        <div className="flex gap-2 flex-wrap">
          {jurisdictions.map((j) => (
            <button
              key={j}
              onClick={() => setFilter(j)}
              className={clsx(
                'px-3 py-1.5 text-xs rounded border transition-colors',
                filter === j 
                  ? 'bg-[var(--xrp-glow)] border-[var(--xrp-accent)] text-[var(--xrp-accent)]' 
                  : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-default)]'
              )}
            >
              {j === 'all' ? '🌐 All' : `${jurisdictionFlags[j]} ${j}`}
            </button>
          ))}
        </div>
        
        {/* Regulations List */}
        <ScannerSection id="regulations-list">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
              <Scale size={12} />
              Regulations & Orders ({filteredRegulations.length})
            </h3>
            <div className="space-y-4">
              {filteredRegulations.map((regulation) => (
                <RegulationCard key={regulation.id} regulation={regulation} />
              ))}
            </div>
          </div>
        </ScannerSection>
        
        {/* Jurisdiction Comparison */}
        <ScannerSection id="jurisdiction-comparison">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-blue-400" />
                <span className="card-title">Jurisdiction Comparison</span>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Jurisdiction</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Overall Stance</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">XRP Status</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Stablecoin Rules</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">ETF Status</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {jurisdictionComparison.map((row) => (
                    <tr key={row.jurisdiction} className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]">
                      <td className="px-3 py-2 text-xs">
                        <span className="mr-2">{row.flag}</span>
                        <span className="font-medium text-[var(--text-primary)]">{row.jurisdiction}</span>
                      </td>
                      <td className="px-3 py-2 text-xs">
                        <span className={clsx(
                          'badge',
                          row.overallStance === 'Favorable' || row.overallStance === 'Very Favorable' ? 'badge-positive' :
                          row.overallStance === 'Regulated' ? 'badge-info' : 'badge-neutral'
                        )}>
                          {row.overallStance}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.xrpStatus}</td>
                      <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.stablecoinRules}</td>
                      <td className="px-3 py-2 text-xs">
                        <span className={clsx(
                          'badge',
                          row.etfStatus === 'Approved' ? 'badge-positive' : 
                          row.etfStatus === 'ETNs available' ? 'badge-info' : 'badge-neutral'
                        )}>
                          {row.etfStatus}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-[11px] text-[var(--text-muted)]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScannerSection>
        
        {/* Timeline & Guided Path */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScannerSection id="regulatory-timeline" className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <span className="card-title">Regulatory Timeline</span>
              </div>
              <div className="card-body">
                <Timeline events={regulatoryTimeline} maxItems={10} />
              </div>
            </div>
          </ScannerSection>
          
          <ScannerSection id="compliance-guide">
            <div className="space-y-4">
              <GuidedPath path={complianceGuidedPath} />
              
              {/* Quick Reference */}
              <div className="card p-4">
                <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Key Agencies</h4>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">SEC</span>
                    <span className="text-[var(--text-secondary)]">Securities oversight</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">CFTC</span>
                    <span className="text-[var(--text-secondary)]">Commodities oversight</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">OCC</span>
                    <span className="text-[var(--text-secondary)]">Bank regulation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">FinCEN</span>
                    <span className="text-[var(--text-secondary)]">AML/KYC</span>
                  </div>
                </div>
              </div>
            </div>
          </ScannerSection>
        </div>
      </div>
    </div>
  );
}
