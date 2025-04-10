"use client";

import Link from "next/link";
import {
  User,
  School,
  UserX,
  GraduationCap,
  UserPlus,
} from "lucide-react";
import { useManageMembersQuery } from "@/src/query/manageMembersQueries";
import { usePendingMembersQuery } from "@/src/query/pendingMembersQueries";
import { ManageMember } from "@/src/types/manageMember";

export default function MemberDashboard() {
  const {
    data: memberData,
    isLoading: memberLoading,
    error: memberError,
  } = useManageMembersQuery();
  const {
    data: pendingMemberData,
    isLoading: pendingLoading,
    error: pendingError,
  } = usePendingMembersQuery();

  const data = {
    total: memberData?.length || 0,
    graduated:
      memberData?.filter((m: ManageMember) => m.graduation === true).length ||
      0,
    onLeave:
      memberData?.filter(
        (m: ManageMember) => m.absence === true && m.graduation !== true
      ).length || 0,
    students:
      memberData?.filter(
        (m: ManageMember) => m.graduation !== true && m.absence !== true
      ).length || 0,
    pending: pendingMemberData?.pendingMemberResponseList?.length || 0,
  };

  if (memberLoading || pendingLoading) {
    return (
      <div className="border-2 border-primary rounded-xl shadow-md p-6 w-full h-full bg-white flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (memberError || pendingError) {
    return (
      <div className="border-2 border-primary rounded-xl shadow-md p-6 w-full h-full bg-white flex justify-center items-center">
        <p className="text-red-500 text-lg">Error loading data</p>
      </div>
    );
  }

  return (
    <Link href="/admin/member" passHref>
      <div className="border-2 border-primary rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer p-6 w-full h-full bg-white transform hover:scale-[1.05] flex flex-col justify-between">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">
          동아리 인원 정보
        </h2>
        <ul className="divide-y divide-gray-200 text-base font-medium text-gray-800">
          <li className="flex items-center justify-between py-3 transition-all duration-200 ease-out hover:scale-[1.1]">
            <div className="flex items-center space-x-3">
              <User className="text-primary" size={24} />
              <span>총 인원</span>
            </div>
            <span className="text-lg font-semibold text-primary">
              {data.total}
            </span>
          </li>
          <li className="flex items-center justify-between py-3 transition-transform duration-200 hover:scale-[1.1]">
            <div className="flex items-center space-x-3">
              <School className="text-primary" size={24} />
              <span>재학생</span>
            </div>
            <span className="text-lg font-semibold text-primary">
              {data.students}
            </span>
          </li>
          <li className="flex items-center justify-between py-3 transition-transform duration-200 hover:scale-[1.1]">
            <div className="flex items-center space-x-3">
              <UserX className="text-primary" size={24} />
              <span>휴학생</span>
            </div>
            <span className="text-lg font-semibold text-primary">
              {data.onLeave}
            </span>
          </li>
          <li className="flex items-center justify-between py-3 transition-transform duration-200 hover:scale-[1.1]">
            <div className="flex items-center space-x-3">
              <GraduationCap className="text-primary" size={24} />
              <span>졸업생</span>
            </div>
            <span className="text-lg font-semibold text-primary">
              {data.graduated}
            </span>
          </li>
          <li
            className={`flex items-center justify-between py-3 transition-transform duration-600 hover:scale-[1.1] ${
              data.pending > 0 ? "animate-pulse" : ""
            }`}
          >
            <div className="flex items-center space-x-3">
              <UserPlus className="text-primary" size={24} />
              <span
                className={`text-lg ${
                  data.pending > 0
                    ? "text-red-600 font-bold"
                    : "text-gray"
                }`}
              >
                회원가입 신청
              </span>
            </div>
            <span
              className={`text-xl font-bold ${
                data.pending > 0 ? "text-red-600" : "text-primary"
              }`}
            >
              {data.pending}
            </span>
          </li>
        </ul>
      </div>
    </Link>
  );
}
