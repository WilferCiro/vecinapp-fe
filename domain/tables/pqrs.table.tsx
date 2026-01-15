import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  PQRS_COLORS,
  PQRS_STATUS_TEXT,
  PQRS_TYPE,
} from "../constants/pqrs.constants";
import { humanizeDate } from "@/utils/date.utils";
import { ButtonGroup } from "@/components/ui/button-group";
import { IPqrs } from "../types/pqrs.type";
import PqrsModalInfo from "@/components/business/pqrs/pqrs-modal-info";
import { PqrsModalDelete } from "@/components/business/pqrs/pqrs-modal-delete";

export const tablePqrsColumns: ColumnDef<IPqrs>[] = [
  {
    accessorKey: "id",
    header: "Serial",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => (
      <div className="capitalize">
        {PQRS_TYPE[row.getValue("type") as keyof typeof PQRS_TYPE]}
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asunto
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subject")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          color={PQRS_COLORS[status as keyof typeof PQRS_COLORS] || "default"}
        >
          {PQRS_STATUS_TEXT[status as keyof typeof PQRS_STATUS_TEXT] ||
            "Abierto"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Creado el",
    cell: ({ row }) => (
      <div className="capitalize">
        {humanizeDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <ButtonGroup>
        <PqrsModalInfo pqrs={row.original} />
        <PqrsModalDelete pqrs={row.original} />
      </ButtonGroup>
    ),
  },
];
