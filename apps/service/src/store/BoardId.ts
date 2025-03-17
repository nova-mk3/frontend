import { create } from "zustand";

interface BoardIdState {
  INTEGRATED: string;
  CLUB_ARCHIVE: string;

  setBoardIds: (ids: { INTEGRATED: string; CLUB_ARCHIVE: string }) => void;
}

export const useBoardIdStore = create<BoardIdState>((set) => ({
  INTEGRATED: "dffc0da3-bfb5-48c9-a8de-bcecab8c3541",
  CLUB_ARCHIVE: "f7e1e71a-3d42-49d9-be3f-5f87e9321f7c",
  setBoardIds: (ids) => set(ids),
}));
