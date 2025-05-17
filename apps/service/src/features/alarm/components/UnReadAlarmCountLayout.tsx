"use client";
import React from "react";
import { useUnreadAlarmCountQuery } from "../query/queries";

interface Props {
  children: React.ReactNode;
}
export default function UnReadAlarmCountLayout({ children }: Props) {
  const { data, isError } = useUnreadAlarmCountQuery({});

  if (isError) return null;
  return (
    <>
      {data.count > 0 && (
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></div>
      )}
      {children}
    </>
  );
}
