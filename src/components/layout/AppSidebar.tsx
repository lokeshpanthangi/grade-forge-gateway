import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  UserCheck,
  ClipboardList,
  BarChart3,
  Settings,
  GraduationCap
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Professors",
    url: "/professors",
    icon: UserCheck,
  },
  {
    title: "Enrollments",
    url: "/enrollments",
    icon: ClipboardList,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
];

const settingsItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavClass = (itemUrl: string) => {
    const active = isActive(itemUrl);
    return active 
      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-accent-foreground";
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sidebar-accent rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sidebar-accent-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">UniCourse</h2>
                <p className="text-xs text-sidebar-foreground opacity-70">Management System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground opacity-70">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground opacity-70">
            {!collapsed && "System"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}