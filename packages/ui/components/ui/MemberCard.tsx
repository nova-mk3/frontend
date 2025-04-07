// MemberCard.tsx
import { IdCard } from "lucide-react";
import { ProfileImage } from "./profileImage";

export const baseCardClass = "m-[8px] flex items-center rounded-lg border-2 border-primary/50 cursor-pointer shadow-md transition-all duration-200 hover:bg-primary/10 hover:shadow-lg hover:scale-[1.02]";

interface ProfilePhoto {
  id: string;
  originalFileName: string;
  imageUrl: string;
}

interface MemberCardProps {
  type?: "small" | "medium";
  name?: string;
  studentId?: string;
  profilePhoto: ProfilePhoto;
  pendingMemberId?: string;
  onClick?: () => void;
}

export default function MemberCard({
  name = "고양이",
  type = "small",
  studentId = "2019019014",
  profilePhoto = {
    id: "00000000",
    originalFileName: "cat.png",
    imageUrl: "test",
  },
  onClick = () => console.log("meow"),
}: MemberCardProps) {
  if (type === "small") {
    return (
      <div
        onClick={onClick}
        className={`w-[200px] h-[80px] ${baseCardClass}`}
      >
        <ProfileImage src= {profilePhoto.imageUrl} size={64} className="ml-[15px]"/>
        <div className="text-2xl text-center flex-grow">{name}</div>
      </div>
    );
  }

  if (type === "medium") {
    return (
      <div
        onClick={onClick}
        className={`w-[400px] h-[80px] ${baseCardClass}`}
      >
        <ProfileImage src= {profilePhoto.imageUrl} size={64} className="ml-[15px]"/>
        <div className="text-2xl text-center flex-grow">{name}</div>
        <IdCard className="ml-auto h-8 w-8" />
        <div className="text-2xl text-center flex-grow">{studentId}</div>
      </div>
    );
  }
}
