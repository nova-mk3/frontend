"use client";

import {
  grade,
  semester,
  SignupInput,
  SignupSchema,
} from "@/src/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nova/ui/components/ui/button";
import { Form } from "@nova/ui/components/ui/form";

import { useForm, useWatch } from "react-hook-form";
import { InputFormField } from "../../components/InputFormField";
import { DatePickerForm } from "./DatePickerField";
import { FileFormField } from "./FileFormField";
import { RadioFormField } from "./RadioFormField";
import { SelectFormField } from "./SelectFormField";
import { InputFormFieldWithButton } from "../../components/InputFormFieldWithButton";
import GraduationYearSelect from "./GraduationYearSelect";
import {
  GraduationSignUpRequest,
  MemberSignUpRequest,
  ProfileUploadAPI,
  signup,
  SignUpData,
  verifyEmail,
  verifyEmailCode,
} from "@/src/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

// TODO : 사이사이에 숨어있는 as 들 없애기.
export function SignupForm() {
  const router = useRouter();

  // 이메일 인증 메시지 상태
  const [emailSentMessage, setEmailSentMessage] = useState<string | null>(null);
  const [emailVerifiedMessageSuccess, setEmailVerifiedMessageSuccess] =
    useState<string | null>(null);
  const [emailVerifiedMessageDanger, setEmailVerifiedMessageDanger] = useState<
    string | null
  >(null);

  const form = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      studentNumber: "",
      grade: "1학년",
      semester: "1학기",
      emailCode: "",
      emailCodeCheck: false,
      absence: undefined,
      emailCheck: false,
      birth: new Date("1998-10-13"),
      profilePhoto: undefined,
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      year: "2025년",
      graduation: false,
      work: undefined,
      job: "",
      contact: false,
      contactInfo: "",
      contactDescription: "",
    },
    mode: "onChange",
  });

  const graduation = useWatch({
    control: form.control,
    name: "graduation",
  });
  const emailCheck = useWatch({
    control: form.control,
    name: "emailCheck",
  });
  const isWork = useWatch({
    control: form.control,
    name: "work",
  });

  const isEmail = useWatch({
    control: form.control,
    name: "email",
  });

  const isContact = useWatch({
    control: form.control,
    name: "contact",
  });

  // 이것도 따로 관리할 수 있을 것 같다는 의견
  const useVerifyEmailMutation = useMutation({
    mutationFn: (email: string) => verifyEmail(email),
    onSuccess: (data: any) => {
      setEmailSentMessage(data.data);
      form.clearErrors("emailCode");
      form.setValue("emailCheck", true, { shouldValidate: true });
    },
    onError: (error) => {
      alert(error.message);
      console.log(error);
    },
  });

  const useVerifyEmailCodeMutation = useMutation({
    mutationFn: ({ email, authCode }: { email: string; authCode: string }) =>
      verifyEmailCode({ email, authCode }),
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

  const useSignupMutation = useMutation({
    mutationFn: (data: SignUpData) => signup(data),
    onSuccess: (data: any) => {
      alert("로그인 성공\n관리자에게 문의해 승인을 받으세요!");
      router.push(`/signin?redirect=${decodeURI("/signup")}`);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const useProfileUploadMutation = useMutation({
    mutationFn: ({ data }: { data: FormData }) => ProfileUploadAPI(data),
  });

  async function onEmailSubmit(value: string) {
    if (form?.formState.errors.email) return;

    //미인증상태
    if (!emailCheck) {
      useVerifyEmailMutation.mutate(value);
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

  function onEmailNumberSubmit(value: string) {
    if (!emailCheck) {
      {
        form.setError("email", {
          message: "이메일인증을 진행해주세요! 이메일을 지웠다가 다시 써주세요",
        });
      }
      return;
    }
    useVerifyEmailCodeMutation.mutate({ email: isEmail, authCode: value });
  }

  async function onSubmit(values: SignupInput) {
    // 등록할 프로필이 있다면
    if (values.profilePhoto) {
      const formData = new FormData();
      formData.append("profile-photo", values.profilePhoto!);
      try {
        const response = await useProfileUploadMutation.mutateAsync({
          data: formData,
        });

        const memberSignUpRequest: MemberSignUpRequest = {
          studentNumber: values.studentNumber,
          password: values.password,
          name: values.username,
          email: values.email,
          graduation: values.graduation,
          grade: values.grade!,
          semester: values.semester!,
          absence: values.absence!,
          profilePhoto: response.data.id,
          phone: values.phoneNumber,
          birth: !values.birth ? "" : values.birth.toLocaleDateString("ko-KR"),
        };

        // [2] graduation이 true라면 graduationSignUpRequest 만들기
        let graduationSignUpRequest: GraduationSignUpRequest | undefined;
        if (values.graduation) {
          graduationSignUpRequest = {
            year: values.year!,
            contact: values.contact!,
            work: values.work!,
            job: values.job!,
            contactInfo: values.contactInfo!,
            contactDescription: values.contactDescription!,
          };
        }

        // [3] 최종 SignUpData 조합
        const requestData: SignUpData = {
          memberSignUpRequest,
          graduationSignUpRequest,
        };

        useSignupMutation.mutate(requestData);
      } catch (error) {
        alert("파일 업로드 실패");
        console.log(error);
      }
    }
    // 프로필 없을때
    else {
      const memberSignUpRequest: MemberSignUpRequest = {
        studentNumber: values.studentNumber,
        password: values.password,
        name: values.username,
        email: values.email,
        graduation: values.graduation,
        grade: values.grade!,
        semester: values.semester!,
        absence: values.absence!,
        profilePhoto: "",
        phone: values.phoneNumber,
        birth: !values.birth ? "" : values.birth.toLocaleDateString("ko-KR"),
      };

      // [2] graduation이 true라면 graduationSignUpRequest 만들기
      let graduationSignUpRequest: GraduationSignUpRequest | undefined;
      if (values.graduation) {
        graduationSignUpRequest = {
          year: values.year!,
          contact: values.contact!,
          work: values.work!,
          job: values.job!,
          contactInfo: values.contactInfo!,
          contactDescription: values.contactDescription!,
        };
      }

      // [3] 최종 SignUpData 조합
      const requestData: SignUpData = {
        memberSignUpRequest,
        graduationSignUpRequest,
      };

      useSignupMutation.mutate(requestData);
    }
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
          name={"studentNumber"}
          label={"학번"}
          placeHolder={"학번을 입력하세요"}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        {/* 이메일 인증 */}
        <InputFormFieldWithButton
          form={form}
          name={"email"}
          label={"이메일"}
          placeHolder={"xxxxx@xxxxx.com"}
          type="email"
          btnText="인증번호 전송"
          disabled={emailCheck === true ? true : false}
          onClick={onEmailSubmit}
        />
        {form.formState.errors.emailCheck && (
          <p className="b-s text-danger">
            {form.formState.errors.emailCheck?.message}
          </p>
        )}
        {emailSentMessage && (
          <p className="b-s text-success">{emailSentMessage}</p>
        )}
        {/* 이메일 전송 성공 메시지 */}
        <InputFormFieldWithButton
          form={form}
          name={"emailCode"}
          label={"인증"}
          placeHolder={"인증번호를 입력해주세요"}
          type="text"
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
        {/* 이메일 인증 실패 메시지 */}
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
            <GraduationYearSelect form={form} name={"year"} label="졸업년도" />
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
          <FileFormField
            form={form}
            name="profilePhoto"
            label="프로필 사진"
            accept="image/*"
          />
        </div>
        <InputFormField
          form={form}
          name={"phoneNumber"}
          label={"전화번호"}
          placeHolder={"전화번호 작성시 공개됩니다 ex)010-0000-0000"}
          type="tel"
        />
        <InputFormField
          form={form}
          name={"password"}
          label={"비밀번호"}
          placeHolder={"********"}
          type="password"
          hasToggleIcon
        />
        <InputFormField
          form={form}
          name={"confirmPassword"}
          label={"비밀번호 확인"}
          placeHolder={"********"}
          type="password"
          hasToggleIcon
        />
        <div>
          <Button className="mt-8 w-full b-l mb-5" type="submit">
            회원가입
          </Button>
        </div>
      </form>
    </Form>
  );
}
