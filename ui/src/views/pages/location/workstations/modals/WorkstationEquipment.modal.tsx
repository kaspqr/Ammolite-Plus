import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockEquipment } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  equipmentsOpen: boolean;
  setEquipmentsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationEquipmentsModal = ({
  workstation,
  setWorkstation,
  equipmentsOpen,
  setEquipmentsOpen,
}: Props) => {
  const [equipments, setEquipments] = useState<Resource[]>(mockEquipment);
  const [equipment, setEquipment] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const equipmentIds: number[] = [];
    workstation.resourceRequirements.equipment.forEach(eq => equipmentIds.push(eq.id));
    const equipmentsData = mockEquipment.filter(eq => !equipmentIds.includes(eq.id));
    setEquipments(equipmentsData);
  }, [workstation]);

  const handleRemoveEquipment = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const equipmentToRemove = workstation.resourceRequirements.equipment.find(eq => eq.id === +id);
    if (equipmentToRemove) {
      const updatedWorkstationEquipments = workstation.resourceRequirements.equipment.filter(
        eq => eq !== equipmentToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          equipment: updatedWorkstationEquipments,
        },
      });
      setEquipments([equipmentToRemove, ...equipments]);
    }
  };

  return (
    <Modal isOpen={equipmentsOpen} toggle={() => setEquipmentsOpen(!equipmentsOpen)}>
      <ModalHeader>Equipments</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-equipments"
                label="Pick Equipment"
                value={stringAsSelectOption(equipment?.name || "")}
                options={equipments.map(equipment => stringAsSelectOption(equipment.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedEquipment = equipments.find(
                      equipment => equipment.name === selectedOption.label
                    );
                    setEquipment(selectedEquipment);
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
                  if (equipment) {
                    const newEquipments = equipments.filter(mat => mat !== equipment);
                    setEquipments(newEquipments);
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        equipment: [equipment, ...workstation.resourceRequirements.equipment],
                      },
                    });
                    setEquipment(undefined);
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
              <span className="form-control-label">Equipments</span>
              <ReactTable
                data={workstation.resourceRequirements.equipment}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveEquipment,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setEquipmentsOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationEquipmentsModal;
