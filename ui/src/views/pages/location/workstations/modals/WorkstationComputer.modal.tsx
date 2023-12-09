import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockComputers } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  computersOpen: boolean;
  setComputersOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationComputersModal = ({
  workstation,
  setWorkstation,
  computersOpen,
  setComputersOpen,
}: Props) => {
  const [computers, setComputers] = useState<Resource[]>(mockComputers);
  const [computer, setComputer] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const computerIds: number[] = [];
    workstation.resourceRequirements.computer.forEach(comp => computerIds.push(comp.id));
    const computersData = mockComputers.filter(comp => !computerIds.includes(comp.id));
    setComputers(computersData);
  }, [workstation]);

  const handleRemoveComputer = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const computerToRemove = workstation.resourceRequirements.computer.find(
      comp => comp.id === +id
    );
    if (computerToRemove) {
      const updatedWorkstationComputers = workstation.resourceRequirements.computer.filter(
        comp => comp !== computerToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          computer: updatedWorkstationComputers,
        },
      });
      setComputers([computerToRemove, ...computers]);
    }
  };

  return (
    <Modal isOpen={computersOpen} toggle={() => setComputersOpen(!computersOpen)}>
      <ModalHeader>Computers</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-computers"
                label="Pick Computer"
                value={stringAsSelectOption(computer?.name || "")}
                options={computers.map(computer => stringAsSelectOption(computer.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedComputer = computers.find(
                      computer => computer.name === selectedOption.label
                    );
                    setComputer(selectedComputer);
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
                  if (computer) {
                    const newComputers = computers.filter(mat => mat !== computer);
                    setComputers(newComputers);
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        computer: [computer, ...workstation.resourceRequirements.computer],
                      },
                    });
                    setComputer(undefined);
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
              <span className="form-control-label">Computers</span>
              <ReactTable
                data={workstation.resourceRequirements.computer}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveComputer,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setComputersOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationComputersModal;
