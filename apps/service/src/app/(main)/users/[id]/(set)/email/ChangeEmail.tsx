"use client";
import { EmailInput, EmailSchema } from "@/src/schema/changeemail.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@nova/ui/components/ui/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useGetUserData, userKeys } from "../../query/qureies";
import { Button } from "@nova/ui/components/ui/button";
import {
  PutUserEmail,
  userVerifyEmail,
  userVerifyEmailCode,
} from "@/src/features/user/list/api/user";
import { InputFormFieldWithButton } from "@/src/features/auth/components/signup/InputFormFieldWithButton";
interface Props {
  memberId: string;
}
export default function ChangeEmail({ memberId }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  // 이메일 인증 메시지 상태
  const [emailSentMessage, setEmailSentMessage] = useState<string | null>(null);
  const [emailVerifiedMessageSuccess, setEmailVerifiedMessageSuccess] =
    useState<string | null>(null);
  const [emailVerifiedMessageDanger, setEmailVerifiedMessageDanger] = useState<
    string | null
  >(null);
  const form = useForm<EmailInput>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
      emailCode: "",
      emailCheck: false,
      emailCodeCheck: false,
    },
    mode: "onChange",
  });

  const emailCheck = useWatch({
    control: form.control,
    name: "emailCheck",
  });
  const isEmail = useWatch({
    control: form.control,
    name: "email",
  });

  // 이것도 따로 관리할 수 있을 것 같다는 의견
  const useVerifyEmailMutation = useMutation({
    mutationFn: ({
      email,
      profileMemberId,
    }: {
      email: string;
      profileMemberId: string;
    }) => userVerifyEmail({ email, profileMemberId }),
    onSuccess: (data: any) => {
      console.log(data);
      setEmailSentMessage(data.data);
      form.clearErrors("emailCode");
      form.setValue("emailCheck", true, { shouldValidate: true });
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });

  async function onEmailSubmit(value: string) {
    if (form?.formState.errors.email) return;

    //미인증상태
    if (!emailCheck) {
      useVerifyEmailMutation.mutate({
        email: value,
        profileMemberId: memberId,
      });
    }
    //인증 이메일 변경
    else if (emailCheck === true) {
      form.setValue("emailCheck", false, { shouldValidate: true });
      form.setValue("emailCodeCheck", false, { shouldValidate: true });
      form.setValue("emailCode", "", { shouldValidate: true });
      setEmailSentMessage("");
      setEmailVerifiedMessageSuccess(null);
      setEmailVerifiedMessageDanger(null);
    }
  }

  const useVerifyEmailCodeMutation = useMutation({
    mutationFn: ({
      email,
      authCode,
      profileMemberId,
    }: {
      email: string;
      authCode: string;
      profileMemberId: string;
    }) => userVerifyEmailCode({ email, authCode, profileMemberId }),
    onSuccess: (data: any) => {
      console.log(data);
      form.setValue("emailCodeCheck", true, { shouldValidate: true });
      setEmailVerifiedMessageSuccess(data.data);
      setEmailVerifiedMessageDanger(null);
    },
    onError: (error) => {
      console.log(error);
      setEmailVerifiedMessageDanger(error.message);
      setEmailVerifiedMessageSuccess(null);
    },
  });

  const usePutEmailMutation = useMutation({
    mutationFn: ({
      email,
      profileMemberId,
    }: {
      email: string;
      profileMemberId: string;
    }) => PutUserEmail({ email, profileMemberId }),
    onSuccess: (data: any) => {
      console.log(data);

      queryClient.invalidateQueries({
        queryKey: userKeys.user(memberId),
        refetchType: "inactive",
      });
      router.push(`/users/${memberId}`);
    },
    onError: (error) => {
      console.log(error);
      alert(error.message);
    },
  });

  function onEmailNumberSubmit(value: string) {
    if (!emailCheck) {
      {
        form.setError("email", {
          message: "이메일인증을 진행해주세요! 이메일을 지웠다가 다시 써주세요",
        });
      }
      return;
    }
    useVerifyEmailCodeMutation.mutate({
      email: isEmail,
      authCode: value,
      profileMemberId: memberId,
    });
  }
  const onValid = (data: EmailInput) => {
    console.log(data);
    usePutEmailMutation.mutate({
      email: data.email,
      profileMemberId: memberId,
    });
  };

  const onInvalid = (errors: any) => {
    console.log(errors);
    if (errors.emailCheck) {
      form.setError("email", {
        message: errors.emailCheck.message + " 지웠다가 다시 작성해주세요",
      });
    }

    if (errors.emailCodeCheck) {
      form.setError("emailCode", {
        message: errors.emailCodeCheck.message + " 지웠다가 다시 작성해주세요",
      });
    }
  };
  return (
    <div className="w-[400px] mx-auto mobile:w-[90%] mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid, onInvalid)}
          className="space-y-6"
        >
          <InputFormFieldWithButton
            form={form}
            name={"email"}
            label={"이메일"}
            placeHolder={"변경하고 싶은 이메일을 입력하세요"}
            type="email"
            btnText="인증번호 전송"
            disabled={emailCheck === true ? true : false}
            onClick={onEmailSubmit}
          />
          {emailSentMessage && (
            <p className="b-s text-success">{emailSentMessage}</p>
          )}

          <InputFormFieldWithButton
            form={form}
            name={"emailCode"}
            label={"인증코드"}
            placeHolder={"인증번호를 입력하세요"}
            btnText="확인"
            onClick={onEmailNumberSubmit}
          />
          {emailVerifiedMessageSuccess && (
            <p className="b-s text-success">{emailVerifiedMessageSuccess}</p>
          )}
          {/* 이메일 인증 성공 메시지 */}
          {emailVerifiedMessageDanger && (
            <p className="b-s text-danger">{emailVerifiedMessageDanger}</p>
          )}

          <Button className="mt-8 w-full b-l mb-5" type="submit">
            완료
          </Button>
        </form>
      </Form>
    </div>
  );
}
