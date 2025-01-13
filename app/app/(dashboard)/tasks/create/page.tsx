"use client";

import React from 'react';
import TaskCreationModal from '@/components/tasks/TaskCreationModal';
import DashboardLayout from '@/components/layout/dashboard-layout';

const CreateTaskPage = () => {
  return (
    <DashboardLayout>
      <TaskCreationModal open={false} onClose={() => {}} />
    </DashboardLayout>
  );
};

export default CreateTaskPage;
