import { PaginationState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableFooterProps {
  pagination: PaginationState;
  totalRows: number;
  onPaginationChange: (p: PaginationState) => void;
}

export function DataTableFooter({
  pagination,
  totalRows,
  onPaginationChange,
}: DataTableFooterProps) {
  const pageCount = Math.ceil(totalRows / pagination.pageSize);

  return (
    <div className="flex-row md:flex items-center justify-between px-2 gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">Filas</span>
        <Select
          value={String(pagination.pageSize)}
          onValueChange={(v) =>
            onPaginationChange({ pageIndex: 0, pageSize: Number(v) })
          }
        >
          <SelectTrigger className="h-8 w-17.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 2, 30, 50].map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={pagination.pageIndex === 0}
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: pagination.pageIndex - 1,
            })
          }
        >
          Anterior
        </Button>

        <span className="text-sm">
          {pagination.pageIndex + 1} / {pageCount}
        </span>

        <Button
          size="sm"
          variant="outline"
          disabled={pagination.pageIndex + 1 >= pageCount}
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: pagination.pageIndex + 1,
            })
          }
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
