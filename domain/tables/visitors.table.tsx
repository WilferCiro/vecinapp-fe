import { ColumnDef } from "@tanstack/react-table";
import { toDateTimeString } from "@/utils/date.utils";
import { Visitor } from "../interfaces/visitor.interface";

export const tableVisitorsColumns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "document",
    header: "Documento",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("document")}</div>
    ),
  },
  {
    accessorKey: "entranceDate",
    header: "Fecha de entrada",
    cell: ({ row }) => <div className="capitalize">{toDateTimeString(row.getValue("entranceDate"))}</div>,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "authorizedById",
    header: "Autorizado por",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("authorizedById")}</div>
    ),
  },
  {
    accessorKey: "licensePlate",
    header: "Placa vehículo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("licensePlate")}</div>
    ),
  },
];
