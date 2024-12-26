import Searchbox from "./Searchbox";
import SidebarHeader from "./SidebarHeader";
import React from "react";
import SiderbarContent from "./SiderbarContent";

interface SiderbarProps {
  toggle: () => void;
  isOpen: boolean;
}
export default function AppSidebar({ toggle, isOpen }: SiderbarProps) {
  return (
    <div
      className={`border z-20 rounded-lg h-screen overflow-y-auto fixed right-0 top-0 bg-background01 transition-all duration-300 shadow ease-linear transform ${
        isOpen ? "right-0 w-[100%]" : "right-[-100%] w-[100%]"
      } max-w-[400px]`}
    >
      <SidebarHeader toggle={toggle} />
      <Searchbox />
      <SiderbarContent />
    </div>
  );
}
