import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  if (session?.user) {
    if (session?.user?.role == "admin") {
      redirect("/admin");
    }
    if (session?.user?.role == "user") {
      redirect("/userboard");
    }
  }
  return <>{children}</>;
}
