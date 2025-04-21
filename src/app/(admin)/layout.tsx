import { AppSidebar } from "@/features/admin/components/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AdminNavBar } from "@/features/admin/components/admin-nav-bar";


export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminNavBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

