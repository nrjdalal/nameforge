import { cn } from "@workspace/ui/lib/utils"

import "@workspace/ui/globals.css"
import { Geist, Geist_Mono, Instrument_Sans, Playfair_Display, Roboto_Flex } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans" })

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  axes: ["wdth", "slnt", "XTRA", "YOPQ", "YTLC", "YTUC", "YTAS", "YTDE", "YTFI"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontSerif.variable,
        instrumentSans.variable,
        robotoFlex.variable,
        "font-sans",
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
