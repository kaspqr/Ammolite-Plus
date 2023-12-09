import { createSelector } from "reselect";

import {
  Location,
  Building,
  Floor,
  WorkingArea,
  Room,
  ProductionLine,
  Workstation,
  WorkstationTemplate,
} from "@/types/domain/location.model";

import { RootState } from "@/redux/app";

import { LocationEntityState } from "./location.slice";

export const selectLocationsState = (rootState: RootState): LocationEntityState =>
  rootState.locations;

export const selectAllLocationData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Location[] => locationState.entities
);

export const selectAllBuildingData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Building[] =>
    locationState.entities.flatMap(location => location.buildings)
);

export const selectAllFloorData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Floor[] =>
    locationState.entities.flatMap(location =>
      location.buildings.flatMap(building => building.floors)
    )
);

export const selectAllRoomData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Room[] =>
    locationState.entities.flatMap(location =>
      location.buildings.flatMap(building => building.floors.flatMap(floor => floor.rooms))
    )
);

export const selectAllWorkingAreaData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): WorkingArea[] =>
    locationState.entities.flatMap(location =>
      location.buildings.flatMap(building => building.floors.flatMap(floor => floor.workingAreas))
    )
);

export const selectAllProductionLineData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): ProductionLine[] => {
    const workingAreas: WorkingArea[] = locationState.entities.flatMap(location =>
      location.buildings.flatMap(building => building.floors.flatMap(floor => floor.workingAreas))
    );
    const productionLines: ProductionLine[] = [];
    workingAreas.forEach(workingArea => {
      if (workingArea.productionLine) productionLines.push(workingArea.productionLine);
    });
    return productionLines;
  }
);

export const selectAllWorkstationData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Workstation[] => {
    const workingAreas: WorkingArea[] = locationState.entities.flatMap(location =>
      location.buildings.flatMap(building => building.floors.flatMap(floor => floor.workingAreas))
    );
    const productionLines: ProductionLine[] = [];
    workingAreas.forEach(workingArea => {
      if (workingArea.productionLine) productionLines.push(workingArea.productionLine);
    });
    const workstations: Workstation[] = productionLines.flatMap(
      productionLine => productionLine.workstations
    );
    return workstations;
  }
);

export const selectAllWorkstationTemplateData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): WorkstationTemplate[] => {
    const workingAreas: WorkingArea[] = locationState.entities.flatMap(location =>
      location.buildings.flatMap(building => building.floors.flatMap(floor => floor.workingAreas))
    );
    const workstationTemplates: WorkstationTemplate[] = [];
    workingAreas.forEach(workingArea => {
      if (workingArea.productionLine?.workstationTemplate) {
        workstationTemplates.push(workingArea.productionLine.workstationTemplate);
      }
    });
    return workstationTemplates;
  }
);

export const selectUpdatedLocationData = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Location | null => locationState.entity
);

export const selectLocationById = (id: number | null) =>
  createSelector([selectAllLocationData], (locationsData: Location[]): Location | null => {
    const found: Location | undefined = locationsData.find(location => location.id === id);
    return found ? found : null;
  });

export const selectCurrentLocation = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Location => locationState.currentLocation
);

export const selectCurrentBuilding = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Building => locationState.currentBuilding
);

export const selectCurrentFloor = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Floor => locationState.currentFloor
);

export const selectCurrentWorkingArea = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): WorkingArea => locationState.currentWorkingArea
);

export const selectCurrentRoom = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Room => locationState.currentRoom
);

export const selectCurrentProductionLine = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): ProductionLine => locationState.currentProductionLine
);

export const selectCurrentWorkstation = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): Workstation => locationState.currentWorkstation
);

export const selectCurrentWorkstationTemplate = createSelector(
  [selectLocationsState],
  (locationState: LocationEntityState): WorkstationTemplate =>
    locationState.currentWorkstationTemplate
);
