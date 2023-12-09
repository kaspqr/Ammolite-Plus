import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import ChooseProductionLinePanel from "./create-workstations/ChooseProductionLine.panel";
import CreateWorkstationPanel from "./create-workstations/CreateWorkstation.panel";
import SearchWorkstationsPanel from "./search-workstations/SearchWorkstations.panel";
import WorkstationDetailsPanel from "./workstation-details/WorkstationDetails.panel";
import {
  WORKSTATION_CHOOSE_PRODUCTION_LINE,
  WORKSTATION_CREATE,
  WORKSTATION_DETAILS,
  WORKSTATION_SEARCH,
} from "./workstations.routes.const";

const WorkstationsPanel = () => {
  const { workstationTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Workstations</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={workstationTab}>
            <TabPane tabId={WORKSTATION_SEARCH}>
              <SearchWorkstationsPanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_CHOOSE_PRODUCTION_LINE}>
              <ChooseProductionLinePanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_CREATE}>
              <CreateWorkstationPanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_DETAILS}>
              <WorkstationDetailsPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default WorkstationsPanel;
