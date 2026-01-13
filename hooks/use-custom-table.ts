import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

interface UseDataTableProps {
  pageSize?: number;
}

export function useCustomDataTable({ pageSize = 10 }: UseDataTableProps = {}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  return {
    pagination,
    setPagination,
  };
}
