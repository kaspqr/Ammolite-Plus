import { Dispatch, SetStateAction, MouseEvent, useState } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Workstation } from "@/types/domain/location.model";

import { InputField, ReactTable } from "@/views/components/widgets";

import { generateNumericId } from "../../utils";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  tasksOpen: boolean;
  setTasksOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTasksModal = ({ workstation, setWorkstation, tasksOpen, setTasksOpen }: Props) => {
  const [task, setTask] = useState<string>("");

  const handleRemoveTask = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const taskToRemove = workstation.tasks.find(wsTask => wsTask.id === +id);
    if (taskToRemove) {
      const updatedWorkstationTasks = workstation.tasks.filter(wsTask => wsTask !== taskToRemove);
      setWorkstation({
        ...workstation,
        tasks: updatedWorkstationTasks,
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
                id="workstation-tasks"
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
                    setWorkstation({
                      ...workstation,
                      tasks: [{ id: generateNumericId(), name: task }, ...workstation.tasks],
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
                data={workstation.tasks}
                columns={workstationResourcesTableColumns({
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

export default WorkstationTasksModal;
