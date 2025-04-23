import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AdminNavBar } from "@/components/layout/admin-nav-bar";
import { AppSidebar } from "@/components/layout/admin-sidebar";

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

