import { create } from "zustand";

type alertAdminProps = {
  isAlertAdminOpen: boolean;
  setIsAlertAdminOpen: (update: boolean) => void;
  alertMsg: string;
  setAlertMsg: (update: string) => void;
};

const useAlertAdminState = create<alertAdminProps>((set) => ({
  isAlertAdminOpen: false,
  setIsAlertAdminOpen: (update: boolean) => {
    set((state) => ({ isAlertAdminOpen: update }));
  },
  alertMsg: "",
  setAlertMsg: (update: string) => {
    set((state) => ({ alertMsg: update }));
  },
}));

export default useAlertAdminState;
