import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { useControlRoomStore } from '../../store';
import { clsx } from 'clsx';
import type { GuidedPath as GuidedPathType } from '../../types';

interface GuidedPathProps {
  path: GuidedPathType;
}

export function GuidedPath({ path }: GuidedPathProps) {
  const [expanded, setExpanded] = useState(false);
  const { guidedPaths, completeStep, resetPath } = useControlRoomStore();
  
  const stepCompletion = guidedPaths[path.id] || [];
  const completedCount = stepCompletion.filter(Boolean).length;
  const progress = (completedCount / path.steps.length) * 100;
  
  return (
    <div className="border border-[var(--border-subtle)] rounded bg-[var(--bg-secondary)]">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 hover:bg-[var(--bg-hover)] transition-colors text-left"
      >
        <span className="text-[var(--text-muted)]">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {path.title}
            </span>
            {completedCount === path.steps.length && (
              <span className="badge badge-positive">Complete</span>
            )}
          </div>
          <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
            {path.description}
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-[var(--text-muted)]">
            {completedCount}/{path.steps.length}
          </span>
          <div className="w-16 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--status-positive)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </button>
      
      {/* Steps */}
      {expanded && (
        <div className="border-t border-[var(--border-subtle)]">
          <div className="p-2">
            {path.steps.map((step, index) => {
              const isCompleted = stepCompletion[index] || false;
              
              return (
                <div
                  key={step.id}
                  className={clsx(
                    'flex items-start gap-3 p-2 rounded transition-colors',
                    isCompleted ? 'opacity-60' : 'hover:bg-[var(--bg-hover)]'
                  )}
                >
                  <button
                    onClick={() => completeStep(path.id, index)}
                    className={clsx(
                      'mt-0.5 transition-colors',
                      isCompleted ? 'text-[var(--status-positive)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                    )}
                    disabled={isCompleted}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Circle size={16} />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className={clsx(
                      'text-xs font-medium',
                      isCompleted ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'
                    )}>
                      {step.title}
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                      {step.description}
                    </p>
                  </div>
                  
                  <span className="text-[9px] text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded">
                    Step {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Reset button */}
          {completedCount > 0 && (
            <div className="px-3 pb-3">
              <button
                onClick={() => resetPath(path.id)}
                className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <RotateCcw size={10} />
                Reset progress
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for sidebars
export function GuidedPathCompact({ path }: GuidedPathProps) {
  const { guidedPaths, completeStep } = useControlRoomStore();
  const stepCompletion = guidedPaths[path.id] || [];
  const completedCount = stepCompletion.filter(Boolean).length;
  const nextStepIndex = stepCompletion.findIndex(c => !c);
  const nextStep = nextStepIndex >= 0 ? path.steps[nextStepIndex] : null;
  
  if (!nextStep) {
    return (
      <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded text-center">
        <CheckCircle2 size={20} className="mx-auto text-[var(--status-positive)] mb-1" />
        <p className="text-xs text-[var(--text-muted)]">{path.title} complete!</p>
      </div>
    );
  }
  
  return (
    <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {path.title}
        </span>
        <span className="text-[9px] text-[var(--text-muted)]">
          {completedCount}/{path.steps.length}
        </span>
      </div>
      
      <div className="flex items-start gap-2">
        <button
          onClick={() => completeStep(path.id, nextStepIndex)}
          className="mt-0.5 text-[var(--text-muted)] hover:text-[var(--status-positive)] transition-colors"
        >
          <Circle size={14} />
        </button>
        <div>
          <p className="text-xs text-[var(--text-primary)]">{nextStep.title}</p>
          <p className="text-[10px] text-[var(--text-muted)]">{nextStep.description}</p>
        </div>
      </div>
    </div>
  );
}
