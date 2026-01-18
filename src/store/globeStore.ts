import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  GlobeLens, 
  GlobeSelection, 
  GlobeState, 
  PinnedItemRef, 
  GuidedStepCompletion 
} from '../types/globe';

interface GlobeStore extends GlobeState {
  // Lens and selection
  setActiveLens: (lens: GlobeLens) => void;
  setSelection: (selection: GlobeSelection) => void;
  clearSelection: () => void;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
  
  // Pinned items
  pinnedItems: PinnedItemRef[];
  pinItem: (item: PinnedItemRef) => void;
  unpinItem: (id: string) => void;
  moveItemUp: (id: string) => void;
  moveItemDown: (id: string) => void;
  isPinned: (type: PinnedItemRef['type'], id: string) => boolean;
  
  // Guided steps completion
  stepCompletions: Record<string, GuidedStepCompletion>;
  toggleStepComplete: (stepId: string) => void;
  setTeachBackResponse: (stepId: string, response: string) => void;
  getStepCompletion: (stepId: string) => GuidedStepCompletion | undefined;
  getCompletedStepsCount: (lens: GlobeLens, stepIds: string[]) => number;
}

const initialState: GlobeState = {
  activeLens: 'validators',
  selection: {
    type: 'none',
    id: null
  },
  sidebarExpanded: true // Always start with sidebar visible
};

// Clear old localStorage that might have bad state
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem('xrpl-globe-state');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Force sidebar to be expanded if it was somehow set to false
      if (parsed.state && parsed.state.sidebarExpanded === false) {
        parsed.state.sidebarExpanded = true;
        localStorage.setItem('xrpl-globe-state', JSON.stringify(parsed));
      }
    }
  } catch (e) {
    // Ignore errors
  }
}

export const useGlobeStore = create<GlobeStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Lens and selection actions
      setActiveLens: (lens) => set({ 
        activeLens: lens,
        selection: { type: 'none', id: null }
      }),
      
      setSelection: (selection) => set({ selection }),
      
      clearSelection: () => set({ 
        selection: { type: 'none', id: null } 
      }),
      
      toggleSidebar: () => set((state) => ({ 
        sidebarExpanded: !state.sidebarExpanded 
      })),
      
      setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
      
      // Pinned items
      pinnedItems: [],
      
      pinItem: (item) => set((state) => {
        // Don't add duplicates
        if (state.pinnedItems.some(p => p.type === item.type && p.id === item.id)) {
          return state;
        }
        return {
          pinnedItems: [...state.pinnedItems, { ...item, pinnedAt: new Date().toISOString() }]
        };
      }),
      
      unpinItem: (id) => set((state) => ({
        pinnedItems: state.pinnedItems.filter(p => p.id !== id)
      })),
      
      moveItemUp: (id) => set((state) => {
        const index = state.pinnedItems.findIndex(p => p.id === id);
        if (index <= 0) return state;
        
        const newItems = [...state.pinnedItems];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        return { pinnedItems: newItems };
      }),
      
      moveItemDown: (id) => set((state) => {
        const index = state.pinnedItems.findIndex(p => p.id === id);
        if (index < 0 || index >= state.pinnedItems.length - 1) return state;
        
        const newItems = [...state.pinnedItems];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        return { pinnedItems: newItems };
      }),
      
      isPinned: (type, id) => {
        return get().pinnedItems.some(p => p.type === type && p.id === id);
      },
      
      // Guided steps completion
      stepCompletions: {},
      
      toggleStepComplete: (stepId) => set((state) => {
        const existing = state.stepCompletions[stepId];
        const isNowComplete = !existing?.completed;
        
        return {
          stepCompletions: {
            ...state.stepCompletions,
            [stepId]: {
              stepId,
              completed: isNowComplete,
              completedAt: isNowComplete ? new Date().toISOString() : undefined,
              teachBackResponse: existing?.teachBackResponse
            }
          }
        };
      }),
      
      setTeachBackResponse: (stepId, response) => set((state) => ({
        stepCompletions: {
          ...state.stepCompletions,
          [stepId]: {
            ...state.stepCompletions[stepId],
            stepId,
            completed: state.stepCompletions[stepId]?.completed ?? false,
            teachBackResponse: response
          }
        }
      })),
      
      getStepCompletion: (stepId) => {
        return get().stepCompletions[stepId];
      },
      
      getCompletedStepsCount: (_lens, stepIds) => {
        const completions = get().stepCompletions;
        return stepIds.filter(id => completions[id]?.completed).length;
      }
    }),
    {
      name: 'xrpl-globe-state',
      partialize: (state) => ({
        activeLens: state.activeLens,
        sidebarExpanded: state.sidebarExpanded,
        pinnedItems: state.pinnedItems,
        stepCompletions: state.stepCompletions
      })
    }
  )
);
