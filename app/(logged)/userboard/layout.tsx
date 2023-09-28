export const metadata = {
  title: "Página do usuário",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default async function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
