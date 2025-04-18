"use client"
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <>

      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>

    </>
  );
}
