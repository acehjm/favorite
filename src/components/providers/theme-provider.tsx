"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { type ReactNode } from "react"

import { useThemeStore } from "@/lib/store/use-theme-store"

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme)

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  )
}
