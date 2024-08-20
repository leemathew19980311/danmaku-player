import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Analytics } from "@vercel/analytics/react";
export const metadata: Metadata = {
  title: "Danmaku Player",
  description: "",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <NextUIProvider className="h-screen w-screen">
          {children}
        </NextUIProvider>
        <Analytics />
      </body>
    </html>
  );
}
