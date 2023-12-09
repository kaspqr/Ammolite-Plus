import { Floor, Building, Location } from "@/types/domain/location.model";

import { handleEditBuilding } from "../buildings/utils";
import { generateNumericId } from "../utils";

type Props = {
  floor: Floor;
  building: Building;
  location: Location;
};

export const handleToggleFloorActive = ({ floor, building, location }: Props) => {
  const otherFloors: Floor[] = building.floors.filter(
    buildingFloor => buildingFloor.id !== floor.id
  );
  const updatedFloor: Floor = { ...floor, active: !floor.active };
  const updatedBuilding: Building = {
    ...building,
    floors: [...otherFloors, updatedFloor],
  };
  const updatedLocation = handleEditBuilding({ building: updatedBuilding, location });
  const result = { updatedFloor, updatedLocation };
  return result;
};

export const handleEditFloor = ({ floor, building, location }: Props) => {
  const otherFloors: Floor[] = building.floors.filter(
    buildingFloor => buildingFloor.id !== floor.id
  );
  const updatedBuilding: Building = { ...building, floors: [...otherFloors, floor] };
  const updatedLocation = handleEditBuilding({ building: updatedBuilding, location });
  return updatedLocation;
};

export const handleDeleteFloor = ({ floor, building, location }: Props) => {
  const updatedBuilding: Building = {
    ...building,
    floors: building.floors.filter(buildingFloor => buildingFloor.id !== floor.id),
  };
  const updatedLocation = handleEditBuilding({ building: updatedBuilding, location });
  const result = { updatedLocation, updatedBuilding };
  return result;
};

export const handleCreateFloor = ({ floor, building, location }: Props) => {
  const floorUse = floor.use.length > 0 ? floor.use : location.use;
  const floorGates = floor.gates ? floor.gates : 1;
  const floorMeetingRooms = floor.meetingRooms ? floor.meetingRooms : 0;
  const floorToilets = floor.toilets ? floor.toilets : 1;
  const newFloor: Floor = {
    ...floor,
    use: floorUse,
    gates: floorGates,
    meetingRooms: floorMeetingRooms,
    toilets: floorToilets,
    streetAndNumber: building.streetAndNumber,
    locationTitle: location.title,
    id: generateNumericId(),
    building: building.id,
  };
  const updatedBuilding: Building = { ...building, floors: [...building.floors, newFloor] };
  const updatedLocation = handleEditBuilding({ building: updatedBuilding, location });
  const result = { updatedLocation, updatedBuilding };
  return result;
};
