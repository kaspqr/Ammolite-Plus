import { useState, useEffect, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container, CardImg, CardBody } from "reactstrap";

import { LocationUse, WorkingArea } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentLocation,
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentWorkingArea,
} from "@/redux/features/location/location.selectors";
import {
  updateLocation,
  switchCurrentWorkingAreaTo,
  switchCurrentFloorTo,
  switchCurrentProductionLineTo,
} from "@/redux/features/location/location.slice";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";
import { stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { BUILDING_DETAILS, BUILDING_MAIN } from "../../buildings";
import { LocationTabContext } from "../../context/LocationTabContext";
import { FLOOR_DETAILS, FLOOR_MAIN } from "../../floors";
import { useOptions } from "../../location.options.const";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";
import {
  PRODUCTION_LINE_CREATE,
  PRODUCTION_LINE_DETAILS,
  PRODUCTION_LINE_MAIN,
} from "../../production-lines";
import {
  handleDeleteWorkingArea,
  handleEditWorkingArea,
  handleToggleWorkingAreaActive,
  validateExistingCode,
} from "../utils";
import { WORKING_AREA_SEARCH } from "../working-areas.routes.const";

const WorkingAreaDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const currentWorkingArea = useAppSelector(selectCurrentWorkingArea);

  const [workingArea, setWorkingArea] = useState<WorkingArea>(currentWorkingArea);

  const {
    setMainTab,
    setProductionLineTab,
    setWorkingAreaTab,
    setFloorTab,
    setBuildingTab,
    setLocationTab,
  } = useContext(LocationTabContext);

  useEffect(() => {
    setWorkingArea(currentWorkingArea);
  }, [currentWorkingArea]);

  const handleToggleActive = () => {
    const { updatedLocation, updatedWorkingArea } = handleToggleWorkingAreaActive({
      workingArea,
      floor,
      building,
      location,
    });
    dispatch(switchCurrentWorkingAreaTo(updatedWorkingArea));
    dispatch(updateLocation(updatedLocation));
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const codeAvailable = validateExistingCode({ floor, workingArea });
    if (!codeAvailable) alerts.errorAlert("Please choose a unique code", "Invalid Code");
    else {
      const updatedLocation = handleEditWorkingArea({ workingArea, floor, building, location });
      dispatch(updateLocation(updatedLocation));
      dispatch(switchCurrentWorkingAreaTo(workingArea));
      setWorkingAreaTab(WORKING_AREA_SEARCH);
    }
  };

  const handleDelete = () => {
    alerts
      .confirmActionDanger(
        `Are you sure you wish to delete this working area from ${location.title}?`
      )
      .then(result => {
        if (result.isConfirmed) {
          const { updatedLocation, updatedFloor } = handleDeleteWorkingArea({
            workingArea,
            floor,
            building,
            location,
          });
          dispatch(switchCurrentFloorTo(updatedFloor));
          dispatch(updateLocation(updatedLocation));
          setWorkingAreaTab(WORKING_AREA_SEARCH);
        }
      });
  };

  return (
    <Container>
      <div className="col">
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h3 className="mb-0">Details of Working Area {currentWorkingArea.name}</h3>
                    <h3 className="mb-0">on Floor {floor.number}</h3>
                    <h3 className="mb-0">in Building at Address {building.streetAndNumber}</h3>
                    <h3 className="mb-0">of Location {location.title}</h3>
                  </Col>
                  <Col>
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
              <Form onSubmit={handleEdit}>
                <h6 className="heading m-4">Working Area Details</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <MandatorySelectField
                        label="Use"
                        id="working-area-use"
                        isMulti
                        options={useOptions}
                        value={workingArea.use.map(use => stringAsSelectOption(use)) || ""}
                        onChange={(newValue: unknown) => {
                          if (newValue) {
                            const selectedOptions = newValue as SelectOption[];
                            const workingAreaUses = selectedOptions.map(
                              option => option.label
                            ) as LocationUse[];
                            setWorkingArea({
                              ...workingArea,
                              use: workingAreaUses,
                            });
                          }
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Name"
                        id="working-area-name"
                        type="text"
                        required
                        value={workingArea.name || ""}
                        onChange={e => {
                          setWorkingArea({
                            ...workingArea,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label="Code"
                        id="working-area-code"
                        type="text"
                        required
                        value={workingArea.code || ""}
                        onChange={e => {
                          setWorkingArea({
                            ...workingArea,
                            code: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Surface"
                        id="working-area-surface"
                        type="number"
                        min={0}
                        value={workingArea.surface || ""}
                        onChange={e => {
                          setWorkingArea({
                            ...workingArea,
                            surface: +e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label="Picture URL"
                        id="working-area-picture-url"
                        type="text"
                        value={workingArea.pic || ""}
                        onChange={e => {
                          setWorkingArea({
                            ...workingArea,
                            pic: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col />
                  </Row>
                </Card>
                <h6 className="heading m-4">Coordinates</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <InputField
                        label="X"
                        id="working-area-coordinates-x"
                        type="number"
                        value={workingArea.jsonCoords?.x || ""}
                        onChange={e => {
                          setWorkingArea({
                            ...workingArea,
                            jsonCoords: {
                              ...workingArea.jsonCoords,
                              x: +e.target.value,
                            },
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Y"
                        id="working-area-coordinates-y"
                        type="number"
                        value={workingArea.jsonCoords?.y || ""}
                        onChange={e => {
                          setWorkingArea({
                            ...workingArea,
                            jsonCoords: {
                              ...workingArea.jsonCoords,
                              y: +e.target.value,
                            },
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
                <Row className="pb-4 px-4">
                  <Col>
                    <Button
                      onClick={() => setWorkingAreaTab(WORKING_AREA_SEARCH)}
                      color="light"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="text-right">
                    <Button color="info" type="submit">
                      Edit Working Area
                    </Button>
                  </Col>
                </Row>
                <Row className="pb-4 px-4">
                  <Col className="text-right">
                    <Button onClick={handleToggleActive} color="warning" type="button">
                      {workingArea.active ? "Deactivate" : "Activate"}
                    </Button>
                  </Col>
                </Row>
                <Row className="pb-4 px-4">
                  <Col className="text-right">
                    <Button onClick={handleDelete} color="danger" type="button">
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Form>
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
                <div className="align-items-center">
                  <Button
                    onClick={() => {
                      const newTab = workingArea.productionLine
                        ? PRODUCTION_LINE_DETAILS
                        : PRODUCTION_LINE_CREATE;
                      if (workingArea.productionLine) {
                        dispatch(switchCurrentProductionLineTo(workingArea.productionLine));
                      }
                      setProductionLineTab(newTab);
                      setMainTab(PRODUCTION_LINE_MAIN);
                    }}
                    type="button"
                    className="btn btn-primary"
                    color={workingArea.productionLine ? "primary" : "info"}
                    size="sm"
                  >
                    {!workingArea.productionLine && "+ "}Production Line
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{workingArea.surface}</span>
                        <span className="description">Surface</span>
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

export default WorkingAreaDetailsPanel;
