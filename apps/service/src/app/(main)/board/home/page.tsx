"use client";
import { Suspense } from "react";
import Layout from "./components/Layout";


export default function page() {
  return (
    <>
    <Suspense>
      <Layout/>
    </Suspense>
    </>
)}