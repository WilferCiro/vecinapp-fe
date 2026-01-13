import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { toDateTimeString } from "@/utils/date.utils";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Notice } from "../interfaces/notice.interface";
import Image from "next/image";

export const tableNoticeColumns: ColumnDef<Notice>[] = [
  {
    accessorKey: "templateId",
    header: "Plantilla",
    cell: ({ row }) => (
      <Image
        src={row.getValue("templateId")}
        alt="Plantilla"
        width={100}
        height={70}
        className="w-16 h-16 rounded-md object-cover"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "body",
    header: "Cuerpo",
    cell: ({ row }) => <div className="capitalize">{row.getValue("body")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Fechas",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {toDateTimeString(row.getValue("startDate"))} -{" "}
          {toDateTimeString(row.original.endDate)}
        </div>
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
            <p>Ver renderizado</p>
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
