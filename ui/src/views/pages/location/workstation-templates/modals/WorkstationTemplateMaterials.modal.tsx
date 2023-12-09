import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, WorkstationTemplate } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockMaterials } from "../../mocks/mocks";
import { workstationTemplateResourcesTableColumns } from "../tables/WorkstationTemplateResources.table";

type Props = {
  workstationTemplate: WorkstationTemplate;
  setWorkstationTemplate: Dispatch<SetStateAction<WorkstationTemplate>>;
  materialsOpen: boolean;
  setMaterialsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTemplateMaterialsModal = ({
  workstationTemplate,
  setWorkstationTemplate,
  materialsOpen,
  setMaterialsOpen,
}: Props) => {
  const [materials, setMaterials] = useState<Resource[]>(mockMaterials);
  const [material, setMaterial] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const materialIds: number[] = [];
    workstationTemplate.resourceRequirements.materials.forEach(mat => materialIds.push(mat.id));
    const materialsData = mockMaterials.filter(mat => !materialIds.includes(mat.id));
    setMaterials(materialsData);
  }, [workstationTemplate]);

  const handleRemoveMaterial = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const materialToRemove = workstationTemplate.resourceRequirements.materials.find(
      mat => mat.id === +id
    );
    if (materialToRemove) {
      const updatedWorkstationTemplateMaterials =
        workstationTemplate.resourceRequirements.materials.filter(mat => mat !== materialToRemove);
      setWorkstationTemplate({
        ...workstationTemplate,
        resourceRequirements: {
          ...workstationTemplate.resourceRequirements,
          materials: updatedWorkstationTemplateMaterials,
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
                    setWorkstationTemplate({
                      ...workstationTemplate,
                      resourceRequirements: {
                        ...workstationTemplate.resourceRequirements,
                        materials: [
                          material,
                          ...workstationTemplate.resourceRequirements.materials,
                        ],
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
                data={workstationTemplate.resourceRequirements.materials}
                columns={workstationTemplateResourcesTableColumns({
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

export default WorkstationTemplateMaterialsModal;
