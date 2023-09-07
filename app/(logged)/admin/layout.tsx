import { Session, getServerSession } from "next-auth";
import { cafeFont } from "../../fonts";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(nextAuthOptions);
  // if (!session) {
  //   redirect("./login");
  // }
  // if (session?.user?.role !== "admin") {
  //   redirect("./userboard");
  // }
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
