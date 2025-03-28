import { useState } from "react";
import PendingMemberCardModal from "./PendingMemberCardModal";
import { usePendingMembersQuery } from "@/src/query/pendingMembersQueries";
import PendingMemberList from "./PendingMemberList";


export default function PendingMembers() {
  const { data, isLoading, isError } = usePendingMembersQuery();
  const [open, setOpen] = useState(false);
  const [selectedPendingMemberId, setSelectedPendingMemberId] = useState("");

  return (
    <div className="font-pretendard flex flex-col min-h-[700px] w-[1400px]">
      <div className="text-xl font-bold m-4">
        {isLoading
          ? "데이터 로딩중..."
          : isError
          ? "데이터 로딩중 오류가 발생했습니다"
          : `총 ${data?.totalPendingMemberCount || 0}명`}
      </div>
      {isLoading && (
        <div className="text-4xl font-bold text-center w-full flex-grow flex items-center justify-center">
          데이터 로딩중...
        </div>
      )}

      {isError && (
        <div className="text-4xl font-bold text-center text-red-500 w-full flex-grow flex items-center justify-center">
          데이터 로딩중 오류가 발생했습니다.
        </div>
      )}
      {!isLoading && !isError && (
        <>
          {data?.pendingMemberResponseList?.length ? (
            <PendingMemberList
              members={data.pendingMemberResponseList}
              onClick={(memberId) => {
                setSelectedPendingMemberId(memberId);
                setOpen(true);
              }}
            />
          ) : (
            <div className="flex-grow flex items-center justify-center w-full">
              <div className="text-4xl font-bold text-center">신청자가 없습니다.</div>
            </div>
          )}

          <PendingMemberCardModal
            open={open}
            onClose={() => setOpen(false)}
            pendingMemberId={selectedPendingMemberId}
          />
        </>
      )}
    </div>
  );
}


