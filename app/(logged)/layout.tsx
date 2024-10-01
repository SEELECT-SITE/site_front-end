import { getServerSession } from "next-auth";
import { cafeFont } from "../fonts";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import momento from "@/utils/formatDate";

const inscriptionsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

export default async function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (momento().isBefore(inscriptionsDate)) {
    redirect("./");
  }
  if (!inscriptionsDate) return <></>;

  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("./login");
  }
  return (
    <body
      className={`bg-dark text-white w-full min-h-screen overflow-x-hidden ${cafeFont.className}`}
    >
      {children}
      <Footer />
      <Toaster />
    </body>
  );
}
