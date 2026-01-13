"use client";

import { DataTable } from "@/components/datatable/datatable";
import { Notice } from "@/domain/interfaces/notice.interface";
import { tableNoticeColumns } from "@/domain/tables/notice.table";

export default function NoticePage() {
  return (
    <>
      <DataTable<Notice>
        title="Comunicados internos"
        loading={false}
        columns={tableNoticeColumns}
        data={[
          {
            id: "asdfsafsd",
            templateId: "https://github.com/evilrabbit.png",
            title: "Consulta sobre mantenimiento",
            body:
              "Quisiera saber cuándo se realizará el próximo mantenimiento de las áreas comunes.",
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "asdfsafsd22",
            templateId: "https://github.com/evilrabbit.png",
            title: "Consulta sobre mantenimiento",
            body:
              "Quisiera saber cuándo se realizará el próximo mantenimiento de las áreas comunes.",
            startDate: new Date(),
            endDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]}
      />
    </>
  );
}
