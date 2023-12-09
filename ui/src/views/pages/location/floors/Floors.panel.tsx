import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import CreateFloorPanel from "./create-floor/CreateFloor.panel";
import FloorPanel from "./floor-details/Floor.panel";
import { FLOOR_SEARCH, FLOOR_CREATE, FLOOR_DETAILS } from "./floors.routes.const";
import SearchFloorsPanel from "./search-floors/SearchFloors.panel";

const FloorsPanel = () => {
  const { floorTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Floors</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={floorTab}>
            <TabPane tabId={FLOOR_SEARCH}>
              <SearchFloorsPanel />
            </TabPane>
            <TabPane tabId={FLOOR_CREATE}>
              <CreateFloorPanel />
            </TabPane>
            <TabPane tabId={FLOOR_DETAILS}>
              <FloorPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default FloorsPanel;
