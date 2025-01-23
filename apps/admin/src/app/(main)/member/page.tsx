// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";

export default function Members() {
    return (
      <div className="font-pretendard">
        Members 로 만들것
        <MemberCard name="고양이" type="small"/>
        <MemberCard name="고양이" type="medium"/>
        <MemberCard name="고양이" type="admin"/>
        <MemberCard name="고양이" type="large"/>
      </div>
    );
  }
  