import Text from "@/components/Text";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function EventCardHoster({
  hoster,
  link,
}: {
  hoster: string;
  link?: string;
}) {
  return (
    <Text className="capitalize lg:text-base group flex gap-0.5 text-slate-300 hover:text-white">
      <span className="group-hover:text-cian-400 text-cian-700">
        <FaUserCircle size={20} />
      </span>
      Facilitador:
      <Link
        title={"Apresentação de " + hoster}
        href={link || ""}
        className="flex items-start gap-0.5 mb-2 group underline underline-offset-1 group-hover:underline-offset-2 brightness-110 "
        target="_blank"
      >
        {hoster}
      </Link>
    </Text>
  );
}
