"use client";
import React, { useState } from 'react';
import Navbar from './navbar';
import BottomNav from './bottom-nav';
import TaskCreationModal from '@/components/tasks/TaskCreationModal';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const onOpenCreateTaskModal = () => {
    setIsCreateModalOpen(true);
  };

  const onCloseCreateTaskModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <BottomNav onOpenCreateTaskModal={onOpenCreateTaskModal} />
      <TaskCreationModal open={isCreateModalOpen} onClose={onCloseCreateTaskModal} />
    </div>
  );
};

export default DashboardLayout;

