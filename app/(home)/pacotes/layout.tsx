import momento from "@/utils/formatDate";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Pacotes",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};
const inscriptionsDate = process.env.NEXT_PUBLIC_OPEN_INSCRIPTIONS_DATE;

export default function PacotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (momento().isBefore(inscriptionsDate)) {
    redirect("./");
  }
  if (!inscriptionsDate) return <></>;
  return <>{children}</>;
}
