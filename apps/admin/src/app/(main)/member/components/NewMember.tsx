// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/Button";

export default function NewMembers() {
    return (
      <div className="font-pretendard">
        신규회원 페이지
\
        <MemberCard name="고양이" type="admin"/>
        <MemberCard name="고양이" type="large"/>
      </div>
    );
  }
  