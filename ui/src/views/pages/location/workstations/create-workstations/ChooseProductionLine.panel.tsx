import { useState, FormEvent, MouseEvent, useEffect, useContext } from "react";

import {
  Button,
  Form,
  Card,
  CardHeader,
  Col,
  Row,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { Location, ProductionLine, ProductionLineType } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectAllLocationData,
  selectAllProductionLineData,
} from "@/redux/features/location/location.selectors";
import { switchCurrentProductionLineTo } from "@/redux/features/location/location.slice";

import { countries } from "@/__mocks/data/countries-mocks";
import {
  countriesDataAsSelectOptions,
  locationObjectAsSelectOption,
  stringAsSelectOption,
} from "@/common/category-utils";
import { SELECT_ALL } from "@/common/consts";
import { alerts } from "@/views/components/feedback";
import {
  InputField,
  MandatorySelectField,
  ReactTable,
  SelectField,
} from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { productionLineTypes } from "../../location.options.const";
import { getPLsFromLocation } from "../../production-lines/utils";
import { modalLocationsTableColumns } from "../tables/ModalLocations.table";
import { modalProductionLinesTableColumns } from "../tables/ModalProductionLines.table";
import { WORKSTATION_CREATE } from "../workstations.routes.const";

const ChooseProductionLinePanel = () => {
  const dispatch = useAppDispatch();

  const { setWorkstationTab } = useContext(LocationTabContext);

  const productionLines: ProductionLine[] = useAppSelector(selectAllProductionLineData);
  const locations: Location[] = useAppSelector(selectAllLocationData);

  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
  const [selectedProductionLine, setSelectedProductionLine] = useState<ProductionLine | undefined>(
    undefined
  );
  const [locationModalOpened, setLocationModalOpened] = useState<boolean>(false);
  const [productionLineModalOpened, setProductionLineModalOpened] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<ProductionLineType | "">("");
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [filteredProductionLines, setFilteredProductionLines] =
    useState<ProductionLine[]>(productionLines);

  const countriesData: SelectOption[] = countriesDataAsSelectOptions(countries(), true);

  useEffect(() => {
    const locationsByTitle = locations.filter(location => location.title.includes(title));
    const locationsByCountry =
      country !== ""
        ? locationsByTitle.filter(location => location.address.country.name === country)
        : locationsByTitle;
    setFilteredLocations(locationsByCountry);
  }, [country, title, locations]);

  useEffect(() => {
    const productionLinesByLocation = selectedLocation
      ? getPLsFromLocation(selectedLocation)
      : productionLines;
    const productionLinesByName = productionLinesByLocation.filter(pl => pl.name.includes(name));
    const productionLinesByType =
      type !== "" ? productionLinesByName.filter(pl => pl.type === type) : productionLinesByName;
    setFilteredProductionLines(productionLinesByType);
  }, [type, name, productionLines, selectedLocation]);

  const handleChooseProductionLine = (e: FormEvent) => {
    e.preventDefault();
    if (selectedProductionLine) {
      dispatch(switchCurrentProductionLineTo(selectedProductionLine));
      setWorkstationTab(WORKSTATION_CREATE);
    } else {
      alerts.errorAlert(
        "Please choose a Production Line for the Workstation",
        "Missing Production Line"
      );
    }
  };

  const onPickLocation = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const pickedLocation: Location | undefined = locations.find(location => location.id === +id);
    if (pickedLocation) {
      setSelectedLocation(pickedLocation);
      setLocationModalOpened(false);
    } else alerts.errorAlert(`Location with ID ${id} doesn't exist`, "404 Not Found");
  };

  const onPickProductionLine = (e: MouseEvent) => {
    const { id } = e.currentTarget;
    const pickedProductionLine: ProductionLine | undefined = productionLines.find(
      productionLine => productionLine.id === +id
    );
    if (pickedProductionLine) {
      setSelectedProductionLine(pickedProductionLine);
      setProductionLineModalOpened(false);
    } else alerts.errorAlert(`Production Line with ID ${id} doesn't exist`, "404 Not Found");
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Choose Production Line for Workstation</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleChooseProductionLine}>
            <Row className="m-4">
              <Col>
                <Button
                  color="success"
                  type="button"
                  onClick={() => setLocationModalOpened(!locationModalOpened)}
                >
                  Select Location
                </Button>
                <Button
                  color="success"
                  type="button"
                  onClick={() => setProductionLineModalOpened(!productionLineModalOpened)}
                >
                  Select Production Line
                </Button>
              </Col>
            </Row>
            <Row className="m-4">
              <Col>
                <b>
                  Production Line{" "}
                  {selectedProductionLine ? selectedProductionLine?.name : "not yet selected"}
                </b>
              </Col>
            </Row>
            <Row className="m-4">
              <Col>
                <Button color="info" type="submit">
                  New Workstation
                </Button>
              </Col>
            </Row>
            <Modal
              isOpen={locationModalOpened}
              toggle={() => setLocationModalOpened(!locationModalOpened)}
            >
              <ModalHeader>Location</ModalHeader>
              <ModalBody>
                <Row className="mb-4">
                  <Col>Select Location in which you wish to create a new Workstation.</Col>
                </Row>
                <Row>
                  <Col>
                    <InputField
                      id="workstation-modal-location-title"
                      label="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField
                      label="Country"
                      id="workstation-modal-location-country"
                      options={countriesData}
                      value={stringAsSelectOption(country) || ""}
                      onChange={(newValue: unknown) => {
                        if (newValue) {
                          const selectedOption = newValue as SelectOption;
                          const selectedCountry = countries().find(country => {
                            return country.name === selectedOption.label;
                          });
                          setCountry(selectedCountry?.name || "");
                        }
                      }}
                    />
                  </Col>
                </Row>
                <ReactTable
                  data={filteredLocations}
                  columns={modalLocationsTableColumns({
                    onDetailsButtonClick: onPickLocation,
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  onClick={() => setLocationModalOpened(!locationModalOpened)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={productionLineModalOpened}
              toggle={() => setProductionLineModalOpened(!productionLineModalOpened)}
            >
              <ModalHeader>Production Line</ModalHeader>
              <ModalBody>
                <Row className="mb-4">
                  <Col>Select Production Line in which you wish to create a new Workstation.</Col>
                </Row>
                <Row>
                  <Col>
                    <MandatorySelectField
                      id="modal-production-line-location"
                      label="Location"
                      options={locations.map(location =>
                        locationObjectAsSelectOption(location, location.title)
                      )}
                      value={
                        selectedLocation
                          ? locationObjectAsSelectOption(selectedLocation, selectedLocation.title)
                          : stringAsSelectOption("")
                      }
                      onChange={(newValue: unknown) => {
                        if (newValue) {
                          const selectedOption = newValue as SelectOption;
                          const newLocation = locations.find(
                            location => location.id + "" === selectedOption.value
                          );
                          if (newLocation) {
                            setSelectedLocation(newLocation);
                          }
                        }
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <InputField
                      id="workstation-modal-production-line-name"
                      label="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField
                      id="workstation-modal-production-line-type"
                      label="Type"
                      options={[
                        SELECT_ALL,
                        ...productionLineTypes.map(type => stringAsSelectOption(type)),
                      ]}
                      value={stringAsSelectOption(type) || ""}
                      onChange={(newValue: unknown) => {
                        if (newValue) {
                          const selectedOption = newValue as SelectOption;
                          if (selectedOption.value === "") {
                            setType("");
                          } else {
                            const selectedType = selectedOption.label as ProductionLineType;
                            setType(selectedType);
                          }
                        }
                      }}
                    />
                  </Col>
                </Row>
                <ReactTable
                  data={filteredProductionLines}
                  columns={modalProductionLinesTableColumns({
                    onDetailsButtonClick: onPickProductionLine,
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  onClick={() => setProductionLineModalOpened(!productionLineModalOpened)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default ChooseProductionLinePanel;
