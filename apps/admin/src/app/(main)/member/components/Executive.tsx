// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { Button } from "@nova/ui/components/ui/Button";

export default function Executive() {
    return (
      <div className="font-pretendard">
        <div>
          회장
        </div>
        <MemberCard name="고양이" type="admin"/>
        <div>
          부회장
        </div>
        <MemberCard name="고양이" type="admin"/>
        <div>
          임원
        </div>
        <MemberCard name="고양이" type="admin"/>
      </div>
    );
  }
  