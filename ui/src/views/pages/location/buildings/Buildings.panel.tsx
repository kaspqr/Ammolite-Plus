import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { BUILDING_SEARCH, BUILDING_CREATE, BUILDING_DETAILS } from "../buildings";
import { LocationTabContext } from "../context/LocationTabContext";

import BuildingPanel from "./building-details/Building.panel";
import CreateBuildingPanel from "./create-building/CreateBuilding.panel";
import SearchBuildingsPanel from "./search-buildings/SearchBuildings.panel";

const BuildingsPanel = () => {
  const { buildingTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Buildings</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={buildingTab}>
            <TabPane tabId={BUILDING_SEARCH}>
              <SearchBuildingsPanel />
            </TabPane>
            <TabPane tabId={BUILDING_CREATE}>
              <CreateBuildingPanel />
            </TabPane>
            <TabPane tabId={BUILDING_DETAILS}>
              <BuildingPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default BuildingsPanel;
