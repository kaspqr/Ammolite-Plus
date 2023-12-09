import { Dispatch, SetStateAction } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { WorkstationTemplate } from "@/types/domain/location.model";

import { InputField } from "@/views/components/widgets";

type Props = {
  workstationTemplate: WorkstationTemplate;
  setWorkstationTemplate: Dispatch<SetStateAction<WorkstationTemplate>>;
  energyOpen: boolean;
  setEnergyOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTemplateEnergyModal = ({
  workstationTemplate,
  setWorkstationTemplate,
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
                value={workstationTemplate.resourceRequirements.energySupply}
                onChange={e =>
                  setWorkstationTemplate({
                    ...workstationTemplate,
                    resourceRequirements: {
                      ...workstationTemplate.resourceRequirements,
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

export default WorkstationTemplateEnergyModal;
