import LocationDetailsTabContextProvider from "./context/LocationDetailsTabContext";
import LocationInternalPanel from "./LocationDetailsInternal";

const LocationPanel = () => {
  return (
    <LocationDetailsTabContextProvider>
      <LocationInternalPanel />
    </LocationDetailsTabContextProvider>
  );
};

export default LocationPanel;
