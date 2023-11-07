import { create } from "zustand";

type SelectEventProps = {
  isPayKitModalOpen: boolean;
  setIsPayKitModalOpen: (update: boolean) => void;
  selectedKit: string;
  setSelectedKit: (update: string) => void;
};

const usePayKitState = create<SelectEventProps>((set) => ({
  isPayKitModalOpen: false,
  setIsPayKitModalOpen: (update: boolean) => {
    set((state) => ({ isPayKitModalOpen: update }));
  },
  selectedKit: "gratuito",
  setSelectedKit: (update: string) => {
    set((state) => ({ selectedKit: update }));
  },
}));

export default usePayKitState;
