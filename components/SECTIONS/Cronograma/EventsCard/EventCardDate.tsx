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
  const startDateObj = momento(dateStart);
  const endDateObj = momento(dateEnd);

  return (
    <div className="flex items-center gap-1 group">
      <MdCalendarToday
        size={18}
        className="group-hover:text-[#3f6593] text-[#3f6593]"
      />
      <Text className=" lg:text-base capitalize">{`${
        startDateObj.format("dddd").replace("-", " ").split(" ")[0]
      } ${startDateObj.format("DD/MM")} de ${startDateObj.format(
        "LT"
      )} às ${endDateObj.format("LT")}`}</Text>
    </div>
  );
}
