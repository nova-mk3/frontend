import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import Header from "./components/Header";

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
      <body className="max-w-screen-xl mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
