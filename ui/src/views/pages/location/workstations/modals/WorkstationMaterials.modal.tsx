import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockMaterials } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  materialsOpen: boolean;
  setMaterialsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationMaterialsModal = ({
  workstation,
  setWorkstation,
  materialsOpen,
  setMaterialsOpen,
}: Props) => {
  const [materials, setMaterials] = useState<Resource[]>(mockMaterials);
  const [material, setMaterial] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const materialIds: number[] = [];
    workstation.resourceRequirements.materials.forEach(mat => materialIds.push(mat.id));
    const materialsData = mockMaterials.filter(mat => !materialIds.includes(mat.id));
    setMaterials(materialsData);
  }, [workstation]);

  const handleRemoveMaterial = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const materialToRemove = workstation.resourceRequirements.materials.find(mat => mat.id === +id);
    if (materialToRemove) {
      const updatedWorkstationMaterials = workstation.resourceRequirements.materials.filter(
        mat => mat !== materialToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          materials: updatedWorkstationMaterials,
        },
      });
      setMaterials([materialToRemove, ...materials]);
    }
  };

  return (
    <Modal isOpen={materialsOpen} toggle={() => setMaterialsOpen(!materialsOpen)}>
      <ModalHeader>Materials</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-materials"
                label="Pick Material"
                value={stringAsSelectOption(material?.name || "")}
                options={materials.map(material => stringAsSelectOption(material.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedMaterial = materials.find(
                      material => material.name === selectedOption.label
                    );
                    setMaterial(selectedMaterial);
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
                  if (material) {
                    const newMaterials = materials.filter(mat => mat !== material);
                    setMaterials(newMaterials);
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        materials: [material, ...workstation.resourceRequirements.materials],
                      },
                    });
                    setMaterial(undefined);
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
              <span className="form-control-label">Materials</span>
              <ReactTable
                data={workstation.resourceRequirements.materials}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveMaterial,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setMaterialsOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationMaterialsModal;
