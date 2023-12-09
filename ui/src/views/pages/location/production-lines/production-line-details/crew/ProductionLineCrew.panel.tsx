import { MouseEvent } from "react";

import { Button, Card, CardHeader, Col, Row } from "reactstrap";

import { ReactTable } from "@/views/components/widgets";

import { productionLineObjectTableColumns } from "../tables/ProductionLineObjects.table";

const ProductionLineCrewPanel = () => {
  const onViewEmployeeDetails = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h6 className="heading m-4">Crew</h6>
      <Card className="p-4 m-4">
        <CardHeader>
          <Row>
            <Col>
              <h3 className="mb-0">Search Employees</h3>
            </Col>
            <Col className="text-right">
              <Button
                className="btn btn-success"
                color="primary"
                size="sm"
                type="button"
                onClick={() => {}}
              >
                New
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <ReactTable
          data={[]}
          columns={productionLineObjectTableColumns({
            onDetailsButtonClick: onViewEmployeeDetails,
          })}
        />
      </Card>
    </>
  );
};

export default ProductionLineCrewPanel;
