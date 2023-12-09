import { MouseEvent, useContext, useEffect, useState } from "react";

import { Card, CardHeader, Row, Col, Container } from "reactstrap";

import {
  Building,
  DeliverableType,
  Location,
  ProductionLine,
  ProductionLineType,
  WorkingArea,
} from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectAllLocationData,
  selectAllProductionLineData,
} from "@/redux/features/location/location.selectors";
import { switchCurrentProductionLineTo } from "@/redux/features/location/location.slice";

import { locationObjectAsSelectOption, stringAsSelectOption } from "@/common/category-utils";
import { SELECT_ALL } from "@/common/consts";
import { alerts } from "@/views/components/feedback";
import {
  InputField,
  MandatorySelectField,
  ReactTable,
  SelectField,
} from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { productionLineTypeOptions } from "../../location.options.const";
import { PRODUCTION_LINE_DETAILS } from "../production-lines.routes.const";
import { deliverableOptions, getPLsFromBuilding, getPLsFromLocation } from "../utils";

import { productionLinesTableColumns } from "./ProductionLines.table";

const SearchProductionLinesPanel = () => {
  const dispatch = useAppDispatch();

  const productionLines: ProductionLine[] = useAppSelector(selectAllProductionLineData);
  const locations: Location[] = useAppSelector(selectAllLocationData);

  const { setProductionLineTab } = useContext(LocationTabContext);

  const [objectFilteredPLs, setObjectFilteredPLs] = useState<ProductionLine[]>(productionLines);
  const [filteredProductionLines, setFilteredProducitonLines] =
    useState<ProductionLine[]>(productionLines);

  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | undefined>(undefined);
  const [selectedWorkingArea, setSelectedWorkingArea] = useState<WorkingArea | undefined>(
    undefined
  );
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [createFrom, setCreateFrom] = useState<number | undefined>(undefined);
  const [createTo, setCreateTo] = useState<number | undefined>(undefined);
  const [type, setType] = useState<ProductionLineType | "">("");
  const [deliverable, setDeliverable] = useState<string>("");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [workingAreas, setWorkingAreas] = useState<WorkingArea[]>([]);

  useEffect(() => {
    const newProductionLines = selectedWorkingArea
      ? selectedWorkingArea.productionLine
        ? [selectedWorkingArea.productionLine]
        : []
      : selectedBuilding
      ? getPLsFromBuilding(selectedBuilding)
      : selectedLocation
      ? getPLsFromLocation(selectedLocation)
      : productionLines;
    setObjectFilteredPLs(newProductionLines);
  }, [selectedLocation, selectedBuilding, selectedWorkingArea, locations, productionLines]);

  useEffect(() => {
    const stringFilteredPLs: ProductionLine[] = objectFilteredPLs.filter(
      productionLine => productionLine.name.includes(name) && productionLine.code.includes(code)
    );
    const typeFilteredPLs: ProductionLine[] =
      type.length > 0 ? stringFilteredPLs.filter(pl => pl.type === type) : stringFilteredPLs;
    const deliverabeFilteredPLs: ProductionLine[] =
      deliverable.length > 0
        ? typeFilteredPLs.filter(pl => pl.deliverable === deliverable)
        : typeFilteredPLs;
    const createFromFilteredPLs: ProductionLine[] = createFrom
      ? deliverabeFilteredPLs.filter(pl => pl.created >= createFrom)
      : deliverabeFilteredPLs;
    const createToFilteredPLs: ProductionLine[] = createTo
      ? createFromFilteredPLs.filter(pl => pl.created <= createTo)
      : createFromFilteredPLs;
    setFilteredProducitonLines(createToFilteredPLs);
  }, [objectFilteredPLs, name, code, createFrom, createTo, type, deliverable]);

  const onViewProductionLineDetails = (e: MouseEvent) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    const productionLineToView: ProductionLine | undefined = productionLines.find(
      productionLine => productionLine.id === +id
    );
    if (productionLineToView) {
      dispatch(switchCurrentProductionLineTo(productionLineToView));
      setProductionLineTab(PRODUCTION_LINE_DETAILS);
    } else {
      alerts.errorAlert(`Production Line with ID ${id} doesn't exist`, "404 Not Found");
    }
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Search Production Lines</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <SelectField
                  id="production-line-location"
                  label="Location"
                  options={[
                    SELECT_ALL,
                    ...locations.map(location =>
                      locationObjectAsSelectOption(location, location.title)
                    ),
                  ]}
                  value={
                    selectedLocation
                      ? locationObjectAsSelectOption(selectedLocation, selectedLocation.title)
                      : stringAsSelectOption("")
                  }
                  onChange={(newValue: unknown) => {
                    if (newValue) {
                      const selectedOption = newValue as SelectOption;
                      if (selectedOption.value === "") setSelectedLocation(undefined);
                      else {
                        const newLocation = locations.find(
                          location => location.id + "" === selectedOption.value
                        );
                        if (newLocation) {
                          setSelectedWorkingArea(undefined);
                          setSelectedBuilding(undefined);
                          setSelectedLocation(newLocation);
                          setBuildings(newLocation.buildings);
                        }
                      }
                    }
                  }}
                />
              </Col>
              <Col>
                <MandatorySelectField
                  id="production-line-building"
                  label="Building"
                  isDisabled={selectedLocation === undefined}
                  value={
                    selectedBuilding
                      ? locationObjectAsSelectOption(
                          selectedBuilding,
                          selectedBuilding.streetAndNumber
                        )
                      : stringAsSelectOption("")
                  }
                  options={buildings?.map(building =>
                    locationObjectAsSelectOption(building, building.streetAndNumber)
                  )}
                  onChange={(newValue: unknown) => {
                    if (newValue) {
                      const selectedOption = newValue as SelectOption;
                      const newBuilding = buildings?.find(
                        building => building.id + "" === selectedOption.value
                      );
                      if (newBuilding) {
                        setSelectedWorkingArea(undefined);
                        setSelectedBuilding(newBuilding);
                        const buildingWorkingAreas: WorkingArea[] = newBuilding.floors.flatMap(
                          buildingFloor => buildingFloor.workingAreas
                        );
                        setWorkingAreas(buildingWorkingAreas);
                      }
                    }
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <MandatorySelectField
                  id="production-line-working-area"
                  label="Working Area"
                  isDisabled={selectedBuilding === undefined}
                  value={
                    selectedWorkingArea
                      ? locationObjectAsSelectOption(selectedWorkingArea, selectedWorkingArea.name)
                      : stringAsSelectOption("")
                  }
                  options={workingAreas?.map(workingArea =>
                    locationObjectAsSelectOption(workingArea, workingArea.name)
                  )}
                  onChange={(newValue: unknown) => {
                    if (newValue) {
                      const selectedOption = newValue as SelectOption;
                      const newWorkingArea = workingAreas?.find(
                        workingArea => workingArea.id + "" === selectedOption.value
                      );
                      if (newWorkingArea) {
                        setSelectedWorkingArea(newWorkingArea);
                      }
                    }
                  }}
                />
              </Col>
              <Col>
                <InputField
                  id="pl-name"
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  id="pl-code"
                  label="Code"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
              </Col>
              <Col>
                <InputField
                  label="Creation From"
                  id="create-from-date-input"
                  type="date"
                  onChange={e => setCreateFrom(new Date(e.target.value).getTime())}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputField
                  label="Creation To"
                  id="create-to-date-input"
                  type="date"
                  onChange={e => {
                    setCreateTo(new Date(e.target.value).getTime());
                    console.log(new Date(e.target.value).getTime());
                  }}
                />
              </Col>
              <Col>
                <SelectField
                  label="Type"
                  id="pl-type"
                  options={[SELECT_ALL, ...productionLineTypeOptions]}
                  value={stringAsSelectOption(type)}
                  onChange={(newValue: unknown) => {
                    if (newValue) {
                      const selectedOption = newValue as SelectOption;
                      const productionLineType = selectedOption.label as ProductionLineType;
                      setType(selectedOption.value === "" ? "" : productionLineType);
                      setDeliverable("");
                    }
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <MandatorySelectField
                  label="Deliverable"
                  id="pl-deliverable"
                  isDisabled={type.length === 0}
                  options={type === "" ? [""] : deliverableOptions({ type })}
                  value={stringAsSelectOption(deliverable) || ""}
                  onChange={(newValue: unknown) => {
                    if (newValue) {
                      const selectedOption = newValue as SelectOption;
                      const productionLineDeliverable = selectedOption.label as DeliverableType;
                      setDeliverable(productionLineDeliverable);
                    }
                  }}
                />
              </Col>
              <Col />
            </Row>
          </CardHeader>
          <ReactTable
            data={filteredProductionLines}
            columns={productionLinesTableColumns({
              onDetailsButtonClick: onViewProductionLineDetails,
            })}
          />
        </Card>
      </div>
    </Container>
  );
};

export default SearchProductionLinesPanel;
