import create from 'zustand';

interface BoardIdState {
    INTEGRATED: string;
    CLUB_ARCHIVE: string;
  
    setBoardIds: (ids: { INTEGRATED: string; CLUB_ARCHIVE: string }) => void;
  }
  
  export const useBoardIdStore = create<BoardIdState>((set) => ({
    INTEGRATED: '6e7698b6-1ef6-47fe-be39-cc414f24beaa',
    CLUB_ARCHIVE: 'fd9197d2-ac8c-487b-b802-73acf531f4de',
    setBoardIds: (ids) => set(ids),
  }));