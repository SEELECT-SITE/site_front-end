import UserboardHeader from "./components/UserboardHeader";

export const metadata = {
  title: "Página do usuário",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function UserboadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserboardHeader />
      {children}
    </>
  );
}
