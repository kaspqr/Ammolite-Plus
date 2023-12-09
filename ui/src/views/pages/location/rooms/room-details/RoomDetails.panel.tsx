import { useState, useEffect, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container, CardImg, CardBody } from "reactstrap";

import { LocationUse, Room } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentLocation,
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentRoom,
} from "@/redux/features/location/location.selectors";
import {
  updateLocation,
  switchCurrentRoomTo,
  switchCurrentFloorTo,
} from "@/redux/features/location/location.slice";

import backgroundJpg from "@/assets/img/company/department.jpg";
import locationJpg from "@/assets/img/company/division.jpg";
import { stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { BUILDING_DETAILS, BUILDING_MAIN } from "../../buildings";
import { LocationTabContext } from "../../context/LocationTabContext";
import { FLOOR_DETAILS, FLOOR_MAIN } from "../../floors";
import { useOptions } from "../../location.options.const";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";
import { ROOM_SEARCH } from "../rooms.routes.const";
import {
  handleDeleteRoom,
  handleEditRoom,
  handleToggleRoomActive,
  validateExistingCode,
} from "../utils";

const RoomDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const currentRoom = useAppSelector(selectCurrentRoom);

  const [room, setRoom] = useState<Room>(currentRoom);

  const { setMainTab, setFloorTab, setRoomTab, setBuildingTab, setLocationTab } =
    useContext(LocationTabContext);

  useEffect(() => {
    setRoom(currentRoom);
  }, [currentRoom]);

  const handleToggleActive = () => {
    const { updatedLocation, updatedRoom } = handleToggleRoomActive({
      room,
      floor,
      building,
      location,
    });
    dispatch(switchCurrentRoomTo(updatedRoom));
    dispatch(updateLocation(updatedLocation));
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const codeAvailable = validateExistingCode({ floor, room });
    if (!codeAvailable) alerts.errorAlert("Please choose a unique code", "Invalid Code");
    else {
      const updatedLocation = handleEditRoom({ room, floor, building, location });
      dispatch(updateLocation(updatedLocation));
      dispatch(switchCurrentRoomTo(room));
      setRoomTab(ROOM_SEARCH);
    }
  };

  const handleDelete = () => {
    alerts
      .confirmActionDanger(`Are you sure you wish to delete this room from ${location.title}?`)
      .then(result => {
        if (result.isConfirmed) {
          const { updatedLocation, updatedFloor } = handleDeleteRoom({
            room,
            floor,
            building,
            location,
          });
          dispatch(switchCurrentFloorTo(updatedFloor));
          dispatch(updateLocation(updatedLocation));
          setRoomTab(ROOM_SEARCH);
        }
      });
  };

  return (
    <Container>
      <div className="col">
        <Row>
          <Col md="9">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <h3 className="mb-0">Details of Room {currentRoom.name}</h3>
                    <h3 className="mb-0">on Floor {floor.number}</h3>
                    <h3 className="mb-0">in Building at Address {building.streetAndNumber}</h3>
                    <h3 className="mb-0">of Location {location.title}</h3>
                  </Col>
                  <Col>
                    <Row className="mb-2">
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setFloorTab(FLOOR_DETAILS);
                            setMainTab(FLOOR_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Floor
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setBuildingTab(BUILDING_DETAILS);
                            setMainTab(BUILDING_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Building
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-right">
                        <Button
                          onClick={() => {
                            setLocationTab(LOCATION_DETAILS);
                            setMainTab(LOCATION_MAIN);
                          }}
                          color="success"
                          type="button"
                          size="sm"
                        >
                          View Location
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardHeader>
              <Form onSubmit={handleEdit}>
                <h6 className="heading m-4">Room Details</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <MandatorySelectField
                        label="Use"
                        id="room-use"
                        isMulti
                        options={useOptions}
                        value={room.use.map(use => stringAsSelectOption(use)) || ""}
                        onChange={(newValue: unknown) => {
                          if (newValue) {
                            const selectedOptions = newValue as SelectOption[];
                            const roomUses = selectedOptions.map(
                              option => option.label
                            ) as LocationUse[];
                            setRoom({
                              ...room,
                              use: roomUses,
                            });
                          }
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Name"
                        id="room-name"
                        type="text"
                        required
                        value={room.name || ""}
                        onChange={e => {
                          setRoom({
                            ...room,
                            name: e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label="Code"
                        id="room-code"
                        required
                        value={room.code || ""}
                        onChange={e => {
                          setRoom({
                            ...room,
                            code: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Surface"
                        id="room-surface"
                        type="number"
                        min={0}
                        value={room.surface || ""}
                        onChange={e => {
                          setRoom({
                            ...room,
                            surface: +e.target.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputField
                        label="Picture URL"
                        id="room-picture-url"
                        type="text"
                        value={room.pic || ""}
                        onChange={e => {
                          setRoom({
                            ...room,
                            pic: e.target.value,
                          });
                        }}
                      />
                    </Col>
                    <Col />
                  </Row>
                </Card>
                <h6 className="heading m-4">Coordinates</h6>
                <Card className="p-4 m-4">
                  <Row>
                    <Col>
                      <InputField
                        label="X"
                        id="room-coordinates-x"
                        type="number"
                        value={room.jsonCoords?.x || ""}
                        onChange={e => {
                          setRoom({
                            ...room,
                            jsonCoords: {
                              ...room.jsonCoords,
                              x: +e.target.value,
                            },
                          });
                        }}
                      />
                    </Col>
                    <Col>
                      <InputField
                        label="Y"
                        id="room-coordinates-y"
                        type="number"
                        value={room.jsonCoords?.y || ""}
                        onChange={e => {
                          setRoom({
                            ...room,
                            jsonCoords: {
                              ...room.jsonCoords,
                              y: +e.target.value,
                            },
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
                <Row className="pb-4 px-4">
                  <Col>
                    <Button onClick={() => setRoomTab(ROOM_SEARCH)} color="light" type="button">
                      Cancel
                    </Button>
                  </Col>
                  <Col className="text-right">
                    <Button color="info" type="submit">
                      Edit Room
                    </Button>
                  </Col>
                </Row>
                <Row className="pb-4 px-4">
                  <Col className="text-right">
                    <Button onClick={handleToggleActive} color="warning" type="button">
                      {room.active ? "Deactivate" : "Activate"}
                    </Button>
                  </Col>
                </Row>
                <Row className="pb-4 px-4">
                  <Col className="text-right">
                    <Button onClick={handleDelete} color="danger" type="button">
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardImg alt="..." src={backgroundJpg} top />
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        width="140px"
                        height="140px"
                        className="rounded-circle"
                        src={locationJpg}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardBody className="pt-5">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{room.surface}</span>
                        <span className="description">Surface</span>
                      </div>
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RoomDetailsPanel;
