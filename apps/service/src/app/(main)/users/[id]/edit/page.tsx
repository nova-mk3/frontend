"use client";
import React from 'react'
import { Form } from "@nova/ui/components/ui/form";
import { useForm, useWatch  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { grade, semester, SignupInput, SignupSchema } from '@/src/schema/signup.schema';
import { InputFormField } from '@/src/app/(auth)/components/InputFormField';
import { InputFormFieldWithButton } from '@/src/app/(auth)/components/InputFormFieldWithButton';
import { RadioFormField } from '@/src/app/(auth)/signup/components/RadioFormField';
import { SelectFormField } from '@/src/app/(auth)/signup/components/SelectFormField';
import { DatePickerForm } from '@/src/app/(auth)/signup/components/DatePickerField';
import { FileFormField } from '@/src/app/(auth)/signup/components/FileFormField';
import { Button } from '@nova/ui/components/ui/button';


export default function page() {
    const form = useForm<SignupInput>({
        resolver: zodResolver(SignupSchema),
        defaultValues: { 
          username: "",
          email: "",
          studentId: "",
          grade: "1학년",
          semester: "1학기",
          emailCode: '',
          emailCheck: false,
          confirmEmailCode : '',
          birth: new Date("1998-10-13"),
          profileImage: undefined,
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          studentType : "재학생",
          isWork : "",
          job : '',
        },
        mode: "onChange",
      });
    
      function onSubmit(values: SignupInput) {
          console.log(values);
        }

      const studentType = useWatch({
        control: form.control,
        name: "studentType",
      });
      const isWork = useWatch({
        control: form.control,
        name: "isWork",
      });
    
      const isEmail = useWatch({
        control: form.control,
        name: "email",
      });
    
      const isContact = useWatch({
        control: form.control,
        name: "isContact",
      });

  return (
    <div className='w-[400px] mx-auto mobile:w-[90%] mt-10'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

      <FileFormField
            form={form}
            name="profileImage"
            label="프로필 사진"
            accept="image/*"
            
      />

        <InputFormField
          form={form}
          name={"username"}
          label={"이름"}
          placeHolder={"이름을 입력하세요"}
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

        <InputFormField
          form={form}
          name={"email"}
          label={"이메일"}
          placeHolder={"이름을 입력하세요"}
        />
    

     

        
        <RadioFormField form={form} name={"studentType"} label={"소속"} options={[{value : "재학생", label : "재학생"},{value : "졸업생", label : "졸업생"}]}/>


        {
          studentType === "재학생" && (
            <>
             <div className="flex gap-4 items-center">
            <SelectFormField form={form} name={"grade"} label="학년" options={grade}/>
            <SelectFormField form={form} name={"semester"} label="학기" options={semester}/>
            </div>
            <RadioFormField form={form} name={"isAbsence"} label={"휴학"} options={[{value : "예", label : "예"},{value : "아니오", label : "아니오"}]}/>
            </>
          )
        }

        {
          studentType === "졸업생" && (
            <>

              <RadioFormField form={form} name={"isWork"} label={"재직여부"} options={[{value : "true", label : "예"},{value : "false", label : "아니오"}]}/>
              <InputFormField
                form={form}
                name={"job"}  
                label={"직무"}
                placeHolder={"직무를 입력해주세요"}
                type="text"
                disabled={ isWork === "false" && true}
              />
              <RadioFormField form={form} name={"isContact"} label={"연락 공개 여부"} options={[{value : "true", label : "예"},{value : "false", label : "아니오"}]}/>
              
              <InputFormField
                form={form}
                name={"contactInfo"}  
                label={"연락처"}
                placeHolder={"연락수단을 입력해주세요! ex) 인스타, 오픈채팅방 링크 등등"}
                type="text"
                disabled={ isContact === "false" && true}
              />

               <InputFormField
                form={form}
                name={"contactInfoDescription"}  
                label={"연락 방법 설명"}
                placeHolder={"연락시 주의사항을 설명해주세요!"}
                type="text"
                disabled={ isContact === "false" && true}
              />

            </>
          )
        }
        
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
          <Button
            className="mt-8 w-full b-l mb-5"
            type="submit"
            disabled={!form.formState.isValid}
          >
            완료
          </Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
