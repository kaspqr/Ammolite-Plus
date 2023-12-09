import { Dispatch, SetStateAction, MouseEvent, useState } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { Workstation } from "@/types/domain/location.model";

import { InputField, ReactTable } from "@/views/components/widgets";

import { generateNumericId } from "../../utils";
import { workstationResourcesTableColumns } from "../tables/WorkstationResources.table";

type Props = {
  workstation: Workstation;
  setWorkstation: Dispatch<SetStateAction<Workstation>>;
  jobsOpen: boolean;
  setJobsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationJobsModal = ({ workstation, setWorkstation, jobsOpen, setJobsOpen }: Props) => {
  const [job, setJob] = useState<string>("");

  const handleRemoveJob = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const jobToRemove = workstation.jobs.find(wsJob => wsJob.id === +id);
    if (jobToRemove) {
      const updatedWorkstationJobs = workstation.jobs.filter(wsJob => wsJob !== jobToRemove);
      setWorkstation({
        ...workstation,
        jobs: updatedWorkstationJobs,
      });
    }
  };

  return (
    <Modal isOpen={jobsOpen} toggle={() => setJobsOpen(!jobsOpen)}>
      <ModalHeader>Jobs</ModalHeader>
      <ModalBody>
        <Card className="p-4">
          <Row>
            <Col md="10">
              <InputField
                label="New Job"
                id="workstation-jobs"
                type="text"
                value={job}
                onChange={e => setJob(e.target.value)}
              />
            </Col>
            <Col md="2">
              <Button
                style={{ marginTop: "33px" }}
                size="sm"
                color="success"
                type="button"
                onClick={() => {
                  if (job.length > 0) {
                    setWorkstation({
                      ...workstation,
                      jobs: [{ id: generateNumericId(), name: job }, ...workstation.jobs],
                    });
                    setJob("");
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
              <span className="form-control-label">Jobs</span>
              <ReactTable
                data={workstation.jobs}
                columns={workstationResourcesTableColumns({
                  onDetailsButtonClick: handleRemoveJob,
                })}
              />
            </Col>
          </Row>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setJobsOpen(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WorkstationJobsModal;
