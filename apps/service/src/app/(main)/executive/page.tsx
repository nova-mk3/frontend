import React from "react";
import Title from "./components/Title";
import { Crown } from "lucide-react";
import Card from "../people/components/Card";

export default function page() {
  return (
    <div className="">
      <Title title="임원소개" TitleImage={<Crown size={24} />} />

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-2xl font-bold  flex items-center text-primary">
            <span className="inline-block w-3 h-8 bg-primary mr-3"></span>
            회장
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card />
            <Card />
          </div>
        </section>
        <h2 className="text-2xl font-bold  flex items-center text-gray-400">
          <span className="inline-block w-3 h-8 bg-gray-400 mr-3"></span>
          부회장
        </h2>
        <div className="flex flex-row md:grid-cols-4 gap-6">
          <Card />
        </div>
        <h2 className="text-2xl font-bold flex items-center text-gray-500">
          <span className="inline-block w-3 h-8 bg-gray-500 mr-3"></span>
          임원
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
