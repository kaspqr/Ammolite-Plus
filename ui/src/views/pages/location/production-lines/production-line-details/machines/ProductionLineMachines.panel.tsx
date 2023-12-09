import { MouseEvent } from "react";

import { Card, CardHeader, Col, Row } from "reactstrap";

import { Resource } from "@/types/domain/location.model";

import { useAppSelector } from "@/redux/app";
import { selectCurrentProductionLine } from "@/redux/features/location/location.selectors";

import { ReactTable } from "@/views/components/widgets";

import { productionLineObjectTableColumns } from "../tables/ProductionLineObjects.table";

const ProductionLineMachinesPanel = () => {
  const currentProductionLine = useAppSelector(selectCurrentProductionLine);

  const productionLineMachines: Resource[] = currentProductionLine.workstations.flatMap(
    ws => ws.resourceRequirements.machines
  );

  const onViewMachineDetails = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h6 className="heading m-4">Machines</h6>
      <Card className="p-4 m-4">
        <CardHeader>
          <Row>
            <Col>
              <h3 className="mb-0">Search Machines</h3>
            </Col>
          </Row>
        </CardHeader>
        <ReactTable
          data={productionLineMachines}
          columns={productionLineObjectTableColumns({
            onDetailsButtonClick: onViewMachineDetails,
          })}
        />
      </Card>
    </>
  );
};

export default ProductionLineMachinesPanel;
