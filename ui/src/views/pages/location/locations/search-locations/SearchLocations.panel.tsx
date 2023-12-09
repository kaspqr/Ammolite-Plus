import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container, Button } from "reactstrap";

import { Location } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllLocationData } from "@/redux/features/location/location.selectors";
import { switchCurrentLocationTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { LOCATION_CREATE, LOCATION_DETAILS } from "../locations.routes.const";

import { locationsTableColumns } from "./Locations.table";

const SearchLocationsPanel = () => {
  const dispatch = useAppDispatch();

  const locations = useAppSelector(selectAllLocationData);

  const { setLocationTab } = useContext(LocationTabContext);

  const onViewLocationDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const locationToView: Location | undefined = locations.find(location => location.id === +id);
    if (locationToView) {
      dispatch(switchCurrentLocationTo(locationToView));
      setLocationTab(LOCATION_DETAILS);
    } else {
      alerts.errorAlert(`Location with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h3 className="mb-0">Search Locations</h3>
              </Col>
              <Col className="text-right">
                <Button
                  className="btn btn-success"
                  color="primary"
                  size="sm"
                  type="button"
                  onClick={() => setLocationTab(LOCATION_CREATE)}
                >
                  New
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={locations}
            columns={locationsTableColumns({
              onDetailsButtonClick: onViewLocationDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchLocationsPanel;
