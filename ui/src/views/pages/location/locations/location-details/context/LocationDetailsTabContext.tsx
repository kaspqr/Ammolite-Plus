import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { LOCATION_DETAILS_MAIN } from "../location-details.routes.const";

type LocationDetailsTabContextType = {
  detailsLocationTab: string;
  setDetailsLocationTab: Dispatch<SetStateAction<string>>;
};

export const LocationDetailsTabContext = createContext<LocationDetailsTabContextType>({
  detailsLocationTab: LOCATION_DETAILS_MAIN,
  setDetailsLocationTab: () => {},
});

interface LocationDetailsTabContextTypeContextProviderProps {
  children: ReactNode;
}

const LocationDetailsTabContextProvider = ({
  children,
}: LocationDetailsTabContextTypeContextProviderProps) => {
  const [detailsLocationTab, setDetailsLocationTab] = useState<string>(LOCATION_DETAILS_MAIN);

  const locationDetailsTabContextProviderProps = {
    detailsLocationTab,
    setDetailsLocationTab,
  };

  return (
    <LocationDetailsTabContext.Provider value={locationDetailsTabContextProviderProps}>
      {children}
    </LocationDetailsTabContext.Provider>
  );
};

export default LocationDetailsTabContextProvider;
