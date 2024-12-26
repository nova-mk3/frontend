"use client";

import { SignupForm } from "./components/SignupForm";

export default function Signup() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="mb-4 h-l text-text01">회원가입</h1>
      <SignupForm />
    </div>
  );
}
