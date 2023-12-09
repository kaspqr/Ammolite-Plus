import ProductionLineDetailsTabContextProvider from "./context/ProductionLineDetailsTabContext";
import ProductionLineInternalPanel from "./ProductionLineDetailsInternal";

const ProductionLinePanel = () => {
  return (
    <ProductionLineDetailsTabContextProvider>
      <ProductionLineInternalPanel />
    </ProductionLineDetailsTabContextProvider>
  );
};

export default ProductionLinePanel;
