import { Dispatch, SetStateAction, MouseEvent, useState, useEffect } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Resource, Workstation } from "@/types/domain/location.model";

import { stringAsSelectOption } from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { MandatorySelectField, ReactTable } from "@/views/components/widgets";

import { mockConsumables } from "../../mocks/mocks";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  consumablesOpen: boolean;
  setConsumablesOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationConsumablesModal = ({
  workstation,
  setWorkstation,
  consumablesOpen,
  setConsumablesOpen,
}: Props) => {
  const [consumables, setConsumables] = useState<Resource[]>(mockConsumables);
  const [consumable, setConsumable] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const consumableIds: number[] = [];
    workstation.resourceRequirements.consumable.forEach(cons => consumableIds.push(cons.id));
    const consumablesData = mockConsumables.filter(cons => !consumableIds.includes(cons.id));
    setConsumables(consumablesData);
  }, [workstation]);

  const handleRemoveConsumable = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const consumableToRemove = workstation.resourceRequirements.consumable.find(
      cons => cons.id === +id
    );
    if (consumableToRemove) {
      const updatedWorkstationConsumables = workstation.resourceRequirements.consumable.filter(
        cons => cons !== consumableToRemove
      );
      setWorkstation({
        ...workstation,
        resourceRequirements: {
          ...workstation.resourceRequirements,
          consumable: updatedWorkstationConsumables,
        },
      });
      setConsumables([consumableToRemove, ...consumables]);
    }
  };

  return (
    <Modal isOpen={consumablesOpen} toggle={() => setConsumablesOpen(!consumablesOpen)}>
      <ModalHeader>Consumables</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <MandatorySelectField
                id="required-consumables"
                label="Pick Consumable"
                value={stringAsSelectOption(consumable?.name || "")}
                options={consumables.map(consumable => stringAsSelectOption(consumable.name))}
                onChange={(newValue: unknown) => {
                  if (newValue) {
                    const selectedOption = newValue as SelectOption;
                    const selectedConsumable = consumables.find(
                      consumable => consumable.name === selectedOption.label
                    );
                    setConsumable(selectedConsumable);
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
                  if (consumable) {
                    const newConsumables = consumables.filter(mat => mat !== consumable);
                    setConsumables(newConsumables);
                    setWorkstation({
                      ...workstation,
                      resourceRequirements: {
                        ...workstation.resourceRequirements,
                        consumable: [consumable, ...workstation.resourceRequirements.consumable],
                      },
                    });
                    setConsumable(undefined);
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
              <span className="form-control-label">Consumables</span>
              <ReactTable
                data={workstation.resourceRequirements.consumable}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveConsumable,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setConsumablesOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationConsumablesModal;
