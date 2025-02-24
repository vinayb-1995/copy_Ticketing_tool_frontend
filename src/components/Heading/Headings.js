import { Col, Row } from "react-bootstrap";
import NavigationBackButton from "../Buttons/NavigationBackButton";
import { Divider } from "@chakra-ui/react";

const Headings = ({ navigtepath, headingname, ticketID }) => {
  return (
    <div className="mt-4 container secondary-headings">
      <Row className="d-flex align-items-center">
        <Col xs={3} md={1} lg={1}>
          <NavigationBackButton navigtepath={navigtepath} />
        </Col>
        <Col xs={9} md={ticketID ? 5 : 9} lg={ticketID ? 5 : 9} className="heading-name">
          <p>{headingname}</p>
        </Col>

        {/* Conditional rendering of ticketID with dynamic column sizes */}
        {ticketID && (
          <Col xs={12} md={6} lg={6} className="heading-name d-lg-flex justify-content-end d-md-flex justify-content-start">
            
            <p><span className="fw-bold">ID: </span>{ticketID}</p>
          </Col>
        )}
      </Row>
      <Divider borderColor="blue.400" borderWidth="2px" />
    </div>
  );
};

export default Headings;
