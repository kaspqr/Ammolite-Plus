import { Location } from "@/types/domain/location.model";

interface Props {
  locations: Location[];
}

export const usePercentagesData = ({ locations }: Props) => {
  const allUses = locations.flatMap(location => location.use);
  const useCounts: { [key: string]: number } = {};
  allUses.forEach(use => (useCounts[use] = (useCounts[use] || 0) + 1));
  const totalUses = allUses.length;
  const usePercentages: { [key: string]: number } = {};
  Object.keys(useCounts).forEach(use => {
    usePercentages[use] = (useCounts[use] / totalUses) * 100;
  });
  const usePercentagesValues = Object.values(usePercentages);
  const usePercentagesKeys = Object.keys(usePercentages);
  return { usePercentagesValues, usePercentagesKeys };
};

export const ownerPercentagesData = ({ locations }: Props) => {
  const allOwners = locations.map(location => location.owner);
  const ownerCounts: { [key: string]: number } = {};
  allOwners.forEach(owner => (ownerCounts[owner] = (ownerCounts[owner] || 0) + 1));
  const totalOwners = allOwners.length;
  const ownerPercentages: { [key: string]: number } = {};
  Object.keys(ownerCounts).forEach(owner => {
    ownerPercentages[owner] = (ownerCounts[owner] / totalOwners) * 100;
  });
  const ownerPercentagesValues = Object.values(ownerPercentages);
  const ownerPercentagesKeys = Object.keys(ownerPercentages);
  return { ownerPercentagesValues, ownerPercentagesKeys };
};

export const surfaceByUseData = ({ locations }: Props) => {
  const totalSquareMetersByUse: { [key: string]: number } = {};
  locations.forEach(location => {
    location.buildings.forEach(building => {
      building.floors.forEach(floor => {
        if (floor.surface) {
          floor.use.forEach(use => {
            totalSquareMetersByUse[use] = (totalSquareMetersByUse[use] || 0) + floor.surface!;
          });
        }
      });
    });
  });
  Object.keys(totalSquareMetersByUse).forEach(use => {
    if (totalSquareMetersByUse[use] === undefined) delete totalSquareMetersByUse[use];
  });
  const useSurfaceValues = Object.values(totalSquareMetersByUse);
  const useSurfaceKeys = Object.keys(totalSquareMetersByUse);
  return { useSurfaceValues, useSurfaceKeys };
};

export const surfaceByOwnerData = ({ locations }: Props) => {
  const totalSquareMetersByOwnership: { [key: string]: number } = {};
  locations.forEach(location => {
    location.buildings.forEach(building => {
      building.floors.forEach(floor => {
        if (floor.surface) {
          totalSquareMetersByOwnership[location.owner] =
            (totalSquareMetersByOwnership[location.owner] || 0) + floor.surface!;
        }
      });
    });
  });
  Object.keys(totalSquareMetersByOwnership).forEach(ownership => {
    if (totalSquareMetersByOwnership[ownership] === undefined) {
      delete totalSquareMetersByOwnership[ownership];
    }
  });
  const ownerSurfaceValues = Object.values(totalSquareMetersByOwnership);
  const ownerSurfaceKeys = Object.keys(totalSquareMetersByOwnership);
  return { ownerSurfaceValues, ownerSurfaceKeys };
};

export const getLocationsMapData = ({ locations }: Props) => {
  const locationsMapData: { [key: string]: number } = {};

  locations.forEach(location => {
    const countryIso2 = location.address.country.iso2;
    locationsMapData[countryIso2] = (locationsMapData[countryIso2] || 0) + 1;
  });

  const mapDataArray = Object.entries(locationsMapData).map(([country, value]) => ({
    country,
    value,
  }));

  return mapDataArray;
};
