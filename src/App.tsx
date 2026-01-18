import { useEffect, useCallback } from 'react';
import { Users, Cpu, Scale, DollarSign, BookOpen, Activity, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { useControlRoomStore } from './store';
import { ContributorsTab, TechnicalTab, RegulationsTab, StablecoinsTab, ResourcesTab, OverworldTab } from './components/tabs';
import { PanelDock, ScannerToggle, ScannerOverlay, FeedSidebar } from './components/shared';
import type { TabId, Tab } from './types';

const tabs: Tab[] = [
  { id: 'overworld', label: 'Overworld', shortcut: '0', icon: 'globe' },
  { id: 'contributors', label: 'Contributors & Community', shortcut: '1', icon: 'users' },
  { id: 'technical', label: 'Technical Features', shortcut: '2', icon: 'cpu' },
  { id: 'regulations', label: 'Regulations', shortcut: '3', icon: 'scale' },
  { id: 'stablecoins', label: 'Stablecoins & ETFs', shortcut: '4', icon: 'dollar' },
  { id: 'resources', label: 'Resources', shortcut: '5', icon: 'book' },
];

const tabIcons: Record<string, React.ReactNode> = {
  globe: <Globe size={14} />,
  users: <Users size={14} />,
  cpu: <Cpu size={14} />,
  scale: <Scale size={14} />,
  dollar: <DollarSign size={14} />,
  book: <BookOpen size={14} />,
};

function TabContent({ tabId }: { tabId: TabId }) {
  switch (tabId) {
    case 'overworld':
      return <OverworldTab />;
    case 'contributors':
      return <ContributorsTab />;
    case 'technical':
      return <TechnicalTab />;
    case 'regulations':
      return <RegulationsTab />;
    case 'stablecoins':
      return <StablecoinsTab />;
    case 'resources':
      return <ResourcesTab />;
    default:
      return null;
  }
}

export default function App() {
  const { activeTab, setActiveTab, scanner, toggleScanner } = useControlRoomStore();
  
  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Tab switching with number keys (0-5)
    if (e.key >= '0' && e.key <= '5' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const tabIndex = parseInt(e.key);
        if (tabs[tabIndex]) {
          setActiveTab(tabs[tabIndex].id);
        }
      }
    }
    
    // Scanner mode toggle
    if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        toggleScanner();
      }
    }
    
    // Escape to exit scanner
    if (e.key === 'Escape' && scanner.active) {
      toggleScanner();
    }
  }, [setActiveTab, toggleScanner, scanner.active]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  
  return (
    <div className={clsx('h-screen flex flex-col bg-[var(--bg-primary)]', scanner.active && 'scanner-active')}>
      {/* Header */}
      <header className="h-12 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[var(--xrp-glow)] border border-[var(--xrp-accent)] flex items-center justify-center">
              <Activity size={14} className="text-[var(--xrp-accent)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[var(--text-primary)]">XRPL Control Room</h1>
              <p className="text-[9px] text-[var(--text-muted)] -mt-0.5">Monitoring & Analysis</p>
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-px h-6 bg-[var(--border-subtle)] mx-2" />
          
          {/* Status indicators */}
          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="live-indicator">Network Online</span>
            </div>
            <div className="text-[var(--text-muted)]">
              Last update: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ScannerToggle />
          
          {/* Keyboard hints */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <span>Press</span>
            <kbd className="kbd">0-5</kbd>
            <span>to switch tabs</span>
          </div>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <nav className="h-10 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center px-2 shrink-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-4 h-full text-xs font-medium transition-colors relative',
              'hover:bg-[var(--bg-hover)]',
              activeTab === tab.id 
                ? 'text-[var(--xrp-accent)]' 
                : 'text-[var(--text-muted)]'
            )}
          >
            {tabIcons[tab.icon]}
            <span className="hidden sm:inline">{tab.label}</span>
            <kbd className="kbd text-[9px] ml-1 hidden lg:inline">{tab.shortcut}</kbd>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--xrp-accent)] rounded-full" />
            )}
          </button>
        ))}
      </nav>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <TabContent tabId={activeTab} />
        </main>
        
        {/* Right Sidebar - Feed (hidden on Overworld tab which has its own sidebar) */}
        {activeTab !== 'overworld' && (
          <div className="hidden xl:block">
            <FeedSidebar />
          </div>
        )}
        
        {/* Panel Dock (hidden on Overworld tab which has its own sidebar) */}
        {activeTab !== 'overworld' && <PanelDock />}
      </div>
      
      {/* Scanner Overlay */}
      <ScannerOverlay />
      
      {/* Footer Status Bar */}
      <footer className="h-6 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-between px-4 text-[10px] text-[var(--text-muted)] shrink-0">
        <div className="flex items-center gap-4">
          <span>XRPL Mainnet: <span className="text-green-400">●</span> Connected</span>
          <span>EVM Sidechain: <span className="text-green-400">●</span> Connected</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Data sources: GitHub, X/Twitter, Regulatory feeds</span>
          <span>|</span>
          <span>Built for the XRPL community</span>
        </div>
      </footer>
    </div>
  );
}
