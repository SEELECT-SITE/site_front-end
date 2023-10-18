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
    <div className="py-3">
      <b>Descrição</b>
      <Text className={twMerge("font-thin", className)}>{description}</Text>
    </div>
  );
}
