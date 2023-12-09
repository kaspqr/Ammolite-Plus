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
import {
  selectCurrentBuilding,
  selectCurrentLocation,
} from "@/redux/features/location/location.selectors";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";

import { LocationTabContext } from "../../context/LocationTabContext";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";

import { BUILDING_DETAILS_MAIN, BUILDING_DETAILS_FLOORS } from "./building-details.routes.const";
import { BuildingDetailsTabContext } from "./context/BuildingDetailsTabContext";
import BuildingFloorsPanel from "./floors/BuildingFloors.panel";
import BuildingDetailsPanel from "./main/BuildingDetails.panel";

const BuildingInternalPanel = () => {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const currentBuilding = useAppSelector(selectCurrentBuilding);

  const { detailsBuildingTab, setDetailsBuildingTab } = useContext(BuildingDetailsTabContext);
  const { setLocationTab, setMainTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="8">
                    <h3 className="mb-0">Details of {currentLocation.title} Building</h3>
                    <h3 className="mb-0">at Address {currentBuilding.streetAndNumber}</h3>
                  </Col>
                  <Col md="4" className="text-right">
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
              </CardHeader>
              <TabContent activeTab={detailsBuildingTab}>
                <TabPane tabId={BUILDING_DETAILS_MAIN}>
                  <BuildingDetailsPanel />
                </TabPane>
                <TabPane tabId={BUILDING_DETAILS_FLOORS}>
                  <BuildingFloorsPanel />
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
                    onClick={() => setDetailsBuildingTab(BUILDING_DETAILS_MAIN)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Main
                  </Button>
                  <Button
                    onClick={() => setDetailsBuildingTab(BUILDING_DETAILS_FLOORS)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Floors
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{currentBuilding.floors.length}</span>
                        <span className="description">Floors</span>
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

export default BuildingInternalPanel;
