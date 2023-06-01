import { create } from "zustand";

type GlobalProps = {
  menuIsOpen: boolean;
setMenuIsOpen: (update: boolean) => void;
};

const useGlobalState = create<GlobalProps>((set)=>({
    menuIsOpen: false,
    setMenuIsOpen: (update: boolean) =>{
        set((state) => ({ menuIsOpen: update }));
    }
})) 

export default useGlobalState;