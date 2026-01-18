import { useControlRoomStore } from '../../store';
import { Scan, X } from 'lucide-react';
import { clsx } from 'clsx';

export function ScannerToggle() {
  const { scanner, toggleScanner } = useControlRoomStore();
  
  return (
    <button
      onClick={toggleScanner}
      className={clsx(
        'flex items-center gap-2 px-3 py-1.5 rounded border transition-all',
        scanner.active 
          ? 'bg-[var(--xrp-glow)] border-[var(--scanner-reticle)] text-[var(--xrp-accent)]' 
          : 'bg-[var(--bg-tertiary)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-default)]'
      )}
      title="Toggle Scanner Mode (S)"
    >
      <Scan size={14} />
      <span className="text-xs font-medium">Scanner</span>
      <kbd className="kbd text-[9px]">S</kbd>
    </button>
  );
}

export function ScannerOverlay() {
  const { scanner, toggleScanner } = useControlRoomStore();
  
  if (!scanner.active) return null;
  
  return (
    <>
      {/* Top bar indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--scanner-reticle)] to-transparent z-50 animate-pulse" />
      
      {/* Close button */}
      <button
        onClick={toggleScanner}
        className="fixed top-4 right-4 z-50 p-2 bg-[var(--bg-elevated)] border border-[var(--scanner-reticle)] rounded-full text-[var(--xrp-accent)] hover:bg-[var(--bg-hover)] transition-colors"
        title="Exit Scanner Mode"
      >
        <X size={16} />
      </button>
      
      {/* Instructions */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--scanner-reticle)] rounded-lg">
        <p className="text-xs text-[var(--text-secondary)]">
          <span className="text-[var(--xrp-accent)] font-medium">Scanner Mode Active</span> — 
          Hover over sections to focus. Press <kbd className="kbd mx-1">S</kbd> or <kbd className="kbd mx-1">Esc</kbd> to exit.
        </p>
      </div>
    </>
  );
}

// Wrapper for scannable sections
export function ScannerSection({ 
  id, 
  children, 
  className 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  const { scanner, setScannerFocus } = useControlRoomStore();
  const isFocused = scanner.active && scanner.focusedSection === id;
  const isDimmed = scanner.active && scanner.focusedSection && scanner.focusedSection !== id;
  
  return (
    <div
      className={clsx(
        className,
        'transition-all duration-150',
        isDimmed && 'opacity-35',
        isFocused && 'relative'
      )}
      onMouseEnter={() => scanner.active && setScannerFocus(id)}
      onMouseLeave={() => scanner.active && setScannerFocus(null)}
    >
      {isFocused && (
        <div className="absolute inset-0 border border-[var(--scanner-reticle)] rounded pointer-events-none z-10">
          {/* Corner reticles */}
          <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-[var(--scanner-reticle)]" />
          <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-[var(--scanner-reticle)]" />
          <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-[var(--scanner-reticle)]" />
          <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-[var(--scanner-reticle)]" />
        </div>
      )}
      {children}
    </div>
  );
}
