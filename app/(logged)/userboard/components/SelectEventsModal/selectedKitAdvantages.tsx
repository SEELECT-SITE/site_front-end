import React, { useRef } from "react";
import Text from "@/components/Text";
import useUserboardState from "../userboardStore/PayKitModalStore";
import useSelectEventsState from "./selectEventsStore";

interface Kit {
  id: number;
  model: string;
  price: number;
  all_speeches: boolean;
  workshops: number;
  bucks_coup: boolean;
}

const SelectedKitAdvantages = ({ kit }: { kit: Kit }) => {
  return (
    <div className="p-2 shadow-md border border-slate-300 rounded-md flex max-w-sm my-2 flex-col">
      <Text className="font-bold">Você tem direito a:</Text>
      <ul>
        {[
          kit.all_speeches
            ? "Todas as Palestras"
            : "Palestras patrocinadas + 1 palestra",
          kit.workshops ? `${kit.workshops} Minicursos/Workshop` : "",
          kit.bucks_coup ? "Um copo Buck's Exclusivo" : "",
        ].map((elem) => (
          <li
            key={elem}
            className="flex border-l border-slate-800 ml-2 pl-1 my-2"
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedKitAdvantages;
