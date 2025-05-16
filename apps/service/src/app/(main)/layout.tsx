import Footer from "@/src/shared/ui/footer/Footer";
import Header from "@/src/shared/ui/header/Header";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 추후 수정 예정 @kwonja */}
      <div id="root" className="max-w-screen-xl mx-auto">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
