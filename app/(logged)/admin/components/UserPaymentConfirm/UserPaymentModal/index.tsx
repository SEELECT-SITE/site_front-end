"use client";
import { useRef } from "react";
import Text from "@/components/Text";
import formatCurrency from "@/utils/formatCurrency";
import EventDelete from "@/components/SECTIONS/Cronograma/EventsCard/EventDelete";
import axios from "axios";
import { DJANGO_URL } from "@/utils/consts";
import useAlertAdminState from "../../alertAdminStore";
import SmallText from "@/components/SmallText";
import useUserPaymentStore from "./userPaymentModalStore";
import Button from "@/components/Button";

export default function UserPaymentModal({
  token,
  triggerFn,
}: {
  token?: string;
  triggerFn: Function;
}) {
  const divConfirmPayment = useRef<HTMLDivElement | null>(null);
  const { setIsUserPayModalOpen, userKitModel, userID, userKitID } =
    useUserPaymentStore();
  const { setIsAlertAdminOpen, setAlertMsg } = useAlertAdminState();

  async function ConfirmPayment() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: token,
    };
    try {
      await axios.post(
        `${DJANGO_URL}api/kits/${userKitID}/confirm_payment/`,
        "",
        {
          headers,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        onClick={(e) => {
          if (divConfirmPayment.current == e.target) {
            setIsUserPayModalOpen(false);
          }
        }}
        ref={divConfirmPayment}
        className="fixed w-full h-full flex top-0 left-0 p-4 backdrop-blur-sm bg-dark/20 text-dark z-10 items-start justify-center"
      >
        <div className="flex flex-col justify-between relative overflow-hidden bg-white rounded-md max-w-md z-10 p-4">
          <Text className="text-dark">
            Dejesa confirmar o pagamento de{" "}
            {formatCurrency(userKitModel?.price ?? 25)} para o usúario de ID{" "}
            {userID}?
          </Text>
          <div className=" my-4 flex flex-wrap">
            <SmallText>Clique duas vezes pra confirmar o pagamento</SmallText>
            <Button
              className="text-md right- relative grow bg-green-700 text-white p-2 hover:bg-green-900"
              title="Clique duas vezes para Confirmar"
              onDoubleClick={async (e) => {
                try {
                  await ConfirmPayment();
                  triggerFn();
                  setAlertMsg("Pagamento confirmado");
                  setIsAlertAdminOpen(true);

                  setIsUserPayModalOpen(false);
                } catch (e) {
                  setAlertMsg("Erro Inesperado");
                  setIsAlertAdminOpen(true);

                  setIsUserPayModalOpen(false);
                } finally {
                  setTimeout(() => {
                    setAlertMsg("");
                    setIsAlertAdminOpen(false);
                  }, 4000);
                }
              }}
            >
              {" "}
              Confirmar pagamento
            </Button>
          </div>
          <EventDelete
            className="text-md w-full right- relative bg-red-500 text-white hover:opacity-90"
            message="CANCELAR"
            onClick={(e) => {
              setIsUserPayModalOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
}
