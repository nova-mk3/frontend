import React from "react";
import { History } from "lucide-react";
import Item from "./components/Item";
import Image from "next/image";
import PosterImageURL from "@/public/image/poster.jpg";
export default function page() {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-row flex-wrap items-end border-primary border-b-[1px] py-5 mobile:flex-col mobile:items-center`}
      >
        <p className="t-l !font-bold text-primary mobile:mb-[15px] flex items-center gap-2">
          <History size={24} />
          연혁
        </p>
      </div>

      <div className="d-l mx-auto mt-5 text-primary text-center my-10 !font-bold">
        ABOUT NOVA
      </div>
      {/* 여기에 포스터 들어오면 좋을듯! */}
      <Image src={PosterImageURL} alt="user profile" className="mx-auto" />
      <div className="flex flex-col mx-auto">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
