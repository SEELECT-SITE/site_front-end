"use client";
import Footer from "@/components/Footer";
import { cafeFont } from "../fonts";
import HomeHeader from "@/components/HomeHeader";
import useGlobalState from "@/stores/menuStore";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuIsOpen } = useGlobalState();
  return (
    <>
      <body
        className={`bg-white w-full relative min-h-screen overflow-x-hidden ${
          cafeFont.className
        } ${menuIsOpen && "overflow-y-hidden"}`}
      >
        <HomeHeader />
        <main className="text-white">{children}</main>
        <Footer />
      </body>
    </>
  );
}
