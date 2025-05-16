"use client";

type DownloadModalProps = {
  progress: number;
  isOpen: boolean;
};

export const DownloadProgressModal = ({
  progress,
  isOpen,
}: DownloadModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[51]"
      // onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">파일 다운로드 중...</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-gray-600">{progress.toFixed(0)}%</p>
      </div>
    </div>
  );
};
