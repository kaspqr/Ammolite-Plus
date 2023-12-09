import { useState, useEffect, FormEvent, useContext } from "react";

import { Button, Form, Label, Card, Col, Input, Row } from "reactstrap";

import { Country } from "@/types/domain/country.model";
import { LocationUse, Location } from "@/types/domain/location.model";
import { SelectOption } from "@/types/ui/common-ui";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentLocation } from "@/redux/features/location/location.selectors";
import { updateLocation } from "@/redux/features/location/location.slice";

import { countries } from "@/__mocks/data/countries-mocks";
import { countriesDataAsSelectOptions, stringAsSelectOption } from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";
import { FileInput, InputField, MandatorySelectField } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import { ownershipOptions, useOptions } from "../../../location.options.const";
import { LOCATION_SEARCH } from "../../locations.routes.const";

const LocationDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const currentLocation = useAppSelector(selectCurrentLocation);
  const { setLocationTab } = useContext(LocationTabContext);

  const [location, setLocation] = useState<Location>(currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    if (!location.includeMapCoordinates) {
      setLocation({
        ...location,
        latitude: "",
        longitude: "",
      });
    }
  }, [location.includeMapCoordinates]);

  const countriesData: SelectOption[] = countriesDataAsSelectOptions(countries(), true);

  const handleToggleActive = () => {
    const updatedLocation = { ...location, active: !location.active };
    dispatch(updateLocation(updatedLocation));
    setLocation(updatedLocation);
  };

  const handleEditLocation = (e: FormEvent) => {
    e.preventDefault();
    if (location.use.length === 0) {
      alerts.errorAlert("The 'Use' field cannot be empty", "Form Incomplete");
    } else {
      dispatch(updateLocation(location));
      setLocationTab(LOCATION_SEARCH);
    }
  };

  return (
    <Form onSubmit={handleEditLocation}>
      <h6 className="heading m-4">Information</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col>
            <InputField
              label="Title"
              required
              value={location.title || ""}
              onChange={e =>
                setLocation({
                  ...location,
                  title: e.target.value,
                })
              }
              id="location-title"
              type="text"
            />
          </Col>
          <Col>
            <MandatorySelectField
              label="Use"
              id="location-use"
              options={useOptions}
              isMulti
              value={location.use.map(use => stringAsSelectOption(use)) || ""}
              onChange={(newValue: unknown) => {
                if (newValue) {
                  const selectedOptions = newValue as SelectOption[];
                  const locationUses = selectedOptions.map(option => option.label) as LocationUse[];
                  setLocation({
                    ...location,
                    use: locationUses,
                  });
                }
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <MandatorySelectField
              label="Ownership"
              id="location-ownership"
              options={ownershipOptions}
              value={stringAsSelectOption(location.owner) || ""}
              onChange={(newValue: unknown) => {
                if (newValue) {
                  const selectedOption = newValue as SelectOption;
                  setLocation({
                    ...location,
                    owner: selectedOption.label,
                  });
                }
              }}
            />
          </Col>
          <Col>
            <label className="form-control-label" htmlFor="location-floorplan-map">
              Floorplan Map
            </label>
            <FileInput id="location-floorplan-map" />
          </Col>
        </Row>
      </Card>
      <h6 className="heading m-4">Address</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col>
            <MandatorySelectField
              label="Country"
              id="location-country"
              options={countriesData}
              value={stringAsSelectOption(location.address.country.name) || ""}
              onChange={(newValue: unknown) => {
                if (newValue) {
                  const selectedOption = newValue as SelectOption;
                  const selectedCountry = countries().find(country => {
                    return country.name === selectedOption.label;
                  }) as Country;
                  setLocation({
                    ...location,
                    address: {
                      ...location.address,
                      country: selectedCountry,
                    },
                  });
                }
              }}
            />
          </Col>
          <Col>
            <InputField
              label="City"
              id="location-city"
              type="text"
              required
              value={location.address.city || ""}
              onChange={e => {
                setLocation({
                  ...location,
                  address: {
                    ...location.address,
                    city: e.target.value,
                  },
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Street and Number"
              id="location-street-and-number"
              type="text"
              required
              value={location.address.streetAndNumber || ""}
              onChange={e => {
                setLocation({
                  ...location,
                  address: {
                    ...location.address,
                    streetAndNumber: e.target.value,
                  },
                });
              }}
            />
          </Col>
          <Col>
            <InputField
              label="Zip Code"
              id="location-zip-code"
              type="text"
              required
              value={location.address.zip || ""}
              onChange={e => {
                setLocation({
                  ...location,
                  address: {
                    ...location.address,
                    zip: e.target.value,
                  },
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
                id="location-include-coordinates"
                type="checkbox"
                checked={location.includeMapCoordinates || false}
                onChange={() => {
                  setLocation({
                    ...location,
                    includeMapCoordinates: !location.includeMapCoordinates,
                  });
                }}
              />
              Include Map Coordinates
            </Label>
          </div>
        </Row>
        <Row>
          <Col>
            <InputField
              label="Latitude"
              type="number"
              required={location.includeMapCoordinates}
              disabled={!location.includeMapCoordinates}
              id="location-latitude"
              value={location.latitude || ""}
              onChange={e => {
                setLocation({
                  ...location,
                  latitude: e.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <InputField
              label="Longitude"
              type="number"
              required={location.includeMapCoordinates}
              disabled={!location.includeMapCoordinates}
              id="location-longitude"
              value={location.longitude || ""}
              onChange={e => {
                setLocation({
                  ...location,
                  longitude: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
      </Card>
      <Row className="pb-4 px-4">
        <Col>
          <Button onClick={() => setLocationTab(LOCATION_SEARCH)} color="light" type="button">
            Cancel
          </Button>
        </Col>
        <Col className="text-right">
          <Button color="info" type="submit">
            Edit Location
          </Button>
        </Col>
      </Row>
      <Row className="pb-4 px-4">
        <Col className="text-right">
          <Row>
            <Col>
              <Button onClick={handleToggleActive} color="warning" type="button">
                {location.active ? "Deactivate" : "Activate"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default LocationDetailsPanel;
