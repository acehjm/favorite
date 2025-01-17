import { type Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Favorite - Your Personal Bookmark Manager",
  description: "A modern bookmark manager built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
