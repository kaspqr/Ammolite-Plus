import { AsyncThunk, createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { LocationRequest } from "@/types/api/locations-api.type";
import {
  Location,
  emptyLocation,
  Building,
  emptyBuilding,
  Floor,
  emptyFloor,
  WorkingArea,
  emptyWorkingArea,
  Room,
  emptyRoom,
  emptyProductionLine,
  ProductionLine,
  Workstation,
  emptyWorkstation,
  WorkstationTemplate,
  emptyWorkstationTemplate,
} from "@/types/domain/location.model";

import { EntityState, toSerializedError } from "@/redux/app";

import { locationService } from "@/api/location";

export interface LocationEntityState extends EntityState<Location> {
  currentLocation: Location;
  currentBuilding: Building;
  currentFloor: Floor;
  currentWorkingArea: WorkingArea;
  currentRoom: Room;
  currentProductionLine: ProductionLine;
  currentWorkstation: Workstation;
  currentWorkstationTemplate: WorkstationTemplate;
}

type PreloadLocationsAsynchThunk = AsyncThunk<
  Location[],
  undefined,
  { rejectValue: SerializedError }
>;
type CreateLocationAsynchThunk = AsyncThunk<
  Location,
  LocationRequest,
  { rejectValue: SerializedError }
>;
type UpdateLocationAsynchThunk = AsyncThunk<
  Location,
  LocationRequest,
  { rejectValue: SerializedError }
>;
type SearchLocationAsynchThunk = AsyncThunk<Location, number, { rejectValue: SerializedError }>;
type DeleteLocationsAsynchThunk = AsyncThunk<number, number, { rejectValue: SerializedError }>;

type LocationAsynchThunk =
  | SearchLocationAsynchThunk
  | DeleteLocationsAsynchThunk
  | CreateLocationAsynchThunk
  | UpdateLocationAsynchThunk
  | PreloadLocationsAsynchThunk;

const initialState: LocationEntityState = {
  error: null,
  entity: emptyLocation,
  entities: [],
  loading: false,
  currentLocation: emptyLocation,
  currentBuilding: emptyBuilding,
  currentFloor: emptyFloor,
  currentWorkingArea: emptyWorkingArea,
  currentRoom: emptyRoom,
  currentProductionLine: emptyProductionLine,
  currentWorkstation: emptyWorkstation,
  currentWorkstationTemplate: emptyWorkstationTemplate,
};

export const preloadLocations: PreloadLocationsAsynchThunk = createAsyncThunk<
  Location[],
  undefined,
  { rejectValue: SerializedError }
>("purchase-orders/preload-locations", async (_, thunkAPI): Promise<Location[]> => {
  try {
    const response: AxiosResponse = await locationService.findAllLocations();
    return response.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const searchLocationById: SearchLocationAsynchThunk = createAsyncThunk<
  Location,
  number,
  { rejectValue: SerializedError }
>("purchase-orders/search-location", async (id: number, thunkAPI): Promise<Location> => {
  try {
    const response: AxiosResponse = await locationService.getLocationById(id);
    return response.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const deleteLocation: DeleteLocationsAsynchThunk = createAsyncThunk<
  number,
  number,
  { rejectValue: SerializedError }
>("purchase-orders/delete-location", async (id: number, thunkAPI): Promise<number> => {
  try {
    await locationService.deleteLocation(id);
    return id;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const createLocation: CreateLocationAsynchThunk = createAsyncThunk<
  Location,
  LocationRequest,
  { rejectValue: SerializedError }
>("purchase-orders/create-location", async (body: LocationRequest, thunkAPI): Promise<Location> => {
  try {
    const response: AxiosResponse = await locationService.createLocation(body);
    return response.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const updateLocation: UpdateLocationAsynchThunk = createAsyncThunk<
  Location,
  LocationRequest,
  { rejectValue: SerializedError }
>("purchase-orders/updateLocation", async (body: LocationRequest, thunkAPI): Promise<Location> => {
  try {
    const response: AxiosResponse = await locationService.updateLocation(body);
    return response.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const locationSlice = createSlice({
  name: "locations",
  initialState: initialState,
  reducers: {
    locationResetMessages: state => {
      state.error = null;
      state.loading = false;
      state.entity = emptyLocation;
      state.entities = [];
      state.currentBuilding = emptyBuilding;
      state.currentLocation = emptyLocation;
      state.currentWorkingArea = emptyWorkingArea;
      state.currentRoom = emptyRoom;
      state.currentProductionLine = emptyProductionLine;
      state.currentWorkstation = emptyWorkstation;
      state.currentWorkstationTemplate = emptyWorkstationTemplate;
    },
    switchCurrentLocationTo: (state, { payload }) => {
      const newLocation: Location = payload;
      state.currentLocation = newLocation;
    },
    switchCurrentBuildingTo: (state, { payload }) => {
      const newBuilding: Building = payload;
      const newBuildingLocation: Location =
        state.entities.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentBuilding = newBuilding;
      state.currentLocation = newBuildingLocation;
    },
    switchCurrentFloorTo: (state, { payload }) => {
      const newFloor: Floor = payload;
      const newBuilding: Building =
        state.entities
          .flatMap(location => location.buildings)
          .find(building => building.id === newFloor.building) || emptyBuilding;
      const newLocation: Location =
        state.entities.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentFloor = newFloor;
      state.currentBuilding = newBuilding;
      state.currentLocation = newLocation;
    },
    switchCurrentWorkingAreaTo: (state, { payload }) => {
      const newWorkingArea: WorkingArea = payload;
      const locations: Location[] = state.entities;
      const buildings: Building[] = locations.flatMap(location => location.buildings);
      const floors: Floor[] = buildings.flatMap(building => building.floors);
      const newFloor: Floor = floors.find(floor => floor.id === newWorkingArea.floor) || emptyFloor;
      const newBuilding: Building =
        buildings.find(building => building.id === newFloor.building) || emptyBuilding;
      const newLocation: Location =
        locations.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentWorkingArea = newWorkingArea;
      state.currentFloor = newFloor;
      state.currentBuilding = newBuilding;
      state.currentLocation = newLocation;
    },
    switchCurrentRoomTo: (state, { payload }) => {
      const newRoom: Room = payload;
      const locations: Location[] = state.entities;
      const buildings: Building[] = locations.flatMap(location => location.buildings);
      const floors: Floor[] = buildings.flatMap(building => building.floors);
      const newFloor: Floor = floors.find(floor => floor.id === newRoom.floor) || emptyFloor;
      const newBuilding: Building =
        buildings.find(building => building.id === newFloor.building) || emptyBuilding;
      const newLocation: Location =
        locations.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentRoom = newRoom;
      state.currentFloor = newFloor;
      state.currentBuilding = newBuilding;
      state.currentLocation = newLocation;
    },
    switchCurrentProductionLineTo: (state, { payload }) => {
      const newProductionLine: ProductionLine = payload;
      const locations: Location[] = state.entities;
      const buildings: Building[] = locations.flatMap(location => location.buildings);
      const floors: Floor[] = buildings.flatMap(building => building.floors);
      const workingAreas: WorkingArea[] = floors.flatMap(floor => floor.workingAreas);
      const newWorkingArea: WorkingArea =
        workingAreas.find(workingArea => workingArea.productionLine?.id === newProductionLine.id) ||
        emptyWorkingArea;
      const newFloor: Floor = floors.find(floor => floor.id === newWorkingArea.floor) || emptyFloor;
      const newBuilding: Building =
        buildings.find(building => building.id === newFloor.building) || emptyBuilding;
      const newLocation: Location =
        locations.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentProductionLine = newProductionLine;
      state.currentWorkingArea = newWorkingArea;
      state.currentFloor = newFloor;
      state.currentBuilding = newBuilding;
      state.currentLocation = newLocation;
    },
    switchCurrentWorkstationTo: (state, { payload }) => {
      const newWorkstation: Workstation = payload;
      const locations: Location[] = state.entities;
      const buildings: Building[] = locations.flatMap(location => location.buildings);
      const floors: Floor[] = buildings.flatMap(building => building.floors);
      const workingAreas: WorkingArea[] = floors.flatMap(floor => floor.workingAreas);
      const productionLines: ProductionLine[] = [];
      workingAreas.forEach(workingArea => {
        if (workingArea.productionLine) productionLines.push(workingArea.productionLine);
      });
      const newProductionLine =
        productionLines.find(
          productionLine => productionLine.id === newWorkstation.productionLine
        ) || emptyProductionLine;
      const newWorkingArea: WorkingArea =
        workingAreas.find(workingArea => workingArea.productionLine?.id === newProductionLine.id) ||
        emptyWorkingArea;
      const newFloor: Floor = floors.find(floor => floor.id === newWorkingArea.floor) || emptyFloor;
      const newBuilding: Building =
        buildings.find(building => building.id === newFloor.building) || emptyBuilding;
      const newLocation: Location =
        locations.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentWorkstation = newWorkstation;
      state.currentProductionLine = newProductionLine;
      state.currentWorkingArea = newWorkingArea;
      state.currentFloor = newFloor;
      state.currentBuilding = newBuilding;
      state.currentLocation = newLocation;
    },
    switchCurrentWorkstationTemplateTo: (state, { payload }) => {
      const newWorkstationTemplate: WorkstationTemplate = payload;
      const locations: Location[] = state.entities;
      const buildings: Building[] = locations.flatMap(location => location.buildings);
      const floors: Floor[] = buildings.flatMap(building => building.floors);
      const workingAreas: WorkingArea[] = floors.flatMap(floor => floor.workingAreas);
      const productionLines: ProductionLine[] = [];
      workingAreas.forEach(workingArea => {
        if (workingArea.productionLine) productionLines.push(workingArea.productionLine);
      });
      const newProductionLine =
        productionLines.find(
          productionLine => productionLine.id === newWorkstationTemplate.productionLine
        ) || emptyProductionLine;
      const newWorkingArea: WorkingArea =
        workingAreas.find(workingArea => workingArea.productionLine?.id === newProductionLine.id) ||
        emptyWorkingArea;
      const newFloor: Floor = floors.find(floor => floor.id === newWorkingArea.floor) || emptyFloor;
      const newBuilding: Building =
        buildings.find(building => building.id === newFloor.building) || emptyBuilding;
      const newLocation: Location =
        locations.find(location => location.id === newBuilding.location) || emptyLocation;
      state.currentWorkstationTemplate = newWorkstationTemplate;
      state.currentProductionLine = newProductionLine;
      state.currentWorkingArea = newWorkingArea;
      state.currentFloor = newFloor;
      state.currentBuilding = newBuilding;
      state.currentLocation = newLocation;
    },
  },
  extraReducers: builder => {
    [searchLocationById, deleteLocation, createLocation, updateLocation, preloadLocations].forEach(
      (thunk: LocationAsynchThunk) => {
        builder.addCase(thunk.pending, state => {
          state.error = null;
          state.loading = true;
        });

        builder.addCase(thunk.rejected, (state, action) => {
          state.error = action.payload as SerializedError;
          state.loading = false;
        });
      }
    );
    builder.addCase(preloadLocations.fulfilled, (state, action) => {
      state.entities = action.payload as Location[];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(searchLocationById.fulfilled, (state, action) => {
      state.entity = action.payload as Location;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteLocation.fulfilled, (state, action) => {
      state.entities = state.entities.filter(location => location.id !== action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createLocation.fulfilled, (state, action) => {
      state.entities = [...state.entities, action.payload];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      const otherLocations = state.entities.filter(location => location.id !== action.payload.id);
      state.entities = [...otherLocations, action.payload];
      state.loading = false;
      state.error = null;
    });
  },
});

export const locationActions = locationSlice.actions;

export const {
  switchCurrentBuildingTo,
  switchCurrentLocationTo,
  switchCurrentFloorTo,
  switchCurrentWorkingAreaTo,
  switchCurrentRoomTo,
  switchCurrentProductionLineTo,
  switchCurrentWorkstationTo,
  switchCurrentWorkstationTemplateTo,
} = locationSlice.actions;
