"use client";

import { DataTable } from "@/components/datatable/datatable";
import { Visitor } from "@/domain/interfaces/visitor.interface";
import { tableVisitorsColumns } from "@/domain/tables/visitors.table";

export default function VisitorsPage() {
  return (
    <>
      <DataTable<Visitor>
        title="Visitantes"
        loading={false}
        columns={tableVisitorsColumns}
        data={[
          {
            id: "asdfsafsd",
            name: "Juan Pérez",
            document: "123456789",
            entranceDate: new Date(),
            description: "Visita técnica",
            authorizedById: "autorizado por",
            licensePlate: "ABC-123",
          },
          {
            id: "asdfsafsd22",
            name: "María López",
            document: "987654321",
            entranceDate: new Date(),
            description: "Visita familiar",
            authorizedById: "autorizado por",
            licensePlate: "XYZ-789",
          },
        ]}
      />
    </>
  );
}
