import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nextProvider } from "@/components/i18n-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "🌴༯𝙎ค૯𝙀𝘿",
  description: "༯𝙎ค૯𝙀𝘿〆ISHU Tool",
  icons: {
    icon: [
      { url: "/favicon/icons8-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon/icons8-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/favicon/icons8-180.png",
    other: [
      {
        rel: "icon",
        url: "/favicon/icons8-192.png",
        sizes: "192x192"
      },
      {
        rel: "icon",
        url: "/favicon/icons8-512.png",
        sizes: "512x512"
      }
    ]
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense>
            <I18nextProvider>{children}</I18nextProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}