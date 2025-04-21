"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarHead } from "./sidebar/sidebar-head";
import { SidebarFoot } from "./sidebar/sidebar-foot";
import { SideBarNavigation } from "./sidebar/sidebar-navigation";
import { sidebarNavigationSection } from "@/constants";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="floating">
      < SidebarRail />
      <SidebarHeader>
        <SidebarHead />
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full">
          <SideBarNavigation data={sidebarNavigationSection} />
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <SidebarFoot />
      </SidebarFooter>
    </Sidebar >
  )
}
