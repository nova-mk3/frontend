import React from "react";
import SubNavigation from "./components/SubNavigation";

export default async function layout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  return (
    <div>
      <SubNavigation id={id} />
      {children}
    </div>
  );
}
