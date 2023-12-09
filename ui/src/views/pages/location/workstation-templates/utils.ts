import {
  Building,
  Floor,
  Location,
  ProductionLine,
  WorkingArea,
  WorkstationTemplate,
} from "@/types/domain/location.model";

import { handleEditProductionLine } from "../production-lines/utils";
import { generateNumericId } from "../utils";

type Props = {
  workstationTemplate: WorkstationTemplate;
  productionLine: ProductionLine;
  workingArea: WorkingArea;
  floor: Floor;
  building: Building;
  location: Location;
};

export const handleCreateWorkstationTemplate = ({
  workstationTemplate,
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const newWorkstationTemplate: WorkstationTemplate = {
    ...workstationTemplate,
    id: generateNumericId(),
    productionLine: productionLine.id,
  };
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    workstationTemplate: newWorkstationTemplate,
  };
  const updatedLocation = handleEditProductionLine({
    productionLine: updatedProductionLine,
    workingArea,
    floor,
    building,
    location,
  });
  const result = { updatedProductionLine, updatedLocation };
  return result;
};

export const handleEditWorkstationTemplate = ({
  workstationTemplate,
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    workstationTemplate,
  };

  const updatedLocation = handleEditProductionLine({
    productionLine: updatedProductionLine,
    workingArea,
    floor,
    building,
    location,
  });
  return updatedLocation;
};

export const handleDeleteWorkstationTemplate = ({
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    workstationTemplate: undefined,
  };
  const updatedLocation = handleEditProductionLine({
    productionLine: updatedProductionLine,
    workingArea,
    floor,
    building,
    location,
  });
  return updatedLocation;
};
