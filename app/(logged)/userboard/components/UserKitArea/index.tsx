import Text from "@/components/Text";
import { User } from "next-auth";
import PayKitModal from "../PayKitModal";
import usePayKitState from "../PayKitModal/PayKitModalStore";
import SmallText from "@/components/SmallText";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import useUserboardState from "../userboardStore/PayKitModalStore";

export default function UserKitArea({ user }: { user: User }) {
  const { isPayKitModalOpen, setIsPayKitModalOpen } = usePayKitState();
  const { kitsValues } = useUserboardState();
  return (
    <div className="bg-slate-800 w-auto p-4 lg:p-8 rounded-md my-4 border-2 border-slate-700 flex flex-wrap justify-between gap-8">
      <div className="lg:max-w-md">
        <Text>
          Você selecionou o{" "}
          <b>
            {kitsValues != "" && kitsValues[user?.kit?.model! - 1 ?? 1].model}
          </b>
        </Text>
        <Text className="mt-4">
          Você tem direito a{" "}
          {[
            user.kit?.model_detail.all_speeches
              ? "todas as Palestras, "
              : "palestra patrocinadas + 1 palestra",
            user.kit?.model_detail.workshops
              ? `${user.kit?.model_detail.workshops} minicursos/workshops `
              : "",
            user.kit?.model_detail.bucks_coup
              ? "e um copo Buck's Exclusivo"
              : "",
          ]}
        </Text>
      </div>

      {!user?.kit?.is_payed && user.kit?.model != 1 && (
        <div className="lg:max-w-md">
          <div className="mb-2 lg:mb-4 flex justify-between flex-wrap gap-2 items-center rounded-md">
            <Text className="flex items-center gap-1">
              <RiMoneyDollarCircleLine size={22} className="text-red-500" />
              Pagamento Pendente
            </Text>
            <Button
              className="w-full lg:w-auto"
              onClick={(e) => setIsPayKitModalOpen(true)}
            >
              Fazer pagamento
            </Button>
          </div>
          <SmallText className="flex items-start gap-1 text-yellow-400">
            Se o pagamento já foi efetuado, ignore essa mensagem. O pagamento
            será confirmado em até dois dias uteis.
          </SmallText>
          {isPayKitModalOpen && <PayKitModal user={user} />}
        </div>
      )}
    </div>
  );
}
