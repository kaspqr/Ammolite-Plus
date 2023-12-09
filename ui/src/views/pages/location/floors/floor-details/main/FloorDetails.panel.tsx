import { useState, useEffect, FormEvent, useContext } from "react";

import { Button, Form, Card, Col, Row, Label, Input } from "reactstrap";

import { Floor, LocationUse } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentLocation,
  selectCurrentBuilding,
  selectCurrentFloor,
} from "@/redux/features/location/location.selectors";
import {
  updateLocation,
  switchCurrentFloorTo,
  switchCurrentBuildingTo,
} from "@/redux/features/location/location.slice";

import { stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { FileInput, InputField, MandatorySelectField } from "@/views/components/widgets";

import { FLOOR_SEARCH, handleDeleteFloor, handleEditFloor, handleToggleFloorActive } from "../..";
import { LocationTabContext } from "../../../context/LocationTabContext";
import { useOptions } from "../../../location.options.const";

const FloorDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const currentFloor = useAppSelector(selectCurrentFloor);

  const [floor, setFloor] = useState<Floor>(currentFloor);

  const { setFloorTab } = useContext(LocationTabContext);

  useEffect(() => {
    setFloor(currentFloor);
  }, [currentFloor]);

  const handleToggleActive = () => {
    const { updatedLocation, updatedFloor } = handleToggleFloorActive({
      floor,
      building,
      location,
    });
    dispatch(switchCurrentFloorTo(updatedFloor));
    dispatch(updateLocation(updatedLocation));
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const updatedLocation = handleEditFloor({ floor, building, location });
    dispatch(updateLocation(updatedLocation));
    dispatch(switchCurrentFloorTo(floor));
    setFloorTab(FLOOR_SEARCH);
  };

  const handleDelete = () => {
    alerts
      .confirmActionDanger(`Are you sure you wish to delete this floor from ${location.title}?`)
      .then(result => {
        if (result.isConfirmed) {
          const { updatedLocation, updatedBuilding } = handleDeleteFloor({
            floor,
            building,
            location,
          });
          dispatch(switchCurrentBuildingTo(updatedBuilding));
          dispatch(updateLocation(updatedLocation));
          setFloorTab(FLOOR_SEARCH);
        }
      });
  };

  return (
    <Form onSubmit={handleEdit}>
      <h6 className="heading m-4">Floor Details</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col>
            <MandatorySelectField
              label="Use"
              id="floor-use"
              isMulti
              options={useOptions}
              value={floor.use.map(use => stringAsSelectOption(use)) || ""}
              onChange={(newValue: unknown) => {
                if (newValue) {
                  const selectedOptions = newValue as SelectOption[];
                  const floorUses = selectedOptions.map(option => option.label) as LocationUse[];
                  setFloor({
                    ...floor,
                    use: floorUses,
                  });
                }
              }}
            />
          </Col>
          <Col>
            <InputField
              label="Floor Number"
              id="floor-number"
              type="number"
              value={floor.number || ""}
              onChange={e => {
                setFloor({
                  ...floor,
                  number: +e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Surface"
              id="floor-surface"
              type="number"
              min={0}
              value={floor.surface || ""}
              onChange={e => {
                setFloor({
                  ...floor,
                  surface: +e.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <InputField
              label="Gates"
              id="floor-gates"
              type="text"
              required
              min={1}
              value={floor.gates || ""}
              onChange={e => {
                setFloor({
                  ...floor,
                  gates: +e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Meeting Rooms"
              id="floor-meeting-rooms"
              type="number"
              min={0}
              value={floor.meetingRooms || ""}
              onChange={e => {
                setFloor({
                  ...floor,
                  meetingRooms: +e.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <InputField
              label="Toilets"
              id="floor-toilets"
              type="number"
              required
              min={1}
              value={floor.toilets || ""}
              onChange={e => {
                setFloor({
                  ...floor,
                  toilets: +e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="custom-checkbox">
              <Label className="form-control-label pl-4" htmlFor="location-include-coordinates">
                <Input
                  className="form-control-input"
                  id="floor-security"
                  type="checkbox"
                  checked={floor.security || false}
                  onChange={() => {
                    setFloor({
                      ...floor,
                      security: !floor.security,
                    });
                  }}
                />
                Security
              </Label>
            </div>
          </Col>
          <Col>
            <label className="form-control-label" htmlFor="location-floorplan-map">
              Floorplan Map
            </label>
            <FileInput id="location-floorplan-map" />
          </Col>
        </Row>
      </Card>
      <Row className="pb-4 px-4">
        <Col>
          <Button onClick={() => setFloorTab(FLOOR_SEARCH)} color="light" type="button">
            Cancel
          </Button>
        </Col>
        <Col className="text-right">
          <Button color="info" type="submit">
            Edit Floor
          </Button>
        </Col>
      </Row>
      <Row className="pb-4 px-4">
        <Col className="text-right">
          <Button onClick={handleToggleActive} color="warning" type="button">
            {floor.active ? "Deactivate" : "Activate"}
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
  );
};

export default FloorDetailsPanel;
