import React from "react";
import Image from "next/image";
import CardLogo from "@/public/image/CardLogo.svg";
import { Phone, CrownIcon } from "lucide-react";
import { Profile } from "../../board/components/comments/CommentListItem";
import Link from "next/link";

interface CardProps {
  profilePhoto: Profile;
  role: string;
  name: string;
  phone: string;
  grade: string;
  semester: string;
  memberId: string;
}

export default function Card({
  profilePhoto,
  role,
  name,
  phone,
  grade,
  semester,
  memberId,
}: CardProps) {
  return (
    <div className=" p-5 flex flex-col gap-1 t-m shadow-md hover:shadow-lg ">
      <div className="flex flex-row gap-3">
        <Image
          src={profilePhoto.imageUrl}
          alt={profilePhoto.originalFileName}
          width={50}
          height={50}
          className="w-[50px] h-[50px] object-cover rounded-full"
          unoptimized={true}
          priority={true}
        />
        <div className="w-[1px] h-[40px] bg-line01 my-auto"></div>
        <div className="flex flex-col mr-2">
          <Link
            href={`/users/${memberId}`}
            className="!font-bold line-clamp-1 cursor-pointer hover:underline"
          >
            {name}
          </Link>
          <p className="t-s text-text03">
            {grade}
            {/* {semester} */}
          </p>
        </div>
        <CardLogo width={50} className="ml-auto flex-shrink-0" />
      </div>

      <p className="text-text02 flex flex-row items-center gap-2 t-s">
        <Phone size={16} />
        {phone}
      </p>

      <p className="text-text02 flex flex-row items-center gap-2 t-s">
        <CrownIcon size={16} />
        {role}
      </p>
      {/* <p className="h-[1px] bg-line01 my-2"></p>
      <p className="text-text02 flex flex-row items-center gap-2 t-s">
        <TriangleAlert className="text-yellow-500" size={16} />
        참고사항
      </p>
      <p className="text-text02 flex flex-row items-center gap-2 t-s">
        무슨 말을 작성할까요?!
      </p> */}
    </div>
  );
}
