import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Eye, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  PQRS_COLORS,
  PQRS_STATUS_TEXT,
  PQRS_TYPE,
} from "../constants/pqrs.constants";
import { toDateTimeString } from "@/utils/date.utils";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IPqrs } from "../types/pqrs.type";

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
        {toDateTimeString(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    header: "Acciones",
    cell: ({ row }) => (
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"sm"} variant={"secondary"} className="cursor-pointer">
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver información completa</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"sm"} variant={"destructive"} className="cursor-pointer">
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar registro</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"sm"} className="cursor-pointer">
              <Check />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Responder</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    ),
  },
];
