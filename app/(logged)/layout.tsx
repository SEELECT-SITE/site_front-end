import { getServerSession } from "next-auth";
import { cafeFont } from "../fonts";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

export default async function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    </body>
  );
}
