"use client";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSibdbar";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = authClient.useSession();
  const user = data?.user;
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] flex font-['Inter']">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      ></DashboardSidebar>
      <div className="flex-1 min-w-0">
        <DashboardNavbar
          user={user}
          onMenuToggle={() => setSidebarOpen(true)}
        ></DashboardNavbar>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
