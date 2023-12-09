import BuildingInternalPanel from "./BuildingDetailsInternal";
import BuildingDetailsTabContextProvider from "./context/BuildingDetailsTabContext";

const BuildingPanel = () => {
  return (
    <BuildingDetailsTabContextProvider>
      <BuildingInternalPanel />
    </BuildingDetailsTabContextProvider>
  );
};

export default BuildingPanel;
