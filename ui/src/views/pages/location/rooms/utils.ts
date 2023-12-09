import { Floor, Building, Location, Room, LocationUse } from "@/types/domain/location.model";

import { handleEditFloor } from "../floors";
import { generateNumericId } from "../utils";

type Props = {
  room: Room;
  floor: Floor;
  building: Building;
  location: Location;
};

type CodeProps = {
  floor: Floor;
  room: Room;
};

export const handleToggleRoomActive = ({ room, floor, building, location }: Props) => {
  const otherRooms: Room[] = floor.rooms.filter(floorRoom => floorRoom.id !== room.id);
  const updatedRoom: Room = { ...room, active: !room.active };
  const updatedFloor: Floor = { ...floor, rooms: [...otherRooms, updatedRoom] };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  const result = { updatedRoom, updatedLocation };
  return result;
};

export const handleEditRoom = ({ room, floor, building, location }: Props) => {
  const otherRooms: Room[] = floor.rooms.filter(floorRoom => floorRoom.id !== room.id);
  const updatedFloor: Floor = { ...floor, rooms: [...otherRooms, room] };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  return updatedLocation;
};

export const handleDeleteRoom = ({ room, floor, building, location }: Props) => {
  const updatedFloor: Floor = {
    ...floor,
    rooms: floor.rooms.filter(floorRoom => floorRoom.id !== room.id),
  };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  const result = { updatedLocation, updatedFloor };
  return result;
};

export const handleCreateRoom = ({ room, floor, building, location }: Props) => {
  const roomUse: LocationUse[] = room.use.length > 0 ? room.use : floor.use;
  const newRoom: Room = {
    ...room,
    use: roomUse,
    locationTitle: location.title,
    id: generateNumericId(),
    floor: floor.id,
  };
  const updatedFloor: Floor = {
    ...floor,
    rooms: [...floor.rooms, newRoom],
  };
  const updatedLocation = handleEditFloor({ floor: updatedFloor, building, location });
  const result = { updatedLocation, updatedFloor };
  return result;
};

export const validateNewCode = ({ floor, room }: CodeProps) => {
  const floorRoomCodes = floor.rooms.flatMap(floorRoom => floorRoom.code);
  const codeAvailable = !floorRoomCodes.includes(room.code);
  return codeAvailable;
};

export const validateExistingCode = ({ floor, room }: CodeProps) => {
  const otherRooms = floor.rooms.filter(floorRoom => floorRoom.id !== room.id);
  const otherFloorRoomCodes = otherRooms.flatMap(floorRoom => floorRoom.code);
  const codeAvailable = !otherFloorRoomCodes.includes(room.code);
  return codeAvailable;
};
