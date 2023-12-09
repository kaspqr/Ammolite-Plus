import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

import { PRODUCTION_LINE_DETAILS_MAIN } from "../production-line-details.routes.const";

type ProductionLineDetailsTabContextType = {
  detailsProductionLineTab: string;
  setDetailsProductionLineTab: Dispatch<SetStateAction<string>>;
};

export const ProductionLineDetailsTabContext = createContext<ProductionLineDetailsTabContextType>({
  detailsProductionLineTab: PRODUCTION_LINE_DETAILS_MAIN,
  setDetailsProductionLineTab: () => {},
});

interface ProductionLineDetailsTabContextTypeContextProviderProps {
  children: ReactNode;
}

const ProductionLineDetailsTabContextProvider = ({
  children,
}: ProductionLineDetailsTabContextTypeContextProviderProps) => {
  const [detailsProductionLineTab, setDetailsProductionLineTab] = useState<string>(
    PRODUCTION_LINE_DETAILS_MAIN
  );

  const productionLineDetailsTabContextProviderProps = {
    detailsProductionLineTab,
    setDetailsProductionLineTab,
  };

  return (
    <ProductionLineDetailsTabContext.Provider value={productionLineDetailsTabContextProviderProps}>
      {children}
    </ProductionLineDetailsTabContext.Provider>
  );
};

export default ProductionLineDetailsTabContextProvider;
