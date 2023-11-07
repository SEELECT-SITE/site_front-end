import Text from "@/components/Text";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function EventCardHoster({ hoster }: { hoster: string }) {
  return (
    <Text className="capitalize lg:text-base group text-slate-300 hover:text-white flex items-start gap-0.5">
      <span className="group-hover:text-cian-400 text-cian-700">
        <FaUserCircle size={20} />
      </span>
      {`Facilitador: ${hoster}`}
    </Text>
  );
}
