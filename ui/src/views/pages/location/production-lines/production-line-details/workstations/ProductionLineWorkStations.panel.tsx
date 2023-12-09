import { MouseEvent, useContext } from "react";

import { Button, Card, CardHeader, Col, Row } from "reactstrap";

import { Workstation, WorkstationTemplate } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentProductionLine } from "@/redux/features/location/location.selectors";
import {
  switchCurrentWorkstationTemplateTo,
  switchCurrentWorkstationTo,
} from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable, SinglePageTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import {
  WORKSTATION_TEMPLATE_CREATE,
  WORKSTATION_TEMPLATE_DETAILS,
  WORKSTATION_TEMPLATE_MAIN,
} from "../../../workstation-templates";
import { workstationTemplatesTableColumns } from "../../../workstation-templates/tables/WorkstationTemplates.table";
import {
  WORKSTATION_CHOOSE_PRODUCTION_LINE,
  WORKSTATION_DETAILS,
  WORKSTATION_MAIN,
} from "../../../workstations";
import { workstationsTableColumns } from "../../../workstations/tables/Workstations.table";

const ProductionLineWorkStationsPanel = () => {
  const dispatch = useAppDispatch();
  const currentProductionLine = useAppSelector(selectCurrentProductionLine);

  const { setWorkstationTab, setWorkstationTemplateTab, setMainTab } =
    useContext(LocationTabContext);

  const onViewWorkstationDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const workstationToView: Workstation | undefined = currentProductionLine.workstations.find(
      workstation => workstation.id === +id
    );

    if (workstationToView) {
      dispatch(switchCurrentWorkstationTo(workstationToView));
      setWorkstationTab(WORKSTATION_DETAILS);
      setMainTab(WORKSTATION_MAIN);
    } else {
      alerts.errorAlert(`Workstation with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  const onViewWorkstationTemplateDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const workstationTemplateToView: WorkstationTemplate | undefined =
      currentProductionLine.workstationTemplate;

    if (workstationTemplateToView) {
      dispatch(switchCurrentWorkstationTemplateTo(workstationTemplateToView));
      setWorkstationTemplateTab(WORKSTATION_TEMPLATE_DETAILS);
      setMainTab(WORKSTATION_TEMPLATE_MAIN);
    } else {
      alerts.errorAlert(`Workstation Template with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <>
      <h6 className="heading m-4">Workstation Template</h6>
      <Card className="p-4 m-4">
        {!currentProductionLine.workstationTemplate && (
          <CardHeader>
            <Row>
              <Col>
                <h3 className="mb-0">Template</h3>
              </Col>
              <Col className="text-right">
                <Button
                  size="sm"
                  color="success"
                  type="button"
                  onClick={() => {
                    setWorkstationTemplateTab(WORKSTATION_TEMPLATE_CREATE);
                    setMainTab(WORKSTATION_TEMPLATE_MAIN);
                  }}
                >
                  New
                </Button>
              </Col>
            </Row>
          </CardHeader>
        )}
        <SinglePageTable
          data={
            currentProductionLine.workstationTemplate
              ? [currentProductionLine.workstationTemplate]
              : []
          }
          columns={workstationTemplatesTableColumns({
            onDetailsButtonClick: onViewWorkstationTemplateDetails,
          })}
        />
      </Card>
      <h6 className="heading m-4">Workstations</h6>
      <Card className="p-4 m-4">
        <CardHeader>
          <Row>
            <Col>
              <h3 className="mb-0">Search Workstations</h3>
            </Col>
            <Col className="text-right">
              <Button
                className="btn btn-success"
                color="primary"
                size="sm"
                type="button"
                onClick={() => {
                  setWorkstationTab(WORKSTATION_CHOOSE_PRODUCTION_LINE);
                  setMainTab(WORKSTATION_MAIN);
                }}
              >
                New
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <ReactTable
          data={currentProductionLine.workstations}
          columns={workstationsTableColumns({
            onDetailsButtonClick: onViewWorkstationDetails,
          })}
        />
      </Card>
    </>
  );
};

export default ProductionLineWorkStationsPanel;
