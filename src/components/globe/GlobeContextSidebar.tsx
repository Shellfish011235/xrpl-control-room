import { useMemo, useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  ChevronDown,
  Server, 
  Link2, 
  Route, 
  Users, 
  Scale, 
  Building,
  ExternalLink,
  Shield,
  Bookmark,
  Layers,
  Eye,
  Pin,
  PinOff,
  ListChecks,
  CheckCircle2,
  Circle,
  Sparkles,
  FileText
} from 'lucide-react';
import { useGlobeStore } from '../../store/globeStore';
import { 
  getBriefForLens, 
  getFilteredBriefItems,
  getSourcesByIds,
  getClaimsForSelection,
  getHubById,
  getCorridorById,
  getBuildInfo,
  lensMetadata,
  countryRegulatoryStatus,
  getGuidedStepsForLens,
  getBriefItemById
} from '../../data/globeContent';
import { clsx } from 'clsx';
import type { GlobeLens, BriefItem, Source, Claim, PinnedItemRef, GuidedStep } from '../../types/globe';

// Lens icons
const lensIcons: Record<GlobeLens, React.ReactNode> = {
  validators: <Server size={14} />,
  ilp: <Link2 size={14} />,
  corridors: <Route size={14} />,
  community: <Users size={14} />,
  regulation: <Scale size={14} />,
  projects: <Building size={14} />
};

// Tag colors
const tagColors: Record<string, string> = {
  Infrastructure: 'badge-info',
  Academic: 'badge-neutral',
  Enterprise: 'badge-positive',
  Foundation: 'badge-info',
  Community: 'badge-warning',
  Performance: 'badge-positive',
  Corridor: 'badge-info',
  Remittance: 'badge-positive',
  CBDC: 'badge-warning',
  Ecosystem: 'badge-neutral',
  Policy: 'badge-warning',
  Compliance: 'badge-info',
  Classification: 'badge-positive',
  Guidance: 'badge-neutral',
  Licensing: 'badge-positive',
  Consultation: 'badge-warning',
  Grants: 'badge-positive',
  Event: 'badge-info',
  Meetup: 'badge-neutral',
  Governance: 'badge-warning',
  Social: 'badge-neutral',
  Education: 'badge-info',
  Wallet: 'badge-positive',
  DEX: 'badge-info',
  EVM: 'badge-warning',
  Dev: 'badge-neutral',
  Stablecoin: 'badge-positive',
  NFT: 'badge-info',
  Business: 'badge-neutral',
  Mixed: 'badge-warning',
  Institutional: 'badge-positive'
};

// Difficulty colors
const difficultyColors: Record<string, string> = {
  basic: 'badge-positive',
  intermediate: 'badge-info',
  advanced: 'badge-warning'
};

interface BriefItemCardProps {
  item: BriefItem;
  onSourceClick: (sources: Source[]) => void;
  showPinButton?: boolean;
  lens: GlobeLens;
}

function BriefItemCard({ item, onSourceClick, showPinButton = true, lens }: BriefItemCardProps) {
  const { pinItem, unpinItem, isPinned } = useGlobeStore();
  const sources = useMemo(() => getSourcesByIds(item.sourceIds), [item.sourceIds]);
  const pinned = isPinned('brief-item', item.id);
  
  const handlePin = () => {
    if (pinned) {
      unpinItem(item.id);
    } else {
      pinItem({
        type: 'brief-item',
        id: item.id,
        lens,
        pinnedAt: new Date().toISOString(),
        label: item.title
      });
    }
  };
  
  return (
    <div className="p-3 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded hover:border-[var(--border-default)] transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={clsx('badge shrink-0', tagColors[item.tag] || 'badge-neutral')}>
          {item.tag}
        </span>
        <div className="flex items-center gap-1">
          {showPinButton && (
            <button
              onClick={handlePin}
              className={clsx(
                'p-1 rounded transition-colors',
                pinned 
                  ? 'text-[var(--xrp-accent)]' 
                  : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100 hover:text-[var(--text-primary)]'
              )}
              title={pinned ? 'Unpin' : 'Pin to sidebar'}
            >
              {pinned ? <PinOff size={12} /> : <Pin size={12} />}
            </button>
          )}
          <span className="text-[10px] text-[var(--text-muted)] tabular-nums">
            {item.date}
          </span>
        </div>
      </div>
      
      <h4 className="text-xs font-medium text-[var(--text-primary)] mb-1">
        {item.title}
      </h4>
      
      <p className="text-[11px] text-[var(--text-muted)] mb-2">
        {item.summary}
      </p>
      
      {sources.length > 0 && (
        <button
          onClick={() => onSourceClick(sources)}
          className="flex items-center gap-1 text-[10px] text-[var(--xrp-accent)] hover:underline"
        >
          <ExternalLink size={10} />
          {sources.length} source{sources.length > 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
}

function ProofPanel({ claims }: { claims: Claim[] }) {
  if (claims.length === 0) {
    return (
      <div className="text-center py-6 text-[var(--text-muted)]">
        <Shield size={24} className="mx-auto mb-2 opacity-50" />
        <p className="text-xs">Select a pin or corridor to see proof and sources.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {claims.slice(0, 3).map((claim) => (
        <div 
          key={claim.id}
          className="p-3 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={clsx(
              'badge',
              claim.evidenceLevel === 'high' ? 'badge-positive' :
              claim.evidenceLevel === 'medium' ? 'badge-info' : 'badge-warning'
            )}>
              {claim.evidenceLevel} confidence
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">{claim.claimType}</span>
          </div>
          
          <p className="text-xs text-[var(--text-primary)] mb-2">
            {claim.claim}
          </p>
          
          {claim.limitations.length > 0 && (
            <div className="mt-2 pt-2 border-t border-[var(--border-subtle)]">
              <p className="text-[10px] text-[var(--text-muted)] mb-1">What this does NOT claim:</p>
              <ul className="space-y-0.5">
                {claim.limitations.slice(0, 2).map((lim, i) => (
                  <li key={i} className="text-[10px] text-[var(--text-muted)] flex items-start gap-1">
                    <span>•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SourceModal({ sources, onClose }: { sources: Source[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-lg w-full max-w-md mx-4 max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 className="text-sm font-medium text-[var(--text-primary)]">Sources</h3>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">×</button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto max-h-[60vh]">
          {sources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded hover:border-[var(--border-default)] transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[var(--text-primary)]">{source.title}</span>
                <ExternalLink size={12} className="text-[var(--text-muted)]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-muted)]">{source.publisher}</span>
                <span className={clsx(
                  'badge text-[9px]',
                  source.reliability === 'high' ? 'badge-positive' :
                  source.reliability === 'medium' ? 'badge-info' : 'badge-warning'
                )}>
                  {source.reliability}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pinned Items Section
function PinnedSection() {
  const { pinnedItems, unpinItem, moveItemUp, moveItemDown, setActiveLens, setSelection } = useGlobeStore();
  
  const handleOpenCard = (item: PinnedItemRef) => {
    setActiveLens(item.lens);
    if (item.type === 'hub') {
      setSelection({ type: 'hub', id: item.id });
    } else if (item.type === 'corridor') {
      setSelection({ type: 'corridor', id: item.id });
    } else if (item.type === 'country') {
      setSelection({ type: 'country', id: item.id, countryIso2: item.id });
    }
  };
  
  if (pinnedItems.length === 0) {
    return (
      <div className="text-center py-4 text-[var(--text-muted)]">
        <Bookmark size={20} className="mx-auto mb-2 opacity-50" />
        <p className="text-xs">No pinned items yet.</p>
        <p className="text-[10px] mt-1">Click the pin icon on any card to save it here.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {pinnedItems.map((item, index) => (
        <div 
          key={`${item.type}-${item.id}`}
          className="p-2 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded flex items-center gap-2 group"
        >
          <div className="flex flex-col">
            <button
              onClick={() => moveItemUp(item.id)}
              disabled={index === 0}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30"
            >
              <ChevronUp size={10} />
            </button>
            <button
              onClick={() => moveItemDown(item.id)}
              disabled={index === pinnedItems.length - 1}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30"
            >
              <ChevronDown size={10} />
            </button>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--text-primary)] truncate">{item.label}</p>
            <p className="text-[9px] text-[var(--text-muted)]">{item.type} • {item.lens}</p>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleOpenCard(item)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--xrp-accent)] rounded"
              title="Open card"
            >
              <Eye size={12} />
            </button>
            <button
              onClick={() => unpinItem(item.id)}
              className="p-1 text-[var(--text-muted)] hover:text-red-400 rounded"
              title="Unpin"
            >
              <PinOff size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Guided Step Item
function GuidedStepItem({ step, onViewExample }: { step: GuidedStep; onViewExample: (refs: Array<{ type: string; id: string }>) => void }) {
  const { stepCompletions, toggleStepComplete, setTeachBackResponse } = useGlobeStore();
  const completion = stepCompletions[step.id];
  const isComplete = completion?.completed ?? false;
  const [showTeachBack, setShowTeachBack] = useState(false);
  const [response, setResponse] = useState(completion?.teachBackResponse ?? '');
  
  const handleSaveResponse = () => {
    setTeachBackResponse(step.id, response);
    setShowTeachBack(false);
  };
  
  return (
    <div className={clsx(
      'p-3 bg-[var(--bg-tertiary)] border rounded transition-colors',
      isComplete ? 'border-green-500/30 bg-green-500/5' : 'border-[var(--border-subtle)]'
    )}>
      <div className="flex items-start gap-2">
        <button
          onClick={() => toggleStepComplete(step.id)}
          className={clsx(
            'mt-0.5 shrink-0 transition-colors',
            isComplete ? 'text-green-500' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          )}
        >
          {isComplete ? <CheckCircle2 size={16} /> : <Circle size={16} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={clsx(
              'text-xs font-medium',
              isComplete ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'
            )}>
              {step.title}
            </h4>
            <span className={clsx('badge text-[9px]', difficultyColors[step.difficulty])}>
              {step.difficulty}
            </span>
          </div>
          
          <p className="text-[10px] text-[var(--text-muted)] mb-2 italic">
            {step.prompt}
          </p>
          
          <div className="flex items-center gap-2">
            {step.exampleRefs.length > 0 && (
              <button
                onClick={() => onViewExample(step.exampleRefs)}
                className="flex items-center gap-1 text-[10px] text-[var(--xrp-accent)] hover:underline"
              >
                <FileText size={10} />
                View example
              </button>
            )}
            <button
              onClick={() => setShowTeachBack(!showTeachBack)}
              className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <Sparkles size={10} />
              {completion?.teachBackResponse ? 'Edit response' : 'Teach back'}
            </button>
          </div>
          
          {showTeachBack && (
            <div className="mt-2 space-y-2">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Explain in your own words..."
                className="w-full p-2 text-xs bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded resize-none focus:outline-none focus:border-[var(--xrp-accent)]"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowTeachBack(false)}
                  className="px-2 py-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveResponse}
                  className="px-2 py-1 text-[10px] bg-[var(--xrp-accent)] text-white rounded hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Guided Steps Section
function GuidedStepsSection({ lens, onViewExample }: { lens: GlobeLens; onViewExample: (refs: Array<{ type: string; id: string }>) => void }) {
  const { stepCompletions } = useGlobeStore();
  const guidedSteps = useMemo(() => getGuidedStepsForLens(lens), [lens]);
  
  const completedCount = guidedSteps.steps.filter(s => stepCompletions[s.id]?.completed).length;
  const totalCount = guidedSteps.steps.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[var(--text-muted)]">Progress</span>
          <span className="text-[var(--text-primary)]">{completedCount}/{totalCount} complete</span>
        </div>
        <div className="h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Steps list */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {guidedSteps.steps.map((step) => (
          <GuidedStepItem 
            key={step.id} 
            step={step} 
            onViewExample={onViewExample}
          />
        ))}
      </div>
      
      <p className="text-[9px] text-[var(--text-muted)] italic">
        Completion is stored locally. These are optional learning prompts.
      </p>
    </div>
  );
}

export function GlobeContextSidebar() {
  const { activeLens, selection, sidebarExpanded, toggleSidebar, setSelection, pinnedItems } = useGlobeStore();
  const [sourcesModal, setSourcesModal] = useState<Source[] | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('brief');
  
  const brief = useMemo(() => getBriefForLens(activeLens), [activeLens]);
  const filteredItems = useMemo(() => getFilteredBriefItems(activeLens, selection), [activeLens, selection]);
  const claims = useMemo(() => getClaimsForSelection(selection), [selection]);
  const buildInfo = useMemo(() => getBuildInfo(), []);
  const lens = lensMetadata[activeLens];
  
  // Handle viewing example from guided steps
  const handleViewExample = (refs: Array<{ type: string; id: string }>) => {
    if (refs.length === 0) return;
    const ref = refs[0];
    
    if (ref.type === 'hub') {
      setSelection({ type: 'hub', id: ref.id });
    } else if (ref.type === 'corridor') {
      setSelection({ type: 'corridor', id: ref.id });
    } else if (ref.type === 'brief-item') {
      // For brief items, we could show a modal or scroll to it
      const item = getBriefItemById(ref.id);
      if (item) {
        // Expand brief section and scroll to item
        setExpandedSection('brief');
      }
    }
  };
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Selection context
  const selectionContext = useMemo(() => {
    if (selection.type === 'none') {
      return { label: 'Global', detail: 'All regions' };
    }
    if (selection.type === 'country' && selection.countryIso2) {
      const status = countryRegulatoryStatus[selection.countryIso2];
      return { 
        label: selection.countryIso2, 
        detail: status?.label || 'Selected country'
      };
    }
    if (selection.type === 'hub' && selection.id) {
      const hub = getHubById(selection.id);
      return { 
        label: hub?.name || 'Hub', 
        detail: hub?.description || 'Selected hub'
      };
    }
    if (selection.type === 'corridor' && selection.id) {
      const corridor = getCorridorById(selection.id);
      return { 
        label: corridor?.name || 'Corridor', 
        detail: corridor?.description || 'Selected corridor'
      };
    }
    return { label: 'Unknown', detail: '' };
  }, [selection]);
  
  // Collapsed sidebar (icon rail)
  if (!sidebarExpanded) {
    return (
      <div 
        className="w-12 h-full border-l flex flex-col items-center py-4"
        style={{
          width: '48px',
          height: '100%',
          borderLeft: '1px solid #1e2736',
          backgroundColor: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          flexShrink: 0
        }}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded transition-colors"
          style={{ padding: '0.5rem', color: '#8b949e' }}
          title="Expand sidebar"
        >
          <ChevronLeft size={16} />
        </button>
        
        <div className="mt-4 space-y-3">
          <div 
            className="w-8 h-8 rounded flex items-center justify-center" 
            style={{ 
              width: '2rem', 
              height: '2rem', 
              backgroundColor: '#151b23', 
              color: lens.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.25rem'
            }}
          >
            {lensIcons[activeLens]}
          </div>
          {selection.type !== 'none' && (
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#00c3ff', borderRadius: '50%' }}
              title="Selection active" 
            />
          )}
          {pinnedItems.length > 0 && (
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ 
                width: '1.5rem', 
                height: '1.5rem', 
                backgroundColor: '#151b23', 
                color: '#8b949e',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={`${pinnedItems.length} pinned`}
            >
              <span style={{ fontSize: '9px' }}>{pinnedItems.length}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Expanded sidebar - FULL CONTEXT PANEL
  return (
    <>
      <div 
        className="h-full border-l flex flex-col overflow-hidden"
        style={{
          width: '380px',
          minWidth: '380px',
          height: '100%',
          borderLeft: '1px solid #1e2736',
          backgroundColor: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span style={{ color: lens.color }}>{lensIcons[activeLens]}</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">Context Panel</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded transition-colors"
            title="Collapse sidebar"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Section 1: Situation */}
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={12} className="text-[var(--text-muted)]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Situation
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded flex items-center justify-center"
                  style={{ backgroundColor: `${lens.color}20`, color: lens.color }}
                >
                  {lensIcons[activeLens]}
                </div>
                <div>
                  <p className="text-xs font-medium text-[var(--text-primary)]">{lens.label}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{selectionContext.label} • {selectionContext.detail}</p>
                </div>
              </div>
              
              <p className="text-xs text-[var(--text-secondary)]">
                {lens.description}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="badge badge-info flex items-center gap-1">
                  <Shield size={10} />
                  Snapshot data
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  As of {brief.asOf}
                </span>
              </div>
            </div>
          </div>
          
          {/* Section 2: Running Brief (collapsible) */}
          <div className="border-b border-[var(--border-subtle)]">
            <button 
              onClick={() => toggleSection('brief')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers size={12} className="text-[var(--text-muted)]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Running Brief
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  ({filteredItems.length})
                </span>
              </div>
              {expandedSection === 'brief' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {expandedSection === 'brief' && (
              <div className="px-4 pb-4">
                <p className="text-[10px] text-[var(--text-muted)] mb-3 italic">
                  Recent items (snapshot) — not a live feed
                </p>
                
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {filteredItems.slice(0, 10).map((item) => (
                    <BriefItemCard 
                      key={item.id} 
                      item={item} 
                      onSourceClick={setSourcesModal}
                      lens={activeLens}
                    />
                  ))}
                  
                  {filteredItems.length === 0 && (
                    <div className="text-center py-4 text-xs text-[var(--text-muted)]">
                      No items for current selection
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Section 3: Pinned (collapsible) */}
          <div className="border-b border-[var(--border-subtle)]">
            <button 
              onClick={() => toggleSection('pinned')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Pin size={12} className="text-[var(--text-muted)]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Pinned
                </span>
                {pinnedItems.length > 0 && (
                  <span className="px-1.5 py-0.5 text-[9px] bg-[var(--xrp-accent)]/20 text-[var(--xrp-accent)] rounded">
                    {pinnedItems.length}
                  </span>
                )}
              </div>
              {expandedSection === 'pinned' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {expandedSection === 'pinned' && (
              <div className="px-4 pb-4">
                <PinnedSection />
              </div>
            )}
          </div>
          
          {/* Section 4: Guided Steps (collapsible) */}
          <div className="border-b border-[var(--border-subtle)]">
            <button 
              onClick={() => toggleSection('guided')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <ListChecks size={12} className="text-[var(--text-muted)]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Guided Steps
                </span>
              </div>
              {expandedSection === 'guided' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {expandedSection === 'guided' && (
              <div className="px-4 pb-4">
                <GuidedStepsSection lens={activeLens} onViewExample={handleViewExample} />
              </div>
            )}
          </div>
          
          {/* Section 5: Proof (collapsible) */}
          <div className="border-b border-[var(--border-subtle)]">
            <button 
              onClick={() => toggleSection('proof')}
              className="w-full p-4 flex items-center justify-between hover:bg-[var(--bg-hover)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-[var(--text-muted)]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Proof
                </span>
              </div>
              {expandedSection === 'proof' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {expandedSection === 'proof' && (
              <div className="px-4 pb-4">
                <ProofPanel claims={claims} />
              </div>
            )}
          </div>
          
          {/* Section 6: Actions */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bookmark size={12} className="text-[var(--text-muted)]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Actions
              </span>
            </div>
            
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded text-xs text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)] transition-colors text-left flex items-center gap-2">
                <Layers size={12} />
                Open Workshop (deep dive)
              </button>
              <button className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded text-xs text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)] transition-colors text-left flex items-center gap-2">
                <Eye size={12} />
                View in Network Mode
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-tertiary)] shrink-0">
          <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)]">
            <span>Content pack v{buildInfo.version}</span>
            <span>Built {new Date(buildInfo.buildDate).toLocaleDateString()}</span>
          </div>
          <p className="text-[9px] text-[var(--text-muted)] mt-1 italic">
            {buildInfo.updatePolicy.disclaimer}
          </p>
        </div>
      </div>
      
      {/* Sources Modal */}
      {sourcesModal && (
        <SourceModal sources={sourcesModal} onClose={() => setSourcesModal(null)} />
      )}
    </>
  );
}
