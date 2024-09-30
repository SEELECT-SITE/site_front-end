import { KitToTable } from "@/pages/api/auth/nextauth";
import { create } from "zustand";

type deleteModalProp = {
  isUserPayModalOpen: boolean;
  setIsUserPayModalOpen: (update: boolean) => void;
  userKit: KitToTable | null;
  setUserKit: (update: KitToTable) => void;
};

const useUserPaymentStore = create<deleteModalProp>((set) => ({
  isUserPayModalOpen: false,
  setIsUserPayModalOpen: (update: boolean) => {
    set((state) => ({ isUserPayModalOpen: update }));
  },
  userKit: null,
  setUserKit: (update: KitToTable) => {
    set((state) => ({ userKit: update }));
  },
}));

export default useUserPaymentStore;
