import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import React from "react";
import { pretendard } from "../../theme/font";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "../../query/providers";

export const metadata: Metadata = {
  title: "NOVA",
  description:
    "충북대학교 소프트웨어학과 노바 학술동아리와 함께 당신을 꿈을 펼쳐보세요!",
  openGraph: {
    // SNS 공유용 썸네일 SEO에는 크게 없다고하네..
    title: "충북대학교 소프트웨어학과 학술동아리 노바 홈페이지",
    description:
      "충북대학교 소프트웨어학과 학술동아리 노바와 함께 성장해보세요!",
    url: "https://nova.cbnu.ac.kr/",
    siteName: "CBNU SOFTWARE NOVA",
    images: [
      {
        url: "https://nova.cbnu.ac.kr/image/frame/image27.png",
        width: 600,
        height: 600,
        alt: "충북대 노바 학술동아리 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA - 충북대 소프트웨어학과 학술동아리",
    description: "충북대학교 소프트웨어학과 노바 학술동아리 공식 홈페이지",
    images: ["https://nova.cbnu.ac.kr/image/frame/image27.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <head>
        <meta
          name="google-site-verification"
          content="Ku6VQs4pIm3t7yVPNmrAaM0wZ6FG0inGGHbKiJ0Die8"
        />
      </head>
      {/* <LayoutClient>{children}</LayoutClient> */}
      <body>
        <Providers>
          {/* 추후 수정 예정 @kwonja */}
          <div id="root" className="max-w-screen-xl mx-auto">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
