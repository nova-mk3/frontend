import React from "react";

export default function Item() {
  return (
    <div className="flex flex-row mt-10">
      <div className="flex flex-col gap-1 pr-20">
        <p className="h-s text-primary !font-bold">2024</p>
        <p className="text-text03">소개말 같은거 써도 괜찮을듯</p>
      </div>
      <ul className="border-l-[4px] border-line01 pl-20 flex flex-col gap-3">
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
        <li className="flex flex-row gap-5 items-center">
          <p>2024.08</p> <p className="text-text02">lCT 창업 경진대회 우수상</p>
        </li>
      </ul>
    </div>
  );
}
