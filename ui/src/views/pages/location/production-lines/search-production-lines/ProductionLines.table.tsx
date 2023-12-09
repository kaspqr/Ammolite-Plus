import { ColumnDef } from "@tanstack/react-table";

import { ProductionLine } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const productionLinesTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<ProductionLine, unknown>[] => {
  const columns: ColumnDef<ProductionLine>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: info => info.getValue(),
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: info => info.getValue(),
    },
    {
      header: "Deliverable",
      accessorKey: "deliverable",
      cell: info => info.getValue(),
    },
    {
      header: "Capacity",
      accessorKey: "capacity",
      cell: info => info.getValue(),
    },
    {
      header: "Code",
      accessorKey: "code",
      cell: info => info.getValue(),
    },
    {
      header: "",
      accessorKey: "id",
      cell: info => ActionColumnEdit(info, onDetailsButtonClick),
    },
  ];
  return columns;
};
