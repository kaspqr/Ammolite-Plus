import { ColumnDef } from "@tanstack/react-table";

import { WorkstationTemplate } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const workstationTemplatesTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<WorkstationTemplate, unknown>[] => {
  const columns: ColumnDef<WorkstationTemplate>[] = [
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
