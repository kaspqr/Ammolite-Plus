import {
  Building,
  Floor,
  Location,
  ProductionLine,
  ProductionLineType,
  WorkingArea,
} from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";

import {
  ASSEMBLY_LINE,
  MACHINING_LINE,
  productionLineAssemblyDeliverableTypes,
  productionLineMachiningLineDeliverableTypes,
  productionLineTestLineDeliverableTypes,
} from "../location.options.const";
import { generateNumericId } from "../utils";
import { handleEditWorkingArea } from "../working-areas/utils";

type Props = {
  productionLine: ProductionLine;
  workingArea: WorkingArea;
  floor: Floor;
  building: Building;
  location: Location;
};

type DeliverableProps = {
  type: ProductionLineType;
};

export const handleToggleProductionLineActive = ({
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    active: !productionLine.active,
  };
  const updatedWorkingArea: WorkingArea = {
    ...workingArea,
    productionLine: updatedProductionLine,
  };
  const updatedLocation = handleEditWorkingArea({
    workingArea: updatedWorkingArea,
    floor,
    building,
    location,
  });
  const result = { updatedProductionLine, updatedLocation };
  return result;
};

export const handleEditProductionLine = ({
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const updatedWorkingArea: WorkingArea = { ...workingArea, productionLine };
  const updatedLocation = handleEditWorkingArea({
    workingArea: updatedWorkingArea,
    floor,
    building,
    location,
  });
  return updatedLocation;
};

export const handleCreateProductionLine = ({
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const code = generateNumericId();
  const newProductionLine: ProductionLine = {
    ...productionLine,
    id: code,
    code: code + "",
    created: new Date(Date.now()).getTime(),
    workingArea: workingArea.id,
  };
  const updatedWorkingArea: WorkingArea = {
    ...workingArea,
    productionLine: newProductionLine,
  };
  const updatedLocation = handleEditWorkingArea({
    workingArea: updatedWorkingArea,
    floor,
    building,
    location,
  });
  const result = { updatedLocation, updatedWorkingArea };
  return result;
};

export const deliverableOptions = ({ type }: DeliverableProps) => {
  if (type === ASSEMBLY_LINE) {
    return productionLineAssemblyDeliverableTypes.map(deliverableType =>
      stringAsSelectOption(deliverableType)
    );
  } else if (type === MACHINING_LINE) {
    return productionLineMachiningLineDeliverableTypes.map(deliverableType =>
      stringAsSelectOption(deliverableType)
    );
  } else {
    return productionLineTestLineDeliverableTypes.map(deliverableType =>
      stringAsSelectOption(deliverableType)
    );
  }
};

export const getPLsFromBuilding = (building: Building) => {
  const newProductionLines: ProductionLine[] = [];
  const buildingWorkingAreas: WorkingArea[] = building.floors.flatMap(
    buildingFloor => buildingFloor.workingAreas
  );
  buildingWorkingAreas.forEach(buildingWorkingArea => {
    if (buildingWorkingArea.productionLine) {
      newProductionLines.push(buildingWorkingArea.productionLine);
    }
  });
  return newProductionLines;
};

export const getPLsFromLocation = (location: Location) => {
  const newProductionLines: ProductionLine[] = [];
  const locationWorkingAreas: WorkingArea[] = location.buildings.flatMap(locationBuilding =>
    locationBuilding.floors.flatMap(buildingFloor => buildingFloor.workingAreas)
  );
  locationWorkingAreas.forEach(locationWorkingArea => {
    if (locationWorkingArea.productionLine) {
      newProductionLines.push(locationWorkingArea.productionLine);
    }
  });
  return newProductionLines;
};
