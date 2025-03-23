"use client";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { cn } from "@nova/ui/lib/utils";

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
  const { isOpen } = useSidebar();
  return (
    <div
      className={cn(
        "border z-20 rounded-lg h-screen overflow-y-auto fixed right-0 top-0 bg-background01 transition-all duration-300 shadow ease-linear transform max-w-[400px]",
        isOpen ? "right-0 w-[100%]" : "right-[-100%] w-[100%]",
        className
      )}
    >
      {children}
    </div>
  );
}
