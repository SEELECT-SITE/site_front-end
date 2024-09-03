import { create } from "zustand";

type deleteModalProp = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (update: boolean) => void;
  eventDeleteID: number;
  setEventDeleteID: (update: number) => void;
  eventTitle: string;
  setEventTitle: (update: string) => void;
};

const useDeleteModalState = create<deleteModalProp>((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (update: boolean) => {
    set((state) => ({ isDeleteModalOpen: update }));
  },
  eventDeleteID: 0,
  setEventDeleteID: (update: number) => {
    set((state) => ({ eventDeleteID: update }));
  },
  eventTitle: "",
  setEventTitle: (update: string) => {
    set((state) => ({ eventTitle: update }));
  },
}));

export default useDeleteModalState;
