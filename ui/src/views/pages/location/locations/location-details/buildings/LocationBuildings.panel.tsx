import { useEffect, useState, MouseEvent, useContext } from "react";

import { Button, Card, Col, Row } from "reactstrap";

import { Building } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentLocation } from "@/redux/features/location/location.selectors";
import { switchCurrentBuildingTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { BUILDING_CREATE, BUILDING_DETAILS, BUILDING_MAIN } from "../../../buildings";
import { buildingsTableColumns } from "../../../buildings/search-buildings/Buildings.table";
import { LocationTabContext } from "../../../context/LocationTabContext";

const LocationBuildingsPanel = () => {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector(selectCurrentLocation);

  const { setBuildingTab, setMainTab } = useContext(LocationTabContext);

  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  const onViewBuildingDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const buildingToView: Building | undefined = location.buildings.find(
      building => building.id === +id
    );
    if (buildingToView) {
      dispatch(switchCurrentBuildingTo(buildingToView));
      setBuildingTab(BUILDING_DETAILS);
      setMainTab(BUILDING_MAIN);
    } else {
      alerts.errorAlert(`Building with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <>
      <h6 className="heading m-4">Buildings</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col className="text-right mb-4">
            <Button
              onClick={() => {
                setBuildingTab(BUILDING_CREATE);
                setMainTab(BUILDING_MAIN);
              }}
              className="btn btn-success"
              color="primary"
              size="sm"
              type="button"
            >
              New
            </Button>
          </Col>
        </Row>
        <ReactTable
          data={location.buildings || []}
          columns={buildingsTableColumns({
            onDetailsButtonClick: onViewBuildingDetails,
          })}
        />
      </Card>
    </>
  );
};

export default LocationBuildingsPanel;
