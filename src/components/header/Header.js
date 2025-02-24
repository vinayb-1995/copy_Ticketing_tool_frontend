import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import { TiUserAddOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logout from "../../pages/logout/Logout";
import { fetchAdminData } from "../../features/slice/adminDataSlice";
import { fetchagentLoingData } from "../../features/slice/fetchAgentData";
import { fetchAgentsAllData } from "../../features/slice/fetchAgentsAllData";
import { fetchAllTickets } from "../../features/slice/allTickets";
import CustomAvatar from "../Avatar/CustomAvatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { fetchCustomerLoingData } from "../../features/slice/customerLoginDataSlice";
import { fetchCustomerAllData } from "../../features/slice/fetchCustomerAllData";

const Header = () => {
  const navigate = useNavigate();
  /* role from redux */
  const role = useSelector((state) => state.auth.role);
  const [getRole, setRole] = useState(null);
  useEffect(() => {
    setRole(role);
  }, [role]);
  // console.log("role>>", getRole);

  /* admin data from redux */
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state?.admin?.adminData);

  /* customer data from redux */
  const customerData = useSelector((state) => state.customer.customerData);
  // console.log("customerdata>>", customerData);
  const agentData = useSelector((state) => state.agent.agentData);

  /*fetch in all customer customer all data */
  const customerAllData = useSelector(
    (state) => state.allCustomer.customerData
  );
  // console.log("fetchCustomerAllData>>", customerAllData);
  const agentsData = useSelector((state) => state.allAgents.AgentsData);
  // console.log("fetchAgentsAllData>>", agentsData);

  const allTicketsData = useSelector(
    (state) => state.alltickets.allTicketsData
  );
  // console.log("allTicketsData", allTicketsData);

  const allAgentsData = useSelector((state) => state.allAgents.allAgentsData);
  // console.log("allAgentsData>>", allAgentsData);

  useEffect(() => {
    if (getRole === "admin") {
      dispatch(fetchAdminData());
      dispatch(fetchCustomerAllData());
      dispatch(fetchAgentsAllData());
      dispatch(fetchAllTickets());
      dispatch(fetchAgentsAllData());
    } else if (getRole === "customer") {
      dispatch(fetchCustomerLoingData());
      // console.log("header>> role customer")
    } else if (getRole === "agent") {
      dispatch(fetchagentLoingData());

      // console.log("header>> role customer")
    }
  }, [dispatch, getRole]);

  // useEffect(() => {
  //   console.log("Admin Data in Component:", adminData); // Debug log
  //   // console.log("adminid",adminData.adminBody._id)
  // }, [adminData]);

  // const status = useSelector((state) => state.user.status);
  // const error = useSelector((state) => state.user.error);
  //handel log click
  const handleLogoClick = () => {
    if (role === "admin") {
      navigate("/");
    } else {
      navigate("/");
    }
  };
  /* customer names */
  const customerName = `${customerData?.customerBody?.firstname || ""} ${
    customerData?.customerBody?.lastname || ""
  }`;
  // console.log("customerName",customerName)

  return (
    <div className="container-fluid header">
      <Row className="container d-flex align-items-center">
        {/* Logo Column */}
        <Col xs={6} md={2} lg={2} className="logo" onClick={handleLogoClick}>
          {/* <p>Logo</p> */}
          <img
            className="img-fluid m-0 p-0 w-25"
            src="./assets/images/Aatral_LOGO_PNG.png"
            alt="logo"
          />
        </Col>
        {/* Heading Column */}
        <Col
          xs={{ span: 4, offset: 2 }}
          md={{ span: 4, offset: 2 }}
          lg={{ span: 3, offset: 3 }}
          className="companyheading  d-none d-md-block"
        >
          <p>Welcome to ATT</p>
        </Col>
        {/* Auth Links (Login and Register) */}
        <Col
          xs={6}
          md={4}
          lg={4}
          className="auth-links d-flex justify-content-end align-items-center"
        >
          {getRole === "admin" ? (
            <>
              {/* Render admin-specific content */}
              {adminData ? (
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <CustomAvatar
                        username={adminData.adminBody.username}
                        bgcolor="teal.400"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <p className="fs-5 fw-medium text-black">
                      {adminData.adminBody.role}
                    </p>
                    <p>{adminData.adminBody.username}</p>
                    <p>{adminData.adminBody.email}</p>
                  </PopoverContent>
                </Popover>
              ) : (
                <>nodata</>
              )}
              <Logout />
            </>
          ) : getRole === "customer" ? (
            <>
              {customerData ? (
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <CustomAvatar
                        username={customerName}
                        bgcolor="green.500"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <p className="fs-5 fw-medium text-black">
                      {customerData?.customerBody?.role}
                    </p>
                    <p>{customerName}</p>
                    <p>{customerData?.customerBody?.email}</p>
                  </PopoverContent>
                </Popover>
              ) : (
                <>no data</>
              )}
              <Logout />
            </>
          ) : getRole === "agent" ? (
            <>
              {agentData ? (
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <CustomAvatar
                        username={agentData.agentBody.fullname}
                        bgcolor="red.500"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <p className="fs-5 fw-medium text-black">
                      {agentData.agentBody.role}
                    </p>
                    <p>{agentData.agentBody.fullname}</p>
                    <p>{agentData.agentBody.email}</p>
                  </PopoverContent>
                </Popover>
              ) : (
                <>no data</>
              )}
              <Logout />
            </>
          ) : (
            <>
              {/* Render other roles' content */}
              <Link className="link me-4 d-flex align-items-center" to="/login">
                <p className="me-2">Login</p>
                <BsBoxArrowLeft className="icons" />
              </Link>
              <Link className="link d-flex align-items-center" to="/signup">
                <p className="me-2">Register</p>
                <TiUserAddOutline className="icons" />
              </Link>
            </>
          )}

          {/* {getRole === "admin" ? (
            <>
             
              {adminData ? (
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <CustomAvatar
                        username={adminData.adminBody.username}
                        bgcolor="purple.700"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <p className="fs-5 fw-medium text-black">
                      {adminData.adminBody.role}
                    </p>
                    <p>{adminData.adminBody.username}</p>
                    <p>{adminData.adminBody.email}</p>
                  </PopoverContent>
                </Popover>
              ) : (
                <>nodata</>
              )}
              <Logout />
            </>
          ) : getRole === "customer" ? (
            <>
              {customerData ? (
                <Popover>
                  <PopoverTrigger>
                    <div>
                      <CustomAvatar
                        username={customerName}
                        bgcolor="green.500"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-2">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <p className="fs-5 fw-medium text-black">
                      {customerData?.customerBody?.role}
                    </p>
                    <p>{customerName}</p>
                    <p>{customerData?.customerBody?.email}</p>
                  </PopoverContent>
                </Popover>
              ) : (
                <>no data</>
              )}
              <Logout />
            </>
          ) : (
            <>
            
              <Link className="link me-4 d-flex align-items-center" to="/login">
                <p className="me-2">Login</p>
                <BsBoxArrowLeft className="icons" />
              </Link>
              <Link className="link d-flex align-items-center" to="/signup">
                <p className="me-2">Register</p>
                <TiUserAddOutline className="icons" />
              </Link>
            </>
          )} */}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
