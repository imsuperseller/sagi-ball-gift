import { create } from 'zustand';

type TeamState = {
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string | null) => void;
};

export const useTeamStore = create<TeamState>((set) => ({
  selectedTeamId: null,
  setSelectedTeamId: (id) => set({ selectedTeamId: id })
}));


