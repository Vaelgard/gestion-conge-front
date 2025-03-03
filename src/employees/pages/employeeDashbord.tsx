import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { EmployeeSidebar } from "./employee-sidebar";
import { DashboardEmployeeNavbar } from "./employee-navbar";

export default function EmployeeDashboard() {
  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row min-h-screen">
       {/*for a Responsive Sidebar */}
        <EmployeeSidebar className="hidden md:flex" />
        <SidebarInset className="flex-1 w-full">
        {/*Navbar*/}
          <header className="flex h-16 w-full md:w-415  items-center border-b px-4">
            <DashboardEmployeeNavbar />
          </header>
          
          <main className="p-4 space-y-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

