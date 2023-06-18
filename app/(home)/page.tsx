import PresentationSection from "@/components/PresentationSection";
import { cookies } from "next/headers";

const Home = () => {
  console.log(cookies().get("theme"));
  return (
    <main className="flex flex-col items-center justify-between text-l-cian">
      <PresentationSection />
    </main>
  );
};
export default Home;
