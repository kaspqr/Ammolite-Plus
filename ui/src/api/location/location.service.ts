import { Location } from "@/types/domain/location.model";

import { httpCommon, LOCATION_ROUTE } from "@/api";

const findAllLocations = () => httpCommon.get(`${LOCATION_ROUTE}`);

const getLocationById = (id: number) => httpCommon.get(`${LOCATION_ROUTE}/${id}`);

const updateLocation = (partialLocation: Partial<Location>) => {
  const { id } = partialLocation;
  return httpCommon.put(`${LOCATION_ROUTE}/${id}`, JSON.stringify(partialLocation));
};

const createLocation = (newLocation: Partial<Location>) => {
  return httpCommon.post(`${LOCATION_ROUTE}`, JSON.stringify(newLocation));
};

const deleteLocation = (id: number) => httpCommon.delete(`${LOCATION_ROUTE}/${id}`);

export const locationService = {
  findAllLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
};
