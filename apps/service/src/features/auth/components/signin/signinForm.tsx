"use client";

import LogoWithName from "@/public/image/LogoWithName.svg";
import { SigninInput, SigninSchema } from "@/src/schema/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nova/ui/components/ui/button";
import { Form } from "@nova/ui/components/ui/form";
import { IdCard, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "@/src/app/(main)/users/[id]/query/qureies";
import { usePathname, useRouter } from "next/navigation";
import { useLoginMutation } from "../../hooks/mutation/useLoginMutation";
import { useQueryParams } from "@/src/shared/hooks/useQueryParams";
import { InputFormField } from "../signup/InputFormField";

export function SigninForm() {
  const loginMutation = useLoginMutation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirectUrl } = useQueryParams();
  const pathname = usePathname();
  const form = useForm<SigninInput>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: SigninInput) {
    try {
      await loginMutation.mutateAsync({
        studentNumber: values.studentId,
        password: values.password,
      });

      queryClient.invalidateQueries({
        queryKey: [userKeys.profile],
        refetchType: "all",
      });
      console.log(redirectUrl);
      alert("로그인 성공");

      queryClient.resetQueries();

      if (redirectUrl) {
        if (decodeURI(redirectUrl) === "/signup") {
          router.push("/");
        } else router.push(decodeURI(redirectUrl));
      } else {
        router.back();
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div
      className="w-[500px] h-[600px] mobile:w-[95vw] bg-background01 rounded-2xl flex flex-col items-center justify-center z-10 p-16 mobile:p-8"
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Link href={"/"} prefetch={false}>
        <LogoWithName fill="#B096F5" width="160px" height="50px" />
      </Link>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-shrink-0 w-96 mobile:w-[100%] mb-10 mt-10"
        >
          <InputFormField
            form={form}
            name={"studentId"}
            label={"학번"}
            placeHolder={"학번을 입력하세요"}
            type="text"
            inputMode="numeric"
            leftIcon={<IdCard size={18} />}
            pattern="[0-9]*"
          />
          <InputFormField
            form={form}
            name={"password"}
            label={"비밀번호"}
            placeHolder={"********"}
            type="password"
            leftIcon={<Lock size={18} />}
            hasToggleIcon
          />
          <div className="flex ml-auto flex-row justify-between gap-3">
            {/* <div className="flex space-x-2 items-center">
              <Checkbox className="border-line01 text-background01" />

              <p className="b-m text-text01">로그인 정보 저장하기</p>
            </div> */}
            <p
              className="flex  b-m text-text01 cursor-pointer"
              onClick={() => alert("아직은 찾을 수 없습니다")}
            >
              아이디 찾기
            </p>
            <p
              className="flex  b-m text-text01 cursor-pointer"
              onClick={() => alert("아직은 찾을 수 없습니다")}
            >
              비밀번호 찾기
            </p>
          </div>

          <div>
            <Button
              className="mt-16 w-full b-l mobile:mb-5"
              type="submit"
              disabled={!form.formState.isValid}
            >
              로그인
            </Button>
          </div>
          <div className="flex justify-center b-m">
            nova에 가입하고 싶으신가요?&nbsp;
            <Link href={"/signup"}>
              <p className="text-primary">회원가입</p>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
