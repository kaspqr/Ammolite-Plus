import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container } from "reactstrap";

import { WorkstationTemplate } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllWorkstationTemplateData } from "@/redux/features/location/location.selectors";
import { switchCurrentWorkstationTemplateTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { workstationTemplatesTableColumns } from "../tables/WorkstationTemplates.table";
import { WORKSTATION_TEMPLATE_DETAILS } from "../workstation-templates.routes.const";

const SearchWorkstationTemplatesPanel = () => {
  const dispatch = useAppDispatch();

  const workstationTemplates: WorkstationTemplate[] = useAppSelector(
    selectAllWorkstationTemplateData
  );

  const { setWorkstationTemplateTab } = useContext(LocationTabContext);

  const onViewWorkstationTemplateDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const workstationTemplateToView: WorkstationTemplate | undefined = workstationTemplates.find(
      workstationTemplate => workstationTemplate.id === +id
    );

    if (workstationTemplateToView) {
      dispatch(switchCurrentWorkstationTemplateTo(workstationTemplateToView));
      setWorkstationTemplateTab(WORKSTATION_TEMPLATE_DETAILS);
    } else {
      alerts.errorAlert(`Workstation Template with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h3 className="mb-0">Search Workstation Templates</h3>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={workstationTemplates}
            columns={workstationTemplatesTableColumns({
              onDetailsButtonClick: onViewWorkstationTemplateDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchWorkstationTemplatesPanel;
