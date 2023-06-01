"use client";
import Seelect_icon from "/public/icone_seelect.webp";
import useGlobalState from "@/store/menuStore";

export const metadata = {
  title: "Login",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
