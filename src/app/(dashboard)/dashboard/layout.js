"use client";
import DashboardNavBar from "@/components/Dashboard/DashboardNavBar";
import DashboardSideBar from "@/components/Dashboard/DashboardSideBar";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = authClient.useSession();
  const user = data?.user;
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] flex font-['Inter']">
      <DashboardSideBar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0">
        <DashboardNavBar
          user={user}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
