import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { BUILDING_SEARCH } from "../buildings";
import { FLOOR_SEARCH } from "../floors";
import { LOCATION_MAIN, LOCATION_SEARCH } from "../locations";
import { PRODUCTION_LINE_SEARCH } from "../production-lines";
import { ROOM_SEARCH } from "../rooms";
import { WORKING_AREA_SEARCH } from "../working-areas";
import { WORKSTATION_TEMPLATE_SEARCH } from "../workstation-templates";
import { WORKSTATION_SEARCH } from "../workstations";

type LocationTabContextType = {
  mainTab: string;
  locationTab: string;
  buildingTab: string;
  floorTab: string;
  workingAreaTab: string;
  roomTab: string;
  productionLineTab: string;
  workstationTab: string;
  workstationTemplateTab: string;
  setMainTab: Dispatch<SetStateAction<string>>;
  setLocationTab: Dispatch<SetStateAction<string>>;
  setBuildingTab: Dispatch<SetStateAction<string>>;
  setFloorTab: Dispatch<SetStateAction<string>>;
  setWorkingAreaTab: Dispatch<SetStateAction<string>>;
  setRoomTab: Dispatch<SetStateAction<string>>;
  setProductionLineTab: Dispatch<SetStateAction<string>>;
  setWorkstationTab: Dispatch<SetStateAction<string>>;
  setWorkstationTemplateTab: Dispatch<SetStateAction<string>>;
};

export const LocationTabContext = createContext<LocationTabContextType>({
  mainTab: LOCATION_MAIN,
  locationTab: LOCATION_SEARCH,
  buildingTab: BUILDING_SEARCH,
  floorTab: FLOOR_SEARCH,
  workingAreaTab: WORKING_AREA_SEARCH,
  roomTab: ROOM_SEARCH,
  productionLineTab: PRODUCTION_LINE_SEARCH,
  workstationTab: WORKSTATION_SEARCH,
  workstationTemplateTab: WORKSTATION_TEMPLATE_SEARCH,
  setMainTab: () => {},
  setLocationTab: () => {},
  setBuildingTab: () => {},
  setFloorTab: () => {},
  setWorkingAreaTab: () => {},
  setRoomTab: () => {},
  setProductionLineTab: () => {},
  setWorkstationTab: () => {},
  setWorkstationTemplateTab: () => {},
});

interface LocationTabContextTypeContextProviderProps {
  children: ReactNode;
}

const LocationTabContextProvider = ({ children }: LocationTabContextTypeContextProviderProps) => {
  const [mainTab, setMainTab] = useState<string>(LOCATION_MAIN);
  const [locationTab, setLocationTab] = useState<string>(LOCATION_SEARCH);
  const [buildingTab, setBuildingTab] = useState<string>(BUILDING_SEARCH);
  const [floorTab, setFloorTab] = useState<string>(FLOOR_SEARCH);
  const [workingAreaTab, setWorkingAreaTab] = useState<string>(WORKING_AREA_SEARCH);
  const [roomTab, setRoomTab] = useState<string>(ROOM_SEARCH);
  const [productionLineTab, setProductionLineTab] = useState<string>(PRODUCTION_LINE_SEARCH);
  const [workstationTab, setWorkstationTab] = useState<string>(WORKSTATION_SEARCH);
  const [workstationTemplateTab, setWorkstationTemplateTab] = useState<string>(
    WORKSTATION_TEMPLATE_SEARCH
  );

  const locationTabContextProviderProps = {
    mainTab,
    locationTab,
    buildingTab,
    floorTab,
    workingAreaTab,
    roomTab,
    productionLineTab,
    workstationTab,
    workstationTemplateTab,
    setMainTab,
    setLocationTab,
    setBuildingTab,
    setFloorTab,
    setWorkingAreaTab,
    setRoomTab,
    setProductionLineTab,
    setWorkstationTab,
    setWorkstationTemplateTab,
  };

  return (
    <LocationTabContext.Provider value={locationTabContextProviderProps}>
      {children}
    </LocationTabContext.Provider>
  );
};

export default LocationTabContextProvider;
