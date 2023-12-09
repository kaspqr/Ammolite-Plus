import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockTechnicians } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  techniciansOpen: boolean;
  setTechniciansOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTechniciansModal = ({
  workstation,
  setWorkstation,
  techniciansOpen,
  setTechniciansOpen,
}: Props) => {
  const [technicians, setTechnicians] = useState<Resource[]>(mockTechnicians);
  const [technician, setTechnician] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const technicianIds: number[] = [];
    workstation.resourceRequirements.technicians.forEach(tech => technicianIds.push(tech.id));
    const techniciansData = mockTechnicians.filter(tech => !technicianIds.includes(tech.id));
    setTechnicians(techniciansData);
  }, [workstation]);

  const handleRemoveTechnician = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const technicianToRemove = workstation.resourceRequirements.technicians.find(
      tech => tech.id === +id
    );
    if (technicianToRemove) {
      const updatedWorkstationTechnicians = workstation.resourceRequirements.technicians.filter(
        tech => tech !== technicianToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          technicians: updatedWorkstationTechnicians,
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
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        technicians: [technician, ...workstation.resourceRequirements.technicians],
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
                data={workstation.resourceRequirements.technicians}
                columns={workstationResourcesTableColumns({
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

export default WorkstationTechniciansModal;
