"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/nav/navbar";
import BottomNav from "@/components/layout/nav/bottom-nav";
import TaskCreationModal from "@/components/tasks/TaskCreationModal";

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
      <div className="dashboard-container">{children}</div>
      <BottomNav onOpenCreateTaskModal={onOpenCreateTaskModal} />
      <TaskCreationModal
        open={isCreateModalOpen}
        onClose={onCloseCreateTaskModal}
      />
    </>
  );
}
