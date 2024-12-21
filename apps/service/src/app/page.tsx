'use client';
import { Button } from "@nova/ui/Button";
export default function Home() {
  return (
    // <div className="font-pretendard mobile:bg-orange-50  bg-orange-500">this is service</div>/ㅁㄴㅇ ㅁㄴ ㅁㄴㅇ ㅁㄴㅇ 
    <div className="relative">
      this is service
      <Button
        className="absolute right-2 top-2"
        onClick={() => console.log("asdf")}
        variant="secondary"
      >
        <div>asdf</div>
      </Button>
    </div>
  );
}
