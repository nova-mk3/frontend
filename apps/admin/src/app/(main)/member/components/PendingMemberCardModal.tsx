"use client";

import { useEffect, useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import Image from "next/image";
import { Phone, IdCard, Cake, Mail , GraduationCap, LucideIcon} from "lucide-react";
import { PendingMemberCardModalProps, PendingGraduationResponse, PendingMemberResponse } from "@/src/types/pendingMember";
import { useApprovePendingMemberMutation, useRejectPendingMemberMutation, useSpecificPendingMemberQuery } from "@/src/query/pendingMembersQueries";

const MemberInfo = ({ icon: Icon, label }: { icon: LucideIcon ; label: string | undefined }) => (
  <div className="flex items-center space-x-3">
    <Icon className="h-8 w-8 text-gray-600" />
    <div className="text-2xl">{label}</div>
  </div>
);

const LeftSide = ({ data, isLoading, isError }: { 
  data?: PendingMemberResponse; 
  isLoading: boolean; 
  isError: boolean 
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col w-[700px] items-center space-y-8 py-20">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col w-[700px] items-center space-y-8 py-20">
        <div className="text-xl text-red-500">데이터 로드 중 오류 발생</div>
      </div>
    );
  }

  if(data){
    return (
      <div className="flex flex-col w-[700px] items-center space-y-8 py-20">
        <Image
          src={data.profilePhoto.imageUrl}
          width={0}
          height={0}
          alt="profileImage"
          className="rounded-full w-[160px] h-[160px]"
          unoptimized
        />
        <div className="text-2xl font-bold">{data?.name}</div>
        <MemberInfo icon={Phone} label={data?.phone} />
        <MemberInfo icon={IdCard} label={data?.studentNumber} />
        <MemberInfo icon={GraduationCap} 
          label={
            data?.graduation 
              ? "졸업생" 
              : data?.absence 
                ? "휴학중" 
                : `${data?.grade} ${data?.semester}`
          }/>
        <MemberInfo icon={Cake} label={data?.birth} />
        <MemberInfo icon={Mail} label={data?.email} />
      </div>
    );
  }
};

const RightSide = ({ pendingMemberResponse, pendingGraduationResponse ,  isLoading , isError ,  onClose }: { 
  pendingMemberResponse?: PendingMemberResponse;
  pendingGraduationResponse? : PendingGraduationResponse;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
}) => {
  const approveMutation = useApprovePendingMemberMutation();
  const rejectMutation = useRejectPendingMemberMutation();
  if (isLoading){
    return (
      <div className="flex flex-col justify-between w-[700px]">
        <div className="text-xl text-gray-700">
          <div className="text-2xl font-bold">추가 정보</div>
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  if(isError){
    return (
      <div className="flex flex-col justify-between w-[700px]">
        <div className="text-xl text-gray-700">
          <div className="text-2xl font-bold">추가 정보</div>
          <div className="text-2xl font-bold">데이터 로드 중 오류 발생</div>
        </div>
      </div>
    );
  }
  //TODO 아래 졸업자의 세부정보를 어떻게 보여줄지 결정해야함.
  if(pendingMemberResponse && pendingGraduationResponse){
    return (
      <div className="flex flex-col justify-between w-[700px]">
        <div className="text-xl text-gray-700">
          <div className="text-2xl font-bold">자기 소개</div>
          <div className="mt-4">{pendingMemberResponse?.introduction || "자기소개 없음"} </div>
            {pendingMemberResponse?.graduation &&  (
            <div className="mt-6 text-lg text-gray-600">
              <div className="text-2xl font-bold">취업 정보</div>
              <div className="mt-4">{pendingGraduationResponse?.job || "취업 정보 없음"}</div>
              <div className="mt-4">{pendingGraduationResponse?.work || "근무 정보 없음"}</div>
              <div className="mt-4">{pendingGraduationResponse?.contact || "연락처 없음"}</div>
              <div className="mt-4">{pendingGraduationResponse?.contactDescription || "연락처 없음"}</div>
              <div className="mt-4">{pendingGraduationResponse?.contactInfo || "근무 정보 없음"}</div>
              <div className="mt-4">{pendingGraduationResponse?.year || "근무 연도 정보 없음"}</div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="default" onClick={onClose}>취소</Button>
          <Button
            variant="default"
            onClick={() => {
              onClose();
              approveMutation.mutate(pendingMemberResponse.pendingMemberId);
            }}
          >
            수락
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onClose();
              rejectMutation.mutate(pendingMemberResponse.pendingMemberId);
            }}
          >
            반려
          </Button>
        </div>
      </div>
    );
  }
};

export default function PendingMemberCardModal({ open, pendingMemberId, onClose }: PendingMemberCardModalProps) {
  const [isVisible, setIsVisible] = useState(open);
  const [isAnimating, setIsAnimating] = useState(false);
  const { data, isLoading, isError } = useSpecificPendingMemberQuery(pendingMemberId, isVisible);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`flex bg-white p-6 rounded-lg shadow-lg w-[1400px] min-h-[700px] transition-all duration-300 ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <LeftSide 
          data={data?.pendingMemberResponse} 
          isLoading={isLoading} 
          isError={isError} 
          />
        <div className="w-[2px] bg-gray-300 mx-6" />
        <RightSide 
          pendingMemberResponse={data?.pendingMemberResponse} 
          pendingGraduationResponse={data?.pendingGraduationResponse} 
          isLoading={isLoading} 
          isError={isError} 
          onClose={onClose} 
        />
      </div>
    </div>
  );
}
