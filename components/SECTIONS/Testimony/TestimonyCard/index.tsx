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
