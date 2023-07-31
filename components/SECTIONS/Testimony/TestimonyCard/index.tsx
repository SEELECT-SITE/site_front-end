import Image from "next/image";
import avatar from "@/public/avatar/avatar1.jpg";
import Text from "@/components/Text";
import SmallText from "@/components/SmallText";
import StarsIcons from "@/components/StarsIcons";

interface TestimonyCardProps {
  feedback: string;
  stars: number;
}

export default function TestimonyCard({ feedback, stars }: TestimonyCardProps) {
  return (
    <div className="bg-dark-cian w-full m-auto max-w-sm p-4 xs:p-6 lg:p-8 flex flex-col items-center gap-4 rounded-2xl group lg:flex-row hover:-translate-x-3 hover:-translate-y-3 duration-300 hover:drop-shadow-icon-xl">
      <div className="flex flex-col items-start gap-1 min-w-[250px]">
        {/* <div className="w-1/3 aspect-square overflow-hidden rounded-full min-w-[200px] duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:drop-shadow-icon ease-in delay-100">
          <Image src={avatar} alt={"avatar"} />
        </div> */}
        {/* <Text className="text-xl font-bold lg:text-2xl text-cian-700 ">
          Amanda Testimony
        </Text>
        <SmallText className="-mt-1">Engenheira de Computação</SmallText> */}
        <StarsIcons quantity={stars} />

        <blockquote className="text-white text-sm lg:text-base tracking-wide">
          "{feedback}"
        </blockquote>
      </div>
    </div>
  );
}
