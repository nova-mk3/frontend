import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
}

export default function LoadingModal({ isOpen }: Props) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setDots("");
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "....") return ".";
        return prev + ".";
      });
    }, 800); // 0.5초마다 점 추가

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-500">업로드 중입니다{dots}</p>
      </div>
    </div>
  );
}
