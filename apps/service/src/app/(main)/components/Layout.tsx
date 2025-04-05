"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isLandingPage = pathName == "/";

  return (
    <body>
      {/* 추후 수정 예정 @kwonja */}
      <div
        id="root"
        className={
          isLandingPage
            ? "snap-y snap-mandatory h-screen overflow-scroll no-scrollbar"
            : "max-w-screen-xl mx-auto"
        }
      >
        {/* TODO: 사라지고 나타나는걸 스크롤 이벤트로 처리해야 한다. */}
        <Header />
        {children}
      </div>
    </body>
  );
}
