"use client";
import Footer from "@/components/Footer";
import { cafeFont } from "../fonts";
import HomeHeader from "@/components/HomeHeader";
import NoticeHeader from "@/components/NoticeHeader";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`bg-white w-full relative min-h-screen overflow-x-hidden ${cafeFont.className}`}
    >
      <HomeHeader />
      <main className="text-white overflow-hidden">{children}</main>
      <Footer />
    </body>
  );
}
