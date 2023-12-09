import { ColumnDef } from "@tanstack/react-table";

import { Building } from "@/types/domain/location.model";

import { ActionColumnEdit, IDefaultEditButton } from "@/views/components/widgets/react-table";

export const buildingsTableColumns = ({
  onDetailsButtonClick,
}: IDefaultEditButton): ColumnDef<Building, unknown>[] => {
  const columns: ColumnDef<Building>[] = [
    {
      header: "Address",
      accessorKey: "streetAndNumber",
      cell: info => info.getValue(),
    },
    {
      header: "Zip Code",
      accessorKey: "zip",
      cell: info => info.getValue(),
    },
    {
      header: "Phone",
      accessorKey: "contactPerson.phone",
      cell: info => info.getValue(),
    },
    {
      header: "Email",
      accessorKey: "contactPerson.email",
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
