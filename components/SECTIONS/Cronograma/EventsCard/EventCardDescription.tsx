import Text from "@/components/Text";
import Link from "next/link";
import { BiRadioCircle } from "react-icons/bi";

export default function EventCardDescription({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <Text className="capitalize text-ellipsis flex gap-0.5 py-3 ">
      {description}
    </Text>
  );
}
