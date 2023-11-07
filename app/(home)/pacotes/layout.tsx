import momento from "@/utils/formatDate";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Pacotes",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function PacotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (momento().isAfter("11/06/2023")) {
    redirect("/");
  }
  return <>{children}</>;
}
