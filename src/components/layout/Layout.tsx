
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* Hide sidebar on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-auto">
          <div className="container py-6 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
