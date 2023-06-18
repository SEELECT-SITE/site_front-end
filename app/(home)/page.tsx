import PresentationSection from "@/components/SECTIONS/PresentationSection";
import { cookies } from "next/headers";
import Parceiros from "@/components/SECTIONS/Parceiros"



const Home = () => {
  console.log(cookies().get("theme"));
  return (
    <main className="flex flex-col px-6 items-center justify-between text-l-cian">
      <PresentationSection />
      <Parceiros/>
    </main>
  );
};
export default Home;
