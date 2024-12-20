import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: "nova",
  description: "nova web",
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

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
