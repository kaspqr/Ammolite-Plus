import {
  Building,
  Floor,
  Location,
  ProductionLine,
  WorkingArea,
  Workstation,
} from "@/types/domain/location.model";

import { handleEditProductionLine } from "../production-lines/utils";
import { generateNumericId } from "../utils";

type Props = {
  workstation: Workstation;
  productionLine: ProductionLine;
  workingArea: WorkingArea;
  floor: Floor;
  building: Building;
  location: Location;
};

export const handleCreateWorkstation = ({
  workstation,
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const newWorkstation: Workstation = {
    ...workstation,
    id: generateNumericId(),
    productionLine: productionLine.id,
  };
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    workstations: [...productionLine.workstations, newWorkstation],
  };
  const updatedLocation = handleEditProductionLine({
    productionLine: updatedProductionLine,
    workingArea,
    floor,
    building,
    location,
  });
  const result = { updatedLocation };
  return result;
};

export const handleEditWorkstation = ({
  workstation,
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const otherWorkstations: Workstation[] = productionLine.workstations.filter(
    ws => ws.id !== workstation.id
  );
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    workstations: [...otherWorkstations, workstation],
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

export const handleDeleteWorkstation = ({
  workstation,
  productionLine,
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const updatedProductionLine: ProductionLine = {
    ...productionLine,
    workstations: productionLine.workstations.filter(ws => ws.id !== workstation.id),
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
