"use client";

import React from 'react';
import Link from 'next/link';

export default function DashboardNotFound() {
  return (
    <div className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-black text-[#2d99e7] shadow-black mb-4">
          Choii!!
        </h1>
        <p className="mb-4 text-xl font-bold">
          Ehmm... No vex oh, we couldn't find the page you're looking for.
        </p>
      <Link href="/app/(dashboard)/" className="text-primary underline">
        Go back to Dashboard
      </Link>
      <Link href="/" className="text-primary underline">
        Or Go back Home
      </Link>
    </div>
  );
}