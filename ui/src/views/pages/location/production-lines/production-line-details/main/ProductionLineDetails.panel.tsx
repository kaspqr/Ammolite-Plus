import { useState, useEffect, FormEvent, useContext } from "react";

import { Button, Form, Card, Col, Row } from "reactstrap";

import { ProductionLine, ProductionLineType, DeliverableType } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentLocation,
  selectCurrentBuilding,
  selectCurrentFloor,
  selectCurrentWorkingArea,
  selectCurrentProductionLine,
} from "@/redux/features/location/location.selectors";
import {
  updateLocation,
  switchCurrentProductionLineTo,
} from "@/redux/features/location/location.slice";

import { stringAsSelectOption } from "@/common/category-utils";
import { InputField, MandatorySelectField } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import {
  ASSEMBLY_LINE,
  MACHINING_LINE,
  productionLineAssemblyDeliverableTypes,
  productionLineMachiningLineDeliverableTypes,
  productionLineTestLineDeliverableTypes,
  productionLineTypeOptions,
} from "../../../location.options.const";
import { PRODUCTION_LINE_MAIN, PRODUCTION_LINE_SEARCH } from "../../production-lines.routes.const";
import {
  deliverableOptions,
  handleEditProductionLine,
  handleToggleProductionLineActive,
} from "../../utils";

const ProductionLineDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const building = useAppSelector(selectCurrentBuilding);
  const floor = useAppSelector(selectCurrentFloor);
  const workingArea = useAppSelector(selectCurrentWorkingArea);
  const currentProductionLine = useAppSelector(selectCurrentProductionLine);

  const [productionLine, setProductionLine] = useState<ProductionLine>(currentProductionLine);

  const { setProductionLineTab, setMainTab } = useContext(LocationTabContext);

  useEffect(() => {
    setProductionLine(currentProductionLine);
  }, [currentProductionLine]);

  const handleToggleActive = () => {
    const { updatedLocation, updatedProductionLine } = handleToggleProductionLineActive({
      productionLine,
      workingArea,
      floor,
      building,
      location,
    });
    dispatch(switchCurrentProductionLineTo(updatedProductionLine));
    dispatch(updateLocation(updatedLocation));
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const updatedLocation = handleEditProductionLine({
      productionLine,
      workingArea,
      floor,
      building,
      location,
    });
    dispatch(updateLocation(updatedLocation));
    dispatch(switchCurrentProductionLineTo(productionLine));
    setProductionLineTab(PRODUCTION_LINE_SEARCH);
  };

  return (
    <Form onSubmit={handleEdit}>
      <h6 className="heading m-4">Production Line Details</h6>
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
              setProductionLineTab(PRODUCTION_LINE_SEARCH);
              setMainTab(PRODUCTION_LINE_MAIN);
            }}
            color="light"
            type="button"
          >
            Cancel
          </Button>
        </Col>
        <Col className="text-right">
          <Button color="info" type="submit">
            Edit Production Line
          </Button>
        </Col>
      </Row>
      <Row className="pb-4 px-4">
        <Col className="text-right">
          <Button onClick={handleToggleActive} color="warning" type="button">
            {productionLine.active ? "Deactivate" : "Activate"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductionLineDetailsPanel;
