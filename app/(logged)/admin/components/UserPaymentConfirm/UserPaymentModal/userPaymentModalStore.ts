import { Kit } from "@/pages/api/auth/nextauth";
import { create } from "zustand";

type deleteModalProp = {
  isUserPayModalOpen: boolean;
  setIsUserPayModalOpen: (update: boolean) => void;
  userKit: any;
  setUserKit: (update: any) => void;
};

const useUserPaymentStore = create<deleteModalProp>((set) => ({
  isUserPayModalOpen: false,
  setIsUserPayModalOpen: (update: boolean) => {
    set((state) => ({ isUserPayModalOpen: update }));
  },
  userKit: {},
  setUserKit: (update: any) => {
    set((state) => ({ userKit: update }));
  },
}));

export default useUserPaymentStore;
