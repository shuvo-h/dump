"use client";
import { AppSidebar } from "@/components/shared/bars/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useState } from "react";


type TDashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: TDashboardLayoutProps) => {


  return (
    <>
        <nav className="sticky top-0 left-0 right-0 z-20 h-8 bg-gray-400">
            <h2 className="text-black">Top Bar</h2>
        </nav>
        <div className="relative">
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    {children}
                    <footer>Dashboard Footer part</footer>
                </main>
            </SidebarProvider>
        </div>
    </>
  );
};

export default DashboardLayout;
