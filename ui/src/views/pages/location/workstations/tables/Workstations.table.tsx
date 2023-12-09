import { ColumnDef } from "@tanstack/react-table";

import { Workstation } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const workstationsTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Workstation, unknown>[] => {
  const columns: ColumnDef<Workstation>[] = [
    {
      header: "Name",
      accessorKey: "name",
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
