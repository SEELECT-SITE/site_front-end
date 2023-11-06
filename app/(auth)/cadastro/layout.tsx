import momento from "@/utils/formatDate";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Cadastro",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
