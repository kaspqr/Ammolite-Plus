import { Dispatch, SetStateAction, MouseEvent, useState } from "react";

import { Button, Card, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { WorkstationTemplate } from "@/types/domain/location.model";

import { InputField, ReactTable } from "@/views/components/widgets";

import { generateNumericId } from "../../utils";
import { workstationTemplateResourcesTableColumns } from "../tables/WorkstationTemplateResources.table";

type Props = {
  workstationTemplate: WorkstationTemplate;
  setWorkstationTemplate: Dispatch<SetStateAction<WorkstationTemplate>>;
  jobsOpen: boolean;
  setJobsOpen: Dispatch<SetStateAction<boolean>>;
};

const WorkstationTemplateJobsModal = ({
  workstationTemplate,
  setWorkstationTemplate,
  jobsOpen,
  setJobsOpen,
}: Props) => {
  const [job, setJob] = useState<string>("");

  const handleRemoveJob = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const jobToRemove = workstationTemplate.jobs.find(wsJob => wsJob.id === +id);
    if (jobToRemove) {
      const updatedWorkstationTemplateJobs = workstationTemplate.jobs.filter(
        wsJob => wsJob !== jobToRemove
      );
      setWorkstationTemplate({
        ...workstationTemplate,
        jobs: updatedWorkstationTemplateJobs,
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
                id="workstationTemplate-jobs"
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
                    setWorkstationTemplate({
                      ...workstationTemplate,
                      jobs: [{ id: generateNumericId(), name: job }, ...workstationTemplate.jobs],
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
                data={workstationTemplate.jobs}
                columns={workstationTemplateResourcesTableColumns({
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

export default WorkstationTemplateJobsModal;
