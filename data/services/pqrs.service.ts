import { fetchClient } from "../client/fetch-client";
import { IPqrs } from "@/domain/types/pqrs.type";
import { ITablePagination } from "@/domain/types/table.type";
const endpoint = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}`;

export async function listPqrsService(
  filters
): Promise<ITablePagination<IPqrs>> {
  const response = await fetchClient<null, ITablePagination<IPqrs> | null>({
    endpoint: endpoint + `/pqrs`,
    method: "GET",
    params: {
      page: filters.pageIndex,
      count: filters.pageSize,
    },
    credentials: "include",
  });

  return (
    response || {
      pagination: {
        count: 0,
      },
      data: [],
    }
  );
}
