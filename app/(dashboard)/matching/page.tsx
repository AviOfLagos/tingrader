import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matching",
  description: "Matching your tasks and assignments.",
};

export default function MatchingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MatchingPage</h1>
      <p>This is the Matching page.</p>
      {/* Add the submission form component here in the future */}
    </div>
  );
}
