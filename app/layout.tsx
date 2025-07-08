import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Dume.AI Assignment",
  description: "A Next.js application for Dume.AI assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
