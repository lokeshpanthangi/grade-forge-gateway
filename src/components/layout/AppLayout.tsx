import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-surface">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-surface-elevated border-b border-border flex items-center px-4 lg:px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-title text-foreground">University Course Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary-foreground">AD</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface-elevated"></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}