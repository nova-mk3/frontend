import React from "react";
import Card from "./components/Card";
import Title from "./components/Title";
import { Users } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <Title title="동아리원 소개" TitleImage={<Users size={24} />} />

      <div className="w-[90%] xl:w-full mx-auto">
        <div className="mx-auto grid gap-9  lg:grid-cols-3 xl:grid-cols-4 mobile:grid-cols-1 ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
