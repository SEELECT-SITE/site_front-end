"use client";
import useGlobalState from "@/stores/menuStore";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuIsOpen } = useGlobalState();
  return (
    <html
      lang="en"
      className={`${menuIsOpen ? "overflow-y-hidden" : "overflow-y-auto"}`}
    >
      <SessionProvider basePath="/api/auth">{children}</SessionProvider>
    </html>
  );
}
