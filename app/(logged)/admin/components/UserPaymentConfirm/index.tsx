"use client";
import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { User } from "next-auth";
import axios from "axios";
import Title from "@/components/Title";
import Container from "@/components/Container";
import { DJANGO_URL } from "@/utils/consts";
import FloatButton from "@/components/FloatButton";
import { MdClose } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { HiPencilAlt } from "react-icons/hi";
import Text from "@/components/Text";
import useUserPaymentStore from "./UserPaymentModal/userPaymentModalStore";
import UserPaymentModal from "./UserPaymentModal";

interface UserPaymentConfirmProps {
  className?: string;
  children?: ReactNode;
  user: User;
}

export default function UserPaymentConfirm({ user }: UserPaymentConfirmProps) {
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [kitsPayed, setKitsPayed] = useState<number>(0);
  const [totalKits, setTotalKits] = useState<number>(0);
  const { setIsUserPayModalOpen, setUserKit, isUserPayModalOpen } =
    useUserPaymentStore();

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
        var payeds = 0;
        var allPaydeKits = 0;
        data.results.forEach((elem: any) => {
          if (elem.is_payed) {
            payeds++;
          }
          if (elem.model != 1) {
            allPaydeKits++;
          }
          switch (elem.model) {
            case 2:
          }
        });
        setKitsPayed(payeds);
        setTotalKits(allPaydeKits);
        return data.results;
      } catch (error) {}
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {isUserPayModalOpen && (
        <UserPaymentModal triggerFn={refetch} token={user.token} />
      )}
      <Container>
        <div className="w-full flex gap-4 my-4 items-center flex-wrap justify-between">
          <Title>Usuarios Pagantes</Title>
          <FloatButton
            className="flex duration-100 p-1"
            shadowClassname="my-0"
            onClick={(e) => {
              setIsPaymentOpen(!isPaymentOpen);
            }}
          >
            {isPaymentOpen ? (
              <>
                Fechar <MdClose />
              </>
            ) : (
              <>
                Ver pagamentos <HiPencilAlt size={18} />
              </>
            )}
          </FloatButton>
        </div>
        {!isLoading && (
          <div className="w-full flex gap-2 flex-wrap">
            <span className="flex text-left my-2 p-2 rounded-lg items-start gap-1 text-yellow-200 bg-slate-800 border">
              Pagamentos efetuados: {kitsPayed} de {totalKits}
            </span>
            <span className="flex text-left my-2 p-2 rounded-lg items-start gap-1 text-yellow-200 bg-slate-800 border">
              {`Kits Premium ${
                usersPayment.filter((elem: any) => {
                  return elem.model == 4 && elem.is_payed == true;
                }).length
              } de ${
                usersPayment.filter((elem: any) => {
                  return elem.model == 4;
                }).length
              }`}
            </span>
            <span className="flex text-left my-2 p-2 rounded-lg items-start gap-1 text-yellow-200 bg-slate-800 border">
              {`Kits Médios ${
                usersPayment.filter((elem: any) => {
                  return elem.model == 3 && elem.is_payed == true;
                }).length
              } de ${
                usersPayment.filter((elem: any) => {
                  return elem.model == 3;
                }).length
              }`}
            </span>
            <span className="flex text-left my-2 p-2 rounded-lg items-start gap-1 text-yellow-200 bg-slate-800 border">
              {`Kits Básicos ${
                usersPayment.filter((elem: any) => {
                  return elem.model == 2 && elem.is_payed == true;
                }).length
              } de ${
                usersPayment.filter((elem: any) => {
                  return elem.model == 2;
                }).length
              }`}
            </span>
            <span className="flex text-left my-2 p-2 rounded-lg items-start gap-1 text-yellow-200 bg-slate-800 border">
              Kits gratuitos{" "}
              {
                usersPayment.filter((elem: any) => {
                  return elem.model == 1;
                }).length
              }
            </span>
          </div>
        )}
      </Container>

      <div className="w-full relative pb-20">
        {isPaymentOpen && !isLoading && (
          <Container className="">
            {usersPayment
              .sort((a: any, b: any) => a.user - b.user)
              ?.map((kit: any, index: number) => {
                if (kit.model_detail.id == 1) return;
                if (!kit.is_payed)
                  return (
                    <div
                      className="bg-white p-2 py-3 gap-1 hover:bg-slate-200 rounded-lg text-dark flex flex-wrap my-2 justify-between"
                      key={index + kit.user * index}
                    >
                      <Text>userID: {kit.user}</Text>
                      <Text>{kit.model_detail.model}</Text>

                      <div className="bg-slate-800 gap-2 flex text-orange-400 p-1 rounded-md">
                        Pagamento pendente. Confirmar pagamento?{" "}
                        <button
                          className="bg-white text-green-700 rounded px-1 hover:bg-slate-300"
                          onClick={(e) => {
                            setIsUserPayModalOpen(true);
                            setUserKit(kit);
                          }}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  );
              })}
            <div className="border-l-2 pl-2 mt-12 w-full py-3 font-bold flex gap-2 text-white">
              <Text> Kits com Pagamento confirmado</Text>
              <GiPayMoney size={26} />
            </div>
            {usersPayment
              .sort((a: any, b: any) => a.user - b.user)
              ?.map((kit: any, index: number) => {
                if (kit.model_detail.id == 1) return;
                if (kit.is_payed)
                  return (
                    <div
                      className="bg-white p-2 py-3 gap-1 hover:bg-slate-200 rounded-lg text-dark flex flex-wrap my-2 justify-between"
                      key={index + kit.user * index}
                    >
                      <Text>userID: {kit.user}</Text>
                      <Text>{kit.model_detail.model}</Text>
                      <div className="bg-slate-800 text-green-200 p-1 rounded-md">
                        Pagamento Confirmado. Trocar estado de pagamento?
                        <button
                          className="bg-white text-green-700 rounded px-1 hover:bg-slate-300"
                          onClick={(e) => {
                            setIsUserPayModalOpen(true);
                            setUserKit(kit);
                          }}
                        >
                          Trocar
                        </button>
                      </div>
                    </div>
                  );
              })}
          </Container>
        )}
      </div>
    </>
  );
}
