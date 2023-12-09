import { MouseEvent } from "react";

import { Button, Card, CardHeader, Col, Row } from "reactstrap";

import { ReactTable } from "@/views/components/widgets";

import { productionLineObjectTableColumns } from "../tables/ProductionLineObjects.table";

const ProductionLineResourcesPanel = () => {
  const onViewResourceDetails = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h6 className="heading m-4">Resources</h6>
      <Card className="p-4 m-4">
        <CardHeader>
          <Row>
            <Col>
              <h3 className="mb-0">Search Resources</h3>
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
            onDetailsButtonClick: onViewResourceDetails,
          })}
        />
      </Card>
    </>
  );
};

export default ProductionLineResourcesPanel;
