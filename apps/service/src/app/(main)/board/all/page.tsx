"use client"
import { Suspense } from "react";
import SearchPost from "./SearchPost";
import PendingFallbackUI from "../../components/PendingFallbackUI";
import DeferredComponent from "../../components/DeferredComponent";


export default function Page() {
 

  return (
    <Suspense fallback={<DeferredComponent><PendingFallbackUI/></DeferredComponent>}>
      <SearchPost/>
     </Suspense>
  );
}
