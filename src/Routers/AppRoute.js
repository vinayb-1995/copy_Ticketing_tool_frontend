import { Route, Routes } from "react-router-dom";
import Login from "../pages/Lgoin/Login";
import SignUp from "../pages/Signup/SignUP";
import PageNotFound from "../pages/404/PageNotFound";
import AdminHome from "../pages/Admin/AdminHome";
// import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import useAuth from "../components/useAuth/useAuth";
import CreateCustomer from "../pages/Admin/CreateCustomer/CreateCustomer";
import CreateAgent from "../pages/Admin/CreateAgent/CreateAgent";
import AssignTicketsTable from "../pages/Admin/AssignTickets/AssignTicketsTable";
import TicketManagerPro from "../pages/Admin/AssignTickets/TicketManagerPro/TicketManagerPro";
import Customer from "../pages/Customer/Customer";
import Agents from "../pages/Agents/Agents";
import CreateTickets from "../pages/Customer/CreateTickets/CreateTickets";
import AllAgents from "../pages/Admin/AllAgents/AllAgents";
import AgentByIDAdmin from "../pages/Admin/AllAgents/agentByID/AgentByIDAdmin";
import AssignedTicketsTable from "../pages/Admin/AssignTickets/AssignedTicketsTable";
import AllCustomer from "../pages/Admin/AllCustomer/AllCustomer";

const AppRoute = () => {
  const { isAuthenticated, role } = useAuth();
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/customer" element={<Customer />} /> */}
        </>
      ) : (
        <>
          {role === "admin" && (
            <>
              {/* admin pages */}
              <Route path="/" element={<AdminHome />} />
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/createcustomer" element={<CreateCustomer />} />
              <Route path="/createagent" element={<CreateAgent />} />
              <Route
                path="/assignticketstable"
                element={<AssignTicketsTable />}
              />
              <Route path="/ticketmanger/:id" element={<TicketManagerPro />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/allagents" element={<AllAgents />} />
              <Route path="/allcustomer" element={<AllCustomer />} />
              <Route
                path="/assignedtickets"
                element={<AssignedTicketsTable />}
              />
              <Route path="/agentbyidadmin/:id" element={<AgentByIDAdmin />} />
            </>
          )}
          {role === "customer" && (
            <>
              {/* customer pages */}
              <Route path="/" element={<Customer />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/createtickets" element={<CreateTickets />} />
              {/* Add more customer-specific routes here */}
            </>
          )}
          {role === "agent" && (
            <>
              {/* customer pages */}
              <Route path="/" element={<Agents />} />
              <Route path="/customer" element={<Agents />} />
              {/* Add more customer-specific routes here */}
            </>
          )}
        </>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoute;
