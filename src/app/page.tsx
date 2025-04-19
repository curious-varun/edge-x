import { ThemeToggleButton } from "@/components/global/theme-toggle-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";

export default async function Page() {
  const session = (await auth()) as Session;

  return (
    <>
      home page
    </>
  );
}

