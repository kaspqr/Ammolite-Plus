import { Floor, Building, Location, WorkingArea, LocationUse } from "@/types/domain/location.model";

import { handleEditFloor } from "../floors";
import { generateNumericId } from "../utils";

type Props = {
  workingArea: WorkingArea;
  floor: Floor;
  building: Building;
  location: Location;
};

type CodeProps = {
  floor: Floor;
  workingArea: WorkingArea;
};

export const handleToggleWorkingAreaActive = ({
  workingArea,
  floor,
  building,
  location,
}: Props) => {
  const otherWorkingAreas: WorkingArea[] = floor.workingAreas.filter(
    floorWorkingArea => floorWorkingArea.id !== workingArea.id
  );
  const updatedWorkingArea: WorkingArea = { ...workingArea, active: !workingArea.active };
  const updatedFloor: Floor = {
    ...floor,
    workingAreas: [...otherWorkingAreas, updatedWorkingArea],
  };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  const result = { updatedWorkingArea, updatedLocation };
  return result;
};

export const handleEditWorkingArea = ({ workingArea, floor, building, location }: Props) => {
  const otherWorkingAreas: WorkingArea[] = floor.workingAreas.filter(
    floorWorkingArea => floorWorkingArea.id !== workingArea.id
  );
  const updatedFloor: Floor = { ...floor, workingAreas: [...otherWorkingAreas, workingArea] };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  return updatedLocation;
};

export const handleDeleteWorkingArea = ({ workingArea, floor, building, location }: Props) => {
  const updatedFloor: Floor = {
    ...floor,
    workingAreas: floor.workingAreas.filter(
      floorWorkingArea => floorWorkingArea.id !== workingArea.id
    ),
  };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  const result = { updatedLocation, updatedFloor };
  return result;
};

export const handleCreateWorkingArea = ({ workingArea, floor, building, location }: Props) => {
  const workingAreaUse: LocationUse[] = workingArea.use.length > 0 ? workingArea.use : floor.use;
  const newWorkingArea: WorkingArea = {
    ...workingArea,
    use: workingAreaUse,
    locationTitle: location.title,
    id: generateNumericId(),
    floor: floor.id,
  };
  const updatedFloor: Floor = {
    ...floor,
    workingAreas: [...floor.workingAreas, newWorkingArea],
  };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  const result = { updatedLocation, updatedFloor };
  return result;
};

export const validateNewCode = ({ floor, workingArea }: CodeProps) => {
  const floorWorkingAreaCodes = floor.workingAreas.flatMap(
    floorWorkingArea => floorWorkingArea.code
  );
  const codeAvailable = !floorWorkingAreaCodes.includes(workingArea.code);
  return codeAvailable;
};

export const validateExistingCode = ({ floor, workingArea }: CodeProps) => {
  const otherWorkingAreas = floor.workingAreas.filter(
    floorWorkingArea => floorWorkingArea.id !== workingArea.id
  );
  const otherFloorWorkingAreaCodes = otherWorkingAreas.flatMap(
    floorWorkingArea => floorWorkingArea.code
  );
  const codeAvailable = !otherFloorWorkingAreaCodes.includes(workingArea.code);
  return codeAvailable;
};
