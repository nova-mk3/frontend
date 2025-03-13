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

export const metadata: Metadata = {
  title: "nova",
  description: "nova web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await BoardIdGet(); //no-cache

  const memberId = await getMemberId(); // ✅ API Route에서 로그인 상태 확인
  // if (!memberId) {
  //   redirect("/signin"); // ✅ 로그인되지 않은 경우 자동 리다이렉트
  // }
  // const memberData = await getMember({ memberId });
  // console.log(memberData);

  console.log(memberId);
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>
        {/* 추후 수정 예정 @kwonja */}
        <div id="root" className="max-w-screen-xl mx-auto">
          <Header userId={memberId} />
          <Providers>
            {/* 실제 배포할때 주석제거할 예정 */}
            <ZustandProvider data={data}>{children}</ZustandProvider>
          </Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
