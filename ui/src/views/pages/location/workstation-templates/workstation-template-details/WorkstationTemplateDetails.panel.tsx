import { useState, FormEvent, useContext, useEffect } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container, CardImg, CardBody } from "reactstrap";

import { WorkstationTemplate } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentLocation,
  selectCurrentProductionLine,
  selectCurrentWorkingArea,
  selectCurrentWorkstationTemplate,
} from "@/redux/features/location/location.selectors";
import { updateLocation } from "@/redux/features/location/location.slice";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";
import { stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { BUILDING_DETAILS, BUILDING_MAIN } from "../../buildings";
import { LocationTabContext } from "../../context/LocationTabContext";
import { FLOOR_DETAILS, FLOOR_MAIN } from "../../floors";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";
import { mockDeliverableOptions } from "../../mocks/mocks";
import { PRODUCTION_LINE_DETAILS, PRODUCTION_LINE_MAIN } from "../../production-lines";
import { WORKING_AREA_DETAILS, WORKING_AREA_MAIN } from "../../working-areas";
import WorkstationTemplateEnergyModal from "../modals/WorkstationTemplateEnergy.modal";
import WorkstationTemplateEquipmentsModal from "../modals/WorkstationTemplateEquipments.modal";
import WorkstationTemplateJobsModal from "../modals/WorkstationTemplateJobs.modal";
import WorkstationTemplateMachinesModal from "../modals/WorkstationTemplateMachines.modal";
import WorkstationTemplateMaterialsModal from "../modals/WorkstationTemplateMaterials.modal";
import WorkstationTemplateSubAssembliesModal from "../modals/WorkstationTemplateSubAssemblies.modal";
import WorkstationTemplateTasksModal from "../modals/WorkstationTemplateTasks.modal";
import WorkstationTemplateTechniciansModal from "../modals/WorkstationTemplateTechnicians.modal";
import { handleDeleteWorkstationTemplate, handleEditWorkstationTemplate } from "../utils";
import { WORKSTATION_TEMPLATE_SEARCH } from "../workstation-templates.routes.const";

const WorkstationTemplateDetailsPanel = () => {
  const dispatch = useAppDispatch();

  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const workingArea = useAppSelector(selectCurrentWorkingArea);
  const productionLine = useAppSelector(selectCurrentProductionLine);
  const currentWorkstationTemplate = useAppSelector(selectCurrentWorkstationTemplate);

  const [tasksOpen, setTasksOpen] = useState<boolean>(false);
  const [jobsOpen, setJobsOpen] = useState<boolean>(false);
  const [materialsOpen, setMaterialsOpen] = useState<boolean>(false);
  const [subsOpen, setSubsOpen] = useState<boolean>(false);
  const [techniciansOpen, setTechniciansOpen] = useState<boolean>(false);
  const [machinesOpen, setMachinesOpen] = useState<boolean>(false);
  const [equipmentOpen, setEquipmentOpen] = useState<boolean>(false);
  const [energyOpen, setEnergyOpen] = useState<boolean>(false);
  const [workstationTemplate, setWorkstationTemplate] = useState<WorkstationTemplate>(
    currentWorkstationTemplate
  );

  useEffect(() => {
    setWorkstationTemplate(currentWorkstationTemplate);
  }, [currentWorkstationTemplate]);

  const {
    setMainTab,
    setWorkstationTemplateTab,
    setWorkingAreaTab,
    setFloorTab,
    setBuildingTab,
    setLocationTab,
    setProductionLineTab,
  } = useContext(LocationTabContext);

  const handleDelete = () => {
    alerts
      .confirmActionDanger(
        `Are you sure you wish to delete this workstation template from ${location.title}?`
      )
      .then(result => {
        if (result.isConfirmed) {
          const updatedLocation = handleDeleteWorkstationTemplate({
            workstationTemplate,
            productionLine,
            workingArea,
            floor,
            building,
            location,
          });
          dispatch(updateLocation(updatedLocation));
          setWorkstationTemplateTab(WORKSTATION_TEMPLATE_SEARCH);
        }
      });
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const requirements = workstationTemplate.resourceRequirements;

    const canSave =
      requirements.subAssemblies.length > 0 &&
      requirements.technicians.length > 0 &&
      requirements.machines.length > 0 &&
      requirements.equipment.length > 0;

    if (canSave) {
      const updatedLocation = handleEditWorkstationTemplate({
        workstationTemplate,
        productionLine: productionLine,
        workingArea: workingArea,
        building: building,
        floor: floor,
        location: location,
      });
      dispatch(updateLocation(updatedLocation));
      setWorkstationTemplateTab(WORKSTATION_TEMPLATE_SEARCH);
    } else {
      alerts.errorAlert(
        "You need to insert at least one of each: Assembly Part, Technician, Machine, Equipment",
        "Form Incomplete"
      );
    }
  };

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
                      Details of Workstation Template {currentWorkstationTemplate.name}
                    </h3>
                    <h3 className="mb-0">for Production Line {productionLine.name}</h3>
                    <h3 className="mb-0">in Working Area {workingArea.name}</h3>
                    <h3 className="mb-0">on Floor {floor.number}</h3>
                    <h3 className="mb-0">in Building at Address {building.streetAndNumber}</h3>
                    <h3 className="mb-0">of Location {location.title}</h3>
                  </Col>
                  <Col md="4">
                    <Row className="mb-2">
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setProductionLineTab(PRODUCTION_LINE_DETAILS);
                            setMainTab(PRODUCTION_LINE_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Production Line
                        </Button>
                      </Col>
                    </Row>
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
              <Form onSubmit={handleEdit}>
                <h6 className="heading m-4">Workstation Template Details</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <InputField
                        label="Name"
                        id="workstation-template-name"
                        type="text"
                        required
                        value={workstationTemplate.name || ""}
                        onChange={e => {
                          setWorkstationTemplate({
                            ...workstationTemplate,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Code"
                        id="workstation-template-code"
                        type="text"
                        required
                        value={workstationTemplate.code || ""}
                        onChange={e => {
                          setWorkstationTemplate({
                            ...workstationTemplate,
                            code: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <MandatorySelectField
                        label="Deliverable"
                        id="workstation-template-deliverable"
                        isMulti
                        options={mockDeliverableOptions}
                        value={
                          workstationTemplate.deliverable.map(del => stringAsSelectOption(del)) ||
                          ""
                        }
                        onChange={(newValue: unknown) => {
                          if (newValue) {
                            const selectedOptions = newValue as SelectOption[];
                            const templateDeliverables = selectedOptions.map(
                              option => option.label
                            ) as string[];
                            setWorkstationTemplate({
                              ...workstationTemplate,
                              deliverable: templateDeliverables,
                            });
                          }
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Capacity"
                        id="workstation-template-capacity"
                        type="number"
                        min={0}
                        value={workstationTemplate.capacity || ""}
                        onChange={e => {
                          setWorkstationTemplate({
                            ...workstationTemplate,
                            capacity: +e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setTasksOpen(true)}
                      >
                        Tasks
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setJobsOpen(true)}
                      >
                        Jobs
                      </Button>
                    </Col>
                  </Row>
                </Card>
                <h6 className="heading m-4">Resource Requirements</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setMaterialsOpen(true)}
                      >
                        Materials
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setSubsOpen(true)}
                      >
                        Sub Assemblies
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setTechniciansOpen(true)}
                      >
                        Technicians
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setMachinesOpen(true)}
                      >
                        Machines
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setEquipmentOpen(true)}
                      >
                        Equipment
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setEnergyOpen(true)}
                      >
                        Energy Supply
                      </Button>
                    </Col>
                  </Row>
                </Card>
                <WorkstationTemplateTasksModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  tasksOpen={tasksOpen}
                  setTasksOpen={setTasksOpen}
                />
                <WorkstationTemplateJobsModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  jobsOpen={jobsOpen}
                  setJobsOpen={setJobsOpen}
                />
                <WorkstationTemplateMaterialsModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  materialsOpen={materialsOpen}
                  setMaterialsOpen={setMaterialsOpen}
                />
                <WorkstationTemplateSubAssembliesModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  subsOpen={subsOpen}
                  setSubsOpen={setSubsOpen}
                />
                <WorkstationTemplateTechniciansModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  techniciansOpen={techniciansOpen}
                  setTechniciansOpen={setTechniciansOpen}
                />
                <WorkstationTemplateMachinesModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  machinesOpen={machinesOpen}
                  setMachinesOpen={setMachinesOpen}
                />
                <WorkstationTemplateEquipmentsModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  equipmentsOpen={equipmentOpen}
                  setEquipmentsOpen={setEquipmentOpen}
                />
                <WorkstationTemplateEnergyModal
                  workstationTemplate={workstationTemplate}
                  setWorkstationTemplate={setWorkstationTemplate}
                  energyOpen={energyOpen}
                  setEnergyOpen={setEnergyOpen}
                />
                <Row className="pb-4 px-4">
                  <Col>
                    <Button
                      onClick={() => setWorkstationTemplateTab(WORKSTATION_TEMPLATE_SEARCH)}
                      color="light"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="text-right">
                    <Button color="info" type="submit">
                      Edit Workstation Template
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
              <CardBody className="pt-5">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {workstationTemplate.resourceRequirements.materials.length}
                        </span>
                        <span className="description">Materials</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstationTemplate.resourceRequirements.subAssemblies.length}
                        </span>
                        <span className="description">Assembly Parts</span>
                      </div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {workstationTemplate.resourceRequirements.technicians.length}
                        </span>
                        <span className="description">Technicians</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstationTemplate.resourceRequirements.machines.length}
                        </span>
                        <span className="description">Machines</span>
                      </div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {workstationTemplate.resourceRequirements.equipment.length}
                        </span>
                        <span className="description">Equipment</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstationTemplate.resourceRequirements.energySupply}
                        </span>
                        <span className="description">Energy Requirement</span>
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

export default WorkstationTemplateDetailsPanel;
