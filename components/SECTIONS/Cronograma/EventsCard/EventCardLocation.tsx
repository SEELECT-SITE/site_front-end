import Text from "@/components/Text";
import Link from "next/link";
import { MdLocationPin } from "react-icons/md";

export default function EventCardLocation({
  url_location,
  location,
}: {
  url_location: string;
  location: string;
}) {
  return (
    <Text className="capitalize lg:text-base whitespace-nowrap text-ellipsis overflow-hidden flex gap-0.5 group text-slate-300 hover:text-white">
      <span className="group-hover:text-cian-400 text-cian-700">
        <MdLocationPin size={20} />
      </span>
      Local:
      <Link
        title={location}
        href={url_location}
        className="flex items-start gap-0.5 mb-2 group underline underline-offset-1 hover:underline-offset-2 brightness-110"
        target="_blank"
      >
        {location}
      </Link>
    </Text>
  );
}
