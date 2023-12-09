import { MouseEvent, useContext } from "react";

import { Card, CardHeader, Row, Col, Container } from "reactstrap";

import { Room } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectAllRoomData } from "@/redux/features/location/location.selectors";
import { switchCurrentRoomTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { ROOM_DETAILS } from "../rooms.routes.const";

import { roomsTableColumns } from "./Rooms.table";

const SearchRoomsPanel = () => {
  const dispatch = useAppDispatch();

  const { setRoomTab } = useContext(LocationTabContext);

  const rooms: Room[] = useAppSelector(selectAllRoomData);

  const onViewRoomDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const roomToView: Room | undefined = rooms.find(room => room.id === +id);
    if (roomToView) {
      dispatch(switchCurrentRoomTo(roomToView));
      setRoomTab(ROOM_DETAILS);
    } else {
      alerts.errorAlert(`Room with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Search Rooms</h3>
              </Col>
            </Row>
          </CardHeader>
          <ReactTable
            data={rooms}
            columns={roomsTableColumns({
              onDetailsButtonClick: onViewRoomDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchRoomsPanel;
