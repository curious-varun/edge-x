import { ThemeToggleButton } from "@/components/global/theme-toggle-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center p-4">
        <h1 className="text-5xl font-semibold m-10 bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 via-cyan-400 to-blue-500"> Page </h1>
        <ThemeToggleButton />
      </div>
      <div className="w-full h-full flex items-center justify-center p-4">
        <Link href="/login"> <Button variant="outline"> Login </Button> </Link>
      </div>
    </>
  );
}

