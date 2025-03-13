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
  title: "nova",
  description: "nova web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await BoardIdGet(); //no-cache

  const cookieStore = await cookies();
  const authToken = cookieStore.get("AUTH_TOKEN")?.value;
  let memberId = "";
  if (authToken) {
    memberId = await getMemberId();
    if (memberId === null) {
      redirect("/signin");
    }
  } else {
    memberId = "";
  }

  console.log(memberId);
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>
        {/* 추후 수정 예정 @kwonja */}
        <div id="root" className="max-w-screen-xl mx-auto">
          <Header memberId={memberId} />
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
