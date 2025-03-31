import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
