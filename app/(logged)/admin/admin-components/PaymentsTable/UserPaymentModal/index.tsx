"use client";
import { useRef } from "react";
import Text from "@/components/Text";
import formatCurrency from "@/utils/formatCurrency";
import EventDelete from "@/components/SECTIONS/Cronograma/EventsCard/EventDelete";
import useAlertAdminState from "../../alertAdminStore";
import SmallText from "@/components/SmallText";
import useUserPaymentStore from "./userPaymentModalStore";
import Button from "@/components/Button";
import { LuAlertCircle } from "react-icons/lu";
import momento from "@/utils/formatDate";
import { axiosClient } from "@/lib/utils";

export default function UserPaymentModal({
  token,
  triggerFn,
}: {
  token?: string;
  triggerFn: Function;
}) {
  const divConfirmPayment = useRef<HTMLDivElement | null>(null);
  const { setIsUserPayModalOpen, userKit } = useUserPaymentStore();
  const { setIsAlertAdminOpen, setAlertMsg } = useAlertAdminState();
  async function ConfirmPayment() {
    if (userKit == null) return;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Token: token,
    };
    const paymentState = `${userKit.is_payed}`;
    const formData = new URLSearchParams();
    formData.append(
      "is_payed",
      paymentState.charAt(0).toUpperCase() + paymentState.slice(1)
    );
    try {
      await axiosClient.post(
        `api/kits/${userKit.kitID}/confirm_payment/`,
        formData,
        {
          headers,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  if (userKit == null) return <></>;
  return (
    <>
      <div
        onClick={(e) => {
          if (divConfirmPayment.current == e.target) {
            setIsUserPayModalOpen(false);
          }
        }}
        ref={divConfirmPayment}
        className="fixed left-0 top-0 z-10 flex h-full w-full items-start justify-center bg-dark/20 p-4 text-dark backdrop-blur-sm"
      >
        <div className="relative z-10 flex max-w-md flex-col justify-between overflow-hidden rounded-md bg-white p-4">
          <Text className="text-dark">
            Deseja{" "}
            {userKit.is_payed ? "reverter pagamento" : "confirmar pagamento"} de{" "}
            {formatCurrency(
              momento(userKit.date_created).isBefore("10/30/2024")
                ? userKit.price - 5
                : userKit.price
            )}{" "}
            para o usúario de ID {userKit.userID}?
          </Text>
          {userKit.discount != 0 && (
            <div className="my-2 inline-flex items-center gap-1 rounded-md bg-slate-900 p-1 text-yellow-200">
              <span>
                <LuAlertCircle size={18} />
              </span>{" "}
              Desconto de {userKit.discount}% já aplicado
            </div>
          )}
          <div className="my-4 flex flex-wrap">
            <SmallText>
              Clique duas vezes pra{" "}
              {userKit.is_payed ? "Reverter pagamento" : "Confirmar pagamento"}
            </SmallText>
            <Button
              className="text-md right- relative w-full grow bg-green-700 p-2 text-white hover:bg-green-900"
              title="Clique duas vezes para Confirmar"
              onDoubleClick={async () => {
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
              {userKit.is_payed ? "Reverter pagamento" : "Confirmar pagamento"}
            </Button>
          </div>

          <EventDelete
            className="text-md right- relative w-full bg-red-500 text-white hover:opacity-90"
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
