import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "../../query/providers";
import ZustandProvider from "@/src/store/ZustandProvider";
import { BoardIdGet } from "@/src/api/board/integrated";
import { redirect } from "next/navigation";
import { getMemberId } from "@/src/api/user/server";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "NOVA",
  description: "충북대학교 소프트웨어학과 노바",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  let memberId = "";
  if (authToken) {
    memberId = await getMemberId();
  } else {
    memberId = "";
  }
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>
        {/* 추후 수정 예정 @kwonja */}
        <div id="root" className="max-w-screen-xl mx-auto">
          <Header memberId={memberId} />
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
