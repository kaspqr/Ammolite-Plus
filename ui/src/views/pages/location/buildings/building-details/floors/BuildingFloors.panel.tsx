import { useEffect, useState, MouseEvent, useContext } from "react";

import { Button, Card, Col, Row } from "reactstrap";

import { Floor } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentBuilding } from "@/redux/features/location/location.selectors";
import { switchCurrentFloorTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import { FLOOR_CREATE, FLOOR_DETAILS, FLOOR_MAIN } from "../../../floors";
import { floorsTableColumns } from "../../../floors/search-floors/Floors.table";

const BuildingFloorsPanel = () => {
  const dispatch = useAppDispatch();
  const currentBuilding = useAppSelector(selectCurrentBuilding);

  const { setMainTab, setFloorTab } = useContext(LocationTabContext);

  const [building, setBuilding] = useState(currentBuilding);

  useEffect(() => {
    setBuilding(currentBuilding);
  }, [currentBuilding]);

  const onViewFloorDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const floorToView: Floor | undefined = building.floors.find(floor => floor.id === +id);
    if (floorToView) {
      dispatch(switchCurrentFloorTo(floorToView));
      setFloorTab(FLOOR_DETAILS);
      setMainTab(FLOOR_MAIN);
    } else {
      alerts.errorAlert(`Building with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <>
      <h6 className="heading m-4">Floors</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col className="text-right mb-4">
            <Button
              onClick={() => {
                setFloorTab(FLOOR_CREATE);
                setMainTab(FLOOR_MAIN);
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
          data={building.floors || []}
          columns={floorsTableColumns({
            onDetailsButtonClick: onViewFloorDetails,
          })}
        />
      </Card>
    </>
  );
};

export default BuildingFloorsPanel;
