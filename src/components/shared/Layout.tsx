import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@components/shared/Navbar';
import { Footer } from '@components/shared/Footer';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <div className="flex flex-col space-y-8 lg:space-y-12">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}; 