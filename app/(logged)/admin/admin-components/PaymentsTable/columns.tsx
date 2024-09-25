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
import { KitToTable } from "@/pages/api/auth/nextauth";
import useUserPaymentStore from "../UserPaymentConfirm/UserPaymentModal/userPaymentModalStore";
import momento from "@/utils/formatDate";

export const columns: ColumnDef<KitToTable>[] = [
  {
    accessorKey: "user",
    id: "user",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID do Usuário
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    id: "is_payed",
    accessorKey: "is_payed",
    header: "Pagamento",
  },
  {
    id: "date_created",
    accessorKey: "date_created",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de Criação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date_created = new Date(row.original.date_created);
      const formatted_date = momento(date_created).calendar();

      return <div className="text-center font-medium">{formatted_date}</div>;
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const userKit = row.original;
      const amount = parseFloat(userKit.price.toString());
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "model_type",
    accessorKey: "model_type",
    header: "Modelo Kit",
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
