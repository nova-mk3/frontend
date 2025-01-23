"use client";
// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/Button";
import NewMembers from "./components/NewMember";
import ManageMembers from "./components/ManageMembers";
import Executive from "./components/Executive";
import { useState } from "react";

export default function Members() {
  const [pageName , setPageName] = useState("NewMembers");
  
  return (
    <div className="font-pretendard m-[40px]">
      <div>
        <Button variant="transparent"  className="text-2xl" onClick={()=>setPageName("NewMembers")}>회원가입 신청</Button>
        <Button variant="transparent"  className="text-2xl" onClick={()=>setPageName("ManageMembers")}>회원 관리</Button>
        <Button variant="transparent"  className="text-2xl" onClick={()=>setPageName("Executive")}>임원 관리</Button>
      </div>
      <hr />
      <div>
        {pageName === "NewMembers" && <NewMembers />}
        {pageName === "ManageMembers" && <ManageMembers />}
        {pageName === "Executive" && <Executive />}
      </div>
    </div>
    );
  }
  