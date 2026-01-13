import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  Check,
  Eye,
  Pencil,
  PersonStanding,
  SquareUserRoundIcon,
  Trash,
  User2,
  UserX2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toDateTimeString } from "@/utils/date.utils";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommonArea } from "../interfaces/common-area.interface";
import {
  COMMON_AREA_STATUS,
  COMMON_AREA_STATUS_COLOR,
} from "../constants/common-area.constants";

export const tableCommonAreaColumns: ColumnDef<CommonArea>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "isReservable",
    header: "Reservable",
    cell: ({ row }) => {
      const isReservable = row.getValue("isReservable");
      return (
        <Badge color={isReservable ? "default" : "destructive"}>
          {isReservable ? "Sí" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "maxCapacity",
    header: "Capacidad máxima",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 align-center">
          <SquareUserRoundIcon /> {row.getValue("maxCapacity")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          color={
            COMMON_AREA_STATUS_COLOR[
              status as keyof typeof COMMON_AREA_STATUS_COLOR
            ] || "default"
          }
        >
          {COMMON_AREA_STATUS[status as keyof typeof COMMON_AREA_STATUS] ||
            "Activo"}
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
    accessorKey: "id",
    header: "Acciones",
    cell: ({ row }) => (
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="cursor-pointer"
            >
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver información completa</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={"sm"} className="cursor-pointer">
              <Pencil />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"sm"}
              variant={"destructive"}
              className="cursor-pointer"
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar registro</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    ),
  },
];
