"use client";

import Logo from "@/public/image/Logo.svg";

export default function Signin() {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center overflow-hidden">
      <div>
        <Logo
          className="absolute rotate-3 top-[-40px] left-[210px]"
          fill="#FFFFFF"
          width="700px"
        />
        <Logo
          className="absolute rotate-[80deg] top-[-280px] left-[1200px] blur-[1.4px]"
          fill="#FFFFFFC9"
          width="200px"
        />
        <Logo
          className="absolute rotate-[40deg] top-[280px] left-[1000px] blur-[1.4px]"
          fill="#FFFFFF79"
          width="180px"
        />
        <div className="text-background01 absolute top-[48%] left-[75%]">
          <p className="d-m">Come</p>
          <p className="d-s ps-8">to club nova</p>
        </div>
      </div>
      <div
        className="w-[500px] h-[600px] bg-background01 rounded-2xl flex justify-center z-10"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        this is Signin
      </div>
    </div>
  );
}
