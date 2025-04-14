"use client"; // ✅ 클라이언트 컴포넌트

import { Menu } from "lucide-react";
import SidebarLayout, { Sidebar, SidebarTrigger } from "./AppSidebar";
import SidebarHeader from "./SidebarHeader";

import SiderbarContent from "./SiderbarContent";

export function SidebarWrapper() {
  return (
    <Sidebar>
      <SidebarTrigger className="hidden mobile:flex">
        <Menu size={30} />
      </SidebarTrigger>
      <SidebarLayout className="hidden mobile:block">
        <SidebarHeader />

        <SiderbarContent />
      </SidebarLayout>
    </Sidebar>
  );
}
