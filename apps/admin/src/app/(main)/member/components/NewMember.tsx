// Members 페이지
import MemberCard from "@nova/ui/components/ui/MemberCard";
import { newMembersData } from "./memberTempData";
import { useEffect , useState } from "react";
import MemberCardModal from './MemberCardModal';

interface Member {
  studentId: string;
  name: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  grade: string;
  image?: string;
}

// TODO : 클릭시 회원 Modal 추가해야함. onClick 이벤트 추가해야함.
// TODO : API 연동 필요함

export default function NewMembers(){
  const [data, setData] = useState<Member[]>([]);
  const [open , setOpen] = useState(false);
  useEffect(()=>{
    // API 연동 위치
    setData(newMembersData);
  },[])

  return (
    <div className="font-pretendard flex flex-col min-h-[700px] w-[1400px]">
      <div className="text-xl font-bold m-4">
        총 {data.length}명
      </div>
      {data.length > 0 ? (
        <div className="flex-grow">
          {data.map((member) => (
            <MemberCard 
              key={member.studentId}
              name={member.name}
              grade={member.grade}
              type="large"
              onClick={()=>setOpen(true)}
            />
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="text-4xl font-bold text-center">
            신청자가 없습니다.
          </div>
        </div>
      )}
     <MemberCardModal open={open} onClose={()=>setOpen(false)} type="newMember"/>
    </div>
  );
}