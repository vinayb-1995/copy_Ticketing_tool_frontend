import { useDispatch, useSelector } from "react-redux";
import Headings from "../../../components/Heading/Headings";
import SecondaryHeader from "../../../components/Heading/SecondaryHeader";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { fetchAgentsAllData } from "../../../features/slice/fetchAgentsAllData";

const AllAgents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allAgentsData = useSelector((state) => state.allAgents.allAgentsData);
  console.log("allAgentsData>>", allAgentsData);
  // const token = useSelector((state) => state.auth.token); // Access the token
  const [getAllgents, setAllagents] = useState();
  const agentAdmins = getAllgents?.filter(
    (agent) => agent?.agentAdminIT === false || agent?.agentAdminSAP === false
  );
  console.log("agentAdmins>>", agentAdmins);

  const itAgents = getAllgents?.filter((agent) => agent?.department === "IT");
  const sapAgents = getAllgents?.filter((agent) => agent?.department === "SAP");

  const itAgetnADmin =
    itAgents?.filter((agent) => agent?.agentAdminIT === true) || [];
  console.log("IT agents >>", itAgetnADmin[0]?.fullname);

  const SAPAgetnADmin =
    sapAgents?.filter((agent) => agent?.agentAdminSAP === true) || [];
  console.log("SAP agents >>", SAPAgetnADmin);

  //console.log("ALL AGENTS DATA", getAllgents);
  const handelNavigate = (id) => {
    navigate(`/agentbyidadmin/:${id}`);
  };

  useEffect(() => {
    setAllagents(allAgentsData);
  }, [allAgentsData]);

  useEffect(()=>{
    dispatch(fetchAgentsAllData());
  },[dispatch])
  
  /* table data */
  const columns = [
    {
      name: "Agent ID",
      selector: (row) => (
        <div style={{ cursor: "pointer" }}>
          <p
            className="mb-0 fw-medium"
            onClick={() => handelNavigate(row?.user_unique_ID)}
          >
            {row?.user_unique_ID}
          </p>
        </div>
      ),
      //sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row?.group,
      //sortable: true,
    },
    {
      name: "Department",
      selector: (row) => (
        <div>
          <p className="mb-0">{row?.department}</p>
        </div>
      ),
      //sortable: true,
    },
    {
      name: "Reporting Manager",
      selector: (row) => {
        if (row?.department === "IT") {
          return (
            <div>
              <p className="mb-0 fw-medium">
                <div>
                  <p p className="mb-0">
                    {itAgetnADmin[0]?.fullname || "Not Assigned"}
                  </p>
                </div>
              </p>
            </div>
          );
        } else if (row?.department === "SAP") {
          return (
            <div>
              <div>
                <p className="mb-0">
                  {" "}
                  {SAPAgetnADmin[0]?.fullname || "Not Assigned"}
                </p>
              </div>
            </div>
          );
        }
      },
      //sortable: true,
    },
    {
      name: "Mail ID",
      selector: (row) => (
        <>
          {/* <p className="mb-0 fw-medium">{row?.fullname}</p> */}
          <p className="mb-0">{row?.email}</p>
        </>
      ),
      //selector: (row) => row?.customer_Name,
      //sortable: true,
    },
    {
      name: "Admin",
      selector: (row) => {
        if (row?.department === "IT") {
          return (
            <div>
              <p className="mb-0 fw-medium">
                {row?.agentAdminIT ? "Admin" : "User"}
                {console.log(row?.agentAdminIT)}
              </p>
            </div>
          );
        } else if (row?.department === "SAP") {
          return (
            <div>
              <p className="mb-0 fw-medium">
                {row?.agentAdminSAP ? "Admin" : "User"}
              </p>
            </div>
          );
        }
      },
      //sortable: true,
    },
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
        <Headings navigtepath="/adminhome" headingname="All Agents Table" />
        <div className="pt-2 pb-2">
          <SecondaryHeader header="Table IT Agents" />
          <div className="data-table-outer-layer mt-2">
            <DataTable
              //title="Arnold Schwarzenegger Movies"
              columns={columns}
              // data={data}
              data={itAgents}
              //   pagination
            />
          </div>
        </div>

        <div className="pt-2">
          <SecondaryHeader header="Table SAP Agents" />
          <div className="data-table-outer-layer mt-2">
            <DataTable
              //title="Arnold Schwarzenegger Movies"
              columns={columns}
              // data={data}
              data={sapAgents}
              //   pagination
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AllAgents;
