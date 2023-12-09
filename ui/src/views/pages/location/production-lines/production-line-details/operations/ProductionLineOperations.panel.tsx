import { MouseEvent } from "react";

import { Button, Card, CardHeader, Col, Row } from "reactstrap";

import { ReactTable } from "@/views/components/widgets";

import { productionLineObjectTableColumns } from "../tables/ProductionLineObjects.table";

const ProductionLineOperationsPanel = () => {
  const onViewOperationDetails = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h6 className="heading m-4">Operations</h6>
      <Card className="p-4 m-4">
        <CardHeader>
          <Row>
            <Col>
              <h3 className="mb-0">Search Operations</h3>
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
            onDetailsButtonClick: onViewOperationDetails,
          })}
        />
      </Card>
    </>
  );
};

export default ProductionLineOperationsPanel;
