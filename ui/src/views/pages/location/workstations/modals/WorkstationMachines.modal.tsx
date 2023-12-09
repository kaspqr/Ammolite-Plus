import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockMachines } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  machinesOpen: boolean;
  setMachinesOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationMachinesModal = ({
  workstation,
  setWorkstation,
  machinesOpen,
  setMachinesOpen,
}: Props) => {
  const [machines, setMachines] = useState<Resource[]>(mockMachines);
  const [machine, setMachine] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const machineIds: number[] = [];
    workstation.resourceRequirements.machines.forEach(mach => machineIds.push(mach.id));
    const machinesData = mockMachines.filter(mach => !machineIds.includes(mach.id));
    setMachines(machinesData);
  }, [workstation]);

  const handleRemoveMachine = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const machineToRemove = workstation.resourceRequirements.machines.find(mach => mach.id === +id);
    if (machineToRemove) {
      const updatedWorkstationMachines = workstation.resourceRequirements.machines.filter(
        mach => mach !== machineToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          machines: updatedWorkstationMachines,
        },
      });
      setMachines([machineToRemove, ...machines]);
    }
  };

  return (
    <Modal isOpen={machinesOpen} toggle={() => setMachinesOpen(!machinesOpen)}>
      <ModalHeader>Machines</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-machines"
                label="Pick Machine"
                value={stringAsSelectOption(machine?.name || "")}
                options={machines.map(machine => stringAsSelectOption(machine.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedMachine = machines.find(
                      machine => machine.name === selectedOption.label
                    );
                    setMachine(selectedMachine);
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
                  if (machine) {
                    const newMachines = machines.filter(mat => mat !== machine);
                    setMachines(newMachines);
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        machines: [machine, ...workstation.resourceRequirements.machines],
                      },
                    });
                    setMachine(undefined);
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
              <span className="form-control-label">Machines</span>
              <ReactTable
                data={workstation.resourceRequirements.machines}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveMachine,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setMachinesOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationMachinesModal;
