import "@nova/tailwind-config/globalcss";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>{children}</>
  );
}