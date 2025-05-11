import { Suspense } from "react";

import { SigninForm } from "@/src/features/auth/components/signin/signinForm";
import { Background } from "@/src/features/auth/components/signin/background";

// export const dynamic = "force-dynamic";

export default function Signin() {
  return (
    <div className="relative w-screen h-screen bg-primary flex justify-center items-center overflow-hidden">
      <Background className="mobile:hidden" />
      <Suspense
        fallback={
          <div className="w-[500px] h-[600px] mobile:w-[95vw] bg-background01 rounded-2xl flex flex-col items-center justify-center z-10 p-16 mobile:p-8 animate-pulse"></div>
        }
      >
        <SigninForm />
      </Suspense>
    </div>
  );
}
