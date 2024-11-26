import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Skynet Silicon",
  description:
    "At Skynet Silicon, we are dedicated to building cutting-edge technology that drives innovation and shapes the future.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Skynet Silicon",
    description:
      "At Skynet Silicon, we are dedicated to building cutting-edge technology that drives innovation and shapes the future.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Skynet Silicon",
    description:
      "At Skynet Silicon, we are dedicated to building cutting-edge technology that drives innovation and shapes the future."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
