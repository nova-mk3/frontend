"use client";
import React from "react";
import { useGetUserData } from "../../query/qureies";
import Image from "next/image";
import Link from "next/link";
import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";
import { Calendar, Mail, Phone, School, User } from "lucide-react";
import { formatKoreanDate } from "@/src/libs/utils/koreandate";
import { Button } from "@nova/ui/components/ui/button";
import { cn } from "@nova/ui/lib/utils";
import { translateRole } from "@/src/libs/utils/translateRole";
import { useQuery } from "@tanstack/react-query";
import { SimpleProfileQueryOptions } from "../../query/options";
interface Props {
  memberId: string;
}
export default function Profile({ memberId }: Props) {
  const { data, isLoading } = useGetUserData({ memberId });
  const { data: loginUserData } = useQuery(SimpleProfileQueryOptions());
  if (isLoading) return <PendingFallbackUI />;

  return (
    <div className="bg-background02 py-10 min-h-[750px]">
      <div className="max-w-4xl mx-auto mobile:w-[90%]">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 ">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* 프로필 이미지 */}

              <Image
                src={data.memberResponse.profilePhoto.imageUrl}
                alt={data.memberResponse.profilePhoto.originalFileName}
                width={86}
                height={86}
                className={`w-32 h-32 object-cover rounded-full border-[1px] border-black`}
                unoptimized={true}
                priority={true}
              />

              {/* 기본 정보 */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">
                    {data.memberResponse.name}
                  </h2>
                  <div
                    className={cn(
                      "px-3 py-1  rounded-full text-sm",
                      data.memberResponse.graduation === false
                        ? "bg-primary text-white"
                        : "bg-black text-white"
                    )}
                  >
                    {data.memberResponse.graduation === false
                      ? "재학생"
                      : "졸업생"}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {data.memberResponse.introduction}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    <span>학번: {data.memberResponse.studentNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    <span>{data.memberResponse.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} />
                    <span>{data.memberResponse.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{formatKoreanDate(data.memberResponse.birth)}</span>
                  </div>
                </div>
              </div>

              {/* 편집 버튼 */}
              {loginUserData.memberId === memberId && (
                <div>
                  <Link href={`/users/${memberId}/edit`}>
                    <Button variant="outline">프로필 편집</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.memberResponse.graduation === false ? (
              <div className="p-6 bg-white rounded-md flex flex-col gap-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center flex-row gap-2">
                  <School size={20} />
                  학업 정보
                </h3>
                <div className="flex flex-row">
                  <div className="text-gray-500">학년/학기</div>
                  <div className="ml-auto text-gray-700">
                    {data.memberResponse.grade}
                    {data.memberResponse.semester}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-gray-500">휴학 여부</div>
                  <div className="ml-auto text-gray-700">
                    {data.memberResponse.absence === false ? "재학" : "휴학"}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-gray-500">역할</div>
                  <div className="ml-auto text-gray-700">
                    {translateRole(data.memberResponse.role)}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" bg-gray-300 rounded-md flex items-center justify-center bg-[linear-gradient(45deg,transparent_49.7%,gray_50%,transparent_50.3%)]">
                학부생 정보입니다
              </div>
            )}

            {data.memberResponse.graduation === true ? (
              <div className="p-6 bg-white rounded-md flex flex-col gap-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center flex-row gap-2">
                  <School size={20} />
                  졸업 정보
                </h3>

                <div className="flex flex-row">
                  <div className="text-gray-500">졸업 년도</div>
                  <div className="ml-auto text-gray-700">
                    {data.graduationResponse.year}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-gray-500">직무</div>
                  <div className="ml-auto text-gray-700">
                    {data.graduationResponse.work === false
                      ? "무직"
                      : `${data.graduationResponse.job}`}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-gray-500">연락여부</div>
                  <div className="ml-auto text-gray-700">
                    {data.graduationResponse.contact === false
                      ? "비공개"
                      : `공개`}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-gray-500">연락방법</div>
                  <div className="ml-auto text-gray-700">
                    {data.graduationResponse.contact === false
                      ? "비공개"
                      : data.graduationResponse.contactInfo}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="text-gray-500">연락방법 상세 설명</div>
                  <div className="ml-auto text-gray-700">
                    {data.graduationResponse.contact === false
                      ? "비공개"
                      : data.graduationResponse.contactDescription}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" bg-gray-300 rounded-md flex items-center justify-center bg-[linear-gradient(45deg,transparent_49.7%,gray_50%,transparent_50.3%)]">
                졸업생 정보입니다
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
