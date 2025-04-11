import React from "react";
import LayoutClient from "./components/LayoutClient";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
