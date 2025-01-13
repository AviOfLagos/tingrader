"use client";

import React from 'react';
import { User } from '@/types';

interface InternsGridProps {
  interns: User[];
}

const InternsGrid: React.FC<InternsGridProps> = ({ interns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {interns.map((intern) => (
        <div key={intern.id} className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">{intern.name}</h3>
          <p className="text-gray-600">Role: {intern.role}</p>
          {intern.trackId && <p className="text-gray-600">Track: {intern.trackId}</p>}
          {/* Add more details here */}
        </div>
      ))}
    </div>
  );
};

export default InternsGrid;