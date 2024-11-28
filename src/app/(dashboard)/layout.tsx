"use client";
import { AppSidebar } from "@/components/shared/bars/app-sidebar";
import Topbar from "@/components/shared/bars/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";


type TDashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: TDashboardLayoutProps) => {


  return (
    <>
        <Topbar />
        <div className="relative">
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <main className="w-full">

                    {children}
                    <footer>Dashboard Footer part</footer>
                </main>
            </SidebarProvider>
        </div>
    </>
  );
};

export default DashboardLayout;
