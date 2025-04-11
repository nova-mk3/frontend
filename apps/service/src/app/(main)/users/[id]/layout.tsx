import React from "react";
import NavClient from "./components/NavClient";

export default async function layout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NavClient id={id}>{children}</NavClient>;
}
