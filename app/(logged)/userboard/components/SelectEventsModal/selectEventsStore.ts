import { create } from "zustand";

type SelectEventProps = {
  isSelectEventOpen: boolean;
  setIsSelectEventOpen: (update: boolean) => void;
  selectedKit: any;
  setSelectedKit: (update: any) => void;
  dayOfWeek: string;
  setDayOfWeek: (update: string) => void;
};

const useSelectEventsState = create<SelectEventProps>((set) => ({
  isSelectEventOpen: false,
  setIsSelectEventOpen: (update: boolean) => {
    set((state) => ({ isSelectEventOpen: update }));
  },
  selectedKit: {},
  setSelectedKit: (update: any) => {
    set((state) => ({ selectedKit: update }));
  },
  dayOfWeek: "allDays",
  setDayOfWeek: (update: string) => {
    set((state) => ({ dayOfWeek: update }));
  },
}));

export default useSelectEventsState;
