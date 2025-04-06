"use client";

import { Background } from "./components/background";
import { SigninForm } from "./components/signinForm";

export default function Signin() {
  return (
    <div className="relative w-screen h-screen bg-primary flex justify-center items-center overflow-hidden">
      <Background className="mobile:hidden" />
      <SigninForm />
    </div>
  );
}
