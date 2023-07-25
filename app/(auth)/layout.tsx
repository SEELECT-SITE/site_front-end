import { cafeFont } from "../fonts";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body
        className={`bg-white w-full min-h-screen overflow-x-hidden ${cafeFont.className}`}
      >
        {children}
      </body>
    </>
  );
}
