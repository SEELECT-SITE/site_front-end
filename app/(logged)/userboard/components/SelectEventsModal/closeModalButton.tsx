import React from "react";
import { MdClose } from "react-icons/md";
import useSelectEventsState from "./selectEventsStore";

const CloseModalButton = () => {
  const { setIsSelectEventOpen } = useSelectEventsState();
  return (
    <div className="Container">
      <button
        onClick={() => setIsSelectEventOpen(false)}
        className="rounded-lg border border-slate-900 p-1 text-red-600 hover:bg-slate-900 hover:text-red-400 shadow-md items-center flex gap-1 float-right"
      >
        Voltar
        <MdClose size={20} />
      </button>
    </div>
  );
};

export default CloseModalButton;
