import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TabId, PinnedPanel, UIState } from '../types';

interface ControlRoomStore extends UIState {
  // Tab navigation
  setActiveTab: (tab: TabId) => void;
  
  // Scanner mode
  toggleScanner: () => void;
  setScannerFocus: (section: string | null) => void;
  
  // Panel dock
  pinPanel: (panel: Omit<PinnedPanel, 'pinnedAt'>) => void;
  unpinPanel: (panelId: string) => void;
  toggleDock: () => void;
  
  // Guided paths
  completeStep: (pathId: string, stepIndex: number) => void;
  resetPath: (pathId: string) => void;
  
  // State management
  setLastVisited: (tab: TabId, section: string) => void;
  reset: () => void;
}

const initialState: UIState = {
  activeTab: 'overworld',
  scanner: {
    active: false,
    focusedSection: null,
  },
  pinnedPanels: [],
  dockExpanded: true,
  guidedPaths: {},
  lastVisited: {
    overworld: '',
    contributors: '',
    technical: '',
    regulations: '',
    stablecoins: '',
    resources: '',
  },
};

export const useControlRoomStore = create<ControlRoomStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      toggleScanner: () => set((state) => ({
        scanner: {
          ...state.scanner,
          active: !state.scanner.active,
        },
      })),
      
      setScannerFocus: (section) => set((state) => ({
        scanner: {
          ...state.scanner,
          focusedSection: section,
        },
      })),
      
      pinPanel: (panel) => set((state) => {
        // Prevent duplicates
        if (state.pinnedPanels.some(p => p.id === panel.id)) {
          return state;
        }
        // Limit to 8 panels
        const panels = state.pinnedPanels.length >= 8 
          ? state.pinnedPanels.slice(1) 
          : state.pinnedPanels;
        return {
          pinnedPanels: [...panels, { ...panel, pinnedAt: new Date().toISOString() }],
        };
      }),
      
      unpinPanel: (panelId) => set((state) => ({
        pinnedPanels: state.pinnedPanels.filter(p => p.id !== panelId),
      })),
      
      toggleDock: () => set((state) => ({
        dockExpanded: !state.dockExpanded,
      })),
      
      completeStep: (pathId, stepIndex) => set((state) => {
        const pathSteps = state.guidedPaths[pathId] || [];
        const newSteps = [...pathSteps];
        newSteps[stepIndex] = true;
        return {
          guidedPaths: {
            ...state.guidedPaths,
            [pathId]: newSteps,
          },
        };
      }),
      
      resetPath: (pathId) => set((state) => ({
        guidedPaths: {
          ...state.guidedPaths,
          [pathId]: [],
        },
      })),
      
      setLastVisited: (tab, section) => set((state) => ({
        lastVisited: {
          ...state.lastVisited,
          [tab]: section,
        },
      })),
      
      reset: () => set(initialState),
    }),
    {
      name: 'xrpl-control-room-state',
      partialize: (state) => ({
        pinnedPanels: state.pinnedPanels,
        dockExpanded: state.dockExpanded,
        guidedPaths: state.guidedPaths,
        lastVisited: state.lastVisited,
      }),
    }
  )
);

// Selectors
export const selectActiveTab = (state: ControlRoomStore) => state.activeTab;
export const selectScanner = (state: ControlRoomStore) => state.scanner;
export const selectPinnedPanels = (state: ControlRoomStore) => state.pinnedPanels;
export const selectDockExpanded = (state: ControlRoomStore) => state.dockExpanded;
