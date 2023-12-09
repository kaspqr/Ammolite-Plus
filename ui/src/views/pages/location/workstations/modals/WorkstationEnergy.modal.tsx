import { Dispatch, SetStateAction } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Workstation } from "@/types/domain/location.model";

import { InputField } from "@/views/components/widgets";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  energyOpen: boolean;
  setEnergyOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationEnergyModal = ({
  workstation,
  setWorkstation,
  energyOpen,
  setEnergyOpen,
}: Props) => {
  return (
    <Modal isOpen={energyOpen} toggle={() => setEnergyOpen(!energyOpen)}>
      <ModalHeader>Energy Supply</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col>
              <InputField
                id="required-energy"
                label="Required Energy Supply"
                type="number"
                min={0}
                value={workstation.resourceRequirements.energySupply}
                onChange={e =>
                  setWorkstation({
                    ...workstation,
                    resourceRequirements: {
                      ...workstation.resourceRequirements,
                      energySupply: +e.target.value,
                    },
                  })
                }
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setEnergyOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationEnergyModal;
