// import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import TicketsStatus from "../../components/tickets/Tickets_status";

const Customer = () => {
  const navigate = useNavigate();
  const handelnavigate = async () => {
    navigate("/createtickets");
    /*try {
      const response = await fetch('http://localhost:5000/generate-uuid'); 
      if (!response.ok) {
        throw new Error('Failed to fetch UUID'); // Handle HTTP errors
      }
      const data = await response.json(); // Parse the JSON response
      navigate("/createtickets", { state: { uuid: data.uuid } });
    } catch (err) {
      console.error(err.message); // Set error in case of a failure
    } */
  };

  return (
    <>
      <div className="container mt-2 adminhome">
        <Row className="d-flex justify-content-around">
          <Col xs={12} md={3} lg={3}>
            <p>Total Number of Tickets : 100</p>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <p>Tickets Open : 50</p>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <p>Tickets Closed : 50</p>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <p>Tickets Pending : 50</p>
          </Col>
        </Row>
        <Row className="m-2 d-flex justify-content-start">
          <Col
            xs={12}
            md={3}
            lg={3}
            className="dashboardbutton"
            onClick={handelnavigate}
          >
            <p>Create Tickets</p>
          </Col>
          <Col xs={12} md={3} lg={3} className="dashboardbutton">
            <p>Ticket Status</p>
          </Col>
          {/* <Col xs={12} md={12} lg={12} className="">
            <TicketsStatus />
          </Col> */}
        </Row>
      </div>
    </>
  );
};
export default Customer;
