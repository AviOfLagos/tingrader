"use client";
import React from 'react';
import GradingInterface from '@/components/grading/GradingInterface';
import { useSearchParams, useParams } from 'next/navigation';

const GradingDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || '';
  const gradingType = searchParams.get('type') === 'swipe' ? 'swipe' : 'stars';

  return (
    <div className="container mx-auto p-4">
      <GradingInterface taskId={id} gradingType={gradingType} />
    </div>
  );
};

export default GradingDetailPage;
