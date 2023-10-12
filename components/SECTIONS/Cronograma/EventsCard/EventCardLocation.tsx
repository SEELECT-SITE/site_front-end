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
    <Link
      title={location}
      href={url_location}
      className="flex items-start gap-1 "
      target="_blank"
    >
      <span>
        <MdLocationPin size={22} fill={"#84d1cf"} />
      </span>
      <Text className="font-bold uppercase lg:text-base mb-2 text-ellipsis">
        {location}
      </Text>
    </Link>
  );
}
