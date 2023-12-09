import { useState, useEffect, FormEvent, useContext } from "react";

import { Button, Form, Card, Col, Row } from "reactstrap";

import { Building, emptyBuildingContactPerson } from "@/types/domain/location.model";

import { useAppDispatch, useAppSelector } from "@/redux/app";
import {
  selectCurrentLocation,
  selectCurrentBuilding,
} from "@/redux/features/location/location.selectors";
import {
  updateLocation,
  switchCurrentLocationTo,
  switchCurrentBuildingTo,
} from "@/redux/features/location/location.slice";

import { alerts } from "@/views/components/feedback";
import { InputField } from "@/views/components/widgets";

import { LocationTabContext } from "../../../context/LocationTabContext";
import { BUILDING_SEARCH } from "../../buildings.routes.const";
import { handleDeleteBuilding, handleEditBuilding, handleToggleBuildingActive } from "../../utils";

const BuildingDetailsPanel = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectCurrentLocation);
  const currentBuilding = useAppSelector(selectCurrentBuilding);

  const [building, setBuilding] = useState<Building>(currentBuilding);

  const { setBuildingTab } = useContext(LocationTabContext);

  useEffect(() => {
    setBuilding(currentBuilding);
  }, [currentBuilding]);

  const handleToggleActive = () => {
    const { updatedLocation, updatedBuilding } = handleToggleBuildingActive({ building, location });
    dispatch(switchCurrentBuildingTo(updatedBuilding));
    dispatch(updateLocation(updatedLocation));
  };

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    const updatedLocation = handleEditBuilding({ building, location });
    dispatch(updateLocation(updatedLocation));
    dispatch(switchCurrentLocationTo(updatedLocation));
    setBuildingTab(BUILDING_SEARCH);
  };

  const handleDelete = () => {
    alerts
      .confirmActionDanger(`Are you sure you wish to delete this building from ${location.title}?`)
      .then(result => {
        if (result.isConfirmed) {
          const updatedLocation = handleDeleteBuilding({
            building,
            location,
          });
          dispatch(switchCurrentLocationTo(updatedLocation));
          dispatch(updateLocation(updatedLocation));
          setBuildingTab(BUILDING_SEARCH);
        }
      });
  };

  return (
    <Form onSubmit={handleEdit}>
      <h6 className="heading m-4">Address</h6>
      <Card className="p-4 m-4">
        <Row>
          <Col>
            <InputField
              label="Street and Number"
              placeholder="Lõõtsa 2A"
              id="location-street-and-number"
              type="text"
              required
              value={building.streetAndNumber || ""}
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
              placeholder="11415"
              id="location-zip-code"
              type="text"
              required
              value={building.zip || ""}
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
          <Button onClick={() => setBuildingTab(BUILDING_SEARCH)} color="light" type="button">
            Cancel
          </Button>
        </Col>
        <Col className="text-right">
          <Button color="info" type="submit">
            Edit Building
          </Button>
        </Col>
      </Row>
      <Row className="pb-4 px-4">
        <Col className="text-right">
          <Button onClick={handleToggleActive} color="warning" type="button">
            {building.active ? "Deactivate" : "Activate"}
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

export default BuildingDetailsPanel;
