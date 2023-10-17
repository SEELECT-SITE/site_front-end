import Text from "@/components/Text";
import { numberToDayWeek } from "@/utils/formatDate";
import { MdCalendarToday } from "react-icons/md";

export default function EventCardDate({
  dateStart,
  dateEnd,
}: {
  dateStart: number | string;
  dateEnd: number | string;
}) {
  const objDateStart = new Date(dateStart);
  const objDateEnd = new Date(dateEnd);
  return (
    <div className="flex items-center gap-1 group">
      <MdCalendarToday
        size={18}
        className="group-hover:text-cian-400 text-cian-700"
      />
      <Text className=" lg:text-base">
        {`${numberToDayWeek(objDateStart.getDay())} ${objDateStart.getDate()}/${
          objDateStart.getMonth() + 1
        } de ${
          objDateStart.getHours() < 9
            ? "0" + objDateStart.getHours()
            : objDateStart.getHours()
        }:${
          objDateEnd.getMinutes() < 9
            ? "0" + objDateEnd.getMinutes()
            : objDateEnd.getMinutes()
        } às ${
          objDateEnd.getHours() < 9
            ? "0" + objDateEnd.getHours()
            : objDateEnd.getHours()
        }:${
          objDateEnd.getMinutes() < 9
            ? "0" + objDateEnd.getMinutes()
            : objDateEnd.getMinutes()
        }`}
      </Text>
    </div>
  );
}
