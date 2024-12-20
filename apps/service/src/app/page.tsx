'use client';
import { Button } from "@nova/ui/Button";
export default function Home() {
  return (
    <div className="relative">
      this is service
      <Button
        className="absolute right-2 top-2"
        onClick={() => console.log("asdf")}
        variant="ghost"
      >
        <div>asdf</div>
      </Button>
    </div>
  );
}
