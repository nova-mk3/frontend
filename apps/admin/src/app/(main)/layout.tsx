import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import { pretendard } from "../../theme/fonts";
import Sidebar from "./components/Sidebar";


export const metadata: Metadata = {
  title: "novAdmin",
  description: "nova admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} font-pretendard`}>
      <body>
        <div className="flex max-w-screen-xl max-h-screen">
          <Sidebar/>
          {children}
        </div>
      </body>
    </html>
  );
}
