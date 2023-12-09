import { useContext } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import CreateProductionLinePanel from "./create-production-line/CreateProductionLine.panel";
import ProductionLinePanel from "./production-line-details/ProductionLine.panel";
import {
  PRODUCTION_LINE_SEARCH,
  PRODUCTION_LINE_CREATE,
  PRODUCTION_LINE_DETAILS,
} from "./production-lines.routes.const";
import SearchProductionLinesPanel from "./search-production-lines/SearchProductionLines.panel";

const ProductionLinesPanel = () => {
  const { productionLineTab } = useContext(LocationTabContext);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Production Lines</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={productionLineTab}>
            <TabPane tabId={PRODUCTION_LINE_SEARCH}>
              <SearchProductionLinesPanel />
            </TabPane>
            <TabPane tabId={PRODUCTION_LINE_CREATE}>
              <CreateProductionLinePanel />
            </TabPane>
            <TabPane tabId={PRODUCTION_LINE_DETAILS}>
              <ProductionLinePanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default ProductionLinesPanel;
