import { useControlRoomStore } from '../../store';
import { Pin, PinOff, ChevronRight, ChevronLeft, X, User, GitBranch, Scale, BookOpen, TrendingUp, Bell } from 'lucide-react';
import { clsx } from 'clsx';
import type { PinnedPanel } from '../../types';

const panelIcons: Record<PinnedPanel['type'], React.ReactNode> = {
  contributor: <User size={14} />,
  repo: <GitBranch size={14} />,
  regulation: <Scale size={14} />,
  resource: <BookOpen size={14} />,
  etf: <TrendingUp size={14} />,
  alert: <Bell size={14} />
};

const panelColors: Record<PinnedPanel['type'], string> = {
  contributor: 'border-l-blue-500',
  repo: 'border-l-green-500',
  regulation: 'border-l-amber-500',
  resource: 'border-l-purple-500',
  etf: 'border-l-cyan-500',
  alert: 'border-l-red-500'
};

function PinnedPanelCard({ panel, onUnpin }: { panel: PinnedPanel; onUnpin: () => void }) {
  return (
    <div 
      className={clsx(
        'group bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded',
        'border-l-2 p-3 animate-fade-in hover:bg-[var(--bg-hover)] transition-colors',
        panelColors[panel.type]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[var(--text-muted)] shrink-0">
            {panelIcons[panel.type]}
          </span>
          <span className="text-xs font-medium text-[var(--text-primary)] truncate">
            {panel.title}
          </span>
        </div>
        <button
          onClick={onUnpin}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[var(--bg-elevated)] rounded transition-all"
          title="Unpin"
        >
          <X size={12} className="text-[var(--text-muted)]" />
        </button>
      </div>
      
      {/* Panel preview content */}
      <div className="mt-2 text-[10px] text-[var(--text-muted)] line-clamp-2">
        {panel.type === 'contributor' && (panel.data.role as string)}
        {panel.type === 'repo' && (panel.data.description as string)}
        {panel.type === 'regulation' && (panel.data.summary as string)}
        {panel.type === 'etf' && `AUM: $${((panel.data.aum as number) / 1000000).toFixed(0)}M`}
        {panel.type === 'alert' && (panel.data.summary as string)}
        {panel.type === 'resource' && (panel.data.description as string)}
      </div>
      
      <div className="mt-2 text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
        Pinned {new Date(panel.pinnedAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export function PanelDock() {
  const { pinnedPanels, dockExpanded, toggleDock, unpinPanel } = useControlRoomStore();
  
  return (
    <div 
      className={clsx(
        'h-full border-l border-[var(--border-subtle)] bg-[var(--bg-secondary)]',
        'flex flex-col transition-all duration-200',
        dockExpanded ? 'w-64' : 'w-10'
      )}
    >
      {/* Dock header */}
      <div className="flex items-center justify-between p-2 border-b border-[var(--border-subtle)]">
        {dockExpanded && (
          <div className="flex items-center gap-2">
            <Pin size={12} className="text-[var(--text-muted)]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Panel Dock
            </span>
            <span className="text-[9px] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--text-muted)]">
              {pinnedPanels.length}/8
            </span>
          </div>
        )}
        <button
          onClick={toggleDock}
          className="p-1 hover:bg-[var(--bg-hover)] rounded transition-colors"
          title={dockExpanded ? 'Collapse dock' : 'Expand dock'}
        >
          {dockExpanded ? (
            <ChevronRight size={14} className="text-[var(--text-muted)]" />
          ) : (
            <ChevronLeft size={14} className="text-[var(--text-muted)]" />
          )}
        </button>
      </div>
      
      {/* Dock content */}
      {dockExpanded && (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {pinnedPanels.length === 0 ? (
            <div className="text-center py-8">
              <PinOff size={24} className="mx-auto text-[var(--text-muted)] mb-2" />
              <p className="text-xs text-[var(--text-muted)]">No pinned panels</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1">
                Click <Pin size={10} className="inline" /> on items to pin
              </p>
            </div>
          ) : (
            pinnedPanels.map((panel) => (
              <PinnedPanelCard
                key={panel.id}
                panel={panel}
                onUnpin={() => unpinPanel(panel.id)}
              />
            ))
          )}
        </div>
      )}
      
      {/* Collapsed state - show icons only */}
      {!dockExpanded && pinnedPanels.length > 0 && (
        <div className="flex-1 py-2 space-y-1">
          {pinnedPanels.slice(0, 6).map((panel) => (
            <div
              key={panel.id}
              className={clsx(
                'mx-1 p-1.5 rounded flex items-center justify-center',
                'bg-[var(--bg-tertiary)] border-l-2',
                panelColors[panel.type]
              )}
              title={panel.title}
            >
              {panelIcons[panel.type]}
            </div>
          ))}
          {pinnedPanels.length > 6 && (
            <div className="text-center text-[9px] text-[var(--text-muted)]">
              +{pinnedPanels.length - 6}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Pin button component to use in other components
export function PinButton({ 
  item, 
  type,
  title,
  data 
}: { 
  item: string;
  type: PinnedPanel['type'];
  title: string;
  data: Record<string, unknown>;
}) {
  const { pinnedPanels, pinPanel, unpinPanel } = useControlRoomStore();
  const isPinned = pinnedPanels.some(p => p.id === item);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPinned) {
      unpinPanel(item);
    } else {
      pinPanel({ id: item, type, title, data });
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={clsx(
        'p-1 rounded transition-colors',
        isPinned 
          ? 'text-[var(--xrp-accent)] bg-[var(--xrp-glow)]' 
          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
      )}
      title={isPinned ? 'Unpin' : 'Pin to dock'}
    >
      {isPinned ? <PinOff size={12} /> : <Pin size={12} />}
    </button>
  );
}
