import { useState } from "react";
import { Outlet } from "react-router";
import { LaundrySidebar } from "./LaundrySidebar";
import { LaundryHeader } from "./LaundryHeader";

export function LaundryAdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <LaundrySidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((c) => !c)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <LaundryHeader notificationCount={3} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
