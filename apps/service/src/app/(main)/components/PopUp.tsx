"use client";
import React, { useEffect, useState } from "react";
import PopUpModal from "./Modal/PopUpModal";

export default function PopUp() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("NovaUpdatePopup") === "true") {
      setIsHidden(true);
    } else setIsHidden(false);
  }, []);
  // 페이지 로드시 체크

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAction = () => {
    localStorage.setItem("NovaUpdatePopup", "true");
    setIsOpen(false);
  };
  if (!isHidden) {
    return (
      <PopUpModal isOpen={isOpen} onAction={handleAction} onClose={handleClose}>
        <div className="text-lg font-bold mb-2">📢 업데이트 안내</div>
        <div className="mb-3">
          아래 기능이 새롭게 추가되었어요. 앞으로도 더 편리하게 이용하실 수
          있도록 개선 중입니다!
        </div>

        <div className="!font-bold mt-2">✅ 업데이트 내역</div>
        <div>1. 마이페이지 건의함/게시글 보기 기능 추가</div>

        <div className="!font-bold mt-4">🛠 개선 예정</div>
        <div>1. 모바일 호환성</div>
        <div>2. 알림 기능</div>

        <div className="mt-4 text-sm text-gray-500">
          ※ 피드백은 건의함을 통해 남겨주세요!
        </div>
      </PopUpModal>
    );
  } else {
    return null;
  }
}
