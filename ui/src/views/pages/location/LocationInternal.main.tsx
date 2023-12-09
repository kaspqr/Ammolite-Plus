import { useEffect, useContext } from "react";
import Swal from "sweetalert2";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectLocationsState } from "@/redux/features/location/location.selectors";
import { preloadLocations } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { BoxHeader } from "@/views/layout/headers";

import { BUILDING_MAIN, BUILDING_SEARCH } from "./buildings";
import BuildingsPanel from "./buildings/Buildings.panel";
import { LocationTabContext } from "./context/LocationTabContext";
import { FLOOR_MAIN, FLOOR_SEARCH } from "./floors";
import FloorsPanel from "./floors/Floors.panel";
import { LOCATION_ANALYTICS, LOCATION_MAIN, LOCATION_SEARCH } from "./locations";
import LocationsPanel from "./locations/Locations.panel";
import { PRODUCTION_LINE_MAIN, PRODUCTION_LINE_SEARCH } from "./production-lines";
import ProductionLinesPanel from "./production-lines/ProductionLines.panel";
import { ROOM_MAIN, ROOM_SEARCH } from "./rooms";
import RoomsPanel from "./rooms/Rooms.panel";
import { WORKING_AREA_MAIN, WORKING_AREA_SEARCH } from "./working-areas";
import WorkingAreasPanel from "./working-areas/WorkingAreas.panel";
import { WORKSTATION_TEMPLATE_MAIN, WORKSTATION_TEMPLATE_SEARCH } from "./workstation-templates";
import WorkstationTemplatesPanel from "./workstation-templates/WorkstationTemplates.panel";
import { WORKSTATION_MAIN, WORKSTATION_SEARCH } from "./workstations";
import WorkstationsPanel from "./workstations/Workstations.panel";

export const LocationPageInternal = () => {
  const dispatch = useAppDispatch();
  const { entities, loading } = useAppSelector(selectLocationsState);

  const {
    mainTab,
    setMainTab,
    setLocationTab,
    setBuildingTab,
    setFloorTab,
    setWorkingAreaTab,
    setRoomTab,
    setProductionLineTab,
    setWorkstationTab,
    setWorkstationTemplateTab,
  } = useContext(LocationTabContext);

  useEffect(() => {
    if (entities.length === 0) dispatch(preloadLocations());
  }, [dispatch, entities]);

  useEffect(() => {
    if (loading) alerts.loadingAlert("Updating Locations", "Loading...");
    else Swal.close();
  }, [loading]);

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h3 className="mb-0">Location</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="justify-content-between">
            <Row>
              <Col>
                <Button
                  onClick={() => {
                    setLocationTab(LOCATION_SEARCH);
                    setMainTab(LOCATION_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Locations
                </Button>
                <Button
                  onClick={() => {
                    setBuildingTab(BUILDING_SEARCH);
                    setMainTab(BUILDING_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Buildings
                </Button>
                <Button
                  onClick={() => {
                    setFloorTab(FLOOR_SEARCH);
                    setMainTab(FLOOR_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Floors
                </Button>
                <Button
                  onClick={() => {
                    setWorkingAreaTab(WORKING_AREA_SEARCH);
                    setMainTab(WORKING_AREA_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Working Areas
                </Button>
                <Button
                  onClick={() => {
                    setRoomTab(ROOM_SEARCH);
                    setMainTab(ROOM_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Rooms
                </Button>
                <Button
                  onClick={() => {
                    setProductionLineTab(PRODUCTION_LINE_SEARCH);
                    setMainTab(PRODUCTION_LINE_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Production Lines
                </Button>
                <Button
                  onClick={() => {
                    setWorkstationTab(WORKSTATION_SEARCH);
                    setMainTab(WORKSTATION_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Workstations
                </Button>
                <Button
                  onClick={() => {
                    setWorkstationTemplateTab(WORKSTATION_TEMPLATE_SEARCH);
                    setMainTab(WORKSTATION_TEMPLATE_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Workstation Templates
                </Button>
                <Button
                  onClick={() => {
                    setLocationTab(LOCATION_ANALYTICS);
                    setMainTab(LOCATION_MAIN);
                  }}
                  color="primary"
                  type="button"
                  className="mb-2"
                >
                  Analytics
                </Button>
              </Col>
            </Row>
          </CardBody>
          <TabContent activeTab={mainTab}>
            <TabPane tabId={LOCATION_MAIN}>
              <LocationsPanel />
            </TabPane>
            <TabPane tabId={BUILDING_MAIN}>
              <BuildingsPanel />
            </TabPane>
            <TabPane tabId={FLOOR_MAIN}>
              <FloorsPanel />
            </TabPane>
            <TabPane tabId={WORKING_AREA_MAIN}>
              <WorkingAreasPanel />
            </TabPane>
            <TabPane tabId={ROOM_MAIN}>
              <RoomsPanel />
            </TabPane>
            <TabPane tabId={PRODUCTION_LINE_MAIN}>
              <ProductionLinesPanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_MAIN}>
              <WorkstationsPanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_TEMPLATE_MAIN}>
              <WorkstationTemplatesPanel />
            </TabPane>
          </TabContent>
        </Card>
      </Container>
    </>
  );
};
