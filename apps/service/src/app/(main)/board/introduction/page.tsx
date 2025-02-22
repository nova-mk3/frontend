"use client"
import {  Suspense, useState } from "react";
import SearchPost from "./SearchPost";

export default function Page() {
 


  return (
    <>
      <Suspense>
            <SearchPost/>
           </Suspense>
    </>
  );
}
