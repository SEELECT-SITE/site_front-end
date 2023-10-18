import { DJANGO_URL } from "@/utils/consts";
import axios from "axios";
import { create } from "zustand";

type UserboardProps = {
  kitsValues: any;
  setKitsValues: (update: any) => void;
  getKitsValues: () => void;
};

const useUserboardState = create<UserboardProps>((set) => ({
  kitsValues: "",
  setKitsValues: (update: any) => {
    set((state) => ({ kitsValues: update }));
  },
  getKitsValues: async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "ngrok-skip-browser-warning": "true",
    };
    try {
      const { data } = await axios.get(`${DJANGO_URL}api/kits/models/`, {
        headers,
      });
      set((state) => ({ kitsValues: data.results }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useUserboardState;
