"use client";
import React, { useEffect, useState } from "react";
import { Form } from "@nova/ui/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { grade, semester } from "@/src/schema/signup.schema";
import { InputFormField } from "@/src/app/(auth)/components/InputFormField";
import { RadioFormField } from "@/src/app/(auth)/signup/components/RadioFormField";
import { SelectFormField } from "@/src/app/(auth)/signup/components/SelectFormField";
import { DatePickerForm } from "@/src/app/(auth)/signup/components/DatePickerField";
import Image from "next/image";
import { Button } from "@nova/ui/components/ui/button";
import GraduationYearSelect from "@/src/app/(auth)/signup/components/GraduationYearSelect";
import { Camera } from "lucide-react";
import {
  ChangeUserInfoInput,
  ChangeUserInfoSchema,
} from "@/src/schema/changeuserinfo.schema";
import { useGetUserData } from "../../query/qureies";
import Modal from "@/src/app/(main)/components/Modal";
import PendingFallbackUI from "@/src/app/(main)/components/Skeleton/PendingFallbackUI";
import { Profile } from "@/src/app/(main)/board/components/comments/CommentListItem";

import { UserProfileDeleteAPI } from "@/src/api/user/client";
import {
  useDeleteProfileMuation,
  useUserProfilePostMutation,
} from "../../query/mutation";

interface Props {
  memberId: string;
}

export interface UserProfile {
  absence: boolean;
  birth: string;
  email: string;
  grade: number;
  graduation: boolean;
  introduction: string;
  memberId: string;
  name: string;
  phone: string;
  profilePhoto: Profile;
  role: "ADMINISTRATOR" | "USER" | "GUEST"; // 필요한 역할 추가 가능
  semester: number;
  studentNumber: string;
}

export default function EditForm({ memberId }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<ChangeUserInfoInput | null>(null);
  const { data, isLoading } = useGetUserData({ memberId });
  const useMutation = useUserProfilePostMutation({ memberId });
  const useProfileDelteMutatuon = useDeleteProfileMuation({ memberId });
  const form = useForm<ChangeUserInfoInput>({
    resolver: zodResolver(ChangeUserInfoSchema),
    defaultValues: {
      username: "",
      studentNumber: "",
      grade: "1학년",
      semester: "1학기",
      absence: false,
      birth: new Date("2000-01-05"),
      phoneNumber: "",
      graduation: false,
      work: true,
      job: "",
      contact: false,
      contactInfo: "",
      contactDescription: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data.name,
        studentNumber: data.studentNumber,
        grade: "1학년",
        semester: "1학기",
        absence: data.absence,
        birth: data.birth ? new Date("2000-01-05") : undefined,
        phoneNumber: data.phone,
        graduation: data.graduation,
        work: true,
        job: undefined,
        contact: false,
        contactInfo: "",
        contactDescription: "dd",
      });
    }
  }, [data, form]);

  const graduation = useWatch({
    control: form.control,
    name: "graduation",
  });
  const isWork = useWatch({
    control: form.control,
    name: "work",
  });
  const isContact = useWatch({
    control: form.control,
    name: "contact",
  });

  const onValid = (values: ChangeUserInfoInput) => {
    if (openModal === false) {
      setFormData(values); // 데이터 저장
      setOpenModal(true);
      return;
    }
    console.log(values);
  };

  // ❌ 유효성 검사 실패 시 실행됨
  const onInvalid = (errors: any) => {
    console.log("유효성 검사 실패:", errors);
  };

  // ✅ "확인" 버튼을 누르면 최종 제출 실행
  const handleConfirmSubmit = () => {
    if (formData) {
      setOpenModal(false); // 모달 닫기
      form.handleSubmit(onValid)(); // 최종 제출 실행
    }
  };

  if (isLoading) {
    return <PendingFallbackUI />;
  }

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formdata = new FormData();
      formdata.append("profilePhoto", file);
      useMutation.mutate({ formdata, memberId });
    }
  };

  const handleDeleteProfile = async (profileMemberId: string) => {
    useProfileDelteMutatuon.mutate(profileMemberId);
  };

  return (
    <div className="w-[400px] mx-auto mobile:w-[90%] mt-10">
      <div className="flex flex-col justify-center items-center">
        <div className="relative items-center">
          <Image
            src={data.profilePhoto.imageUrl}
            alt={data.profilePhoto.originalFileName}
            width={86}
            height={86}
            className={`w-24 h-24 object-cover rounded-full`}
            unoptimized={true}
            priority={true}
          />
          <label
            htmlFor="profile"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black border-[3px] border-white absolute bottom-[-5px] right-[-5px] cursor-pointer"
          >
            <Camera size={16} className="text-white" />
          </label>
          <input
            id="profile"
            type="file"
            className="hidden"
            accept=".jpg, .png"
            onChange={handleFileOnChange}
          />
        </div>
        <div
          className="text-gray-400 text-base mt-5 cursor-pointer hover:underline"
          onClick={() => handleDeleteProfile(memberId)}
        >
          이미지 삭제
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid, onInvalid)}
          className="space-y-3"
        >
          <InputFormField
            form={form}
            name={"username"}
            label={"이름"}
            placeHolder={"이름을 입력하세요"}
          />
          <InputFormField
            form={form}
            name={"studentNumber"}
            label={"학번"}
            placeHolder={"학번을 입력하세요"}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
          />

          <RadioFormField
            form={form}
            name={"graduation"}
            label={"소속"}
            options={[
              { value: false, label: "재학생" },
              { value: true, label: "졸업생" },
            ]}
          />
          {graduation === false && (
            <>
              <div className="flex gap-4 items-center">
                <SelectFormField
                  form={form}
                  name={"grade"}
                  label="학년"
                  options={grade}
                />
                <SelectFormField
                  form={form}
                  name={"semester"}
                  label="학기"
                  options={semester}
                />
              </div>
              <RadioFormField
                form={form}
                name={"absence"}
                label={"휴학"}
                options={[
                  { value: true, label: "예" },
                  { value: false, label: "아니오" },
                ]}
              />
            </>
          )}
          {graduation === true && (
            <>
              <GraduationYearSelect
                form={form}
                name={"year"}
                label="졸업년도"
              />
              <RadioFormField
                form={form}
                name={"work"}
                label={"재직여부"}
                options={[
                  { value: true, label: "예" },
                  { value: false, label: "아니오" },
                ]}
              />
              <InputFormField
                form={form}
                name={"job"}
                label={"직무"}
                placeHolder={"직무를 입력해주세요"}
                type="text"
                disabled={isWork === false && true}
              />
              <RadioFormField
                form={form}
                name={"contact"}
                label={"연락 공개 여부"}
                options={[
                  { value: true, label: "예" },
                  { value: false, label: "아니오" },
                ]}
              />

              <InputFormField
                form={form}
                name={"contactInfo"}
                label={"연락처"}
                placeHolder={
                  "연락수단을 입력해주세요! ex) 인스타, 오픈채팅방 링크 등등"
                }
                type="text"
                disabled={isContact === false && true}
              />

              <InputFormField
                form={form}
                name={"contactDescription"}
                label={"연락 방법 설명"}
                placeHolder={"연락시 주의사항을 설명해주세요!"}
                type="text"
                disabled={isContact === false && true}
              />
            </>
          )}
          <div className="flex gap-6 items-center">
            <DatePickerForm form={form} name={"birth"} label={"생년월일"} />
          </div>
          <InputFormField
            form={form}
            name={"phoneNumber"}
            label={"전화번호"}
            placeHolder={"010-0000-0000"}
            type="tel"
          />
          <Button className="mt-8 w-full b-l mb-5" type="submit">
            변경완료
          </Button>
        </form>
      </Form>

      {openModal && (
        <Modal
          isOpen={openModal}
          title="변경"
          subtitle="정말로 변경하시겠습니까?"
          onClose={() => setOpenModal(false)}
          onAction={() => handleConfirmSubmit()}
        />
      )}
    </div>
  );
}
