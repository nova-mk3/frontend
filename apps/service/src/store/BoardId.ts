import create from 'zustand';

interface BoardIdState {
    INTEGRATED: string;
    CLUB_ARCHIVE: string;
    SUGGESTION: string;
    setBoardIds: (ids: { INTEGRATED: string; CLUB_ARCHIVE: string; SUGGESTION: string }) => void;
  }
  
  export const useBoardIdStore = create<BoardIdState>((set) => ({
    INTEGRATED: '660fd7f9-c568-4ea9-b06a-ac3c771082c1',
    CLUB_ARCHIVE: '4d549fdf-e6a0-4b7f-98d0-297a1f56844b',
    SUGGESTION: 'f5d17525-298f-4a87-b759-63452b45c65d',
    setBoardIds: (ids) => set(ids),
  }));