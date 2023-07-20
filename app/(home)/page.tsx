import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Parceiros from "@/components/SECTIONS/Parceiros";
import Container from "@/components/Container";
import Cronograma from "@/components/SECTIONS/Cronograma"
import Retrospec from "@/components/SECTIONS/Retrospec";

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



    </>
  );
};
export default Home;
