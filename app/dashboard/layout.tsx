import React from "react";
import SideNav from "@/app/ui/dashboard/sidenav";

export const experimental_ppr = true;

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col md:flex-row h-screen md:overflow-hidden">
      <div className="flex-none w-full md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:p-12 md:overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
 
export default DashboardLayout;