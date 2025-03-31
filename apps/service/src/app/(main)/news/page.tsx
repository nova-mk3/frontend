import React from "react";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Separator } from "@nova/ui/components/ui/separator";
import HistoryList from "./components/HistoryList";
import { History } from "./components/HistoryList";
export default function page() {
  const HistoryData2024: History[] = [
    {
      time: "2024",
      text: "1학기 우수 마일리지 대상",
    },
    {
      time: "2024",
      text: "SCPC 2 round 진출",
    },
    {
      time: "2024",
      text: "EKC2024 수료",
    },
    {
      time: "2024",
      text: "삼성 DX 알고리즘 특강 합격",
    },
    {
      time: "2024",
      text: "ICPC 본선진출",
    },
    {
      time: "2024",
      text: "제 3회 빅데이터 & AI 활용방안 아이디어 경진대회 아이디어상",
    },
    {
      time: "2024",
      text: "공개 SW 개발자 대회 우수작 선정",
    },
    {
      time: "2024",
      text: "충북 스마트 & 디지털 페스티벌 우수상,장려상",
    },
  ];

  const HistoryData2023: History[] = [
    { time: "2023", text: "1차 Solved.up 경진대회 최우수상" },
    { time: "2023", text: "SW 해커톤 대회 기업상" },
    { time: "2023", text: "1학기 교과 기반 프로젝트 발표회 우수상" },
    { time: "2023", text: "1학기 마일리지 우수 대상, 최우수상" },
    { time: "2023", text: "19회 TOPCIT 교내 최고 득점상" },
    { time: "2023", text: "ICPC 본선 진출" },
    { time: "2023", text: "2차 Solved.up 경진대회 우수상, 장려상" },
    { time: "2023", text: "씨앗 마일리지 특별상" },
    { time: "2023", text: "2학기 마일리지 우수 마일리지 최우수상" },
    { time: "2023", text: "IP-InnoStartUP Festival 최우수상 및 장려상" },
    { time: "2023", text: "ICT 기반 창업 모의 IR 경진대회 장려상" },
    { time: "2023", text: "2학기 교과기반 프로젝트 영어 발표회 우수상" },
    {
      time: "2023",
      text: "SW중심 사업단 학부생 튜터 프로그램 알고리즘 우수 튜터",
    },
    { time: "2023", text: "20회 Topcit 울산 정보 산업진흥원장상" },
    { time: "2023", text: "캡스톤 디자인 경진대회 콘텐츠 공모전 우수상" },
    {
      time: "2023",
      text: "인공지능을 이용한 비화재보 관리 시스템 및 방법 특허 출원",
    },
    { time: "2023", text: "창의적 종합설계 경진대회 한국산업기술진흥원장상" },
    { time: "2023", text: "캡스톤 디자인 전시회 우수상" },
    { time: "2023", text: "한밭대학교 컨소시엄 창의적 종합설계 경진대회 금상" },
  ];

  const HistoryData2022: History[] = [
    {
      time: "2022",
      text: "동아리 평가 1위",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex flex-col flex-wrap  py-6 mobile:flex-col mobile:items-center gap-3`}
      >
        <p className="text-2xl !font-bold text-primary mobile:mb-[15px] flex items-center gap-2  ">
          <Clock size={24} />
          연혁
        </p>
      </div>

      <div className="d-l  mt-5 text-primary  my-10 !font-bold mobile:text-center">
        ABOUT NOVA
      </div>
      {/* 여기에 포스터 들어오면 좋을듯! */}
      <div className="flex flex-row  gap-10 mobile:flex-col mobile:mx-auto">
        <Image
          src="/image/NovaPoster.jpg"
          alt=""
          width={300}
          height={500}
          className="h-auto object-cover "
        />
        <Image
          src="/image/NovaPosterSub.jpg"
          alt=""
          width={300}
          height={500}
          className="h-auto object-cover"
        />
      </div>

      <div className="flex flex-col">
        <HistoryList
          year="2024"
          introduction="2024년 무슨일이?!"
          history={HistoryData2024}
        />
        <HistoryList
          year="2023"
          introduction="2023년 무슨일이?!"
          history={HistoryData2023}
        />
        <HistoryList
          year="2022"
          introduction="2022년 무슨일이?!"
          history={HistoryData2022}
        />
      </div>
    </div>
  );
}
