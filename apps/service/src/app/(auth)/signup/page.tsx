import { Background } from "@/src/features/auth/components/signup/background";
import { SignupForm } from "@/src/features/auth/components/signup/SignupForm";

export default function Signup() {
  return (
    <div className="bg-primary w-screen h-screen flex overflow-hidden mobile:overflow-auto relative">
      <Background />
      <div className="absolute  right-0 h-screen w-[880px] mobile:w-screen bg-background01 rounded-s-[40px] mobile:rounded-none flex justify-center z-10 overflow-y-auto items-center">
        <div className="max-w-md h-full w-3/6 mobile:w-full mx-auto mobile:mx-1 p-4 flex-shrink-0">
          <h1 className="my-10 h-l text-text01">회원가입</h1>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
