import { Dispatch, SetStateAction, MouseEvent } from "react";

import { Location } from "@/types/domain/location.model";

export type LocationPanelProps = {
  location: Location;
  onBackToSearchClick: () => void;
  setLocation: Dispatch<SetStateAction<Location>>;
};

export type TwoMouseEventActionButtonProps = {
  onDetailsButtonClick: (e: MouseEvent) => void;
  onRemoveButtonClick: (e: MouseEvent) => void;
};
