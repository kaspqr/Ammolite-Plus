import { useState, FormEvent, useContext, useEffect } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container, CardImg, CardBody } from "reactstrap";

import { Workstation } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentLocation,
  selectCurrentProductionLine,
  selectCurrentWorkingArea,
  selectCurrentWorkstation,
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
import WorkstationComputersModal from "../modals/WorkstationComputer.modal";
import WorkstationConsumablesModal from "../modals/WorkstationConsumables.modal";
import WorkstationEnergyModal from "../modals/WorkstationEnergy.modal";
import WorkstationEquipmentsModal from "../modals/WorkstationEquipment.modal";
import WorkstationJobsModal from "../modals/WorkstationJobs.modal";
import WorkstationMachinesModal from "../modals/WorkstationMachines.modal";
import WorkstationMaterialsModal from "../modals/WorkstationMaterials.modal";
import WorkstationSubAssembliesModal from "../modals/WorkstationSubAssemblies.modal";
import WorkstationTasksModal from "../modals/WorkstationTasks.modal";
import WorkstationTechniciansModal from "../modals/WorkstationTechnicians.modal";
import { handleDeleteWorkstation, handleEditWorkstation } from "../utils";
import { WORKSTATION_MAIN, WORKSTATION_SEARCH } from "../workstations.routes.const";

const WorkstationDetailsPanel = () => {
  const dispatch = useAppDispatch();

  const {
    setMainTab,
    setWorkstationTab,
    setWorkingAreaTab,
    setFloorTab,
    setBuildingTab,
    setLocationTab,
    setProductionLineTab,
  } = useContext(LocationTabContext);

  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const workingArea = useAppSelector(selectCurrentWorkingArea);
  const productionLine = useAppSelector(selectCurrentProductionLine);
  const currentWorkstation = useAppSelector(selectCurrentWorkstation);

  const [workstation, setWorkstation] = useState<Workstation>(currentWorkstation);
  const [tasksOpen, setTasksOpen] = useState<boolean>(false);
  const [jobsOpen, setJobsOpen] = useState<boolean>(false);
  const [materialsOpen, setMaterialsOpen] = useState<boolean>(false);
  const [subsOpen, setSubsOpen] = useState<boolean>(false);
  const [techniciansOpen, setTechniciansOpen] = useState<boolean>(false);
  const [machinesOpen, setMachinesOpen] = useState<boolean>(false);
  const [equipmentOpen, setEquipmentOpen] = useState<boolean>(false);
  const [energyOpen, setEnergyOpen] = useState<boolean>(false);
  const [computerOpen, setComputerOpen] = useState<boolean>(false);
  const [consumablesOpen, setConsumablesOpen] = useState<boolean>(false);

  useEffect(() => {
    setWorkstation(currentWorkstation);
  }, [currentWorkstation]);

  const handleDelete = () => {
    alerts
      .confirmActionDanger(
        `Are you sure you wish to delete this workstation from ${location.title}?`
      )
      .then(result => {
        if (result.isConfirmed) {
          const updatedLocation = handleDeleteWorkstation({
            workstation,
            productionLine,
            workingArea,
            floor,
            building,
            location,
          });
          dispatch(updateLocation(updatedLocation));
          setWorkstationTab(WORKSTATION_SEARCH);
        }
      });
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const requirements = workstation.resourceRequirements;

    const canSave =
      workstation.deliverable.length > 0 &&
      requirements.subAssemblies.length > 0 &&
      requirements.technicians.length > 0 &&
      requirements.machines.length > 0 &&
      requirements.equipment.length > 0;

    if (canSave) {
      const updatedLocation = handleEditWorkstation({
        workstation,
        productionLine,
        workingArea,
        building,
        floor,
        location,
      });
      dispatch(updateLocation(updatedLocation));
      setWorkstationTab(WORKSTATION_SEARCH);
    } else {
      alerts.errorAlert(
        "You need to insert at least one of each: Deliverable, Assembly Part, Technician, Machine, Equipment",
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
                    <h3 className="mb-0">Workstation {workstation.name}</h3>
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
                <h6 className="heading m-4">Workstation Details</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <InputField
                        label="Name"
                        id="workstation-name"
                        type="text"
                        required
                        value={workstation.name || ""}
                        onChange={e => {
                          setWorkstation({
                            ...workstation,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Code"
                        id="workstation-code"
                        type="text"
                        required
                        value={workstation.code || ""}
                        onChange={e => {
                          setWorkstation({
                            ...workstation,
                            code: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label="Production Phase"
                        id="workstation-production-phase"
                        type="text"
                        value={workstation.productionPhase || ""}
                        onChange={e => {
                          setWorkstation({
                            ...workstation,
                            productionPhase: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <MandatorySelectField
                        label="Deliverable"
                        id="workstation-deliverable"
                        isMulti
                        options={mockDeliverableOptions}
                        value={workstation.deliverable.map(del => stringAsSelectOption(del)) || ""}
                        onChange={(newValue: unknown) => {
                          if (newValue) {
                            const selectedOptions = newValue as SelectOption[];
                            const wsDeliverables = selectedOptions.map(
                              option => option.label
                            ) as string[];
                            setWorkstation({
                              ...workstation,
                              deliverable: wsDeliverables,
                            });
                          }
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
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setComputerOpen(true)}
                      >
                        Computer
                      </Button>
                      <Button
                        color="primary"
                        className="mb-2"
                        type="button"
                        onClick={() => setConsumablesOpen(true)}
                      >
                        Consumables
                      </Button>
                    </Col>
                  </Row>
                </Card>
                <WorkstationTasksModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  tasksOpen={tasksOpen}
                  setTasksOpen={setTasksOpen}
                />
                <WorkstationJobsModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  jobsOpen={jobsOpen}
                  setJobsOpen={setJobsOpen}
                />
                <WorkstationMaterialsModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  materialsOpen={materialsOpen}
                  setMaterialsOpen={setMaterialsOpen}
                />
                <WorkstationSubAssembliesModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  subsOpen={subsOpen}
                  setSubsOpen={setSubsOpen}
                />
                <WorkstationTechniciansModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  techniciansOpen={techniciansOpen}
                  setTechniciansOpen={setTechniciansOpen}
                />
                <WorkstationMachinesModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  machinesOpen={machinesOpen}
                  setMachinesOpen={setMachinesOpen}
                />
                <WorkstationEquipmentsModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  equipmentsOpen={equipmentOpen}
                  setEquipmentsOpen={setEquipmentOpen}
                />
                <WorkstationEnergyModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  energyOpen={energyOpen}
                  setEnergyOpen={setEnergyOpen}
                />
                <WorkstationComputersModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  computersOpen={computerOpen}
                  setComputersOpen={setComputerOpen}
                />
                <WorkstationConsumablesModal
                  workstation={workstation}
                  setWorkstation={setWorkstation}
                  consumablesOpen={consumablesOpen}
                  setConsumablesOpen={setConsumablesOpen}
                />
                <h6 className="heading m-4">Operations</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <InputField
                        id="workstation-status"
                        label="Status"
                        type="text"
                        value={workstation.operations.status}
                        onChange={e =>
                          setWorkstation({
                            ...workstation,
                            operations: {
                              ...workstation.operations,
                              status: e.target.value,
                            },
                          })
                        }
                      />
                    </Col>
                    <Col>
                      <MandatorySelectField
                        id="workstation-current-job"
                        label="Current Job"
                        value={stringAsSelectOption(workstation.operations.currentJob || "")}
                        options={workstation.jobs.map(job => stringAsSelectOption(job.name))}
                        onChange={(newValue: unknown) => {
                          if (newValue) {
                            const selectedOption = newValue as SelectOption;
                            const selectedJob = selectedOption.label;
                            setWorkstation({
                              ...workstation,
                              operations: {
                                ...workstation.operations,
                                currentJob: selectedJob,
                              },
                            });
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <MandatorySelectField
                        id="workstation-current-machine"
                        label="Current Machine"
                        value={stringAsSelectOption(workstation.operations.currentMachine || "")}
                        options={workstation.resourceRequirements.machines.map(machine =>
                          stringAsSelectOption(machine.name)
                        )}
                        onChange={(newValue: unknown) => {
                          if (newValue) {
                            const selectedOption = newValue as SelectOption;
                            const selectedMachine = selectedOption.label;
                            setWorkstation({
                              ...workstation,
                              operations: {
                                ...workstation.operations,
                                currentMachine: selectedMachine,
                              },
                            });
                          }
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        id="workstation-completion-rate"
                        label="Completion Rate"
                        type="number"
                        min={0}
                        max={100}
                        value={workstation.operations.completionRate}
                        onChange={e =>
                          setWorkstation({
                            ...workstation,
                            operations: {
                              ...workstation.operations,
                              completionRate: +e.target.value,
                            },
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Card>
                <Row className="pb-4 px-4">
                  <Col>
                    <Button
                      onClick={() => {
                        setWorkstationTab(WORKSTATION_SEARCH);
                        setMainTab(WORKSTATION_MAIN);
                      }}
                      color="light"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="text-right">
                    <Button color="info" type="submit">
                      Edit Workstation
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
                          {workstation.resourceRequirements.materials.length}
                        </span>
                        <span className="description">Materials</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.subAssemblies.length}
                        </span>
                        <span className="description">Assembly Parts</span>
                      </div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.technicians.length}
                        </span>
                        <span className="description">Technicians</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.machines.length}
                        </span>
                        <span className="description">Machines</span>
                      </div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.equipment.length}
                        </span>
                        <span className="description">Equipment</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.energySupply}
                        </span>
                        <span className="description">Energy Requirement</span>
                      </div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.computer.length}
                        </span>
                        <span className="description">Computers</span>
                      </div>
                      <div>
                        <span className="heading">
                          {workstation.resourceRequirements.consumable.length}
                        </span>
                        <span className="description">Consumables</span>
                      </div>
                    </div>
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{workstation.tasks.length}</span>
                        <span className="description">Tasks</span>
                      </div>
                      <div>
                        <span className="heading">{workstation.jobs.length}</span>
                        <span className="description">Jobs</span>
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

export default WorkstationDetailsPanel;
