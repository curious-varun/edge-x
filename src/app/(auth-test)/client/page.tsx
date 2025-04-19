"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";



export default function ClientPage() {
  const session = useSession();
  return (
    <>
      {JSON.stringify(session)}
      <Button onClick={() => signOut()}>
        signOut
      </Button>
    </>
  )
};
