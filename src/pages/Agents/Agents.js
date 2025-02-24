import { Col, Row } from "react-bootstrap";
import TicketsStatus from "../../components/tickets/Tickets_status";

const Agents = () => {
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
          <Col xs={12} md={3} lg={3} className="dashboardbutton">
            <p>Tickets Assigned</p>
          </Col>
          <Col xs={12} md={3} lg={3} className="dashboardbutton">
            <p>Ticket Status</p>
          </Col>
        </Row>
        {/* <TicketsStatus/> */}
      </div>
    </>
  );
};
export default Agents;
