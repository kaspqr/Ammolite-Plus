import { useState, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container, Label, Input } from "reactstrap";

import { Floor, emptyFloor, LocationUse } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentBuilding,
  selectCurrentLocation,
} from "@/redux/features/location/location.selectors";
import { updateLocation, switchCurrentBuildingTo } from "@/redux/features/location/location.slice";

import { stringAsSelectOption } from "@/common/category-utils";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { BUILDING_DETAILS, BUILDING_MAIN } from "../../buildings";
import { LocationTabContext } from "../../context/LocationTabContext";
import { useOptions } from "../../location.options.const";
import { handleCreateFloor } from "../utils";

const CreateFloorPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);

  const [floor, setFloor] = useState<Floor>(emptyFloor);

  const { setMainTab, setBuildingTab } = useContext(LocationTabContext);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const { updatedLocation, updatedBuilding } = handleCreateFloor({ floor, building, location });
    dispatch(updateLocation(updatedLocation));
    dispatch(switchCurrentBuildingTo(updatedBuilding));
    setFloor(emptyFloor);
    setBuildingTab(BUILDING_DETAILS);
    setMainTab(BUILDING_MAIN);
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Add Floor</h3>
                <h3 className="mb-0">to Building at Address {building.streetAndNumber}</h3>
                <h3 className="mb-0">of Location {location.title}</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleCreate}>
            <h6 className="heading m-4">New Floor Details</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <MandatorySelectField
                    label="Use"
                    id="create-floor-use"
                    isMulti
                    options={useOptions}
                    value={floor.use?.map(use => stringAsSelectOption(use)) || ""}
                    onChange={(newValue: unknown) => {
                      if (newValue) {
                        const selectedOptions = newValue as SelectOption[];
                        const floorUses = selectedOptions.map(
                          option => option.label
                        ) as LocationUse[];
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
                    required
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
                    type="number"
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
                <div className="custom-checkbox">
                  <Label className="form-control-label ml-4" htmlFor="location-include-coordinates">
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
              </Row>
            </Card>
            <Row className="pb-4 px-4">
              <Col>
                <Button
                  onClick={() => {
                    setBuildingTab(BUILDING_DETAILS);
                    setMainTab(BUILDING_MAIN);
                  }}
                  color="light"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-right">
                <Button color="info" type="submit">
                  Add Floor
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateFloorPanel;
