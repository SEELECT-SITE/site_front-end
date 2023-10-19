"use client";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import axios from "axios";
import removeElem from "@/utils/removeElem";
import Title from "@/components/Title";
import Container from "@/components/Container";
import { SvgCardLine } from "@/components/PriceCard";
import { DJANGO_URL } from "@/utils/consts";
import useDeleteModalState from "./UserPaymentModal/userPaymentModalStore";
import DeleteModal from "./UserPaymentModal";
import FloatButton from "@/components/FloatButton";
import { MdClose } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import Text from "@/components/Text";
import useUserPaymentStore from "./UserPaymentModal/userPaymentModalStore";
import UserPaymentModal from "./UserPaymentModal";

interface UserPaymentConfirmProps {
  className?: string;
  children?: ReactNode;
  user: User;
}

export default function UserPaymentConfirm({
  className,
  children,
  user,
}: UserPaymentConfirmProps) {
  const [isEventsOpen, setIsEventsOpen] = useState<boolean>(false);
  const {
    setIsUserPayModalOpen,
    setUserID,
    isUserPayModalOpen,
    setUserKitModelPrice,
    setUserKitID,
  } = useUserPaymentStore();

  const {} = useDeleteModalState();
  const {
    data: usersPayment,
    isLoading,
    refetch,
  } = useQuery<any | undefined>(
    "adminUserPay",
    async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "ngrok-skip-browser-warning": "true",
        Token: user?.token,
      };
      try {
        const { data } = await axios.get(`${DJANGO_URL}api/kits/`, {
          headers,
        });
        return data.results;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {isUserPayModalOpen && (
        <UserPaymentModal triggerFn={refetch} token={user.token} />
      )}
      <Container className="flex gap-4 items-center">
        <Title>Eventos</Title>
        <FloatButton
          className="flex duration-100 p-1"
          shadowClassname="my-0"
          onClick={(e) => {
            setIsEventsOpen(!isEventsOpen);
          }}
        >
          {isEventsOpen ? (
            <>
              Fechar <MdClose />
            </>
          ) : (
            <>
              Ver eventos <HiPencilAlt size={18} />
            </>
          )}
        </FloatButton>
      </Container>

      <div className="w-full relative pb-20 ">
        <Container className="">
          {usersPayment?.map((kit: any, index: number) => {
            if (kit.model_detail.id == 1) return;
            return (
              <div
                className="bg-white p-1 gap-1 rounded-lg text-dark flex flex-wrap my-4 justify-between"
                key={index + kit.user * index}
              >
                <Text>userID: {kit.user}</Text>
                <Text>{kit.model_detail.model}</Text>
                <Text>
                  {kit.is_payed ? (
                    <div>Pagamento confirmado</div>
                  ) : (
                    <div className="bg-slate-800 text-orange-400 p-1 rounded-md">
                      Pagamento pendente. Confirmar pagamento?{" "}
                      <button
                        className="bg-white text-green-700 rounded px-1 hover:bg-slate-300"
                        onClick={(e) => {
                          setIsUserPayModalOpen(true);
                          setUserID(kit.user);
                          setUserKitModelPrice(kit.model_detail.price);
                          setUserKitID(kit.id);
                        }}
                      >
                        Confirmar
                      </button>
                    </div>
                  )}
                </Text>
              </div>
            );
          })}
        </Container>
      </div>
    </>
  );
}
