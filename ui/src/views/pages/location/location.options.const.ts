import { DeliverableType, LocationUse, ProductionLineType } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { stringAsSelectOption } from "@/common/category-utils";

export const owners: string[] = ["Our Premises", "Registered Partner Company"];
export const ASSEMBLY_LINE = "Assembly Line";
export const MACHINING_LINE = "Machining Line";
export const TEST_LINE = "Test Line";
export const uses: LocationUse[] = [
  "Warehouse",
  "Office",
  "Manufacturing Plant",
  "Point of Sale (POS)",
];
export const productionLineTypes: ProductionLineType[] = [ASSEMBLY_LINE, MACHINING_LINE, TEST_LINE];
export const productionLineDeliverables: DeliverableType[] = [
  "Assembly",
  "Assembly Part",
  "Product",
  "QA Assessment",
];
export const productionLineAssemblyDeliverableTypes: DeliverableType[] = [
  "Assembly",
  "Assembly Part",
];
export const productionLineMachiningLineDeliverableTypes: DeliverableType[] = ["Product"];
export const productionLineTestLineDeliverableTypes: DeliverableType[] = ["QA Assessment"];

export const useOptions: SelectOption[] = uses.map(use => stringAsSelectOption(use));
export const ownershipOptions: SelectOption[] = owners.map(owner => stringAsSelectOption(owner));

export const productionLineTypeOptions: SelectOption[] = productionLineTypes.map(
  productionLineType => stringAsSelectOption(productionLineType)
);

export const PLDeliverableOptions: SelectOption[] = productionLineDeliverables.map(
  productionLineDeliverable => stringAsSelectOption(productionLineDeliverable)
);

export const PLAssemblyDeliverableOptions: SelectOption[] =
  productionLineAssemblyDeliverableTypes.map(type => stringAsSelectOption(type));

export const PLMachiningLineDeliverableOptions: SelectOption[] =
  productionLineMachiningLineDeliverableTypes.map(type => stringAsSelectOption(type));

export const PLTestLineDeliverableOptions: SelectOption[] =
  productionLineTestLineDeliverableTypes.map(type => stringAsSelectOption(type));
