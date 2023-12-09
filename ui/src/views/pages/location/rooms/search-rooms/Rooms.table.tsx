import { ColumnDef } from "@tanstack/react-table";

import { Room } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const roomsTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Room, unknown>[] => {
  const columns: ColumnDef<Room>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: info => info.getValue(),
    },
    {
      header: "Location",
      accessorKey: "locationTitle",
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
