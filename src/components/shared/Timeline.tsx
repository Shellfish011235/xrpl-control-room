import { clsx } from 'clsx';
import type { TimelineEvent } from '../../types';

const categoryColors: Record<TimelineEvent['category'], string> = {
  technical: 'bg-blue-500',
  regulatory: 'bg-amber-500',
  community: 'bg-purple-500',
  market: 'bg-green-500'
};

const categoryLabels: Record<TimelineEvent['category'], string> = {
  technical: 'Technical',
  regulatory: 'Regulatory',
  community: 'Community',
  market: 'Market'
};

interface TimelineProps {
  events: TimelineEvent[];
  maxItems?: number;
  compact?: boolean;
}

export function Timeline({ events, maxItems, compact = false }: TimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const displayEvents = maxItems ? sortedEvents.slice(0, maxItems) : sortedEvents;

  if (compact) {
    return (
      <div className="space-y-2">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-2 p-2 bg-[var(--bg-secondary)] rounded border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors"
          >
            <div className={clsx('w-1.5 h-1.5 rounded-full mt-1.5 shrink-0', categoryColors[event.category])} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-muted)] tabular-nums">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
                <span className={clsx(
                  'text-[9px] px-1.5 py-0.5 rounded',
                  event.significance === 'major' 
                    ? 'bg-[var(--xrp-glow)] text-[var(--xrp-accent)]' 
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                )}>
                  {categoryLabels[event.category]}
                </span>
              </div>
              <p className="text-xs text-[var(--text-primary)] mt-0.5 line-clamp-1">
                {event.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-[var(--border-subtle)]" />
      
      <div className="space-y-4">
        {displayEvents.map((event) => (
          <div key={event.id} className="relative flex gap-4">
            {/* Dot */}
            <div className={clsx(
              'relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0',
              event.significance === 'major' 
                ? 'bg-[var(--bg-primary)] border-2 border-[var(--xrp-accent)]' 
                : 'bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
            )}>
              <div className={clsx('w-2 h-2 rounded-full', categoryColors[event.category])} />
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[var(--text-muted)] tabular-nums font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric' 
                  })}
                </span>
                <span className={clsx(
                  'text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider',
                  `bg-opacity-20`,
                  categoryColors[event.category].replace('bg-', 'text-'),
                  'bg-[var(--bg-tertiary)]'
                )}>
                  {categoryLabels[event.category]}
                </span>
                {event.significance === 'major' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--xrp-glow)] text-[var(--xrp-accent)] uppercase tracking-wider">
                    Major
                  </span>
                )}
              </div>
              
              <h4 className="text-sm font-medium text-[var(--text-primary)]">
                {event.title}
              </h4>
              
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Horizontal timeline for compact display
export function HorizontalTimeline({ events }: { events: TimelineEvent[] }) {
  const sortedEvents = [...events]
    .filter(e => e.significance === 'major')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="relative overflow-x-auto pb-4">
      {/* Line */}
      <div className="absolute top-3 left-0 right-0 h-px bg-[var(--border-default)]" />
      
      <div className="flex gap-6 min-w-max px-2">
        {sortedEvents.map((event) => (
          <div key={event.id} className="relative flex flex-col items-center w-28">
            {/* Dot */}
            <div className={clsx(
              'relative z-10 w-6 h-6 rounded-full flex items-center justify-center',
              'bg-[var(--bg-primary)] border-2 border-[var(--xrp-accent)]'
            )}>
              <div className={clsx('w-2 h-2 rounded-full', categoryColors[event.category])} />
            </div>
            
            {/* Date */}
            <span className="text-[10px] text-[var(--text-muted)] mt-2 tabular-nums">
              {new Date(event.date).toLocaleDateString('en-US', { 
                month: 'short', 
                year: '2-digit' 
              })}
            </span>
            
            {/* Title */}
            <p className="text-[10px] text-[var(--text-primary)] text-center mt-1 line-clamp-2">
              {event.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
