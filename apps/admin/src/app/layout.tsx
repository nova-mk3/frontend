import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "novAdmin",
  description: "nova admin",
};

import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>{children}</body>
    </html>
  );
}
