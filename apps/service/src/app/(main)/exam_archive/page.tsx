import { Suspense } from "react";
import SearchPost from "./SearchPost";
import PendingFallbackUI from "../components/PendingFallbackUI";

export default function Page() {


  return (
    // 서버에서 검사하지 않고 넘어가도록 막는 역활을 하는듯
    <Suspense fallback={<PendingFallbackUI/>}>
      <SearchPost />
    </Suspense>
  );
}
