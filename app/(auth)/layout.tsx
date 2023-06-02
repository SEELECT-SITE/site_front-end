export const metadata = {
  title: "Login",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body>{children}</body>;
}
