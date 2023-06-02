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
  return (
    <body className={`bg-white relative min-w-screen overflow-x-hidden `}>
      {children}
    </body>
  );
}
