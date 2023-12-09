import { ColumnDef } from "@tanstack/react-table";

import { Floor } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const floorsTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Floor, unknown>[] => {
  const columns: ColumnDef<Floor>[] = [
    {
      header: "Location",
      accessorKey: "locationTitle",
      cell: info => info.getValue(),
    },
    {
      header: "Address",
      accessorKey: "streetAndNumber",
      cell: info => info.getValue(),
    },
    {
      header: "Floor Number",
      accessorKey: "number",
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
