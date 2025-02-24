import { useEffect, useState } from "react";
import Headings from "../../../components/Heading/Headings";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllTickets } from "../../../features/slice/allTickets";

const AssignTicketsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allTicketsData = useSelector((state) => state.alltickets);
  // console.log( "allTicketsData>>",allTicketsData?.allTicketsData)
  const [getTicketsOpenData, setTicketsOpenData] = useState([]);

  useEffect(() => {
    const filteredData = allTicketsData?.allTicketsData?.filter(
      (data) => data?.adminAssigned?.isAssigned === false
    );
    setTicketsOpenData(filteredData);
  }, [allTicketsData]); // Dependency array to run effect when allTicketsData changes
  console.log("getTicketsOpenData", getTicketsOpenData);
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
      name: "status",
      selector: (row) => "New",
      width: "100px",
      //   sortable: true,
    },
    {
      name: "Assigned",
      selector: (row) => "Not Assigned",
      width: "200px",
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
      <Headings navigtepath="/adminhome" headingname="A raised tickets" />
      <div className="data-table-outer-layer">
        <DataTable
          //title="Arnold Schwarzenegger Movies"
          columns={columns}
          // data={data}
          data={getTicketsOpenData}
          //   pagination
        />
      </div>
    </div>
  );
};
export default AssignTicketsTable;
