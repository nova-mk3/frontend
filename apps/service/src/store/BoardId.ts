import { create } from "zustand";

interface BoardIdState {
  INTEGRATED: string;
  CLUB_ARCHIVE: string;

  setBoardIds: (ids: { INTEGRATED: string; CLUB_ARCHIVE: string }) => void;
}

export const useBoardIdStore = create<BoardIdState>((set) => ({
  INTEGRATED: "1ccfd1d4-4283-4d1f-b720-72f82ede6893",
  CLUB_ARCHIVE: "f4b397bd-4624-4d9d-9d26-957f99c89812",
  setBoardIds: (ids) => set(ids),
}));
