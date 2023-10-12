import Text from "@/components/Text";
import { MdCalendarToday } from "react-icons/md";

export default function EventCardDate({ date }: { date: string }) {
  return (
    <div className="flex items-start gap-1">
      <MdCalendarToday size={22} fill={"#84d1cf"} />
      <Text className="font-bold uppercase text-base mb-2">27/09</Text>
    </div>
  );
}
