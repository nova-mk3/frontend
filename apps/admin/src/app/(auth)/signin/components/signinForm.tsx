import { SigninInput } from "../../../../../../service/src/schema/signin.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nova/ui/components/ui/button";
import { Form } from "@nova/ui/components/ui/form";
import { IdCard, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { InputFormField } from "../../../../../../service/src/app/(auth)/components/InputFormField";
import { InputFormField } from "./InputFormField";
import Logo from "./../../../../../public/image/Logo.svg";



export function SigninForm() {
  const form = useForm<SigninInput>({
    // resolver: zodResolver(SigninSchema),
    defaultValues: {
      studentId: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: SigninInput) {
    console.log(values);
  }

  return (
    <div
      className="w-[500px] h-[600px] mobile:w-[95vw] bg-background01 rounded-2xl flex flex-col items-center justify-center z-10 p-16 mobile:p-8"
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Link href={"/"} className="flex-grow-0 flex items-center justify-center">
        <Logo width={50} fill="#B096F5" className="block"/>
        <div className="text-4xl font-bold text-primary">novAdmin</div>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-shrink-0 w-96 mobile:w-[100%] mb-10 mt-10"
        >
          <InputFormField
            form={form}
            name={"studentId"}
            label={"ID"}
            placeHolder={"ID를 입력하세요"}
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
            type="text"
            leftIcon={<Lock size={18} />}
            hasToggleIcon
          />
          <div>
            <Button
              className="mt-16 w-full b-l mobile:mb-5"
              type="submit"
              disabled={!form.formState.isValid}
            >
              로그인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
