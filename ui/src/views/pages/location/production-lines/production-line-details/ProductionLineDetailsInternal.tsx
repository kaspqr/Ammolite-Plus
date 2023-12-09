import { useState, useEffect, useContext } from "react";

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
  selectCurrentProductionLine,
  selectCurrentWorkingArea,
} from "@/redux/features/location/location.selectors";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";

import { BUILDING_DETAILS, BUILDING_MAIN } from "../../buildings";
import { LocationTabContext } from "../../context/LocationTabContext";
import { FLOOR_DETAILS, FLOOR_MAIN } from "../../floors";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";
import { WORKING_AREA_DETAILS, WORKING_AREA_MAIN } from "../../working-areas";

import { ProductionLineDetailsTabContext } from "./context/ProductionLineDetailsTabContext";
import ProductionLineCrewPanel from "./crew/ProductionLineCrew.panel";
import ProductionLineEquipmentPanel from "./equipment/ProductionLineEquipment.panel";
import ProductionLineMachinesPanel from "./machines/ProductionLineMachines.panel";
import ProductionLineDetailsPanel from "./main/ProductionLineDetails.panel";
import ProductionLineOperationsPanel from "./operations/ProductionLineOperations.panel";
import {
  PRODUCTION_LINE_CREW,
  PRODUCTION_LINE_DETAILS_MAIN,
  PRODUCTION_LINE_EQUIPMENT,
  PRODUCTION_LINE_MACHINES,
  PRODUCTION_LINE_OPERATIONS,
  PRODUCTION_LINE_RESOURCES,
  PRODUCTION_LINE_WORK_STATIONS,
} from "./production-line-details.routes.const";
import ProductionLineResourcesPanel from "./resources/ProductionLineResources.panel";
import ProductionLineWorkStationsPanel from "./workstations/ProductionLineWorkStations.panel";

const ProductionLineInternalPanel = () => {
  const currentLocation = useAppSelector(selectCurrentLocation);
  const currentBuilding = useAppSelector(selectCurrentBuilding);
  const currentFloor = useAppSelector(selectCurrentFloor);
  const currentWorkingArea = useAppSelector(selectCurrentWorkingArea);
  const currentProductionLine = useAppSelector(selectCurrentProductionLine);

  const { setMainTab, setWorkingAreaTab, setFloorTab, setBuildingTab, setLocationTab } =
    useContext(LocationTabContext);

  const { setDetailsProductionLineTab, detailsProductionLineTab } = useContext(
    ProductionLineDetailsTabContext
  );

  const [currentProductionLineDetailsTab, setCurrentProductionLineDetailsTab] =
    useState(detailsProductionLineTab);

  useEffect(() => {
    setCurrentProductionLineDetailsTab(detailsProductionLineTab);
  }, [detailsProductionLineTab]);

  return (
    <Container>
      <div className="col">
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="8">
                    <h3 className="mb-0">
                      Details of Production Line {currentProductionLine.name}
                    </h3>
                    <h3 className="mb-0">in Working Area {currentWorkingArea.name}</h3>
                    <h3 className="mb-0">on Floor {currentFloor.number}</h3>
                    <h3 className="mb-0">
                      in Building at Address {currentBuilding.streetAndNumber}
                    </h3>
                    <h3 className="mb-0">of Location {currentLocation.title}</h3>
                  </Col>
                  <Col md="4">
                    <Row className="mb-2">
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setWorkingAreaTab(WORKING_AREA_DETAILS);
                            setMainTab(WORKING_AREA_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Working Area
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setFloorTab(FLOOR_DETAILS);
                            setMainTab(FLOOR_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Floor
                        </Button>
                      </Col>
                    </Row>
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
              <TabContent activeTab={currentProductionLineDetailsTab}>
                <TabPane tabId={PRODUCTION_LINE_DETAILS_MAIN}>
                  <ProductionLineDetailsPanel />
                </TabPane>
                <TabPane tabId={PRODUCTION_LINE_CREW}>
                  <ProductionLineCrewPanel />
                </TabPane>
                <TabPane tabId={PRODUCTION_LINE_MACHINES}>
                  <ProductionLineMachinesPanel />
                </TabPane>
                <TabPane tabId={PRODUCTION_LINE_EQUIPMENT}>
                  <ProductionLineEquipmentPanel />
                </TabPane>
                <TabPane tabId={PRODUCTION_LINE_RESOURCES}>
                  <ProductionLineResourcesPanel />
                </TabPane>
                <TabPane tabId={PRODUCTION_LINE_WORK_STATIONS}>
                  <ProductionLineWorkStationsPanel />
                </TabPane>
                <TabPane tabId={PRODUCTION_LINE_OPERATIONS}>
                  <ProductionLineOperationsPanel />
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
                <div className="d-flex justify-content-between mb-2">
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_DETAILS_MAIN)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Main
                  </Button>
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_CREW)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Crew
                  </Button>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_MACHINES)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Machines
                  </Button>
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_EQUIPMENT)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Equipment
                  </Button>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_RESOURCES)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Resources
                  </Button>
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_WORK_STATIONS)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Workstations
                  </Button>
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    onClick={() => setDetailsProductionLineTab(PRODUCTION_LINE_OPERATIONS)}
                    type="button"
                    className="btn btn-primary float-right"
                    color="primary"
                    size="sm"
                  >
                    Operations
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{currentProductionLine.workstations.length}</span>
                        <span className="description">Workstations</span>
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

export default ProductionLineInternalPanel;
