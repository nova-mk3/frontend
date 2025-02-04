"use client";

import { InputFormField } from '@/src/app/(auth)/components/InputFormField';
import { PwdInput, PwdSchema } from '@/src/schema/changepwd.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nova/ui/components/ui/button';
import { Form } from "@nova/ui/components/ui/form";
import React from 'react'
import { useForm } from 'react-hook-form';

export default function page() {

   const form = useForm<PwdInput>({
          resolver: zodResolver(PwdSchema),
          defaultValues: {
            currentPassword : '',
            newPassword : '',
            confirmNewPassword : '',
          },
          mode: "onChange",
  });

  function onSubmit(values: PwdInput) {
              console.log(values);
    }    
  return (
    <div className='w-[400px] mx-auto mobile:w-[90%] mt-10'>
      <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

      <InputFormField 
        form={form}
        name={"currentPassword"}
        label={"현재 비밀번호"}
        placeHolder={"현재 비밀번호를 입력하세요"}
        />

<InputFormField 
        form={form}
        name={"newPassword"}
        label={"새 비밀번호"}
        placeHolder={"새 비밀번호를 입력해주세요"}
        />

<InputFormField 
        form={form}
        name={"confirmNewPassword"}
        label={"새 비밀번호 확인"}
        placeHolder={"한번 더 입력해주세요"}
        />

      <div>
          <Button
            className="mt-8 w-full b-l mb-5"
            type="submit"
          >
            완료
          </Button>
        </div>

        </form>
      </Form>
    </div>
  )
}
