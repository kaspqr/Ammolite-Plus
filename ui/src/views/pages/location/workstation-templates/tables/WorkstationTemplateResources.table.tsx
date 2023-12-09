import { ColumnDef } from "@tanstack/react-table";

import { Resource } from "@/types/domain/location.model";

import { IDefaultEditButton, ActionColumnDelete } from "@/views/components/widgets/react-table";

export const workstationTemplateResourcesTableColumns = ({
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
      cell: info => ActionColumnDelete(info, onDetailsButtonClick),
    },
  ];
  return columns;
};
