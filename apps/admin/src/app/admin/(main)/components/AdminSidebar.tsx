"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@nova/ui/components/ui/sidebar";
import Logo from "@/public/image/Logo.svg";
import { ScrollText, Users, TestTubeDiagonal, PcCase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", icon: ScrollText, href: "/admin" },
  { title: "member", icon: Users, href: "/admin/member" },
  { title: "ServerLog", icon: ScrollText, href: "/admin/serverLog" },
  { title: "ServerStatus", icon: PcCase, href: "/admin/serverStatus" },
  { title: "UXResearch", icon: TestTubeDiagonal, href: "/admin/uxResearch" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="flex flex-col h-screen pt-5 shadow-md rounded-2xl">
      <SidebarHeader className="flex-grow-0 flex items-center justify-center">
        <Logo height="50px" width="50px" fill="#B096F5" className="block" />
        <div className="text-4xl font-bold text-primary">novAdmin</div>
      </SidebarHeader>
      <SidebarContent className="flex-grow items-center justify-center">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex items-center justify-center">
              {items.map((item) => {
                const isActive = pathname === item.href; // 정확히 일치할 때만 활성화

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`w-[70%] m-1 p-3 min-h-0 rounded-xl hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out ${
                      isActive ? "bg-primary text-white" : ""
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex gap-2 items-center">
                        <item.icon style={{ width: "32px", height: "32px" }} />
                        <span className="pl-3 text-3xl">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex-grow-0"></SidebarFooter>
    </Sidebar>
  );
}
