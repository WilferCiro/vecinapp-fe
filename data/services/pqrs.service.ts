import { fetchClient } from "../client/fetch-client";
import { IPqrs, IPqrsTableFilters } from "@/domain/types/pqrs.type";
import { ITablePagination } from "@/domain/types/table.type";
const endpoint = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}`;

export async function listPqrsService(
  filters: IPqrsTableFilters
): Promise<ITablePagination<IPqrs>> {
  const response = await fetchClient<null, ITablePagination<IPqrs> | null>({
    endpoint: endpoint + `/pqrs`,
    method: "GET",
    params: {
      ...filters,
      page: `${filters.page}`,
      count: `${filters.count}`,
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

export async function addPqrsResponseService(data: {
  message: string,
  pqrsId: number
}): Promise<void> {
  await fetchClient({
    endpoint: endpoint + `/pqrs/${data.pqrsId}/responses`,
    method: "POST",
    body: {
      message: data.message,
    },
    credentials: "include",
  });
}

export async function createPqrsService(data: {
  description: string,
  subject: number,
  type: string,
}): Promise<void> {
  await fetchClient({
    endpoint: endpoint + `/pqrs`,
    method: "POST",
    body: data,
    credentials: "include",
  });
}


export async function deletePqrsService(data: {
  id: number;
}): Promise<void> {
  await fetchClient({
    endpoint: endpoint + `/pqrs/${data.id}`,
    method: "DELETE",
    body: null,
    credentials: "include",
  });
}