import { ColumnDef } from "@tanstack/react-table";
import { EventProps } from "@/pages/api/auth/nextauth";

export const eventsTableColumnsDef: ColumnDef<EventProps, any>[] = [
  {
    accessorKey: "title",
    header: "Evento",
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("title") as string).split("$")[0]}
      </div>
    ),
  },
];
