"use client";
import LogoWithName from "@/public/image/LogoWithName.svg";
import { FindPwdInput, FindPwdSchema } from "@/src/schema/findpwd.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@nova/ui/components/ui/form";
import { ArrowLeft, IdCard, Mail, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { InputFormField } from "../signup/InputFormField";
import { Button } from "@nova/ui/components/ui/button";
import { restPassword } from "../../api/findpwd";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function FindPwdForm() {
  const router = useRouter();
  const form = useForm<FindPwdInput>({
    resolver: zodResolver(FindPwdSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      restPassword({ email, name }),
    onSuccess: () => {
      alert("비밀번호 재설정 메일이 전송되었습니다. 이메일을 확인해보세요");
      router.push("/signin");
    },
    onError: (e: any) => {
      alert(e.message);
    },
  });

  const onSubmit = (e: FindPwdInput) => {
    mutate({ email: e.email, name: e.name });
  };

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
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex justify-center !font-bold text-xl">
          비밀번호를 잊으셨나요?
        </div>
        <div className="flex justify-center b-m">
          등록된 이메일로 임시 비밀번호를 보내드리겠습니다
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-shrink-0 w-96 mobile:w-[100%] mb-10 mt-10"
        >
          <InputFormField
            form={form}
            name={"name"}
            label={"이름"}
            placeHolder={"이름을 입력하세요"}
            type="text"
            leftIcon={<User size={18} />}
          />
          <InputFormField
            form={form}
            name={"email"}
            label={"이메일"}
            placeHolder={"이메일을 입력하세요"}
            type="email"
            leftIcon={<Mail size={18} />}
          />

          <div>
            <Button className="mt-16 w-full b-l mobile:mb-5" type="submit">
              비밀번호 초기화
            </Button>
          </div>
          <Link
            href="/signin"
            className="text-primary  hover:text-primary/50 text-sm font-medium flex flex-row  items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4  mr-1" />
            로그인으로 돌아가기
          </Link>
        </form>
      </Form>
    </div>
  );
}
