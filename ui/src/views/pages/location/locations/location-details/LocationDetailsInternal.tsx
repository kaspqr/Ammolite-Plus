import { useContext } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { useAppSelector } from "@/redux/app";
import { selectCurrentLocation } from "@/redux/features/location/location.selectors";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";

import LocationBuildingsPanel from "./buildings/LocationBuildings.panel";
import { LocationDetailsTabContext } from "./context/LocationDetailsTabContext";
import { LOCATION_DETAILS_MAIN, LOCATION_DETAILS_BUILDINGS } from "./location-details.routes.const";
import LocationDetailsPanel from "./main/LocationDetails.panel";

const LocationInternalPanel = () => {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const { detailsLocationTab, setDetailsLocationTab } = useContext(LocationDetailsTabContext);

  return (
    <Container>
      <div className="col">
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h3 className="mb-0">Details of Location {currentLocation.title}</h3>
                  </Col>
                </Row>
              </CardHeader>
              <TabContent activeTab={detailsLocationTab}>
                <TabPane tabId={LOCATION_DETAILS_MAIN}>
                  <LocationDetailsPanel />
                </TabPane>
                <TabPane tabId={LOCATION_DETAILS_BUILDINGS}>
                  <LocationBuildingsPanel />
                </TabPane>
              </TabContent>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardImg alt="..." src={backgroundJpg} top />
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        width="140px"
                        height="140px"
                        className="rounded-circle"
                        src={locationJpg}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    onClick={() => setDetailsLocationTab(LOCATION_DETAILS_MAIN)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Main
                  </Button>
                  <Button
                    onClick={() => setDetailsLocationTab(LOCATION_DETAILS_BUILDINGS)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Buildings
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{currentLocation.buildings.length}</span>
                        <span className="description">Buildings</span>
                      </div>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LocationInternalPanel;
