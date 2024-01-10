import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from "./theme-provider"
import { ThemeSwitcher } from "./ThemeSwitcher"

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Addon Example',
  description: 'A webstore addon example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} duration-200`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
