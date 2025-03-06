import React from "react";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col  w-full t-m mx-auto screenLg:w-[80%]">
        {children}
      </div>
    </>
  );
}
