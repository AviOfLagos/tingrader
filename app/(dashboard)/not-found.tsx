"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-black text-[#2d99e7] shadow-black mb-4">
        Choii!!
      </h1>
      <p className="mb-4 text-xl font-bold">
        Ehmm... No vex oh, we couldn't find the page you're looking for.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => router.back()}
          className="text-primary underline"
        >
          Go Back one step
        </button>
        <Link href="/app" className="text-primary underline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
