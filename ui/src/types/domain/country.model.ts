import { Category } from "./common.model";

export interface Country extends Category {
  iso2: string;
  iso3: string;
  number: string;
}

export const emptyCountry: Country = {
  id: 0,
  name: "",
  iso2: "",
  iso3: "",
  number: "",
};
