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
import useUserPaymentStore from "./UserPaymentModal/userPaymentModalStore";
import momento from "@/utils/formatDate";
import useKitDeleteModalState from "../../kits-table/kits-table-components/deleteKitModal/deleteKitModalStore";

export const columns: ColumnDef<KitToTable>[] = [
  {
    accessorKey: "userID",
    id: "userID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID do Usuário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    id: "is_payed",
    accessorKey: "is_payed",
    header: "Pagamento",
    cell: ({ row }) => {
      const kit = row.original;
      if (kit.model_type == "Kit Gratuito") {
        return "Não precisa";
      }
      return kit.is_payed ? "Pago" : "Pendente";
    },
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
    meta: {
      filterVariant: "range",
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) => {
      const kit = row.original;
      const amount = parseFloat(kit.price.toString());
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      if (kit.model_type == "Kit Gratuito") {
        return "Sem preço";
      }
      return formatted;
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
      const { setIsDeleteModalOpen, setKitDelete } = useKitDeleteModalState();
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
            {kit.model_type != "Kit Gratuito" && (
              <DropdownMenuItem
                onClick={() => {
                  setUserKit(kit);
                  setIsUserPayModalOpen(true);
                }}
              >
                Confirmar pagamento
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
                setKitDelete(kit);
              }}
            >
              Apagar Kit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
