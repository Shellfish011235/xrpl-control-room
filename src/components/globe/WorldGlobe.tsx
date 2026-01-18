import { useState, useMemo, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from 'react-simple-maps';
import { useGlobeStore } from '../../store/globeStore';
import { 
  getHubs, 
  getCorridors, 
  getHubById,
  lensMetadata,
  countryRegulatoryStatus 
} from '../../data/globeContent';
import { clsx } from 'clsx';
import type { GlobeHub, GlobeCorridor } from '../../types/globe';

// Geography type from react-simple-maps
interface GeoFeature {
  rsmKey: string;
  properties: { ISO_A2?: string; name?: string };
  geometry: object;
}

// World topology - using a CDN for the world map
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Hub type colors
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

// Corridor volume line widths
const corridorWidths: Record<GlobeCorridor['volume'], number> = {
  high: 2.5,
  medium: 1.5,
  low: 1
};

// Regulatory status colors for countries
const regulatoryColors: Record<string, string> = {
  favorable: 'rgba(16, 185, 129, 0.4)', // green
  regulated: 'rgba(59, 130, 246, 0.4)', // blue
  developing: 'rgba(245, 158, 11, 0.4)', // amber
  restricted: 'rgba(239, 68, 68, 0.4)', // red
  unclear: 'rgba(107, 114, 128, 0.3)' // gray
};

interface WorldGlobeProps {
  className?: string;
}

export function WorldGlobe({ className }: WorldGlobeProps) {
  const { activeLens, selection, setSelection, clearSelection } = useGlobeStore();
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [0, 20],
    zoom: 1
  });
  
  const hubs = useMemo(() => getHubs(), []);
  const corridors = useMemo(() => getCorridors(), []);
  
  // Get corridor endpoints
  const getCorridorEndpoints = useCallback((corridor: GlobeCorridor): { from: [number, number]; to: [number, number] } | null => {
    let fromCoords: [number, number] | null = null;
    let toCoords: [number, number] | null = null;
    
    if (typeof corridor.from === 'string') {
      const hub = getHubById(corridor.from);
      if (hub) fromCoords = hub.coordinates;
    } else {
      fromCoords = corridor.from.coordinates;
    }
    
    if (typeof corridor.to === 'string') {
      const hub = getHubById(corridor.to);
      if (hub) toCoords = hub.coordinates;
    } else {
      toCoords = corridor.to.coordinates;
    }
    
    if (fromCoords && toCoords) {
      return { from: fromCoords, to: toCoords };
    }
    return null;
  }, []);
  
  // Handle country click - FIXED: prevent event propagation
  const handleCountryClick = useCallback((geo: { properties: { ISO_A2?: string; name?: string } }, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const iso2 = geo.properties.ISO_A2;
    if (iso2 && iso2 !== '-99') {
      setSelection({
        type: 'country',
        id: iso2,
        countryIso2: iso2
      });
    }
  }, [setSelection]);
  
  // Handle hub click - FIXED: prevent event propagation
  const handleHubClick = useCallback((hub: GlobeHub, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSelection({
      type: 'hub',
      id: hub.id,
      countryIso2: hub.countryIso2
    });
  }, [setSelection]);
  
  // Handle corridor click - FIXED: prevent event propagation
  const handleCorridorClick = useCallback((corridor: GlobeCorridor, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSelection({
      type: 'corridor',
      id: corridor.id
    });
  }, [setSelection]);
  
  // Get country fill color based on lens
  const getCountryFill = useCallback((geo: { properties: { ISO_A2?: string } }) => {
    const iso2 = geo.properties.ISO_A2;
    
    // Highlight selected country
    if (selection.type === 'country' && selection.countryIso2 === iso2) {
      return 'rgba(0, 195, 255, 0.5)';
    }
    
    // Show regulatory status on regulation lens
    if (activeLens === 'regulation' && iso2) {
      const status = countryRegulatoryStatus[iso2];
      if (status) {
        return regulatoryColors[status.status];
      }
    }
    
    // Check if country has hubs
    const hasHub = hubs.some(h => h.countryIso2 === iso2);
    if (hasHub) {
      return 'rgba(0, 195, 255, 0.15)';
    }
    
    return '#151b23'; // Use direct color instead of CSS variable for SVG
  }, [activeLens, selection, hubs]);
  
  // Filter corridors by lens relevance
  const visibleCorridors = useMemo(() => {
    if (activeLens === 'corridors' || activeLens === 'ilp') {
      return corridors;
    }
    return [];
  }, [activeLens, corridors]);
  
  // Determine which hubs to show based on lens
  const visibleHubs = useMemo(() => {
    return hubs;
  }, [hubs]);
  
  const lensColor = lensMetadata[activeLens].color;
  
  // Handle clear selection with event prevention
  const handleClearSelection = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearSelection();
  }, [clearSelection]);
  
  // Handle zoom controls
  const handleZoomIn = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.5, 8) }));
  }, []);
  
  const handleZoomOut = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.5, 1) }));
  }, []);
  
  const handleReset = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ coordinates: [0, 20], zoom: 1 });
  }, []);
  
  return (
    <div 
      className={clsx('relative w-full h-full', className)}
      style={{ backgroundColor: '#0a0e14' }}
      onClick={(e) => e.stopPropagation()}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => setPosition({ coordinates, zoom })}
          minZoom={1}
          maxZoom={8}
        >
          {/* Countries */}
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: GeoFeature[] }) =>
              geographies.map((geo: GeoFeature) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={(e) => handleCountryClick(geo, e)}
                  style={{
                    default: {
                      fill: getCountryFill(geo),
                      stroke: '#1e2736',
                      strokeWidth: 0.5,
                      outline: 'none',
                      cursor: 'pointer'
                    },
                    hover: {
                      fill: 'rgba(0, 195, 255, 0.3)',
                      stroke: '#00c3ff',
                      strokeWidth: 1,
                      outline: 'none',
                      cursor: 'pointer'
                    },
                    pressed: {
                      fill: 'rgba(0, 195, 255, 0.4)',
                      stroke: '#00c3ff',
                      strokeWidth: 1,
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* Corridors */}
          {visibleCorridors.map((corridor) => {
            const endpoints = getCorridorEndpoints(corridor);
            if (!endpoints) return null;
            
            const isSelected = selection.type === 'corridor' && selection.id === corridor.id;
            
            return (
              <Line
                key={corridor.id}
                from={endpoints.from}
                to={endpoints.to}
                stroke={isSelected ? '#00c3ff' : lensColor}
                strokeWidth={isSelected ? 3 : corridorWidths[corridor.volume]}
                strokeOpacity={isSelected ? 1 : 0.6}
                strokeLinecap="round"
                onClick={(e) => handleCorridorClick(corridor, e)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
          
          {/* Hubs */}
          {visibleHubs.map((hub) => {
            const isSelected = selection.type === 'hub' && selection.id === hub.id;
            const isCountrySelected = selection.type === 'country' && selection.countryIso2 === hub.countryIso2;
            
            return (
              <Marker
                key={hub.id}
                coordinates={hub.coordinates}
                onClick={(e) => handleHubClick(hub, e)}
              >
                <g style={{ cursor: 'pointer' }}>
                  {/* Glow effect for selected */}
                  {(isSelected || isCountrySelected) && (
                    <circle
                      r={12}
                      fill="none"
                      stroke="#00c3ff"
                      strokeWidth={2}
                      opacity={0.5}
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Main marker */}
                  <circle
                    r={isSelected ? 8 : 5}
                    fill={hubTypeColors[hub.type]}
                    stroke="#0a0e14"
                    strokeWidth={1.5}
                  />
                  
                  {/* Inner dot for headquarters/regional_hq */}
                  {(hub.type === 'headquarters' || hub.type === 'regional_hq') && (
                    <circle r={2} fill="#fff" />
                  )}
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
      
      {/* Map controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-8 h-8 bg-[#0d1117] border border-[#1e2736] rounded flex items-center justify-center text-[#8b949e] hover:text-[#e6edf3] hover:border-[#2d3748] transition-colors"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="w-8 h-8 bg-[#0d1117] border border-[#1e2736] rounded flex items-center justify-center text-[#8b949e] hover:text-[#e6edf3] hover:border-[#2d3748] transition-colors"
        >
          −
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-8 h-8 bg-[#0d1117] border border-[#1e2736] rounded flex items-center justify-center text-[#8b949e] hover:text-[#e6edf3] hover:border-[#2d3748] transition-colors text-xs"
        >
          ↺
        </button>
      </div>
      
      {/* Selection clear button */}
      {selection.type !== 'none' && (
        <button
          type="button"
          onClick={handleClearSelection}
          className="absolute top-4 left-4 px-3 py-1.5 bg-[#0d1117] border border-[#1e2736] rounded text-xs text-[#8b949e] hover:text-[#e6edf3] hover:border-[#2d3748] transition-colors z-10"
        >
          Clear Selection
        </button>
      )}
    </div>
  );
}
