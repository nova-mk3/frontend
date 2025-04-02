"use client";

import { ChangePwdType, UserPasswordPut } from "@/src/api/user/client";
import { InputFormField } from "@/src/app/(auth)/components/InputFormField";
import { PwdInput, PwdSchema } from "@/src/schema/changepwd.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nova/ui/components/ui/button";
import { Form } from "@nova/ui/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
interface Props {
  memberId: string;
}
export default function ChangePwd({ memberId }: Props) {
  const router = useRouter();
  const form = useForm<PwdInput>({
    resolver: zodResolver(PwdSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const useChnagePasswordMutation = useMutation({
    mutationFn: ({
      profileMemberId,
      currentPassword,
      newPassword,
      checkNewPassword,
    }: ChangePwdType) =>
      UserPasswordPut({
        profileMemberId,
        checkNewPassword,
        newPassword,
        currentPassword,
      }),
    onSuccess: (data: any) => {
      alert("비밀번호 변경 성공\n 재 로그인을 해주세요");
      router.push("/signin");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  function onSubmit(values: PwdInput) {
    console.log(values);
    useChnagePasswordMutation.mutate({
      profileMemberId: memberId,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      checkNewPassword: values.confirmNewPassword,
    });
  }
  return (
    <div className="w-[400px] mx-auto mobile:w-[90%] mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <InputFormField
            form={form}
            name={"currentPassword"}
            label={"현재 비밀번호"}
            placeHolder={"현재 비밀번호를 입력하세요"}
            type="password"
            hasToggleIcon
          />

          <InputFormField
            form={form}
            name={"newPassword"}
            label={"새 비밀번호"}
            placeHolder={"새 비밀번호를 입력해주세요"}
            type="password"
            hasToggleIcon
          />

          <InputFormField
            form={form}
            name={"confirmNewPassword"}
            label={"새 비밀번호 확인"}
            placeHolder={"한번 더 입력해주세요"}
            type="password"
            hasToggleIcon
          />

          <div>
            <Button className="mt-8 w-full b-l mb-5" type="submit">
              완료
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
