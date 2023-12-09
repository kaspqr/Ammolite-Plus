import { useContext, useEffect, useState } from "react";

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
import {
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentLocation,
} from "@/redux/features/location/location.selectors";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";

import { BUILDING_DETAILS, BUILDING_MAIN } from "../../buildings";
import { LocationTabContext } from "../../context/LocationTabContext";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";

import { FloorDetailsTabContext } from "./context/FloorDetailsTabContext";
import {
  FLOOR_DETAILS_MAIN,
  FLOOR_DETAILS_ROOMS,
  FLOOR_DETAILS_WORKING_AREAS,
} from "./floor-details.routes.const";
import FloorDetailsPanel from "./main/FloorDetails.panel";
import FloorRoomsPanel from "./rooms/FloorRooms.panel";
import FloorWorkingAreasPanel from "./working-areas/FloorWorkingAreas.panel";

const FloorInternalPanel = () => {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const currentBuilding = useAppSelector(selectCurrentBuilding);
  const currentFloor = useAppSelector(selectCurrentFloor);

  const { setDetailsFloorTab, detailsFloorTab } = useContext(FloorDetailsTabContext);
  const { setBuildingTab, setLocationTab, setMainTab } = useContext(LocationTabContext);

  const [currentFloorDetailsTab, setCurrentFloorDetailsTab] = useState(detailsFloorTab);

  useEffect(() => {
    setCurrentFloorDetailsTab(detailsFloorTab);
  }, [detailsFloorTab]);

  return (
    <Container>
      <div className="col">
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="8">
                    <h3 className="mb-0">Details of Floor {currentFloor.number}</h3>
                    <h3 className="mb-0">
                      in Building at Address {currentBuilding.streetAndNumber}
                    </h3>
                    <h3 className="mb-0">in Location {currentLocation.title}</h3>
                  </Col>
                  <Col md="4">
                    <Row className="mb-2">
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setBuildingTab(BUILDING_DETAILS);
                            setMainTab(BUILDING_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Building
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setLocationTab(LOCATION_DETAILS);
                            setMainTab(LOCATION_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Location
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              <TabContent activeTab={currentFloorDetailsTab}>
                <TabPane tabId={FLOOR_DETAILS_MAIN}>
                  <FloorDetailsPanel />
                </TabPane>
                <TabPane tabId={FLOOR_DETAILS_ROOMS}>
                  <FloorRoomsPanel />
                </TabPane>
                <TabPane tabId={FLOOR_DETAILS_WORKING_AREAS}>
                  <FloorWorkingAreasPanel />
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
                <div className="mb-2 align-items-center">
                  <Button
                    onClick={() => setDetailsFloorTab(FLOOR_DETAILS_MAIN)}
                    type="button"
                    className="btn btn-primary"
                    color="primary"
                    size="sm"
                  >
                    Main
                  </Button>
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    onClick={() => setDetailsFloorTab(FLOOR_DETAILS_WORKING_AREAS)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Working Areas
                  </Button>
                  <Button
                    onClick={() => setDetailsFloorTab(FLOOR_DETAILS_ROOMS)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Rooms
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{currentFloor.workingAreas.length}</span>
                        <span className="description">Working Areas</span>
                      </div>
                      <div>
                        <span className="heading">{currentFloor.rooms.length}</span>
                        <span className="description">Rooms</span>
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

export default FloorInternalPanel;
