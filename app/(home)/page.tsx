import PresentationSection from "@/components/SECTIONS/PresentationSection";
import Parceiros from "@/components/SECTIONS/Parceiros";
import Retrospectiva from "@/components/SECTIONS/Retrospectiva";
import Cronograma from "@/components/SECTIONS/Cronograma"
import Container from "@/components/Container";

export const metadata = {
  title: "SEELECT",
  description:
    "3ª Semana das Engenharias Elétrica, de Computação e de Telecomunicações",
};

const Home = () => {
  return (

      <main className="">
        <Container>
          <PresentationSection /> 
        </Container>
        
        <Container className="p-0">
        <Retrospectiva/>
        </Container>

        <Container>
        <Cronograma/>
        </Container>

        <Container>
        <Parceiros />
        </Container>

      </main>

  );
};
export default Home;
