import { DollarSign, TrendingUp, BarChart3, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { rlusdDetails, etfs, etfInflows, etfStats, priceProjections, stablecoinComparison } from '../../data/stablecoins';
import { PinButton, ScannerSection, MetricDisplay, ETFInflowsChart, MarketCapChart, DistributionChart } from '../shared';
import type { ETF } from '../../types';


function ETFCard({ etf }: { etf: ETF }) {
  return (
    <div className="card p-4 hover:border-[var(--border-default)] transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--xrp-accent)]">{etf.ticker}</span>
            <span className={clsx(
              'badge',
              etf.change24h >= 0 ? 'badge-positive' : 'badge-negative'
            )}>
              {etf.change24h >= 0 ? '+' : ''}{etf.change24h}%
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{etf.name}</p>
        </div>
        <PinButton
          item={etf.id}
          type="etf"
          title={etf.ticker}
          data={{ aum: etf.aum, price: etf.price }}
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase">Price</span>
          <p className="text-lg font-semibold text-[var(--text-primary)]">${etf.price.toFixed(2)}</p>
        </div>
        <div>
          <span className="text-[10px] text-[var(--text-muted)] uppercase">AUM</span>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            ${(etf.aum / 1000000).toFixed(0)}M
          </p>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex justify-between text-[11px] text-[var(--text-muted)]">
        <span>Expense: {etf.expense}%</span>
        <span>Vol: ${(etf.dailyVolume / 1000000).toFixed(1)}M</span>
        <span>{etf.issuer}</span>
      </div>
    </div>
  );
}

export function StablecoinsTab() {
  const chainDistribution = [
    { name: 'Ethereum', value: rlusdDetails.chainDistribution.ethereum },
    { name: 'XRPL', value: rlusdDetails.chainDistribution.xrpl }
  ];
  
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Stablecoins & ETFs</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            RLUSD stablecoin and spot XRP ETF tracking
          </p>
        </div>
        
        {/* RLUSD Section */}
        <ScannerSection id="rlusd-overview">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-green-400" />
                <span className="card-title">RLUSD - Ripple USD</span>
                <span className="badge badge-positive">Live</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">
                Launched {rlusdDetails.launchDate}
              </span>
            </div>
            <div className="p-4">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {rlusdDetails.description}
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay 
                    label="Market Cap" 
                    value="$1.4B" 
                    change={1278} 
                    changeLabel="YTD"
                  />
                </div>
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay label="XRPL Share" value="20" suffix="%" />
                </div>
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay label="Ethereum Share" value="80" suffix="%" />
                </div>
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay label="Peg" value="1:1 USD" />
                </div>
              </div>
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Market Cap Growth</h4>
                  <MarketCapChart data={rlusdDetails.marketCapHistory} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Chain Distribution</h4>
                  <DistributionChart data={chainDistribution} />
                </div>
              </div>
              
              {/* Use Cases & Integrations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Use Cases</h4>
                  <div className="flex flex-wrap gap-2">
                    {rlusdDetails.useCases.map((useCase) => (
                      <span key={useCase} className="badge badge-info">{useCase}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Key Integrations</h4>
                  <div className="space-y-2">
                    {rlusdDetails.integrations.slice(0, 4).map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-2 bg-[var(--bg-tertiary)] rounded">
                        <span className="text-xs text-[var(--text-primary)]">{integration.name}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{integration.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* XRP Impact Note */}
              <div className="mt-4 p-3 bg-[var(--bg-tertiary)] rounded border-l-2 border-amber-500">
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-amber-500 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase">Impact on XRP</span>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{rlusdDetails.xrpImpact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScannerSection>
        
        {/* Stablecoin Comparison */}
        <ScannerSection id="stablecoin-comparison">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Stablecoin Comparison</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Metric</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">RLUSD</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">USDC</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">USDT</th>
                    <th className="text-left px-3 py-2 bg-[var(--bg-tertiary)]">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {stablecoinComparison.map((row) => (
                    <tr key={row.metric} className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-hover)]">
                      <td className="px-3 py-2 text-xs font-medium text-[var(--text-primary)]">{row.metric}</td>
                      <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.rlusd}</td>
                      <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.usdc}</td>
                      <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.usdt}</td>
                      <td className="px-3 py-2 text-[11px] text-[var(--text-muted)]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScannerSection>
        
        {/* ETF Section */}
        <ScannerSection id="etf-overview">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-[var(--xrp-accent)]" />
                <span className="card-title">Spot XRP ETFs</span>
                <span className="badge badge-positive">SEC Approved</span>
              </div>
            </div>
            <div className="p-4">
              {/* ETF Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay 
                    label="Total AUM" 
                    value={`$${(etfStats.totalAum / 1000000000).toFixed(2)}B`}
                  />
                </div>
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay 
                    label="Daily Volume" 
                    value={`$${(etfStats.totalDailyVolume / 1000000).toFixed(1)}M`}
                  />
                </div>
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay 
                    label="Jan 6 Inflows" 
                    value={`$${(etfStats.inflowsJan6 / 1000000).toFixed(1)}M`}
                  />
                </div>
                <div className="p-3 bg-[var(--bg-tertiary)] rounded">
                  <MetricDisplay 
                    label="2028 Target" 
                    value={`$${etfStats.priceTarget2028}`}
                  />
                </div>
              </div>
              
              {/* Inflows Chart */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Cumulative ETF Inflows</h4>
                <ETFInflowsChart data={etfInflows} />
              </div>
              
              {/* ETF Cards */}
              <h4 className="text-xs font-semibold text-[var(--text-secondary)] mb-3">Active ETFs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {etfs.map((etf) => (
                  <ETFCard key={etf.id} etf={etf} />
                ))}
              </div>
            </div>
          </div>
        </ScannerSection>
        
        {/* Price Projections */}
        <ScannerSection id="price-projections">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-purple-400" />
                <span className="card-title">Analyst Price Targets</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">
                Note: Analyst projections, not financial advice
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {priceProjections.map((projection) => (
                  <div 
                    key={projection.source} 
                    className="p-4 bg-[var(--bg-tertiary)] rounded border border-[var(--border-subtle)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[var(--text-primary)]">{projection.source}</span>
                      <span className={clsx(
                        'badge',
                        projection.confidence === 'High' ? 'badge-positive' :
                        projection.confidence === 'Medium' ? 'badge-info' : 'badge-neutral'
                      )}>
                        {projection.confidence}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[var(--xrp-accent)]">${projection.target}</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1">by {projection.timeframe}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-[10px] text-[var(--text-muted)] mt-4 italic">
                Disclaimer: Price targets are speculative and from third-party analysts. This is not financial advice. Always do your own research.
              </p>
            </div>
          </div>
        </ScannerSection>
      </div>
    </div>
  );
}
