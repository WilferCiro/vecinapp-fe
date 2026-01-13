"use client";

import { DataTable } from "@/components/datatable/datatable";
import GenericForm from "@/components/form/generic-form";
import { getCommonAreaFormFilter } from "@/domain/forms/common-area.form";
import { CommonArea } from "@/domain/interfaces/common-area.interface";
import { Pqrs } from "@/domain/interfaces/pqrs.interface";
import { tableCommonAreaColumns } from "@/domain/tables/common-area.table";
import { tablePqrsColumns } from "@/domain/tables/pqrs.table";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useMemo } from "react";

const FiltersTable = () => {
  const fieldsForm = useMemo(() => getCommonAreaFormFilter(), []);
  const { form } = useCustomForm(fieldsForm);
  return (
    <GenericForm
      form={form}
      fields={fieldsForm}
      className="w-full flex items-baseline gap-x-2"
    />
  );
};

export default function CommonAreaPage() {
  return (
    <>
      <DataTable<CommonArea>
        title="Listado de Zonas comunes"
        filterComponents={<FiltersTable />}
        loading={false}
        columns={tableCommonAreaColumns}
        data={[
          {
            id: "asdfsafsd",
            name: "Piscina",
            description: "Quisiera saber cuándo se realizará el próximo mantenimiento de las áreas comunes.",
            status: "allowed",
            createdAt: new Date(),
            updatedAt: new Date(),
            isReservable: false,
            maxCapacity: 20,
          },
          {
            id: "asdfsafsd2",
            name: "Sala de reuniones",
            description: "Quisiera saber cuándo se realizará el próximo mantenimiento de las áreas comunes.",
            status: "maintenance",
            createdAt: new Date(),
            updatedAt: new Date(),
            isReservable: true,
            maxCapacity: 30,
          },
        ]}
      />
    </>
  );
}
