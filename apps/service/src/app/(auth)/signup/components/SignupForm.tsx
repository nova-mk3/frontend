"use client";

import { SignupInput, SignupSchema } from "@/src/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nova/ui/components/ui/button";
import { Form } from "@nova/ui/components/ui/form";

import { useForm } from "react-hook-form";
import { DatePickerForm } from "./DatePickerField";
import { FileFormField } from "./FileFormField";
import { InputFormField } from "./InputFormField";
import { RadioFormField } from "./RadioFormField";
import { SelectFormField } from "./SelectFormField";

// TODO : 사이사이에 숨어있는 as 들 없애기.
export function SignupForm() {
  const form = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      studentId: "",
      grade: "1학년",
      semester: "1학기",
      birth: new Date("1998-10-13"),
      profileImage: undefined,
      gender: "남성",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: SignupInput) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <InputFormField
          form={form}
          name={"username"}
          label={"이름"}
          placeHolder={"이름을 입력하세요"}
        />
        <InputFormField
          form={form}
          name={"email"}
          label={"이메일"}
          placeHolder={"xxxxx@xxxxx.com"}
          type="email"
        />
        <InputFormField
          form={form}
          name={"studentId"}  
          label={"학번"}
          placeHolder={"학번을 입력하세요"}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <div className="flex gap-4 items-center">
          <SelectFormField form={form} name={"grade"} label="학년" />
          <SelectFormField form={form} name={"semester"} label="학기" />
        </div>
        <div className="flex gap-6 items-center">
          <DatePickerForm form={form} name={"birth"} label={"생년월일"} />
          <FileFormField
            form={form}
            name="profileImage"
            label="프로필 사진"
            accept="image/*"
          />
        </div>
        <RadioFormField form={form} name={"gender"} label={"성별"} />
        <InputFormField
          form={form}
          name={"phoneNumber"}
          label={"전화번호"}
          placeHolder={"010-0000-0000"}
          type="tel"
        />
        <InputFormField
          form={form}
          name={"password"}
          label={"비밀번호"}
          placeHolder={"********"}
          type="password"
        />
        <InputFormField
          form={form}
          name={"confirmPassword"}
          label={"비밀번호 확인"}
          placeHolder={"********"}
          type="password"
        />
        <div>
          <Button
            className="mt-8 w-full b-l mobile:mb-5"
            type="submit"
            disabled={!form.formState.isValid}
          >
            회원가입
          </Button>
        </div>
      </form>
    </Form>
  );
}
