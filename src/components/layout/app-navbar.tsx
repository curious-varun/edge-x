"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { LoginForm } from "@/features/auth/componenets/login-form";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export function AppNavBar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "courses",
      link: "/courses",
    },

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar className="" key={"nav-bar"}>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex gap-5 item-center justify-center ">
          <NavbarButton variant="gradient" className="tex-sm rounded-full" href="/my-courses">
            My courses
          </NavbarButton>
          <LoginForm asModal />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex gap-4 item-center justify-center ">
            <LoginForm asModal />
          </div>
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}

        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
