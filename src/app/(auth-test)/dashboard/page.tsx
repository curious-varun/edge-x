"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";


export default function Page() {
  return (

    <div className="w-full h-full flex items-center justify-center p-4">
      <Button onClick={() => signOut()}>
        signOut
      </Button>

      <h1 className="text-5xl font-semibold m-10 bg-clip-text text-transparent bg-gradient-to-tr from-blue-700 via-cyan-400 to-blue-500"> Page </h1>
    </div>
  )
}
