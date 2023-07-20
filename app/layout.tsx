"use client";
import useGlobalState from "@/store/menuStore";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuIsOpen } = useGlobalState();
  return (
    <SessionProvider>
      <html lang="en" className={`${menuIsOpen && "overflow-y-hidden"}`}>
        {children}
      </html>
    </SessionProvider>
  );
}
