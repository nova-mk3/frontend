// import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nova/ui/components/ui/button";
import { Form } from "@nova/ui/components/ui/form";
import { IdCard, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { InputFormField } from "./InputFormField";
import Logo from "@/public/image/Logo.svg";
import { AdminLogin } from "@/src/api/auth/adminLogin";
import { SigninInput } from "./signin.schema";

export function SigninForm() {
  const form = useForm<SigninInput>({
    // resolver: zodResolver(SigninSchema),
    defaultValues: {
      studentNumber: "",
      password: "",
    },
    mode: "onChange",
  });

  function onSubmit(values: SigninInput) {
    AdminLogin(values);
  }

  return (
    <div
      className="w-[500px] h-[600px] mobile:w-[95vw] bg-background01 rounded-2xl flex flex-col items-center justify-center z-10 p-16 mobile:p-8"
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Link
        href={"/admin/"}
        className="flex-grow-0 flex items-center justify-center"
      >
        <Logo height="50px" width="50px" fill="#B096F5" className="block" />
        <div className="text-4xl font-bold text-primary">novAdmin</div>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-shrink-0 w-96 mobile:w-[100%] mb-10 mt-10"
        >
          <InputFormField
            form={form}
            name={"studentNumber"}
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
