import { Domain } from "./common.model";
import { Country, emptyCountry } from "./country.model";

export type ProductionLineType = "Assembly Line" | "Machining Line" | "Test Line";
export type DeliverableType = "Assembly" | "Assembly Part" | "Product" | "QA Assessment";
export type LocationUse =
  | "Warehouse"
  | "Office"
  | "Manufacturing Plant"
  | "Point of Sale (POS)"
  | "";

export interface WorkstationTemplate extends Domain {
  id: number;
  productionLine: number;
  name: string;
  code: string;
  deliverable: string[];
  capacity: number;
  tasks: Resource[];
  jobs: Resource[];
  resourceRequirements: Omit<ResourceRequirements, "computer" | "consumable">;
}

export interface Operations extends Domain {
  status: string;
  currentJob: string;
  currentMachine: string;
  completionRate: number;
}

export interface Resource extends Domain {
  id: number;
  name: string;
}

export interface ResourceRequirements extends Domain {
  materials: Resource[];
  subAssemblies: Resource[];
  technicians: Resource[];
  machines: Resource[];
  equipment: Resource[];
  energySupply: number;
  computer: Resource[];
  consumable: Resource[];
}

export interface Workstation extends Domain {
  id: number;
  name: string;
  code: string;
  productionPhase?: string;
  deliverable: string[];
  tasks: Resource[];
  jobs: Resource[];
  resourceRequirements: ResourceRequirements;
  operations: Operations;
  productionLine: number;
}

export interface Reception extends Domain {
  phone?: string;
  fax?: string;
}

export interface Coordinates extends Domain {
  x?: number;
  y?: number;
}

export interface ProductionLine extends Domain {
  id: number;
  name: string;
  code: string;
  type: ProductionLineType;
  deliverable: DeliverableType;
  capacity: number;
  workingArea: number;
  active: boolean;
  created: number;
  workstations: Workstation[];
  workstationTemplate?: WorkstationTemplate;
}

export interface WorkingArea extends Domain {
  id: number;
  floor: number;
  locationTitle?: string;
  use: LocationUse[];
  name: string;
  code: string;
  surface: number;
  pic?: string;
  jsonCoords?: Coordinates;
  active: boolean;
  productionLine?: ProductionLine;
}

export interface Room extends Domain {
  id: number;
  floor: number;
  locationTitle?: string;
  use: LocationUse[];
  name: string;
  code: string;
  surface: number;
  pic?: string;
  jsonCoords?: Coordinates;
  active: boolean;
}

export interface Floor extends Domain {
  id: number;
  building: number;
  streetAndNumber?: string;
  locationTitle?: string;
  use: LocationUse[];
  number: number;
  surface?: number;
  security: boolean;
  gates?: number;
  meetingRooms?: number;
  toilets?: number;
  active: boolean;
  workingAreas: WorkingArea[];
  rooms: Room[];
}

export interface BuildingContactPerson extends Domain {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Building extends Domain {
  id: number;
  streetAndNumber: string;
  zip?: string;
  active: boolean;
  reception?: Reception;
  securityContactPerson?: BuildingContactPerson;
  contactPerson?: BuildingContactPerson;
  location?: number;
  floors: Floor[];
}

export interface Address extends Domain {
  id?: number;
  country: Country;
  city: string;
  streetAndNumber: string;
  zip: string;
}

export interface Location extends Domain {
  id: number;
  active: boolean;
  title: string;
  address: Address;
  owner: string;
  includeMapCoordinates: boolean;
  latitude?: string;
  longitude?: string;
  use: LocationUse[];
  buildings: Building[];
}

export interface LocationQuery
  extends Omit<
    Location,
    | "firstName"
    | "lastName"
    | "companyPhone"
    | "companyMobilePhone"
    | "companyMobilePhone"
    | "gender"
    | "businessUnit"
    | "office"
    | "groups"
  > {
  lastName?: string;
  businessUnitId?: number;
  departmentId?: number;
  officeCountryId?: number;
  jobTitleId?: number;
  hiredFrom?: string;
  hiredTo?: string;
}

export const emptyAddress: Address = {
  id: 0,
  country: emptyCountry,
  city: "",
  streetAndNumber: "",
  zip: "",
};

export const emptyLocation: Location = {
  id: 0,
  active: true,
  title: "",
  address: emptyAddress,
  owner: "",
  includeMapCoordinates: false,
  latitude: "",
  longitude: "",
  use: [],
  buildings: [],
};

export const emptyBuildingContactPerson: BuildingContactPerson = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const emptyBuilding: Building = {
  id: 0,
  active: true,
  floors: [],
  streetAndNumber: "",
};

export const emptyFloor: Floor = {
  id: 0,
  building: 0,
  use: [],
  number: 0,
  security: false,
  active: true,
  workingAreas: [],
  rooms: [],
};

export const emptyWorkingArea: WorkingArea = {
  id: 0,
  floor: 0,
  use: [],
  name: "",
  code: "",
  surface: 0,
  active: true,
};

export const emptyRoom: Room = {
  id: 0,
  floor: 0,
  use: [],
  name: "",
  code: "",
  surface: 0,
  active: true,
};

export const emptyWorkstationTemplateRequirements: Omit<
  ResourceRequirements,
  "computer" | "consumable"
> = {
  materials: [],
  subAssemblies: [],
  technicians: [],
  machines: [],
  equipment: [],
  energySupply: 0,
};

export const emptyResourceRequirements: ResourceRequirements = {
  ...emptyWorkstationTemplateRequirements,
  computer: [],
  consumable: [],
};

export const emptyOperations: Operations = {
  status: "",
  currentJob: "",
  currentMachine: "",
  completionRate: 0,
};

export const emptyWorkstation: Workstation = {
  id: 0,
  name: "",
  code: "",
  productionPhase: "",
  deliverable: [],
  tasks: [],
  jobs: [],
  resourceRequirements: emptyResourceRequirements,
  operations: emptyOperations,
  productionLine: 0,
};

export const emptyWorkstationTemplate: WorkstationTemplate = {
  id: 0,
  productionLine: 0,
  name: "",
  code: "",
  deliverable: [],
  capacity: 0,
  tasks: [],
  jobs: [],
  resourceRequirements: emptyWorkstationTemplateRequirements,
};

export const emptyProductionLine: ProductionLine = {
  id: 0,
  name: "",
  code: "",
  type: "Assembly Line",
  deliverable: "Assembly",
  capacity: 0,
  workingArea: 0,
  active: true,
  created: 0,
  workstations: [],
};
