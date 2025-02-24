import { useDispatch, useSelector } from "react-redux";
// import { fetchAdminData } from "../../features/slice/adminDataSlice";
// import { useEffect } from "react";

import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TicketsStatus from "../../components/tickets/Tickets_status";
import { useEffect, useState } from "react";

import { fetchAllTickets } from "../../features/slice/allTickets";

const AdminHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allTicketsData = useSelector(
    (state) => state.alltickets.allTicketsData
  );
  console.log("allTicketsData admin home page>>", allTicketsData);
  const [getAssignedTickets, setAssignedTickets] = useState([]);

  const [getOpenTickets, setOpenTickets] = useState([]);
  const [getPendingTickets, setPendingTickets] = useState([]);
  const [getResolvedTickets, setResolvedTickets] = useState([]);
  const [getClosedTickets, setClosedTickets] = useState([]);
  // console.log(" assigned tickets home page>>", getAssignedTickets);
  // console.log(" opend tickets home page>>", getOpenTickets);
  // console.log(" pending tickets home page>>", getPendingTickets);
  // console.log(" resolved tickets home page>>", getResolvedTickets);
  // console.log(" closed tickets home page>>", getClosedTickets);

  useEffect(() => {
    const filteredData = allTicketsData?.filter(
      (data) => data?.adminAssigned?.isAssigned === true
    );
    setAssignedTickets(filteredData);
  }, [allTicketsData]);

  //filter open
  useEffect(() => {
    const openTicketsdData = getAssignedTickets?.filter(
      (data) => data?.status === "" && "open"
    );
    setOpenTickets(openTicketsdData);
  }, [getAssignedTickets]);

  //pending tickets
  useEffect(() => {
    const pendingTicketsdData = getAssignedTickets?.filter(
      (data) => data?.status === "pending"
    );
    setPendingTickets(pendingTicketsdData);
  }, [getAssignedTickets]);

  //resolved tickets
  useEffect(() => {
    const resolvedTicketsdData = getAssignedTickets?.filter(
      (data) => data?.status === "resolved"
    );
    setResolvedTickets(resolvedTicketsdData);
  }, [getAssignedTickets]);

  //resolved tickets
  useEffect(() => {
    const closedTicketsdData = getAssignedTickets?.filter(
      (data) => data?.status === "close"
    );
    setClosedTickets(closedTicketsdData);
  }, [getAssignedTickets]);

  // useEffect(() => {
  //   const filteredData = getTicketsOpenData?.allTicketsData?.filter(
  //     (data) => data?.adminAssigned?.isAssigned ===
  //   );
  // }, [getTicketsOpenData]);

  // console.log("allTicketsData", allTicketsData);
  /* admin data from redux */
  // const dispatch = useDispatch();
  // const userData = useSelector((state) => state.admin.adminData);
  // // const status = useSelector((state) => state.user.status);
  // // const error = useSelector((state) => state.user.error);
  // useEffect(() => {
  //   dispatch(fetchAdminData());
  // }, [dispatch]);
  // console.log('UserData:', userData);
  const handleCreatCustomer = () => {
    navigate("/createcustomer");
  };
  const handleCreatAgent = () => {
    navigate("/createagent");
  };
  const handleAssignTickets = () => {
    navigate("/assignticketstable");
  };
  const handlAllAgents = () => {
    navigate("/allagents");
  };
  const handleAssignedTickets = () => {
    navigate("/assignedtickets", {
      state: { filter: "All" },
    });
  };
  const handleAllCustomer = () => {
    navigate("/allcustomer");
  };
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const handleOpenTicketsClick = () => {
    // console.log("Open tickets clicked!");
    navigate("/assignedtickets", {
      state: { filter: "open" },
    });
  };
  const handlePendingTicketsClick = () => {
    // console.log("Open tickets clicked!");
    navigate("/assignedtickets", {
      state: { filter: "pending" },
    });
  };
  const handleResolvedTicketsClick = () => {
    // console.log("Open tickets clicked!");
    navigate("/assignedtickets", {
      state: { filter: "resolved" },
    });
  };
  const handleClosedTicketsClick = () => {
    // console.log("Open tickets clicked!");
    navigate("/assignedtickets", {
      state: { filter: "close" },
    });
  };

  return (
    <>
      <div className="container mt-2 adminhome">
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={3} lg={3}>
            <p>Total Number of Customers : 100</p>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <p>Total Number of Agents : 50</p>
          </Col>
        </Row>
        <Row className="m-2 d-flex justify-content-center ">
          <Col
            xs={12}
            md={3}
            lg={3}
            onClick={handleCreatCustomer}
            className="dashboardbutton"
          >
            <p>Create Customer</p>
          </Col>
          <Col
            xs={12}
            md={3}
            lg={3}
            onClick={handleCreatAgent}
            className="dashboardbutton"
          >
            <p>Create Agent</p>
          </Col>
          <Col
            xs={12}
            md={3}
            lg={3}
            onClick={handleAssignTickets}
            className="dashboardbutton"
          >
            <p>Ticket Requests</p>
          </Col>
          <Col
            xs={12}
            md={3}
            lg={3}
            className="dashboardbutton"
            onClick={handleAllCustomer}
          >
            <p>All Customer</p>
          </Col>
          <Col
            xs={12}
            md={3}
            lg={3}
            onClick={handlAllAgents}
            className="dashboardbutton"
          >
            <p>All Agents</p>
          </Col>
          <Col
            xs={12}
            md={3}
            lg={3}
            className="dashboardbutton"
            onClick={handleAssignedTickets}
          >
            <p>Open, Closed & Pending tickets</p>
          </Col>
          <TicketsStatus
            rowclassname="d-flex justify-content-center"
            opentickets={getOpenTickets?.length}
            pending={getPendingTickets?.length}
            resolved={getResolvedTickets?.length}
            close={getClosedTickets?.length}
            onOpenTicketsClick={handleOpenTicketsClick}
            onPendingTicketsClick={handlePendingTicketsClick}
            onResolvedTicketsClick={handleResolvedTicketsClick}
            onClosedTicketsClick={handleClosedTicketsClick}
          />
        </Row>
      </div>
    </>
  );
};
export default AdminHome;
