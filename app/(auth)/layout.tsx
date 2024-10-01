import { getServerSession } from "next-auth";
import { cafeFont } from "../fonts";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import momento from "@/utils/formatDate";

const inscriptionsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (momento().isBefore(inscriptionsDate)) {
    redirect("./");
  }
  if (!inscriptionsDate) return <></>;
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
