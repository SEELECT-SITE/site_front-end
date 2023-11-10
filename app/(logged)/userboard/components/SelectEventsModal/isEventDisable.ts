import { EventProps } from "@/pages/api/auth/nextauth";
import momento from "@/utils/formatDate";
import isEventOverlap from "@/utils/isEventOverlap";

export default function isEventDisable(
  event: EventProps,
  eventDates: any,
  selectEvents: any,
  eventsTimePicked: any,
  kit: any,
  numberOfSelectedSpeeches: number,
  numberOfSelectWorkshops: number
) {
  if (momento().isAfter(eventDates[0][0])) {
    return true;
  }
  if (selectEvents.includes(event.id)) return false;

  if (!selectEvents.includes(event.id)) {
    if (isEventOverlap(eventDates, eventsTimePicked)) {
      return true;
    }
    if (event.title.split("$")[1] == "patrocinador") {
      return false;
    }
    if (
      numberOfSelectWorkshops >= kit.workshops &&
      ["workshop", "minicurso"].includes(event.category)
    ) {
      return true;
    }
    if (
      numberOfSelectWorkshops >= kit.workshops &&
      ["workshop", "minicurso"].includes(event.category)
    ) {
      return true;
    }
    if (kit.all_speeches && numberOfSelectedSpeeches >= 1) {
      return true;
    }
  }
  return false;
}
