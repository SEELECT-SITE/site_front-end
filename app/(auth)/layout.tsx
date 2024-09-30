import { getServerSession } from "next-auth";
import { cafeFont } from "../fonts";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  if (session?.user) {
    if (session?.user?.role == "admin") {
      redirect("/admin");
    } else {
      redirect("/userboard");
    }
  }
  return (
    <body className={`bg-white w-full ${cafeFont.className}`}>
      <Toaster />
      {children}
    </body>
  );
}
