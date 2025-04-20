import { AppNavBar } from "@/components/global/app-navbar";



export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <AppNavBar />
      {children}
    </div>
  );
}
