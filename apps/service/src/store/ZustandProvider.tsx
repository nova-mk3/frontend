// app/ZustandProvider.tsx (Client Component)
"use client";
import { useBoardIdStore } from "./BoardId";
import React from "react";

interface Props {
  children: React.ReactNode;
  data: any;
}

export default function ZustandProvider({ children, data }: Props) {
  const { setBoardIds } = useBoardIdStore();

  // 마운트 시점에 boardId를 zustand에 저장
  const integratedId = data.find((item: any) => item.category === "INTEGRATED")
    ?.id as string;
  const clubArchiveId = data.find(
    (item: any) => item.category === "CLUB_ARCHIVE"
  )?.id as string;

  // Zustand에 저장
  React.useEffect(() => {
    setBoardIds({ INTEGRATED: integratedId, CLUB_ARCHIVE: clubArchiveId });
  }, [integratedId, clubArchiveId, setBoardIds]);

  return <>{children}</>;
}
