import { Location, Address, LocationUse, Building } from "../domain/location.model";

export interface LocationRequest extends Location {
  id: number;
  title: string;
  address: Address;
  owner: string;
  includeMapCoordinates: boolean;
  latitude?: string;
  longitude?: string;
  use: LocationUse[];
  buildings: Building[];
}
