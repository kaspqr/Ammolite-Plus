import { CellContext } from "@tanstack/react-table";
import { MouseEvent } from "react";

import { Button } from "reactstrap";

export const ActionColumnPick = <T extends { id: number }>(
  info: CellContext<T, unknown>,
  onDetailsButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
) => {
  if (!info.getValue()) return <></>;
  const id = info.row.original.id.toString();

  return (
    <Button
      id={id}
      size="sm"
      className="btn-icon m-1"
      type="button"
      color="success"
      onClick={onDetailsButtonClick}
      data-testid="detailButton"
    >
      Pick
    </Button>
  );
};
