"use client";

import { Button } from "@nova/ui/components/ui/button";
import PendingMembers from "./components/PendingMember";
import ManageMembers from "./components/ManageMembers";
import Executive from "./components/Executive";
import { useState } from "react";

export default function Members() {
  const [pageName, setPageName] = useState("NewMembers");

  const buttons = [
    { name: "NewMembers", label: "회원가입 신청" },
    { name: "ManageMembers", label: "회원 관리" },
    { name: "Executive", label: "임원 관리" },
  ];

  return (
    <div className="font-pretendard m-[40px]">
      <div className="space-x-4 mb-4">
        {buttons.map((btn) => {
          const isActive = pageName === btn.name;
          return (
            <Button
              key={btn.name}
              variant="transparent"
              onClick={() => setPageName(btn.name)}
              className={`
                text-2xl 
                transition-colors duration-300 ease-in-out
                hover:text-primary
                ${isActive ? "text-primary font-bold underline underline-offset-4" : "text-gray-600"}
              `}
            >
              {btn.label}
            </Button>
          );
        })}
      </div>
      <hr className="mb-4" />
      <div>
        {pageName === "NewMembers" && <PendingMembers />}
        {pageName === "ManageMembers" && <ManageMembers />}
        {pageName === "Executive" && <Executive />}
      </div>
    </div>
  );
}
