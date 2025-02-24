import { useEffect, useState } from "react";
import Headings from "../../../components/Heading/Headings";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllTickets } from "../../../features/slice/allTickets";

const AssignedTicketsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location || {};
  // console.log("filter>>", state.filter);
  const allTicketsData = useSelector((state) => state.alltickets);
  // console.log( "allTicketsData>>",allTicketsData?.allTicketsData)
  const [getAssignedTickets, setAssignedTickets] = useState([]);

  useEffect(() => {
    const allFilteredTickets = allTicketsData?.allTicketsData?.filter(
      (data) => data?.adminAssigned?.isAssigned === true
    );
    const openFilteredTickets = allFilteredTickets?.filter(
      (data) => data?.status === "" && "open"
    );
    const pedingFilteredTickets = allFilteredTickets?.filter(
      (data) => data?.status === "pending"
    );
    const resolvedFilteredTickets = allFilteredTickets?.filter(
      (data) => data?.status === "resolved"
    );
    const closedFilteredTickets = allFilteredTickets?.filter(
      (data) => data?.status === "close"
    );
    if (state.filter === "All") {
      setAssignedTickets(allFilteredTickets);
    } else if (state.filter === "open") {
      setAssignedTickets(openFilteredTickets);
    } else if (state.filter === "pending") {
      setAssignedTickets(pedingFilteredTickets);
    } else if (state.filter === "resolved") {
      setAssignedTickets(resolvedFilteredTickets);
    } else if (state.filter === "close") {
      setAssignedTickets(closedFilteredTickets);
    }
  }, [allTicketsData, state.filter]); // Dependency array to run effect when allTicketsData changes
  // console.log("getAssignedTickets", getAssignedTickets);
  // Define columns
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);
  const handelNavigate = (id) => {
    navigate(`/ticketmanger/:${id}`);
  };
  const columns = [
    {
      name: "Ticket ID",
      selector: (row) => (
        <div>
          <p
            style={{ cursor: "pointer" }}
            className="mb-0 fw-medium"
            onClick={() => handelNavigate(row?.uniqueticketID)}
          >
            {row?.uniqueticketID}
          </p>
        </div>
      ),
      //sortable: true,
    },
    {
      name: "Customers ID/Name",
      selector: (row) => (
        <>
          <p className="mb-0 fw-medium">{row?.customerID}</p>
          <p className="mb-0">/{row?.customerName}</p>
        </>
      ),
      //selector: (row) => row?.customer_Name,
      //sortable: true,
    },
    {
      name: "Assigend",
      selector: (row) => row?.adminAssigned?.assignedTo,
      width: "200px",
      //   sortable: true,
    },
    {
      name: "status",
      selector: (row) => row?.status || "open",
      width: "100px",
      //   sortable: true,
    },
    {
      name: "Discription",
      selector: (row) => row?.description,
      //sortable: true,
    },
    {
      name: "date",
      selector: (row) => row?.updatedAt,
      //sortable: true,
    },
  ];
  return (
    <div className="mt-4 container createagent">
      <Headings navigtepath="/adminhome" headingname="Assigned tickets" />
      <div className="data-table-outer-layer">
        <DataTable
          //title="Arnold Schwarzenegger Movies"
          columns={columns}
          // data={data}
          data={getAssignedTickets}
          //   pagination
        />
      </div>
    </div>
  );
};
export default AssignedTicketsTable;
