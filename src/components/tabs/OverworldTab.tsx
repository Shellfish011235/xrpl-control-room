import { useEffect } from 'react';
import { WorldGlobe, GlobeContextSidebar, GlobeLensTabs, GlobeLegend } from '../globe';
import { useGlobeStore } from '../../store/globeStore';

export function OverworldTab() {
  const { setSidebarExpanded } = useGlobeStore();
  
  // Force sidebar to be expanded when entering Overworld tab
  useEffect(() => {
    setSidebarExpanded(true);
  }, [setSidebarExpanded]);
  
  return (
    <div 
      className="h-full w-full flex"
      style={{ 
        display: 'flex', 
        height: '100%', 
        width: '100%',
        backgroundColor: '#0a0e14'
      }}
    >
      {/* Left: Globe Map + Controls */}
      <div 
        className="flex-1 flex flex-col overflow-hidden"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {/* Top controls - Lens tabs */}
        <div 
          className="p-4 border-b shrink-0"
          style={{ 
            padding: '1rem', 
            borderBottom: '1px solid #1e2736',
            backgroundColor: '#0d1117',
            flexShrink: 0
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-lg font-semibold"
                style={{ fontSize: '1.125rem', fontWeight: 600, color: '#e6edf3' }}
              >
                Overworld
              </h1>
              <p 
                className="text-xs"
                style={{ fontSize: '0.75rem', color: '#484f58' }}
              >
                Global XRPL ecosystem map
              </p>
            </div>
            <GlobeLensTabs />
          </div>
        </div>
        
        {/* Globe Map */}
        <div 
          className="flex-1 relative overflow-hidden"
          style={{ flex: 1, position: 'relative', overflow: 'hidden' }}
        >
          <WorldGlobe />
          <GlobeLegend />
        </div>
      </div>
      
      {/* Right: Context Sidebar - ALWAYS VISIBLE */}
      <GlobeContextSidebar />
    </div>
  );
}
