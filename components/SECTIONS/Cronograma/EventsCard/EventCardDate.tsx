import Text from "@/components/Text";
import momento from "@/utils/formatDate";

import { MdCalendarToday } from "react-icons/md";

export default function EventCardDate({
  dateStart,
  dateEnd,
}: {
  dateStart: string;
  dateEnd: string;
}) {
  const dataStart = momento(dateStart);
  const dataEnd = momento(dateEnd);

  return (
    <div className="flex items-center gap-1 group">
      <MdCalendarToday
        size={18}
        className="group-hover:text-cian-400 text-cian-700"
      />
      <Text className=" lg:text-base capitalize">{`${
        dataStart.format("dddd").replace("-", " ").split(" ")[0]
      } ${dataStart.format("DD/MM")} de ${dataStart.format(
        "LT"
      )} às ${dataEnd.format("LT")}`}</Text>
    </div>
  );
}
