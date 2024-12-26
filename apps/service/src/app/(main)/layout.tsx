import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";

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
      <body className="max-w-screen-xl mx-auto border border-black">{children}</body>
    </html>
  );
}
