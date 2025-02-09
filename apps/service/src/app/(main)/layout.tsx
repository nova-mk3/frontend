import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./query/providers";

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
      <body>
        {/* 추후 수정 예정 @kwonja */}
        <div id="root" className="max-w-screen-xl mx-auto">
          <Header />
          <Providers>{children}</Providers>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
