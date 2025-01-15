"use client";
import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import BottomNav from '@/components/layout/bottom-nav';
import TaskCreationModal from '@/components/tasks/TaskCreationModal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const onOpenCreateTaskModal = () => {
    setIsCreateModalOpen(true);
  };

  const onCloseCreateTaskModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {children}
      </div>
      <BottomNav onOpenCreateTaskModal={onOpenCreateTaskModal} />
      <TaskCreationModal open={isCreateModalOpen} onClose={onCloseCreateTaskModal} />
    </>
  );
}
