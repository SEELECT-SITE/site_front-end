import { create } from "zustand";

type SelectEventProps = {
  isSelectEventOpen: boolean;
  setIsSelectEventOpen: (update: boolean) => void;
  selectedKit: string;
  setSelectedKit: (update: string) => void;
};

const useSelectEventsState = create<SelectEventProps>((set) => ({
  isSelectEventOpen: false,
  setIsSelectEventOpen: (update: boolean) => {
    set((state) => ({ isSelectEventOpen: update }));
  },
  selectedKit: "gratuito",
  setSelectedKit: (update: string) => {
    set((state) => ({ selectedKit: update }));
  },
}));

export default useSelectEventsState;
