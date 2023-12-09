import FloorDetailsTabContextProvider from "./context/FloorDetailsTabContext";
import FloorInternalPanel from "./FloorDetailsInternal";

const FloorPanel = () => {
  return (
    <FloorDetailsTabContextProvider>
      <FloorInternalPanel />
    </FloorDetailsTabContextProvider>
  );
};

export default FloorPanel;
