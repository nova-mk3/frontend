"use client";

import { Button } from "@nova/ui/components/button";
export default function Home() {
  return (
    <div>
      this is service
      <Button
        className="absolute right-2 top-2"
        onClick={() => alert("상수하이")}
      >
        <div>asdf</div>
      </Button>
    </div>
  );
}
