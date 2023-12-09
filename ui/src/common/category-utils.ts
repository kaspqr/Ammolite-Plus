import { BusinessUnit } from "@/types/domain/business-unit.model";
import { Category } from "@/types/domain/common.model";
import { Country } from "@/types/domain/country.model";
import { Department } from "@/types/domain/department.model";
import { Group } from "@/types/domain/group-model.type";
import { JobTitle } from "@/types/domain/job-title.model";
import {
  Building,
  Floor,
  Location,
  ProductionLine,
  WorkingArea,
} from "@/types/domain/location.model";
import { Team } from "@/types/domain/team.model";
import { SelectOption } from "@/types/ui/common-ui";

import { SELECT_ALL } from "@/common/consts";

const categoryAsSelectionOptions = (data: Category[], mandatory: boolean): SelectOption[] => {
  const categorySelectionOptions = data.map(record => {
    return { value: `${record.id}`, label: record.name };
  });
  return mandatory ? categorySelectionOptions : [SELECT_ALL, ...categorySelectionOptions];
};

export const businessUnitsDataAsSelectOptions = (data: BusinessUnit[]): SelectOption[] => {
  return categoryAsSelectionOptions(data, false);
};

export const groupDataAsSelectOptions = (data: Group[]): SelectOption[] => {
  return categoryAsSelectionOptions(data, false);
};

export const jobTitlesDataAsSelectOptions = (data: JobTitle[]): SelectOption[] => {
  return categoryAsSelectionOptions(data, false);
};

export const teamDataAsSelectOptions = (data: Team[]): SelectOption[] => {
  return categoryAsSelectionOptions(data, false);
};

export const departmentDataAsSelectOptions = (data: Department[]): SelectOption[] => {
  return categoryAsSelectionOptions(data, false);
};

export const countriesDataAsSelectOptions = (
  data: Country[],
  mandatory: boolean
): SelectOption[] => {
  return categoryAsSelectionOptions(data, mandatory);
};

export const stringAsSelectOption = (label: string): SelectOption => {
  if (label === "") return { value: label, label: "Select..." };
  return { value: label, label: label };
};

export const locationObjectAsSelectOption = (
  object: Location | Building | Floor | WorkingArea | ProductionLine,
  label: string
): SelectOption => {
  return { value: object.id + "", label: label };
};

// export const countriesDataAsSelectOptions = (countriesData: Country[]): SelectOption[] => {
//   const countryOptions = countriesData.map(country => {
//     return { value: `${country.code3}`, label: country.name };
//   });
//   return [SELECT_ALL, ...countryOptions];
// };
