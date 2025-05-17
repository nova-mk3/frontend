"use client";
import React, { useEffect } from "react";
import { GetUnreadAlarmCount } from "../api/alarm";

interface Props {
  children: React.ReactNode;
}
export default function UnReadAlarmCountLayout({ children }: Props) {
  const getUnreadAlarmCount = async () => {
    try {
      const response = await GetUnreadAlarmCount();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUnreadAlarmCount();
  }, []);
  return (
    <>
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></div>
      {children}
    </>
  );
}
