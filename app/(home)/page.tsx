import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Parceiros from "@/components/SECTIONS/Parceiros";
import Container from "@/components/Container";
import Cronograma from "@/components/SECTIONS/Cronograma"
import Retrospec from "@/components/SECTIONS/Retrospec";
import Contact from "@/components/SECTIONS/Contact";
import Title from "@/components/Title";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

const Home = () => {
  return (
    <>
      <Container>
        <PresentationSection />
      </Container>


        <Retrospec/>


        <Cronograma/>

      <Container className="bg-white w-full">
        <Parceiros />
      </Container>

        <Contact/>

    </>
  );
};
export default Home;
