import React from "react";
import { Milestone } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@nova/ui/components/ui/tooltip";
interface TendinousProps {
  className?: string;
  href?: string;
}
export default function Tendinous({ className, href = "" }: TendinousProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={href}
            className={`my-auto flex flex-row gap-1 h-[36px] items-center cursor-pointer p-2 rounded-full border-black border-[1px] ${className}`}
          >
            <Milestone size={20} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>건의함</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
