import { useState, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container } from "reactstrap";

import { LocationUse, Room, emptyRoom } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentLocation,
} from "@/redux/features/location/location.selectors";
import { updateLocation, switchCurrentFloorTo } from "@/redux/features/location/location.slice";

import { stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { FLOOR_DETAILS, FLOOR_MAIN } from "../../floors";
import { useOptions } from "../../location.options.const";
import { handleCreateRoom, validateNewCode } from "../utils";

const CreateRoomPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);

  const [room, setRoom] = useState<Room>(emptyRoom);

  const { setFloorTab, setMainTab } = useContext(LocationTabContext);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const codeAvailable = validateNewCode({ floor, room });
    if (!codeAvailable) alerts.errorAlert("Please choose a unique code", "Invalid Code");
    else {
      const { updatedLocation, updatedFloor } = handleCreateRoom({
        room,
        floor,
        building,
        location,
      });
      dispatch(updateLocation(updatedLocation));
      dispatch(switchCurrentFloorTo(updatedFloor));
      setRoom(emptyRoom);
      setFloorTab(FLOOR_DETAILS);
      setMainTab(FLOOR_MAIN);
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Add Room</h3>
                <h3 className="mb-0">to Floor {floor.number}</h3>
                <h3 className="mb-0">in Building at Address {building.streetAndNumber}</h3>
                <h3 className="mb-0">of Location {location.title}</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleCreate}>
            <h6 className="heading m-4">New Room Details</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <MandatorySelectField
                    label="Use"
                    id="create-room-use"
                    isMulti
                    options={useOptions}
                    value={room.use?.map(use => stringAsSelectOption(use)) || ""}
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
                    type="text"
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
                <Button
                  onClick={() => {
                    setFloorTab(FLOOR_DETAILS);
                    setMainTab(FLOOR_MAIN);
                  }}
                  color="light"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-right">
                <Button color="info" type="submit">
                  Add Room
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateRoomPanel;
