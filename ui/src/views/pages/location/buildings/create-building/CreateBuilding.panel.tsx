import { useState, FormEvent, useContext } from "react";

import { Button, Form, Card, CardHeader, Col, Row, Container } from "reactstrap";

import { emptyBuildingContactPerson, Building, emptyBuilding } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import { selectCurrentLocation } from "@/redux/features/location/location.selectors";
import { updateLocation, switchCurrentLocationTo } from "@/redux/features/location/location.slice";

import { InputField } from "@/views/components/widgets";

import { LocationTabContext } from "../../context/LocationTabContext";
import { LOCATION_DETAILS, LOCATION_MAIN } from "../../locations";
import { handleCreateBuilding } from "../utils";

const CreateBuildingPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);

  const { setMainTab, setLocationTab } = useContext(LocationTabContext);

  const [building, setBuilding] = useState<Building>(emptyBuilding);

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const updatedLocation = handleCreateBuilding({ building, location });
    dispatch(updateLocation(updatedLocation));
    dispatch(switchCurrentLocationTo(updatedLocation));
    setBuilding(emptyBuilding);
    setLocationTab(LOCATION_DETAILS);
    setMainTab(LOCATION_MAIN);
  };

  return (
    <Container>
      <div className="col">
        <Card>
          <CardHeader>
            <Row>
              <Col md="1.1">
                <h3 className="mb-0">Add Building to {location.title}</h3>
              </Col>
            </Row>
          </CardHeader>
          <Form onSubmit={handleCreate}>
            <h6 className="heading m-4">Address</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <InputField
                    label="Street and Number"
                    id="location-street-and-number"
                    type="text"
                    value={building.streetAndNumber}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        streetAndNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Zip Code"
                    id="location-zip-code"
                    type="text"
                    value={building.zip}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        zip: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <h6 className="heading m-4">Reception</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <InputField
                    label="Phone"
                    id="building-reception-phone"
                    type="text"
                    value={building.reception?.phone || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        reception: {
                          ...building.reception,
                          phone: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Fax"
                    id="building-reception-fax"
                    type="text"
                    value={building.reception?.fax || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        reception: {
                          ...building.reception,
                          fax: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <h6 className="heading m-4">Security Contact Person</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <InputField
                    label="First Name"
                    id="security-contact-person-first-name"
                    type="text"
                    value={building.securityContactPerson?.firstName || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        securityContactPerson: {
                          ...(building.securityContactPerson || emptyBuildingContactPerson),
                          firstName: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Last Name"
                    id="security-contact-person-first-name"
                    type="text"
                    value={building.securityContactPerson?.lastName || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        securityContactPerson: {
                          ...(building.securityContactPerson || emptyBuildingContactPerson),
                          lastName: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Email"
                    id="security-contact-person-email"
                    type="text"
                    value={building.securityContactPerson?.email || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        securityContactPerson: {
                          ...(building.securityContactPerson || emptyBuildingContactPerson),
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Phone"
                    id="security-contact-person-phone"
                    type="text"
                    value={building.securityContactPerson?.phone || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        securityContactPerson: {
                          ...(building.securityContactPerson || emptyBuildingContactPerson),
                          phone: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <h6 className="heading m-4">Building Contact Person</h6>
            <Card className="p-4 m-4">
              <Row>
                <Col>
                  <InputField
                    label="First Name"
                    id="contact-person-first-name"
                    type="text"
                    value={building.contactPerson?.firstName || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        contactPerson: {
                          ...(building.contactPerson || emptyBuildingContactPerson),
                          firstName: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Last Name"
                    id="contact-person-first-name"
                    type="text"
                    value={building.contactPerson?.lastName || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        contactPerson: {
                          ...(building.contactPerson || emptyBuildingContactPerson),
                          lastName: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    label="Email"
                    id="contact-person-email"
                    type="text"
                    value={building.contactPerson?.email || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        contactPerson: {
                          ...(building.contactPerson || emptyBuildingContactPerson),
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  <InputField
                    label="Phone"
                    id="contact-person-phone"
                    type="text"
                    value={building.contactPerson?.phone || ""}
                    onChange={e => {
                      setBuilding({
                        ...building,
                        contactPerson: {
                          ...(building.contactPerson || emptyBuildingContactPerson),
                          phone: e.target.value,
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
                    setLocationTab(LOCATION_DETAILS);
                    setMainTab(LOCATION_MAIN);
                  }}
                  color="light"
                  type="button"
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-right">
                <Button color="info" type="submit">
                  Add Building
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default CreateBuildingPanel;
