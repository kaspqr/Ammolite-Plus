import { Card, CardHeader, Col, Container, Row } from "reactstrap";

import { useAppSelector } from "@/redux/app";
import { selectAllLocationData } from "@/redux/features/location/location.selectors";

import BarChart from "./BarChart";
import { COLORS } from "./colors";
import MapChart from "./MapChart";
import PieChart from "./PieChart";
import {
  ownerPercentagesData,
  surfaceByOwnerData,
  surfaceByUseData,
  usePercentagesData,
} from "./utils";

const LocationAnalyticsPanel = () => {
  const locations = useAppSelector(selectAllLocationData);
  const { usePercentagesValues, usePercentagesKeys } = usePercentagesData({ locations });
  const { ownerPercentagesValues, ownerPercentagesKeys } = ownerPercentagesData({ locations });
  const { useSurfaceValues, useSurfaceKeys } = surfaceByUseData({ locations });
  const { ownerSurfaceValues, ownerSurfaceKeys } = surfaceByOwnerData({ locations });

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Analytics</h3>
              </Col>
            </Row>
          </CardHeader>
          <Card className="p-4 m-4">
            <Row>
              <Col>
                <h6 className="heading m-4">Use</h6>
                <PieChart
                  data={usePercentagesValues}
                  labels={usePercentagesKeys}
                  title="use"
                  colors={COLORS.primary}
                />
              </Col>
              <Col>
                <h6 className="heading m-4">Ownership</h6>
                <PieChart
                  data={ownerPercentagesValues}
                  labels={ownerPercentagesKeys}
                  title="owner"
                  colors={COLORS.secondary}
                />
              </Col>
            </Row>
          </Card>
          <Card className="p-4 m-4">
            <Row>
              <Col>
                <h6 className="heading m-4">Square Meters by Use</h6>
                <BarChart
                  data={useSurfaceValues}
                  labels={useSurfaceKeys}
                  title="use"
                  color="#FF6347"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="heading m-4">Square Meters by Ownership</h6>
                <BarChart
                  data={ownerSurfaceValues}
                  labels={ownerSurfaceKeys}
                  title="owner"
                  color="#32CD32"
                />
              </Col>
            </Row>
          </Card>
          <Card className="p-4 m-4">
            <h6 className="heading m-4">Countries</h6>
            <Row className="text-center">
              <MapChart locations={locations} />
            </Row>
          </Card>
        </Card>
      </div>
    </Container>
  );
};

export default LocationAnalyticsPanel;
