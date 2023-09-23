import Container from "@/components/Container";
import Text from "@/components/Text";
import Title from "@/components/Title";

const EventosSection = () => {
  return (
    <section>
      <Container className="text-dark">
        <Title className="text-cian-700 text-xl mb-10">PRE-SEELECT</Title>
        <div className="w-full h-40 border border-slate-400 rounded-lg hover:shadow-lg p-4">
          <Text>Hello</Text>
        </div>
      </Container>
    </section>
  );
};

export default EventosSection;
