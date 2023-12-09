import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, Container, CardBody } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import LocationAnalyticsPanel from "./analytics/LocationAnalytics.panel";
import CreateLocationPanel from "./create-location/CreateLocation.panel";
import LocationPanel from "./location-details/Location.panel";
import {
  LOCATION_SEARCH,
  LOCATION_CREATE,
  LOCATION_DETAILS,
  LOCATION_ANALYTICS,
} from "./locations.routes.const";
import SearchLocationsPanel from "./search-locations/SearchLocations.panel";

const LocationsPanel = () => {
  const { locationTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Locations</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={locationTab}>
            <TabPane tabId={LOCATION_SEARCH}>
              <SearchLocationsPanel />
            </TabPane>
            <TabPane tabId={LOCATION_CREATE}>
              <CreateLocationPanel />
            </TabPane>
            <TabPane tabId={LOCATION_DETAILS}>
              <LocationPanel />
            </TabPane>
            <TabPane tabId={LOCATION_ANALYTICS}>
              <LocationAnalyticsPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default LocationsPanel;
