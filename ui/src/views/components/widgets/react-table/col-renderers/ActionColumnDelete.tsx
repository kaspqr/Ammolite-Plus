import { CellContext } from "@tanstack/react-table";
import { MouseEvent } from "react";

import { Button } from "reactstrap";

export const ActionColumnDelete = <T extends { id: number }>(
  info: CellContext<T, unknown>,
  onDeleteButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
) => {
  if (!info.getValue()) return <></>;
  const id = info.row.original.id.toString();

  return (
    <Button
      id={id}
      size="sm"
      className="btn-icon m-1"
      type="button"
      color="danger"
      onClick={onDeleteButtonClick}
      data-testid="detailButton"
    >
      <span id={id} className="btn-inner--icon">
        <i id={id} className="ni ni-fat-remove" />
      </span>
    </Button>
  );
};
