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
  if (momento().isAfter("11/06/2023")) {
    redirect("/");
  }
  return <>{children}</>;
}
