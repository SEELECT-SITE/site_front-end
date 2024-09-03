import { create } from "zustand";

type userFormsProps = {
  isUserFormsOpen: boolean;
  setIsUserFormsOpen: (update: boolean) => void;
};

const useUserForms = create<userFormsProps>((set) => ({
  isUserFormsOpen: false,
  setIsUserFormsOpen: (update: boolean) => {
    set((state) => ({ isUserFormsOpen: update }));
  },
}));

export default useUserForms;
