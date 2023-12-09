import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container, Button } from "reactstrap";

import { Workstation } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllWorkstationData } from "@/redux/features/location/location.selectors";
import { switchCurrentWorkstationTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { workstationsTableColumns } from "../tables/Workstations.table";
import {
  WORKSTATION_CHOOSE_PRODUCTION_LINE,
  WORKSTATION_DETAILS,
} from "../workstations.routes.const";

const SearchWorkstationsPanel = () => {
  const dispatch = useAppDispatch();

  const workstations: Workstation[] = useAppSelector(selectAllWorkstationData);

  const { setWorkstationTab } = useContext(LocationTabContext);

  const onViewWorkstationDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const workstationToView: Workstation | undefined = workstations.find(
      workstation => workstation.id === +id
    );

    if (workstationToView) {
      dispatch(switchCurrentWorkstationTo(workstationToView));
      setWorkstationTab(WORKSTATION_DETAILS);
    } else {
      alerts.errorAlert(`Workstation with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h3 className="mb-0">Search Workstations</h3>
              </Col>
              <Col className="text-right">
                <Button
                  className="btn btn-success"
                  color="primary"
                  size="sm"
                  type="button"
                  onClick={() => setWorkstationTab(WORKSTATION_CHOOSE_PRODUCTION_LINE)}
                >
                  New
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={workstations}
            columns={workstationsTableColumns({
              onDetailsButtonClick: onViewWorkstationDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchWorkstationsPanel;
