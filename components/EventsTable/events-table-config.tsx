import { ColumnDef } from "@tanstack/react-table";
import { EventProps } from "@/types/nextauth";

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
