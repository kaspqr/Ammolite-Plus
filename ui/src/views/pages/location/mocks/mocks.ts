import { Resource } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

export const mockMaterials: Resource[] = [
  { id: 1, name: "material 1" },
  { id: 2, name: "material 2" },
  { id: 3, name: "material 3" },
];

export const mockAssemblyParts: Resource[] = [
  { id: 1, name: "assembly part 1" },
  { id: 2, name: "assembly part 2" },
  { id: 3, name: "assembly part 3" },
];

export const mockTechnicians: Resource[] = [
  { id: 1, name: "technician 1" },
  { id: 2, name: "technician 2" },
  { id: 3, name: "technician 3" },
];

export const mockComputers: Resource[] = [
  { id: 1, name: "computer 1" },
  { id: 2, name: "computer 2" },
  { id: 3, name: "computer 3" },
];

export const mockConsumables: Resource[] = [
  { id: 1, name: "consumable 1" },
  { id: 2, name: "consumable 2" },
  { id: 3, name: "consumable 3" },
];

export const mockMachines: Resource[] = [
  { id: 1, name: "machine 1" },
  { id: 2, name: "machine 2" },
  { id: 3, name: "machine 3" },
];

export const mockEquipment: Resource[] = [
  { id: 1, name: "equipment 1" },
  { id: 2, name: "equipment 2" },
  { id: 3, name: "equipment 3" },
];

export const mockDeliverableOptions: SelectOption[] = [
  { value: "deliverable 1", label: "deliverable 1" },
  { value: "deliverable 2", label: "deliverable 2" },
  { value: "deliverable 3", label: "deliverable 3" },
];
