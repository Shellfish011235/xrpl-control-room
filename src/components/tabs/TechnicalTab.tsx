import { useState } from 'react';
import { Cpu, Network, Zap, Link2, Clock, Users, Activity, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { networkComparison, networkStats, evmSidechainInfo, ilpInfo, technicalTimeline, guidedPathsData } from '../../data/technical';
import { ScannerSection, MetricDisplay, GuidedPath, HorizontalTimeline } from '../shared';
import type { GuidedPath as GuidedPathType } from '../../types';

function FeatureCard({ feature }: { feature: { title: string; description: string } }) {
  return (
    <div className="p-3 bg-[var(--bg-tertiary)] rounded border border-[var(--border-subtle)]">
      <h4 className="text-xs font-medium text-[var(--text-primary)]">{feature.title}</h4>
      <p className="text-[11px] text-[var(--text-muted)] mt-1">{feature.description}</p>
    </div>
  );
}

function NetworkStatCard({ stat, icon, label }: { stat: string | number; icon: React.ReactNode; label: string }) {
  return (
    <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-xl font-semibold text-[var(--text-primary)]">
        {typeof stat === 'number' ? stat.toLocaleString() : stat}
      </span>
    </div>
  );
}

export function TechnicalTab() {
  const [activeSection, setActiveSection] = useState<'evm' | 'ilp'>('evm');
  
  const mainnetStats = networkStats.find(n => n.network === 'xrpl_mainnet')!;
  const evmStats = networkStats.find(n => n.network === 'evm_sidechain')!;
  
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Technical Features</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            EVM Sidechain, Interledger Protocol, and XRPL technical architecture
          </p>
        </div>
        
        {/* Section Toggle */}
        <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-lg w-fit border border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveSection('evm')}
            className={clsx(
              'px-4 py-2 text-xs rounded transition-all',
              activeSection === 'evm' 
                ? 'bg-[var(--xrp-glow)] text-[var(--xrp-accent)] font-medium' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            )}
          >
            <Cpu size={12} className="inline mr-2" />
            EVM Sidechain
          </button>
          <button
            onClick={() => setActiveSection('ilp')}
            className={clsx(
              'px-4 py-2 text-xs rounded transition-all',
              activeSection === 'ilp' 
                ? 'bg-[var(--xrp-glow)] text-[var(--xrp-accent)] font-medium' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            )}
          >
            <Link2 size={12} className="inline mr-2" />
            Interledger Protocol
          </button>
        </div>
        
        {/* EVM Sidechain Section */}
        {activeSection === 'evm' && (
          <div className="space-y-6 animate-fade-in">
            {/* EVM Overview */}
            <ScannerSection id="evm-overview">
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-[var(--xrp-accent)]" />
                    <span className="card-title">XRPL EVM Sidechain</span>
                    <span className="badge badge-positive">Mainnet Live</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Launched {evmSidechainInfo.launchDate}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {evmSidechainInfo.description}
                  </p>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <NetworkStatCard
                      stat={evmSidechainInfo.metrics.uniqueWallets.toLocaleString()}
                      icon={<Users size={14} className="text-blue-400" />}
                      label="Unique Wallets"
                    />
                    <NetworkStatCard
                      stat={evmSidechainInfo.metrics.tokensDeployed}
                      icon={<Activity size={14} className="text-green-400" />}
                      label="Tokens Deployed"
                    />
                    <NetworkStatCard
                      stat={`$${(evmSidechainInfo.metrics.tvl / 1000000).toFixed(1)}M`}
                      icon={<Zap size={14} className="text-yellow-400" />}
                      label="TVL"
                    />
                    <NetworkStatCard
                      stat={evmSidechainInfo.metrics.dailyTransactions.toLocaleString()}
                      icon={<Clock size={14} className="text-purple-400" />}
                      label="Daily Txns"
                    />
                  </div>
                  
                  {/* Key Features */}
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {evmSidechainInfo.keyFeatures.map((feature) => (
                      <FeatureCard key={feature.title} feature={feature} />
                    ))}
                  </div>
                </div>
              </div>
            </ScannerSection>
            
            {/* Network Comparison */}
            <ScannerSection id="network-comparison">
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center gap-2">
                    <Network size={14} className="text-green-400" />
                    <span className="card-title">XRPL Mainnet vs EVM Sidechain</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Feature</th>
                          <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">XRPL Mainnet</th>
                          <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">EVM Sidechain</th>
                          <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {networkComparison.map((row) => (
                          <tr key={row.feature} className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]">
                            <td className="px-3 py-2 text-xs font-medium text-[var(--text-primary)]">{row.feature}</td>
                            <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.xrplMainnet}</td>
                            <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.evmSidechain}</td>
                            <td className="px-3 py-2 text-[11px] text-[var(--text-muted)]">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ScannerSection>
            
            {/* Network Stats Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScannerSection id="mainnet-stats">
                <div className="card">
                  <div className="card-header">
                    <span className="card-title">XRPL Mainnet Stats</span>
                    <span className="live-indicator">Live</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <MetricDisplay label="TPS Capacity" value={mainnetStats.tps} suffix="+" />
                    <MetricDisplay label="Avg Fee" value={mainnetStats.avgFee} />
                    <MetricDisplay label="Block Time" value={mainnetStats.blockTime} />
                    <MetricDisplay label="Validators" value={mainnetStats.validators} />
                  </div>
                </div>
              </ScannerSection>
              
              <ScannerSection id="evm-stats">
                <div className="card">
                  <div className="card-header">
                    <span className="card-title">EVM Sidechain Stats</span>
                    <span className="live-indicator">Live</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <MetricDisplay label="TPS Capacity" value={evmStats.tps} suffix="+" />
                    <MetricDisplay label="Avg Fee" value={evmStats.avgFee} />
                    <MetricDisplay label="Block Time" value={evmStats.blockTime} />
                    <MetricDisplay label="Validators" value={evmStats.validators} />
                  </div>
                </div>
              </ScannerSection>
            </div>
            
            {/* Guided Paths */}
            <ScannerSection id="guided-paths">
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Guided Paths</span>
                  <span className="text-[10px] text-[var(--text-muted)]">Optional learning flows</span>
                </div>
                <div className="p-4 space-y-3">
                  {guidedPathsData.map((path) => (
                    <GuidedPath key={path.id} path={path as GuidedPathType} />
                  ))}
                </div>
              </div>
            </ScannerSection>
          </div>
        )}
        
        {/* ILP Section */}
        {activeSection === 'ilp' && (
          <div className="space-y-6 animate-fade-in">
            <ScannerSection id="ilp-overview">
              <div className="card">
                <div className="card-header">
                  <div className="flex items-center gap-2">
                    <Link2 size={14} className="text-purple-400" />
                    <span className="card-title">{ilpInfo.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-lg text-[var(--text-secondary)] mb-2">{ilpInfo.tagline}</p>
                  <p className="text-sm text-[var(--text-muted)] mb-6">{ilpInfo.description}</p>
                  
                  {/* Key Features */}
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {ilpInfo.keyFeatures.map((feature) => (
                      <FeatureCard key={feature.title} feature={feature} />
                    ))}
                  </div>
                  
                  {/* Use Cases */}
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Use Cases</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {ilpInfo.useCases.map((useCase) => (
                      <span key={useCase} className="badge badge-info">{useCase}</span>
                    ))}
                  </div>
                  
                  {/* Resources */}
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    {ilpInfo.resources.map((resource) => (
                      <a
                        key={resource.title}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-hover)] transition-colors text-xs text-[var(--text-secondary)]"
                      >
                        {resource.title}
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScannerSection>
            
            {/* Reddit Debates */}
            <ScannerSection id="ilp-debates">
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Community Debates</span>
                </div>
                <div className="p-4 space-y-3">
                  {ilpInfo.redditDebates.map((debate, i) => (
                    <div key={i} className="p-3 bg-[var(--bg-tertiary)] rounded border-l-2 border-purple-500">
                      <p className="text-xs text-[var(--text-secondary)]">{debate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScannerSection>
          </div>
        )}
        
        {/* Technical Timeline */}
        <ScannerSection id="technical-timeline">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Technical Milestones</span>
            </div>
            <div className="p-4">
              <HorizontalTimeline events={technicalTimeline.map((t, i) => ({
                id: `tech-${i}`,
                date: t.date,
                title: t.title,
                description: t.description,
                category: 'technical' as const,
                significance: 'major' as const
              }))} />
            </div>
          </div>
        </ScannerSection>
      </div>
    </div>
  );
}
