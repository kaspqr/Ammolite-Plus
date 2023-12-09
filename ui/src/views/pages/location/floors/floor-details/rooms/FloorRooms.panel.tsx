import { useEffect, useState, MouseEvent, useContext } from "react";

import { Button, Card, Col, Row } from "reactstrap";

import { Room } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentFloor } from "@/redux/features/location/location.selectors";
import { switchCurrentRoomTo } from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { ReactTable } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import { ROOM_CREATE, ROOM_DETAILS, ROOM_MAIN } from "../../../rooms";
import { roomsTableColumns } from "../../../rooms/search-rooms/Rooms.table";

const FloorRoomsPanel = () => {
  const dispatch = useAppDispatch();
  const currentFloor = useAppSelector(selectCurrentFloor);
  const [floor, setFloor] = useState(currentFloor);

  const { setMainTab, setRoomTab } = useContext(LocationTabContext);

  useEffect(() => {
    setFloor(currentFloor);
  }, [currentFloor]);

  const onViewRoomDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const roomToView: Room | undefined = floor.rooms.find(room => room.id === +id);
    if (roomToView) {
      dispatch(switchCurrentRoomTo(roomToView));
      setRoomTab(ROOM_DETAILS);
      setMainTab(ROOM_MAIN);
    } else {
      alerts.errorAlert(`Room with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <>
      <h6 className="heading m-4">Rooms</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col className="text-right mb-4">
            <Button
              onClick={() => {
                setRoomTab(ROOM_CREATE);
                setMainTab(ROOM_MAIN);
              }}
              className="btn btn-success"
              color="primary"
              size="sm"
              type="button"
            >
              New
            </Button>
          </Col>
        </Row>
        <ReactTable
          data={floor.rooms || []}
          columns={roomsTableColumns({
            onDetailsButtonClick: onViewRoomDetails,
          })}
        />
      </Card>
    </>
  );
};

export default FloorRoomsPanel;
