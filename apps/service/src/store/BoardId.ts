import { create } from "zustand";

interface BoardIdState {
  INTEGRATED: string;
  CLUB_ARCHIVE: string;

  setBoardIds: (ids: { INTEGRATED: string; CLUB_ARCHIVE: string }) => void;
}

export const useBoardIdStore = create<BoardIdState>((set) => ({
  INTEGRATED: "03cbc040-fb83-46f7-9118-f637e9c14679",
  CLUB_ARCHIVE: "15ae2c32-f158-49f4-850b-b55b5c55ec67",
  setBoardIds: (ids) => set(ids),
}));
