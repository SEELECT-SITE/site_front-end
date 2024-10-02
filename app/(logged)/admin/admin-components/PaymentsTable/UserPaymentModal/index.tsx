"use client";
import { useRef } from "react";
import Text from "@/components/Text";
import formatCurrency from "@/utils/formatCurrency";
import useAlertAdminState from "../../alertAdminStore";
import SmallText from "@/components/SmallText";
import useUserPaymentStore from "./userPaymentModalStore";
import { Button } from "@/components/ui/button";
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
    <div
      onClick={(e) => {
        if (divConfirmPayment.current == e.target) {
          setIsUserPayModalOpen(false);
        }
      }}
      ref={divConfirmPayment}
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-dark/20 text-dark backdrop-blur-sm"
    >
      <div className="relative z-10 flex max-w-md flex-col justify-between overflow-hidden rounded-md bg-slate-800 p-4 text-slate-50">
        <Text>
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
        <div className="my-3 flex flex-wrap">
          <SmallText className="mb-1">
            Clique duas vezes pra{" "}
            {userKit.is_payed ? "Reverter pagamento" : "Confirmar pagamento"}
          </SmallText>
          <Button
            className="relative w-full grow "
            variant={userKit.is_payed ? "destructive" : "default"}
            title="Clique duas vezes para Confirmar"
            size="sm"
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

        <Button
          className="relative w-full bg-red-500 text-white hover:opacity-90"
          size="sm"
          variant={"outline"}
          onClick={(e) => {
            setIsUserPayModalOpen(false);
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
