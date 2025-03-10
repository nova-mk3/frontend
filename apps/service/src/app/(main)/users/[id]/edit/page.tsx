"use client";
import React from "react";
import { Form } from "@nova/ui/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  grade,
  semester,
  SignupInput,
  SignupSchema,
} from "@/src/schema/signup.schema";
import { InputFormField } from "@/src/app/(auth)/components/InputFormField";
import { InputFormFieldWithButton } from "@/src/app/(auth)/components/InputFormFieldWithButton";
import { RadioFormField } from "@/src/app/(auth)/signup/components/RadioFormField";
import { SelectFormField } from "@/src/app/(auth)/signup/components/SelectFormField";
import { DatePickerForm } from "@/src/app/(auth)/signup/components/DatePickerField";
import { FileFormField } from "@/src/app/(auth)/signup/components/FileFormField";
import { Button } from "@nova/ui/components/ui/button";

export default function page() {
  return <div className="w-[400px] mx-auto mobile:w-[90%] mt-10"></div>;
}
