import { create } from "zustand";

type deleteModalProp = {
  isUserPayModalOpen: boolean;
  setIsUserPayModalOpen: (update: boolean) => void;
  userID: number;
  setUserID: (update: number) => void;
  userKitID: number;
  setUserKitID: (update: number) => void;
  userKitModelPrice: number;
  setUserKitModelPrice: (update: number) => void;
};

const useUserPaymentStore = create<deleteModalProp>((set) => ({
  isUserPayModalOpen: false,
  setIsUserPayModalOpen: (update: boolean) => {
    set((state) => ({ isUserPayModalOpen: update }));
  },
  userID: 0,
  setUserID: (update: number) => {
    set((state) => ({ userID: update }));
  },
  userKitID: 0,
  setUserKitID: (update: number) => {
    set((state) => ({ userKitID: update }));
  },
  userKitModelPrice: 0,
  setUserKitModelPrice: (update: number) => {
    set((state) => ({ userKitModelPrice: update }));
  },
}));

export default useUserPaymentStore;
