import Text from "@/components/Text";
import Link from "next/link";
import { BiRadioCircle } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

export default function EventCardDescription({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <div className="py-3 group">
      <b>Descrição</b>
      <Text
        className={twMerge(
          "font-thin w-full whitespace-pre-wrap line-clamp-2 group-hover:line-clamp-none",
          className
        )}
      >
        {description}
      </Text>
    </div>
  );
}
