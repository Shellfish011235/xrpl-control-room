import { Server, Link2, Route, Users, Scale, Building } from 'lucide-react';
import { useGlobeStore } from '../../store/globeStore';
import { lensMetadata } from '../../data/globeContent';
import { clsx } from 'clsx';
import type { GlobeLens } from '../../types/globe';

const lensIcons: Record<GlobeLens, React.ReactNode> = {
  validators: <Server size={14} />,
  ilp: <Link2 size={14} />,
  corridors: <Route size={14} />,
  community: <Users size={14} />,
  regulation: <Scale size={14} />,
  projects: <Building size={14} />
};

const lensOrder: GlobeLens[] = ['validators', 'ilp', 'corridors', 'community', 'regulation', 'projects'];

export function GlobeLensTabs() {
  const { activeLens, setActiveLens } = useGlobeStore();
  
  return (
    <div className="flex items-center gap-1 p-1 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)]">
      {lensOrder.map((lens) => {
        const meta = lensMetadata[lens];
        const isActive = activeLens === lens;
        
        return (
          <button
            key={lens}
            onClick={() => setActiveLens(lens)}
            className={clsx(
              'flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all',
              isActive 
                ? 'bg-[var(--bg-tertiary)] shadow-sm' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            )}
            style={isActive ? { color: meta.color } : undefined}
            title={meta.description}
          >
            {lensIcons[lens]}
            <span className="hidden lg:inline">{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
