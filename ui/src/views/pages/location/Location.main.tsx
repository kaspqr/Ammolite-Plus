import LocationTabContextProvider from "./context/LocationTabContext";
import { LocationPageInternal } from "./LocationInternal.main";

export const LocationPage = () => {
  return (
    <LocationTabContextProvider>
      <LocationPageInternal />
    </LocationTabContextProvider>
  );
};
