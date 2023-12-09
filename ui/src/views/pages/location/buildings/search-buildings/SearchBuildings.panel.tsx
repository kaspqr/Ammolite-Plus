import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container } from "reactstrap";

import { Building } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllBuildingData } from "@/redux/features/location/location.selectors";
import { switchCurrentBuildingTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { BUILDING_DETAILS } from "../buildings.routes.const";

import { buildingsTableColumns } from "./Buildings.table";

const SearchBuildingsPanel = () => {
  const dispatch = useAppDispatch();
  const { setBuildingTab } = useContext(LocationTabContext);

  const buildings = useAppSelector(selectAllBuildingData);

  const onViewBuildingDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const buildingToView: Building | undefined = buildings.find(building => building.id === +id);
    if (buildingToView) {
      dispatch(switchCurrentBuildingTo(buildingToView));
      setBuildingTab(BUILDING_DETAILS);
    } else {
      alerts.errorAlert(`Building with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Search Buildings</h3>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={buildings}
            columns={buildingsTableColumns({
              onDetailsButtonClick: onViewBuildingDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchBuildingsPanel;
