import { Col, Row } from "react-bootstrap";
import Headings from "../../../components/Heading/Headings";
import { InputField } from "../../../components/InputField/InputField";
import { IoPersonOutline } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import ButtonStyle1 from "../../../components/Buttons/ButtonStyle1";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { DropdownField } from "../../../components/Dropdown/DropdownField";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { useSelector } from "react-redux";
import Toast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import ConformationModal from "../../../components/Modals/ConformationModal";

const accoutnStatusDropDownOption = [
  { name: "Active", value: "active" },
  { name: "Created", value: "created" },
];
/* const data = [
  {
    department: "IT",
    teams: [
      { name: "Frontend Developer", value: "Frontend Developer" },
      { name: "System Engineer", value: "System Engineer" },
      { name: "Backend Developer", value: "Backend Developer" },
      { name: "Network Engineer", value: "Network Engineer" },
      { name: "Database Administrator", value: "Database Administrator" },
      { name: "DevOps Engineer", value: "DevOps Engineer" },
      { name: "Cybersecurity Specialist", value: "Cybersecurity Specialist" },
      { name: "Cloud Engineer", value: "Cloud Engineer" },
      { name: "Technical Support", value: "Technical Support" },
    ],
  },
  {
    department: "SAP",
    teams: [
      { name: "SAP Functional", value: "SAP Functional" },
      { name: "SAP Technical", value: "SAP Technical" },
      { name: "SAP Basis", value: "SAP Basis" },
      { name: "SAP ABAP Developer", value: "SAP ABAP Developer" },
      { name: "SAP HANA Consultant", value: "SAP HANA Consultant" },
      { name: "SAP Project Manager", value: "SAP Project Manager" },
      { name: "SAP Security Consultant", value: "SAP Security Consultant" },
      { name: "SAP FICO Consultant", value: "SAP FICO Consultant" },
      { name: "SAP MM Consultant", value: "SAP MM Consultant" },
    ],
  },
]; */
const CreateAgent = () => {
  const navigate = useNavigate();

  const admiId = useSelector(
    (state) => state?.admin?.adminData?.adminBody?._id
  );
  // console.log("admiId>>",admiId)
  const [getNewAgent, setNewAgent] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    group: "",
    accountstatus: "",
    createdByAdmin: admiId,
  });

  // const updatedTeam = data.some(
  //   (dept) =>
  //     dept.department === getNewAgent.department &&
  //     // dept.teams.some((team) => team.value === getNewAgent.group)
  // );

  // console.log("department>>", getNewAgent.department);
  // console.log("teams/group>>", getNewAgent.group);
  // console.log("updatedTeam>>", updatedTeam);

  const [getConformfields, setConformfields] = useState({});

  useEffect(() => {
    setConformfields({
      "Full Name": getNewAgent.fullname,
      Email: getNewAgent.email,
      "Phone Number": getNewAgent.phoneNumber,
      Password: getNewAgent.password,
      Department: getNewAgent.department,
      Group: getNewAgent.group,
      "Account status": getNewAgent.accountstatus,
      // "Created By Admin": getNewAgent.createdByAdmin,
    });
  }, [getNewAgent]);

  const { showToast } = Toast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //dropdown option
  // const [teams, setTeams] = useState([]);
  const [getDropdownData, setDropdownData] = useState(null);
  useEffect(() => {
    if (getDropdownData) {
      /*  if (getDropdownData.textField === "department") {
        // Update the teams based on the selected department
        const selectedDepartment = data.find(
          (dep) => dep.department === getDropdownData.name
        );
        setTeams(selectedDepartment ? selectedDepartment.teams : []);
        // console.log('selectedDepartment',selectedDepartment)
        // console.log('getDropdownData',getDropdownData.name)
      } */
      // Update agent state based on dropdown selection
      setNewAgent((prevState) => ({
        ...prevState,
        [getDropdownData.textField]: getDropdownData.name,
      }));
    }
  }, [getDropdownData]);
  /* -----------------------------------------------------------------dependent dropdown--------------------*/
  const [departments, setDepartments] = useState([]);
  const [subModules, setSubModules] = useState([]);
  // const [issueTypes, setIssueTypes] = useState([]);
  // console.log("departments>>",departments)
  useEffect(() => {
    fetch("http://localhost:5000/api/dropdown/departments")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleDepartmentChange = (value) => {
    if (value !== getNewAgent.department) {
      setNewAgent((prev) => ({
        ...prev,
        department: value,
        group: "",
      }));
      // console.log("department>>",value)
      fetch(`http://localhost:5000/api/dropdown/submodules/${value}`)
        .then((response) => response.json())
        .then((data) => setSubModules(data))
        .catch((error) => console.error("Error fetching subModules:", error));
    }
  };

  const handleSubModuleChange = (value) => {
    if (value !== getNewAgent.group) {
      setNewAgent((prev) => ({ ...prev, group: value }));
      // console.log("subModule>>",value)
      fetch(`http://localhost:5000/api/dropdown/issues/${value}`)
        .then((response) => response.json())
        // .then((data) => setIssueTypes(data))
        .catch((error) => console.error("Error fetching issueTypes:", error));
    }
  };
  // const handleIssueTypeChange = (value) => {
  //   if (value !== getNewTicket.issueType) {
  //     // console.log("type of issue>>", value);
  //     setNewTicket((prev) => ({
  //       ...prev,
  //       issueType: value, // Store the selected issue type name
  //     }));
  //   }
  // };
  /* -----------------------------------------------------------------dependent dropdown--------------------*/

  // =================================================================================
  /*   useEffect(() => {
    // Prevent update if getDropdownData is null or undefined
    if (getDropdownData && getDropdownData.name && getDropdownData.textField) {
      setNewAgent((prevState) => {
        // Prevent setting state if the value is already the same to avoid re-renders
        if (prevState[getDropdownData.textField] === getDropdownData.name) {
          return prevState;
        }
        return {
          ...prevState,
          [getDropdownData.textField]: getDropdownData.name, // Update form field based on dropdown selection
        };
      });
    }
  }, [getDropdownData]); */

  /* Handle input changes */
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewAgent({
      ...getNewAgent,
      [name]: value,
    });
  };

  //validation
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!getNewAgent.fullname) tempErrors.fullname = "Full Name is required.";
    if (!getNewAgent.email || !emailPattern.test(getNewAgent.email))
      tempErrors.email = "Valid Email is required.";
    if (!getNewAgent.phoneNumber || !phonePattern.test(getNewAgent.phoneNumber))
      tempErrors.phoneNumber = "Valid 10-digit Phone Number is required.";
    if (!getNewAgent.password) tempErrors.password = "Password is required.";
    if (!getNewAgent.accountstatus)
      tempErrors.accountstatus = "Account Status is required.";
    if (!getNewAgent.department)
      tempErrors.department = "Department/Expertise is required.";
    if (!getNewAgent.group) tempErrors.group = "group/team is required.";
    // if (!updatedTeam) tempErrors.group = "please update the group/team.";

    setErrors(tempErrors); // set error state
    return Object.keys(tempErrors).length === 0;
  };

  /* hande submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("getNewAgentData",getNewAgent)
    const newErrors = validate();
    if (newErrors) {
      // setFormData(getNewCustomer); // Save the data for modal display
      onOpen();
    }
  };
  //handel Ok
  const handleOk = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/agent/agentregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getNewAgent),
        }
      );
      // console.log("response>>", response);
      if (response.ok) {
        // onClose();
        setTimeout(() => {
          // alert("Successfully created customer");//gree toast show created and navigate to the admim page
          navigate("/adminhome");
          showToast({
            title: "",
            message: "Agent created succeful",
            status: "success",
          });
        }, 100);

        // const res_data = await response.json();
        // const role = res_data.role;
        // console.log("role>>",role)
        // dispatch(setToken(res_data.token,res_data.role))
        // dispatch(setToken({ token: res_data.token, role: res_data.role }));

        // onOpen();
      } else if (response.status === 400) {
        // alert("Some thing went wrong pleas login again");
        showToast({
          title: "Error",
          message: `Please try another email ID; ${getNewAgent.email} already exists.`,
          status: "warning",
        });
      } else {
        // alert("some thing went wrong");
        showToast({
          title: "Error",
          message: "Some thing went wrong pleas login again.",
          status: "warning",
        });
      }
    } catch (err) {
      // alert(" fiaild");
      showToast({
        title: "Error",
        message: "Some thing went wrong pleas login again.",
        status: "warning",
      });
    }
  };
  return (
    <div className="mt-4 container createagent">
      <Headings navigtepath="/adminhome" headingname="New Agent Registration" />
      <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Full Name"
              placeholder="Full Name"
              name="fullname"
              type="text"
              onChange={handleChange}
              icon={<IoPersonOutline />}
              error={errors.fullname}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Email"
              placeholder="Email"
              name="email"
              type="text"
              onChange={handleChange}
              icon={<MdAlternateEmail />}
              error={errors.email}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Phone Number"
              placeholder="Phone Number"
              name="phoneNumber"
              type="text"
              onChange={handleChange}
              icon={<IoPhonePortraitOutline />}
              error={errors.phoneNumber}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <InputField
              label="Password"
              placeholder="Password"
              name="password"
              type="text"
              onChange={handleChange}
              icon={<IoLockClosedOutline />}
              error={errors.password}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            <DropdownField
              index={0}
              id="accountstatus"
              name="accountstatus"
              label="Account Status"
              placeholder="Select account status"
              data={accoutnStatusDropDownOption} // Options for dropdown
              setValue={getNewAgent?.accountstatus} // Pre-filled value
              getvalue={setDropdownData} // Set dropdown data on change
              disabled={false}
              required={true}
              error={errors.accountstatus}
              icon={<AiOutlineUserSwitch />}
            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            {/* <DropdownField
              index={0}
              id="department"
              name="department"
              label="Department/Expertise"
              placeholder="Department/Expertise"
              // data={department}
              data={data.map((dep) => ({
                name: dep.department,
                value: dep.department,
              }))}
              setValue={getNewAgent?.department || ""} // Pre-filled value
              // getvalue={setDropdownData} // Set dropdown data on change
              getvalue={setDropdownData} // Set dropdown data on change
              disabled={false}
              required={true}
              error={errors.department}
              icon={<FaRegAddressCard />}
            /> */}
            <DropdownField
              label="Department"
              data={departments}
              setValue={getNewAgent.department}
              onChangeValue={(_, __, value) => handleDepartmentChange(value)}
              placeholder="Select Department"
              icon={<FaRegAddressCard />}

            />
          </Col>
          <Col xs={12} md={4} lg={4} className="my-2">
            {/* <DropdownField
              index={0}
              id="group"
              name="group"
              label="Designation"
              placeholder="Designation"
              // data={group} // Options for dropdown
              data={teams}
              setValue={getNewAgent?.group || ""} // Pre-filled value
              getvalue={setDropdownData} // Set dropdown data on change
              disabled={teams.length === 0} // Disable if no teams are available
              required={true}
              error={errors.group}
              icon={<FaRegAddressCard />}
            /> */}
            <DropdownField
              label="Designation"
              data={subModules}
              setValue={getNewAgent.group}
              onChangeValue={(_, __, value) => handleSubModuleChange(value)}
              placeholder="Select SubModule"
              disabled={!getNewAgent.department}
              icon={<FaRegAddressCard />}
            />
          </Col>
        </Row>
        <div className="mt-4">
          <ButtonStyle1 type="submit">Create</ButtonStyle1>
        </div>
      </form>
      <ConformationModal
        title="Confirm Agent Details"
        // bodyText={getNewAgent}
        bodyText={getConformfields}
        isOpen={isOpen}
        onClose={onClose}
        onOk={handleOk}
      />
    </div>
  );
};
export default CreateAgent;
