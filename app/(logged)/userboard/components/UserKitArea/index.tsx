import Text from "@/components/Text";
import { User } from "next-auth";
import FloatButton from "@/components/FloatButton";
import PayKitModal from "../PayKitModal";
import usePayKitState from "../PayKitModal/PayKitModalStore";
import SmallText from "@/components/SmallText";
import { LuAlertCircle } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Title from "@/components/Title";
import Button from "@/components/Button";
import useUserboardState from "../userboardStore/PayKitModalStore";
import KitsAvaliable from "../KitsAvaliabe";
import { useState } from "react";
import momento from "@/utils/formatDate";

export default function UserKitArea({ user }: { user: User }) {
  const { isPayKitModalOpen, setIsPayKitModalOpen } = usePayKitState();
  const { kitsValues } = useUserboardState();
  const [isChooseKitOpen, setIsChooseKitOpen] = useState<boolean>(false);
  return (
    <>
      <Title className="border-l-2 border-cian-400 pl-2">
        {kitsValues != "" && kitsValues[user?.kit?.model! - 1 ?? 1].model}
      </Title>

      <>
        <FloatButton
          className="p-1"
          shadowClassname="my-1"
          onClick={(e) => {
            setIsChooseKitOpen(!isChooseKitOpen);
          }}
        >
          Trocar de Kit
        </FloatButton>
        {isChooseKitOpen && <KitsAvaliable />}
      </>
      <Text className="font-bold mt-4">Você tem direito a:</Text>
      <ul className="mb-4">
        {[
          user.kit?.model_detail.all_speeches
            ? "Todas as Palestras"
            : "Palestra patrocinadas + 1 palestra",
          user.kit?.model_detail.workshops
            ? `${user.kit?.model_detail.workshops} Minicursos/Workshop`
            : "",
          user.kit?.model_detail.bucks_coup ? "Um copo Buck's Exclusivo" : "",
        ].map((elem) => {
          return <li className="flex">{elem}</li>;
        })}
      </ul>
      {!user?.kit?.is_payed && user.kit?.model != 1 && (
        <div className="pb-8">
          <div className="my-4 flex justify-between items-center p-3 bg-slate-800 rounded-md max-w-md ">
            <Text className="flex items-center  text-red-400 text-sm">
              <RiMoneyDollarCircleLine size={22} />
              Pagamento Pendente
            </Text>
            <Button
              className="ring-1 bg-white text-dark text-sm ring-white p-1.5 hover:ring-slate-500 hover:bg-slate-200"
              onClick={(e) => setIsPayKitModalOpen(true)}
            >
              Efetuar pagamento
            </Button>
          </div>
          <SmallText className="flex items-start gap-1 text-yellow-300">
            <span>
              <LuAlertCircle size={18} />
            </span>
            Se o pagamento já foi efetuado, ignore essa mensagem. <br /> O
            pagamento será confirmado em até dois dias uteis.
          </SmallText>
          {isPayKitModalOpen && <PayKitModal user={user} />}
        </div>
      )}
    </>
  );
}
