"use client";

import { DataTable } from "@/components/datatable/datatable";
import { DataTableFooter } from "@/components/datatable/datatable-footer";
import GenericForm from "@/components/form/generic-form";
import { listPqrsService } from "@/data/services/pqrs.service";
import { getPqrsFormFilter } from "@/domain/forms/pqrs.form";
import { tablePqrsColumns } from "@/domain/tables/pqrs.table";
import { IPqrs } from "@/domain/types/pqrs.type";
import { ITablePagination } from "@/domain/types/table.type";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useCustomDataTable } from "@/hooks/use-custom-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const FiltersTable = () => {
  const fieldsForm = useMemo(() => getPqrsFormFilter(), []);
  const { form } = useCustomForm(fieldsForm);
  return (
    <GenericForm
      form={form}
      fields={fieldsForm}
      className="w-full flex items-baseline gap-x-2"
    />
  );
};

export default function PqrsPage() {
  const { pagination, setPagination } = useCustomDataTable();

  const { data, isLoading, isError } = useQuery<ITablePagination<IPqrs>>({
    queryKey: ["pqrs", pagination],
    queryFn: () => listPqrsService(pagination),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <>
      {/*<DataTable<IPqrs>
        title="Listado de PQRS"
        filterComponents={<FiltersTable />}
        loading={isLoading}
        columns={tablePqrsColumns}
        data={data?.data || []}
        onPaginationChange={() => {}}
        total={data?.pagination.count || 0}
      />*/}
      <DataTable<IPqrs>
        title="Listado de PQRS"
        filterComponents={<FiltersTable />}
        columns={tablePqrsColumns}
        data={data?.data || []}
      />
      <DataTableFooter
        pagination={pagination}
        totalRows={data?.pagination.count || 0}
        onPaginationChange={setPagination}
      />
    </>
  );
}
