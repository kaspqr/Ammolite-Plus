import { useState, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container } from "reactstrap";

import { LocationUse, WorkingArea, emptyWorkingArea } from "@/types/domain/location.model";
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
import { handleCreateWorkingArea, validateNewCode } from "../utils";

const CreateWorkingAreaPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);

  const [workingArea, setWorkingArea] = useState<WorkingArea>(emptyWorkingArea);

  const { setFloorTab, setMainTab } = useContext(LocationTabContext);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const codeAvailable = validateNewCode({ floor, workingArea });
    if (!codeAvailable) alerts.errorAlert("Please choose a unique code", "Invalid Code");
    else {
      const { updatedLocation, updatedFloor } = handleCreateWorkingArea({
        workingArea,
        floor,
        building,
        location,
      });
      dispatch(updateLocation(updatedLocation));
      dispatch(switchCurrentFloorTo(updatedFloor));
      setWorkingArea(emptyWorkingArea);
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
                <h3 className="mb-0">Add Working Area</h3>
                <h3 className="mb-0">to Floor {floor.number}</h3>
                <h3 className="mb-0">in Building at Address {building.streetAndNumber}</h3>
                <h3 className="mb-0">of Location {location.title}</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleCreate}>
            <h6 className="heading m-4">New Working Area Details</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <MandatorySelectField
                    label="Use"
                    id="create-working-area-use"
                    isMulti
                    options={useOptions}
                    value={workingArea.use?.map(use => stringAsSelectOption(use)) || ""}
                    onChange={(newValue: unknown) => {
                      if (newValue) {
                        const selectedOptions = newValue as SelectOption[];
                        const workingAreaUses = selectedOptions.map(
                          option => option.label
                        ) as LocationUse[];
                        setWorkingArea({
                          ...workingArea,
                          use: workingAreaUses,
                        });
                      }
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Name"
                    id="working-area-name"
                    type="text"
                    required
                    value={workingArea.name || ""}
                    onChange={e => {
                      setWorkingArea({
                        ...workingArea,
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
                    id="working-area-code"
                    type="text"
                    required
                    value={workingArea.code || ""}
                    onChange={e => {
                      setWorkingArea({
                        ...workingArea,
                        code: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Surface"
                    id="working-area-surface"
                    type="number"
                    min={0}
                    value={workingArea.surface || ""}
                    onChange={e => {
                      setWorkingArea({
                        ...workingArea,
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
                    id="working-area-picture-url"
                    type="text"
                    value={workingArea.pic || ""}
                    onChange={e => {
                      setWorkingArea({
                        ...workingArea,
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
                    id="working-area-coordinates-x"
                    type="number"
                    value={workingArea.jsonCoords?.x || ""}
                    onChange={e => {
                      setWorkingArea({
                        ...workingArea,
                        jsonCoords: {
                          ...workingArea.jsonCoords,
                          x: +e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Y"
                    id="working-area-coordinates-y"
                    type="number"
                    value={workingArea.jsonCoords?.y || ""}
                    onChange={e => {
                      setWorkingArea({
                        ...workingArea,
                        jsonCoords: {
                          ...workingArea.jsonCoords,
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
                  Add Working Area
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateWorkingAreaPanel;
