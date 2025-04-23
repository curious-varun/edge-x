"use client"
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';

export const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <RecoilRoot>{children}</RecoilRoot>
          <Toaster position="top-right" />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
