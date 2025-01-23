// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/Button";

export default function ManageMembers() {
    return (
      <div className="font-pretendard">
        멤버
        <MemberCard name="고양이" type="small"/>
        <MemberCard name="고양이" type="medium"/>

      </div>
    );
  }
  