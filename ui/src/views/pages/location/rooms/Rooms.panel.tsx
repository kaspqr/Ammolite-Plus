import { useContext, useEffect, useState } from "react";

import { TabContent, TabPane, Col, Row, Card, CardHeader, CardBody, Container } from "reactstrap";

import { LocationTabContext } from "../context/LocationTabContext";

import CreateRoomPanel from "./create-room/CreateRoom.panel";
import RoomDetailsPanel from "./room-details/RoomDetails.panel";
import { ROOM_SEARCH, ROOM_CREATE, ROOM_DETAILS } from "./rooms.routes.const";
import SearchRoomsPanel from "./search-rooms/SearchRooms.panel";

const RoomsPanel = () => {
  const { roomTab } = useContext(LocationTabContext);

  const [currentRoomTab, setCurrentRoomTab] = useState(roomTab);

  useEffect(() => {
    setCurrentRoomTab(roomTab);
  }, [roomTab]);

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row className="align-items-center justify-content-between">
              <Col lg="auto">
                <h3 className="mb-0">Rooms</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody />
          <TabContent activeTab={currentRoomTab}>
            <TabPane tabId={ROOM_SEARCH}>
              <SearchRoomsPanel />
            </TabPane>
            <TabPane tabId={ROOM_CREATE}>
              <CreateRoomPanel />
            </TabPane>
            <TabPane tabId={ROOM_DETAILS}>
              <RoomDetailsPanel />
            </TabPane>
          </TabContent>
        </Card>
      </div>
    </Container>
  );
};

export default RoomsPanel;
