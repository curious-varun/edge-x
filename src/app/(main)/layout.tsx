import { AppNavBar } from "@/components/layout/app-navbar";



export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <AppNavBar />
      {children}
    </div>
  );
}
