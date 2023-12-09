import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { FLOOR_DETAILS_MAIN } from "../floor-details.routes.const";

type FloorDetailsTabContextType = {
  detailsFloorTab: string;
  setDetailsFloorTab: Dispatch<SetStateAction<string>>;
};

export const FloorDetailsTabContext = createContext<FloorDetailsTabContextType>({
  detailsFloorTab: FLOOR_DETAILS_MAIN,
  setDetailsFloorTab: () => {},
});

interface FloorDetailsTabContextTypeContextProviderProps {
  children: ReactNode;
}

const FloorDetailsTabContextProvider = ({
  children,
}: FloorDetailsTabContextTypeContextProviderProps) => {
  const [detailsFloorTab, setDetailsFloorTab] = useState<string>(FLOOR_DETAILS_MAIN);

  const floorDetailsTabContextProviderProps = {
    detailsFloorTab,
    setDetailsFloorTab,
  };

  return (
    <FloorDetailsTabContext.Provider value={floorDetailsTabContextProviderProps}>
      {children}
    </FloorDetailsTabContext.Provider>
  );
};

export default FloorDetailsTabContextProvider;
