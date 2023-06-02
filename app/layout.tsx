"use client";
import useGlobalState from "@/store/menuStore";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { cafeFont } from "./fonts";

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
      <html
        lang="en"
        className={`${menuIsOpen && "overflow-y-hidden"} ${cafeFont.className}`}
      >
        {children}
      </html>
    </SessionProvider>
  );
}
