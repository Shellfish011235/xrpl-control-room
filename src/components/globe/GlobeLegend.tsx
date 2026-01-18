import { useGlobeStore } from '../../store/globeStore';
import { lensMetadata } from '../../data/globeContent';
import type { GlobeHub } from '../../types/globe';

// Hub type colors (same as WorldGlobe)
const hubTypeColors: Record<GlobeHub['type'], string> = {
  headquarters: '#00c3ff',
  financial: '#3b82f6',
  validator: '#10b981',
  development: '#8b5cf6',
  partnership: '#f59e0b',
  regional_hq: '#06b6d4',
  emerging: '#ec4899',
  academic: '#6366f1',
  exchange: '#14b8a6'
};

// Hub type labels
const hubTypeLabels: Record<GlobeHub['type'], string> = {
  headquarters: 'Headquarters',
  financial: 'Financial Hub',
  validator: 'Validator Cluster',
  development: 'Development',
  partnership: 'Partnership',
  regional_hq: 'Regional HQ',
  emerging: 'Emerging',
  academic: 'Academic',
  exchange: 'Exchange Hub'
};

// Regulatory status colors (same as WorldGlobe)
const regulatoryColors: Record<string, string> = {
  favorable: 'rgba(16, 185, 129, 0.6)',
  regulated: 'rgba(59, 130, 246, 0.6)',
  developing: 'rgba(245, 158, 11, 0.6)',
  restricted: 'rgba(239, 68, 68, 0.6)',
  unclear: 'rgba(107, 114, 128, 0.5)'
};

const regulatoryLabels: Record<string, string> = {
  favorable: 'Favorable',
  regulated: 'Regulated',
  developing: 'Developing',
  restricted: 'Restricted',
  unclear: 'Unclear'
};

export function GlobeLegend() {
  const { activeLens } = useGlobeStore();
  
  // Show different legends based on active lens
  const showRegulatory = activeLens === 'regulation';
  const showCorridors = activeLens === 'corridors' || activeLens === 'ilp';
  
  return (
    <div className="absolute bottom-4 right-4 bg-[var(--bg-secondary)]/95 backdrop-blur border border-[var(--border-subtle)] rounded-lg p-3 max-w-[220px]">
      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
        Map Legend
      </h4>
      
      {/* Hub types - always show */}
      <div className="mb-3">
        <p className="text-[9px] text-[var(--text-muted)] mb-1.5">Hub Types</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {Object.entries(hubTypeColors).slice(0, 6).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div 
                className="w-2.5 h-2.5 rounded-full border border-[var(--bg-primary)]"
                style={{ backgroundColor: color }}
              />
              <span className="text-[9px] text-[var(--text-muted)]">
                {hubTypeLabels[type as GlobeHub['type']]}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Regulatory status - show on regulation lens */}
      {showRegulatory && (
        <div className="mb-3 pt-2 border-t border-[var(--border-subtle)]">
          <p className="text-[9px] text-[var(--text-muted)] mb-1.5">Regulatory Status</p>
          <div className="space-y-1">
            {Object.entries(regulatoryColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-1.5">
                <div 
                  className="w-3 h-2 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[9px] text-[var(--text-muted)]">
                  {regulatoryLabels[status]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Corridor volume - show on corridor/ILP lens */}
      {showCorridors && (
        <div className="mb-3 pt-2 border-t border-[var(--border-subtle)]">
          <p className="text-[9px] text-[var(--text-muted)] mb-1.5">Corridor Volume</p>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 rounded" style={{ backgroundColor: lensMetadata[activeLens].color, height: '3px' }} />
              <span className="text-[9px] text-[var(--text-muted)]">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 rounded" style={{ backgroundColor: lensMetadata[activeLens].color, height: '2px' }} />
              <span className="text-[9px] text-[var(--text-muted)]">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-0.5 rounded" style={{ backgroundColor: lensMetadata[activeLens].color, height: '1px' }} />
              <span className="text-[9px] text-[var(--text-muted)]">Low</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Selection hint */}
      <div className="pt-2 border-t border-[var(--border-subtle)]">
        <p className="text-[9px] text-[var(--text-muted)] italic">
          Click map to select • Scroll to zoom
        </p>
      </div>
    </div>
  );
}
