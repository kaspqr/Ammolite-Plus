import { ColumnDef } from "@tanstack/react-table";

import { ProductionLine } from "@/types/domain/location.model";

import { IDefaultEditButton, ActionColumnPick } from "@/views/components/widgets/react-table";

export const modalProductionLinesTableColumns = ({
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
      header: "",
      accessorKey: "id",
      cell: info => ActionColumnPick(info, onDetailsButtonClick),
    },
  ];
  return columns;
};
