import WorldMap from "react-svg-worldmap";

import { Location } from "@/types/domain/location.model";

import { getLocationsMapData } from "./utils";

interface Props {
  locations: Location[];
}

const MapChart = ({ locations }: Props) => {
  const data = getLocationsMapData({ locations });

  return <WorldMap color="green" value-suffix="locations" size="xl" data={data} />;
};

export default MapChart;
