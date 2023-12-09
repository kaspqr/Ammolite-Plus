import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container } from "reactstrap";

import { WorkingArea } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllWorkingAreaData } from "@/redux/features/location/location.selectors";
import { switchCurrentWorkingAreaTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { WORKING_AREA_DETAILS } from "../working-areas.routes.const";

import { workingAreasTableColumns } from "./WorkingAreas.table";

const SearchWorkingAreasPanel = () => {
  const dispatch = useAppDispatch();

  const workingAreas: WorkingArea[] = useAppSelector(selectAllWorkingAreaData);

  const { setWorkingAreaTab } = useContext(LocationTabContext);

  const onViewWorkingAreaDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const workingAreaToView: WorkingArea | undefined = workingAreas.find(
      workingArea => workingArea.id === +id
    );
    if (workingAreaToView) {
      dispatch(switchCurrentWorkingAreaTo(workingAreaToView));
      setWorkingAreaTab(WORKING_AREA_DETAILS);
    } else {
      alerts.errorAlert(`Working Area with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Search Working Areas</h3>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={workingAreas}
            columns={workingAreasTableColumns({
              onDetailsButtonClick: onViewWorkingAreaDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchWorkingAreasPanel;
