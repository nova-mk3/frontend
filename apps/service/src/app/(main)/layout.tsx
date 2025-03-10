import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "../../query/providers";
import ZustandProvider from "@/src/store/ZustandProvider";
import { BoardIdGet } from "@/src/api/board/integrated";

export const metadata: Metadata = {
  title: "nova",
  description: "nova web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await BoardIdGet(); //no-cache

  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>
        {/* 추후 수정 예정 @kwonja */}
        <div id="root" className="max-w-screen-xl mx-auto">
          <Header />
          <Providers>
            {/* 실제 배포할때 주석제거할 예정 */}
            {/* <ZustandProvider data={data}> */}
            {children}
            {/* </ZustandProvider> */}
          </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
