"use client";
import Footer from "@/components/Footer";
import { cafeFont } from "../fonts";
import HomeHeader from "@/components/HomeHeader";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body
        className={`bg-white w-full relative min-h-screen overflow-x-hidden ${cafeFont.className}`}
      >
        <HomeHeader />
        <main className="text-white">{children}</main>
        <Footer />
      </body>
    </>
  );
}
