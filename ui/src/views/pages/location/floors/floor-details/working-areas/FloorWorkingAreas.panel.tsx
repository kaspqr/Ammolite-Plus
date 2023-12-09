import { useEffect, useState, MouseEvent, useContext } from "react";

import { Button, Card, Col, Row } from "reactstrap";

import { WorkingArea } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentFloor } from "@/redux/features/location/location.selectors";
import { switchCurrentWorkingAreaTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import {
  WORKING_AREA_CREATE,
  WORKING_AREA_DETAILS,
  WORKING_AREA_MAIN,
} from "../../../working-areas";
import { workingAreasTableColumns } from "../../../working-areas/search-working-areas/WorkingAreas.table";

const FloorWorkingAreasPanel = () => {
  const dispatch = useAppDispatch();
  const currentFloor = useAppSelector(selectCurrentFloor);
  const [floor, setFloor] = useState(currentFloor);

  const { setWorkingAreaTab, setMainTab } = useContext(LocationTabContext);

  useEffect(() => {
    setFloor(currentFloor);
  }, [currentFloor]);

  const onViewWorkingAreaDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const workingAreaToView: WorkingArea | undefined = floor.workingAreas.find(
      workingArea => workingArea.id === +id
    );
    if (workingAreaToView) {
      dispatch(switchCurrentWorkingAreaTo(workingAreaToView));
      setWorkingAreaTab(WORKING_AREA_DETAILS);
      setMainTab(WORKING_AREA_MAIN);
    } else {
      alerts.errorAlert(`Working Area with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <>
      <h6 className="heading m-4">Working Areas</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col className="text-right mb-4">
            <Button
              onClick={() => {
                setWorkingAreaTab(WORKING_AREA_CREATE);
                setMainTab(WORKING_AREA_MAIN);
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
          data={floor.workingAreas || []}
          columns={workingAreasTableColumns({
            onDetailsButtonClick: onViewWorkingAreaDetails,
          })}
        />
      </Card>
    </>
  );
};

export default FloorWorkingAreasPanel;
