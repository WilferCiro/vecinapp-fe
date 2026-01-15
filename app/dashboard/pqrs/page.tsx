"use client";

import PqrsModalCreate from "@/components/business/pqrs/pqrs-modal-create";
import { DataTable } from "@/components/datatable/datatable";
import GenericForm from "@/components/form/generic-form";
import { Button } from "@/components/ui/button";
import { listPqrsService } from "@/data/services/pqrs.service";
import { PQRS_LIST_QUERY_KEY } from "@/domain/constants/pqrs.constants";
import { getPqrsFormFilter } from "@/domain/forms/pqrs.form";
import { tablePqrsColumns } from "@/domain/tables/pqrs.table";
import { IPqrs } from "@/domain/types/pqrs.type";
import { ITablePagination } from "@/domain/types/table.type";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useCustomDataTable } from "@/hooks/use-custom-table";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import { useMemo, useState } from "react";

export default function PqrsPage() {
  const { pagination, setPagination } = useCustomDataTable();
  const fieldsForm = useMemo(() => getPqrsFormFilter(), []);
  const { form } = useCustomForm(fieldsForm);
  const [filters, setFilters] = useState<{
    type?: string;
    status?: string;
    daterange?: {
      to?: Date;
      from?: Date;
    };
  }>({});

  const { data, isLoading, isError } = useQuery<ITablePagination<IPqrs>>({
    queryKey: [
      PQRS_LIST_QUERY_KEY,
      pagination.pageIndex,
      pagination.pageSize,
      filters.type,
      filters.status,
      filters?.daterange?.to,
      filters?.daterange?.from,
    ],
    queryFn: () =>
      listPqrsService({
        page: pagination.pageIndex,
        count: pagination.pageSize,
        ...(filters.type ? { type: filters.type } : {}),
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.daterange
          ? {
              startDate: filters.daterange?.from?.toISOString(),
              endDate: filters.daterange?.to?.toISOString(),
            }
          : {}),
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const filterAction = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setFilters(form.getValues());
  };

  return (
    <div className="rounded-md border w-full p-5">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">Listado de PQRS</h2>
      <div className="flex-row md:flex align-center justify-between">
        <div className="flex-row md:flex gap-x-2 justify-center">
          <GenericForm
            form={form}
            fields={fieldsForm}
            className="w-full flex-row md:flex items-baseline gap-x-2"
          />
          <Button onClick={filterAction}><Filter /> Filtrar</Button>
        </div>
        <PqrsModalCreate />
      </div>
      <DataTable<IPqrs>
        loading={isLoading}
        isError={isError}
        columns={tablePqrsColumns}
        data={data?.data || []}
        pagination={{
          pagination: pagination,
          totalRows: data?.pagination.count || 0,
          onPaginationChange: setPagination,
        }}
      />
    </div>
  );
}
