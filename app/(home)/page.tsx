import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Parceiros from "@/components/SECTIONS/Parceiros";
import Retrospectiva from "@/components/SECTIONS/Retrospectiva";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

const Home = () => {
  return (
    <main className="flex flex-col px-6 items-center justify-between text-l-cian">
      <PresentationSection />
      <Retrospectiva/>
      <Parceiros />
    </main>
  );
};
export default Home;
