import { ColumnDef } from "@tanstack/react-table";

import { Location } from "@/types/domain/location.model";

import { IDefaultEditButton, ActionColumnPick } from "@/views/components/widgets/react-table";

export const modalLocationsTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Location, unknown>[] => {
  const columns: ColumnDef<Location>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: info => info.getValue(),
    },
    {
      header: "Country",
      accessorKey: "address.country.name",
      cell: info => info.getValue(),
    },
    {
      header: "",
      accessorKey: "id",
      cell: info => ActionColumnPick(info, onDetailsButtonClick),
    },
  ];
  return columns;
};
