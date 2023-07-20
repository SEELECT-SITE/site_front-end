"use client";
import useGlobalState from "@/stores/menuStore";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuIsOpen } = useGlobalState();
  return (
    <html lang="en" className={`max-w-xl ${menuIsOpen && "overflow-y-hidden"}`}>
      {children}
    </html>
  );
}
