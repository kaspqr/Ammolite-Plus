import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import CreateWorkstationTemplatePanel from "./create-workstation-templates/CreateWorkstationTemplate.panel";
import SearchWorkstationTemplatesPanel from "./search-workstation-templates/SearchWorkstationTemplates.panel";
import WorkstationTemplateDetailsPanel from "./workstation-template-details/WorkstationTemplateDetails.panel";
import {
  WORKSTATION_TEMPLATE_CREATE,
  WORKSTATION_TEMPLATE_DETAILS,
  WORKSTATION_TEMPLATE_SEARCH,
} from "./workstation-templates.routes.const";

const WorkstationTemplatesPanel = () => {
  const { workstationTemplateTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Workstation Templates</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={workstationTemplateTab}>
            <TabPane tabId={WORKSTATION_TEMPLATE_SEARCH}>
              <SearchWorkstationTemplatesPanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_TEMPLATE_CREATE}>
              <CreateWorkstationTemplatePanel />
            </TabPane>
            <TabPane tabId={WORKSTATION_TEMPLATE_DETAILS}>
              <WorkstationTemplateDetailsPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default WorkstationTemplatesPanel;
