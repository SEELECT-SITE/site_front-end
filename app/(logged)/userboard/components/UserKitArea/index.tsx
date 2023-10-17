import { zodResolver } from "@hookform/resolvers/zod";
import Text from "@/components/Text";
import { User } from "next-auth";
import EventCard from "@/components/SECTIONS/Cronograma/EventsCard";
import FloatButton from "@/components/FloatButton";
import useSelectEventsState from "../SelectEventsModal/selectEventsStore";
import PayKitModal from "../PayKitModal";
import usePayKitState from "../PayKitModal/PayKitModalStore";
import SmallText from "@/components/SmallText";
import { LuAlertCircle } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Title from "@/components/Title";
import Button from "@/components/Button";
import getKitById from "@/utils/getKitsByID";

export default function UserKitArea({ user }: { user: User }) {
  const { isPayKitModalOpen, setIsPayKitModalOpen } = usePayKitState();
  return (
    <>
      {!user?.kit?.is_payded && (
        <div className="pb-8">
          <Title className="border-l-2 border-cian-400 pl-2">
            {getKitById(user?.kit?.model)}
          </Title>
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
