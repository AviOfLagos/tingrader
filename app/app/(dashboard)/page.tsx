import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Home',
  description: 'Welcome to the dashboard!',
};

export default function DashboardHomePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Home</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
