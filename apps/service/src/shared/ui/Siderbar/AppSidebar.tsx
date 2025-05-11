"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { cn } from "@nova/ui/lib/utils";
import { Slot } from "@radix-ui/react-slot";
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
interface SiderbarTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

export function SidebarTrigger({ children, className }: SiderbarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className={cn("items-center cursor-pointer", className)}
      onClick={toggleSidebar}
    >
      {children}
    </div>
  );
}
interface SidebarLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SidebarLayout({
  className,
  children,
}: SidebarLayoutProps) {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      {/* backdrop */}
      {/* <div
        className="fixed inset-0 bg-background02 z-10"
        onClick={closeSidebar}
      /> */}
      <div
        className={cn(
          "border z-20 rounded-lg h-screen overflow-y-auto fixed right-0 top-0 bg-background01 transition-all duration-300 shadow ease-linear transform max-w-[400px]",
          isOpen ? "right-0 w-[100%]" : "right-[-100%] w-[100%]",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

interface SidebarMenuItemProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  onClick?: () => void;
}

export function SidebarMenuItem({
  className,
  children,
  asChild,
  onClick,
}: SidebarMenuItemProps) {
  const { closeSidebar } = useSidebar();

  const Comp = asChild ? Slot : "li";
  const handleClick = () => {
    onClick?.(); // 외부에서 전달된 onClick 먼저 실행
    closeSidebar(); // 그리고 내부 로직 실행
  };
  return (
    <Comp
      className={`w-10/12 cursor-pointer mx-auto rounded-[15px] px-2 py-[6px] hover:bg-[#B096F5] hover:text-white flex flex-row gap-2 ${className ?? ""}`}
      onClick={handleClick}
    >
      {children}
    </Comp>
  );
}
