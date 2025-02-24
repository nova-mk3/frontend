"use client"
import { Suspense } from "react";
import SearchPost from "./SearchPost";
import DeferredComponent from "../../components/DeferredComponent";
import PendingFallbackUI from "../../components/PendingFallbackUI";


export default function Page() {

  return (
    <Suspense fallback={<DeferredComponent><PendingFallbackUI/></DeferredComponent>}>
          <SearchPost/>
    </Suspense>
  );
}
