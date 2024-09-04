"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kit } from "@/pages/api/auth/nextauth";
import useUserPaymentStore from "../UserPaymentConfirm/UserPaymentModal/userPaymentModalStore";

export const columns: ColumnDef<Kit>[] = [
  {
    id: "user",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            userId
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    accessorKey: "user",
    enableHiding: false,
    cell: ({ row }) => {
      const userKit = row.original;
      return (
        <div className="font-medium text-center">
          {userKit.user?.toString()}
        </div>
      );
    },
  },
  {
    id: "is_payed",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Pagamento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const userKit = row.original;
      const isPaid = userKit.is_payed ? "Pago" : "Pendente";

      return <div className="font-medium text-center">{isPaid}</div>;
    },
    accessorKey: "Pagamento",
  },
  {
    id: "price",
    accessorKey: "Preço",
    header: () => <div className="text-center">Preço</div>,
    cell: ({ row }) => {
      const userKit = row.original;
      const amount = parseFloat(userKit.model_detail.price.toString());
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "model_detail",
    accessorKey: "Modelo Kit",
    header: "Modelo Kit",
    cell: ({ row }) => {
      const userKit = row.original;
      return <div className="font-medium">{userKit.model_detail.model}</div>;
    },
  },
  {
    id: "actions",
    accessorKey: "Ações",
    cell: ({ row }) => {
      const kit = row.original;
      const { setIsUserPayModalOpen, setUserKit } = useUserPaymentStore();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                setUserKit(kit);
                setIsUserPayModalOpen(true);
              }}
            >
              Confirmar pagamento
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Apagar Kit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
