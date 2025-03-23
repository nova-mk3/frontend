import "@nova/tailwind-config/globalcss";
import type { Metadata } from "next";
import { pretendard } from "../../theme/fonts";
import AdminSidebar from "./components/AdminSidebar";
import { SidebarProvider , SidebarTrigger } from "@nova/ui/components/ui/sidebar";

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
      <SidebarProvider>
        <AdminSidebar/>
        <main>
          <SidebarTrigger />
          {children}
        </main>
       </SidebarProvider>
      </body>
    </html>
  );
}
