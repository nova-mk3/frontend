"use client";
import { Button } from "@nova/ui/components/button";
export default function Home() {
  return (
    <div>
      this is service
      <Button
        className="absolute right-2 top-2"
        onClick={() => console.log("asdf")}
        variant="outline"
      >
        <div>asdf</div>
      </Button>
    </div>
  );
}
