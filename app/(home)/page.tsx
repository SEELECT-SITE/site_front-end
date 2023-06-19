import PresentationSection from "@/components/PresentationSection";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-between text-l-cian">
      <PresentationSection />
    </main>
  );
};
export default Home;
