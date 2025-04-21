'use client';
import * as React from "react"
import { Flower } from "lucide-react"
import Link from "next/link"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"

export function SidebarHead() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="">
          <Link href="http://school-x.in" target="_blank" className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground || bg-gradient-to-tr from-blue-800 via-cyan-500 to-blue-300">
            <Flower />
          </Link>
          <div className="flex text-xl leading-tight">
            <span className="truncate font-semibold">school-x</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
