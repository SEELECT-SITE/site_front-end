import { getServerSession } from "next-auth";
import { cafeFont } from "../../fonts";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

export default async function UserboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(nextAuthOptions);
  // if (!session) {
  //   redirect("./login");
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
