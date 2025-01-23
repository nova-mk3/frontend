// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/Button";

export default function Executive() {
    return (
      <div className="font-pretendard">
        임원 페이지
        <MemberCard name="고양이" type="small"/>
        <MemberCard name="고양이" type="medium"/>
        <MemberCard name="고양이" type="admin"/>
        <MemberCard name="고양이" type="large"/>
      </div>
    );
  }
  