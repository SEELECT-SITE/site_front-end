"use client";
import { QueryClientProvider, useQuery } from "react-query";
import { columns } from "../admin-components/PaymentsTable/columns";
import { DataTable } from "../admin-components/PaymentsTable/data-table";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { queryClient } from "@/utils/queryClient";
import { axiosClient, transformKitsToTable } from "@/lib/utils";
import UserPaymentModal from "../admin-components/PaymentsTable/UserPaymentModal";
import useUserPaymentStore from "../admin-components/PaymentsTable/UserPaymentModal/userPaymentModalStore";
import useKitDeleteModalState from "./kits-table-components/deleteKitModal/deleteKitModalStore";
import DeleteKitModal from "./kits-table-components/deleteKitModal";
import { KitToTable } from "@/pages/api/auth/nextauth";

function PaymentsTable({ session }: { session: Session }) {
  const { user } = session;
  const { isUserPayModalOpen } = useUserPaymentStore();

  const {
    data: usersPayment,
    isLoading,
    refetch,
  } = useQuery<KitToTable[]>(
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
        const tableKits = transformKitsToTable(data.results);
        return tableKits;
      } catch (error) {
        return [];
      }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="container mx-auto ">
      {isUserPayModalOpen && (
        <UserPaymentModal triggerFn={refetch} token={user?.token} />
      )}
      <DeleteKitModal token={user?.token} triggerFn={refetch} />
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
