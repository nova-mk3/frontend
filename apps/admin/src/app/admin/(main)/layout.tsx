import "@nova/tailwind-config/globalcss";
import AdminSidebar from "./components/AdminSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@nova/ui/components/ui/sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <>
        <SidebarTrigger />
        {/* 사이드바 줄이기 용도가 필요할경우 Trigger 사용 */}
        {children}
      </>
    </SidebarProvider>
  );
}
