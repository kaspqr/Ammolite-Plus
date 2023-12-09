import { useState, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container } from "reactstrap";

import {
  ProductionLine,
  emptyProductionLine,
  ProductionLineType,
  DeliverableType,
} from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentLocation,
  selectCurrentWorkingArea,
} from "@/redux/features/location/location.selectors";
import {
  updateLocation,
  switchCurrentWorkingAreaTo,
} from "@/redux/features/location/location.slice";

import { stringAsSelectOption } from "@/common/category-utils";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import {
  ASSEMBLY_LINE,
  MACHINING_LINE,
  productionLineAssemblyDeliverableTypes,
  productionLineMachiningLineDeliverableTypes,
  productionLineTestLineDeliverableTypes,
  productionLineTypeOptions,
} from "../../location.options.const";
import { WORKING_AREA_DETAILS, WORKING_AREA_MAIN } from "../../working-areas";
import { deliverableOptions, handleCreateProductionLine } from "../utils";

const CreateProductionLinePanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const workingArea = useAppSelector(selectCurrentWorkingArea);

  const [productionLine, setProductionLine] = useState<ProductionLine>(emptyProductionLine);

  const { setWorkingAreaTab, setMainTab } = useContext(LocationTabContext);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const { updatedLocation, updatedWorkingArea } = handleCreateProductionLine({
      productionLine,
      workingArea,
      floor,
      building,
      location,
    });
    dispatch(updateLocation(updatedLocation));
    dispatch(switchCurrentWorkingAreaTo(updatedWorkingArea));
    setProductionLine(emptyProductionLine);
    setWorkingAreaTab(WORKING_AREA_DETAILS);
    setMainTab(WORKING_AREA_MAIN);
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Create Production Line</h3>
                <h3 className="mb-0">in Working Area {workingArea.name}</h3>
                <h3 className="mb-0">on Floor {floor.number}</h3>
                <h3 className="mb-0">in Building at Address {building.streetAndNumber}</h3>
                <h3 className="mb-0">of Location {location.title}</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleCreate}>
            <h6 className="heading m-4">New Production Line Details</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <InputField
                    label="Name"
                    id="production-line-name"
                    type="text"
                    required
                    value={productionLine.name || ""}
                    onChange={e => {
                      setProductionLine({
                        ...productionLine,
                        name: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Capacity"
                    id="production-line-capacity"
                    type="number"
                    min={0}
                    value={productionLine.capacity || ""}
                    onChange={e => {
                      setProductionLine({
                        ...productionLine,
                        capacity: +e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <MandatorySelectField
                    label="Type"
                    id="production-line-type"
                    options={productionLineTypeOptions}
                    value={stringAsSelectOption(productionLine.type) || ""}
                    onChange={(newValue: unknown) => {
                      if (newValue) {
                        const selectedOption = newValue as SelectOption;
                        const productionLineType = selectedOption.label as ProductionLineType;
                        setProductionLine({
                          ...productionLine,
                          type: productionLineType,
                          deliverable:
                            productionLineType === ASSEMBLY_LINE
                              ? productionLineAssemblyDeliverableTypes[0]
                              : productionLineType === MACHINING_LINE
                              ? productionLineMachiningLineDeliverableTypes[0]
                              : productionLineTestLineDeliverableTypes[0],
                        });
                      }
                    }}
                  />
                </Col>
                <Col>
                  <MandatorySelectField
                    label="Deliverable"
                    id="production-line-deliverable"
                    options={deliverableOptions({ type: productionLine.type })}
                    value={stringAsSelectOption(productionLine.deliverable) || ""}
                    onChange={(newValue: unknown) => {
                      if (newValue) {
                        const selectedOption = newValue as SelectOption;
                        const productionLineDeliverable = selectedOption.label as DeliverableType;
                        setProductionLine({
                          ...productionLine,
                          deliverable: productionLineDeliverable,
                        });
                      }
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <Row className="pb-4 px-4">
              <Col>
                <Button
                  onClick={() => {
                    setWorkingAreaTab(WORKING_AREA_DETAILS);
                    setMainTab(WORKING_AREA_MAIN);
                  }}
                  color="light"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-right">
                <Button color="info" type="submit">
                  Create Production Line
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateProductionLinePanel;
