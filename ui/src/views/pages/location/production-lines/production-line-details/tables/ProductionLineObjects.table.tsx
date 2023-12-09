import { ColumnDef } from "@tanstack/react-table";

import { Resource } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const productionLineObjectTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Resource, unknown>[] => {
  const columns: ColumnDef<Resource>[] = [
    {
      header: "Name",
      accessorKey: "name",
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
