"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "../ui/card";
import { DataTableFooter } from "./datatable-footer";
import { Separator } from "../ui/separator";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  isError?: boolean;
  pagination: {
    pagination: PaginationState;
    totalRows: number;
    onPaginationChange: (p: PaginationState) => void;
  };
}

export function DataTable<T>({
  columns,
  data,
  loading,
  pagination,
  isError,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {loading ? "Cargando" : "Sin resultados"}
                    {isError ? "Ocurrió un error" : ""}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Separator className="my-2" />
          <DataTableFooter
            pagination={pagination.pagination}
            totalRows={pagination.totalRows}
            onPaginationChange={pagination.onPaginationChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
