import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockAssemblyParts } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  subsOpen: boolean;
  setSubsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationSubAssembliesModal = ({
  workstation,
  setWorkstation,
  subsOpen,
  setSubsOpen,
}: Props) => {
  const [assemblyParts, setAssemblyParts] = useState<Resource[]>(mockAssemblyParts);
  const [assemblyPart, setAssemblyPart] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const assemblyPartIds: number[] = [];
    workstation.resourceRequirements.subAssemblies.forEach(part => assemblyPartIds.push(part.id));
    const assemblyPartsData = mockAssemblyParts.filter(part => !assemblyPartIds.includes(part.id));
    setAssemblyParts(assemblyPartsData);
  }, [workstation]);

  const handleRemoveAssemblyPart = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const assemblyPartToRemove = workstation.resourceRequirements.subAssemblies.find(
      part => part.id === +id
    );
    if (assemblyPartToRemove) {
      const updatedWorkstationAssemblyParts = workstation.resourceRequirements.subAssemblies.filter(
        part => part !== assemblyPartToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          subAssemblies: updatedWorkstationAssemblyParts,
        },
      });
      setAssemblyParts([assemblyPartToRemove, ...assemblyParts]);
    }
  };

  return (
    <Modal isOpen={subsOpen} toggle={() => setSubsOpen(!subsOpen)}>
      <ModalHeader>Sub Assemblies</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-assembly-parts"
                label="Pick Assembly Part"
                value={stringAsSelectOption(assemblyPart?.name || "")}
                options={assemblyParts.map(assemblyPart => stringAsSelectOption(assemblyPart.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedAssemblyPart = assemblyParts.find(
                      assemblyPart => assemblyPart.name === selectedOption.label
                    );
                    setAssemblyPart(selectedAssemblyPart);
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
                  if (assemblyPart) {
                    const newAssemblyParts = assemblyParts.filter(mat => mat !== assemblyPart);
                    setAssemblyParts(newAssemblyParts);
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        subAssemblies: [
                          assemblyPart,
                          ...workstation.resourceRequirements.subAssemblies,
                        ],
                      },
                    });
                    setAssemblyPart(undefined);
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
              <span className="form-control-label">Assembly Parts</span>
              <ReactTable
                data={workstation.resourceRequirements.subAssemblies}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveAssemblyPart,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setSubsOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationSubAssembliesModal;
