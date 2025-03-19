import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "../../query/providers";

export const metadata: Metadata = {
  title: "NOVA",
  description: "충북대학교 소프트웨어학과 노바",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>
        {/* 추후 수정 예정 @kwonja */}
        <div id="root" className="max-w-screen-xl mx-auto">
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
