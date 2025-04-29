import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import { pretendard , paperlogy } from "../../theme/fonts";
import Providers from "../../api/providers";

export const metadata: Metadata = {
  title: "novAdmin",
  description: "충북대학교 소프트웨어학과 학술동아리 Nova 관리 페이지",
  openGraph: {
    title: "충북대학교 소프트웨어학과 학술동아리Nova 관리 페이지",
    description: "학술동아리의 Nova 관리자 전용 페이지입니다.",
    url: "https://nova.cbnu.ac.kr/admin",
    siteName: "NOVA",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAdmin - 충북대 소프트웨어학과 Nova 관리자 페이지",
    description: "충북대학교 소프트웨어학과 학술동아리의 Nova 관리 페이지입니다.",
  },
  verification: {
    google: "Ku6VQs4pIm3t7yVPNmrAaM0wZ6FG0inGGHbKiJ0Die8",
  },
  applicationName: "novAdmin",
  robots: { // SEO 검색에서 안나오게 설정
    index: false,
    follow: false,
  },
  icons: {
    icon: [{ url: "/image/favicon.svg", type: "image/svg+xml", sizes: "32x32" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${pretendard.variable} ${paperlogy.variable} font-pretendard`}>
      <body className="flex max-w-screen-xl max-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
