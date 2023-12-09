import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container } from "reactstrap";

import { Floor } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllFloorData } from "@/redux/features/location/location.selectors";
import { switchCurrentFloorTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { FLOOR_DETAILS } from "../floors.routes.const";

import { floorsTableColumns } from "./Floors.table";

const SearchFloorsPanel = () => {
  const dispatch = useAppDispatch();

  const floors: Floor[] = useAppSelector(selectAllFloorData);

  const { setFloorTab } = useContext(LocationTabContext);

  const onViewFloorDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const floorToView: Floor | undefined = floors.find(floor => floor.id === +id);
    if (floorToView) {
      dispatch(switchCurrentFloorTo(floorToView));
      setFloorTab(FLOOR_DETAILS);
    } else {
      alerts.errorAlert(`Floor with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Search Floors</h3>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={floors}
            columns={floorsTableColumns({
              onDetailsButtonClick: onViewFloorDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchFloorsPanel;
