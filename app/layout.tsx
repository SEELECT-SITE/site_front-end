"use client";
import useGlobalState from "@/store/menuStore";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const { menuIsOpen } = useGlobalState();
  return (
    <SessionProvider>
      <html lang="en" className={`${menuIsOpen && "overflow-y-hidden"}`}>
        <body className={`bg-white relative min-w-screen overflow-x-hidden `}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
