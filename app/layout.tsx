"use client";
import useGlobalState from "@/store/menuStore";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";

const cafeFont = localFont({
  src: [
    {
      path: "../public/fonts/LGCafe.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LGCafe_Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/LGCafe_Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/LGCafe_Light_Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/LGCafe_Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

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
  return <SessionProvider>{children}</SessionProvider>;
}
