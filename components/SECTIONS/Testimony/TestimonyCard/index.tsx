import StarsIcons from "@/components/StarsIcons";

interface TestimonyCardProps {
  feedback: string;
  tipo?: string;
  stars: number;
}

export default function TestimonyCard({
  feedback,
  stars,
  tipo,
}: TestimonyCardProps) {
  return (
    <div className="bg-dark-cian w-full m-auto max-w-sm p-4 xs:p-6 lg:p-8 flex flex-col items-end justify-end gap-4 rounded-2xl group hover:-translate-x-3 hover:-translate-y-3 duration-300 hover:drop-shadow-icon-xl peer">
      {/* <div className="flex flex-col items-start gap-1 min-w-[250px]">
        <div className="w-1/3 aspect-square overflow-hidden rounded-full min-w-[200px] duration-200 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:drop-shadow-icon ease-in delay-100">
          <Image src={avatar} alt={"avatar"} />
        </div>
        <Text className="text-xl font-bold lg:text-2xl text-cian-700 ">
          Amanda Testimony
        </Text>
        <SmallText className="-mt-1">Engenheira de Computação</SmallText>
      </div> */}
      <span className="text-sm w-full text-left">
        <span className="p-1 px-2 bg-white text-gray-500 rounded-full">
          {tipo}
        </span>
      </span>
      <blockquote className="text-left text-white text-sm lg:text-base tracking-wide">
        "{feedback}"
      </blockquote>
      <StarsIcons quantity={stars} />
    </div>
  );
}
