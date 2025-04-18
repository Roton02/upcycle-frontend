import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import { DashboardLogo } from "./dashboard-logo";
import { Nav } from "./nav";
import { NavUser } from "./nav-user";
import { UserDashboardNavigation } from "./navigation-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const user = {} //get user data from context to handle dashboard role based access
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        {/* handle user and admin route dynamically here */}

        <Nav items={UserDashboardNavigation} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
