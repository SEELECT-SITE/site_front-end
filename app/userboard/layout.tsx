'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });
  return (
    <body className={`bg-white relative min-w-screen overflow-x-hidden `}>
      <header>
        <div>testeando login</div>
      </header>
      
      {status!=="loading" ? children:<>carregando....</>}
    </body>
  );
}
