import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-[#070B14] text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Right Section: Header + Main View */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#F8FAFC] dark:bg-[#090D16]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

