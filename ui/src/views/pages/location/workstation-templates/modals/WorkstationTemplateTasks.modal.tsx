import { Dispatch, SetStateAction, MouseEvent, useState } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { WorkstationTemplate } from "@/types/domain/location.model";

import { InputField, ReactTable } from "@/views/components/widgets";

import { generateNumericId } from "../../utils";
import { workstationTemplateResourcesTableColumns } from "../tables/WorkstationTemplateResources.table";

type Props = {
  workstationTemplate: WorkstationTemplate;
  setWorkstationTemplate: Dispatch<SetStateAction<WorkstationTemplate>>;
  tasksOpen: boolean;
  setTasksOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTemplateTasksModal = ({
  workstationTemplate,
  setWorkstationTemplate,
  tasksOpen,
  setTasksOpen,
}: Props) => {
  const [task, setTask] = useState<string>("");

  const handleRemoveTask = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const taskToRemove = workstationTemplate.tasks.find(wsTask => wsTask.id === +id);
    if (taskToRemove) {
      const updatedWorkstationTemplateTasks = workstationTemplate.tasks.filter(
        wsTask => wsTask !== taskToRemove
      );
      setWorkstationTemplate({
        ...workstationTemplate,
        tasks: updatedWorkstationTemplateTasks,
      });
    }
  };

  return (
    <Modal isOpen={tasksOpen} toggle={() => setTasksOpen(!tasksOpen)}>
      <ModalHeader>Tasks</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <InputField
                label="New Task"
                id="workstationTemplate-tasks"
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
              />
            </Col>
            <Col md="2">
              <Button
                style={{ marginTop: "33px" }}
                size="sm"
                color="success"
                type="button"
                onClick={() => {
                  if (task.length > 0) {
                    setWorkstationTemplate({
                      ...workstationTemplate,
                      tasks: [
                        { id: generateNumericId(), name: task },
                        ...workstationTemplate.tasks,
                      ],
                    });
                    setTask("");
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
              <span className="form-control-label">Tasks</span>
              <ReactTable
                data={workstationTemplate.tasks}
                columns={workstationTemplateResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveTask,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setTasksOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationTemplateTasksModal;
