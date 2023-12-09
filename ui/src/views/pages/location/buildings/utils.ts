import { Building, Location } from "@/types/domain/location.model";

import { generateNumericId } from "../utils";

type Props = {
  building: Building;
  location: Location;
};

export const handleToggleBuildingActive = ({ building, location }: Props) => {
  const otherBuildings: Building[] = location.buildings.filter(
    locationBuilding => locationBuilding.id !== building.id
  );
  const updatedBuilding: Building = { ...building, active: !building.active };
  const updatedLocation: Location = {
    ...location,
    buildings: [...otherBuildings, updatedBuilding],
  };
  const result = { updatedBuilding, updatedLocation };
  return result;
};

export const handleEditBuilding = ({ building, location }: Props) => {
  const otherBuildings: Building[] = location.buildings.filter(
    locationBuilding => locationBuilding.id !== building.id
  );
  const updatedLocation: Location = { ...location, buildings: [...otherBuildings, building] };
  return updatedLocation;
};

export const handleDeleteBuilding = ({ building, location }: Props) => {
  const updatedLocation: Location = {
    ...location,
    buildings: location.buildings.filter(locationBuilding => locationBuilding.id !== building.id),
  };
  return updatedLocation;
};

export const handleCreateBuilding = ({ building, location }: Props) => {
  const buildingAddress =
    building.streetAndNumber.length > 0
      ? building.streetAndNumber
      : location.address.streetAndNumber;
  const buildingZip = building.zip ? building.zip : location.address.zip;
  const newBuilding: Building = {
    ...building,
    id: generateNumericId(),
    streetAndNumber: buildingAddress,
    zip: buildingZip,
    location: location.id,
  };
  const updatedLocation: Location = {
    ...location,
    buildings: [...location.buildings, newBuilding],
  };
  return updatedLocation;
};
