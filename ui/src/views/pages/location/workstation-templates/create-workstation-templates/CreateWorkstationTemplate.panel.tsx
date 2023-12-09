import { useState, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container } from "reactstrap";

import { WorkstationTemplate, emptyWorkstationTemplate } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentLocation,
  selectCurrentProductionLine,
  selectCurrentWorkingArea,
} from "@/redux/features/location/location.selectors";
import {
  switchCurrentProductionLineTo,
  updateLocation,
} from "@/redux/features/location/location.slice";

import { stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { mockDeliverableOptions } from "../../mocks/mocks";
import { PRODUCTION_LINE_DETAILS, PRODUCTION_LINE_MAIN } from "../../production-lines";
import WorkstationTemplateEnergyModal from "../modals/WorkstationTemplateEnergy.modal";
import WorkstationTemplateEquipmentsModal from "../modals/WorkstationTemplateEquipments.modal";
import WorkstationTemplateJobsModal from "../modals/WorkstationTemplateJobs.modal";
import WorkstationTemplateMachinesModal from "../modals/WorkstationTemplateMachines.modal";
import WorkstationTemplateMaterialsModal from "../modals/WorkstationTemplateMaterials.modal";
import WorkstationTemplateSubAssembliesModal from "../modals/WorkstationTemplateSubAssemblies.modal";
import WorkstationTemplateTasksModal from "../modals/WorkstationTemplateTasks.modal";
import WorkstationTemplateTechniciansModal from "../modals/WorkstationTemplateTechnicians.modal";
import { handleCreateWorkstationTemplate } from "../utils";

const CreateWorkstationTemplatePanel = () => {
  const dispatch = useAppDispatch();

  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const workingArea = useAppSelector(selectCurrentWorkingArea);
  const productionLine = useAppSelector(selectCurrentProductionLine);

  const [tasksOpen, setTasksOpen] = useState<boolean>(false);
  const [jobsOpen, setJobsOpen] = useState<boolean>(false);
  const [materialsOpen, setMaterialsOpen] = useState<boolean>(false);
  const [subsOpen, setSubsOpen] = useState<boolean>(false);
  const [techniciansOpen, setTechniciansOpen] = useState<boolean>(false);
  const [machinesOpen, setMachinesOpen] = useState<boolean>(false);
  const [equipmentOpen, setEquipmentOpen] = useState<boolean>(false);
  const [energyOpen, setEnergyOpen] = useState<boolean>(false);
  const [workstationTemplate, setWorkstationTemplate] =
    useState<WorkstationTemplate>(emptyWorkstationTemplate);

  const { setProductionLineTab, setMainTab } = useContext(LocationTabContext);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const requirements = workstationTemplate.resourceRequirements;

    const canSave =
      requirements.subAssemblies.length > 0 &&
      requirements.technicians.length > 0 &&
      requirements.machines.length > 0 &&
      requirements.equipment.length > 0;

    if (canSave) {
      const { updatedLocation, updatedProductionLine } = handleCreateWorkstationTemplate({
        workstationTemplate,
        productionLine,
        workingArea,
        building,
        floor,
        location,
      });
      dispatch(updateLocation(updatedLocation));
      dispatch(switchCurrentProductionLineTo(updatedProductionLine));
      setWorkstationTemplate(emptyWorkstationTemplate);
      setProductionLineTab(PRODUCTION_LINE_DETAILS);
      setMainTab(PRODUCTION_LINE_MAIN);
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
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Create Workstation Template</h3>
                <h3 className="mb-0">for Production Line {productionLine.name}</h3>
                <h3 className="mb-0">in Location {location.title}</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleCreate}>
            <h6 className="heading m-4">New Workstation Template Details</h6>
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
                      workstationTemplate.deliverable.map(del => stringAsSelectOption(del)) || ""
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
                  onClick={() => {
                    setProductionLineTab(PRODUCTION_LINE_DETAILS);
                    setMainTab(PRODUCTION_LINE_MAIN);
                  }}
                  color="light"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-right">
                <Button color="info" type="submit">
                  Create Workstation Template
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateWorkstationTemplatePanel;
