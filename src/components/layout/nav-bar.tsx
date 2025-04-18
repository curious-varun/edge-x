"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "course", href: "/cources" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="text-xl font-bold text-primary">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Middle - Links */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right - Profile Avatar */}
        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/profile.jpg" alt="Profile" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

