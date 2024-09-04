"use client";
import { QueryClientProvider, useQuery } from "react-query";
import { columns } from "../admin-components/PaymentsTable/columns";
import { DataTable } from "../admin-components/PaymentsTable/data-table";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { queryClient } from "@/utils/queryClient";
import { axiosClient } from "@/lib/utils";
import UserPaymentModal from "../admin-components/UserPaymentConfirm/UserPaymentModal";
import useUserPaymentStore from "../admin-components/UserPaymentConfirm/UserPaymentModal/userPaymentModalStore";

function PaymentsTable({ session }: { session: Session }) {
  const { user } = session;
  const { isUserPayModalOpen } = useUserPaymentStore();

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
        const { data } = await axiosClient.get(`api/kits/`, {
          headers,
        });
        return data.results;
      } catch (error) {}
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="container mx-auto py-10">
      {isUserPayModalOpen && (
        <UserPaymentModal triggerFn={refetch} token={user?.token} />
      )}
      {usersPayment && <DataTable columns={columns} data={usersPayment} />}
    </div>
  );
}

export default function PaymentsConfirmPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <QueryClientProvider client={queryClient}>
        <PaymentsTable session={session} />
      </QueryClientProvider>
    );
  }
  return <div>Carregando..</div>;
}
