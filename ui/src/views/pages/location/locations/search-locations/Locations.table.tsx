import { ColumnDef } from "@tanstack/react-table";

import { Location } from "@/types/domain/location.model";

import { IDefaultEditButton, ActionColumnEdit } from "@/views/components/widgets/react-table";

export const locationsTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Location, unknown>[] => {
  const columns: ColumnDef<Location>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: info => info.getValue(),
    },
    {
      header: "Owner",
      accessorKey: "owner",
      cell: info => info.getValue(),
    },
    {
      header: "Country",
      accessorKey: "address.country.name",
      cell: info => info.getValue(),
    },
    {
      header: "City",
      accessorKey: "address.city",
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
