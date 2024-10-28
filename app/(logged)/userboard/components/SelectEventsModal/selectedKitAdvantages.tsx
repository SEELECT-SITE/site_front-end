import React from "react";
import Text from "@/components/Text";
import { AlertCircle } from "lucide-react";

interface Kit {
  id: number;
  model: string;
  price: number;
  all_speeches: true;
  workshops: number;
  bucks_coup: boolean;
}
const workshopLimit = process.env.NEXT_PUBLIC_WORKSHOP_LIMIT;

const SelectedKitAdvantages = ({ kit }: { kit: Kit }) => {
  return (
    <div className="pl-3 my-6">
      <Text className="font-bold">
        Você tem direito a
        {[
          " todas as palestras",
          workshopLimit ? ` e ${workshopLimit} Minicursos/Workshops.` : "",
        ]}
      </Text>
      <Text className="pt-4 flex">
        <AlertCircle className="mr-1 text-orange-600" />
        Os eventos que tem sobreposição de horário ou que já ficaram lotados não
        poderão ser selecionados.
      </Text>
    </div>
  );
};

export default SelectedKitAdvantages;
