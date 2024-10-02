import { KitToTable } from "@/pages/api/auth/nextauth";
import { create } from "zustand";

type deleteKitModalProps = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (update: boolean) => void;
  kitDelete: KitToTable | null;
  setKitDelete: (update: KitToTable) => void;
};

const useKitDeleteModalState = create<deleteKitModalProps>((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (update: boolean) => {
    set((state) => ({ isDeleteModalOpen: update }));
  },
  kitDelete: null,
  setKitDelete: (update: KitToTable) => {
    set((state) => ({ kitDelete: update }));
  },
}));

export default useKitDeleteModalState;
