import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import logo_seelect from "@/public/icone_seelect-light-cian.webp";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/userboard");
  }
  return (
    <body className="bg-white">
      <header>
        <div className="w-full bg-m-dark z-50 m-auto flex justify-between p-4 items-center">
          <Link href="#">
            <Image
              src={logo_seelect}
              alt="icone seelect"
              width={52}
              className="hover:drop-shadow-icon-sm hover:-translate-x-1 hover:-translate-y-1 duration-150"
            />
          </Link>
        </div>
      </header>
      {children}
    </body>
  );
}
