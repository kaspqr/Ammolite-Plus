import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { BUILDING_DETAILS_MAIN } from "../building-details.routes.const";

type BuildingDetailsTabContextType = {
  detailsBuildingTab: string;
  setDetailsBuildingTab: Dispatch<SetStateAction<string>>;
};

export const BuildingDetailsTabContext = createContext<BuildingDetailsTabContextType>({
  detailsBuildingTab: BUILDING_DETAILS_MAIN,
  setDetailsBuildingTab: () => {},
});

interface BuildingDetailsTabContextTypeContextProviderProps {
  children: ReactNode;
}

const BuildingDetailsTabContextProvider = ({
  children,
}: BuildingDetailsTabContextTypeContextProviderProps) => {
  const [detailsBuildingTab, setDetailsBuildingTab] = useState<string>(BUILDING_DETAILS_MAIN);

  const buildingDetailsTabContextProviderProps = {
    detailsBuildingTab,
    setDetailsBuildingTab,
  };

  return (
    <BuildingDetailsTabContext.Provider value={buildingDetailsTabContextProviderProps}>
      {children}
    </BuildingDetailsTabContext.Provider>
  );
};

export default BuildingDetailsTabContextProvider;
