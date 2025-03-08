import { create } from "zustand";

interface BoardIdState {
  INTEGRATED: string;
  CLUB_ARCHIVE: string;

  setBoardIds: (ids: { INTEGRATED: string; CLUB_ARCHIVE: string }) => void;
}

export const useBoardIdStore = create<BoardIdState>((set) => ({
  INTEGRATED: "9dd14e5f-2abe-4eb4-8d45-4fc087dde896",
  CLUB_ARCHIVE: "8afaffc6-87ae-42d1-8e82-f1b68fbcc799",
  setBoardIds: (ids) => set(ids),
}));
