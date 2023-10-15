import Text from "@/components/Text";
import { numberToDayWeek } from "@/utils/formatDate";
import { MdCalendarToday } from "react-icons/md";

export default function EventCardDate({ date }: { date: number | string }) {
  const objDate = new Date(date);
  return (
    <div className="flex items-center gap-1 group">
      <MdCalendarToday
        size={20}
        className="group-hover:text-cian-400 text-cian-700"
      />
      <Text className="text-base leading-none">
        {`${numberToDayWeek(objDate.getDay())} ${objDate.getDate()}/${
          objDate.getMonth() + 1
        } às ${
          objDate.getHours() < 9 ? "0" + objDate.getHours() : objDate.getHours()
        }:${
          objDate.getMinutes() < 9
            ? "0" + objDate.getMinutes()
            : objDate.getMinutes()
        }`}
      </Text>
    </div>
  );
}
