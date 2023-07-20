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
        className={`bg-dark relative min-w-screen overflow-x-hidden ${cafeFont.className}`}
      >
        <HomeHeader />
        <main className="flex flex-col items-center justify-between text-white">
          {children}
        </main>
      </body>
    </>
  );
}
