import React from 'react'
import { Milestone } from 'lucide-react';
import Link from "next/link";

interface TendinousProps {
    className?: string;
    href?: string;
}
export default function Tendinous({className , href=""} : TendinousProps) {
  return (
    <Link href={href} className={`my-auto flex flex-row gap-1 h-[36px] items-center cursor-pointer hover:bg-primary hover:text-background01  px-3 py-1 rounded-md ${className}`}>
              <Milestone size={16}/><p>건의함</p>
    </Link>
  )
}
