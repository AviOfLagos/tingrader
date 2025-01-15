import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ["latin"] })

import { ThemeProvider } from "@/components/providers/theme-provider"
import "@/app/globals.css"

import { ClientLayoutWrapper } from "@/components/Landing/ClientLayoutWrapper"

export const metadata = {
  title: 'Tingrader - Modern Assignment Grading Platform',
  description: 'Grade assignments faster and more efficiently with our Tinder-style grading interface.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} dark`}
    >
      <body className="min-h-screen m-4 md:m-0 bg-background text-foreground antialiased ">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
