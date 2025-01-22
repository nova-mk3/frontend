"use client";
// 공식문서의 app-sidebar와 동일하다.

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@nova/ui/components/ui/sidebar";
import Logo from "@/public/image/Logo.svg";
import { ScrollText, Users , TestTubeDiagonal , PcCase } from "lucide-react";



const items = [
  {
    title: "Dashboard",
    icon: ScrollText,
    href: "/",
  },
  {
    title: "member",
    icon: Users,
    href: "/member",
  },
  {
    title: "ServerLog",
    icon: ScrollText,
    href: "/serverLog",
  },
  {
    title: "ServerStatus",
    icon: PcCase,
    href: "/serverStatus",
  },
  {
    title: "UXResearch",
    icon: TestTubeDiagonal,
    href: "/uxResearch",
  }
]

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center">
        <Logo width={50} fill="#B096F5" className="block"/>
        <div className="text-[38px] font-bold text-primary">novAdmin</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}