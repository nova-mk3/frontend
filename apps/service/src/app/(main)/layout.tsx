import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import LayoutClient from "./components/Layout";

export const metadata: Metadata = {
  title: "nova",
  description: "nova web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <LayoutClient>{children}</LayoutClient>
    </html>
  );
}
