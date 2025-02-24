import Headings from "../../../components/Heading/Headings";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";

const AllCustomer = () => {
  // const dispatch = useDispatch();
  const customerAllData = useSelector(
    (state) => state.allCustomer.customerData
  );
  const columns = [
    {
      name: "Customer ID",
      selector: (row) => (
        <div style={{ cursor: "pointer" }}>
          <p
            className="mb-0 fw-medium"
            // onClick={() => handelNavigate(row?.user_unique_ID)}
          >
            {row?.user_unique_ID}
          </p>
        </div>
      ),
      width:"200px",
      //sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row?.firstname,
      width:"200px",
      sortable: true,
    },
    {
      name: "Mail ID",
      selector: (row) => (
        <>
          <p className="mb-0">{row?.email}</p>
        </>
      ),
      width:"200px",
      //selector: (row) => row?.customer_Name,
      //sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => (
        <>
          {/* <p className="mb-0 fw-medium">{row?.fullname}</p> */}
          <p className="mb-0">{row?.mobile}</p>
        </>
      ),
      width:"200px",

      //selector: (row) => row?.customer_Name,
      //sortable: true,
    },
    // {
    //   name: "Admin",
    //   selector: (row) => {
    //     if (row?.department === "IT") {
    //       return (
    //         <div>
    //           <p className="mb-0 fw-medium">
    //             {row?.agentAdminIT ? "Admin" : "User"}
    //             {console.log(row?.agentAdminIT)}
    //           </p>
    //         </div>
    //       );
    //     } else if (row?.department === "SAP") {
    //       return (
    //         <div>
    //           <p className="mb-0 fw-medium">
    //             {row?.agentAdminSAP ? "Admin" : "User"}
    //           </p>
    //         </div>
    //       );
    //     }
    //   },
    //   //sortable: true,
    // },
    // {
    //   name: "status",
    //   selector: (row) => row?.status,
    //   width: "100px",
    //   //   sortable: true,
    // },
  ];
  return (
    <>
      <div className="mt-4 container createagent">
        <Headings navigtepath="/adminhome" headingname=" All Customers" />
        <div className="data-table-outer-layer">
          <DataTable
            //title="Arnold Schwarzenegger Movies"
            columns={columns}
            // data={data}
            data={customerAllData}
            //   pagination
          />
        </div>
      </div>
    </>
  );
};
export default AllCustomer;
