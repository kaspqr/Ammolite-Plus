import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import CreateWorkingAreaPanel from "./create-working-area/CreateWorkingArea.panel";
import SearchWorkingAreasPanel from "./search-working-areas/SearchWorkingAreas.panel";
import WorkingAreaDetailsPanel from "./working-area-details/WorkingAreaDetails.panel";
import {
  WORKING_AREA_SEARCH,
  WORKING_AREA_CREATE,
  WORKING_AREA_DETAILS,
} from "./working-areas.routes.const";

const WorkingAreasPanel = () => {
  const { workingAreaTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Working Areas</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={workingAreaTab}>
            <TabPane tabId={WORKING_AREA_SEARCH}>
              <SearchWorkingAreasPanel />
            </TabPane>
            <TabPane tabId={WORKING_AREA_CREATE}>
              <CreateWorkingAreaPanel />
            </TabPane>
            <TabPane tabId={WORKING_AREA_DETAILS}>
              <WorkingAreaDetailsPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default WorkingAreasPanel;
