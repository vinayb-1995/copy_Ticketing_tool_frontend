import { Col, Row } from "react-bootstrap";
import SecondaryHeader from "../Heading/SecondaryHeader";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";

const TicketsStatus = ({
  rowclassname,
  opentickets,
  pending,
  resolved,
  close,
  onOpenTicketsClick,
  onPendingTicketsClick,
  onResolvedTicketsClick,
  onClosedTicketsClick,
}) => {
  return (
    <>
      <Row className={`container ${rowclassname} tiketstatus`}>
        <Col xs={10} md={10} lg={10} className="my-4">
          <SecondaryHeader header="Tickets" />
        </Col>
        {/* open tickets */}
        <Col
          xs={12}
          sm={5}
          md={5}
          lg={5}
          className="d-flex tiket-status"
          onClick={onOpenTicketsClick}
        >
          <div className="icon">
            <span>
              <AiOutlineFolderOpen />
            </span>
          </div>
          <Col className="ps-4">
            <p>Open tickets</p>
            <h2 className="m-0">{opentickets}</h2>
          </Col>
        </Col>
        {/* pending tickets */}
        <Col
          xs={12}
          sm={5}
          md={5}
          lg={5}
          className="d-flex tiket-status"
          onClick={onPendingTicketsClick}
        >
          <div className="icon flex-start">
            <span>
              <MdOutlineHourglassEmpty />
            </span>
          </div>
          <Col className="ps-4">
            <p>Pending tickets</p>
            <h2 className="m-0">{pending}</h2>
          </Col>
        </Col>
        {/* resolved tickets */}
        <Col
          xs={12}
          sm={5}
          md={5}
          lg={5}
          className=" d-flex tiket-status"
          onClick={onResolvedTicketsClick}
        >
          <div className="icon">
            <span>
              <AiOutlineCheckCircle />
            </span>
          </div>
          <Col className="ps-4">
            <p>Resolved tickets</p>
            <h2 className="m-0">{resolved}</h2>
          </Col>
        </Col>
        {/* closed ticktes */}
        <Col
          xs={12}
          sm={5}
          md={5}
          lg={5}
          className=" d-flex tiket-status"
          onClick={onClosedTicketsClick}
        >
          <div className="icon">
            <span>
              <IoMdDoneAll />
            </span>
          </div>
          <Col className="ps-4">
            <p>Closed tickets</p>
            <h2 className="m-0">{close}</h2>
          </Col>
        </Col>
      </Row>
    </>
  );
};
export default TicketsStatus;
