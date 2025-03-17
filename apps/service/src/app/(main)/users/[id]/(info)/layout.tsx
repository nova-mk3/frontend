import React from "react";
import SubNavigation from "./components/SubNavigation";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SubNavigation />
      {children}
    </div>
  );
}
