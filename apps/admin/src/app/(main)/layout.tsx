import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import { pretendard } from "../../theme/fonts";
import AdminSidebar from "./components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@nova/ui/components/ui/sidebar";
import Providers from "../../api/providers";

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
      <body className="flex max-w-screen-xl max-h-screen">
        <Providers>
          <SidebarProvider>
            <AdminSidebar/>
            <main>
              <SidebarTrigger /> 
              {/* 사이드바 줄이기 용도가 필요할경우 Trigger 사용 */}
              {children}
            </main>
          </SidebarProvider>
       </Providers>
      </body>
    </html>
  );
}
