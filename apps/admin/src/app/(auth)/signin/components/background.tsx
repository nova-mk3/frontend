import Logo from "@/public/image/Logo.svg";
import { cn } from "@nova/ui/lib/utils";
import { HTMLAttributes } from "react";
export function Background({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)}>
      <Logo
        className="absolute rotate-3 top-[40px] left-[210px]"
        fill="#FFFFFF"
        width="700px"
      />
      <Logo
        className="absolute rotate-[80deg] top-[-280px] left-[1200px] blur-[1.4px]"
        fill="#FFFFFFC9"
        width="200px"
      />
      <Logo
        className="absolute rotate-[40deg] top-[280px] left-[1000px] blur-[1.4px]"
        fill="#FFFFFF79"
        width="180px"
      />
      <div className="text-background01 absolute top-[48%] left-[75%]">
        <p className="d-m">Manage</p>
        <p className="d-s ps-8">club nova</p>
      </div>
    </div>
  );
}
