import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, WorkstationTemplate } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockTechnicians } from "../../mocks/mocks";
import { workstationTemplateResourcesTableColumns } from "../tables/WorkstationTemplateResources.table";

type Props = {
  workstationTemplate: WorkstationTemplate;
  setWorkstationTemplate: Dispatch<SetStateAction<WorkstationTemplate>>;
  techniciansOpen: boolean;
  setTechniciansOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTemplateTechniciansModal = ({
  workstationTemplate,
  setWorkstationTemplate,
  techniciansOpen,
  setTechniciansOpen,
}: Props) => {
  const [technicians, setTechnicians] = useState<Resource[]>(mockTechnicians);
  const [technician, setTechnician] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const technicianIds: number[] = [];
    workstationTemplate.resourceRequirements.technicians.forEach(tech =>
      technicianIds.push(tech.id)
    );
    const techniciansData = mockTechnicians.filter(tech => !technicianIds.includes(tech.id));
    setTechnicians(techniciansData);
  }, [workstationTemplate]);

  const handleRemoveTechnician = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const technicianToRemove = workstationTemplate.resourceRequirements.technicians.find(
      tech => tech.id === +id
    );
    if (technicianToRemove) {
      const updatedWorkstationTemplateTechnicians =
        workstationTemplate.resourceRequirements.technicians.filter(
          tech => tech !== technicianToRemove
        );
      setWorkstationTemplate({
        ...workstationTemplate,
        resourceRequirements: {
          ...workstationTemplate.resourceRequirements,
          technicians: updatedWorkstationTemplateTechnicians,
        },
      });
      setTechnicians([technicianToRemove, ...technicians]);
    }
  };

  return (
    <Modal isOpen={techniciansOpen} toggle={() => setTechniciansOpen(!techniciansOpen)}>
      <ModalHeader>Technicians</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-technicians"
                label="Pick Technician"
                value={stringAsSelectOption(technician?.name || "")}
                options={technicians.map(technician => stringAsSelectOption(technician.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedTechnician = technicians.find(
                      technician => technician.name === selectedOption.label
                    );
                    setTechnician(selectedTechnician);
                  }
                }}
              />
            </Col>
            <Col md="2">
              <Button
                style={{ marginTop: "33px" }}
                size="sm"
                color="success"
                type="button"
                onClick={() => {
                  if (technician) {
                    const newTechnicians = technicians.filter(mat => mat !== technician);
                    setTechnicians(newTechnicians);
                    setWorkstationTemplate({
                      ...workstationTemplate,
                      resourceRequirements: {
                        ...workstationTemplate.resourceRequirements,
                        technicians: [
                          technician,
                          ...workstationTemplate.resourceRequirements.technicians,
                        ],
                      },
                    });
                    setTechnician(undefined);
                  }
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card>
        <Card className="p-4">
          <Row>
            <Col>
              <span className="form-control-label">Technicians</span>
              <ReactTable
                data={workstationTemplate.resourceRequirements.technicians}
                columns={workstationTemplateResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveTechnician,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setTechniciansOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationTemplateTechniciansModal;
