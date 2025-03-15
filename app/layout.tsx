import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monkeytype",
  description: "clone to monkeytype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${spaceMono.className} antialiased flex items-center justify-center flex-col bg-bg-color min-h-screen  text-text-color overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
