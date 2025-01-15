import React from "react";
import Link from "next/link";
import { mockMembers } from "../../api/mock-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interns",
  description: "Manage intern information and progress.",
};

export default function InternsPage() {
  return (
    <div className="flex flex-col container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Interns</h1>
      <p>This is the Interns page.</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Track</th>
              <th className="py-2">Role</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockMembers
              .filter((member) => member.role === "intern")
              .map((intern) => (
                <tr key={intern.id}>
                  <td className="border px-4 py-2">{intern.name}</td>
                  <td className="border px-4 py-2">{intern.email}</td>
                  <td className="border px-4 py-2">{intern.trackId}</td>
                  <td className="border px-4 py-2">{intern.role}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href={`/app/interns/profile/${intern.username}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
